import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const { orgId, period, amount } = await request.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe nu este configurat" },
        { status: 503 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const origin = request.headers.get("origin") || "http://localhost:3000";

    // Parse period "2026-09" → "Septembrie 2026"
    const [year, month] = period.split("-");
    const monthNames = [
      "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
      "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
    ];
    const periodLabel = `${monthNames[parseInt(month) - 1]} ${year}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: `Cotizație PFPSS — ${periodLabel}`,
              description: `Cotizație lunară membru PFPSS pentru ${periodLabel}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/dashboard/cotizatie?status=success`,
      cancel_url: `${origin}/dashboard/cotizatie?status=cancel`,
      metadata: {
        orgId,
        period,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Eroare la crearea sesiunii" },
      { status: 500 }
    );
  }
}
