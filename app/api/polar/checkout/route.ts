import { NextRequest, NextResponse } from "next/server";
import { polar, POLAR_PLANS } from "@/lib/polar/client";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { planName } = await request.json();

    // Validate plan
    if (!planName || !POLAR_PLANS[planName as keyof typeof POLAR_PLANS]) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const plan = POLAR_PLANS[planName as keyof typeof POLAR_PLANS];

    // For free Starter plan, no checkout needed
    if (planName === "STARTER") {
      return NextResponse.json({
        message: "Starter plan is free and already activated",
      });
    }

    // Create checkout session with Polar
    const checkout = await polar.checkouts.create({
      products: [plan.productId],
      customerEmail: user.email,
      metadata: {
        userId: user.id,
        planName: plan.name,
      },
      successUrl: `${request.nextUrl.origin}/payment/success?session_id={CHECKOUT_ID}`,
      // Polar uses a custom error URL handling
      // They redirect to success URL with ?error=true on cancellation
    });

    return NextResponse.json({
      checkoutUrl: checkout.url,
      checkoutId: checkout.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
