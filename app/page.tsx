import Link from "next/link";
import Image from "next/image";
import HomeNav from "./components/HomeNav";

export default function Home() {
  return (
    <div style={{ background: '#141010', color: '#F5F0E8', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --bg: #141010;
          --bg2: #1C1616;
          --bg3: #231A1A;
          --wine: #9E182B;
          --wine-glow: rgba(158,24,43,0.25);
          --blush: #F2AFBC;
          --rose: #F9CBD6;
          --oat: #F2E0D2;
          --ivory: #F5F0E8;
          --gold: #D4AF87;
          --gold-dim: rgba(212,175,135,0.5);
          --border: rgba(245,240,232,0.08);
          --border-wine: rgba(158,24,43,0.3);
          --text-dim: rgba(245,240,232,0.45);
          --text-mid: rgba(245,240,232,0.65);
        }
        html { scroll-behavior: smooth; }
        .pf { font-family: 'Playfair Display', Georgia, serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 48px;
          background: rgba(20,16,16,0.9); backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .logo { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 14px; color: var(--ivory); letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none; }
        .logo strong { font-weight: 700; }
        .nav-links { display: flex; gap: 32px; align-items: center; }
        .nav-a { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dim); text-decoration: none; transition: color 0.2s; }
        .nav-a:hover { color: var(--ivory); }
        .nav-cta { background: var(--wine); color: white; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 10px 22px; border-radius: 3px; text-decoration: none; box-shadow: 0 0 20px var(--wine-glow); transition: all 0.2s; }
        .nav-cta:hover { background: #7a1221; box-shadow: 0 0 32px rgba(158,24,43,0.4); }

        /* STICKY MOBILE */
        .sticky-mob { display: none; position: fixed; bottom: 20px; left: 20px; right: 20px; z-index: 999; }
        .sticky-mob a { display: block; text-align: center; background: var(--wine); color: white; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 16px; border-radius: 3px; text-decoration: none; box-shadow: 0 8px 32px rgba(158,24,43,0.5); }

        /* ── HERO ── */
        .hero {
          min-height: 100svh; padding: 80px 48px 0;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0; align-items: center; position: relative; overflow: hidden;
        }
        .hero-glow { position: absolute; top: -200px; right: -100px; width: 700px; height: 700px; border-radius: 50%; background: radial-gradient(circle, rgba(158,24,43,0.15) 0%, transparent 65%); pointer-events: none; }
        .hero-glow2 { position: absolute; bottom: -100px; left: -100px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(212,175,135,0.06) 0%, transparent 65%); pointer-events: none; }
        .hero-left { position: relative; z-index: 2; padding-right: 48px; padding-bottom: 80px; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(158,24,43,0.12); border: 1px solid var(--border-wine); color: var(--blush); font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; padding: 6px 14px; border-radius: 100px; margin-bottom: 28px; }
        .hero-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--blush); animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        .hero-h1 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(44px, 5.5vw, 78px); line-height: 1; letter-spacing: -2px; color: var(--ivory); margin-bottom: 6px; }
        .hero-h1-accent { font-style: italic; color: var(--wine); display: block; text-shadow: 0 0 40px rgba(158,24,43,0.4); }
        .hero-sub { font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 300; line-height: 1.75; color: var(--text-dim); max-width: 420px; margin: 22px 0 36px; }
        .hero-sub strong { color: var(--ivory); font-weight: 500; }
        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 44px; }
        .btn-primary { background: var(--wine); color: white; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 15px 32px; border-radius: 3px; text-decoration: none; box-shadow: 0 4px 24px var(--wine-glow); transition: all 0.2s; }
        .btn-primary:hover { background: #7a1221; transform: translateY(-1px); box-shadow: 0 8px 32px rgba(158,24,43,0.4); }
        .btn-ghost { border: 1px solid var(--border); color: var(--text-dim); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 15px 28px; border-radius: 3px; text-decoration: none; transition: all 0.2s; backdrop-filter: blur(4px); }
        .btn-ghost:hover { border-color: rgba(245,240,232,0.25); color: var(--ivory); }
        .hero-proof { font-family: 'DM Sans', sans-serif; font-size: 11px; color: var(--text-dim); letter-spacing: 0.06em; }
        .hero-proof strong { color: var(--blush); font-weight: 600; }

        /* HERO RIGHT */
        .hero-right { position: relative; height: 100vh; overflow: hidden; }
        .hero-right-img { position: absolute; inset: 0; }
        .hero-right-img img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .hero-right-grad { position: absolute; inset: 0; background: linear-gradient(to right, #141010 0%, rgba(20,16,16,0.2) 40%, transparent 100%), linear-gradient(to top, #141010 0%, transparent 30%); }
        /* Floating UI cards */
        .hero-card { position: absolute; background: rgba(28,22,22,0.85); backdrop-filter: blur(12px); border: 1px solid rgba(245,240,232,0.1); border-radius: 8px; padding: 10px 14px; }
        .hero-card-label { font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--blush); margin-bottom: 3px; }
        .hero-card-val { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; color: var(--ivory); }
        .hc1 { top: 25%; right: 24px; }
        .hc2 { top: 42%; right: 24px; }
        .hc3 { bottom: 28%; right: 24px; }
        .hc4 { bottom: 16%; left: 32px; background: rgba(158,24,43,0.2); border-color: var(--border-wine); }

        /* TRUST */
        .trust { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 16px 48px; display: flex; align-items: center; gap: 40px; flex-wrap: wrap; }
        .trust-label { font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(245,240,232,0.2); white-space: nowrap; }
        .trust-items { display: flex; gap: 36px; align-items: center; flex-wrap: wrap; }
        .trust-item { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; color: rgba(245,240,232,0.35); letter-spacing: 0.04em; }

        /* MARQUEE */
        .marquee { background: var(--wine); padding: 13px 0; overflow: hidden; }
        .marquee-track { display: flex; white-space: nowrap; animation: mq 26s linear infinite; }
        .marquee-item { display: inline-flex; align-items: center; gap: 22px; padding: 0 22px; font-family: 'Playfair Display', serif; font-size: 13px; font-style: italic; color: rgba(255,255,255,0.65); flex-shrink: 0; }
        .marquee-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.3); }
        @keyframes mq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* HOW IT WORKS */
        .how { background: var(--bg); padding: 100px 48px; }
        .how-inner { max-width: 1100px; margin: 0 auto; }
        .sec-tag-w { font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--blush); margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
        .sec-tag-w::before { content: ''; width: 18px; height: 1px; background: var(--blush); }
        .how-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(32px, 5vw, 60px); line-height: 1; letter-spacing: -2px; color: var(--ivory); margin-bottom: 64px; }
        .how-h2 em { font-style: italic; color: var(--blush); }
        .how-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .how-step { background: var(--bg2); border: 1px solid var(--border); border-radius: 4px; padding: 36px 28px; position: relative; overflow: hidden; transition: border-color 0.3s; }
        .how-step:hover { border-color: var(--border-wine); }
        .how-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, var(--wine), transparent); opacity: 0; transition: opacity 0.3s; }
        .how-step:hover::before { opacity: 1; }
        .how-num { font-family: 'Playfair Display', serif; font-size: 64px; font-weight: 900; color: rgba(158,24,43,0.1); line-height: 1; margin-bottom: 20px; letter-spacing: -3px; }
        .how-title { font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 600; color: var(--ivory); margin-bottom: 10px; }
        .how-desc { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300; color: var(--text-dim); line-height: 1.75; margin-bottom: 14px; }
        .how-chip { display: inline-block; background: rgba(158,24,43,0.1); border: 1px solid var(--border-wine); color: var(--blush); font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; border-radius: 100px; }

        /* FEATURES */
        .features { background: var(--bg2); padding: 100px 48px; }
        .features-inner { max-width: 1100px; margin: 0 auto; }
        .features-header { margin-bottom: 56px; }
        .features-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(32px, 4.5vw, 56px); line-height: 1; letter-spacing: -1.5px; color: var(--ivory); }
        .features-h2 em { font-style: italic; color: var(--blush); }
        .features-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .features-img { position: relative; height: 520px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 32px 80px rgba(0,0,0,0.5); }
        .feat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .feat-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 4px; padding: 22px 18px; transition: all 0.2s; }
        .feat-card:hover { border-color: var(--border-wine); background: rgba(158,24,43,0.05); }
        .feat-icon { font-size: 20px; margin-bottom: 10px; }
        .feat-title { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; color: var(--ivory); margin-bottom: 6px; }
        .feat-desc { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300; color: var(--text-dim); line-height: 1.65; }

        /* REALISM */
        .realism { background: var(--bg); padding: 100px 48px; }
        .realism-inner { max-width: 1100px; margin: 0 auto; }
        .realism-header { text-align: center; margin-bottom: 56px; }
        .realism-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(32px, 5vw, 60px); line-height: 1; letter-spacing: -2px; color: var(--ivory); margin-bottom: 14px; }
        .realism-h2 em { font-style: italic; color: var(--blush); }
        .realism-sub { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300; color: var(--text-dim); max-width: 520px; margin: 0 auto; line-height: 1.75; }
        .realism-imgs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 40px; }
        .realism-img-box { position: relative; border-radius: 6px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 0 40px rgba(0,0,0,0.6); }
        .realism-img-box:first-child { height: 420px; }
        .realism-img-box:last-child { height: 420px; }
        .realism-img-lbl { position: absolute; bottom: 14px; left: 14px; background: rgba(20,16,16,0.8); backdrop-filter: blur(6px); border: 1px solid var(--border-wine); color: var(--blush); font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; padding: 5px 10px; border-radius: 2px; }
        .realism-pts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
        .realism-pt { background: var(--bg2); border: 1px solid var(--border); padding: 22px 18px; border-top: 2px solid transparent; transition: all 0.2s; }
        .realism-pt:hover { border-top-color: var(--wine); background: rgba(158,24,43,0.04); }
        .realism-pt-icon { font-size: 18px; margin-bottom: 10px; }
        .realism-pt-title { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: var(--ivory); margin-bottom: 6px; }
        .realism-pt-desc { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300; color: var(--text-dim); line-height: 1.65; }

        /* LIFESTYLE SPLIT */
        .lifestyle { background: var(--bg2); overflow: hidden; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .lifestyle-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 580px; }
        .lifestyle-img-wrap { position: relative; overflow: hidden; }
        .lifestyle-content { display: flex; flex-direction: column; justify-content: center; padding: 80px 64px; }
        .lifestyle-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(28px, 3.5vw, 48px); line-height: 1; letter-spacing: -1.5px; color: var(--ivory); margin-bottom: 18px; }
        .lifestyle-h2 em { font-style: italic; color: var(--blush); }
        .lifestyle-sub { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; color: var(--text-dim); line-height: 1.8; margin-bottom: 32px; }
        .lifestyle-checks { display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
        .lifestyle-check-row { display: flex; align-items: center; gap: 12px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; color: var(--text-mid); }
        .lc-icon { width: 18px; height: 18px; border-radius: 50%; background: rgba(158,24,43,0.2); border: 1px solid var(--border-wine); display: flex; align-items: center; justify-content: center; font-size: 9px; color: var(--blush); flex-shrink: 0; }

        /* FOR WHO */
        .forwho { background: var(--bg); padding: 100px 48px; }
        .forwho-inner { max-width: 1100px; margin: 0 auto; }
        .forwho-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(32px, 5vw, 60px); line-height: 1; letter-spacing: -2px; color: var(--ivory); margin-bottom: 56px; }
        .forwho-h2 em { font-style: italic; color: var(--blush); }
        .forwho-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
        .forwho-card { background: var(--bg2); border: 1px solid var(--border); padding: 28px 22px; border-top: 2px solid transparent; transition: all 0.2s; }
        .forwho-card:hover { border-top-color: var(--wine); background: var(--bg3); }
        .forwho-e { font-size: 20px; margin-bottom: 14px; display: block; }
        .forwho-t { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; color: var(--ivory); margin-bottom: 7px; }
        .forwho-d { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300; color: var(--text-dim); line-height: 1.7; }

        /* FINAL CTA — accent background, not full wine */
        .cta-final { background: var(--bg2); padding: 120px 48px; text-align: center; position: relative; overflow: hidden; border-top: 1px solid var(--border); }
        .cta-glow { position: absolute; inset: 0; background: radial-gradient(ellipse 55% 45% at 50% 50%, rgba(158,24,43,0.15) 0%, transparent 65%); pointer-events: none; }
        .cta-inner { position: relative; z-index: 2; max-width: 620px; margin: 0 auto; }
        .cta-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(40px, 6.5vw, 84px); line-height: 0.92; letter-spacing: -2px; color: var(--ivory); margin-bottom: 24px; }
        .cta-h2 em { font-style: italic; color: var(--blush); display: block; }
        .cta-sub { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300; color: var(--text-dim); margin-bottom: 44px; line-height: 1.8; }
        .cta-note { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 300; letter-spacing: 0.1em; color: rgba(245,240,232,0.18); text-transform: uppercase; margin-top: 20px; }

        /* FOOTER */
        .footer { background: var(--bg); border-top: 1px solid var(--border); padding: 36px 48px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .footer-logo { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 13px; color: var(--ivory); letter-spacing: 0.2em; text-transform: uppercase; }
        .footer-logo strong { font-weight: 700; }
        .footer-links { display: flex; gap: 24px; flex-wrap: wrap; }
        .footer-link { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 300; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,240,232,0.2); text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: var(--ivory); }
        .footer-copy { font-family: 'DM Sans', sans-serif; font-size: 10px; color: rgba(245,240,232,0.12); }

        /* MOBILE */
        @media (max-width: 768px) {
          .nav { padding: 14px 20px; }
          .nav-a { display: none; }
          .sticky-mob { display: block; }
          .hero { grid-template-columns: 1fr; padding: 80px 20px 0; min-height: auto; }
          .hero-left { padding-right: 0; padding-bottom: 40px; }
          .hero-right { height: 400px; }
          .hc1,.hc2,.hc3 { display: none; }
          .hc4 { bottom: 12px; left: 16px; right: 16px; }
          .hero-h1 { letter-spacing: -1.5px; }
          .hero-ctas { flex-direction: column; }
          .btn-primary, .btn-ghost { text-align: center; }
          .trust { padding: 14px 20px; gap: 16px; }
          .how { padding: 72px 20px; }
          .how-steps { grid-template-columns: 1fr; gap: 2px; }
          .features { padding: 72px 20px; }
          .features-layout { grid-template-columns: 1fr; gap: 36px; }
          .features-img { height: 300px; }
          .feat-grid { grid-template-columns: 1fr; }
          .realism { padding: 72px 20px; }
          .realism-imgs { grid-template-columns: 1fr; }
          .realism-img-box:first-child, .realism-img-box:last-child { height: 260px; }
          .realism-pts { grid-template-columns: 1fr 1fr; }
          .lifestyle-grid { grid-template-columns: 1fr; }
          .lifestyle-img-wrap { height: 360px; }
          .lifestyle-content { padding: 48px 20px; }
          .forwho { padding: 72px 20px; }
          .forwho-grid { grid-template-columns: 1fr 1fr; }
          .cta-final { padding: 80px 20px 140px; }
          .footer { flex-direction: column; align-items: flex-start; padding: 28px 20px; }
        }
        @media (max-width: 480px) {
          .forwho-grid { grid-template-columns: 1fr; }
          .realism-pts { grid-template-columns: 1fr; }
        }
      `}</style>

      <HomeNav />
      <div className="sticky-mob"><a href="/generate">⚡ Generate Free — 3 Briefs, No Card</a></div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-left">
          <div className="hero-badge dm"><div className="hero-badge-dot" />Your AI Content Director · 60 Seconds</div>
          <h1 className="hero-h1 pf">
            No ideas.<br />No team.<br />
            <span className="hero-h1-accent">No problem.</span>
          </h1>
          <p className="hero-sub dm">SuperCool creates full AI UGC ads and cinematic reels with <strong>hyper-realistic visuals</strong>, captions, keywords and hashtags — in just 60 seconds.</p>
          <div className="hero-ctas">
            <Link href="/generate" className="btn-primary dm">⚡ Start Free — 3 Briefs</Link>
            <Link href="/pricing" className="btn-ghost dm">View Pricing →</Link>
          </div>
          <p className="hero-proof dm"><strong>3 free briefs</strong> · No credit card required</p>
        </div>
        <div className="hero-right">
          <div className="hero-right-img">
            <Image src="/hero.png" alt="Cinematic creator content" fill style={{objectFit:'cover',objectPosition:'center top'}} priority />
          </div>
          <div className="hero-right-grad" />
          {/* Floating cards */}
          <div className="hero-card hc1 dm"><div className="hero-card-label">Generated</div><div className="hero-card-val">🎬 AI UGC Ads</div></div>
          <div className="hero-card hc2 dm"><div className="hero-card-label">Generated</div><div className="hero-card-val">✍️ Captions + Hooks</div></div>
          <div className="hero-card hc3 dm"><div className="hero-card-label">Generated</div><div className="hero-card-val"># Keywords + Hashtags</div></div>
          <div className="hero-card hc4 dm"><div className="hero-card-label">⚡ Campaign ready in</div><div className="hero-card-val" style={{color:'#D4AF87',fontWeight:700,fontSize:16}}>60 seconds</div></div>
        </div>
      </section>

      {/* TRUST */}
      <div className="trust">
        <span className="trust-label dm">Works with</span>
        <div className="trust-items">
          {['Seedance 2.0','Kling 1.6','Runway Gen-4','Midjourney','Flux','HeyGen','Nano Banana'].map(t => (
            <span className="trust-item dm" key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {[...Array(2)].map((_,i) => (
            <div key={i} style={{display:'flex',flexShrink:0}}>
              {['Human Realism Engine™','Motion Psychology™','GTA-Style Behavioral Realism','Anti-Generic AI','Cinematic Direction','Identity Lock™','60-Second Campaigns','Creator OS'].map((t,j) => (
                <span key={j} className="marquee-item pf">{t}<span className="marquee-dot" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="how-inner">
          <div className="sec-tag-w dm">How SuperCool Works</div>
          <h2 className="how-h2 pf">3 steps.<br /><em>Full campaign.</em></h2>
          <div className="how-steps">
            {[
              {n:'01',t:'Enter Your Idea',d:'Type your product, niche, or content concept. Choose your platform, creator style, and campaign angle. Takes 10 seconds.',chip:'You'},
              {n:'02',t:'SuperCool Creates Everything',d:'AI generates your full campaign — briefs, image prompts, reel direction, captions, keywords, hashtags and motion engineering.',chip:'SuperCool'},
              {n:'03',t:'Copy, Export & Post',d:'Copy prompts directly into Seedance, Kling, Runway or Midjourney. Generate your content. Post and grow.',chip:'You'},
            ].map(s => (
              <div className="how-step" key={s.n}>
                <div className="how-num pf">{s.n}</div>
                <div className="how-title dm">{s.t}</div>
                <div className="how-desc dm">{s.d}</div>
                <span className="how-chip dm">{s.chip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="features-inner">
          <div className="features-header">
            <div className="sec-tag-w dm">Everything You Need</div>
            <h2 className="features-h2 pf">Generated in<br /><em>60 seconds.</em></h2>
          </div>
          <div className="features-layout">
            <div className="features-img">
              <Image src="/ugc-grid.png" alt="AI UGC Campaign" fill style={{objectFit:'cover'}} />
            </div>
            <div className="feat-grid">
              {[
                {i:'🎬',t:'AI UGC Ads',d:'Authentic, realistic ads with believable human motion that actually convert.'},
                {i:'🎥',t:'Cinematic Reels',d:'Movie-level storytelling with real motion psychology built in.'},
                {i:'🖼️',t:'Hyper-Realistic Images',d:'Studio-quality visuals that look filmed, not AI-generated.'},
                {i:'✍️',t:'Captions That Hook',d:'Viral captions, hooks and CTAs written for your exact platform.'},
                {i:'🔍',t:'SEO Keywords',d:'SEO-optimized keywords for reach, discovery and algorithm boost.'},
                {i:'#',t:'Viral Hashtags',d:'Viral hashtag sets tailored to your niche and posting goals.'},
              ].map(f => (
                <div className="feat-card" key={f.t}>
                  <div className="feat-icon">{f.i}</div>
                  <div className="feat-title dm">{f.t}</div>
                  <div className="feat-desc dm">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REALISM */}
      <section className="realism">
        <div className="realism-inner">
          <div className="realism-header">
            <div className="sec-tag-w dm" style={{justifyContent:'center'}}>Human Realism Engine™</div>
            <h2 className="realism-h2 pf">We don't sell prompts.<br /><em>We sell realism.</em></h2>
            <p className="realism-sub dm">Every brief is engineered for biological realism — the same level of detail that makes content feel filmed, not generated.</p>
          </div>
          <div className="realism-imgs">
            <div className="realism-img-box">
              <Image src="/realism-eye.png" alt="Eye realism" fill style={{objectFit:'cover',objectPosition:'center'}} />
              <div className="realism-img-lbl dm">Ocular Realism System</div>
            </div>
            <div className="realism-img-box">
              <Image src="/realism-skin.png" alt="Skin realism" fill style={{objectFit:'cover',objectPosition:'center'}} />
              <div className="realism-img-lbl dm">Skin Truth System</div>
            </div>
          </div>
          <div className="realism-pts">
            {[
              {i:'👁️',t:'Eye Behaviour',d:'Saccadic movement, lid weight, dilation. Eyes that actually see.'},
              {i:'🧬',t:'Skin Truth',d:'Pore depth, subsurface scattering, oil variation. Real skin.'},
              {i:'⏱️',t:'Behavioural Delay',d:'Real humans hesitate. Timing imperfection is the signature.'},
              {i:'🎭',t:'Micro-Expressions',d:'Involuntary jaw tension, nostril flare. Before emotion lands.'},
              {i:'🫁',t:'Breathing',d:'Chest rise, clavicle shift. The character breathes.'},
              {i:'🤝',t:'Asymmetric Motion',d:'Real humans don\'t move symmetrically. Built in.'},
              {i:'👗',t:'Fabric Physics',d:'Clothing moves with the body. Gravity and weight — real.'},
              {i:'🎬',t:'GTA-Style Realism',d:'Procedural NPC-level movement for your AI creator.'},
            ].map(r => (
              <div className="realism-pt" key={r.t}>
                <div className="realism-pt-icon">{r.i}</div>
                <div className="realism-pt-title dm">{r.t}</div>
                <div className="realism-pt-desc dm">{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE SPLIT */}
      <section className="lifestyle">
        <div className="lifestyle-grid">
          <div className="lifestyle-img-wrap">
            <Image src="/lifestyle.png" alt="Creator lifestyle" fill style={{objectFit:'cover',objectPosition:'center top'}} />
          </div>
          <div className="lifestyle-content">
            <div className="sec-tag-w dm">Create. Post. Grow.</div>
            <h2 className="lifestyle-h2 pf">For creators.<br />Agencies.<br /><em>AI UGC pros.</em></h2>
            <p className="lifestyle-sub dm">SuperCool does the heavy lifting — so you focus on building your brand, not burning out on ideas.</p>
            <div className="lifestyle-checks">
              {['Full AI content creation in 60 seconds','No editing skills needed','No brainstorming or prompting','No expensive tools or teams','3 free briefs — no credit card'].map(item => (
                <div className="lifestyle-check-row" key={item}>
                  <div className="lc-icon">✓</div>
                  <span className="dm">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/generate" className="btn-primary dm" style={{display:'inline-block',textAlign:'center'}}>Start Free Today →</Link>
          </div>
        </div>
      </section>

      {/* FOR WHO */}
      <section className="forwho">
        <div className="forwho-inner">
          <div className="sec-tag-w dm">Built for</div>
          <h2 className="forwho-h2 pf">Every creator.<br /><em>Every brand.</em></h2>
          <div className="forwho-grid">
            {[
              {e:'🎬',t:'AI Creators',d:"You create with AI and need output that doesn't look AI-generated."},
              {e:'💄',t:'Beauty & Skincare',d:'You need skin truth, texture, real light behaviour and cinematic direction.'},
              {e:'👗',t:'Fashion & Lifestyle',d:'Editorial composition, identity lock, fabric physics. Your aesthetic locked.'},
              {e:'🛍️',t:'Brand Owners',d:'Product ads that feel human. Brief → campaign in 60 seconds.'},
              {e:'📱',t:'Content Agencies',d:'Scale client output without scaling headcount. Minutes not days.'},
              {e:'🌍',t:'Luxury Lifestyle',d:'Your world is elevated. Your content should feel the same.'},
              {e:'🧠',t:'Burned-Out Creators',d:'The blank page is over. SuperCool generates everything. You just post.'},
              {e:'⚡',t:'Fast Movers',d:'Trend moves fast. SuperCool moves faster. Idea to campaign instantly.'},
            ].map(f => (
              <div className="forwho-card" key={f.t}>
                <span className="forwho-e">{f.e}</span>
                <div className="forwho-t dm">{f.t}</div>
                <div className="forwho-d dm">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-final">
        <div className="cta-glow" />
        <div className="cta-inner">
          <h2 className="cta-h2 pf">Stop creating.<br /><em>Start directing.</em></h2>
          <p className="cta-sub dm">3 free briefs. No credit card. No setup.<br />Just your idea — and 60 seconds.</p>
          <Link href="/generate" className="btn-primary dm" style={{display:'inline-block'}}>⚡ Generate Free Now</Link>
          <p className="cta-note dm">Human Realism Engine™ · Motion Psychology™ · Creator OS</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo dm"><strong>SUPER</strong>COOL Influencer</div>
        <div className="footer-links">
          <a href="/pricing" className="footer-link dm">Pricing</a>
          <a href="/generate" className="footer-link dm">Generate</a>
          <a href="/sign-in" className="footer-link dm">Sign in</a>
        </div>
        <div className="footer-copy dm">© 2026 SuperCool Influencer</div>
      </footer>
    </div>
  );
}
