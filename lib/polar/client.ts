import { Polar } from "@polar-sh/sdk";

if (!process.env.POLAR_ACCESS_TOKEN) {
  throw new Error("POLAR_ACCESS_TOKEN is not set");
}

// Initialize Polar SDK client
export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  // Use sandbox for testing
  server: process.env.NODE_ENV === "production" 
    ? "production" 
    : "sandbox",
});

// Plan configuration with Polar product IDs
// You'll need to replace these with your actual product IDs from Polar dashboard
export const POLAR_PLANS = {
  STARTER: {
    name: "Starter",
    price: 0,
    productId: process.env.NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID || "",
    usageLimit: 100,
    features: [
      "100 transformations/month",
      "All tone adjustments",
      "Email support",
      "Direct Gmail Integration",
    ],
  },
  PROFESSIONAL: {
    name: "Professional",
    price: 9,
    productId: process.env.NEXT_PUBLIC_POLAR_PROFESSIONAL_PRODUCT_ID || "",
    priceId: process.env.NEXT_PUBLIC_POLAR_PROFESSIONAL_PRICE_ID || "",
    usageLimit: 1000,
    features: [
      "1,000 transformations/month",
      "Advanced tone & length control",
      "Priority support",
      "Direct Gmail Integration",
      "Chrome Extension",
      "Enhanced AI controls",
    ],
  },
  LIFETIME: {
    name: "Lifetime",
    price: 49,
    productId: process.env.NEXT_PUBLIC_POLAR_LIFETIME_PRODUCT_ID || "",
    priceId: process.env.NEXT_PUBLIC_POLAR_LIFETIME_PRICE_ID || "",
    usageLimit: -1, // -1 means unlimited
    features: [
      "Unlimited transformations",
      "Be Limit+",
      "Dedicated support & controls",
      "Direct Gmail Integration",
      "Chrome Extension",
    ],
  },
} as const;

export type PlanName = keyof typeof POLAR_PLANS;
