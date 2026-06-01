// app/academy/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI UGC Academy — Master Faceless AI Content Creation",
  description: "The complete system for building a profitable AI UGC business. No camera. No studio. No face required. Join the waitlist.",
  openGraph: {
    title: "AI UGC Academy — Master Faceless AI Content Creation",
    description: "The complete system for building a profitable AI UGC business.",
    url: "https://supercoolinfluencer.com/academy",
    siteName: "SuperCool Influencer",
    type: "website",
  },
};

export default function AcademyPage() {
  return (
    <main className="ac">

      {/* ── NAV ── */}
      <nav className="ac-nav">
        <Link href="/" className="ac-nav__logo">
          <span className="ac-nav__logo-super">SUPER</span>COOL INFLUENCER
        </Link>
        <div className="ac-nav__links">
          <Link href="/academy" className="ac-nav__link ac-nav__link--active">Academy</Link>
          <Link href="/free" className="ac-nav__link">Free Kit</Link>
          <Link href="/generate" className="ac-nav__cta">Start Free →</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="ac-hero">
        <div className="ac-hero__bg" />
        <div className="ac-wrap">
          <div className="ac-hero__eyebrow">
            <span className="ac-dot" />
            AI UGC Academy · Opening Soon
          </div>
          <h1 className="ac-hero__h1">
            Build a profitable<br />
            AI UGC business.<br />
            <em>No face required.</em>
          </h1>
          <p className="ac-hero__sub">
            The complete system — from zero to paid clients — using AI avatars, cinematic
            prompts, and the exact workflow top faceless creators use to charge CHF 1,500–3,000
            per brand deal.
          </p>
          <div className="ac-hero__ctas">
            <Link href="/waitlist" className="ac-btn ac-btn--primary ac-btn--lg">
              ⚡ JOIN THE FOUNDING WAITLIST
            </Link>
            <Link href="/free" className="ac-btn ac-btn--ghost ac-btn--lg">
              GET FREE STARTER KIT →
            </Link>
          </div>
          <p className="ac-hero__note">
            <strong>Founding member spots are limited.</strong> Lock your place before doors open.
          </p>

          {/* Stats */}
          <div className="ac-hero__stats">
            {[
              ["5", "Modules"],
              ["50+", "Viral Hooks"],
              ["25", "Script Templates"],
              ["CHF 0", "To Start"],
            ].map(([v, l]) => (
              <div key={l} className="ac-hero__stat">
                <span className="ac-hero__stat-val">{v}</span>
                <span className="ac-hero__stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR WHO ── */}
      <section className="ac-section ac-for">
        <div className="ac-wrap">
          <p className="ac-eyebrow">Who This Is For</p>
          <h2 className="ac-h2">Built for creators who are<br /><em>done waiting.</em></h2>
          <div className="ac-for__grid">
            {[
              { icon: "🚫", title: "No camera confidence", desc: "You want to create content but hate being on screen. AI UGC lets your avatar do it for you." },
              { icon: "⏱️", title: "No time for filming", desc: "You can't afford a 3-week production cycle. Our workflow goes from idea to finished ad in under 2 hours." },
              { icon: "💸", title: "No budget for agencies", desc: "Brands pay CHF 3,000+/mo for content that AI can create for pennies. You keep the margin." },
              { icon: "📱", title: "No audience yet", desc: "You don't need followers to land brand deals. You need a portfolio. We show you how to build one from zero." },
            ].map((c) => (
              <div key={c.title} className="ac-for__card">
                <span className="ac-for__icon">{c.icon}</span>
                <h3 className="ac-for__title">{c.title}</h3>
                <p className="ac-for__desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPER FRAMEWORK ── */}
      <section className="ac-section ac-super">
        <div className="ac-wrap">
          <p className="ac-eyebrow">The System</p>
          <h2 className="ac-h2">The S.U.P.E.R. Framework™</h2>
          <p className="ac-lead">
            Five modules. One complete system. Built in the exact order that gets you paid.
          </p>
          <div className="ac-super__steps">
            {[
              {
                letter: "S",
                word: "Strategy",
                color: "#9E182B",
                desc: "Niche selection, trend intelligence, offer positioning, and platform-specific content systems. Know exactly what to make before you make it.",
                outcomes: ["Niche locked in 48 hours", "Content calendar built", "Trend monitoring system set up"],
              },
              {
                letter: "U",
                word: "UGC Creation",
                color: "#B31E34",
                desc: "Avatar creation, hook writing, scripting, and direct-response copywriting. Build your faceless creator identity and the content that converts.",
                outcomes: ["AI avatar created + locked", "10 hooks written", "First script completed"],
              },
              {
                letter: "P",
                word: "Production",
                color: "#C41F35",
                desc: "Higgsfield, Seedance, Kling, and Nano Banana — full cinematic production workflow. Scene by scene, prompt by prompt.",
                outcomes: ["First full AI ad produced", "Prompt templates built", "Production workflow systemised"],
              },
              {
                letter: "E",
                word: "Enhancement",
                color: "#D42040",
                desc: "ElevenLabs voice lock, CapCut editing, realism engineering, and the finishing layer that makes AI footage look filmed.",
                outcomes: ["Voice locked in ElevenLabs", "Edit workflow built in CapCut", "Realism score 90+"],
              },
              {
                letter: "R",
                word: "Release",
                color: "#E52245",
                desc: "Portfolio building, cold outreach, DM scripts, pricing, and client systems. Go from creator to paid professional.",
                outcomes: ["Portfolio built", "First 25 brands identified", "First outreach sent"],
              },
            ].map((s, i) => (
              <div key={s.letter} className="ac-super__step">
                <div className="ac-super__letter" style={{ background: s.color }}>{s.letter}</div>
                <div className="ac-super__content">
                  <div className="ac-super__word">{s.word}</div>
                  <p className="ac-super__desc">{s.desc}</p>
                  <ul className="ac-super__outcomes">
                    {s.outcomes.map((o) => (
                      <li key={o}><span className="ac-check">✓</span>{o}</li>
                    ))}
                  </ul>
                </div>
                {i < 4 && <div className="ac-super__arrow">↓</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU LEARN ── */}
      <section className="ac-section ac-learn">
        <div className="ac-wrap">
          <p className="ac-eyebrow">Curriculum</p>
          <h2 className="ac-h2">Everything you'll know<br /><em>by the end.</em></h2>
          <div className="ac-learn__grid">
            {[
              "Create hyper-realistic AI avatars that stay consistent across every video",
              "Write direct-response hooks under 12 words that stop the scroll",
              "Generate Seedance 2.0 cinematic briefs with timestamped motion scripts",
              "Lock your AI creator's face, voice, and identity across platforms",
              "Build a client-ready portfolio with zero existing brand deals",
              "Price your services from CHF 500 entry to CHF 3,000+ retainers",
              "Use Higgsfield, Kling, Nano Banana, and ElevenLabs in one workflow",
              "Send cold DMs that convert without feeling spammy",
              "Create content that performs for beauty, fitness, tech, and ecommerce brands",
              "Build a content OS that lets you post daily without burnout",
            ].map((item) => (
              <div key={item} className="ac-learn__item">
                <span className="ac-learn__check">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BONUSES ── */}
      <section className="ac-section ac-bonuses">
        <div className="ac-wrap">
          <p className="ac-eyebrow">Bonuses</p>
          <h2 className="ac-h2">Everything included<br /><em>on day one.</em></h2>
          <div className="ac-bonuses__grid">
            {[
              {
                icon: "🔐",
                title: "Prompt Vault",
                value: "CHF 297 value",
                desc: "200+ production-ready prompts for Seedance, Kling, Nano Banana, Midjourney, and Flux. Copy, paste, generate.",
              },
              {
                icon: "📁",
                title: "Portfolio Builder",
                value: "CHF 197 value",
                desc: "Templates, case study frameworks, and a step-by-step system for building a portfolio that converts brand managers.",
              },
              {
                icon: "🎣",
                title: "50 Viral Hooks",
                value: "CHF 97 value",
                desc: "Direct-response hooks across beauty, fitness, tech, and lifestyle. Each with a breakdown of why it works.",
              },
              {
                icon: "📝",
                title: "25 Script Templates",
                value: "CHF 147 value",
                desc: "Full UGC ad scripts for TikTok, Reels, and Shorts. Tested formats that work across niches.",
              },
              {
                icon: "💬",
                title: "Private Community",
                value: "Priceless",
                desc: "A space with other faceless AI creators. Get feedback, share wins, and find accountability partners.",
              },
            ].map((b) => (
              <div key={b.title} className="ac-bonus__card">
                <span className="ac-bonus__icon">{b.icon}</span>
                <div className="ac-bonus__body">
                  <div className="ac-bonus__header">
                    <h3 className="ac-bonus__title">{b.title}</h3>
                    <span className="ac-bonus__value">{b.value}</span>
                  </div>
                  <p className="ac-bonus__desc">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section className="ac-section ac-community">
        <div className="ac-wrap ac-community__inner">
          <div>
            <p className="ac-eyebrow ac-eyebrow--light">Community</p>
            <h2 className="ac-h2 ac-h2--light">You don't build this<br /><em>alone.</em></h2>
            <p className="ac-community__sub">
              The AI UGC Academy community is where the real learning happens. Get feedback
              on your content, accountability from other creators, and first access to new tools
              and opportunities.
            </p>
            <ul className="ac-community__perks">
              {[
                "Daily feedback on your AI content",
                "Live Q&A sessions with the instructors",
                "First access to new tools and workflows",
                "Client opportunity board",
                "Accountability partners",
              ].map((p) => (
                <li key={p}><span className="ac-check">✓</span>{p}</li>
              ))}
            </ul>
            <a
              href="https://t.me/+RpWuvhNGltYyZDRk"
              target="_blank"
              rel="noopener noreferrer"
              className="ac-btn ac-btn--tele"
            >
              💬 JOIN THE COMMUNITY NOW — FREE
            </a>
          </div>
          <div className="ac-community__card">
            <div className="ac-community__card-icon">💬</div>
            <h3>AI UGC Academy</h3>
            <p>Telegram Community</p>
            <div className="ac-community__stats">
              <div><strong>Free</strong><span>to join</span></div>
              <div><strong>Active</strong><span>daily</span></div>
              <div><strong>Real</strong><span>creators</span></div>
            </div>
            <a
              href="https://t.me/+RpWuvhNGltYyZDRk"
              target="_blank"
              rel="noopener noreferrer"
              className="ac-btn ac-btn--tele ac-btn--full"
            >
              Join on Telegram →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOUNDING MEMBER ── */}
      <section className="ac-section ac-founding">
        <div className="ac-wrap ac-founding__inner">
          <p className="ac-eyebrow">Founding Member Offer</p>
          <h2 className="ac-h2">Lock your spot<br /><em>before doors open.</em></h2>
          <p className="ac-lead">
            Founding members get the lowest price we'll ever offer, lifetime access to all future
            updates, and direct access to us before the course goes public.
          </p>
          <div className="ac-founding__benefits">
            {[
              "Lowest price — locked forever",
              "Lifetime access including future modules",
              "Direct founding member Telegram group",
              "First access to the Prompt Vault",
              "Portfolio review from the instructors",
            ].map((b) => (
              <div key={b} className="ac-founding__benefit">
                <span className="ac-founding__check">✓</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
          <Link href="/waitlist" className="ac-btn ac-btn--primary ac-btn--lg">
            ⚡ JOIN THE FOUNDING WAITLIST
          </Link>
          <p className="ac-founding__note">No payment now · No commitment · Just your spot</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ac-section ac-faq">
        <div className="ac-wrap">
          <p className="ac-eyebrow">FAQ</p>
          <h2 className="ac-h2">Questions<br /><em>answered.</em></h2>
          <div className="ac-faq__list">
            {[
              {
                q: "Do I need any experience?",
                a: "Zero. The Academy starts from the very beginning — what AI UGC is, why brands buy it, and how to make it. No tech background, no content experience, no existing clients required.",
              },
              {
                q: "Do I need to show my face?",
                a: "Never. The entire system is built for faceless creators. Your AI avatar does the on-screen work. You stay behind the keyboard.",
              },
              {
                q: "How long does it take to get a first client?",
                a: "Most students who complete the portfolio module and send outreach land their first paid project within 30–60 days. Speed depends on consistency, not talent.",
              },
              {
                q: "What tools do I need?",
                a: "You'll need SuperCool Influencer (for strategy and briefs), Higgsfield or Kling (for video), Nano Banana (for images), ElevenLabs (for voice), and CapCut (free for editing). Total monthly cost under CHF 100.",
              },
              {
                q: "When does the course open?",
                a: "We're opening to founding members first. Join the waitlist to get first access, the founding price, and a direct line to us before launch.",
              },
              {
                q: "What's included in the founding member price?",
                a: "All 5 modules, all bonuses (Prompt Vault, Portfolio Builder, 50 Hooks, 25 Scripts), community access, and lifetime access to all future updates — at the lowest price we'll ever charge.",
              },
            ].map((faq) => (
              <details key={faq.q} className="ac-faq__item">
                <summary className="ac-faq__q">{faq.q}<span className="ac-faq__icon">+</span></summary>
                <p className="ac-faq__a">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="ac-section ac-finalcta">
        <div className="ac-wrap ac-finalcta__inner">
          <h2 className="ac-h2 ac-h2--light">
            Stop watching others<br />
            <em>build this business.</em>
          </h2>
          <p className="ac-finalcta__sub">
            The AI UGC opportunity is real. Brands are buying. The only question is whether
            you're in the room when they do.
          </p>
          <div className="ac-finalcta__ctas">
            <Link href="/waitlist" className="ac-btn ac-btn--primary ac-btn--lg">
              ⚡ JOIN THE FOUNDING WAITLIST
            </Link>
            <Link href="/free" className="ac-btn ac-btn--ghost-light ac-btn--lg">
              GET FREE STARTER KIT →
            </Link>
          </div>
          <p className="ac-finalcta__note">No payment now · Founding spots limited</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ac-footer">
        <div className="ac-wrap">
          <p>AI UGC ACADEMY · Part of <Link href="/" className="ac-footer__link">SuperCool Influencer</Link></p>
          <p className="ac-footer__sub">© 2025 SuperCool Influencer. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        /* ── TOKENS ── */
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
          --r: 10px;
          --rlg: 18px;
        }

        /* ── BASE ── */
        .ac * { box-sizing: border-box; }
        .ac {
          font-family: var(--sans);
          color: var(--ink);
          background: var(--paper);
          overflow-x: hidden;
        }
        .ac-wrap {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .ac-section { padding: 80px 0; }

        /* ── NAV ── */
        .ac-nav {
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
        .ac-nav__logo {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-decoration: none;
          color: var(--ink);
        }
        .ac-nav__logo-super { color: var(--wine); }
        .ac-nav__links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .ac-nav__link {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-decoration: none;
          color: var(--mute);
          text-transform: uppercase;
        }
        .ac-nav__link--active { color: var(--wine); }
        .ac-nav__cta {
          padding: 8px 18px;
          background: var(--wine);
          color: var(--paper);
          border-radius: var(--r);
          font-size: 0.75rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.06em;
        }

        /* ── TYPOGRAPHY ── */
        .ac-h2 {
          font-family: var(--serif);
          font-size: clamp(2rem, 6vw, 3rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--wine);
          margin: 0 0 1.25rem;
        }
        .ac-h2 em { font-style: italic; color: var(--wine2); }
        .ac-h2--light { color: var(--paper); }
        .ac-h2--light em { color: var(--blush); }
        .ac-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--wine);
          margin-bottom: 12px;
        }
        .ac-eyebrow--light { color: var(--blush); }
        .ac-lead {
          font-size: clamp(1rem, 2.5vw, 1.15rem);
          color: var(--mute);
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 600px;
        }
        .ac-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--blush);
        }
        .ac-check {
          color: var(--wine);
          font-weight: 700;
          margin-right: 8px;
        }

        /* ── BUTTONS ── */
        .ac-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          white-space: nowrap;
        }
        .ac-btn--primary { background: var(--wine); color: var(--paper); }
        .ac-btn--primary:hover { background: var(--wine2); }
        .ac-btn--ghost {
          background: transparent;
          color: var(--wine);
          border: 1.5px solid var(--wine);
        }
        .ac-btn--ghost:hover { background: var(--wine); color: var(--paper); }
        .ac-btn--ghost-light {
          background: transparent;
          color: var(--paper);
          border: 1.5px solid rgba(255,255,255,0.3);
        }
        .ac-btn--ghost-light:hover { border-color: var(--blush); color: var(--blush); }
        .ac-btn--tele { background: #229ED9; color: #fff; }
        .ac-btn--tele:hover { background: #1a8bbf; }
        .ac-btn--lg { padding: 16px 32px; font-size: 0.82rem; }
        .ac-btn--full { width: 100%; }

        /* ── HERO ── */
        .ac-hero {
          background: radial-gradient(130% 100% at 70% 0%, var(--wine) 0%, var(--wine2) 50%, var(--wine3) 100%);
          padding: 96px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .ac-hero__bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
          background-size: 28px 28px;
        }
        .ac-hero .ac-wrap { position: relative; z-index: 2; }
        .ac-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border: 1px solid rgba(242,175,188,0.4);
          border-radius: 100px;
          background: rgba(255,255,255,0.08);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 24px;
        }
        .ac-hero__h1 {
          font-family: var(--serif);
          font-size: clamp(2.8rem, 9vw, 5.5rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: var(--paper);
          margin: 0 0 1.5rem;
        }
        .ac-hero__h1 em {
          font-style: italic;
          color: var(--blush);
          display: block;
        }
        .ac-hero__sub {
          font-size: clamp(1rem, 2.5vw, 1.15rem);
          color: var(--rose);
          max-width: 580px;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .ac-hero__ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .ac-hero__note {
          font-size: 0.78rem;
          color: var(--blush);
          margin-bottom: 3rem;
        }
        .ac-hero__stats {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .ac-hero__stat {
          display: flex;
          flex-direction: column;
        }
        .ac-hero__stat-val {
          font-family: var(--serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--paper);
          line-height: 1;
        }
        .ac-hero__stat-label {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--blush);
          margin-top: 4px;
        }

        /* ── FOR WHO ── */
        .ac-for { background: var(--oat); }
        .ac-for__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 2rem;
        }
        .ac-for__card {
          background: var(--paper);
          border: 1px solid var(--oatc);
          border-radius: var(--rlg);
          padding: 24px;
        }
        .ac-for__icon { font-size: 1.8rem; display: block; margin-bottom: 12px; }
        .ac-for__title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--wine);
          margin-bottom: 6px;
        }
        .ac-for__desc {
          font-size: 0.88rem;
          color: var(--mute);
          line-height: 1.6;
          margin: 0;
        }

        /* ── SUPER FRAMEWORK ── */
        .ac-super { background: var(--paper); }
        .ac-super__steps {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 2.5rem;
          position: relative;
        }
        .ac-super__step {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          position: relative;
        }
        .ac-super__letter {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--serif);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--paper);
          position: relative;
          z-index: 2;
        }
        .ac-super__content {
          flex: 1;
          padding: 0 0 40px;
          border-left: 2px solid var(--oatc);
          margin-left: 0;
          padding-left: 24px;
          margin-left: -28px;
          padding-top: 4px;
        }
        .ac-super__word {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--wine);
          margin-bottom: 8px;
          letter-spacing: 0.02em;
        }
        .ac-super__desc {
          font-size: 0.9rem;
          color: var(--mute);
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .ac-super__outcomes {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ac-super__outcomes li {
          font-size: 0.82rem;
          color: var(--ink);
          display: flex;
          align-items: center;
        }
        .ac-super__arrow {
          position: absolute;
          left: 25px;
          bottom: 12px;
          color: var(--oatc);
          font-size: 1.2rem;
          font-weight: 700;
        }

        /* ── LEARN ── */
        .ac-learn { background: var(--wine); }
        .ac-learn .ac-eyebrow { color: var(--blush); }
        .ac-learn__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 2rem;
        }
        .ac-learn__item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--r);
          font-size: 0.85rem;
          color: var(--rose);
          line-height: 1.5;
        }
        .ac-learn__check {
          color: var(--blush);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* ── BONUSES ── */
        .ac-bonuses { background: var(--oat); }
        .ac-bonuses__grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 2rem;
        }
        .ac-bonus__card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          background: var(--paper);
          border: 1px solid var(--oatc);
          border-radius: var(--rlg);
          padding: 20px 24px;
        }
        .ac-bonus__icon { font-size: 1.8rem; flex-shrink: 0; }
        .ac-bonus__body { flex: 1; }
        .ac-bonus__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }
        .ac-bonus__title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--wine);
          margin: 0;
        }
        .ac-bonus__value {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--mute);
          text-transform: uppercase;
        }
        .ac-bonus__desc {
          font-size: 0.88rem;
          color: var(--mute);
          line-height: 1.6;
          margin: 0;
        }

        /* ── COMMUNITY ── */
        .ac-community {
          background: var(--wine3);
        }
        .ac-community__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .ac-community__sub {
          font-size: 0.95rem;
          color: var(--rose);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .ac-community__perks {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ac-community__perks li {
          font-size: 0.88rem;
          color: var(--rose);
          display: flex;
          align-items: center;
        }
        .ac-community__perks .ac-check { color: var(--blush); }
        .ac-community__card {
          background: var(--paper);
          border-radius: var(--rlg);
          padding: 32px;
          text-align: center;
        }
        .ac-community__card-icon { font-size: 2.5rem; margin-bottom: 12px; }
        .ac-community__card h3 {
          font-family: var(--serif);
          font-size: 1.3rem;
          color: var(--wine);
          margin-bottom: 4px;
        }
        .ac-community__card p {
          font-size: 0.82rem;
          color: var(--mute);
          margin-bottom: 20px;
        }
        .ac-community__stats {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 20px;
          padding: 16px 0;
          border-top: 1px solid var(--oatc);
          border-bottom: 1px solid var(--oatc);
        }
        .ac-community__stats div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ac-community__stats strong {
          font-size: 1.1rem;
          color: var(--wine);
          display: block;
        }
        .ac-community__stats span {
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--mute);
        }

        /* ── FOUNDING ── */
        .ac-founding {
          background: var(--paper);
          text-align: center;
        }
        .ac-founding__inner {
          max-width: 640px;
          margin: 0 auto;
        }
        .ac-founding__benefits {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 2rem 0;
          text-align: left;
        }
        .ac-founding__benefit {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: var(--oat);
          border-radius: var(--r);
          font-size: 0.9rem;
          color: var(--ink);
        }
        .ac-founding__check {
          color: var(--wine);
          font-weight: 700;
        }
        .ac-founding__note {
          font-size: 0.75rem;
          color: var(--mute);
          margin-top: 12px;
        }

        /* ── FAQ ── */
        .ac-faq { background: var(--oat); }
        .ac-faq__list {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ac-faq__item {
          background: var(--paper);
          border: 1px solid var(--oatc);
          border-radius: var(--r);
          overflow: hidden;
        }
        .ac-faq__q {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--wine);
          cursor: pointer;
          list-style: none;
          gap: 16px;
        }
        .ac-faq__q::-webkit-details-marker { display: none; }
        .ac-faq__icon {
          font-size: 1.3rem;
          color: var(--blush);
          flex-shrink: 0;
        }
        details[open] .ac-faq__icon::before { content: "–"; }
        .ac-faq__icon::before { content: "+"; }
        .ac-faq__icon { font-size: 0; }
        .ac-faq__icon::before { font-size: 1.3rem; }
        .ac-faq__a {
          padding: 0 20px 16px;
          font-size: 0.88rem;
          color: var(--mute);
          line-height: 1.7;
          margin: 0;
        }

        /* ── FINAL CTA ── */
        .ac-finalcta {
          background: radial-gradient(120% 90% at 60% 0%, var(--wine) 0%, var(--wine3) 100%);
          text-align: center;
        }
        .ac-finalcta__inner { max-width: 640px; margin: 0 auto; }
        .ac-finalcta__sub {
          font-size: 1rem;
          color: var(--rose);
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .ac-finalcta__ctas {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .ac-finalcta__note {
          font-size: 0.75rem;
          color: var(--blush);
        }

        /* ── FOOTER ── */
        .ac-footer {
          background: var(--wine3);
          padding: 32px 24px;
          text-align: center;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: var(--blush);
        }
        .ac-footer__link {
          color: var(--rose);
          text-decoration: none;
        }
        .ac-footer__sub {
          color: var(--mute);
          margin-top: 4px;
          font-size: 0.65rem;
        }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          .ac-section { padding: 60px 0; }
          .ac-nav__links { display: none; }
          .ac-hero { padding: 64px 0 60px; }
          .ac-for__grid { grid-template-columns: 1fr; }
          .ac-learn__grid { grid-template-columns: 1fr; }
          .ac-community__inner { grid-template-columns: 1fr; gap: 32px; }
          .ac-hero__ctas { flex-direction: column; }
          .ac-hero__ctas .ac-btn { width: 100%; }
          .ac-finalcta__ctas { flex-direction: column; align-items: center; }
          .ac-finalcta__ctas .ac-btn { width: 100%; max-width: 320px; }
          .ac-hero__stats { gap: 20px; }
        }
      `}</style>
    </main>
  );
}
