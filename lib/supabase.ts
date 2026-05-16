import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server-side client (full access)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Client-side client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getUserCredits(userId: string): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('credits')
    .eq('id', userId)
    .single();
  if (error || !data) return 0;
  return data.credits;
}

export async function deductCredit(userId: string): Promise<boolean> {
  const credits = await getUserCredits(userId);
  if (credits <= 0) return false;
  const { error } = await supabaseAdmin
    .from('users')
    .update({ credits: credits - 1 })
    .eq('id', userId);
  return !error;
}

export async function createUserIfNotExists(userId: string, email: string): Promise<void> {
  const { data } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('id', userId)
    .single();
  if (!data) {
    await supabaseAdmin.from('users').insert({ id: userId, email, credits: 3, plan: 'free' });
  }
}