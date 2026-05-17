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
          --bg: #141010; --bg2: #1C1616; --bg3: #231A1A;
          --wine: #9E182B; --wine-glow: rgba(158,24,43,0.2);
          --blush: #F2AFBC; --rose: #F9CBD6; --oat: #F2E0D2;
          --ivory: #F5F0E8; --gold: #D4AF87;
          --border: rgba(245,240,232,0.07);
          --border-wine: rgba(158,24,43,0.25);
          --text-dim: rgba(245,240,232,0.42);
          --text-mid: rgba(245,240,232,0.65);
        }
        html { scroll-behavior: smooth; }
        .pf { font-family: 'Playfair Display', Georgia, serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        /* NAV */
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; justify-content: space-between; align-items: center; padding: 16px 48px; background: rgba(20,16,16,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); }
        .logo { font-family:'DM Sans',sans-serif; font-weight:300; font-size:14px; color:var(--ivory); letter-spacing:0.22em; text-transform:uppercase; text-decoration:none; }
        .logo strong { font-weight:700; }
        .nav-links { display:flex; gap:28px; align-items:center; }
        .nav-a { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:400; letter-spacing:0.12em; text-transform:uppercase; color:var(--text-dim); text-decoration:none; transition:color 0.2s; }
        .nav-a:hover { color:var(--ivory); }
        .nav-cta { background:var(--wine); color:white; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; padding:10px 22px; border-radius:3px; text-decoration:none; box-shadow:0 0 20px var(--wine-glow); }

        /* STICKY MOBILE */
        .sticky-mob { display:none; position:fixed; bottom:20px; left:20px; right:20px; z-index:999; }
        .sticky-mob a { display:block; text-align:center; background:var(--wine); color:white; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:16px; border-radius:3px; text-decoration:none; box-shadow:0 8px 32px rgba(158,24,43,0.5); }

        /* HERO */
        .hero { min-height:100svh; padding:72px 48px 0; position:relative; overflow:hidden; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; background:var(--bg); }
        .hero-bg-imgs { position:absolute; inset:0; display:grid; grid-template-columns:1fr 1fr; }
        .hero-bg-left { position:relative; overflow:hidden; }
        .hero-bg-right { position:relative; overflow:hidden; }
        .hero-bg-overlay { position:absolute; inset:0; background:rgba(20,16,16,0.72); z-index:1; }
        .hero-bg-center-grad { position:absolute; inset:0; z-index:2; background:linear-gradient(to bottom, rgba(20,16,16,0.3) 0%, rgba(20,16,16,0.1) 40%, rgba(20,16,16,0.9) 88%, var(--bg) 100%), radial-gradient(ellipse 40% 60% at 50% 40%, rgba(20,16,16,0.5) 0%, transparent 70%); pointer-events:none; }
        .hero-glow { position:absolute; bottom:20%; left:50%; transform:translateX(-50%); width:600px; height:200px; background:radial-gradient(ellipse, rgba(158,24,43,0.2) 0%, transparent 70%); pointer-events:none; z-index:2; }

        /* HERO TEXT */
        .hero-text { position:relative; z-index:5; text-align:center; max-width:700px; padding-bottom:32px; }
        .hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(158,24,43,0.12); border:1px solid var(--border-wine); color:var(--blush); font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; padding:5px 14px; border-radius:100px; margin-bottom:20px; }
        .hero-dot { width:5px; height:5px; border-radius:50%; background:var(--blush); animation:pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .hero-h1 { font-family:'Playfair Display',serif; font-weight:900; font-size:clamp(48px,7vw,88px); line-height:0.95; letter-spacing:-2.5px; color:var(--ivory); margin-bottom:8px; }
        .hero-h1 em { font-style:italic; color:var(--wine); display:block; text-shadow:0 0 48px rgba(158,24,43,0.35); }
        .hero-sub { font-family:'DM Sans',sans-serif; font-size:16px; font-weight:300; color:var(--text-dim); max-width:480px; margin:18px auto 28px; line-height:1.7; }
        .hero-sub strong { color:var(--ivory); font-weight:500; }
        .hero-ctas { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-bottom:16px; }
        .btn-primary { background:var(--wine); color:white; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:15px 32px; border-radius:3px; text-decoration:none; box-shadow:0 4px 24px rgba(158,24,43,0.35); transition:all 0.2s; display:inline-block; }
        .btn-primary:hover { background:#7a1221; transform:translateY(-1px); }
        .btn-ghost { border:1px solid var(--border); color:var(--text-dim); font-family:'DM Sans',sans-serif; font-size:12px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; padding:15px 28px; border-radius:3px; text-decoration:none; transition:all 0.2s; display:inline-block; }
        .btn-ghost:hover { border-color:rgba(245,240,232,0.25); color:var(--ivory); }
        .hero-proof { font-family:'DM Sans',sans-serif; font-size:11px; color:var(--text-dim); }
        .hero-proof strong { color:var(--blush); font-weight:600; }

        /* PHONE MOCKUP AREA */
        .phone-area { position:relative; z-index:5; display:flex; align-items:flex-end; justify-content:center; gap:20px; width:100%; max-width:920px; padding-bottom:0; }
        /* Floating feature cards left */
        .feat-cards-left { display:flex; flex-direction:column; gap:10px; padding-bottom:60px; }
        .feat-cards-right { display:flex; flex-direction:column; gap:10px; padding-bottom:60px; }
        .float-card { background:rgba(28,22,22,0.88); backdrop-filter:blur(12px); border:1px solid rgba(245,240,232,0.1); border-radius:10px; padding:10px 16px; display:flex; align-items:center; gap:10px; white-space:nowrap; }
        .float-card-icon { width:28px; height:28px; border-radius:6px; background:rgba(158,24,43,0.15); border:1px solid var(--border-wine); display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; }
        .float-card-label { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:500; color:var(--ivory); }
        .float-card.active { background:rgba(158,24,43,0.2); border-color:rgba(158,24,43,0.4); }

        /* Phone mockup */
        .phone-wrap { width:260px; flex-shrink:0; position:relative; }
        .phone-shell { width:100%; background:#0A0808; border-radius:36px; border:2px solid rgba(255,255,255,0.12); overflow:hidden; position:relative; box-shadow:0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1); }
        .phone-notch { position:absolute; top:0; left:50%; transform:translateX(-50%); width:100px; height:24px; background:#0A0808; border-radius:0 0 16px 16px; z-index:10; }
        .phone-status { display:flex; justify-content:space-between; padding:8px 18px 4px; font-family:'DM Sans',sans-serif; font-size:9px; color:rgba(255,255,255,0.6); font-weight:600; position:relative; z-index:5; }
        .phone-screen { padding:4px 12px 16px; }
        .phone-logo-row { display:flex; align-items:center; gap:6px; padding:8px 0 10px; }
        .phone-logo-icon { width:20px; height:20px; border-radius:5px; background:var(--wine); display:flex; align-items:center; justify-content:center; font-family:'Playfair Display',serif; font-weight:700; font-size:11px; color:white; }
        .phone-logo-text { font-family:'Playfair Display',serif; font-size:13px; font-weight:700; color:white; }
        .phone-question { font-family:'Playfair Display',serif; font-size:14px; color:white; margin-bottom:8px; line-height:1.3; }
        .phone-question em { font-style:italic; color:var(--blush); }
        .phone-input { background:rgba(255,255,255,0.07); border-radius:8px; padding:8px 10px; font-family:'DM Sans',sans-serif; font-size:11px; color:rgba(255,255,255,0.7); margin-bottom:8px; min-height:36px; font-weight:300; }
        .phone-btn { background:var(--wine); border-radius:8px; padding:10px; text-align:center; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; color:white; margin-bottom:10px; letter-spacing:0.06em; box-shadow:0 0 20px rgba(158,24,43,0.4); }
        .phone-timer { text-align:center; margin-bottom:10px; }
        .phone-timer-circle { width:52px; height:52px; border-radius:50%; border:2px solid var(--wine); display:flex; align-items:center; justify-content:center; margin:0 auto 4px; box-shadow:0 0 16px rgba(158,24,43,0.3); }
        .phone-timer-num { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:white; line-height:1; }
        .phone-timer-label { font-family:'DM Sans',sans-serif; font-size:7px; color:rgba(255,255,255,0.4); letter-spacing:0.14em; text-transform:uppercase; }
        .phone-result { border-radius:10px; overflow:hidden; position:relative; height:120px; }
        .phone-play { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:32px; height:32px; border-radius:50%; background:rgba(0,0,0,0.6); border:1.5px solid white; display:flex; align-items:center; justify-content:center; font-size:11px; z-index:2; }

        /* TRUST */
        .trust { background:var(--bg2); border-top:1px solid var(--border); border-bottom:1px solid var(--border); padding:14px 48px; display:flex; align-items:center; gap:36px; flex-wrap:wrap; }
        .trust-label { font-family:'DM Sans',sans-serif; font-size:9px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:rgba(245,240,232,0.18); white-space:nowrap; }
        .trust-items { display:flex; gap:32px; flex-wrap:wrap; }
        .trust-item { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:400; color:rgba(245,240,232,0.3); letter-spacing:0.04em; }

        /* MARQUEE */
        .marquee { background:var(--wine); padding:13px 0; overflow:hidden; }
        .marquee-track { display:flex; white-space:nowrap; animation:mq 26s linear infinite; }
        .marquee-item { display:inline-flex; align-items:center; gap:22px; padding:0 22px; font-family:'Playfair Display',serif; font-size:13px; font-style:italic; color:rgba(255,255,255,0.65); flex-shrink:0; }
        .marquee-dot { width:3px; height:3px; border-radius:50%; background:rgba(255,255,255,0.3); }
        @keyframes mq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* FEATURES SECTION — 6 cards with images */
        .features { background:var(--bg); padding:100px 48px; }
        .features-inner { max-width:1100px; margin:0 auto; }
        .sec-tag { font-family:'DM Sans',sans-serif; font-size:9px; font-weight:600; letter-spacing:0.24em; text-transform:uppercase; color:var(--blush); margin-bottom:16px; display:flex; align-items:center; gap:10px; }
        .sec-tag::before { content:''; width:18px; height:1px; background:var(--blush); }
        .features-h2 { font-family:'Playfair Display',serif; font-weight:900; font-size:clamp(28px,4vw,52px); line-height:1; letter-spacing:-1.5px; color:var(--ivory); margin-bottom:10px; }
        .features-h2 em { font-style:italic; color:var(--blush); }
        .features-sub { font-family:'DM Sans',sans-serif; font-size:14px; font-weight:300; color:var(--text-dim); margin-bottom:48px; }
        .feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; }
        .feat-card { background:var(--bg2); border:1px solid var(--border); border-radius:4px; overflow:hidden; transition:all 0.25s; position:relative; }
        .feat-card:hover { border-color:var(--border-wine); transform:translateY(-2px); box-shadow:0 16px 40px rgba(0,0,0,0.4); }
        .feat-card:hover::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(to right,var(--wine),transparent); }
        .feat-img { height:160px; position:relative; overflow:hidden; }
        .feat-img img { width:100%; height:100%; object-fit:cover; object-position:center top; filter:brightness(0.85); transition:filter 0.3s; }
        .feat-card:hover .feat-img img { filter:brightness(1); }
        .feat-img-overlay { position:absolute; inset:0; background:linear-gradient(to bottom, transparent 40%, var(--bg2) 100%); }
        .feat-body { padding:16px 18px 20px; }
        .feat-title { font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; color:var(--ivory); margin-bottom:6px; }
        .feat-desc { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:300; color:var(--text-dim); line-height:1.65; margin-bottom:10px; }
        .feat-preview { font-family:'DM Sans',sans-serif; font-size:11px; color:rgba(245,240,232,0.25); font-style:italic; }
        .feat-tags { display:flex; flex-wrap:wrap; gap:4px; margin-top:8px; }
        .feat-tag { background:rgba(245,240,232,0.05); border:1px solid var(--border); color:rgba(245,240,232,0.3); font-family:'DM Sans',sans-serif; font-size:9px; padding:2px 8px; border-radius:3px; }
        .feat-footer { font-family:'DM Sans',sans-serif; font-size:13px; color:var(--text-dim); text-align:center; margin-top:32px; font-style:italic; }

        /* HOW IT WORKS */
        .how { background:var(--bg2); padding:100px 48px; border-top:1px solid var(--border); }
        .how-inner { max-width:1100px; margin:0 auto; }
        .how-h2 { font-family:'Playfair Display',serif; font-weight:900; font-size:clamp(28px,4vw,52px); line-height:1; letter-spacing:-1.5px; color:var(--ivory); margin-bottom:56px; }
        .how-h2 em { font-style:italic; color:var(--blush); }
        .how-steps { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; }
        .how-step { background:var(--bg3); border:1px solid var(--border); border-radius:4px; padding:36px 28px; position:relative; transition:border-color 0.3s; }
        .how-step:hover { border-color:var(--border-wine); }
        .how-num { font-family:'Playfair Display',serif; font-size:64px; font-weight:900; color:rgba(158,24,43,0.08); line-height:1; margin-bottom:18px; letter-spacing:-3px; }
        .how-title { font-family:'DM Sans',sans-serif; font-size:16px; font-weight:600; color:var(--ivory); margin-bottom:10px; }
        .how-desc { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:300; color:var(--text-dim); line-height:1.75; margin-bottom:16px; }
        .how-items { display:flex; flex-wrap:wrap; gap:6px; }
        .how-item { background:rgba(158,24,43,0.08); border:1px solid var(--border-wine); color:var(--blush); font-family:'DM Sans',sans-serif; font-size:10px; font-weight:500; padding:3px 10px; border-radius:100px; }

        /* REALISM */
        .realism { background:var(--bg); padding:100px 48px; border-top:1px solid var(--border); }
        .realism-inner { max-width:1100px; margin:0 auto; }
        .realism-h2 { font-family:'Playfair Display',serif; font-weight:900; font-size:clamp(28px,4vw,52px); line-height:1; letter-spacing:-1.5px; color:var(--ivory); margin-bottom:14px; text-align:center; }
        .realism-h2 em { font-style:italic; color:var(--blush); }
        .realism-sub { font-family:'DM Sans',sans-serif; font-size:14px; font-weight:300; color:var(--text-dim); max-width:520px; margin:0 auto 48px; line-height:1.75; text-align:center; }
        .realism-imgs { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:32px; }
        .realism-img-box { position:relative; border-radius:6px; overflow:hidden; border:1px solid var(--border); }
        .realism-img-box:first-child { height:400px; }
        .realism-img-box:last-child { height:400px; }
        .realism-img-lbl { position:absolute; bottom:14px; left:14px; background:rgba(20,16,16,0.8); backdrop-filter:blur(6px); border:1px solid var(--border-wine); color:var(--blush); font-family:'DM Sans',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; padding:5px 10px; border-radius:2px; }
        .realism-pts { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; }
        .realism-pt { background:var(--bg2); border:1px solid var(--border); padding:22px 18px; border-top:2px solid transparent; transition:all 0.2s; }
        .realism-pt:hover { border-top-color:var(--wine); }
        .realism-pt-icon { font-size:18px; margin-bottom:10px; }
        .realism-pt-title { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; color:var(--ivory); margin-bottom:5px; }
        .realism-pt-desc { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:300; color:var(--text-dim); line-height:1.65; }

        /* DUAL CTA */
        .dual-cta { background:var(--bg2); padding:80px 48px; border-top:1px solid var(--border); }
        .dual-cta-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:center; }
        .dual-left h2 { font-family:'Playfair Display',serif; font-weight:900; font-size:clamp(28px,4vw,52px); line-height:1; letter-spacing:-1.5px; color:var(--ivory); margin-bottom:6px; }
        .dual-left h2 em { font-style:italic; color:var(--blush); }
        .dual-left-checks { display:flex; flex-direction:column; gap:10px; margin-top:24px; }
        .dual-check { display:flex; align-items:center; gap:10px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:300; color:var(--text-mid); }
        .dual-check-icon { width:18px; height:18px; border-radius:50%; background:rgba(158,24,43,0.15); border:1px solid var(--border-wine); display:flex; align-items:center; justify-content:center; font-size:9px; color:var(--blush); flex-shrink:0; }
        .dual-right { background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:36px 32px; }
        .dual-right h3 { font-family:'Playfair Display',serif; font-weight:700; font-size:22px; color:var(--ivory); margin-bottom:6px; }
        .dual-right-sub { font-family:'DM Sans',sans-serif; font-size:13px; color:var(--text-dim); margin-bottom:24px; }
        .dual-right-checks { display:flex; flex-direction:column; gap:10px; margin-bottom:28px; }
        .dual-right-check { display:flex; align-items:center; gap:10px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:300; color:var(--text-mid); }

        /* FINAL CTA */
        .cta-final { background:var(--bg); padding:100px 48px; text-align:center; position:relative; overflow:hidden; border-top:1px solid var(--border); }
        .cta-glow { position:absolute; inset:0; background:radial-gradient(ellipse 50% 40% at 50% 50%, rgba(158,24,43,0.12) 0%, transparent 65%); pointer-events:none; }
        .cta-inner { position:relative; z-index:2; max-width:580px; margin:0 auto; }
        .cta-h2 { font-family:'Playfair Display',serif; font-weight:900; font-size:clamp(36px,6vw,76px); line-height:0.95; letter-spacing:-2px; color:var(--ivory); margin-bottom:22px; }
        .cta-h2 em { font-style:italic; color:var(--blush); display:block; }
        .cta-sub { font-family:'DM Sans',sans-serif; font-size:15px; font-weight:300; color:var(--text-dim); margin-bottom:40px; line-height:1.8; }
        .cta-note { font-family:'DM Sans',sans-serif; font-size:10px; color:rgba(245,240,232,0.18); text-transform:uppercase; letter-spacing:0.1em; margin-top:18px; }

        /* FOOTER */
        .footer { background:var(--bg); border-top:1px solid var(--border); padding:32px 48px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
        .footer-logo { font-family:'DM Sans',sans-serif; font-weight:300; font-size:13px; color:var(--ivory); letter-spacing:0.2em; text-transform:uppercase; }
        .footer-logo strong { font-weight:700; }
        .footer-links { display:flex; gap:20px; }
        .footer-link { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:300; letter-spacing:0.1em; text-transform:uppercase; color:rgba(245,240,232,0.18); text-decoration:none; transition:color 0.2s; }
        .footer-link:hover { color:var(--ivory); }
        .footer-copy { font-family:'DM Sans',sans-serif; font-size:10px; color:rgba(245,240,232,0.12); }

        /* MOBILE */
        @media (max-width: 900px) {
          .nav { padding:14px 20px; }
          .nav-a { display:none; }
          .sticky-mob { display:block; }
          .hero { padding:72px 20px 0; }
          .hero-bg-imgs { grid-template-columns:1fr; }
          .hero-bg-right { display:none; }
          .phone-area { gap:8px; }
          .feat-cards-left, .feat-cards-right { display:none; }
          .phone-wrap { width:220px; }
          .features { padding:72px 20px; }
          .feat-grid { grid-template-columns:1fr; }
          .how { padding:72px 20px; }
          .how-steps { grid-template-columns:1fr; gap:2px; }
          .realism { padding:72px 20px; }
          .realism-imgs { grid-template-columns:1fr; }
          .realism-img-box:first-child, .realism-img-box:last-child { height:260px; }
          .realism-pts { grid-template-columns:1fr 1fr; }
          .dual-cta { padding:60px 20px; }
          .dual-cta-inner { grid-template-columns:1fr; }
          .cta-final { padding:72px 20px 140px; }
          .footer { flex-direction:column; align-items:flex-start; padding:28px 20px; }
          .trust { padding:14px 20px; }
        }
        @media (max-width: 480px) {
          .realism-pts { grid-template-columns:1fr; }
          .hero-ctas { flex-direction:column; align-items:center; }
        }
      `}</style>

      <HomeNav />
      <div className="sticky-mob"><a href="/generate">⚡ Generate Free — 3 Briefs, No Card</a></div>

      {/* ── HERO ── */}
      <section className="hero">
        {/* BG creator images left + right */}
        <div className="hero-bg-imgs">
          <div className="hero-bg-left">
            <Image src="/feat3.png" alt="" fill style={{objectFit:'cover',objectPosition:'center top'}} />
            <div className="hero-bg-overlay" />
          </div>
          <div className="hero-bg-right">
            <Image src="/feat1.png" alt="" fill style={{objectFit:'cover',objectPosition:'center top'}} />
            <div className="hero-bg-overlay" />
          </div>
        </div>
        <div className="hero-bg-center-grad" />
        <div className="hero-glow" />

        {/* Headline */}
        <div className="hero-text">
          <div className="hero-badge dm"><div className="hero-dot" />Your AI Content Director · 60 Seconds</div>
          <h1 className="hero-h1 pf">
            No ideas.<br />No team.<br />
            <em>No problem.</em>
          </h1>
          <p className="hero-sub dm">SuperCool creates full AI UGC ads and cinematic reels with <strong>hyper-realistic visuals</strong>, captions, keywords and hashtags — in just 60 seconds.</p>
          <div className="hero-ctas">
            <Link href="/generate" className="btn-primary dm">⚡ Start Free — 3 Briefs</Link>
            <Link href="/pricing" className="btn-ghost dm">View Pricing →</Link>
          </div>
          <p className="hero-proof dm"><strong>3 free briefs</strong> · No credit card required</p>
        </div>

        {/* Phone mockup + floating cards */}
        <div className="phone-area">
          <div className="feat-cards-left">
            {[['🎬','AI UGC Ads',false],['🎥','Cinematic Reels',true],['🖼️','Hyper-Realistic Images',false]].map(([i,l,a]) => (
              <div key={l as string} className={`float-card${a ? ' active' : ''} dm`}>
                <div className="float-card-icon">{i}</div>
                <span className="float-card-label">{l}</span>
              </div>
            ))}
          </div>

          <div className="phone-wrap">
            <div className="phone-shell">
              <div className="phone-notch" />
              <div className="phone-status dm">
                <span>9:41</span>
                <span>▲ ⊙ ▮</span>
              </div>
              <div className="phone-screen">
                <div className="phone-logo-row">
                  <div className="phone-logo-icon pf">S</div>
                  <span className="phone-logo-text pf">Supercool</span>
                </div>
                <div className="phone-question pf">What's <em>your</em> content about?</div>
                <div className="phone-input dm">Luxury skincare brand for Gen Z girls</div>
                <div className="phone-btn dm">Generate in 60s ✦</div>
                <div className="phone-timer">
                  <div className="phone-timer-circle">
                    <span className="phone-timer-num pf">60</span>
                  </div>
                  <div className="phone-timer-label dm">SECONDS</div>
                </div>
                <div className="phone-result">
                  <Image src="/feat2.png" alt="Generated content" fill style={{objectFit:'cover',objectPosition:'center top'}} />
                  <div className="phone-play">▶</div>
                </div>
              </div>
            </div>
          </div>

          <div className="feat-cards-right">
            {[['CC','Captions',false],['#','Keywords',true],['⚡','Hashtags',false]].map(([i,l,a]) => (
              <div key={l as string} className={`float-card${a ? ' active' : ''} dm`}>
                <div className="float-card-icon">{i}</div>
                <span className="float-card-label">{l}</span>
              </div>
            ))}
          </div>
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

      {/* FEATURES — 6 cards with real images */}
      <section className="features">
        <div className="features-inner">
          <div className="sec-tag dm">Everything You Need</div>
          <h2 className="features-h2 pf">Generated in <em>60 seconds.</em></h2>
          <p className="features-sub dm">Supercool gives you a full content package — ready to post.</p>
          <div className="feat-grid">
            {[
              {img:'/feat1.png',title:'AI UGC Ads',desc:'Authentic, realistic ads with believable human motion that convert.',preview:'This serum changed my skin game ✨',tags:['skincare','glow','selfcare'],likes:'15K'},
              {img:'/feat2.png',title:'Cinematic Reels',desc:'Movie-level storytelling with realistic motion and emotional direction.',preview:null,tags:['cinematic','viral','reels'],likes:null},
              {img:'/feat3.png',title:'Hyper-Realistic Images',desc:'Studio-quality visuals that look filmed, not AI-generated.',preview:null,tags:['editorial','luxury','real'],likes:null},
              {img:'/feat4.png',title:'Captions That Hook',desc:'Viral captions, hooks and call-to-actions written for your exact platform.',preview:'"The glow-up is real."',tags:['caption','hook','cta'],likes:'10K'},
              {img:'/feat5.png',title:'SEO Keywords',desc:'SEO-optimized keywords for reach, discovery and algorithm boost.',preview:null,tags:['skincare','glow','routine','radiant'],likes:null},
              {img:'/ugc-grid.png',title:'Viral Hashtags',desc:'Viral hashtag sets tailored to your niche and posting goals.',preview:null,tags:['#skincare','#glowingskin','#ugc','#fyp'],likes:null},
            ].map(f => (
              <div className="feat-card" key={f.title}>
                <div className="feat-img">
                  <Image src={f.img} alt={f.title} fill style={{objectFit:'cover',objectPosition:'center top'}} />
                  <div className="feat-img-overlay" />
                </div>
                <div className="feat-body">
                  <div className="feat-title dm">{f.title}</div>
                  <div className="feat-desc dm">{f.desc}</div>
                  {f.preview && <div className="feat-preview dm">{f.preview} {f.likes && <span style={{color:'rgba(245,240,232,0.35)',fontSize:10}}>♥ {f.likes}</span>}</div>}
                  <div className="feat-tags">
                    {f.tags.map(t => <span className="feat-tag dm" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="feat-footer dm">Like having a full creative team — in your pocket.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="how-inner">
          <div className="sec-tag dm">How SuperCool Works</div>
          <h2 className="how-h2 pf">3 steps.<br /><em>Full campaign.</em></h2>
          <div className="how-steps">
            {[
              {n:'01',t:'Enter Your Idea',d:'Type your product, niche, or simple concept. Takes 10 seconds.',items:['Your product','Your niche','Any concept']},
              {n:'02',t:'SuperCool Creates Everything',d:'In 60 seconds, we generate your complete content package.',items:['AI UGC Ads','Cinematic Reels','Captions','Keywords','Hashtags','Images']},
              {n:'03',t:'Download & Post',d:'Copy prompts into Seedance, Kling, Runway or Midjourney. Post and grow.',items:['Seedance','Kling','Runway','Midjourney']},
            ].map(s => (
              <div className="how-step" key={s.n}>
                <div className="how-num pf">{s.n}</div>
                <div className="how-title dm">{s.t}</div>
                <div className="how-desc dm">{s.d}</div>
                <div className="how-items">
                  {s.items.map(i => <span className="how-item dm" key={i}>{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REALISM */}
      <section className="realism">
        <div className="realism-inner">
          <div className="sec-tag dm" style={{justifyContent:'center'}}>Human Realism Engine™</div>
          <h2 className="realism-h2 pf">We don't sell prompts.<br /><em>We sell realism.</em></h2>
          <p className="realism-sub dm">Every brief is engineered for biological realism — the same detail that makes content feel filmed, not generated.</p>
          <div className="realism-imgs">
            <div className="realism-img-box">
              <Image src="/realism-eye.png" alt="Eye realism" fill style={{objectFit:'cover'}} />
              <div className="realism-img-lbl dm">Ocular Realism System</div>
            </div>
            <div className="realism-img-box">
              <Image src="/realism-skin.png" alt="Skin realism" fill style={{objectFit:'cover'}} />
              <div className="realism-img-lbl dm">Skin Truth System</div>
            </div>
          </div>
          <div className="realism-pts">
            {[
              {i:'👁️',t:'Eye Behaviour',d:'Saccadic movement, lid weight. Eyes that actually see.'},
              {i:'🧬',t:'Skin Truth',d:'Pore depth, subsurface scattering, oil variation.'},
              {i:'⏱️',t:'Behavioural Delay',d:'Real humans hesitate. Timing imperfection is authenticity.'},
              {i:'🎭',t:'Micro-Expressions',d:'Jaw tension, nostril flare. Before emotion lands.'},
              {i:'🫁',t:'Breathing',d:'Chest rise, clavicle shift. The character breathes.'},
              {i:'🤝',t:'Asymmetric Motion',d:'Real humans don\'t move symmetrically.'},
              {i:'👗',t:'Fabric Physics',d:'Clothing moves with the body. Real material.'},
              {i:'🎬',t:'GTA-Style Realism',d:'Procedural NPC-level movement for AI creators.'},
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

      {/* DUAL CTA — "Create. Post. Grow." */}
      <section className="dual-cta">
        <div className="dual-cta-inner">
          <div className="dual-left">
            <h2 className="pf">Create. Post. Grow.<br /><em>All in 60 Seconds.</em></h2>
            <div className="dual-left-checks">
              {['Full AI content creation','No editing skills needed','No brainstorming','No expensive tools','Cancel anytime'].map(c => (
                <div className="dual-check dm" key={c}><div className="dual-check-icon">✓</div>{c}</div>
              ))}
            </div>
          </div>
          <div className="dual-right">
            <h3 className="pf">Start Your Free Briefs</h3>
            <p className="dual-right-sub dm">Try SuperCool free — 3 briefs on us.</p>
            <div className="dual-right-checks">
              {['Full access to all features','Generate complete campaigns','No credit card required'].map(c => (
                <div className="dual-right-check dm" key={c}><div className="dual-check-icon">✓</div>{c}</div>
              ))}
            </div>
            <Link href="/generate" className="btn-primary dm" style={{width:'100%',textAlign:'center',display:'block'}}>⚡ Start Free — 3 Briefs →</Link>
            <p style={{marginTop:14,fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'rgba(245,240,232,0.25)',textAlign:'center'}}>No credit card · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-final">
        <div className="cta-glow" />
        <div className="cta-inner">
          <h2 className="cta-h2 pf">Stop creating.<br /><em>Start directing.</em></h2>
          <p className="cta-sub dm">3 free briefs. No credit card. No setup.<br />Just your idea — and 60 seconds.</p>
          <Link href="/generate" className="btn-primary dm">⚡ Generate Free Now</Link>
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
