// app/api/free-kit/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    // 1. Send kit delivery email to user
    await resend.emails.send({
      from: "AI UGC Academy <support@supercoolinfluencer.com>",
      to: email,
      subject: `${name}, your free AI UGC Starter Kit is here ⚡`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background: #FFFDFB; padding: 40px 32px;">
          <div style="margin-bottom: 32px;">
            <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #9B6A72; margin: 0 0 8px;">AI UGC ACADEMY</p>
            <h1 style="font-size: 28px; color: #9E182B; line-height: 1.2; margin: 0;">
              Your free Starter Kit is ready, ${name}.
            </h1>
          </div>
          
          <p style="font-size: 16px; color: #3A0A12; line-height: 1.7; margin-bottom: 24px;">
            Everything you need to start creating AI UGC content without showing your face is inside.
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/AI_UGC_Starter_Kit.pdf" 
               style="display: inline-block; background: #9E182B; color: #FBF4EC; padding: 16px 36px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
              📥 DOWNLOAD YOUR FREE STARTER KIT
            </a>
          </div>

          <div style="background: #FBF4EC; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <p style="font-size: 13px; font-weight: 700; color: #9E182B; margin: 0 0 10px; letter-spacing: 1px; text-transform: uppercase;">What's inside your kit:</p>
            <ul style="margin: 0; padding: 0 0 0 20px; color: #3A0A12; font-size: 14px; line-height: 1.8;">
              <li>📘 The AI UGC Opportunity Guide</li>
              <li>🎣 10 Viral AI UGC Hooks (with breakdowns)</li>
              <li>🗺️ The Creator Roadmap (zero to paid)</li>
              <li>🧰 The Tool Stack pros use</li>
              <li>✅ The Success Checklist</li>
            </ul>
          </div>

          <hr style="border: none; border-top: 1px solid #F2E0D2; margin: 28px 0;" />
          
          <p style="font-size: 14px; color: #3A0A12; line-height: 1.7; margin-bottom: 16px;">
            <strong>One more thing:</strong> The AI UGC Academy Telegram community is free to join —
            it's where you'll get feedback on your content and meet other faceless creators building this business.
          </p>

          <a href="https://t.me/+RpWuvhNGltYyZDRk" 
             style="display: inline-block; background: #229ED9; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
            💬 JOIN THE COMMUNITY ON TELEGRAM
          </a>

          <p style="font-size: 12px; color: #9B6A72; margin-top: 32px; line-height: 1.6;">
            You signed up at supercoolinfluencer.com/free. Unsubscribe any time — one click, no questions.<br />
            AI UGC Academy · SuperCool Influencer
          </p>
        </div>
      `,
    });

    // 2. Notify yourself
    await resend.emails.send({
      from: "AI UGC Academy <support@supercoolinfluencer.com>",
      to: "support@supercoolinfluencer.com",
      subject: `New Starter Kit signup: ${name} (${email})`,
      html: `<p>New free kit signup:<br /><strong>Name:</strong> ${name}<br /><strong>Email:</strong> ${email}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Free kit API error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
