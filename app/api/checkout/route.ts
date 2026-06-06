import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS: Record<string, { price: number; credits: number; name: string; recurring: boolean }> = {
  starter: { price: 900, credits: 5, name: 'Starter — 5 Briefs', recurring: false },
  creator: { price: 2900, credits: 30, name: 'Creator — 30 Briefs/mo', recurring: true },
  agency: { price: 7900, credits: 999, name: 'Agency — Unlimited', recurring: true },
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { plan } = await req.json();
    const planData = PLANS[plan];
    if (!planData) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'usd', product_data: { name: planData.name }, unit_amount: planData.price, ...(planData.recurring ? { recurring: { interval: 'month' as const } } : {}) }, quantity: 1 }],
      mode: planData.recurring ? 'subscription' : 'payment',
      success_url: `${appUrl}/dashboard?success=true`,
      cancel_url: `${appUrl}/pricing`,
      metadata: { userId, plan, credits: planData.credits.toString() },
      ...(planData.recurring ? { subscription_data: { metadata: { userId, plan } } } : {}),
    });
    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Stripe error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
