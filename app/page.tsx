import Link from "next/link";
import Image from "next/image";
import HomeNav from "./components/HomeNav";

export default function Home() {
  return (
    <div style={{ background: '#F2E0D2', color: '#1A0A0E', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --oat: #F2E0D2;
          --rose: #F9CBD6;
          --blush: #F2AFBC;
          --wine: #9E182B;
          --wine-dark: #6B1020;
          --cream: #FAF3EE;
          --dark: #1A0A0E;
          --dark2: #2A1218;
          --gold: #D4AF87;
        }
        html { scroll-behavior: smooth; }
        .pf { font-family: 'Playfair Display', Georgia, serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 48px;
          background: rgba(242,224,210,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(158,24,43,0.1);
        }
        .logo { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 15px; color: var(--dark); letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; }
        .logo strong { font-weight: 700; }
        .nav-links { display: flex; gap: 28px; align-items: center; }
        .nav-a { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(26,10,14,0.5); text-decoration: none; transition: color 0.2s; }
        .nav-a:hover { color: var(--wine); }
        .nav-cta { background: var(--wine); color: white; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 10px 24px; border-radius: 2px; text-decoration: none; transition: background 0.2s; }
        .nav-cta:hover { background: var(--wine-dark); }

        /* ── STICKY MOBILE CTA ── */
        .sticky-mob { display: none; position: fixed; bottom: 20px; left: 20px; right: 20px; z-index: 999; }
        .sticky-mob a { display: block; text-align: center; background: var(--wine); color: white; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 16px; border-radius: 3px; text-decoration: none; box-shadow: 0 8px 32px rgba(158,24,43,0.4); }

        /* ── HERO ── */
        .hero {
          min-height: 100svh; padding: 120px 48px 80px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
          background: var(--oat);
          position: relative; overflow: hidden;
          isolation: isolate;
        }
        .hero::before {
          content: ''; position: absolute; top: -200px; right: -200px;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(249,203,214,0.5) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .hero-left { position: relative; z-index: 2; }
        .hero-kicker { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 24px; font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--wine); }
        .hero-kicker::before { content: ''; width: 20px; height: 1px; background: var(--wine); }
        .hero-h1 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(44px, 6vw, 80px); line-height: 0.95; letter-spacing: -2px; color: var(--dark); margin-bottom: 24px; }
        .hero-h1 em { font-style: italic; color: var(--wine); display: block; }
        .hero-sub { font-family: 'DM Sans', sans-serif; font-size: clamp(14px, 2vw, 17px); font-weight: 300; line-height: 1.75; color: rgba(26,10,14,0.6); max-width: 440px; margin-bottom: 40px; }
        .hero-sub strong { color: var(--dark); font-weight: 500; }
        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-wine { background: var(--wine); color: white; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 16px 36px; border-radius: 2px; text-decoration: none; transition: all 0.2s; box-shadow: 0 4px 20px rgba(158,24,43,0.3); }
        .btn-wine:hover { background: var(--wine-dark); transform: translateY(-1px); }
        .btn-outline { border: 1.5px solid rgba(26,10,14,0.25); color: rgba(26,10,14,0.6); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 16px 32px; border-radius: 2px; text-decoration: none; transition: all 0.2s; }
        .btn-outline:hover { border-color: var(--wine); color: var(--wine); }
        .hero-proof { display: flex; gap: 32px; margin-top: 48px; padding-top: 32px; border-top: 1px solid rgba(26,10,14,0.1); flex-wrap: wrap; }
        .proof-item { display: flex; flex-direction: column; gap: 3px; }
        .proof-num { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 900; color: var(--wine); line-height: 1; }
        .proof-lbl { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 400; color: rgba(26,10,14,0.45); letter-spacing: 0.06em; text-transform: uppercase; }

        /* HERO RIGHT — image collage */
        .hero-right { position: relative; z-index: 2; height: 560px; }
        .hero-img-main {
          position: absolute; top: 0; left: 0; right: 56px; bottom: 56px;
          border-radius: 6px; overflow: hidden;
          box-shadow: 0 24px 64px rgba(26,10,14,0.25);
          background: #C9A882;
        }
        .hero-img-float {
          position: absolute; bottom: 0; right: 0; width: 190px; height: 210px;
          border-radius: 6px; overflow: hidden;
          box-shadow: 0 16px 40px rgba(26,10,14,0.25);
          border: 4px solid var(--cream);
          background: #E8C4C4;
        }
        .hero-badge {
          position: absolute; top: 20px; left: 20px; z-index: 10;
          background: var(--wine); color: white;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
          padding: 7px 14px; border-radius: 100px;
          box-shadow: 0 4px 16px rgba(158,24,43,0.4);
          white-space: nowrap;
        }

        /* ── MARQUEE ── */
        .marquee { background: var(--wine); padding: 14px 0; overflow: hidden; }
        .marquee-track { display: flex; white-space: nowrap; animation: mq 24s linear infinite; }
        .marquee-item { display: inline-flex; align-items: center; gap: 24px; padding: 0 24px; font-family: 'Playfair Display', serif; font-size: 14px; font-style: italic; color: rgba(255,255,255,0.7); flex-shrink: 0; }
        .marquee-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.4); }
        @keyframes mq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* ── PAIN SECTION — DARK ── */
        .pain { background: var(--dark); padding: 100px 48px; }
        .pain-inner { max-width: 1100px; margin: 0 auto; }
        .pain-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .pain-img { border-radius: 4px; overflow: hidden; height: 500px; position: relative; }
        .pain-img img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(20%); }
        .pain-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, transparent 60%, var(--dark)); }
        .sec-tag-light { font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--blush); margin-bottom: 18px; display: flex; align-items: center; gap: 10px; }
        .sec-tag-light::before { content: ''; width: 18px; height: 1px; background: var(--blush); }
        .pain-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(36px, 5vw, 60px); line-height: 0.95; letter-spacing: -1.5px; color: white; margin-bottom: 32px; }
        .pain-h2 em { font-style: italic; color: var(--blush); }
        .pain-list { display: flex; flex-direction: column; gap: 0; }
        .pain-row { display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .pain-row:first-child { border-top: 1px solid rgba(255,255,255,0.06); }
        .pain-n { font-family: 'Playfair Display', serif; font-size: 11px; color: rgba(255,255,255,0.2); flex-shrink: 0; margin-top: 2px; }
        .pain-t { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.5); line-height: 1.65; }
        .pain-t strong { color: rgba(255,255,255,0.8); font-weight: 500; }

        /* ── TRANSFORMATION — LIGHT ── */
        .transf { background: var(--cream); padding: 100px 48px; }
        .transf-inner { max-width: 1100px; margin: 0 auto; }
        .sec-tag-dark { font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--wine); margin-bottom: 18px; display: flex; align-items: center; gap: 10px; }
        .sec-tag-dark::before { content: ''; width: 18px; height: 1px; background: var(--wine); }
        .transf-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(36px, 5vw, 64px); line-height: 0.95; letter-spacing: -2px; color: var(--dark); margin-bottom: 56px; }
        .transf-h2 em { font-style: italic; color: var(--wine); }
        .transf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
        .transf-col { padding: 40px 36px; }
        .transf-before { background: rgba(26,10,14,0.04); }
        .transf-after { background: var(--wine); }
        .transf-lbl { font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 28px; padding-bottom: 16px; border-bottom: 1px solid rgba(26,10,14,0.1); }
        .transf-before .transf-lbl { color: rgba(26,10,14,0.3); border-color: rgba(26,10,14,0.1); }
        .transf-after .transf-lbl { color: rgba(255,255,255,0.5); border-color: rgba(255,255,255,0.15); }
        .transf-item { display: flex; gap: 10px; margin-bottom: 14px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300; line-height: 1.6; }
        .transf-before .transf-item { color: rgba(26,10,14,0.35); }
        .transf-after .transf-item { color: rgba(255,255,255,0.85); font-weight: 400; }

        /* ── PRODUCT SHOWCASE ── */
        .showcase { background: var(--dark2); padding: 100px 48px; }
        .showcase-inner { max-width: 1100px; margin: 0 auto; }
        .showcase-header { text-align: center; margin-bottom: 56px; }
        .showcase-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(32px, 5vw, 56px); line-height: 1; letter-spacing: -1px; color: white; margin-bottom: 14px; }
        .showcase-h2 em { font-style: italic; color: var(--blush); }
        .showcase-sub { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.4); max-width: 480px; margin: 0 auto; line-height: 1.7; }
        /* UI mockup */
        .ui-mock { background: #131013; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow: hidden; }
        .ui-bar { display: flex; align-items: center; gap: 6px; padding: 10px 16px; background: #1A1418; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .ui-dot { width: 7px; height: 7px; border-radius: 50%; }
        .ui-url { flex: 1; background: rgba(255,255,255,0.04); border-radius: 2px; padding: 4px 10px; font-family: 'DM Sans', sans-serif; font-size: 10px; color: rgba(255,255,255,0.2); margin: 0 8px; }
        .ui-body { display: grid; grid-template-columns: 240px 1fr; min-height: 380px; }
        .ui-left { border-right: 1px solid rgba(255,255,255,0.06); padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .ui-lbl { font-family: 'DM Sans', sans-serif; font-size: 8px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(212,175,135,0.5); margin-bottom: 3px; }
        .ui-field { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 3px; padding: 9px 11px; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.55); line-height: 1.5; }
        .ui-field.hi { border-color: rgba(212,175,135,0.25); color: white; }
        .ui-gen { margin-top: auto; background: var(--gold); color: var(--dark); text-align: center; padding: 11px; border-radius: 2px; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
        .ui-right { padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        .ui-card { display: flex; gap: 12px; padding: 12px; border: 1px solid rgba(255,255,255,0.06); border-radius: 3px; }
        .ui-card-title { font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blush); margin-bottom: 4px; }
        .ui-card-text { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.38); line-height: 1.6; }
        .ui-card-text strong { color: rgba(255,255,255,0.65); font-weight: 400; }

        /* ── REALISM — LIGHT ── */
        .realism { background: var(--oat); padding: 100px 48px; }
        .realism-inner { max-width: 1100px; margin: 0 auto; }
        .realism-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .realism-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(36px, 5vw, 60px); line-height: 0.95; letter-spacing: -1.5px; color: var(--dark); margin-bottom: 20px; }
        .realism-h2 em { font-style: italic; color: var(--wine); }
        .realism-sub { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; line-height: 1.8; color: rgba(26,10,14,0.55); margin-bottom: 32px; }
        .realism-img { border-radius: 4px; overflow: hidden; height: 460px; }
        .realism-img img { width: 100%; height: 100%; object-fit: cover; }
        .realism-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-top: 16px; }
        .realism-card { background: white; padding: 20px 18px; transition: background 0.2s; }
        .realism-card:hover { background: var(--rose); }
        .realism-icon { font-size: 16px; margin-bottom: 10px; }
        .realism-ct { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: var(--dark); margin-bottom: 6px; }
        .realism-cd { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300; color: rgba(26,10,14,0.5); line-height: 1.65; }
        .realism-tag { font-family: 'DM Sans', sans-serif; font-size: 8px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--wine); margin-top: 8px; display: block; }

        /* ── FOR WHO — WINE BACKGROUND ── */
        .forwho { background: var(--wine); padding: 100px 48px; }
        .forwho-inner { max-width: 1100px; margin: 0 auto; }
        .forwho-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(36px, 5vw, 64px); line-height: 0.95; letter-spacing: -2px; color: white; margin-bottom: 56px; }
        .forwho-h2 em { font-style: italic; color: var(--rose); }
        .forwho-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
        .forwho-card { background: rgba(255,255,255,0.06); padding: 28px 22px; border-top: 2px solid transparent; transition: all 0.2s; }
        .forwho-card:hover { background: rgba(255,255,255,0.12); border-top-color: var(--rose); }
        .forwho-e { font-size: 20px; margin-bottom: 14px; display: block; }
        .forwho-t { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: white; margin-bottom: 8px; }
        .forwho-d { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.55); line-height: 1.7; }

        /* ── FINAL CTA ── */
        .cta { background: var(--dark); padding: 120px 48px; text-align: center; position: relative; overflow: hidden; }
        .cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249,203,214,0.08) 0%, transparent 70%); pointer-events: none; }
        .cta-inner { position: relative; z-index: 2; max-width: 640px; margin: 0 auto; }
        .cta-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(40px, 7vw, 80px); line-height: 0.92; letter-spacing: -2px; color: white; margin-bottom: 24px; }
        .cta-h2 em { font-style: italic; color: var(--blush); display: block; }
        .cta-sub { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.4); margin-bottom: 44px; line-height: 1.8; }
        .cta-note { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 300; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); text-transform: uppercase; margin-top: 20px; }

        /* ── FOOTER ── */
        .footer { background: var(--dark); border-top: 1px solid rgba(255,255,255,0.06); padding: 32px 48px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .footer-logo { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 13px; color: white; letter-spacing: 0.18em; text-transform: uppercase; }
        .footer-logo strong { font-weight: 700; }
        .footer-links { display: flex; gap: 20px; }
        .footer-link { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 300; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.2); text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: white; }
        .footer-copy { font-family: 'DM Sans', sans-serif; font-size: 10px; color: rgba(255,255,255,0.15); }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .nav { padding: 14px 20px; }
          .nav-a { display: none; }
          .sticky-mob { display: block; }
          .hero { grid-template-columns: 1fr; padding: 100px 20px 120px; min-height: 100svh; gap: 40px; }
          .hero-right { height: 320px; }
          .hero-img-float { width: 120px; height: 140px; }
          .hero-proof { gap: 20px; }
          .pain { padding: 72px 20px; }
          .pain-grid { grid-template-columns: 1fr; gap: 40px; }
          .pain-img { height: 280px; }
          .transf { padding: 72px 20px; }
          .transf-grid { grid-template-columns: 1fr; }
          .transf-col { padding: 28px 24px; }
          .showcase { padding: 72px 20px; }
          .ui-body { grid-template-columns: 1fr; }
          .ui-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .realism { padding: 72px 20px; }
          .realism-layout { grid-template-columns: 1fr; gap: 40px; }
          .realism-img { height: 280px; }
          .realism-cards { grid-template-columns: 1fr; }
          .forwho { padding: 72px 20px; }
          .forwho-grid { grid-template-columns: 1fr 1fr; }
          .cta { padding: 80px 20px 140px; }
          .footer { flex-direction: column; align-items: flex-start; padding: 28px 20px; }
        }
        @media (max-width: 480px) {
          .forwho-grid { grid-template-columns: 1fr; }
          .hero-ctas { flex-direction: column; }
          .btn-wine, .btn-outline { text-align: center; }
        }
      `}</style>

      {/* NAV */}
      <HomeNav />

      {/* STICKY MOBILE */}
      <div className="sticky-mob">
        <a href="/generate">⚡ Generate Free — No Card</a>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-kicker dm">The AI Cinematic Creator OS</div>
          <h1 className="hero-h1 pf">
            Your content.
            <em>Cinematically</em>
            real.
          </h1>
          <p className="hero-sub dm">
            Type one idea. Get a <strong>full cinematic campaign</strong> in 60 seconds —
            briefings, image prompts, reel direction, captions, hashtags.
            Built on human realism. Not generic AI.
          </p>
          <div className="hero-ctas">
            <Link href="/generate" className="btn-wine dm">⚡ Generate Free Now</Link>
            <Link href="/pricing" className="btn-outline dm">View Pricing →</Link>
          </div>
          <div className="hero-proof">
            {[{n:'60s',l:'Idea to campaign'},{n:'8+',l:'Output formats'},{n:'100%',l:'Human realism'},{n:'Free',l:'3 briefs to start'}].map(p => (
              <div className="proof-item" key={p.l}>
                <span className="proof-num pf">{p.n}</span>
                <span className="proof-lbl dm">{p.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img-main">
            <Image src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=85" alt="Creator" fill style={{objectFit:'cover'}} />
          </div>
          <div className="hero-img-float">
            <Image src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=85" alt="Beauty creator" fill style={{objectFit:'cover'}} />
          </div>
          <div className="hero-badge dm">⚡ Campaign ready in 60s</div>
        </div>
      </section>

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

      {/* ── PAIN — DARK ── */}
      <section className="pain">
        <div className="pain-inner">
          <div className="pain-grid">
            <div className="pain-img">
              <Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=85" alt="Creator" fill style={{objectFit:'cover',filter:'grayscale(30%)'}} />
            </div>
            <div>
              <div className="sec-tag-light dm">Be honest</div>
              <h2 className="pain-h2 pf">Your AI content<br /><em>isn't converting.</em></h2>
              <div className="pain-list">
                {[
                  {t:'It looks AI-generated',d:'Stiff movements, dead eyes, robotic delivery. Viewers scroll past in 0.3 seconds.'},
                  {t:'Same content, no results',d:'Posting daily but engagement is flat. The algorithm isn\'t broken — your output is.'},
                  {t:'Hours lost prompting',d:'More time figuring out what to create than actually creating. That ends today.'},
                  {t:'No creative identity',d:'Your brand changes every week. No visual signature. Just content for the algorithm.'},
                  {t:'Emotionally empty visuals',d:'Content that looks polished but feels hollow. People scroll past without feeling anything.'},
                ].map((p,i) => (
                  <div className="pain-row" key={p.t}>
                    <span className="pain-n pf">0{i+1}</span>
                    <div className="pain-t dm"><strong>{p.t} — </strong>{p.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRANSFORMATION — LIGHT ── */}
      <section className="transf">
        <div className="transf-inner">
          <div className="sec-tag-dark dm">The transformation</div>
          <h2 className="transf-h2 pf">Before.<br /><em>After.</em></h2>
          <div className="transf-grid">
            <div className="transf-col transf-before">
              <div className="transf-lbl dm">Without SuperCool</div>
              {['Hours guessing what to post','Robotic AI humans with dead eyes','Generic prompts, generic output','Content that looks AI-generated','No brand identity or visual signature','Low engagement, no emotional pull','Creative burnout every week'].map(t => (
                <div className="transf-item dm" key={t}><span style={{flexShrink:0,marginTop:'2px',opacity:0.4}}>—</span>{t}</div>
              ))}
            </div>
            <div className="transf-col transf-after">
              <div className="transf-lbl dm">With SuperCool</div>
              {['Full campaign ready in 60 seconds','Believable human motion and skin realism','Cinematic direction in every brief','Content that looks filmed, not generated','Locked creator identity across every post','Emotional storytelling that drives results','Creative confidence — never blank again'].map(t => (
                <div className="transf-item dm" key={t}><span style={{flexShrink:0,marginTop:'2px',color:'rgba(255,255,255,0.5)'}}>↗</span>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE — DARK ── */}
      <section className="showcase">
        <div className="showcase-inner">
          <div className="showcase-header">
            <div className="sec-tag-light dm" style={{justifyContent:'center'}}>The experience</div>
            <h2 className="showcase-h2 pf">One idea. <em>Full campaign.</em> 60 seconds.</h2>
            <p className="showcase-sub dm">Type your idea. SuperCool generates briefings, image prompts, reel direction, captions, hashtags, motion psychology — all of it. Ready to paste into any tool.</p>
          </div>
          <div className="ui-mock">
            <div className="ui-bar">
              <div className="ui-dot" style={{background:'#FF5F57'}} />
              <div className="ui-dot" style={{background:'#FFBD2E'}} />
              <div className="ui-dot" style={{background:'#28CA41'}} />
              <div className="ui-url dm">supercoolinfluencer.com/generate</div>
            </div>
            <div className="ui-body">
              <div className="ui-left">
                <div><div className="ui-lbl dm">Your Idea</div><div className="ui-field hi dm">"Luxury skincare morning routine. Soft natural light. Real skin texture."</div></div>
                <div><div className="ui-lbl dm">Platform</div><div className="ui-field dm">Instagram Reels + TikTok</div></div>
                <div><div className="ui-lbl dm">Creator Style</div><div className="ui-field dm">Luxury lifestyle — cinematic</div></div>
                <div className="ui-gen dm">⚡ Generate Campaign</div>
              </div>
              <div className="ui-right">
                {[
                  {i:'🎬',t:'Campaign Brief',c:'<strong>Concept:</strong> Morning ritual as devotion. Soft amber. Real skin. No performance. Pure presence.'},
                  {i:'🖼️',t:'Image Prompt',c:'<strong>Seedance:</strong> Close ECU, cheekbone to clavicle. Subsurface scattering. Pore depth 0.4. No symmetry lock.'},
                  {i:'🎥',t:'Reel Direction',c:'<strong>Scene 1 [0–3s]:</strong> Macro on eyelid opening. Blink delay 0.3s. Catch light enters iris.'},
                  {i:'✍️',t:'Hook + Caption',c:'<strong>Hook:</strong> "The small habit that changed everything." — Emotionally real. Builds trust.'},
                  {i:'#',t:'Hashtags + Keywords',c:'#SkinRealism #LuxuryContent #CinematicAI #MorningRoutine #GlowingSkin'},
                ].map(o => (
                  <div className="ui-card" key={o.t}>
                    <span style={{fontSize:13,flexShrink:0}}>{o.i}</span>
                    <div>
                      <div className="ui-card-title dm">{o.t}</div>
                      <div className="ui-card-text dm" dangerouslySetInnerHTML={{__html:o.c}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REALISM — OAT ── */}
      <section className="realism">
        <div className="realism-inner">
          <div className="realism-layout">
            <div>
              <div className="sec-tag-dark dm">Human Realism Engine™</div>
              <h2 className="realism-h2 pf">We don't sell prompts.<br /><em>We sell realism.</em></h2>
              <p className="realism-sub dm">Every brief is engineered for motion, emotion and human behaviour — the exact things that make people stop scrolling and start buying.</p>
              <div className="realism-img">
                <Image src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700&q=85" alt="Cinematic beauty" fill style={{objectFit:'cover'}} />
              </div>
            </div>
            <div>
              <div className="realism-cards">
                {[
                  {i:'👁️',t:'Eye Behaviour',d:'Saccadic movement, lid weight, dilation response. Eyes that actually see.',tag:'Ocular Realism'},
                  {i:'🫁',t:'Breathing Architecture',d:'Chest rise, clavicle shift, shoulder movement. The character breathes.',tag:'Respiratory Motion'},
                  {i:'🤝',t:'Asymmetric Movement',d:'Real humans don\'t move symmetrically. Micro-asymmetry in every gesture.',tag:'Natural Imperfection'},
                  {i:'🎭',t:'Micro-Expressions',d:'Involuntary jaw tension, nostril flare, brow microlifts before emotion lands.',tag:'Emotional Leakage'},
                  {i:'👗',t:'Fabric Physics',d:'Clothing moves with the body. Gravity, weight, texture — real material.',tag:'Procedural Fabric'},
                  {i:'🧬',t:'Skin Truth System',d:'Pore depth, subsurface scattering, oil variation. Skin that reacts to light.',tag:'Biological Texture'},
                  {i:'⏱️',t:'Behavioural Delay',d:'Real humans hesitate, pause, self-correct. Timing imperfection is the signature.',tag:'Temporal Realism'},
                  {i:'🎬',t:'GTA-Style Realism',d:'Procedural NPC-level movement applied to creator characters.',tag:'Motion Capture Logic'},
                ].map(r => (
                  <div className="realism-card" key={r.t}>
                    <div className="realism-icon">{r.i}</div>
                    <div className="realism-ct dm">{r.t}</div>
                    <div className="realism-cd dm">{r.d}</div>
                    <span className="realism-tag dm">{r.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR WHO — WINE ── */}
      <section className="forwho">
        <div className="forwho-inner">
          <div className="sec-tag-light dm" style={{color:'rgba(255,255,255,0.5)'}}>Built for</div>
          <h2 className="forwho-h2 pf">Every creator.<br /><em>Every brand.</em></h2>
          <div className="forwho-grid">
            {[
              {e:'🎬',t:'AI Creators',d:"You create with AI and need output that doesn't look AI-generated."},
              {e:'💄',t:'Beauty & Skincare',d:'Your niche is visual. You need skin truth, texture, light behaviour.'},
              {e:'👗',t:'Fashion & Lifestyle',d:'Fabric physics, editorial composition, identity lock across every frame.'},
              {e:'🛍️',t:'Brand Owners',d:'Product ads that feel human. Brief → campaign in 60 seconds.'},
              {e:'📱',t:'Content Agencies',d:'Scale output without scaling headcount. Client campaigns in minutes.'},
              {e:'🌍',t:'Luxury Lifestyle',d:'Your world is elevated. Your content should feel the same.'},
              {e:'🧠',t:'Burned-Out Creators',d:'The blank page is over. SuperCool generates everything. You just create.'},
              {e:'⚡',t:'Fast Movers',d:'Trend moves fast. SuperCool moves faster.'},
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

      {/* ── FINAL CTA ── */}
      <section className="cta">
        <div className="cta-inner">
          <h2 className="cta-h2 pf">Stop creating.<br /><em>Start directing.</em></h2>
          <p className="cta-sub dm">3 free campaigns. No credit card. No setup.<br />Just your idea — and 60 seconds.</p>
          <Link href="/generate" className="btn-wine dm">⚡ Enter SuperCool</Link>
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
