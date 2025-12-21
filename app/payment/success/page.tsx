"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const sessionId = searchParams.get("session_id");
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      setStatus("error");
      return;
    }

    if (sessionId) {
      // Verify the checkout session
      verifyCheckout();
    } else {
      setStatus("error");
    }
  }, [sessionId, error]);

  const verifyCheckout = async () => {
    try {
      // Give webhook time to process (optional)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus("success");
    } catch (error) {
      console.error("Verification error:", error);
      setStatus("error");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-2">Processing your payment...</h2>
          <p className="text-muted-foreground">Please wait while we confirm your subscription.</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-semibold mb-2">Payment Canceled</h2>
          <p className="text-muted-foreground mb-6">
            Your payment was not completed. No charges have been made to your account.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/home">Go to Home</Link>
            </Button>
            <Button asChild>
              <Link href="/#pricing">Try Again</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
        <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
        <p className="text-muted-foreground mb-6">
          Thank you for subscribing. Your account has been upgraded and you can now enjoy all the features of your plan.
        </p>
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-2">What's next?</p>
          <ul className="text-sm space-y-2 text-left">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
              <span>Check your email for payment confirmation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
              <span>View your subscription details in the dashboard</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
              <span>Start transforming your messages with enhanced features</span>
            </li>
          </ul>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/transform">Start Transforming</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
