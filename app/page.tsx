import Link from "next/link";

export default function Home() {
  return (
    <div style={{ background: '#0A0608', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --ivory: #F5F0E8;
          --blush: #F2AFBC;
          --wine: #9E182B;
          --oat: #F2E0D2;
          --gold: #D4AF87;
          --dark: #0A0608;
          --dark2: #110C0F;
          --dark3: #1A1318;
        }
        html { scroll-behavior: smooth; }
        .cg { font-family: 'Cormorant Garamond', Georgia, serif; }
        .inter { font-family: 'Inter', sans-serif; }
        body::after {
          content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 9998; opacity: 0.3;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; justify-content: space-between; align-items: center;
          padding: 22px 48px;
          background: linear-gradient(to bottom, rgba(10,6,8,0.95), transparent);
          backdrop-filter: blur(4px);
        }
        .logo-wrap { display: flex; flex-direction: column; gap: 0; text-decoration: none; }
        .logo-sup { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 16px; color: var(--ivory); letter-spacing: 0.25em; text-transform: uppercase; line-height: 1; }
        .logo-sup strong { font-weight: 600; }
        .logo-sub-line { font-family: 'Inter', sans-serif; font-size: 7px; font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(245,240,232,0.3); margin-top: 3px; }
        .nav-links { display: flex; gap: 32px; align-items: center; }
        .nav-a { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(245,240,232,0.45); text-decoration: none; transition: color 0.3s; }
        .nav-a:hover { color: var(--ivory); }
        .nav-cta { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: var(--ivory); color: var(--dark); padding: 10px 24px; border-radius: 2px; text-decoration: none; transition: background 0.3s; }
        .nav-cta:hover { background: var(--oat); }

        /* STICKY MOBILE CTA */
        .sticky-mobile { display: none; position: fixed; bottom: 20px; left: 24px; right: 24px; z-index: 999; }
        .sticky-mobile-btn { display: block; text-align: center; background: var(--ivory); color: var(--dark); font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 16px; border-radius: 2px; text-decoration: none; box-shadow: 0 16px 48px rgba(0,0,0,0.7); }

        /* HERO */
        .hero {
          min-height: 100svh; display: flex; flex-direction: column;
          justify-content: flex-end; padding: 0 48px 80px;
          position: relative; overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 90% 70% at 65% 25%, rgba(158,24,43,0.2) 0%, transparent 55%),
                      radial-gradient(ellipse 50% 50% at 15% 75%, rgba(212,175,135,0.08) 0%, transparent 50%),
                      linear-gradient(160deg, #110609 0%, #0A0608 50%, #0C0608 100%);
        }
        .hero-grid {
          position: absolute; inset: 0; opacity: 0.035;
          background-image: linear-gradient(to right, var(--ivory) 1px, transparent 1px), linear-gradient(to bottom, var(--ivory) 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .hero-content { position: relative; z-index: 2; max-width: 820px; }
        .hero-eyebrow { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 32px; font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--blush); }
        .hero-eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--blush); }
        .hero-h1 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(56px, 10vw, 112px); line-height: 0.92; letter-spacing: -2px; color: var(--ivory); margin-bottom: 32px; }
        .hero-h1 em { font-style: italic; color: var(--blush); display: block; }
        .hero-h1 strong { font-weight: 600; display: block; }
        .hero-sub { font-family: 'Inter', sans-serif; font-size: clamp(13px, 2vw, 16px); font-weight: 300; line-height: 1.8; color: rgba(245,240,232,0.45); max-width: 420px; margin-bottom: 48px; letter-spacing: 0.02em; }
        .hero-sub strong { color: var(--ivory); font-weight: 500; }
        .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn-ivory { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; background: var(--ivory); color: var(--dark); padding: 16px 40px; border-radius: 2px; text-decoration: none; transition: all 0.3s; box-shadow: 0 8px 32px rgba(245,240,232,0.1); }
        .btn-ivory:hover { background: var(--oat); }
        .btn-ghost { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid rgba(245,240,232,0.18); color: rgba(245,240,232,0.45); padding: 16px 36px; border-radius: 2px; text-decoration: none; transition: all 0.3s; }
        .btn-ghost:hover { color: var(--ivory); border-color: rgba(245,240,232,0.4); }
        .hero-scroll { position: absolute; bottom: 32px; right: 48px; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .hero-scroll-line { width: 1px; height: 52px; background: linear-gradient(to bottom, rgba(245,240,232,0.2), transparent); animation: scrollpulse 2s ease-in-out infinite; }
        .hero-scroll-label { font-family: 'Inter', sans-serif; font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(245,240,232,0.2); }
        @keyframes scrollpulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

        /* MARQUEE */
        .marquee { border-top: 1px solid rgba(245,240,232,0.06); border-bottom: 1px solid rgba(245,240,232,0.06); padding: 16px 0; overflow: hidden; background: var(--dark2); }
        .marquee-track { display: flex; white-space: nowrap; animation: marquee 28s linear infinite; }
        .marquee-item { display: inline-flex; align-items: center; gap: 28px; padding: 0 28px; font-family: 'Cormorant Garamond', serif; font-size: 13px; font-style: italic; color: rgba(245,240,232,0.22); letter-spacing: 0.06em; flex-shrink: 0; }
        .marquee-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--blush); opacity: 0.5; }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* SECTION BASE */
        .sec { padding: 120px 48px; }
        .sec-inner { max-width: 1100px; margin: 0 auto; }
        .sec-tag { font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 0.26em; text-transform: uppercase; color: var(--blush); margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
        .sec-tag::before { content: ''; width: 20px; height: 1px; background: var(--blush); }
        .sec-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(38px, 6vw, 72px); line-height: 0.95; letter-spacing: -1.5px; color: var(--ivory); margin-bottom: 20px; }
        .sec-h2 em { font-style: italic; color: var(--blush); }
        .sec-sub { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 300; line-height: 1.85; color: rgba(245,240,232,0.38); max-width: 460px; letter-spacing: 0.02em; }

        /* PAIN */
        .pain-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .pain-list { margin-top: 40px; }
        .pain-item { display: flex; gap: 18px; padding: 20px 0; border-bottom: 1px solid rgba(245,240,232,0.05); }
        .pain-item:first-child { border-top: 1px solid rgba(245,240,232,0.05); }
        .pain-num { font-family: 'Cormorant Garamond', serif; font-size: 11px; color: rgba(245,240,232,0.18); letter-spacing: 0.1em; flex-shrink: 0; margin-top: 2px; }
        .pain-txt { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 300; color: rgba(245,240,232,0.35); line-height: 1.7; }
        .pain-txt strong { color: rgba(245,240,232,0.6); font-weight: 500; }
        .pain-right { padding-top: 80px; }
        .pain-quote { font-family: 'Cormorant Garamond', serif; font-size: clamp(22px, 3.5vw, 34px); font-weight: 300; font-style: italic; line-height: 1.4; color: var(--ivory); margin-bottom: 28px; letter-spacing: -0.5px; }
        .pain-quote em { color: var(--blush); }

        /* DIFF */
        .diff-bg { background: var(--dark2); border-top: 1px solid rgba(245,240,232,0.04); }
        .diff-grid { display: grid; grid-template-columns: 1fr 1px 1fr; margin-top: 60px; }
        .diff-div { background: rgba(245,240,232,0.05); }
        .diff-col { padding: 0 44px; }
        .diff-col:first-child { padding-left: 0; }
        .diff-col:last-child { padding-right: 0; }
        .diff-lbl { font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 32px; padding-bottom: 18px; border-bottom: 1px solid rgba(245,240,232,0.06); }
        .diff-before .diff-lbl { color: rgba(245,240,232,0.2); }
        .diff-after .diff-lbl { color: var(--blush); }
        .diff-row { display: flex; gap: 12px; margin-bottom: 18px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 300; line-height: 1.6; letter-spacing: 0.02em; }
        .diff-before .diff-row { color: rgba(245,240,232,0.22); }
        .diff-after .diff-row { color: rgba(245,240,232,0.75); font-weight: 400; }
        .diff-icon { flex-shrink: 0; margin-top: 2px; font-size: 12px; }

        /* REALISM */
        .realism-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .realism-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(245,240,232,0.05); margin-top: 40px; }
        .realism-card { background: var(--dark); padding: 26px 22px; transition: background 0.3s; }
        .realism-card:hover { background: var(--dark3); }
        .realism-icon { font-size: 18px; margin-bottom: 12px; display: block; }
        .realism-title { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; color: var(--ivory); margin-bottom: 7px; letter-spacing: 0.03em; }
        .realism-desc { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 300; color: rgba(245,240,232,0.33); line-height: 1.7; }
        .realism-tag { display: inline-block; margin-top: 10px; font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--blush); }
        .realism-right { padding-top: 100px; }

        /* MOTION */
        .motion-bg { background: var(--dark2); border-top: 1px solid rgba(245,240,232,0.04); }
        .motion-header { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-bottom: 64px; align-items: end; }
        .motion-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(245,240,232,0.05); }
        .motion-card { background: var(--dark2); padding: 32px 26px; border-top: 2px solid transparent; transition: border-color 0.3s; }
        .motion-card:hover { border-top-color: var(--blush); }
        .motion-num { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 300; color: rgba(245,240,232,0.05); line-height: 1; margin-bottom: 18px; letter-spacing: -2px; }
        .motion-title { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; color: var(--ivory); margin-bottom: 10px; letter-spacing: 0.04em; }
        .motion-desc { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 300; color: rgba(245,240,232,0.33); line-height: 1.75; }

        /* FLOW */
        .flow-bg { border-top: 1px solid rgba(245,240,232,0.04); }
        .flow-ui { margin-top: 56px; background: var(--dark2); border: 1px solid rgba(245,240,232,0.07); border-radius: 4px; overflow: hidden; }
        .flow-bar { display: flex; align-items: center; gap: 7px; padding: 12px 18px; background: var(--dark3); border-bottom: 1px solid rgba(245,240,232,0.06); }
        .flow-dot { width: 8px; height: 8px; border-radius: 50%; }
        .flow-url { flex: 1; background: rgba(245,240,232,0.04); border-radius: 2px; padding: 4px 10px; font-family: 'Inter', sans-serif; font-size: 10px; color: rgba(245,240,232,0.22); margin: 0 10px; letter-spacing: 0.04em; }
        .flow-body { display: grid; grid-template-columns: 260px 1fr; min-height: 440px; }
        .flow-left { border-right: 1px solid rgba(245,240,232,0.06); padding: 24px 20px; display: flex; flex-direction: column; gap: 14px; }
        .flow-lbl { font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(212,175,135,0.55); margin-bottom: 4px; }
        .flow-field { background: rgba(245,240,232,0.04); border: 1px solid rgba(245,240,232,0.07); border-radius: 3px; padding: 10px 12px; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 300; color: rgba(245,240,232,0.55); line-height: 1.5; }
        .flow-field.act { border-color: rgba(212,175,135,0.3); color: var(--ivory); }
        .flow-gen { margin-top: auto; background: var(--ivory); color: var(--dark); text-align: center; padding: 12px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
        .flow-right { padding: 24px; display: flex; flex-direction: column; gap: 12px; }
        .flow-card { display: flex; gap: 14px; padding: 14px; border: 1px solid rgba(245,240,232,0.06); border-radius: 3px; }
        .flow-card-icon { font-size: 13px; flex-shrink: 0; margin-top: 1px; }
        .flow-card-title { font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blush); margin-bottom: 5px; }
        .flow-card-text { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 300; color: rgba(245,240,232,0.38); line-height: 1.6; }
        .flow-card-text strong { color: rgba(245,240,232,0.65); font-weight: 400; }

        /* FOR WHO */
        .forwho-bg { background: var(--dark2); border-top: 1px solid rgba(245,240,232,0.04); }
        .forwho-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(245,240,232,0.05); margin-top: 56px; }
        .forwho-card { background: var(--dark2); padding: 32px 22px; border-top: 1px solid transparent; transition: all 0.3s; }
        .forwho-card:hover { background: var(--dark3); border-top-color: var(--blush); }
        .forwho-emoji { font-size: 22px; display: block; margin-bottom: 18px; }
        .forwho-title { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; color: var(--ivory); margin-bottom: 8px; letter-spacing: 0.03em; }
        .forwho-desc { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 300; color: rgba(245,240,232,0.33); line-height: 1.75; }

        /* PLATFORMS */
        .plat { border-top: 1px solid rgba(245,240,232,0.04); padding: 72px 48px; }
        .plat-inner { max-width: 1100px; margin: 0 auto; }
        .plat-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 36px; }
        .plat-pill { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid rgba(245,240,232,0.1); color: rgba(245,240,232,0.3); padding: 8px 16px; border-radius: 1px; transition: all 0.3s; }
        .plat-pill:hover { border-color: var(--blush); color: var(--blush); }

        /* CTA FINAL */
        .cta-final { min-height: 75vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 120px 32px; position: relative; overflow: hidden; }
        .cta-final::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 55% at 50% 50%, rgba(158,24,43,0.18) 0%, transparent 65%); pointer-events: none; }
        .cta-final-inner { position: relative; z-index: 2; max-width: 680px; }
        .cta-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(44px, 8vw, 92px); line-height: 0.9; letter-spacing: -2px; color: var(--ivory); margin-bottom: 28px; }
        .cta-h2 em { font-style: italic; color: var(--blush); display: block; }
        .cta-sub { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 300; color: rgba(245,240,232,0.32); margin-bottom: 44px; line-height: 1.8; }
        .cta-note { margin-top: 20px; font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 0.12em; color: rgba(245,240,232,0.18); text-transform: uppercase; }

        /* FOOTER */
        .footer { border-top: 1px solid rgba(245,240,232,0.06); padding: 36px 48px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .footer-logo { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 13px; color: var(--ivory); letter-spacing: 0.18em; text-transform: uppercase; }
        .footer-logo strong { font-weight: 600; }
        .footer-links { display: flex; gap: 24px; }
        .footer-link { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 300; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,240,232,0.2); text-decoration: none; transition: color 0.3s; }
        .footer-link:hover { color: var(--ivory); }
        .footer-copy { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 300; color: rgba(245,240,232,0.14); letter-spacing: 0.06em; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .nav { padding: 16px 20px; }
          .nav-links .nav-a { display: none; }
          .sticky-mobile { display: block; }
          .hero { padding: 0 20px 110px; min-height: 100svh; }
          .hero-h1 { letter-spacing: -1.5px; }
          .hero-ctas { flex-direction: column; }
          .btn-ivory, .btn-ghost { text-align: center; }
          .hero-scroll { display: none; }
          .sec { padding: 72px 20px; }
          .pain-layout { grid-template-columns: 1fr; gap: 0; }
          .pain-right { padding-top: 40px; }
          .diff-grid { grid-template-columns: 1fr; }
          .diff-div { display: none; }
          .diff-col { padding: 0; }
          .diff-before { margin-bottom: 36px; }
          .realism-layout { grid-template-columns: 1fr; gap: 0; }
          .realism-right { padding-top: 40px; }
          .realism-grid { grid-template-columns: 1fr; }
          .motion-header { grid-template-columns: 1fr; gap: 28px; margin-bottom: 40px; }
          .motion-grid { grid-template-columns: 1fr; }
          .flow-body { grid-template-columns: 1fr; }
          .flow-left { border-right: none; border-bottom: 1px solid rgba(245,240,232,0.06); }
          .forwho-grid { grid-template-columns: 1fr 1fr; }
          .footer { flex-direction: column; align-items: flex-start; }
          .footer-links { flex-wrap: wrap; }
          .cta-final { padding: 80px 20px 140px; min-height: auto; }
          .plat { padding: 60px 20px; }
        }
        @media (max-width: 480px) {
          .forwho-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="logo-wrap">
          <div className="logo-sup"><strong>SUPER</strong>COOL</div>
          <div className="logo-sub-line">Influencer</div>
        </a>
        <div className="nav-links">
          <a href="/sign-in" className="nav-a">Sign in</a>
          <a href="/pricing" className="nav-a">Pricing</a>
          <a href="/generate" className="nav-cta">Start Free</a>
        </div>
      </nav>

      {/* STICKY MOBILE CTA */}
      <div className="sticky-mobile">
        <a href="/generate" className="sticky-mobile-btn">⚡ Generate Free — No Card</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-eyebrow inter">The AI Cinematic Creator OS</div>
          <h1 className="hero-h1 cg">
            <strong>Your content.</strong>
            <em>Cinematically</em>
            real.
          </h1>
          <p className="hero-sub inter">
            From idea to <strong>campaign-ready content</strong> in under 60 seconds.
            Briefings. Image prompts. Reel direction. Captions. All of it.
            Built on human realism — not generic AI.
          </p>
          <div className="hero-ctas">
            <Link href="/generate" className="btn-ivory inter">Generate Free Now</Link>
            <Link href="/pricing" className="btn-ghost inter">View Pricing →</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-label inter">Scroll</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex', flexShrink: 0 }}>
              {['Human Realism Engine™','Motion Psychology™','GTA-Style Behavioral Realism','Cinematic Campaign Briefings','Anti-Generic AI Output','Biological Movement Systems','Identity Lock™','60-Second Campaigns','Creator OS'].map((t, j) => (
                <span key={j} className="marquee-item cg">{t}<span className="marquee-dot" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PAIN */}
      <section className="sec" style={{ background: 'var(--dark)' }}>
        <div className="sec-inner">
          <div className="pain-layout">
            <div>
              <div className="sec-tag inter">The reality</div>
              <h2 className="sec-h2 cg">Your content<br /><em>is suffering.</em></h2>
              <div className="pain-list">
                {[
                  {t:'Content burnout', d:"You've run out of ideas. The blank page wins every day. Creative paralysis is real — and expensive."},
                  {t:'Generic AI output', d:'Your AI content looks like everyone else\'s. Robotic faces, stiff motion, dead eyes. Scroll-past energy.'},
                  {t:'No direction', d:'You know what to post but not how to make it feel cinematic, believable, or emotionally resonant.'},
                  {t:'Inconsistent identity', d:'Your brand changes every week. No visual signature. No recognisable aesthetic. Just content for the algorithm.'},
                  {t:'Zero engagement', d:'Posting consistently and getting nothing back. The problem isn\'t frequency — it\'s quality and feeling.'},
                ].map((p, i) => (
                  <div className="pain-item" key={p.t}>
                    <span className="pain-num inter">0{i+1}</span>
                    <div className="pain-txt inter"><strong>{p.t} — </strong>{p.d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pain-right">
              <div className="pain-quote cg">"Most AI content doesn't fail because of the tool. It fails because there was <em>no direction</em> behind it."</div>
              <p className="sec-sub inter">SuperCool isn't a prompt generator. It's a creative operating system that thinks like a cinematic director — and builds campaigns that feel emotionally real.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFF */}
      <section className="sec diff-bg">
        <div className="sec-inner">
          <div className="sec-tag inter">The transformation</div>
          <h2 className="sec-h2 cg">Before.<br /><em>After.</em></h2>
          <div className="diff-grid">
            <div className="diff-col diff-before">
              <div className="diff-lbl inter">Without SuperCool</div>
              {['Hours spent guessing what to post','Robotic AI humans with dead eyes','Generic prompts, generic output','Content that looks AI-generated','No brand identity or visual signature','Low engagement, no emotional connection','Creative burnout every single week'].map(t => (
                <div className="diff-row" key={t}><span className="diff-icon">—</span>{t}</div>
              ))}
            </div>
            <div className="diff-div" />
            <div className="diff-col diff-after">
              <div className="diff-lbl inter">With SuperCool</div>
              {['Full campaign ready in 60 seconds','Believable human motion and skin realism','Cinematic direction built into every brief','Content that looks filmed, not generated','Locked creator identity across every post','Emotional storytelling that drives results','Creative confidence — never blank again'].map(t => (
                <div className="diff-row" key={t}><span className="diff-icon" style={{color:'var(--blush)'}}>↗</span>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REALISM ENGINE */}
      <section className="sec">
        <div className="sec-inner">
          <div className="realism-layout">
            <div>
              <div className="sec-tag inter">Human Realism Engine™</div>
              <h2 className="sec-h2 cg">We engineer<br /><em>believable</em><br />humans.</h2>
              <p className="sec-sub inter" style={{marginTop:'20px'}}>Every AI character is built on a biological realism system — the same principles that make Rockstar Games characters feel alive. Not avatars. Not templates. Humans.</p>
            </div>
            <div className="realism-right">
              <div className="realism-grid">
                {[
                  {icon:'👁️',title:'Eye Behaviour System',desc:'Saccadic movement, lid weight, dilation response. Eyes that actually see.',tag:'Ocular Realism'},
                  {icon:'🫁',title:'Breathing Architecture',desc:'Chest rise, clavicle shift, subtle shoulder movement. The character breathes.',tag:'Respiratory Motion'},
                  {icon:'🤝',title:'Asymmetric Movement',desc:'Real humans don\'t move symmetrically. Micro-asymmetry built into every gesture.',tag:'Natural Imperfection'},
                  {icon:'🎭',title:'Micro-Expression Engine',desc:'Involuntary facial movements — jaw tension, nostril flare, brow microlifts.',tag:'Emotional Leakage'},
                  {icon:'👗',title:'Fabric Physics',desc:'Clothing moves with the body. Gravity, weight, texture response — real material.',tag:'Procedural Fabric'},
                  {icon:'⏱️',title:'Behavioural Delay',desc:'Real humans hesitate. Pause. Self-correct. Timing imperfection is the signature.',tag:'Temporal Realism'},
                  {icon:'🧬',title:'Skin Truth System',desc:'Pore depth, subsurface scattering, oil variation, flush response. Real skin.',tag:'Biological Texture'},
                  {icon:'🎬',title:'GTA-Style Realism',desc:'Procedural NPC-level movement systems applied to creator characters.',tag:'Motion Capture Logic'},
                ].map(r => (
                  <div className="realism-card" key={r.title}>
                    <span className="realism-icon">{r.icon}</span>
                    <div className="realism-title inter">{r.title}</div>
                    <div className="realism-desc inter">{r.desc}</div>
                    <span className="realism-tag inter">{r.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTION PSYCHOLOGY */}
      <section className="sec motion-bg">
        <div className="sec-inner">
          <div className="motion-header">
            <div>
              <div className="sec-tag inter">Motion Psychology™</div>
              <h2 className="sec-h2 cg">Movement<br /><em>engineered</em><br />to retain.</h2>
            </div>
            <p className="sec-sub inter">Every camera angle, cut timing, and body movement is calculated to hold attention, trigger emotion, and drive action — based on how the human nervous system processes visual motion.</p>
          </div>
          <div className="motion-grid">
            {[
              {n:'01',title:'Attention Engineering',desc:'The first 0.3 seconds determine everything. SuperCool briefs interrupt the scroll with pattern-breaking visual information.'},
              {n:'02',title:'Retention Pacing',desc:'Cognitive load, visual novelty cycles, and tension-release pacing — structured to hold watch-through from first frame to CTA.'},
              {n:'03',title:'Subconscious Realism',desc:'Your brain detects fake humans in milliseconds. Our realism systems neutralise the uncanny valley — so trust is felt, not decided.'},
              {n:'04',title:'Platform-Native Movement',desc:'TikTok physics, Reels pacing, Shorts rhythm — each brief is calibrated to how movement performs on each specific platform.'},
              {n:'05',title:'Emotional Camera Behaviour',desc:'Camera distance, angle, lens choice and movement direction are psychological tools. SuperCool assigns each based on the emotional outcome.'},
              {n:'06',title:'Narrative Escalation',desc:'Desire → friction → release → aspiration. Every campaign follows emotional escalation architecture — same structure as luxury advertising.'},
            ].map(m => (
              <div className="motion-card" key={m.n}>
                <div className="motion-num cg">{m.n}</div>
                <div className="motion-title inter">{m.title}</div>
                <div className="motion-desc inter">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="sec flow-bg">
        <div className="sec-inner">
          <div className="sec-tag inter">The experience</div>
          <h2 className="sec-h2 cg">One idea.<br /><em>Full campaign.</em><br />60 seconds.</h2>
          <div className="flow-ui">
            <div className="flow-bar">
              <div className="flow-dot" style={{background:'#FF5F57'}} />
              <div className="flow-dot" style={{background:'#FFBD2E'}} />
              <div className="flow-dot" style={{background:'#28CA41'}} />
              <div className="flow-url inter">supercoolinfluencer.com/generate</div>
            </div>
            <div className="flow-body">
              <div className="flow-left">
                <div><div className="flow-lbl inter">Your Idea</div><div className="flow-field act inter">"Luxury skincare morning routine. Soft natural light. Real skin texture. Confident, unhurried energy."</div></div>
                <div><div className="flow-lbl inter">Platform</div><div className="flow-field inter">Instagram Reels + TikTok</div></div>
                <div><div className="flow-lbl inter">Angle</div><div className="flow-field inter">Before vs After — Skin Transformation</div></div>
                <div><div className="flow-lbl inter">Creator Style</div><div className="flow-field inter">Luxury lifestyle — minimal, cinematic</div></div>
                <div className="flow-gen inter">⚡ Generate Campaign</div>
              </div>
              <div className="flow-right">
                {[
                  {icon:'🎬',title:'Campaign Brief',text:'<strong>Concept:</strong> Morning ritual as devotion. Character wakes before the city. Soft amber. Real skin. No performance. Pure presence.'},
                  {icon:'🖼️',title:'Image Prompt',text:'<strong>Seedance:</strong> "Close ECU, cheekbone to clavicle. Subsurface scattering active. Morning light from left. Skin pore depth 0.4. No symmetry lock."'},
                  {icon:'🎥',title:'Reel Direction',text:'<strong>Scene 1 [0–3s]:</strong> Macro on eyelid opening. Blink delay 0.3s. Catch light enters iris. No cut. Hold.'},
                  {icon:'✍️',title:'Caption + Hook',text:'<strong>Hook:</strong> "The AI skin that breaks the uncanny valley." Caption: Scientifically engineered. Emotionally real.'},
                  {icon:'#',title:'Hashtags + Keywords',text:'#AICreator #SkinRealism #LuxuryContent #CinematicAI #MotionPsychology #ViralReels'},
                ].map(o => (
                  <div className="flow-card" key={o.title}>
                    <span className="flow-card-icon">{o.icon}</span>
                    <div>
                      <div className="flow-card-title inter">{o.title}</div>
                      <div className="flow-card-text inter" dangerouslySetInnerHTML={{__html: o.text}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR WHO */}
      <section className="sec forwho-bg">
        <div className="sec-inner">
          <div className="sec-tag inter">Built for</div>
          <h2 className="sec-h2 cg">Every creator.<br /><em>Every brand.</em></h2>
          <div className="forwho-grid">
            {[
              {e:'🎬',t:'AI Creators',d:"You create with AI tools and need output that doesn't look AI-generated. Realism is your competitive edge."},
              {e:'💄',t:'Beauty & Lifestyle',d:'Your niche is visual luxury. You need skin truth, texture, light behaviour. SuperCool was built with you first.'},
              {e:'👗',t:'Fashion & Aesthetic',d:'Fabric physics, editorial composition, identity lock across every frame. Your aesthetic — consistent, cinematic.'},
              {e:'🛍️',t:'Brand Owners',d:'Product ads that feel human. No production team. No weeks of creative. Brief → campaign in 60 seconds.'},
              {e:'📱',t:'Content Agencies',d:'Scale output without scaling headcount. Generate client campaigns in minutes — not days.'},
              {e:'🌍',t:'Luxury Lifestyle',d:'Your world is elevated. Your content should feel the same. Cinematic direction built into every brief.'},
              {e:'🧠',t:'Burned-Out Creators',d:'The blank page is over. SuperCool generates the idea, the direction, the prompts, and the copy. You just create.'},
              {e:'⚡',t:'Fast Movers',d:'Trend moves fast. SuperCool moves faster. Idea to campaign-ready content before the moment passes.'},
            ].map(f => (
              <div className="forwho-card" key={f.t}>
                <span className="forwho-emoji">{f.e}</span>
                <div className="forwho-title inter">{f.t}</div>
                <div className="forwho-desc inter">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <div className="plat">
        <div className="plat-inner">
          <div className="sec-tag inter">Works with every tool</div>
          <h2 className="sec-h2 cg" style={{fontSize:'clamp(28px,4vw,48px)',marginBottom:'8px'}}>Your brief.<br /><em>Any platform.</em></h2>
          <div className="plat-row">
            {['Seedance 2.0','Kling 1.6','Runway Gen-4','Midjourney','Flux','HeyGen','TikTok','Instagram Reels','YouTube Shorts','Facebook','Nano Banana','Enhancor'].map(p => (
              <span className="plat-pill inter" key={p}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <section className="cta-final">
        <div className="cta-final-inner">
          <h2 className="cta-h2 cg">Stop creating.<br /><em>Start directing.</em></h2>
          <p className="cta-sub inter">3 free campaigns. No credit card. No setup.<br />Just your idea — and 60 seconds.</p>
          <Link href="/generate" className="btn-ivory inter">Enter SuperCool</Link>
          <p className="cta-note inter">Human Realism Engine™ · Motion Psychology™ · Creator OS</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo inter"><strong>SUPER</strong>COOL Influencer</div>
        <div className="footer-links">
          <a href="/pricing" className="footer-link inter">Pricing</a>
          <a href="/generate" className="footer-link inter">Generate</a>
          <a href="/sign-in" className="footer-link inter">Sign in</a>
        </div>
        <div className="footer-copy inter">© 2026 SuperCool Influencer</div>
      </footer>
    </div>
  );
}
