"use client";

import Link from "next/link";

export default function AcademyPage() {
  const beaconsLink = "https://website.beacons.ai/esha.aiugc";

  return (
    <main className="academy">
      {/* NAV */}
      <nav className="academy-nav">
        <Link href="/" className="academy-nav__logo">
          <span className="academy-nav__super">SUPER</span>COOL INFLUENCER
        </Link>
      </nav>

      {/* HERO */}
      <section className="academy-hero">
        <div className="academy-wrap">
          <div className="academy-eyebrow">
            <span className="academy-dot" /> AI Influencer Academy · Now Open
          </div>
          <h1 className="academy-h1">
            Build Your<br />
            <em>Realistic AI Influencer</em>
          </h1>
          <p className="academy-sub">
            Create realistic AI human avatars, lifestyle scenes, reels, vlogs, beauty content, and brand-style content — even if you are starting from zero.
          </p>

          <div className="academy-perks">
            <div className="academy-perk">✓ Realistic Human Avatars</div>
            <div className="academy-perk">✓ AI Reels & Vlogs</div>
            <div className="academy-perk">✓ Beauty + Lifestyle Scenes</div>
            <div className="academy-perk">✓ Faceless Creator Realism Studio™</div>
            <div className="academy-perk">✓ Step-by-Step Training</div>
          </div>

          <a href={beaconsLink} className="academy-btn">
            ⚡ UNLOCK INSTANT ACCESS
          </a>
          <p className="academy-price">Launch Price $197 · Regular Value $465</p>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="academy-section academy-section--wine">
        <div className="academy-wrap">
          <h2 className="academy-h2 academy-h2--light">The Complete AI Influencer System™ Is Now Open</h2>
          <p className="academy-section__text academy-section__text--light">
            AI Influencer Academy™ gives you the step-by-step training, tools, prompts, and workflows to build a realistic AI influencer and turn simple ideas into content you can use for social media, portfolios, campaigns, and digital products.
          </p>
          <div style={{ textAlign: "center" }}>
            <a href={beaconsLink} className="academy-btn academy-btn--light">
              GET INSTANT ACCESS
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="academy-section">
        <div className="academy-wrap">
          <h2 className="academy-h2">What You'll Learn Inside</h2>
          <div className="academy-grid">
            <div className="academy-card">
              <h3>Build Your AI Influencer</h3>
              <p>Create your avatar identity, headshot, full-body image, character bible, and reference package.</p>
            </div>
            <div className="academy-card">
              <h3>Create Realistic AI Photos</h3>
              <p>Learn how to create lifestyle scenes, beauty content, product campaigns, and realistic visual stories.</p>
            </div>
            <div className="academy-card">
              <h3>Make AI Reels + Vlogs</h3>
              <p>Turn simple ideas into storyboards, shot lists, video prompts, and social media content.</p>
            </div>
            <div className="academy-card">
              <h3>Use The Studio</h3>
              <p>Use Faceless Creator Realism Studio™ to generate prompts, scenes, storyboards, video direction, and content plans.</p>
            </div>
            <div className="academy-card">
              <h3>Monetize Your Workflow</h3>
              <p>Learn how to turn your AI creator skills into digital products, AI UGC services, affiliate content, and brand offers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="academy-section academy-section--blush">
        <div className="academy-wrap">
          <h2 className="academy-h2">Included With Your Enrollment</h2>
          <div className="academy-included">
            <div className="academy-included__item">• AI Influencer Academy™ video lessons</div>
            <div className="academy-included__item">• Faceless Creator Realism Studio™ access</div>
            <div className="academy-included__item">• Prompt Vault</div>
            <div className="academy-included__item">• Student workbooks</div>
            <div className="academy-included__item">• Video creation workflow</div>
            <div className="academy-included__item">• Content strategy system</div>
            <div className="academy-included__item">• Business + monetization toolkit</div>
            <div className="academy-included__item">• Portfolio and brand content guidance</div>
          </div>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="academy-section">
        <div className="academy-wrap">
          <h2 className="academy-h2">This Is For You If…</h2>
          <div className="academy-bullets">
            <div className="academy-bullet">✓ You want to create realistic AI human avatars</div>
            <div className="academy-bullet">✓ You want to make AI reels, vlogs, and lifestyle content</div>
            <div className="academy-bullet">✓ You want faceless content without being on camera</div>
            <div className="academy-bullet">✓ You want beauty, UGC, product, and creator-style content</div>
            <div className="academy-bullet">✓ You want a beginner-friendly step-by-step system</div>
            <div className="academy-bullet">✓ You want to stop guessing prompts</div>
            <div className="academy-bullet">✓ You want to turn your AI creator workflow into income</div>
          </div>
        </div>
      </section>

      {/* SECTION 6 */}
      <section className="academy-section academy-section--wine">
        <div className="academy-wrap">
          <h2 className="academy-h2 academy-h2--light">This Is Not Just A Prompt Pack</h2>
          <p className="academy-section__text academy-section__text--light">
            This is a complete AI creator system. You are not just getting random prompts. You are learning how to build your avatar, lock the identity, create realistic scenes, plan content, direct videos, edit your workflow, and monetize your results.
          </p>
        </div>
      </section>

      {/* SECTION 7 */}
      <section className="academy-section">
        <div className="academy-wrap">
          <h2 className="academy-h2">Start Today For $197</h2>
          <p className="academy-section__text">
            Get instant access to AI Influencer Academy™, Faceless Creator Realism Studio™, the Prompt Vault, student resources, and the monetization toolkit.
          </p>
          <div style={{ textAlign: "center" }}>
            <a href={beaconsLink} className="academy-btn">
              UNLOCK INSTANT ACCESS
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ */}
      <section className="academy-section academy-section--blush">
        <div className="academy-wrap">
          <h2 className="academy-h2">Frequently Asked Questions</h2>
          <div className="academy-faq">
            <div className="academy-faq__item">
              <h4>Q: Is this a waitlist?</h4>
              <p>A: No. The course is live now. You can unlock instant access today.</p>
            </div>
            <div className="academy-faq__item">
              <h4>Q: What happens after I buy?</h4>
              <p>A: You'll be taken through Beacon checkout and receive access to the course dashboard and resources.</p>
            </div>
            <div className="academy-faq__item">
              <h4>Q: Is this only a GPT?</h4>
              <p>A: No. This is a full course system with video lessons, workbooks, prompts, Studio access, video workflow, and monetization training.</p>
            </div>
            <div className="academy-faq__item">
              <h4>Q: Can beginners join?</h4>
              <p>A: Yes. The course is made for beginners and walks you through the process step by step.</p>
            </div>
            <div className="academy-faq__item">
              <h4>Q: What can I create?</h4>
              <p>A: You can create AI influencer headshots, full-body references, character sheets, lifestyle scenes, product campaigns, reels, vlogs, storyboards, prompts, and portfolio content.</p>
            </div>
            <div className="academy-faq__item">
              <h4>Q: Do I need to show my face?</h4>
              <p>A: No. This is designed for faceless creators who want to build AI influencer content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="academy-final">
        <div className="academy-wrap">
          <h2 className="academy-h1 academy-h1--sm">
            Ready To Build<br />
            <em>Your AI Influencer?</em>
          </h2>
          <p className="academy-section__text">
            Start today and get instant access to the complete creator system.
          </p>
          <a href={beaconsLink} className="academy-btn">
            ⚡ UNLOCK INSTANT ACCESS
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="academy-footer">
        <div className="academy-wrap">
          <p>AI INFLUENCER ACADEMY · <Link href="/" className="academy-footer__link">SuperCool Influencer</Link></p>
        </div>
      </footer>

      <style>{`
        :root {
          --rose: #F9CBD6;
          --blush: #F2AFBC;
          --wine: #9E182B;
          --oat: #F2E0D2;
          --ink: #1A0508;
          --mute: #9B6A72;
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;
        }

        .academy * { box-sizing: border-box; }
        .academy { font-family: var(--sans); color: var(--ink); background: var(--oat); overflow-x: hidden; }
        .academy-wrap { max-width: 1000px; margin: 0 auto; padding: 0 24px; }

        /* NAV */
        .academy-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(158, 24, 43, 0.15);
          background: var(--oat);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .academy-nav__logo {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-decoration: none;
          color: var(--ink);
        }

        .academy-nav__super { color: var(--wine); }

        /* HERO */
        .academy-hero {
          background: linear-gradient(135deg, var(--oat) 0%, var(--rose) 100%);
          padding: 80px 0;
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
        }

        .academy-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(158, 24, 43, 0.05) 1px, transparent 0);
          background-size: 28px 28px;
        }

        .academy-hero .academy-wrap { position: relative; z-index: 2; }

        .academy-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border: 1px solid var(--wine);
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.6);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--wine);
          margin-bottom: 32px;
        }

        .academy-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--wine);
        }

        .academy-h1 {
          font-family: var(--serif);
          font-size: clamp(2.5rem, 7vw, 4.5rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 0 0 1.25rem;
        }

        .academy-h1 em {
          font-style: italic;
          color: var(--wine);
          display: block;
        }

        .academy-h1--sm { font-size: clamp(2rem, 5vw, 3rem); }

        .academy-sub {
          font-size: 1rem;
          color: var(--ink);
          line-height: 1.7;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .academy-perks {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 1.5rem;
        }

        .academy-perk {
          font-size: 0.88rem;
          color: var(--wine);
          font-weight: 500;
        }

        .academy-btn {
          display: inline-block;
          padding: 15px 32px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--wine);
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          margin-bottom: 12px;
        }

        .academy-btn:hover {
          background: #7a1220;
          transform: translateY(-2px);
        }

        .academy-btn--light {
          background: white;
          color: var(--wine);
        }

        .academy-btn--light:hover {
          background: var(--oat);
          color: var(--wine);
        }

        .academy-price {
          font-size: 0.82rem;
          color: var(--wine);
          margin: 0;
          font-weight: 500;
        }

        /* SECTIONS */
        .academy-section {
          background: white;
          padding: 60px 0;
          border-bottom: 1px solid var(--rose);
        }

        .academy-section--wine {
          background: var(--wine);
          border-bottom: none;
        }

        .academy-section--blush {
          background: var(--rose);
          border-bottom: 1px solid var(--blush);
        }

        .academy-h2 {
          font-family: var(--serif);
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          font-weight: 800;
          color: var(--wine);
          text-align: center;
          margin-bottom: 24px;
          letter-spacing: -0.01em;
        }

        .academy-h2--light {
          color: white;
        }

        .academy-section__text {
          font-size: 0.95rem;
          color: var(--ink);
          line-height: 1.7;
          text-align: center;
          max-width: 700px;
          margin: 0 auto 2rem;
          opacity: 0.85;
        }

        .academy-section__text--light {
          color: white;
          opacity: 1;
        }

        /* GRID */
        .academy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 40px;
        }

        .academy-card {
          background: linear-gradient(135deg, var(--rose) 0%, var(--blush) 100%);
          border: 1px solid rgba(158, 24, 43, 0.2);
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(158, 24, 43, 0.08);
        }

        .academy-card h3 {
          color: var(--wine);
          font-size: 1.1rem;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .academy-card p {
          color: var(--ink);
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
          opacity: 0.85;
        }

        /* INCLUDED */
        .academy-included {
          max-width: 700px;
          margin: 40px auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .academy-included__item {
          color: var(--wine);
          font-size: 0.9rem;
          padding: 8px 0;
          border-bottom: 1px solid rgba(158, 24, 43, 0.2);
          font-weight: 500;
        }

        /* BULLETS */
        .academy-bullets {
          max-width: 700px;
          margin: 40px auto;
        }

        .academy-bullet {
          color: var(--wine);
          font-size: 0.95rem;
          margin-bottom: 12px;
          font-weight: 500;
        }

        /* FAQ */
        .academy-faq {
          max-width: 700px;
          margin: 40px auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .academy-faq__item {
          background: rgba(158, 24, 43, 0.1);
          border-left: 3px solid var(--wine);
          padding: 16px 20px;
          border-radius: 4px;
        }

        .academy-faq__item h4 {
          color: var(--wine);
          margin-bottom: 8px;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .academy-faq__item p {
          color: var(--ink);
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.6;
          opacity: 0.85;
        }

        /* FINAL */
        .academy-final {
          background: linear-gradient(135deg, var(--wine) 0%, #7a1220 100%);
          padding: 80px 0;
          text-align: center;
          position: relative;
          color: white;
        }

        .academy-final::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
          background-size: 28px 28px;
        }

        .academy-final .academy-wrap { position: relative; z-index: 2; }

        .academy-final .academy-h1 {
          color: white;
          margin-bottom: 1rem;
        }

        .academy-final .academy-h1 em {
          color: var(--rose);
        }

        .academy-final .academy-section__text {
          color: white;
          opacity: 1;
        }

        /* FOOTER */
        .academy-footer {
          background: var(--wine);
          padding: 28px 24px;
          text-align: center;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--rose);
        }

        .academy-footer__link {
          color: white;
          text-decoration: none;
        }

        /* MOBILE */
        @media (max-width: 640px) {
          .academy-hero { padding: 60px 0; min-height: auto; }
          .academy-included { grid-template-columns: 1fr; }
          .academy-grid { grid-template-columns: 1fr; }
          .academy-btn { width: 100%; }
        }
      `}</style>
    </main>
  );
}
