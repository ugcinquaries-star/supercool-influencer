import Link from "next/link";
import Image from "next/image";
import HomeNav from "./components/HomeNav";

export default function Home() {
  return (
    <div style={{ background: '#F2E0D2', color: '#1A0A0E', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
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
          --white: #FFFFFF;
        }
        html { scroll-behavior: smooth; }
        .pf { font-family: 'Playfair Display', Georgia, serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 48px;
          background: rgba(242,224,210,0.95); backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(158,24,43,0.08);
        }
        .logo { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 15px; color: var(--dark); letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; }
        .logo strong { font-weight: 700; }
        .nav-links { display: flex; gap: 28px; align-items: center; }
        .nav-a { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(26,10,14,0.5); text-decoration: none; transition: color 0.2s; }
        .nav-a:hover { color: var(--wine); }
        .nav-cta { background: var(--wine); color: white; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 10px 24px; border-radius: 2px; text-decoration: none; }

        /* STICKY MOBILE */
        .sticky-mob { display: none; position: fixed; bottom: 20px; left: 20px; right: 20px; z-index: 999; }
        .sticky-mob a { display: block; text-align: center; background: var(--wine); color: white; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 16px; border-radius: 3px; text-decoration: none; box-shadow: 0 8px 32px rgba(158,24,43,0.45); }

        /* HERO — fullscreen split */
        .hero {
          min-height: 100svh; display: grid; grid-template-columns: 1fr 1fr;
          padding-top: 72px; background: var(--oat); overflow: hidden;
        }
        .hero-left {
          display: flex; flex-direction: column; justify-content: center;
          padding: 80px 56px 80px 56px; position: relative; z-index: 2;
        }
        .hero-kicker { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 20px; font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--wine); }
        .hero-kicker::before { content: ''; width: 20px; height: 1px; background: var(--wine); }
        .hero-h1 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(44px, 5.5vw, 76px); line-height: 1; letter-spacing: -2px; color: var(--dark); margin-bottom: 8px; }
        .hero-h1 em { font-style: italic; color: var(--wine); display: block; }
        .hero-h1 strong { font-weight: 900; display: block; }
        .hero-sub { font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 300; line-height: 1.7; color: rgba(26,10,14,0.6); max-width: 400px; margin: 20px 0 36px; }
        .hero-sub strong { color: var(--dark); font-weight: 500; }
        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
        .btn-wine { background: var(--wine); color: white; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 15px 36px; border-radius: 2px; text-decoration: none; box-shadow: 0 4px 20px rgba(158,24,43,0.3); transition: all 0.2s; }
        .btn-wine:hover { background: var(--wine-dark); transform: translateY(-1px); }
        .btn-outline { border: 1.5px solid rgba(26,10,14,0.2); color: rgba(26,10,14,0.6); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 15px 28px; border-radius: 2px; text-decoration: none; transition: all 0.2s; }
        .btn-outline:hover { border-color: var(--wine); color: var(--wine); }
        .hero-features { display: flex; flex-direction: column; gap: 10px; }
        .hero-feat { display: flex; align-items: center; gap: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; color: rgba(26,10,14,0.65); }
        .hero-feat-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--wine); flex-shrink: 0; }

        /* HERO RIGHT IMAGE */
        .hero-right { position: relative; overflow: hidden; }
        .hero-right img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .hero-right-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(242,224,210,0.3) 0%, transparent 30%); pointer-events: none; }
        .hero-badge { position: absolute; bottom: 32px; left: 32px; background: rgba(26,10,14,0.85); backdrop-filter: blur(8px); color: white; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; padding: 10px 18px; border-radius: 3px; border-left: 3px solid var(--wine); }
        .hero-badge strong { display: block; font-size: 15px; font-weight: 700; color: var(--gold); }

        /* TRUST BAR */
        .trust { background: var(--dark); padding: 18px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .trust-label { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.3); white-space: nowrap; }
        .trust-items { display: flex; gap: 32px; align-items: center; flex-wrap: wrap; }
        .trust-item { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.5); letter-spacing: 0.06em; }

        /* MARQUEE */
        .marquee { background: var(--wine); padding: 14px 0; overflow: hidden; }
        .marquee-track { display: flex; white-space: nowrap; animation: mq 26s linear infinite; }
        .marquee-item { display: inline-flex; align-items: center; gap: 24px; padding: 0 24px; font-family: 'Playfair Display', serif; font-size: 13px; font-style: italic; color: rgba(255,255,255,0.7); flex-shrink: 0; }
        .marquee-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.35); }
        @keyframes mq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* HOW IT WORKS */
        .how { background: var(--cream); padding: 100px 48px; }
        .how-inner { max-width: 1100px; margin: 0 auto; }
        .how-header { text-align: center; margin-bottom: 64px; }
        .sec-tag { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--wine); margin-bottom: 16px; }
        .how-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(32px, 5vw, 56px); line-height: 1; letter-spacing: -1.5px; color: var(--dark); }
        .how-h2 em { font-style: italic; color: var(--wine); }
        .how-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .how-step { background: white; padding: 40px 32px; position: relative; }
        .how-step:first-child { border-radius: 4px 0 0 4px; }
        .how-step:last-child { border-radius: 0 4px 4px 0; }
        .how-num { font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 900; color: rgba(158,24,43,0.08); line-height: 1; margin-bottom: 16px; }
        .how-step-title { font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 700; color: var(--dark); margin-bottom: 10px; }
        .how-step-desc { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300; color: rgba(26,10,14,0.55); line-height: 1.7; }
        .how-step-time { display: inline-block; margin-top: 14px; background: rgba(158,24,43,0.08); color: var(--wine); font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 12px; border-radius: 100px; }

        /* FEATURES — with UGC grid image */
        .features { background: var(--oat); padding: 100px 48px; }
        .features-inner { max-width: 1100px; margin: 0 auto; }
        .features-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .features-img { position: relative; height: 560px; border-radius: 4px; overflow: hidden; box-shadow: 0 24px 64px rgba(26,10,14,0.15); }
        .features-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(32px, 4vw, 52px); line-height: 1; letter-spacing: -1.5px; color: var(--dark); margin-bottom: 16px; }
        .features-h2 em { font-style: italic; color: var(--wine); }
        .features-sub { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300; color: rgba(26,10,14,0.55); line-height: 1.75; margin-bottom: 36px; }
        .features-list { display: flex; flex-direction: column; gap: 0; }
        .feat-row { display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid rgba(26,10,14,0.07); align-items: flex-start; }
        .feat-row:first-child { border-top: 1px solid rgba(26,10,14,0.07); }
        .feat-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
        .feat-title { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; color: var(--dark); margin-bottom: 3px; }
        .feat-desc { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 300; color: rgba(26,10,14,0.5); line-height: 1.6; }

        /* REALISM — dark with your macro images */
        .realism { background: var(--dark); padding: 100px 48px; }
        .realism-inner { max-width: 1100px; margin: 0 auto; }
        .realism-header { text-align: center; margin-bottom: 64px; }
        .realism-tag { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--blush); margin-bottom: 16px; }
        .realism-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(32px, 5vw, 56px); line-height: 1; letter-spacing: -1.5px; color: white; margin-bottom: 16px; }
        .realism-h2 em { font-style: italic; color: var(--blush); }
        .realism-sub { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.4); max-width: 560px; margin: 0 auto; line-height: 1.75; }
        .realism-images { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 48px; }
        .realism-img-wrap { position: relative; border-radius: 4px; overflow: hidden; }
        .realism-img-wrap:first-child { height: 400px; }
        .realism-img-wrap:last-child { height: 400px; }
        .realism-img-label { position: absolute; bottom: 16px; left: 16px; background: rgba(26,10,14,0.75); backdrop-filter: blur(6px); color: white; font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; padding: 6px 12px; border-radius: 2px; border-left: 2px solid var(--blush); }
        .realism-points { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
        .realism-point { background: rgba(255,255,255,0.04); padding: 24px 20px; border-top: 2px solid transparent; transition: border-color 0.3s; }
        .realism-point:hover { border-top-color: var(--blush); }
        .realism-point-icon { font-size: 20px; margin-bottom: 12px; }
        .realism-point-title { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: white; margin-bottom: 6px; }
        .realism-point-desc { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.35); line-height: 1.65; }

        /* LIFESTYLE — warm image section */
        .lifestyle { background: var(--cream); padding: 0; overflow: hidden; }
        .lifestyle-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; }
        .lifestyle-img { position: relative; overflow: hidden; }
        .lifestyle-content { display: flex; flex-direction: column; justify-content: center; padding: 80px 64px; }
        .lifestyle-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(32px, 4vw, 52px); line-height: 1; letter-spacing: -1.5px; color: var(--dark); margin-bottom: 20px; }
        .lifestyle-h2 em { font-style: italic; color: var(--wine); }
        .lifestyle-sub { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300; color: rgba(26,10,14,0.55); line-height: 1.75; margin-bottom: 36px; }
        .lifestyle-items { display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px; }
        .lifestyle-item { display: flex; align-items: center; gap: 12px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 400; color: rgba(26,10,14,0.7); }
        .lifestyle-check { width: 20px; height: 20px; border-radius: 50%; background: var(--wine); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 10px; color: white; }

        /* FOR WHO */
        .forwho { background: var(--wine); padding: 100px 48px; }
        .forwho-inner { max-width: 1100px; margin: 0 auto; }
        .forwho-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(32px, 5vw, 60px); line-height: 1; letter-spacing: -2px; color: white; margin-bottom: 56px; }
        .forwho-h2 em { font-style: italic; color: var(--rose); }
        .forwho-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
        .forwho-card { background: rgba(255,255,255,0.06); padding: 28px 22px; border-top: 2px solid transparent; transition: all 0.2s; }
        .forwho-card:hover { background: rgba(255,255,255,0.12); border-top-color: var(--rose); }
        .forwho-e { font-size: 20px; margin-bottom: 14px; display: block; }
        .forwho-t { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; color: white; margin-bottom: 7px; }
        .forwho-d { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.5); line-height: 1.7; }

        /* FINAL CTA */
        .cta-final { background: var(--dark); padding: 120px 48px; text-align: center; position: relative; overflow: hidden; }
        .cta-final::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249,203,214,0.07) 0%, transparent 70%); pointer-events: none; }
        .cta-inner { position: relative; z-index: 2; max-width: 600px; margin: 0 auto; }
        .cta-h2 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(40px, 6vw, 80px); line-height: 0.95; letter-spacing: -2px; color: white; margin-bottom: 24px; }
        .cta-h2 em { font-style: italic; color: var(--blush); display: block; }
        .cta-sub { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.4); margin-bottom: 44px; line-height: 1.8; }
        .cta-note { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 300; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); text-transform: uppercase; margin-top: 20px; }

        /* FOOTER */
        .footer { background: var(--dark); border-top: 1px solid rgba(255,255,255,0.06); padding: 32px 48px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .footer-logo { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 13px; color: white; letter-spacing: 0.18em; text-transform: uppercase; }
        .footer-logo strong { font-weight: 700; }
        .footer-links { display: flex; gap: 20px; }
        .footer-link { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 300; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.2); text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: white; }
        .footer-copy { font-family: 'DM Sans', sans-serif; font-size: 10px; color: rgba(255,255,255,0.15); }

        /* MOBILE */
        @media (max-width: 768px) {
          .nav { padding: 14px 20px; }
          .nav-a { display: none; }
          .sticky-mob { display: block; }
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-left { padding: 80px 20px 40px; }
          .hero-right { height: 420px; }
          .hero-h1 { letter-spacing: -1.5px; }
          .hero-ctas { flex-direction: column; }
          .btn-wine, .btn-outline { text-align: center; }
          .trust { padding: 16px 20px; }
          .how { padding: 72px 20px; }
          .how-steps { grid-template-columns: 1fr; gap: 2px; }
          .how-step:first-child { border-radius: 4px 4px 0 0; }
          .how-step:last-child { border-radius: 0 0 4px 4px; }
          .features { padding: 72px 20px; }
          .features-layout { grid-template-columns: 1fr; gap: 40px; }
          .features-img { height: 320px; }
          .realism { padding: 72px 20px; }
          .realism-images { grid-template-columns: 1fr; }
          .realism-img-wrap:first-child, .realism-img-wrap:last-child { height: 280px; }
          .realism-points { grid-template-columns: 1fr 1fr; }
          .lifestyle-grid { grid-template-columns: 1fr; }
          .lifestyle-img { height: 380px; }
          .lifestyle-content { padding: 48px 20px; }
          .forwho { padding: 72px 20px; }
          .forwho-grid { grid-template-columns: 1fr 1fr; }
          .cta-final { padding: 80px 20px 140px; }
          .footer { flex-direction: column; align-items: flex-start; padding: 28px 20px; }
        }
        @media (max-width: 480px) {
          .forwho-grid { grid-template-columns: 1fr; }
          .realism-points { grid-template-columns: 1fr; }
        }
      `}</style>

      <HomeNav />

      <div className="sticky-mob">
        <a href="/generate">⚡ Generate Free — 3 Briefs, No Card</a>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-kicker dm">Your AI Content Director</div>
          <h1 className="hero-h1 pf">
            <strong>No ideas.</strong>
            <strong>No team.</strong>
            <em>No problem.</em>
          </h1>
          <p className="hero-sub dm">
            SuperCool generates your full AI content campaign in <strong>60 seconds</strong> —
            cinematic briefs, image prompts, reel direction, captions, keywords and hashtags. All of it.
          </p>
          <div className="hero-ctas">
            <Link href="/generate" className="btn-wine dm">⚡ Generate Free — 3 Briefs</Link>
            <Link href="/pricing" className="btn-outline dm">View Pricing →</Link>
          </div>
          <div className="hero-features">
            {['AI UGC Ads that convert','Cinematic Reels with real human motion','Captions, Keywords & Hashtags included','Ready for Seedance, Kling, Runway, Midjourney'].map(f => (
              <div className="hero-feat" key={f}><div className="hero-feat-dot" /><span className="dm">{f}</span></div>
            ))}
          </div>
        </div>
        <div className="hero-right">
          <Image src="/hero.png" alt="Cinematic AI Creator Content" fill style={{objectFit:'cover', objectPosition:'center top'}} priority />
          <div className="hero-right-overlay" />
          <div className="hero-badge dm">
            <strong>Campaign Ready</strong>
            in 60 seconds
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="trust">
        <span className="trust-label dm">Works with</span>
        <div className="trust-items">
          {['Seedance 2.0','Kling 1.6','Runway Gen-4','Midjourney','Flux','HeyGen','Nano Banana'].map(t => (
            <span className="trust-item dm" key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div className="marquee">
        <div className="marquee-track">
          {[...Array(2)].map((_,i) => (
            <div key={i} style={{display:'flex',flexShrink:0}}>
              {['Human Realism Engine™','Motion Psychology™','GTA-Style Behavioral Realism','Anti-Generic AI','Cinematic Direction','Identity Lock™','60-Second Campaigns'].map((t,j) => (
                <span key={j} className="marquee-item pf">{t}<span className="marquee-dot" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="how">
        <div className="how-inner">
          <div className="how-header">
            <div className="sec-tag dm">How SuperCool Works</div>
            <h2 className="how-h2 pf">3 steps.<br /><em>Full campaign.</em></h2>
          </div>
          <div className="how-steps">
            {[
              {n:'01',t:'Enter Your Idea',d:'Type your product, niche, or content concept. Choose your platform, creator style, and campaign angle.',time:'10 seconds'},
              {n:'02',t:'SuperCool Creates Everything',d:'AI generates your full campaign — briefs, image prompts, reel direction, captions, keywords, hashtags and motion engineering.',time:'30 seconds'},
              {n:'03',t:'Copy, Export & Post',d:'Copy prompts directly into Seedance, Kling, Runway or Midjourney. Post and grow. No editing skills needed.',time:'20 seconds'},
            ].map(s => (
              <div className="how-step" key={s.n}>
                <div className="how-num pf">{s.n}</div>
                <div className="how-step-title dm">{s.t}</div>
                <div className="how-step-desc dm">{s.d}</div>
                <span className="how-step-time dm">{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES — with UGC grid image ── */}
      <section className="features">
        <div className="features-inner">
          <div className="features-layout">
            <div className="features-img">
              <Image src="/ugc-grid.png" alt="AI UGC Campaign Output" fill style={{objectFit:'cover'}} />
            </div>
            <div>
              <div className="sec-tag dm">What you get in 60 seconds</div>
              <h2 className="features-h2 pf">Everything you need.<br /><em>Generated instantly.</em></h2>
              <p className="features-sub dm">One idea. One click. SuperCool builds your entire content package — ready to paste into any AI tool and post.</p>
              <div className="features-list">
                {[
                  {i:'🎬',t:'AI UGC Ads',d:'Authentic, realistic ads with believable human motion that convert.'},
                  {i:'🎥',t:'Cinematic Reels',d:'Movie-level storytelling with real motion psychology built in.'},
                  {i:'🖼️',t:'Hyper-Realistic Images',d:'Studio-quality visuals that look filmed, not generated.'},
                  {i:'✍️',t:'Captions That Hook',d:'Viral captions, hooks and CTAs written for your platform.'},
                  {i:'#',t:'Keywords & Hashtags',d:'SEO-optimized keywords and hashtag sets for maximum reach.'},
                  {i:'⚡',t:'All in 60 Seconds',d:'Full content package. No editing skills. No expensive tools.'},
                ].map(f => (
                  <div className="feat-row" key={f.t}>
                    <span className="feat-icon">{f.i}</span>
                    <div>
                      <div className="feat-title dm">{f.t}</div>
                      <div className="feat-desc dm">{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REALISM — dark with macro images ── */}
      <section className="realism">
        <div className="realism-inner">
          <div className="realism-header">
            <div className="realism-tag dm">Human Realism Engine™</div>
            <h2 className="realism-h2 pf">We don't sell prompts.<br /><em>We sell realism.</em></h2>
            <p className="realism-sub dm">Every brief is engineered for biological realism — the same level of detail that makes content feel filmed, not generated.</p>
          </div>
          <div className="realism-images">
            <div className="realism-img-wrap">
              <Image src="/realism-eye.png" alt="Eye realism" fill style={{objectFit:'cover',objectPosition:'center'}} />
              <div className="realism-img-label dm">Ocular Realism System</div>
            </div>
            <div className="realism-img-wrap">
              <Image src="/realism-skin.png" alt="Skin realism" fill style={{objectFit:'cover',objectPosition:'center'}} />
              <div className="realism-img-label dm">Skin Truth System</div>
            </div>
          </div>
          <div className="realism-points">
            {[
              {i:'👁️',t:'Eye Behaviour',d:'Saccadic movement, lid weight, dilation. Eyes that actually see.'},
              {i:'🧬',t:'Skin Truth',d:'Pore depth, subsurface scattering, oil variation. Real skin texture.'},
              {i:'⏱️',t:'Behavioural Delay',d:'Real humans hesitate. Timing imperfection is the signature of authenticity.'},
              {i:'🎭',t:'Micro-Expressions',d:'Involuntary jaw tension, nostril flare — before the emotion lands.'},
              {i:'🫁',t:'Breathing Architecture',d:'Chest rise, clavicle shift. The character breathes between every line.'},
              {i:'🤝',t:'Asymmetric Motion',d:'Real humans don\'t move symmetrically. Built into every brief.'},
              {i:'👗',t:'Fabric Physics',d:'Clothing moves with the body. Gravity and weight — real material.'},
              {i:'🎬',t:'GTA-Style Realism',d:'Procedural NPC-level movement applied to your AI creator.'},
            ].map(r => (
              <div className="realism-point" key={r.t}>
                <div className="realism-point-icon">{r.i}</div>
                <div className="realism-point-title dm">{r.t}</div>
                <div className="realism-point-desc dm">{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE IMAGE SECTION ── */}
      <section className="lifestyle">
        <div className="lifestyle-grid">
          <div className="lifestyle-img">
            <Image src="/lifestyle.png" alt="Luxury creator lifestyle" fill style={{objectFit:'cover',objectPosition:'center top'}} />
          </div>
          <div className="lifestyle-content">
            <div className="sec-tag dm">Create. Post. Grow.</div>
            <h2 className="lifestyle-h2 pf">For creators.<br />Agencies.<br /><em>AI UGC pros.</em></h2>
            <p className="lifestyle-sub dm">SuperCool does the heavy lifting — so you can focus on building your brand, not burning out on ideas.</p>
            <div className="lifestyle-items">
              {['Full AI content creation in 60 seconds','No editing skills needed','No brainstorming or prompting','No expensive tools or teams','3 free briefs — no credit card'].map(item => (
                <div className="lifestyle-item" key={item}>
                  <div className="lifestyle-check">✓</div>
                  <span className="dm">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/generate" className="btn-wine dm" style={{display:'inline-block',textAlign:'center'}}>Start Free Today →</Link>
          </div>
        </div>
      </section>

      {/* ── FOR WHO ── */}
      <section className="forwho">
        <div className="forwho-inner">
          <div className="sec-tag dm" style={{color:'rgba(255,255,255,0.4)'}}>Built for</div>
          <h2 className="forwho-h2 pf">Every creator.<br /><em>Every brand.</em></h2>
          <div className="forwho-grid">
            {[
              {e:'🎬',t:'AI Creators',d:"You create with AI tools and need output that doesn't look AI-generated."},
              {e:'💄',t:'Beauty & Skincare',d:'Your niche is visual. You need skin truth, texture, real light behaviour.'},
              {e:'👗',t:'Fashion & Lifestyle',d:'Editorial composition, identity lock, fabric physics. Your aesthetic — consistent.'},
              {e:'🛍️',t:'Brand Owners',d:'Product ads that feel human. Brief → campaign in 60 seconds.'},
              {e:'📱',t:'Content Agencies',d:'Scale client output without scaling headcount. Minutes not days.'},
              {e:'🌍',t:'Luxury Lifestyle',d:'Your world is elevated. Your content should feel the same.'},
              {e:'🧠',t:'Burned-Out Creators',d:'The blank page is over. SuperCool generates everything. You just post.'},
              {e:'⚡',t:'Fast Movers',d:'Trend moves fast. SuperCool moves faster. Idea to campaign before it passes.'},
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
      <section className="cta-final">
        <div className="cta-inner">
          <h2 className="cta-h2 pf">Stop creating.<br /><em>Start directing.</em></h2>
          <p className="cta-sub dm">3 free briefs. No credit card. No setup.<br />Just your idea — and 60 seconds.</p>
          <Link href="/generate" className="btn-wine dm" style={{display:'inline-block'}}>⚡ Generate Free Now</Link>
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
