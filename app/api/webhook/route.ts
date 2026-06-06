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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan || 'starter';
    const credits = parseInt(session.metadata?.credits || '0');

    if (userId && credits > 0) {
      const { data } = await supabaseAdmin
        .from('users')
        .select('credits')
        .eq('id', userId)
        .single();
      const current = data?.credits || 0;
      await supabaseAdmin.from('users').upsert({
        id: userId,
        credits: current + credits,
        plan,
        updated_at: new Date().toISOString(),
      });
    }
  }

  if (event.type === 'invoice.paid') {
    const invoice = event.data.object as Stripe.Invoice;
    const rawInvoice = invoice as unknown as Record<string, unknown>;
    const subscriptionId =
      (rawInvoice.subscription as string) ||
      ((rawInvoice.parent as Record<string, unknown>)?.subscription_id as string);

    if (!subscriptionId) return NextResponse.json({ received: true });

    const sub = await stripe.subscriptions.retrieve(subscriptionId);
    const userId = sub.metadata?.userId;
    const plan = sub.metadata?.plan;

    if (userId && plan && PLAN_CREDITS[plan]) {
      const { data } = await supabaseAdmin
        .from('users')
        .select('credits')
        .eq('id', userId)
        .single();
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
