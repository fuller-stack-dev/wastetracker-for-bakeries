import { NextRequest, NextResponse } from "next/server";

// Stripe webhook handler placeholder
// In production, this verifies the webhook signature and processes subscription events
export async function POST(req: NextRequest) {
  const body = await req.text();

  // TODO: Verify stripe webhook signature
  // const sig = req.headers.get("stripe-signature");
  // const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);

  // Handle events: checkout.session.completed, customer.subscription.updated, etc.
  // Update bakery plan in Convex accordingly

  console.log("Stripe webhook received", body.substring(0, 100));

  return NextResponse.json({ received: true });
}
