import { createClient } from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
}

// Server-side Supabase client with service role for bypassing RLS
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export interface Subscription {
  id: string;
  user_id: string;
  polar_subscription_id: string | null;
  polar_customer_id: string | null;
  plan_name: "Starter" | "Professional" | "Lifetime";
  status: "active" | "trialing" | "past_due" | "canceled" | "incomplete" | "incomplete_expired";
  current_period_start: string | null;
  current_period_end: string | null;
  trial_end: string | null;
  cancel_at: string | null;
  canceled_at: string | null;
  usage_limit: number;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

// Get user's active subscription
export async function getUserSubscription(userId: string): Promise<Subscription | null> {
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .in("status", ["active", "trialing"])
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching subscription:", error);
    return null;
  }

  return data as Subscription;
}

// Create or update subscription
export async function upsertSubscription(subscription: Partial<Subscription>) {
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .upsert(subscription, {
      onConflict: "polar_subscription_id",
    })
    .select()
    .single();

  if (error) {
    console.error("Error upserting subscription:", error);
    throw error;
  }

  return data as Subscription;
}

// Increment usage count
export async function incrementUsage(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  
  if (!subscription) {
    return false;
  }

  // Unlimited for Lifetime plan
  if (subscription.usage_limit === -1) {
    return true;
  }

  // Check if limit exceeded
  if (subscription.usage_count >= subscription.usage_limit) {
    return false;
  }

  // Increment usage
  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update({ usage_count: subscription.usage_count + 1 })
    .eq("id", subscription.id);

  if (error) {
    console.error("Error incrementing usage:", error);
    return false;
  }

  return true;
}

// Check if user has feature access
export async function hasFeatureAccess(
  userId: string,
  feature: "chrome_extension" | "advanced_controls" | "priority_support"
): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  
  if (!subscription) {
    return false;
  }

  // Feature access based on plan
  const featureMap = {
    chrome_extension: ["Professional", "Lifetime"],
    advanced_controls: ["Professional", "Lifetime"],
    priority_support: ["Professional", "Lifetime"],
  };

  return featureMap[feature].includes(subscription.plan_name);
}

// Cancel subscription
export async function cancelSubscription(userId: string, polarSubscriptionId: string) {
  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update({
      status: "canceled",
      canceled_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("polar_subscription_id", polarSubscriptionId);

  if (error) {
    console.error("Error canceling subscription:", error);
    throw error;
  }
}
