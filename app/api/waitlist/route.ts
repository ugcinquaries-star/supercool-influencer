// app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    // Confirm email to user
    await resend.emails.send({
      from: "AI UGC Academy <support@supercoolinfluencer.com>",
      to: email,
      subject: `${name}, your founding spot is confirmed ⚡`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background: #5C0A18; padding: 40px 32px;">
          <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #F2AFBC; margin: 0 0 8px;">AI UGC ACADEMY · FOUNDING MEMBER</p>
          <h1 style="font-size: 28px; color: #FFFDFB; line-height: 1.2; margin: 0 0 18px;">
            You're on the founding waitlist, ${name}.
          </h1>
          <p style="font-size: 16px; color: #F9CBD6; line-height: 1.7; margin-bottom: 24px;">
            When doors open, you'll be first to know — with access to the founding member price before it goes public.
          </p>
          <p style="font-size: 14px; color: #F9CBD6; line-height: 1.7; margin-bottom: 24px;">
            <strong style="color: #FFFDFB;">What happens next:</strong><br />
            1. We'll email you before launch with your founding member link<br />
            2. You get first access at the lowest price we'll ever charge<br />
            3. Founding members also get a direct private Telegram group
          </p>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
          <p style="font-size: 14px; color: #F9CBD6; margin-bottom: 16px;">
            While you wait, grab the free Starter Kit if you haven't yet:
          </p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/free" 
             style="display: inline-block; background: #F2AFBC; color: #5C0A18; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
            📥 GET THE FREE STARTER KIT
          </a>
          <p style="font-size: 12px; color: #9B6A72; margin-top: 32px;">
            You joined the waitlist at supercoolinfluencer.com/waitlist. Unsubscribe any time.<br />
            AI UGC Academy · SuperCool Influencer
          </p>
        </div>
      `,
    });

    // Notify yourself
    await resend.emails.send({
      from: "AI UGC Academy <support@supercoolinfluencer.com>",
      to: "support@supercoolinfluencer.com",
      subject: `🎉 New waitlist signup: ${name} (${email})`,
      html: `<p>New founding member waitlist signup:<br /><strong>Name:</strong> ${name}<br /><strong>Email:</strong> ${email}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
