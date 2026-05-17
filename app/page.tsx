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
          --bg:#141010; --bg2:#1C1616; --bg3:#231A1A;
          --wine:#9E182B; --wine-glow:rgba(158,24,43,0.2);
          --blush:#F2AFBC; --rose:#F9CBD6;
          --ivory:#F5F0E8; --gold:#D4AF87;
          --border:rgba(245,240,232,0.07);
          --border-wine:rgba(158,24,43,0.25);
          --text-dim:rgba(245,240,232,0.42);
          --text-mid:rgba(245,240,232,0.65);
        }
        html { scroll-behavior:smooth; }
        .pf { font-family:'Playfair Display',Georgia,serif; }
        .dm { font-family:'DM Sans',sans-serif; }

        /* NAV */
        .nav { position:fixed; top:0; left:0; right:0; z-index:1000; display:flex; justify-content:space-between; align-items:center; padding:16px 48px; background:rgba(20,16,16,0.92); backdrop-filter:blur(16px); border-bottom:1px solid var(--border); }
        .logo { font-family:'DM Sans',sans-serif; font-weight:300; font-size:14px; color:var(--ivory); letter-spacing:0.22em; text-transform:uppercase; text-decoration:none; }
        .logo strong { font-weight:700; }
        .nav-links { display:flex; gap:28px; align-items:center; }
        .nav-a { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:400; letter-spacing:0.12em; text-transform:uppercase; color:var(--text-dim); text-decoration:none; transition:color 0.2s; }
        .nav-a:hover { color:var(--ivory); }
        .nav-cta { background:var(--wine); color:white; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; padding:10px 22px; border-radius:3px; text-decoration:none; }

        /* STICKY MOBILE */
        .sticky-mob { display:none; position:fixed; bottom:20px; left:20px; right:20px; z-index:999; }
        .sticky-mob a { display:block; text-align:center; background:var(--wine); color:white; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:16px; border-radius:3px; text-decoration:none; box-shadow:0 8px 32px rgba(158,24,43,0.5); }

        /* ── HERO — HALF SPLIT ── */
        .hero { min-height:100svh; display:grid; grid-template-columns:1fr 1fr; padding-top:64px; background:var(--bg); position:relative; overflow:hidden; isolation:isolate; }
        .hero-left { display:flex; flex-direction:column; justify-content:center; padding:80px 56px 80px 56px; position:relative; z-index:2; }
        .hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(158,24,43,0.12); border:1px solid var(--border-wine); color:var(--blush); font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; padding:5px 14px; border-radius:100px; margin-bottom:24px; width:fit-content; }
        .hero-dot { width:5px; height:5px; border-radius:50%; background:var(--blush); animation:pulse 2s ease-in-out infinite; }
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .hero-h1 { font-family:'Playfair Display',serif; font-weight:900; font-size:clamp(44px,5.5vw,76px); line-height:1; letter-spacing:-2px; color:var(--ivory); margin-bottom:6px; }
        .hero-h1 em { font-style:italic; color:var(--wine); display:block; }
        .hero-sub { font-family:'DM Sans',sans-serif; font-size:15px; font-weight:300; line-height:1.75; color:var(--text-dim); max-width:400px; margin:20px 0 32px; }
        .hero-sub strong { color:var(--ivory); font-weight:500; }
        .hero-ctas { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:36px; }
        .btn-primary { background:var(--wine); color:white; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:15px 32px; border-radius:3px; text-decoration:none; box-shadow:0 4px 24px var(--wine-glow); transition:all 0.2s; display:inline-block; }
        .btn-primary:hover { background:#7a1221; transform:translateY(-1px); }
        .btn-ghost { border:1px solid var(--border); color:var(--text-dim); font-family:'DM Sans',sans-serif; font-size:12px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; padding:15px 28px; border-radius:3px; text-decoration:none; transition:all 0.2s; display:inline-block; }
        .btn-ghost:hover { border-color:rgba(245,240,232,0.25); color:var(--ivory); }
        .hero-proof { font-family:'DM Sans',sans-serif; font-size:11px; color:var(--text-dim); margin-bottom:40px; }
        .hero-proof strong { color:var(--blush); font-weight:600; }

        /* Feature stacks */
        .hero-stacks { display:flex; flex-direction:column; gap:8px; }
        .hero-stack-row { display:flex; align-items:center; gap:10px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:400; color:var(--text-mid); }
        .hero-stack-dot { width:6px; height:6px; border-radius:50%; background:var(--wine); flex-shrink:0; }

        /* Hero right image */
        .hero-right { position:relative; overflow:hidden; }
        .hero-right-grad { position:absolute; inset:0; background:linear-gradient(to right, var(--bg) 0%, transparent 15%); z-index:2; pointer-events:none; }
        .hero-right-bottom { position:absolute; bottom:0; left:0; right:0; height:120px; background:linear-gradient(to top, var(--bg) 0%, transparent 100%); z-index:2; pointer-events:none; }
        .hero-badge-float { position:absolute; bottom:36px; left:36px; z-index:3; background:rgba(20,16,16,0.82); backdrop-filter:blur(8px); border:1px solid var(--border-wine); color:var(--ivory); font-family:'DM Sans',sans-serif; font-size:12px; font-weight:500; padding:10px 16px; border-radius:4px; border-left:3px solid var(--wine); }
        .hero-badge-float strong { display:block; font-size:15px; font-weight:700; color:var(--gold); }

        /* TRUST */
        .trust { background:var(--bg2); border-top:1px solid var(--border); border-bottom:1px solid var(--border); padding:14px 48px; display:flex; align-items:center; gap:36px; flex-wrap:wrap; }
        .trust-label { font-family:'DM Sans',sans-serif; font-size:9px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:rgba(245,240,232,0.18); white-space:nowrap; }
        .trust-items { display:flex; gap:32px; flex-wrap:wrap; }
        .trust-item { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:400; color:rgba(245,240,232,0.3); }

        /* MARQUEE */
        .marquee { background:var(--wine); padding:13px 0; overflow:hidden; }
        .marquee-track { display:flex; white-space:nowrap; animation:mq 26s linear infinite; }
        .marquee-item { display:inline-flex; align-items:center; gap:22px; padding:0 22px; font-family:'Playfair Display',serif; font-size:13px; font-style:italic; color:rgba(255,255,255,0.65); flex-shrink:0; }
        .marquee-dot { width:3px; height:3px; border-radius:50%; background:rgba(255,255,255,0.3); }
        @keyframes mq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

        /* FEATURES — 6 cards with correct images */
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
        .feat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(to right,var(--wine),transparent); opacity:0; transition:opacity 0.3s; z-index:1; }
        .feat-card:hover::before { opacity:1; }
        .feat-img { height:180px; position:relative; overflow:hidden; }
        .feat-img img { width:100%; height:100%; object-fit:cover; object-position:center 20%; transition:transform 0.4s; }
        .feat-card:hover .feat-img img { transform:scale(1.03); }
        .feat-img-overlay { position:absolute; inset:0; background:linear-gradient(to bottom, transparent 50%, rgba(28,22,22,0.95) 100%); }
        .feat-body { padding:18px 20px 22px; }
        .feat-title { font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700; color:var(--ivory); margin-bottom:7px; }
        .feat-desc { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:300; color:var(--text-dim); line-height:1.65; margin-bottom:12px; }
        .feat-tags { display:flex; flex-wrap:wrap; gap:4px; }
        .feat-tag { background:rgba(245,240,232,0.05); border:1px solid var(--border); color:rgba(245,240,232,0.28); font-family:'DM Sans',sans-serif; font-size:9px; padding:2px 8px; border-radius:3px; }
        .feat-tag.wine { background:rgba(158,24,43,0.08); border-color:var(--border-wine); color:var(--blush); }
        .feat-footer { font-family:'DM Sans',sans-serif; font-size:13px; color:var(--text-dim); text-align:center; margin-top:32px; font-style:italic; }

        /* HOW IT WORKS */
        .how { background:var(--bg2); padding:100px 48px; border-top:1px solid var(--border); }
        .how-inner { max-width:1100px; margin:0 auto; }
        .how-h2 { font-family:'Playfair Display',serif; font-weight:900; font-size:clamp(28px,4vw,52px); line-height:1; letter-spacing:-1.5px; color:var(--ivory); margin-bottom:56px; }
        .how-h2 em { font-style:italic; color:var(--blush); }
        .how-steps { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; }
        .how-step { background:var(--bg3); border:1px solid var(--border); border-radius:4px; padding:36px 28px; position:relative; transition:border-color 0.3s; }
        .how-step:hover { border-color:var(--border-wine); }
        .how-step-num { display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:50%; background:rgba(158,24,43,0.12); border:1px solid var(--border-wine); font-family:'DM Sans',sans-serif; font-size:14px; font-weight:700; color:var(--blush); margin-bottom:20px; }
        .how-title { font-family:'DM Sans',sans-serif; font-size:17px; font-weight:700; color:var(--ivory); margin-bottom:10px; }
        .how-desc { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:300; color:var(--text-dim); line-height:1.75; margin-bottom:18px; }
        .how-items { display:flex; flex-wrap:wrap; gap:6px; }
        .how-item { background:rgba(158,24,43,0.08); border:1px solid var(--border-wine); color:var(--blush); font-family:'DM Sans',sans-serif; font-size:10px; font-weight:500; padding:3px 10px; border-radius:100px; }

        /* REALISM — images only, no salesy headline */
        .realism { background:var(--bg); padding:100px 48px; border-top:1px solid var(--border); }
        .realism-inner { max-width:1100px; margin:0 auto; }
        .realism-header { text-align:center; margin-bottom:48px; }
        .realism-h2 { font-family:'Playfair Display',serif; font-weight:900; font-size:clamp(28px,4vw,52px); line-height:1; letter-spacing:-1.5px; color:var(--ivory); margin-bottom:14px; }
        .realism-h2 em { font-style:italic; color:var(--blush); }
        .realism-sub { font-family:'DM Sans',sans-serif; font-size:14px; font-weight:300; color:var(--text-dim); max-width:520px; margin:0 auto; line-height:1.75; }
        .realism-imgs { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:32px; }
        .realism-img-box { position:relative; border-radius:6px; overflow:hidden; border:1px solid var(--border); }
        .realism-img-box:first-child,.realism-img-box:last-child { height:420px; }
        .realism-img-lbl { position:absolute; bottom:14px; left:14px; background:rgba(20,16,16,0.8); backdrop-filter:blur(6px); border:1px solid var(--border-wine); color:var(--blush); font-family:'DM Sans',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; padding:5px 10px; border-radius:2px; }
        .realism-pts { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; }
        .realism-pt { background:var(--bg2); border:1px solid var(--border); padding:22px 18px; border-top:2px solid transparent; transition:all 0.2s; }
        .realism-pt:hover { border-top-color:var(--wine); }
        .realism-pt-icon { font-size:18px; margin-bottom:10px; }
        .realism-pt-title { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; color:var(--ivory); margin-bottom:5px; }
        .realism-pt-desc { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:300; color:var(--text-dim); line-height:1.65; }

        /* FINAL CTA — one only */
        .cta-final { background:var(--bg2); padding:100px 48px; border-top:1px solid var(--border); }
        .cta-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
        .cta-left h2 { font-family:'Playfair Display',serif; font-weight:900; font-size:clamp(28px,4vw,52px); line-height:1; letter-spacing:-1.5px; color:var(--ivory); margin-bottom:8px; }
        .cta-left h2 em { font-style:italic; color:var(--blush); }
        .cta-checks { display:flex; flex-direction:column; gap:10px; margin-top:28px; }
        .cta-check { display:flex; align-items:center; gap:10px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:300; color:var(--text-mid); }
        .cta-check-icon { width:18px; height:18px; border-radius:50%; background:rgba(158,24,43,0.15); border:1px solid var(--border-wine); display:flex; align-items:center; justify-content:center; font-size:9px; color:var(--blush); flex-shrink:0; }
        .cta-right { background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:40px 36px; }
        .cta-right h3 { font-family:'Playfair Display',serif; font-weight:700; font-size:24px; color:var(--ivory); margin-bottom:6px; }
        .cta-right-sub { font-family:'DM Sans',sans-serif; font-size:13px; color:var(--text-dim); margin-bottom:24px; }
        .cta-right-checks { display:flex; flex-direction:column; gap:10px; margin-bottom:28px; }
        .cta-note { font-family:'DM Sans',sans-serif; font-size:11px; color:rgba(245,240,232,0.2); text-align:center; margin-top:14px; }

        /* FOOTER */
        .footer { background:var(--bg); border-top:1px solid var(--border); padding:32px 48px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
        .footer-logo { font-family:'DM Sans',sans-serif; font-weight:300; font-size:13px; color:var(--ivory); letter-spacing:0.2em; text-transform:uppercase; }
        .footer-logo strong { font-weight:700; }
        .footer-links { display:flex; gap:20px; }
        .footer-link { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:300; letter-spacing:0.1em; text-transform:uppercase; color:rgba(245,240,232,0.18); text-decoration:none; transition:color 0.2s; }
        .footer-link:hover { color:var(--ivory); }
        .footer-copy { font-family:'DM Sans',sans-serif; font-size:10px; color:rgba(245,240,232,0.12); }

        /* MOBILE */
        @media (max-width:900px) {
          .nav { padding:14px 20px; }
          .nav-a { display:none; }
          .sticky-mob { display:block; }
          .hero { grid-template-columns:1fr; padding-top:64px; min-height:auto; }
          .hero-left { padding:60px 20px 40px; }
          .hero-right { height:380px; }
          .hero-right-grad { background:linear-gradient(to bottom, var(--bg) 0%, transparent 20%); }
          .hero-h1 { letter-spacing:-1.5px; }
          .hero-ctas { flex-direction:column; }
          .btn-primary,.btn-ghost { text-align:center; }
          .trust { padding:14px 20px; }
          .features { padding:72px 20px; }
          .feat-grid { grid-template-columns:1fr; }
          .how { padding:72px 20px; }
          .how-steps { grid-template-columns:1fr; gap:2px; }
          .realism { padding:72px 20px; }
          .realism-imgs { grid-template-columns:1fr; }
          .realism-img-box:first-child,.realism-img-box:last-child { height:260px; }
          .realism-pts { grid-template-columns:1fr 1fr; }
          .cta-final { padding:64px 20px 140px; }
          .cta-inner { grid-template-columns:1fr; gap:36px; }
          .footer { flex-direction:column; align-items:flex-start; padding:28px 20px; }
        }
        @media (max-width:480px) {
          .realism-pts { grid-template-columns:1fr; }
        }
      `}</style>

      <HomeNav />
      <div className="sticky-mob"><a href="/generate">⚡ Generate Free — 3 Briefs, No Card</a></div>

      {/* ── HERO — HALF SPLIT (no phone) ── */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-badge dm"><div className="hero-dot" />Your AI Content Director · 60s</div>
          <h1 className="hero-h1 pf">
            No ideas.<br />No team.<br />
            <em>No problem.</em>
          </h1>
          <p className="hero-sub dm">
            SuperCool creates full AI UGC ads and cinematic reels with <strong>hyper-realistic visuals</strong>, captions, keywords and hashtags — in just 60 seconds.
          </p>
          <div className="hero-ctas">
            <Link href="/generate" className="btn-primary dm">⚡ Start Free — 3 Briefs</Link>
            <Link href="/pricing" className="btn-ghost dm">View Pricing →</Link>
          </div>
          <p className="hero-proof dm"><strong>3 free briefs</strong> · No credit card required</p>
          <div className="hero-stacks">
            {[
              '🎬  AI UGC Ads that convert',
              '🎥  Cinematic Reels with real human motion',
              '🖼️  Hyper-realistic images',
              '✍️  Captions, Keywords & Hashtags',
              '⚡  All generated in 60 seconds',
            ].map(s => (
              <div className="hero-stack-row dm" key={s}>
                <div className="hero-stack-dot" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <Image src="/hero.png" alt="AI Creator Content" fill style={{objectFit:'cover',objectPosition:'center top'}} priority />
          <div className="hero-right-grad" />
          <div className="hero-right-bottom" />
          <div className="hero-badge-float dm">
            <strong>Campaign Ready</strong>
            in 60 seconds
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

      {/* ── FEATURES — correct images per card ── */}
      <section className="features">
        <div className="features-inner">
          <div className="sec-tag dm">Everything You Need</div>
          <h2 className="features-h2 pf">Generated in <em>60 seconds.</em></h2>
          <p className="features-sub dm">Supercool gives you a full content package — ready to post.</p>
          <div className="feat-grid">
            {[
              {
                img:'/ugc-grid.png', pos:'center center',
                title:'AI UGC Ads',
                desc:'Authentic, realistic ads with believable human motion that actually convert.',
                tags:[{t:'AI UGC',w:true},{t:'Ads',w:false},{t:'Converts',w:false}],
                preview:'"This serum changed my skin game ✨"',
              },
              {
                img:'/feat2.png', pos:'center top',
                title:'Cinematic Reels',
                desc:'Movie-level storytelling with realistic motion and emotional camera direction.',
                tags:[{t:'Cinematic',w:true},{t:'Reels',w:false},{t:'Motion',w:false}],
                preview:null,
              },
              {
                img:'/realism-eye.png', pos:'center center',
                title:'Hyper-Realistic Images',
                desc:'Studio-quality visuals that look filmed, not AI-generated. Skin truth. Real light.',
                tags:[{t:'Editorial',w:false},{t:'Luxury',w:false},{t:'Real Skin',w:true}],
                preview:null,
              },
              {
                img:'/feat3.png', pos:'center top',
                title:'Captions That Hook',
                desc:'Viral captions, hooks and CTAs written for your exact platform and audience.',
                tags:[{t:'Caption',w:true},{t:'Hook',w:false},{t:'CTA',w:false}],
                preview:'"The glow-up is real." ♥ 10K',
              },
              {
                img:'/feat5.png', pos:'center top',
                title:'SEO Keywords',
                desc:'SEO-optimized keywords for reach, discovery and algorithm boost.',
                tags:[{t:'skincare',w:false},{t:'glow',w:false},{t:'routine',w:false},{t:'radiant',w:false}],
                preview:null,
              },
              {
                img:'/feat1.png', pos:'center top',
                title:'Viral Hashtags',
                desc:'Viral hashtag sets tailored to your niche and posting goals.',
                tags:[{t:'#skincare',w:true},{t:'#glowingskin',w:false},{t:'#ugc',w:false},{t:'#fyp',w:false}],
                preview:null,
              },
            ].map(f => (
              <div className="feat-card" key={f.title}>
                <div className="feat-img">
                  <Image src={f.img} alt={f.title} fill style={{objectFit:'cover',objectPosition:f.pos}} />
                  <div className="feat-img-overlay" />
                </div>
                <div className="feat-body">
                  <div className="feat-title dm">{f.title}</div>
                  <div className="feat-desc dm">{f.desc}</div>
                  {f.preview && <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'rgba(245,240,232,0.3)',fontStyle:'italic',marginBottom:10}}>{f.preview}</div>}
                  <div className="feat-tags">
                    {f.tags.map(tag => <span className={`feat-tag dm${tag.w?' wine':''}`} key={tag.t}>{tag.t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="feat-footer dm">Like having a full creative team — in your pocket.</p>
        </div>
      </section>

      {/* HOW IT WORKS — readable numbered circles */}
      <section className="how">
        <div className="how-inner">
          <div className="sec-tag dm">How SuperCool Works</div>
          <h2 className="how-h2 pf">3 steps.<br /><em>Full campaign.</em></h2>
          <div className="how-steps">
            {[
              {n:'1',t:'Enter Your Idea',d:'Type your product, niche, or simple concept. Takes 10 seconds.',items:['Your product','Your niche','Any concept']},
              {n:'2',t:'SuperCool Creates Everything',d:'In 60 seconds, we generate your complete content package — ready to paste into any tool.',items:['AI UGC Ads','Cinematic Reels','Captions','Keywords','Hashtags','Images']},
              {n:'3',t:'Copy, Export & Post',d:'Paste prompts into Seedance, Kling, Runway or Midjourney. Generate your content. Post and grow.',items:['Seedance','Kling','Runway','Midjourney']},
            ].map(s => (
              <div className="how-step" key={s.n}>
                <div className="how-step-num dm">{s.n}</div>
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

      {/* REALISM — images with simple headline, no "sell" language */}
      <section className="realism">
        <div className="realism-inner">
          <div className="realism-header">
            <div className="sec-tag dm" style={{justifyContent:'center'}}>Human Realism Engine™</div>
            <h2 className="realism-h2 pf">Built for<br /><em>biological realism.</em></h2>
            <p className="realism-sub dm">Every brief is engineered so your AI content feels filmed — not generated. Real skin. Real motion. Real emotion.</p>
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

      {/* ── SINGLE CTA — "Create. Post. Grow." ── */}
      <section className="cta-final">
        <div className="cta-inner">
          <div className="cta-left">
            <h2 className="pf">Create. Post. Grow.<br /><em>All in 60 Seconds.</em></h2>
            <div className="cta-checks">
              {['Full AI content creation','No editing skills needed','No brainstorming','No expensive tools','Cancel anytime'].map(c => (
                <div className="cta-check dm" key={c}><div className="cta-check-icon">✓</div>{c}</div>
              ))}
            </div>
          </div>
          <div className="cta-right">
            <h3 className="pf">Start Your Free Briefs</h3>
            <p className="cta-right-sub dm">Try SuperCool free — 3 briefs on us.</p>
            <div className="cta-right-checks">
              {['Full access to all features','Generate complete campaigns','No credit card required'].map(c => (
                <div className="cta-check dm" key={c}><div className="cta-check-icon">✓</div>{c}</div>
              ))}
            </div>
            <Link href="/generate" className="btn-primary dm" style={{width:'100%',textAlign:'center',display:'block'}}>⚡ Start Free — 3 Briefs →</Link>
            <p className="cta-note dm">No credit card · Cancel anytime</p>
          </div>
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
