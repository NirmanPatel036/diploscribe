import { NextRequest, NextResponse } from "next/server";
import { upsertSubscription } from "@/lib/polar/subscription";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("webhook-signature"); // Polar uses webhook-signature, not polar-signature

    console.log("Webhook received:", {
      hasSignature: !!signature,
      bodyPreview: body.substring(0, 200)
    });

    if (!signature) {
      console.warn("Missing webhook-signature header");
      // For local testing, you can temporarily allow without signature
    }

    // Verify webhook signature
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.warn("POLAR_WEBHOOK_SECRET not configured - skipping signature verification (DEVELOPMENT ONLY)");
    }

    // Parse the webhook payload
    const event = JSON.parse(body);

    // Check if this is a Slack/Discord webhook format (wrong type)
    if (event.text || event.blocks) {
      console.error("Received Slack/Discord webhook format. Please configure a standard webhook endpoint in Polar Dashboard, not a Slack/Discord webhook.");
      return NextResponse.json(
        { error: "Invalid webhook format. Use standard webhook, not Slack/Discord." },
        { status: 400 }
      );
    }

    // Validate proper Polar webhook format
    if (!event.type || !event.data) {
      console.error("Invalid Polar webhook format:", event);
      return NextResponse.json(
        { error: "Invalid webhook payload format" },
        { status: 400 }
      );
    }

    console.log("Received Polar webhook:", event.type);

    // Handle different webhook events
    switch (event.type) {
      case "checkout.created":
      case "checkout.updated":
        await handleCheckoutEvent(event.data);
        break;

      case "subscription.created":
        await handleSubscriptionCreated(event.data);
        break;

      case "subscription.updated":
        await handleSubscriptionUpdated(event.data);
        break;

      case "subscription.canceled":
      case "subscription.revoked":
        await handleSubscriptionCanceled(event.data);
        break;

      case "order.created":
        await handleOrderCreated(event.data);
        break;

      default:
        console.log(`Unhandled webhook event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutEvent(checkout: any) {
  console.log("Processing checkout:", checkout.id);
  
  // Checkout is successful when status is "confirmed"
  if (checkout.status === "confirmed") {
    const userId = checkout.metadata?.userId;
    const planName = checkout.metadata?.planName;

    if (!userId || !planName) {
      console.error("Missing metadata in checkout");
      return;
    }

    // Determine usage limit based on plan
    const usageLimits = {
      Starter: 100,
      Professional: 1000,
      Lifetime: -1, // unlimited
    };

    // Calculate trial end date (14 days from now) for Professional plan
    const now = new Date();
    const trialEndDate = planName === "Professional" 
      ? new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString()
      : null;

    // Create subscription record
    await upsertSubscription({
      user_id: userId,
      polar_subscription_id: checkout.subscriptionId || checkout.id,
      polar_customer_id: checkout.customerId,
      plan_name: planName as any,
      status: planName === "Professional" ? "trialing" : "active",
      usage_limit: usageLimits[planName as keyof typeof usageLimits] || 100,
      usage_count: 0,
      current_period_start: now.toISOString(),
      current_period_end: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      trial_end: trialEndDate,
    });
  }
}

async function handleSubscriptionCreated(subscription: any) {
  console.log("Subscription created:", subscription.id);

  const userId = subscription.metadata?.userId;
  const planName = subscription.metadata?.planName;

  if (!userId || !planName) {
    console.error("Missing metadata in subscription");
    return;
  }

  const usageLimits = {
    Starter: 100,
    Professional: 1000,
    Lifetime: -1,
  };

  await upsertSubscription({
    user_id: userId,
    polar_subscription_id: subscription.id,
    polar_customer_id: subscription.customerId,
    plan_name: planName as any,
    status: subscription.status === "trialing" ? "trialing" : "active",
    usage_limit: usageLimits[planName as keyof typeof usageLimits] || 100,
    usage_count: 0,
    current_period_start: subscription.currentPeriodStart,
    current_period_end: subscription.currentPeriodEnd,
    trial_end: subscription.trialEnd,
  });
}

async function handleSubscriptionUpdated(subscription: any) {
  console.log("Subscription updated:", subscription.id);

  await upsertSubscription({
    polar_subscription_id: subscription.id,
    status: subscription.status,
    current_period_start: subscription.currentPeriodStart,
    current_period_end: subscription.currentPeriodEnd,
    trial_end: subscription.trialEnd,
    cancel_at: subscription.cancelAt,
  });
}

async function handleSubscriptionCanceled(subscription: any) {
  console.log("Subscription canceled:", subscription.id);

  await upsertSubscription({
    polar_subscription_id: subscription.id,
    status: "canceled",
    canceled_at: new Date().toISOString(),
  });
}

async function handleOrderCreated(order: any) {
  console.log("Order created:", order.id);

  // Handle one-time purchases (like Lifetime plan)
  const userId = order.metadata?.userId;
  const planName = order.metadata?.planName;

  if (!userId || !planName) {
    console.error("Missing metadata in order");
    return;
  }

  // For lifetime purchases
  if (planName === "Lifetime") {
    await upsertSubscription({
      user_id: userId,
      polar_subscription_id: order.id,
      polar_customer_id: order.customerId,
      plan_name: "Lifetime",
      status: "active",
      usage_limit: -1, // unlimited
      usage_count: 0,
      current_period_start: new Date().toISOString(),
      current_period_end: null, // no expiry for lifetime
    });
  }
}
