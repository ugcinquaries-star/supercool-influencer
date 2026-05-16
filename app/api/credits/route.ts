import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createUserIfNotExists, getUserCredits } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await auth();
  const email = '';
  await createUserIfNotExists(userId, email);
  const credits = await getUserCredits(userId);
  return NextResponse.json({ credits });
}