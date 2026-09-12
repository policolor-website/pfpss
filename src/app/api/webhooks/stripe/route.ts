import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Stripe nu este configurat" },
      { status: 503 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers.get("stripe-signature")!;
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orgId = session.metadata?.orgId;
    const period = session.metadata?.period;

    if (orgId && period) {
      const supabase = createAdminClient();

      // Upsert membership record
      await supabase.from("memberships").upsert(
        {
          organization_id: orgId,
          period,
          amount_cents: session.amount_total || 0,
          status: "paid",
          stripe_payment_intent_id: session.payment_intent as string,
          stripe_checkout_session_id: session.id,
          invoice_url: session.invoice as string,
          paid_at: new Date().toISOString(),
        },
        { onConflict: "organization_id,period" }
      );

      // Update Stripe customer ID on org
      if (session.customer) {
        await supabase
          .from("organizations")
          .update({ stripe_customer_id: session.customer as string })
          .eq("id", orgId);
      }
    }
  }

  return NextResponse.json({ received: true });
}
