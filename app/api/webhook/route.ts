import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLAN_CREDITS: Record<string, number> = {
  starter: 5,
  creator: 30,
  agency: 999,
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 });
  }

  // Idempotency: skip if already processed
  const { data: existing } = await supabaseAdmin
    .from('webhook_events')
    .select('id')
    .eq('stripe_event_id', event.id)
    .single();
  if (existing) return NextResponse.json({ received: true, skipped: true });

  // Log the event
  await supabaseAdmin.from('webhook_events').insert({ stripe_event_id: event.id, type: event.type });

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan || 'starter';
    const credits = parseInt(session.metadata?.credits || '0');

    if (userId && credits > 0) {
      const { data } = await supabaseAdmin.from('users').select('credits').eq('id', userId).single();
      const current = data?.credits || 0;
      await supabaseAdmin.from('users').upsert({
        id: userId,
        credits: current + credits,
        plan,
        updated_at: new Date().toISOString(),
      });
    }
  }

  // Handle monthly subscription renewals
  if (event.type === 'invoice.paid') {
    const invoice = event.data.object as Stripe.Invoice;
    const sub = invoice.subscription
      ? await stripe.subscriptions.retrieve(invoice.subscription as string)
      : null;
    const userId = sub?.metadata?.userId;
    const plan = sub?.metadata?.plan;

    if (userId && plan && PLAN_CREDITS[plan]) {
      const { data } = await supabaseAdmin.from('users').select('credits').eq('id', userId).single();
      const current = data?.credits || 0;
      await supabaseAdmin.from('users').upsert({
        id: userId,
        credits: current + PLAN_CREDITS[plan],
        plan,
        updated_at: new Date().toISOString(),
      });
    }
  }

  return NextResponse.json({ received: true });
}
