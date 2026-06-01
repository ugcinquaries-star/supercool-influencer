// app/waitlist/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function WaitlistPage() {
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
      const res = await fetch("/api/waitlist", {
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
    <main className="wl">
      {/* NAV */}
      <nav className="wl-nav">
        <Link href="/" className="wl-nav__logo">
          <span className="wl-nav__super">SUPER</span>COOL INFLUENCER
        </Link>
        <Link href="/academy" className="wl-nav__back">← Academy</Link>
      </nav>

      {step === "form" ? (
        <section className="wl-hero">
          <div className="wl-hero__bg" />
          <div className="wl-wrap">
            <div className="wl-hero__eyebrow">
              <span className="wl-dot" /> AI UGC Academy · Founding Member Waitlist
            </div>

            <div className="wl-hero__grid">
              <div className="wl-hero__copy">
                <h1 className="wl-h1">
                  Be first in.<br />
                  <em>Pay the least.</em><br />
                  Get the most.
                </h1>
                <p className="wl-sub">
                  Founding members lock the lowest price we'll ever charge, get first access
                  before doors open publicly, and join a direct group with the instructors.
                </p>
                <ul className="wl-perks">
                  {[
                    "Lowest founding member price — locked forever",
                    "First access before public launch",
                    "Direct founding member Telegram group",
                    "Lifetime access including all future modules",
                    "Portfolio review from the instructors",
                  ].map(p => (
                    <li key={p}><span className="wl-check">✓</span>{p}</li>
                  ))}
                </ul>
                <p className="wl-urgency">
                  ⚡ Founding spots are limited. No payment now — just your place in line.
                </p>
              </div>

              <div className="wl-form__wrap">
                <div className="wl-form__header">
                  <span className="wl-form__badge">FOUNDING MEMBER WAITLIST</span>
                  <h2 className="wl-form__title">Reserve your spot</h2>
                  <p className="wl-form__sub">No payment now. No commitment. Just your place.</p>
                </div>
                <form className="wl-form" onSubmit={handleSubmit}>
                  <div className="wl-field">
                    <label className="wl-label" htmlFor="wl-name">First Name</label>
                    <input
                      id="wl-name"
                      className="wl-input"
                      type="text"
                      placeholder="Your first name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="wl-field">
                    <label className="wl-label" htmlFor="wl-email">Email Address</label>
                    <input
                      id="wl-email"
                      className="wl-input"
                      type="email"
                      placeholder="Your best email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="wl-error">{error}</p>}
                  <button className="wl-btn" type="submit" disabled={loading}>
                    {loading ? "Joining…" : "⚡ JOIN THE FOUNDING WAITLIST"}
                  </button>
                  <p className="wl-micro">No payment now · No commitment · Just your spot</p>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* SUCCESS */
        <section className="wl-success">
          <div className="wl-wrap wl-success__inner">
            <div className="wl-success__tick">🎉</div>
            <p className="wl-eyebrow">You're On The List</p>
            <h2 className="wl-h1 wl-h1--sm">
              Founding spot<br />
              <em>confirmed.</em>
            </h2>
            <p className="wl-success__sub">
              We'll email you directly when doors open — before anyone else. Keep an eye on your
              inbox. While you wait, get the free Starter Kit if you haven't already:
            </p>
            <div className="wl-success__actions">
              <Link href="/free" className="wl-btn">
                📥 GET THE FREE STARTER KIT
              </Link>
              <a
                href="https://t.me/+RpWuvhNGltYyZDRk"
                target="_blank"
                rel="noopener noreferrer"
                className="wl-btn wl-btn--tele"
              >
                💬 JOIN THE COMMUNITY ON TELEGRAM
              </a>
            </div>
            <div className="wl-success__card">
              <h3>While you wait — start for free.</h3>
              <p>
                The free Starter Kit gives you the opportunity guide, 10 viral hooks,
                creator roadmap, tool stack, and success checklist. You can start
                building today, before the course opens.
              </p>
              <Link href="/free" className="wl-link">Get the free kit →</Link>
            </div>
          </div>
        </section>
      )}

      <footer className="wl-footer">
        <div className="wl-wrap">
          <p>AI UGC ACADEMY · <Link href="/" className="wl-footer__link">SuperCool Influencer</Link></p>
        </div>
      </footer>

      <style>{`
        :root {
          --wine: #9E182B; --wine2: #7A1222; --wine3: #5C0A18;
          --rose: #F9CBD6; --blush: #F2AFBC;
          --oat: #FBF4EC; --oatc: #F2E0D2;
          --ink: #1A0508; --mute: #9B6A72; --paper: #FFFDFB;
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;
        }
        .wl * { box-sizing: border-box; }
        .wl { font-family: var(--sans); color: var(--ink); background: var(--paper); overflow-x: hidden; }
        .wl-wrap { max-width: 960px; margin: 0 auto; padding: 0 24px; }

        .wl-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid var(--oatc);
          background: var(--paper); position: sticky; top: 0; z-index: 100;
        }
        .wl-nav__logo { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-decoration: none; color: var(--ink); }
        .wl-nav__super { color: var(--wine); }
        .wl-nav__back { font-size: 0.78rem; color: var(--mute); text-decoration: none; }

        .wl-hero {
          background: radial-gradient(130% 100% at 70% 0%, var(--wine) 0%, var(--wine2) 50%, var(--wine3) 100%);
          padding: 80px 0;
          position: relative; min-height: 90vh; display: flex; align-items: center;
        }
        .wl-hero__bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
          background-size: 28px 28px;
        }
        .wl-hero .wl-wrap { position: relative; z-index: 2; width: 100%; }
        .wl-hero__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px; border: 1px solid rgba(242,175,188,0.35); border-radius: 100px;
          background: rgba(255,255,255,0.07); font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--rose); margin-bottom: 32px;
        }
        .wl-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--blush); }
        .wl-hero__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }

        .wl-h1 {
          font-family: var(--serif);
          font-size: clamp(2.5rem, 7vw, 4.5rem);
          font-weight: 800; line-height: 1.0; letter-spacing: -0.02em;
          color: var(--paper); margin: 0 0 1.25rem;
        }
        .wl-h1 em { font-style: italic; color: var(--blush); display: block; }
        .wl-h1--sm { font-size: clamp(2rem, 5vw, 3rem); }
        .wl-sub { font-size: 1rem; color: var(--rose); line-height: 1.7; margin-bottom: 1.5rem; }
        .wl-perks { list-style: none; padding: 0; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 8px; }
        .wl-perks li { display: flex; align-items: center; gap: 8px; font-size: 0.88rem; color: var(--rose); }
        .wl-check { color: var(--blush); font-weight: 700; }
        .wl-urgency { font-size: 0.82rem; color: var(--blush); font-weight: 600; }
        .wl-eyebrow { display: block; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--wine); margin-bottom: 10px; }

        .wl-form__wrap {
          background: var(--paper); border-radius: 18px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.25);
        }
        .wl-form__header { padding: 24px 24px 0; }
        .wl-form__badge {
          display: inline-block; padding: 4px 12px;
          background: var(--oatc); border-radius: 4px;
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em; color: var(--wine);
          margin-bottom: 12px;
        }
        .wl-form__title { font-family: var(--serif); font-size: 1.5rem; color: var(--wine); margin-bottom: 4px; }
        .wl-form__sub { font-size: 0.82rem; color: var(--mute); margin-bottom: 0; }
        .wl-form { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 14px; }
        .wl-field { display: flex; flex-direction: column; gap: 5px; }
        .wl-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mute); }
        .wl-input {
          padding: 13px 16px; border-radius: 8px; border: 1.5px solid var(--oatc);
          background: var(--oat); color: var(--ink); font-size: 0.95rem; font-family: var(--sans); outline: none; transition: border-color 0.2s;
        }
        .wl-input:focus { border-color: var(--wine); }
        .wl-error { font-size: 0.78rem; color: #c0392b; margin: 0; }
        .wl-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 15px 24px; border-radius: 8px;
          font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          background: var(--wine); color: var(--paper); border: none; cursor: pointer;
          transition: all 0.2s; text-decoration: none;
        }
        .wl-btn:hover { background: var(--wine2); }
        .wl-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .wl-btn--tele { background: #229ED9; }
        .wl-btn--tele:hover { background: #1a8bbf; }
        .wl-micro { font-size: 0.7rem; color: var(--mute); text-align: center; margin: 0; }

        .wl-success {
          min-height: 80vh; display: flex; align-items: center;
          background: var(--oat); padding: 80px 0;
        }
        .wl-success__inner { max-width: 560px; margin: 0 auto; text-align: center; }
        .wl-success__tick { font-size: 3rem; margin-bottom: 12px; }
        .wl-success__sub { font-size: 0.95rem; color: var(--mute); line-height: 1.7; margin-bottom: 2rem; }
        .wl-success__actions { display: flex; flex-direction: column; gap: 12px; margin-bottom: 2rem; }
        .wl-success__card {
          background: var(--paper); border: 1px solid var(--oatc); border-radius: 14px;
          padding: 24px; text-align: left;
        }
        .wl-success__card h3 { font-family: var(--serif); font-size: 1.1rem; color: var(--wine); margin-bottom: 8px; }
        .wl-success__card p { font-size: 0.85rem; color: var(--mute); line-height: 1.6; margin-bottom: 12px; }
        .wl-link { font-size: 0.85rem; color: var(--wine); font-weight: 700; text-decoration: none; }

        .wl-footer { background: var(--wine3); padding: 28px 24px; text-align: center; font-size: 0.7rem; letter-spacing: 0.08em; color: var(--blush); }
        .wl-footer__link { color: var(--rose); text-decoration: none; }

        @media (max-width: 640px) {
          .wl-hero { padding: 60px 0; min-height: auto; }
          .wl-hero__grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </main>
  );
}

