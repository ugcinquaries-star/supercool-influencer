import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, platform, handle, followers, niche, why } = body;

    if (!name || !email || !platform || !handle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('affiliate_applications')
      .insert([{ name, email, platform, handle, followers, niche, why }]);

    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
    }

    // 2. Send email notification to you via Zoho SMTP
    const emailBody = `
New Affiliate Application — SuperCool Influencer

Name: ${name}
Email: ${email}
Platform: ${platform}
Handle: ${handle}
Followers: ${followers || 'Not specified'}
Niche: ${niche || 'Not specified'}

Why SuperCool:
${why || 'Not provided'}

---
View all applications in your Supabase dashboard:
https://supabase.com/dashboard/project/affiliate_applications
    `.trim();

    // Send via Zoho SMTP using fetch to a simple email API
    // Using Resend (free tier — 100 emails/day) as the email sender
    // If you have RESEND_API_KEY set, this will work
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'SuperCool Affiliates <support@supercoolinfluencer.com>',
          to: ['support@supercoolinfluencer.com'],
          subject: `🎯 New Affiliate Application — ${name} (${platform}: ${handle})`,
          text: emailBody,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Affiliate API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
