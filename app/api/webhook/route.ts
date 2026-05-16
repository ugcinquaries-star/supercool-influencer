import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const credits = parseInt(session.metadata?.credits || '0');

    if (userId) {
      const { data } = await supabaseAdmin.from('users').select('credits').eq('id', userId).single();
      const current = data?.credits || 0;
      await supabaseAdmin.from('users').upsert({
        id: userId,
        credits: current + credits,
        plan: session.metadata?.plan || 'starter',
      });
    }
  }

  return NextResponse.json({ received: true });
}