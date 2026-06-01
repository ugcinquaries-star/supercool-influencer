// app/free/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import type { Metadata } from "next";

export default function FreePage() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Replace with your actual email provider (Mailchimp, ConvertKit, Beehiiv, Resend)
      // Example with Resend / your own API route:
      const res = await fetch("/api/free-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("Signup failed");
      setStep("success");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="fr">

      {/* ── NAV ── */}
      <nav className="fr-nav">
        <Link href="/" className="fr-nav__logo">
          <span className="fr-nav__super">SUPER</span>COOL INFLUENCER
        </Link>
        <Link href="/academy" className="fr-nav__back">← Back to Academy</Link>
      </nav>

      {step === "form" ? (
        <>
          {/* ── HERO ── */}
          <header className="fr-hero">
            <div className="fr-hero__bg" />
            <div className="fr-wrap">
              <div className="fr-hero__eyebrow">
                <span className="fr-dot" />
                AI UGC Academy · Free Starter Kit
              </div>
              <h1 className="fr-hero__h1">
                Create AI UGC content<br />
                <em>without showing your face.</em>
              </h1>
              <p className="fr-hero__sub">
                Get the free AI UGC Starter Kit — the opportunity guide, 10 viral hooks,
                creator roadmap, tool stack, and success checklist.
                Everything you need to start today.
              </p>

              {/* ── EMAIL FORM ── */}
              <form className="fr-form" onSubmit={handleSubmit}>
                <div className="fr-form__fields">
                  <div className="fr-field">
                    <label className="fr-label" htmlFor="fr-name">First Name</label>
                    <input
                      id="fr-name"
                      className="fr-input"
                      type="text"
                      placeholder="Your first name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fr-field">
                    <label className="fr-label" htmlFor="fr-email">Email Address</label>
                    <input
                      id="fr-email"
                      className="fr-input"
                      type="email"
                      placeholder="Your best email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {error && <p className="fr-error">{error}</p>}
                <button className="fr-btn" type="submit" disabled={loading}>
                  {loading ? "Sending…" : "⚡ SEND ME THE FREE STARTER KIT"}
                </button>
                <p className="fr-micro">Free · Instant download · Unsubscribe anytime</p>
              </form>

              {/* Kit badges */}
              <div className="fr-badges">
                {["📘 Opportunity Guide","🎣 10 Viral Hooks","🗺️ Creator Roadmap","🧰 Tool Stack","✅ Success Checklist"].map(b => (
                  <span key={b} className="fr-badge">{b}</span>
                ))}
              </div>
            </div>
          </header>

          {/* ── WHAT'S INSIDE ── */}
          <section className="fr-section fr-inside">
            <div className="fr-wrap">
              <p className="fr-eyebrow">What's Inside</p>
              <h2 className="fr-h2">Five resources to start<br /><em>your AI UGC journey.</em></h2>
              <div className="fr-inside__grid">
                {[
                  { icon: "📘", title: "The Opportunity Guide", desc: "What AI UGC is, why brands pay for it, and why now is the moment to build this skill." },
                  { icon: "🎣", title: "10 Viral AI UGC Hooks", desc: "Direct-response hooks with breakdowns of why they work and how to adapt them to any niche." },
                  { icon: "🗺️", title: "The Creator Roadmap", desc: "Five steps from choosing your niche to landing your first paid client — in the right order." },
                  { icon: "🧰", title: "The Tool Stack", desc: "The exact five tools pros use — SuperCool Influencer, Nano Banana, Higgsfield, Kling, CapCut." },
                  { icon: "✅", title: "The Success Checklist", desc: "A one-page path from today to your first paid AI UGC work. Tick each step as you go." },
                ].map(item => (
                  <div key={item.title} className="fr-inside__card">
                    <span className="fr-inside__icon">{item.icon}</span>
                    <div>
                      <h3 className="fr-inside__title">{item.title}</h3>
                      <p className="fr-inside__desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="fr-inside__cta">
                <button className="fr-btn" onClick={() => document.getElementById("fr-name")?.focus()}>
                  ⚡ GET THE FREE KIT NOW
                </button>
              </div>
            </div>
          </section>

          {/* ── TRUST ── */}
          <section className="fr-section fr-trust">
            <div className="fr-wrap">
              <p className="fr-eyebrow fr-eyebrow--light">Why This Kit</p>
              <h2 className="fr-h2 fr-h2--light">Built by creators,<br /><em>for creators starting out.</em></h2>
              <ul className="fr-trust__list">
                {[
                  "No camera, no studio, no experience required",
                  "The same foundation taught inside AI UGC Academy",
                  "Practical and honest — a skill you build, not a get-rich promise",
                  "Everything in one premium, easy-to-follow PDF",
                  "The tool stack that works in 2025 and beyond",
                ].map(item => (
                  <li key={item}>
                    <span className="fr-trust__check">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="fr-section fr-faq">
            <div className="fr-wrap">
              <p className="fr-eyebrow">Quick Questions</p>
              <h2 className="fr-h2">Before you grab it.</h2>
              <div className="fr-faq__list">
                {[
                  { q: "Is it really free?", a: "Yes — completely free. You give your email, we send the Starter Kit instantly. No hidden upsells at checkout." },
                  { q: "Do I need to show my face?", a: "Never. The whole kit is built for faceless creators. Your AI avatar does the on-screen work." },
                  { q: "I'm a total beginner — will I understand it?", a: "Yes. The kit assumes zero experience and walks you through everything from the beginning." },
                  { q: "What's AI UGC Academy?", a: "Our full course — every module, every tool, every workflow — for going from zero to paid. This kit is your free foundation. Academy is the complete system, opening soon." },
                  { q: "Will you spam me?", a: "No. You'll get the kit plus occasional updates. Unsubscribe any time — one click, no questions." },
                ].map(faq => (
                  <details key={faq.q} className="fr-faq__item">
                    <summary className="fr-faq__q">
                      {faq.q}
                      <span className="fr-faq__icon" />
                    </summary>
                    <p className="fr-faq__a">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ── FINAL CTA ── */}
          <section className="fr-section fr-finalcta">
            <div className="fr-wrap fr-finalcta__inner">
              <h2 className="fr-h2 fr-h2--light">
                Start creating AI UGC today.<br />
                <em>For free.</em>
              </h2>
              <p className="fr-finalcta__sub">No camera. No studio. No catch.</p>
              <button className="fr-btn fr-btn--lg" onClick={() => document.getElementById("fr-name")?.focus()}>
                ⚡ SEND ME THE FREE STARTER KIT
              </button>
              <p className="fr-micro">Free · Instant download · Unsubscribe anytime</p>
            </div>
          </section>
        </>
      ) : (
        /* ── SUCCESS STATE ── */
        <section className="fr-success">
          <div className="fr-wrap fr-success__inner">
            <div className="fr-success__tick">🎉</div>
            <p className="fr-eyebrow">You're In</p>
            <h2 className="fr-h2">Your Starter Kit<br /><em>is on its way.</em></h2>
            <p className="fr-success__sub">
              Check your inbox for the download link — give it a minute, and peek in spam
              just in case. While you wait, download directly:
            </p>
            <a
              href="/AI_UGC_Starter_Kit.pdf"
              download
              className="fr-btn fr-btn--lg"
              style={{ display: "inline-flex", marginBottom: "2rem" }}
            >
              📥 DOWNLOAD THE KIT NOW
            </a>

            {/* Community Card */}
            <div className="fr-success__community">
              <div className="fr-success__comm-icon">💬</div>
              <h3>Join the AI UGC Academy community</h3>
              <p>
                Get your questions answered, see what other faceless creators are building,
                and be first to know when Academy doors open.
                This is where the kit comes alive.
              </p>
              <a
                href="https://t.me/+RpWuvhNGltYyZDRk"
                target="_blank"
                rel="noopener noreferrer"
                className="fr-btn fr-btn--tele fr-btn--lg"
              >
                💬 JOIN THE COMMUNITY ON TELEGRAM
              </a>
            </div>

            <div className="fr-success__next">
              <p className="fr-eyebrow" style={{ marginBottom: "1rem" }}>Next Step</p>
              <Link href="/waitlist" className="fr-btn fr-btn--ghost fr-btn--lg">
                JOIN THE ACADEMY FOUNDING WAITLIST →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="fr-footer">
        <div className="fr-wrap">
          <p>AI UGC ACADEMY · Part of <Link href="/" className="fr-footer__link">SuperCool Influencer</Link></p>
        </div>
      </footer>

      <style>{`
        :root {
          --wine: #9E182B;
          --wine2: #7A1222;
          --wine3: #5C0A18;
          --rose: #F9CBD6;
          --blush: #F2AFBC;
          --oat: #FBF4EC;
          --oatc: #F2E0D2;
          --ink: #1A0508;
          --mute: #9B6A72;
          --paper: #FFFDFB;
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;
          --r: 10px; --rlg: 18px;
        }
        .fr * { box-sizing: border-box; }
        .fr {
          font-family: var(--sans);
          color: var(--ink);
          background: var(--paper);
          overflow-x: hidden;
        }
        .fr-wrap { max-width: 720px; margin: 0 auto; padding: 0 24px; }
        .fr-section { padding: 72px 0; }

        /* NAV */
        .fr-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid var(--oatc);
          background: var(--paper);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .fr-nav__logo {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-decoration: none;
          color: var(--ink);
        }
        .fr-nav__super { color: var(--wine); }
        .fr-nav__back {
          font-size: 0.78rem;
          color: var(--mute);
          text-decoration: none;
        }

        /* TYPOGRAPHY */
        .fr-h2 {
          font-family: var(--serif);
          font-size: clamp(1.8rem, 6vw, 2.8rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--wine);
          margin: 0 0 1.25rem;
        }
        .fr-h2 em { font-style: italic; color: var(--wine2); }
        .fr-h2--light { color: var(--paper); }
        .fr-h2--light em { color: var(--blush); }
        .fr-eyebrow {
          display: block;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--wine);
          margin-bottom: 10px;
        }
        .fr-eyebrow--light { color: var(--blush); }
        .fr-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--blush);
          margin-right: 6px;
        }
        .fr-micro {
          font-size: 0.72rem;
          color: var(--blush);
          margin-top: 10px;
          text-align: center;
        }

        /* HERO */
        .fr-hero {
          background: radial-gradient(130% 100% at 70% 0%, var(--wine) 0%, var(--wine2) 50%, var(--wine3) 100%);
          padding: 80px 0 72px;
          position: relative;
          overflow: hidden;
        }
        .fr-hero__bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
          background-size: 28px 28px;
        }
        .fr-hero .fr-wrap { position: relative; z-index: 2; }
        .fr-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          padding: 7px 16px;
          border: 1px solid rgba(242,175,188,0.35);
          border-radius: 100px;
          background: rgba(255,255,255,0.07);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 22px;
        }
        .fr-hero__h1 {
          font-family: var(--serif);
          font-size: clamp(2.2rem, 8vw, 4rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--paper);
          margin: 0 0 1.25rem;
        }
        .fr-hero__h1 em {
          font-style: italic;
          color: var(--blush);
          display: block;
        }
        .fr-hero__sub {
          font-size: clamp(0.95rem, 2.5vw, 1.1rem);
          color: var(--rose);
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 520px;
        }

        /* FORM */
        .fr-form {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(242,175,188,0.2);
          border-radius: var(--rlg);
          padding: 24px;
          margin-bottom: 1.5rem;
          max-width: 480px;
        }
        .fr-form__fields {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }
        .fr-field { display: flex; flex-direction: column; gap: 5px; }
        .fr-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--blush);
        }
        .fr-input {
          padding: 13px 16px;
          border-radius: 8px;
          border: 1.5px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.07);
          color: var(--paper);
          font-size: 0.95rem;
          font-family: var(--sans);
          outline: none;
          transition: border-color 0.2s;
        }
        .fr-input::placeholder { color: rgba(249,203,214,0.5); }
        .fr-input:focus { border-color: var(--blush); }
        .fr-error {
          font-size: 0.8rem;
          color: #ff6b6b;
          margin-bottom: 10px;
        }

        /* BUTTONS */
        .fr-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 15px 24px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          background: var(--oat);
          color: var(--wine);
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .fr-btn:hover { background: var(--paper); }
        .fr-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .fr-btn--lg { padding: 17px 32px; font-size: 0.85rem; }
        .fr-btn--tele { background: #229ED9; color: #fff; width: 100%; }
        .fr-btn--tele:hover { background: #1a8bbf; }
        .fr-btn--ghost {
          background: transparent;
          color: var(--wine);
          border: 1.5px solid var(--wine);
          width: auto;
        }
        .fr-btn--ghost:hover { background: var(--wine); color: var(--paper); }

        /* BADGES */
        .fr-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 1rem;
        }
        .fr-badge {
          padding: 6px 12px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(242,175,188,0.25);
          border-radius: 100px;
          font-size: 0.72rem;
          color: var(--rose);
          font-weight: 600;
        }

        /* INSIDE */
        .fr-inside { background: var(--oat); }
        .fr-inside__grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 2rem;
        }
        .fr-inside__card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          background: var(--paper);
          border: 1px solid var(--oatc);
          border-radius: var(--rlg);
          padding: 20px;
        }
        .fr-inside__icon { font-size: 1.8rem; flex-shrink: 0; }
        .fr-inside__title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--wine);
          margin-bottom: 4px;
        }
        .fr-inside__desc {
          font-size: 0.85rem;
          color: var(--mute);
          line-height: 1.6;
          margin: 0;
        }
        .fr-inside__cta {
          margin-top: 2rem;
          text-align: center;
        }
        .fr-inside__cta .fr-btn {
          max-width: 360px;
          margin: 0 auto;
          background: var(--wine);
          color: var(--paper);
        }
        .fr-inside__cta .fr-btn:hover { background: var(--wine2); }

        /* TRUST */
        .fr-trust { background: var(--wine2); }
        .fr-trust__list {
          list-style: none;
          padding: 0;
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .fr-trust__list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.92rem;
          color: var(--rose);
          line-height: 1.5;
        }
        .fr-trust__check {
          color: var(--blush);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* FAQ */
        .fr-faq { background: var(--paper); }
        .fr-faq__list {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .fr-faq__item {
          background: var(--oat);
          border: 1px solid var(--oatc);
          border-radius: var(--r);
          overflow: hidden;
        }
        .fr-faq__q {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 18px;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--wine);
          cursor: pointer;
          list-style: none;
        }
        .fr-faq__q::-webkit-details-marker { display: none; }
        .fr-faq__icon::before { content: "+"; font-size: 1.2rem; color: var(--blush); }
        details[open] .fr-faq__icon::before { content: "–"; }
        .fr-faq__a {
          padding: 0 18px 14px;
          font-size: 0.85rem;
          color: var(--mute);
          line-height: 1.7;
          margin: 0;
        }

        /* FINAL CTA */
        .fr-finalcta {
          background: radial-gradient(120% 90% at 60% 0%, var(--wine) 0%, var(--wine3) 100%);
          text-align: center;
        }
        .fr-finalcta__inner { max-width: 500px; margin: 0 auto; }
        .fr-finalcta__sub {
          font-size: 1rem;
          color: var(--rose);
          margin-bottom: 2rem;
        }
        .fr-finalcta .fr-btn {
          background: var(--oat);
          color: var(--wine);
          max-width: 400px;
          margin: 0 auto;
        }

        /* SUCCESS */
        .fr-success {
          min-height: 80vh;
          display: flex;
          align-items: center;
          background: var(--oat);
          padding: 80px 0;
        }
        .fr-success__inner {
          text-align: center;
          max-width: 560px;
          margin: 0 auto;
        }
        .fr-success__tick { font-size: 3rem; margin-bottom: 12px; }
        .fr-success__sub {
          font-size: 0.95rem;
          color: var(--mute);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .fr-success__community {
          background: var(--paper);
          border: 1px solid var(--oatc);
          border-radius: var(--rlg);
          padding: 28px;
          margin-bottom: 2rem;
          text-align: center;
        }
        .fr-success__comm-icon { font-size: 2.5rem; margin-bottom: 10px; }
        .fr-success__community h3 {
          font-family: var(--serif);
          font-size: 1.25rem;
          color: var(--wine);
          margin-bottom: 8px;
        }
        .fr-success__community p {
          font-size: 0.88rem;
          color: var(--mute);
          line-height: 1.6;
          margin-bottom: 18px;
        }
        .fr-success__next {
          padding-top: 2rem;
          border-top: 1px solid var(--oatc);
          text-align: center;
        }

        /* FOOTER */
        .fr-footer {
          background: var(--wine3);
          padding: 28px 24px;
          text-align: center;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--blush);
        }
        .fr-footer__link {
          color: var(--rose);
          text-decoration: none;
        }

        /* MOBILE */
        @media (max-width: 640px) {
          .fr-hero { padding: 60px 0 56px; }
          .fr-section { padding: 56px 0; }
          .fr-btn--lg { font-size: 0.78rem; }
        }
      `}</style>
    </main>
  );
}

