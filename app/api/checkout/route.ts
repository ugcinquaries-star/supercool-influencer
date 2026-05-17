import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
'use client';
import { useUser } from '@clerk/nextjs';
export default function PricingPage() {
  const { isSignedIn } = useUser();
  const handleCheckout = async (plan: string) => {
    if (!isSignedIn) {
      window.location.href = '/sign-in';
      return;
    }
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert(data.error || 'Something went wrong');
  };
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { plan } = await req.json();
    const planData = PLANS[plan];
    if (!planData) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: planData.name },
          unit_amount: planData.price,
          ...(planData.recurring ? { recurring: { interval: 'month' as const } } : {}),
        },
        quantity: 1,
      }],
      mode: planData.recurring ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing`,
      metadata: { userId, plan, credits: planData.credits.toString() },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}