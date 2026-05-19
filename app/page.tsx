import Link from "next/link";
import Image from "next/image";
import HomeNav from "./components/HomeNav";

export default function Home() {
  return (
    <div style={{ background: '#0F0B0C', color: '#F5F0E8', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --bg:#0F0B0C; --bg2:#181214; --bg3:#221A1C;
          --wine:#9E182B; --wine-dim:rgba(158,24,43,0.18);
          --blush:#F2AFBC; --rose:#F9CBD6; --oat:#F2E0D2;
          --ivory:#F5F0E8; --gold:#D4AF87;
          --border:rgba(245,240,232,0.07);
          --border-wine:rgba(158,24,43,0.22);
          --dim:rgba(245,240,232,0.42);
          --mid:rgba(245,240,232,0.68);
        }
        html{scroll-behavior:smooth}
        .pf{font-family:'Playfair Display',Georgia,serif}
        .dm{font-family:'DM Sans',sans-serif}

        /* NAV */
        .nav{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;justify-content:space-between;align-items:center;padding:16px 52px;background:rgba(15,11,12,0.94);backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
        .logo{font-family:'DM Sans',sans-serif;font-weight:300;font-size:14px;color:var(--ivory);letter-spacing:0.22em;text-transform:uppercase;text-decoration:none}
        .logo strong{font-weight:700}
        .nav-links{display:flex;gap:28px;align-items:center}
        .nav-a{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:400;letter-spacing:0.12em;text-transform:uppercase;color:var(--dim);text-decoration:none;transition:color 0.2s}
        .nav-a:hover{color:var(--ivory)}
        .nav-cta{background:var(--wine);color:white;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:10px 22px;border-radius:3px;text-decoration:none;box-shadow:0 0 20px rgba(158,24,43,0.25)}

        /* STICKY MOBILE */
        .sticky-mob{display:none;position:fixed;bottom:20px;left:20px;right:20px;z-index:999}
        .sticky-mob a{display:block;text-align:center;background:var(--wine);color:white;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:16px;border-radius:3px;text-decoration:none;box-shadow:0 8px 32px rgba(158,24,43,0.5)}

        /* HERO */
        .hero{min-height:100svh;display:grid;grid-template-columns:1fr 1fr;padding-top:64px;background:var(--bg);overflow:hidden;isolation:isolate}
        .hero-left{display:flex;flex-direction:column;justify-content:center;padding:80px 56px 80px 52px;position:relative;z-index:2}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(158,24,43,0.1);border:1px solid var(--border-wine);color:var(--blush);font-family:'DM Sans',sans-serif;font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;padding:5px 14px;border-radius:100px;margin-bottom:24px;width:fit-content}
        .badge-dot{width:5px;height:5px;border-radius:50%;background:var(--blush);animation:pulse 2s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .hero-h1{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(40px,5vw,72px);line-height:0.97;letter-spacing:-2px;color:var(--ivory);margin-bottom:8px}
        .hero-h1 em{font-style:italic;color:var(--wine);display:block}
        .hero-sub{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:300;line-height:1.75;color:var(--dim);max-width:400px;margin:18px 0 30px}
        .hero-sub strong{color:var(--ivory);font-weight:500}
        .hero-ctas{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px}
        .btn-wine{background:var(--wine);color:white;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:14px 30px;border-radius:3px;text-decoration:none;box-shadow:0 4px 20px rgba(158,24,43,0.3);transition:all 0.2s;display:inline-block}
        .btn-wine:hover{background:#7a1221;transform:translateY(-1px)}
        .btn-ghost{border:1px solid var(--border);color:var(--dim);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;padding:14px 26px;border-radius:3px;text-decoration:none;transition:all 0.2s;display:inline-block}
        .btn-ghost:hover{border-color:rgba(245,240,232,0.25);color:var(--ivory)}
        .hero-proof{font-family:'DM Sans',sans-serif;font-size:11px;color:var(--dim);margin-bottom:36px}
        .hero-proof strong{color:var(--blush);font-weight:600}
        .hero-stacks{display:flex;flex-direction:column;gap:8px}
        .hero-stack-row{display:flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:400;color:var(--mid)}
        .hero-stack-dot{width:5px;height:5px;border-radius:50%;background:var(--wine);flex-shrink:0}

        /* HERO RIGHT — INTELLIGENCE DASHBOARD */
        .hero-right{position:relative;display:flex;align-items:center;justify-content:center;padding:90px 32px 60px 24px;overflow:hidden}
        .hero-right::before{content:'';position:absolute;top:-100px;right:-100px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(158,24,43,0.12) 0%,transparent 65%);pointer-events:none}
        .dashboard{width:100%;max-width:460px;display:flex;flex-direction:column;gap:8px;position:relative;z-index:2}
        .dash-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
        .dash-card{background:rgba(30,22,24,0.9);border:1px solid rgba(245,240,232,0.08);border-radius:10px;padding:14px 16px;backdrop-filter:blur(8px)}
        .dash-card.wine-border{border-color:rgba(158,24,43,0.35)}
        .dash-card.full{grid-column:1/-1}
        .dash-label{font-family:'DM Sans',sans-serif;font-size:8px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(212,175,135,0.6);margin-bottom:8px;display:flex;align-items:center;gap:6px}
        .dash-dot{width:4px;height:4px;border-radius:50%;background:var(--blush)}
        .dash-dot-green{width:4px;height:4px;border-radius:50%;background:#4ADE80}
        .dash-value{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--ivory);line-height:1;margin-bottom:4px}
        .dash-sub{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:300;color:var(--dim);line-height:1.5}
        .dash-sub em{color:var(--blush);font-style:normal;font-weight:500}
        .trend-bars{display:flex;gap:3px;align-items:flex-end;height:28px;margin-top:6px}
        .trend-bar{border-radius:2px 2px 0 0;flex:1;background:rgba(158,24,43,0.3);transition:height 0.3s}
        .trend-bar.hi{background:var(--wine)}
        .hook-line{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:400;color:var(--mid);line-height:1.6;padding:6px 10px;background:rgba(245,240,232,0.04);border-radius:5px;margin-bottom:4px;border-left:2px solid transparent}
        .hook-line.active{border-left-color:var(--wine);color:var(--ivory);background:rgba(158,24,43,0.08)}
        .prompt-text{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:300;color:var(--dim);line-height:1.7;font-style:italic}
        .prompt-text strong{color:var(--blush);font-style:normal;font-weight:600}
        .score-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px}
        .score-label{font-family:'DM Sans',sans-serif;font-size:10px;color:var(--dim)}
        .score-bar-wrap{flex:1;height:3px;background:rgba(245,240,232,0.08);border-radius:2px;margin:0 8px}
        .score-fill{height:100%;border-radius:2px;background:linear-gradient(to right,var(--wine),var(--blush))}
        .score-num{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:600;color:var(--blush);width:24px;text-align:right}
        .live-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.2);color:#4ADE80;font-family:'DM Sans',sans-serif;font-size:8px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:2px 8px;border-radius:100px}
        .live-dot{width:4px;height:4px;border-radius:50%;background:#4ADE80;animation:pulse 1.5s ease-in-out infinite}

        /* TRUST */
        .trust{background:var(--bg2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:14px 52px;display:flex;align-items:center;gap:36px;flex-wrap:wrap}
        .trust-label{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:rgba(245,240,232,0.18);white-space:nowrap}
        .trust-items{display:flex;gap:32px;flex-wrap:wrap}
        .trust-item{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:400;color:rgba(245,240,232,0.28);letter-spacing:0.04em}

        /* MARQUEE */
        .marquee{background:var(--wine);padding:13px 0;overflow:hidden}
        .marquee-track{display:flex;white-space:nowrap;animation:mq 26s linear infinite}
        .marquee-item{display:inline-flex;align-items:center;gap:22px;padding:0 22px;font-family:'Playfair Display',serif;font-size:13px;font-style:italic;color:rgba(255,255,255,0.65);flex-shrink:0}
        .marquee-dot{width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,0.3)}
        @keyframes mq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

        /* HOW IT WORKS */
        .how{background:var(--bg);padding:100px 52px;border-top:1px solid var(--border)}
        .how-inner{max-width:1100px;margin:0 auto}
        .sec-tag{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:var(--blush);margin-bottom:14px;display:flex;align-items:center;gap:10px}
        .sec-tag::before{content:'';width:18px;height:1px;background:var(--blush)}
        .sec-h2{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(28px,4vw,52px);line-height:1;letter-spacing:-1.5px;color:var(--ivory);margin-bottom:48px}
        .sec-h2 em{font-style:italic;color:var(--blush)}
        .how-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
        .how-step{background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:36px 28px;transition:border-color 0.3s}
        .how-step:hover{border-color:var(--border-wine)}
        .how-num{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(158,24,43,0.1);border:1px solid var(--border-wine);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:var(--blush);margin-bottom:18px}
        .how-title{font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;color:var(--ivory);margin-bottom:10px}
        .how-desc{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:300;color:var(--dim);line-height:1.75;margin-bottom:16px}
        .how-chips{display:flex;flex-wrap:wrap;gap:5px}
        .how-chip{background:rgba(158,24,43,0.08);border:1px solid var(--border-wine);color:var(--blush);font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;padding:3px 9px;border-radius:100px}

        /* FEATURES */
        .feats{background:var(--bg2);padding:100px 52px;border-top:1px solid var(--border)}
        .feats-inner{max-width:1100px;margin:0 auto}
        .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:0}
        .feat-card{background:var(--bg3);border:1px solid var(--border);border-radius:4px;overflow:hidden;transition:all 0.25s;position:relative}
        .feat-card:hover{border-color:var(--border-wine);transform:translateY(-2px);box-shadow:0 16px 40px rgba(0,0,0,0.4)}
        .feat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,var(--wine),transparent);opacity:0;transition:opacity 0.3s}
        .feat-card:hover::before{opacity:1}
        .feat-img{height:160px;position:relative;overflow:hidden}
        .feat-img img{width:100%;height:100%;object-fit:cover;object-position:center 25%;transition:transform 0.4s}
        .feat-card:hover .feat-img img{transform:scale(1.04)}
        .feat-img-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(34,26,28,0.97) 100%)}
        .feat-body{padding:16px 18px 20px}
        .feat-title{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;color:var(--ivory);margin-bottom:6px}
        .feat-desc{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:300;color:var(--dim);line-height:1.65;margin-bottom:10px}
        .feat-tags{display:flex;flex-wrap:wrap;gap:4px}
        .feat-tag{background:rgba(245,240,232,0.04);border:1px solid var(--border);color:rgba(245,240,232,0.25);font-family:'DM Sans',sans-serif;font-size:9px;padding:2px 7px;border-radius:3px}
        .feat-tag.w{background:rgba(158,24,43,0.08);border-color:var(--border-wine);color:var(--blush)}
        .feat-footer{font-family:'DM Sans',sans-serif;font-size:13px;color:var(--dim);text-align:center;margin-top:28px;font-style:italic}

        /* PILLARS STRIP */
        .pillars-strip{display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin-top:40px;border:1px solid var(--border);border-radius:4px;overflow:hidden}
        .pillar-card{padding:28px 20px;border-right:1px solid var(--border);transition:background 0.2s;position:relative}
        .pillar-card:last-child{border-right:none}
        .pillar-card:hover{background:rgba(158,24,43,0.05)}
        .pillar-num{font-size:36px;font-weight:700;color:rgba(158,24,43,0.12);line-height:1;margin-bottom:10px}
        .pillar-tag{font-size:8px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:var(--wine);margin-bottom:8px}
        .pillar-title{font-size:13px;font-weight:700;color:var(--ivory);margin-bottom:8px;letter-spacing:-0.01em}
        .pillar-desc{font-size:11px;font-weight:300;color:var(--dim);line-height:1.65}

        /* ─── PROOF — DINA (UPDATED) ─── */
        .proof{background:var(--bg);padding:100px 52px;border-top:1px solid var(--border)}
        .proof-inner{max-width:1100px;margin:0 auto}

        /* Two-column: quote left, stats card right */
        .proof-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:stretch}

        /* Quote card */
        .proof-quote-card{background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:36px;display:flex;flex-direction:column;justify-content:space-between}
        .proof-quote-mark{font-family:'Playfair Display',serif;font-size:72px;color:var(--wine);line-height:0.6;margin-bottom:20px;opacity:0.35}
        .proof-quote-text{font-family:'Playfair Display',serif;font-size:clamp(16px,1.8vw,20px);font-weight:300;font-style:italic;color:var(--ivory);line-height:1.6;margin-bottom:24px;letter-spacing:-0.3px}
        .proof-quote-text strong{font-style:normal;font-weight:700;color:var(--blush)}
        .proof-attr-row{display:flex;align-items:center;gap:12px;padding-top:20px;border-top:1px solid var(--border)}
        .proof-avatar{width:44px;height:44px;border-radius:50%;overflow:hidden;border:2px solid var(--wine);flex-shrink:0;position:relative}
        .proof-attr-name{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:var(--ivory)}
        .proof-attr-handle{font-family:'DM Sans',sans-serif;font-size:11px;color:var(--dim);margin-top:1px}
        .proof-platform-tag{margin-left:auto;font-family:'DM Sans',sans-serif;font-size:8px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--wine);border:1px solid var(--border-wine);background:rgba(158,24,43,0.06);padding:3px 10px;border-radius:3px;white-space:nowrap}

        /* TikTok stats card */
        .proof-stats-card{background:var(--bg2);border:1px solid var(--border);border-radius:8px;overflow:hidden;display:flex;flex-direction:column}
        .proof-tiktok-header{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px}
        .proof-tiktok-avatar{width:44px;height:44px;border-radius:50%;overflow:hidden;border:2px solid var(--border-wine);flex-shrink:0;position:relative}
        .proof-tiktok-name{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:var(--ivory)}
        .proof-tiktok-handle{font-family:'DM Sans',sans-serif;font-size:10px;color:var(--dim);font-family:'DM Sans',monospace}
        .proof-tiktok-bio{font-family:'DM Sans',sans-serif;font-size:10px;color:rgba(245,240,232,0.4);margin-top:2px;line-height:1.4}
        .proof-verified{margin-left:auto;font-family:'DM Sans',sans-serif;font-size:7px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--wine);border:1px solid var(--border-wine);background:rgba(158,24,43,0.08);padding:3px 8px;border-radius:2px;white-space:nowrap;flex-shrink:0}

        .proof-account-stats{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid var(--border)}
        .proof-astat{padding:14px;text-align:center;border-right:1px solid var(--border)}
        .proof-astat:last-child{border-right:none}
        .proof-astat-num{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--ivory);display:block;line-height:1;margin-bottom:3px}
        .proof-astat-num.wine{color:var(--wine)}
        .proof-astat-num.green{color:#4ADE80}
        .proof-astat-label{font-family:'DM Sans',sans-serif;font-size:8px;font-weight:500;color:var(--dim);letter-spacing:0.1em;text-transform:uppercase}

        .proof-vid-section{padding:14px 18px;border-bottom:1px solid var(--border)}
        .proof-vid-label{font-family:'DM Sans',sans-serif;font-size:8px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:var(--dim);margin-bottom:10px}
        .proof-vid-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
        .proof-vid-thumb{aspect-ratio:9/16;border-radius:4px;border:1px solid var(--border);position:relative;overflow:hidden}
        .proof-vid-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(15,11,12,0.85) 0%,transparent 55%)}
        .proof-vid-pin{position:absolute;top:5px;left:5px;font-family:'DM Sans',sans-serif;font-size:7px;font-weight:700;background:var(--wine);color:white;padding:2px 5px;border-radius:2px;z-index:2;letter-spacing:0.06em}
        .proof-vid-views{position:absolute;bottom:6px;left:6px;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:700;color:white;z-index:2}

        .proof-result-metrics{display:grid;grid-template-columns:repeat(3,1fr)}
        .proof-rm{padding:13px;text-align:center;border-right:1px solid var(--border)}
        .proof-rm:last-child{border-right:none}
        .proof-rm-num{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;display:block;line-height:1;margin-bottom:3px}
        .proof-rm-num.wine{color:var(--wine)}
        .proof-rm-num.green{color:#4ADE80}
        .proof-rm-num.ivory{color:var(--ivory)}
        .proof-rm-label{font-family:'DM Sans',sans-serif;font-size:8px;font-weight:500;color:var(--dim);letter-spacing:0.1em;text-transform:uppercase}

        .proof-powered{padding:10px 18px;background:rgba(158,24,43,0.03);border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
        .proof-powered-text{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:400;letter-spacing:0.1em;text-transform:uppercase;color:rgba(245,240,232,0.2)}
        .proof-powered-badge{display:flex;align-items:center;gap:5px;font-family:'DM Sans',sans-serif;font-size:9px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--wine)}
        .proof-powered-dot{width:5px;height:5px;border-radius:50%;background:var(--wine);animation:pulse 2s ease-in-out infinite}

        /* AFFILIATE */
        .affiliate{background:var(--bg2);padding:100px 52px;border-top:1px solid var(--border)}
        .affiliate-inner{max-width:1100px;margin:0 auto}
        .affiliate-layout{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
        .affiliate-h2{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(28px,4vw,52px);line-height:1;letter-spacing:-1.5px;color:var(--ivory);margin-bottom:16px}
        .affiliate-h2 em{font-style:italic;color:var(--blush)}
        .affiliate-sub{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:300;color:var(--dim);line-height:1.8;margin-bottom:32px}
        .affiliate-card{background:var(--bg3);border:1px solid var(--border-wine);border-radius:8px;padding:36px 32px}
        .aff-num{font-family:'Playfair Display',serif;font-size:48px;font-weight:900;color:var(--wine);line-height:1;margin-bottom:4px}
        .aff-label{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:var(--blush);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:16px}
        .aff-desc{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:300;color:var(--dim);line-height:1.75;margin-bottom:24px}
        .aff-items{display:flex;flex-direction:column;gap:10px;margin-bottom:28px}
        .aff-item{display:flex;align-items:flex-start;gap:10px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:300;color:var(--mid)}
        .aff-icon{width:18px;height:18px;border-radius:50%;background:rgba(158,24,43,0.15);border:1px solid var(--border-wine);display:flex;align-items:center;justify-content:center;font-size:9px;color:var(--blush);flex-shrink:0;margin-top:1px}
        .aff-example{background:rgba(158,24,43,0.06);border:1px solid var(--border-wine);border-radius:6px;padding:14px 16px;margin-bottom:24px}
        .aff-example-label{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:700;color:var(--blush);letter-spacing:0.16em;text-transform:uppercase;margin-bottom:8px}
        .aff-calc-row{display:flex;justify-content:space-between;align-items:center;font-family:'DM Sans',sans-serif;font-size:12px;color:var(--dim);padding:4px 0}
        .aff-calc-row.total{border-top:1px solid var(--border-wine);margin-top:6px;padding-top:10px;color:var(--ivory);font-weight:600}

        /* FINAL CTA */
        .cta-final{background:var(--bg);padding:100px 52px;text-align:center;position:relative;overflow:hidden;border-top:1px solid var(--border)}
        .cta-glow{position:absolute;inset:0;background:radial-gradient(ellipse 50% 40% at 50% 50%,rgba(158,24,43,0.12) 0%,transparent 65%);pointer-events:none}
        .cta-inner{position:relative;z-index:2;max-width:600px;margin:0 auto}
        .cta-h2{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(36px,6vw,76px);line-height:0.95;letter-spacing:-2px;color:var(--ivory);margin-bottom:22px}
        .cta-h2 em{font-style:italic;color:var(--blush);display:block}
        .cta-sub{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:300;color:var(--dim);margin-bottom:40px;line-height:1.8}
        .cta-note{font-family:'DM Sans',sans-serif;font-size:10px;color:rgba(245,240,232,0.18);text-transform:uppercase;letter-spacing:0.1em;margin-top:18px}

        /* FOOTER */
        .footer{background:var(--bg);border-top:1px solid var(--border);padding:32px 52px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
        .footer-logo{font-family:'DM Sans',sans-serif;font-weight:300;font-size:13px;color:var(--ivory);letter-spacing:0.2em;text-transform:uppercase}
        .footer-logo strong{font-weight:700}
        .footer-links{display:flex;gap:20px}
        .footer-link{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:300;letter-spacing:0.1em;text-transform:uppercase;color:rgba(245,240,232,0.18);text-decoration:none;transition:color 0.2s}
        .footer-link:hover{color:var(--ivory)}
        .footer-copy{font-family:'DM Sans',sans-serif;font-size:10px;color:rgba(245,240,232,0.12)}

        /* MOBILE */
        @media(max-width:900px){
          .nav{padding:14px 20px}
          .nav-a{display:none}
          .sticky-mob{display:block}
          .hero{grid-template-columns:1fr;padding-top:64px}
          .hero-left{padding:60px 20px 40px}
          .hero-right{padding:20px 20px 40px}
          .dashboard{max-width:100%}
          .dash-row{grid-template-columns:1fr 1fr}
          .trust{padding:14px 20px}
          .how{padding:72px 20px}
          .how-steps{grid-template-columns:1fr;gap:2px}
          .feats{padding:72px 20px}
          .feat-grid{grid-template-columns:1fr}
          .proof{padding:72px 20px}
          .proof-grid{grid-template-columns:1fr;gap:16px}
          .affiliate{padding:72px 20px}
          .affiliate-layout{grid-template-columns:1fr;gap:40px}
          .cta-final{padding:72px 20px 140px}
          .footer{flex-direction:column;align-items:flex-start;padding:28px 20px}
        }
        @media(max-width:480px){
          .hero-ctas{flex-direction:column}
          .btn-wine,.btn-ghost{text-align:center}
          .dash-row{grid-template-columns:1fr}
          .proof-account-stats{grid-template-columns:1fr 1fr}
          .proof-result-metrics{grid-template-columns:1fr 1fr}
          .proof-result-metrics .proof-rm:nth-child(2){border-right:none}
        }

        /* STORYBOARD */
        .sb-section{background:var(--bg);border-top:1px solid var(--border);padding:100px 52px}
        .sb-inner{max-width:1100px;margin:0 auto}
        .sb-layout{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
        .sb-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}
        .sb-right{display:flex;flex-direction:column;gap:24px}
        .sb-right-sub{font-size:13px;font-weight:300;color:var(--dim);line-height:1.75;margin-bottom:4px}
        .sb-frame{position:relative;aspect-ratio:3/4;border-radius:4px;overflow:hidden;border:1px solid var(--border);cursor:default;transition:border-color 0.25s}
        .sb-frame:hover{border-color:var(--border-wine)}
        .sb-frame:hover img{transform:scale(1.04)}
        .sb-frame-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(15,11,12,0.8) 0%,transparent 55%);pointer-events:none}
        .sb-frame-num{position:absolute;top:7px;left:8px;font-family:'DM Sans',sans-serif;font-size:9px;font-weight:600;color:rgba(245,240,232,0.45);letter-spacing:0.06em}
        .sb-frame-label{position:absolute;bottom:7px;left:8px;font-family:'DM Sans',sans-serif;font-size:7px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:rgba(245,240,232,0.5)}
        .sb-brief{background:var(--bg2);border:1px solid var(--border);border-radius:6px;overflow:hidden}
        .sb-brief-header{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
        .sb-brief-title{font-family:'DM Sans',sans-serif;font-size:8px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--blush)}
        .sb-brief-badge{font-family:'DM Sans',sans-serif;font-size:7px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--wine);border:1px solid var(--border-wine);background:rgba(158,24,43,0.06);padding:3px 8px;border-radius:2px}
        .sb-cta-wrap{padding:20px;border-top:1px solid var(--border);background:rgba(158,24,43,0.03)}
        .sb-brief-body{padding:18px 20px;display:flex;flex-direction:column;gap:14px}
        .sb-field-label{font-family:'DM Sans',sans-serif;font-size:8px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(245,240,232,0.25);margin-bottom:4px}
        .sb-field-val{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:400;color:var(--mid);line-height:1.6}
        .sb-field-val.highlight{color:var(--ivory);font-weight:600;font-size:13px}
        .sb-scene-block{background:rgba(158,24,43,0.05);border:1px solid var(--border-wine);border-radius:3px;padding:10px 12px;font-family:'DM Sans',sans-serif;font-size:11px;line-height:1.7;color:var(--dim)}
        .sb-scene-block strong{color:var(--blush);font-weight:600}
        .sb-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:4px}
        .sb-tag{font-family:'DM Sans',sans-serif;font-size:8px;padding:3px 8px;border:1px solid var(--border);color:rgba(245,240,232,0.25);border-radius:2px}
        .sb-hook{font-family:'Playfair Display',serif;font-style:italic;font-size:14px;font-weight:400;color:var(--wine);line-height:1.5;padding:10px 12px;border-left:2px solid var(--wine);background:rgba(158,24,43,0.04)}
        .sb-result-strip{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--border)}
        .sb-rstat{padding:12px;text-align:center;border-right:1px solid var(--border)}
        .sb-rstat:last-child{border-right:none}
        .sb-rstat-num{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--wine);display:block;line-height:1;margin-bottom:2px}
        .sb-rstat-label{font-family:'DM Sans',sans-serif;font-size:7px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(245,240,232,0.22)}
      `}</style>

      <HomeNav />
      <div className="sticky-mob"><a href="/generate">⚡ Generate Free — 3 Briefs, No Card</a></div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-badge dm"><div className="badge-dot" />The Intelligence Layer for AI Creators</div>
          <h1 className="hero-h1 pf">
            Engineer viral<br />AI content
            <em>in 60 seconds.</em>
          </h1>
          <p className="hero-sub dm">No ideas. No team. <strong>No problem.</strong><br />SuperCool generates cinematic prompts, motion scripts, hooks, captions, keywords and hashtags — ready for Higgsfield in under a minute.</p>
          <div className="hero-ctas">
            <Link href="/generate" className="btn-wine dm">⚡ Start Free — 3 Briefs</Link>
            <Link href="/pricing" className="btn-ghost dm">View Pricing →</Link>
          </div>
          <p className="hero-proof dm"><strong>3 free briefs</strong> · No credit card required</p>
          <div className="hero-stacks">
            {['🎬  Cinematic motion scripts + Seedance briefs','🖼️  Hyper-realistic image prompts','✍️  Viral hooks, captions + first comments','#  Keywords + hashtag intelligence','⚡  Full creator workflow in 60 seconds'].map(s => (
              <div className="hero-stack-row dm" key={s}><div className="hero-stack-dot" /><span>{s}</span></div>
            ))}
          </div>
        </div>

        {/* INTELLIGENCE DASHBOARD */}
        <div className="hero-right">
          <div className="dashboard">
            <div className="dash-row">
              <div className="dash-card">
                <div className="dash-label dm"><div className="dash-dot" />Trend Intel <span className="live-badge dm"><div className="live-dot" />Live</span></div>
                <div className="dash-value pf">2.4M</div>
                <div className="dash-sub dm">views on <em>#skincareroutine</em> this week</div>
                <div className="trend-bars">
                  {[30,45,35,60,40,75,55,90,70,100,85,95].map((h,i) => (
                    <div key={i} className={`trend-bar${h>70?' hi':''}`} style={{height:h+'%'}} />
                  ))}
                </div>
              </div>
              <div className="dash-card wine-border">
                <div className="dash-label dm"><div className="dash-dot" />Realism Score</div>
                <div className="dash-value pf">94<span style={{fontSize:14,fontWeight:400,color:'var(--dim)'}}>/100</span></div>
                <div className="dash-sub dm"><em>Human Realism Engine™</em> active</div>
                <div style={{marginTop:8}}>
                  {[{l:'Skin Truth',v:97},{l:'Eye Behavior',v:94},{l:'Motion',v:91}].map(r => (
                    <div className="score-row" key={r.l}>
                      <span className="score-label dm">{r.l}</span>
                      <div className="score-bar-wrap"><div className="score-fill" style={{width:r.v+'%'}} /></div>
                      <span className="score-num dm">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dash-card">
              <div className="dash-label dm"><div className="dash-dot" />Viral Hook Extraction — Top 3 for this niche</div>
              {[
                {t:'—girl my knuckles been clear for 3 weeks straight, look—',a:true},
                {t:'I spent $47 testing every brightening serum. Only one worked.',a:false},
                {t:'The reason your skincare isn\'t working (it\'s not the product)',a:false},
              ].map((h,i) => (
                <div key={i} className={`hook-line dm${h.a?' active':''}`}>{h.t}</div>
              ))}
            </div>

            <div className="dash-row">
              <div className="dash-card">
                <div className="dash-label dm"><div className="dash-dot" />Seedance 2.0 Prompt</div>
                <div className="prompt-text dm">
                  <strong>SCENE [0–3s]:</strong> Elena reclined on cream lounge, golden hour. iPad FaceTime active. <strong>FACE LOCK:</strong> warm Fitzpatrick III, coily updo, asymmetric blink at 0.4s. <strong>VOICEOVER:</strong> "—girl I'm tellin' you, look—"
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-label dm"><div className="dash-dot" />Keyword Intelligence</div>
                {['knuckle brightening serum 2026','how to even skin tone fast','best serum for dark knuckles','is dina bright worth it'].map((k,i) => (
                  <div key={i} style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:300,color:i===0?'var(--ivory)':'var(--dim)',lineHeight:1.8,padding:'2px 0',borderBottom:'1px solid rgba(245,240,232,0.04)'}}>
                    {i===0 && <span style={{color:'var(--blush)',marginRight:4}}>↑</span>}{k}
                  </div>
                ))}
              </div>
            </div>

            <div className="dash-card">
              <div className="dash-label dm"><div className="dash-dot" />Generated Caption — TikTok</div>
              <div className="prompt-text dm" style={{lineHeight:1.85}}>
                three weeks ago my knuckles looked completely different and I genuinely thought nothing would work | I started this routine and the change hit me mid-FaceTime when my friend pointed it out before I even mentioned it | the serum first, every knuckle, five minutes, then the cream — that's the whole thing | what's wild is it's not doing the most, it's just actually working | save this if your knuckles have been on your mind 🤍
              </div>
              <div style={{display:'flex',gap:12,marginTop:8}}>
                {['#skincareroutine','#knucklecare','#glowup','#realresults','#ugccreator'].map(t => (
                  <span key={t} className="feat-tag w">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <div className="trust">
        <span className="trust-label dm">Outputs ready for</span>
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


      {/* ── STORYBOARD — Brief → Output ── */}
      <section className="sb-section">
        <div className="sb-inner">
          <div className="sb-layout">

            {/* LEFT — 2x4 portrait grid */}
            <div className="sb-grid">
              {[
                {img:'/sb-1.png',n:'1.',label:'Entrance Walk'},
                {img:'/sb-2.png',n:'2.',label:'Covered Reveal'},
                {img:'/sb-3.png',n:'3.',label:'Contract Sign'},
                {img:'/sb-4.png',n:'4.',label:'G-Wagon Reveal'},
                {img:'/sb-5.png',n:'5.',label:'Interior'},
                {img:'/sb-6.png',n:'6.',label:'Keys + Roses'},
                {img:'/sb-7.png',n:'7.',label:'Aerial Drive'},
                {img:'/sb-8.png',n:'8.',label:'G-Wagon Pose'},
              ].map(f => (
                <div className="sb-frame" key={f.n}>
                  <Image src={f.img} alt={f.label} fill style={{objectFit:'cover',objectPosition:'center',transition:'transform 0.4s'}} />
                  <div className="sb-frame-overlay" />
                  <div className="sb-frame-num dm">{f.n}</div>
                  <div className="sb-frame-label dm">{f.label}</div>
                </div>
              ))}
            </div>

            {/* RIGHT — Headline + brief card + CTA */}
            <div className="sb-right">
              <div className="sec-tag dm" style={{marginBottom:16}}>Brief → Output</div>
              <h2 className="sec-h2 pf" style={{marginBottom:80}}>
                One SuperCool brief.<br /><em>Eight shots. Higgsfield-ready.</em>
              </h2>
              <p className="sb-right-sub dm" style={{marginBottom:80}}>A real SuperCool brief. The client took this straight into Higgsfield. Zero guesswork — every scene, motion, and hook pre-engineered for virality.</p>

              <div className="sb-brief">
                <div className="sb-brief-header">
                  <span className="sb-brief-title dm">● SuperCool Brief</span>
                  <span className="sb-brief-badge dm">Generated in 60s</span>
                </div>
                <div className="sb-brief-body">
                  <div>
                    <div className="sb-field-label dm">Client</div>
                    <div className="sb-field-val highlight dm">Luxury Reel — Mercedes G-Wagon Delivery</div>
                  </div>
                  <div>
                    <div className="sb-field-label dm">Concept</div>
                    <div className="sb-field-val dm">Editorial cinematic reel. Woman purchasing her dream car. Dark luxury. No voiceover. Let the visuals do the work.</div>
                  </div>
                  <div>
                    <div className="sb-field-label dm">Scene Structure</div>
                    <div className="sb-scene-block dm">
                      <strong>Shot 1:</strong> Exterior walk-in. Back-facing, power walk, designer bag.<br />
                      <strong>Shot 2:</strong> Covered car reveal. Black balloons. Dramatic pause.<br />
                      <strong>Shot 3:</strong> Contract signing. Closeup, sunglasses on.<br />
                      <strong>Shot 4:</strong> G-Wagon uncovered. She touches the hood.<br />
                      <strong>Shot 5:</strong> Interior. Hands on wheel. Golden hour.<br />
                      <strong>Shot 6:</strong> Keys + roses outside the dealership.<br />
                      <strong>Shot 7:</strong> Aerial — G-Wagon on highway. Motion blur.<br />
                      <strong>Shot 8:</strong> Champagne toast. Celebration.
                    </div>
                  </div>
                  <div>
                    <div className="sb-field-label dm">Viral Hook</div>
                    <div className="sb-hook pf">"She didn't announce it. She just pulled up."</div>
                  </div>
                </div>
                <div className="sb-result-strip">
                  {[{n:'60s',l:'Brief Time'},{n:'8',l:'Shots'},{n:'96',l:'Realism'},{n:'Viral',l:'Outcome'}].map(s => (
                    <div className="sb-rstat" key={s.l}>
                      <span className="sb-rstat-num pf">{s.n}</span>
                      <span className="sb-rstat-label dm">{s.l}</span>
                    </div>
                  ))}
                </div>
                <div className="sb-cta-wrap">
                  <Link href="/generate" className="btn-wine dm" style={{display:'block',textAlign:'center' as const,width:'100%'}}>⚡ Generate Your Brief Free Now</Link>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:'var(--dim)',textAlign:'center',marginTop:8,letterSpacing:'0.06em'}}>3 free briefs · No credit card required</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="how-inner">
          <div className="sec-tag dm">How it works</div>
          <h2 className="sec-h2 pf">3 steps.<br /><em>Full campaign.</em></h2>
          <div className="how-steps">
            {[
              {n:'1',t:'Research',d:'AI analyses TikTok, Reels and Shorts — extracting viral trends, hooks, keywords and audience psychology for your exact niche right now.',chips:['Trend intel','Hook extraction','Keyword gaps','Audience psychology']},
              {n:'2',t:'Generate',d:'SuperCool builds your complete content package — cinematic Seedance briefs, motion scripts, image prompts, hooks, captions, hashtags and first comments.',chips:['Seedance brief','Motion script','Image prompts','Captions + hooks']},
              {n:'3',t:'Create & Publish',d:'Paste prompts into Higgsfield, Kling or Midjourney. Generate your content. Post daily without burnout.',chips:['Higgsfield','Kling','Midjourney','Runway']},
            ].map(s => (
              <div className="how-step" key={s.n}>
                <div className="how-num dm">{s.n}</div>
                <div className="how-title dm">{s.t}</div>
                <div className="how-desc dm">{s.d}</div>
                <div className="how-chips">
                  {s.chips.map(c => <span className="how-chip dm" key={c}>{c}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="feats">
        <div className="feats-inner">
          <div className="sec-tag dm">Everything you get</div>
          <h2 className="sec-h2 pf">Generated in <em>60 seconds.</em></h2>
          <div className="feat-grid">
            {[
              {img:'/ugc-grid.png',pos:'center center',title:'AI UGC Ads',desc:'Authentic, realistic ads built on human behavior systems — believable motion that converts.',tags:[{t:'AI UGC',w:true},{t:'Ads',w:false},{t:'Converts',w:false}]},
              {img:'/feat2.png',pos:'center top',title:'Cinematic Reel Briefs',desc:'Full Seedance 2.0 production documents — scene breakdowns, timestamped scripts, blink schedules.',tags:[{t:'Seedance',w:true},{t:'Motion',w:false},{t:'Scripts',w:false}]},
              {img:'/realism-eye.png',pos:'center center',title:'Hyper-Realistic Prompts',desc:'Skin truth, eye behavior, fabric physics. Image prompts that look filmed not generated.',tags:[{t:'Realism',w:true},{t:'Nano Banana',w:false},{t:'Midjourney',w:false}]},
              {img:'/feat3.png',pos:'center top',title:'Viral Hooks + Captions',desc:'Platform-native captions 5-7 sentences minimum. Zero generic. Zero one-liners. Real creator energy.',tags:[{t:'TikTok',w:true},{t:'Instagram',w:false},{t:'Hooks',w:false}]},
              {img:'/feat5.png',pos:'center top',title:'SEO Keyword Intelligence',desc:'Long-tail keywords people actually search. Not just "skincare" — the exact phrases driving discovery.',tags:[{t:'SEO',w:false},{t:'Discovery',w:false},{t:'Search',w:true}]},
              {img:'/feat1.png',pos:'center top',title:'Hashtag + First Comment',desc:'8-hashtag strategy (mega/mid/micro mix) plus a pinnable first comment engineered for saves.',tags:[{t:'Hashtags',w:true},{t:'First comment',w:false},{t:'Saves',w:false}]},
            ].map(f => (
              <div className="feat-card" key={f.title}>
                <div className="feat-img">
                  <Image src={f.img} alt={f.title} fill style={{objectFit:'cover',objectPosition:f.pos}} />
                  <div className="feat-img-overlay" />
                </div>
                <div className="feat-body">
                  <div className="feat-title dm">{f.title}</div>
                  <div className="feat-desc dm">{f.desc}</div>
                  <div className="feat-tags">
                    {f.tags.map(tag => <span className={`feat-tag dm${tag.w?' w':''}`} key={tag.t}>{tag.t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="feat-footer dm">Like having a full creative team — in your pocket.</p>

          {/* PILLARS STRIP */}
          <div className="pillars-strip">
            {[
              {n:'01',tag:'↗ Real-time',title:'Trend Analysis',desc:'Surface what's spiking before it peaks. Platform signals decoded daily.'},
              {n:'02',tag:'⊞ Architecture',title:'Retention Structures',desc:'Pattern interrupts, loop points, payoff architecture. Every frame earns the next.'},
              {n:'03',tag:'◎ Psychology',title:'Motion Psychology',desc:'Camera movement as emotional language. Dolly, drift, rack focus.'},
              {n:'04',tag:'◈ Precision',title:'Realism Engineering',desc:'Skin texture, lighting physics, material response. Built to fool the eye.'},
              {n:'05',tag:'⌖ Systems',title:'Creator Strategy',desc:'Content OS, monetization loops, positioning for long-term dominance.'},
            ].map(p => (
              <div className="pillar-card" key={p.n}>
                <div className="pillar-num pf">{p.n}</div>
                <div className="pillar-tag dm">{p.tag}</div>
                <div className="pillar-title dm">{p.title}</div>
                <p className="pillar-desc dm">{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PROOF — DINA (REAL CLIENT) ── */}
      <section className="proof">
        <div className="proof-inner">
          <div className="sec-tag dm">Real results</div>
          <h2 className="sec-h2 pf" style={{marginBottom:32}}>
            This is what our briefs<br /><em>actually produce.</em>
          </h2>

          <div className="proof-grid">

            {/* LEFT — Quote */}
            <div className="proof-quote-card">
              <div>
                <div className="proof-quote-mark pf">"</div>
                <p className="proof-quote-text pf">
                  SuperCool changed my content game. My retention went from 20% to 79%. The briefs are so specific — it's like having a{' '}
                  <strong>creative team telling me exactly what to film, how to film it, and why it'll go viral.</strong>{' '}
                  First reel hit 64.9K views. I just paste and go.
                </p>
              </div>
              <div className="proof-attr-row">
                <div className="proof-avatar">
                  <Image
                    src="/dina-profile.jpg"
                    alt="Dinabrightsbeauty"
                    fill
                    style={{objectFit:'cover',objectPosition:'center top'}}
                  />
                </div>
                <div>
                  <div className="proof-attr-name dm">Dinabrightsbeauty</div>
                  <div className="proof-attr-handle dm">@cardinacssaul · Luxury Skincare Creator</div>
                </div>
                <div className="proof-platform-tag dm">TikTok</div>
              </div>
            </div>

            {/* RIGHT — TikTok stats card */}
            <div className="proof-stats-card">

              {/* Profile header */}
              <div className="proof-tiktok-header">
                <div className="proof-tiktok-avatar">
                  <Image
                    src="/dina-profile.jpg"
                    alt="Dinabrightsbeauty"
                    fill
                    style={{objectFit:'cover',objectPosition:'center top'}}
                  />
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div className="proof-tiktok-name dm">Dinabrightsbeauty</div>
                  <div className="proof-tiktok-handle">@cardinacssaul</div>
                  <div className="proof-tiktok-bio dm">✨ Glass Skin Starts Here · Luxury Glow Skincare</div>
                </div>
                <div className="proof-verified dm">✓ SuperCool Client</div>
              </div>

              {/* Account stats */}
              <div className="proof-account-stats">
                <div className="proof-astat">
                  <span className="proof-astat-num pf">18.9K</span>
                  <span className="proof-astat-label dm">Followers</span>
                </div>
                <div className="proof-astat">
                  <span className="proof-astat-num wine pf">35.9K</span>
                  <span className="proof-astat-label dm">Likes</span>
                </div>
                <div className="proof-astat">
                  <span className="proof-astat-num green pf">3 Days</span>
                  <span className="proof-astat-label dm">To Viral</span>
                </div>
              </div>

              {/* Pinned video thumbnails */}
              <div className="proof-vid-section">
                <div className="proof-vid-label dm">Pinned videos — SuperCool briefs</div>
                <div className="proof-vid-grid">
                  <div className="proof-vid-thumb">
                    <Image src="/dina-cream.jpg" alt="Radiant Glow Cream" fill style={{objectFit:'cover',objectPosition:'center 30%'}} />
                    <div className="proof-vid-overlay" />
                    <div className="proof-vid-pin dm">Pinned</div>
                    <div className="proof-vid-views dm">▶ 64.9K</div>
                  </div>
                  <div className="proof-vid-thumb">
                    <Image src="/dina-ulta.jpg" alt="Ulta car scene" fill style={{objectFit:'cover',objectPosition:'center 20%'}} />
                    <div className="proof-vid-overlay" />
                    <div className="proof-vid-pin dm">Pinned</div>
                    <div className="proof-vid-views dm">▶ 11.6K</div>
                  </div>
                  <div className="proof-vid-thumb">
                    <Image src="/dina-glow.jpg" alt="Glowing skin" fill style={{objectFit:'cover',objectPosition:'center 15%'}} />
                    <div className="proof-vid-overlay" />
                    <div className="proof-vid-pin dm">Pinned</div>
                    <div className="proof-vid-views dm">▶ 12.4K</div>
                  </div>
                </div>
              </div>

              {/* Result metrics */}
              <div className="proof-result-metrics">
                <div className="proof-rm">
                  <span className="proof-rm-num wine pf">79%</span>
                  <span className="proof-rm-label dm">Avg Retention</span>
                </div>
                <div className="proof-rm">
                  <span className="proof-rm-num ivory pf">64.9K</span>
                  <span className="proof-rm-label dm">Top Video</span>
                </div>
                <div className="proof-rm">
                  <span className="proof-rm-num green pf">+247%</span>
                  <span className="proof-rm-label dm">Engagement</span>
                </div>
              </div>

              {/* Footer */}
              <div className="proof-powered">
                <span className="proof-powered-text dm">Brief by SuperCool · Executed in Higgsfield</span>
                <span className="proof-powered-badge dm">
                  <span className="proof-powered-dot" />Verified Results
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* AFFILIATE */}
      <section className="affiliate">
        <div className="affiliate-inner">
          <div className="affiliate-layout">
            <div>
              <div className="sec-tag dm">Affiliate program</div>
              <h2 className="affiliate-h2 pf">Earn while you<br /><em>create.</em></h2>
              <p className="affiliate-sub dm">Share SuperCool with your audience and earn recurring commission on every paying user you refer. No cap. No expiry. As long as they stay subscribed, you earn.</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap' as const}}>
                <Link href="/affiliate" className="btn-wine dm">Apply to Affiliate →</Link>
              </div>
              <div style={{marginTop:20,fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'var(--dim)'}}>Paid monthly · Instant approval for creators · Dedicated dashboard</div>
            </div>
            <div>
              <div className="affiliate-card">
                <div className="aff-num pf">40%</div>
                <div className="aff-label dm">Recurring Commission</div>
                <div className="aff-desc dm">You earn 40% of every payment your referrals make — monthly, for as long as they subscribe. This is recurring income, not one-time.</div>
                <div className="aff-example">
                  <div className="aff-example-label dm">Example earnings</div>
                  {[{l:'10 Creator subscribers ($29/mo)',v:'$116/mo'},{l:'10 Agency subscribers ($79/mo)',v:'$316/mo'},{l:'25 mixed subscribers',v:'$580+/mo'}].map(r => (
                    <div className="aff-calc-row" key={r.l}>
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'var(--dim)'}}>{r.l}</span>
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,color:'var(--blush)'}}>{r.v}</span>
                    </div>
                  ))}
                  <div className="aff-calc-row total">
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12}}>100 subscribers</span>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'var(--blush)'}}>~$2,320/mo</span>
                  </div>
                </div>
                <div className="aff-items">
                  {['40% recurring on all plans','Paid monthly via PayPal or bank transfer','Real-time affiliate dashboard','Custom referral link + promo assets','No minimum threshold to withdraw'].map(item => (
                    <div className="aff-item dm" key={item}><div className="aff-icon">✓</div>{item}</div>
                  ))}
                </div>
                <Link href="/affiliate" className="btn-wine dm" style={{width:'100%',textAlign:'center' as const,display:'block'}}>Join the Affiliate Program →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-final">
        <div className="cta-glow" />
        <div className="cta-inner">
          <h2 className="cta-h2 pf">Stop creating.<br /><em>Start directing.</em></h2>
          <p className="cta-sub dm">3 free briefs. No credit card. No setup.<br />Just your idea — and 60 seconds.</p>
          <Link href="/generate" className="btn-wine dm">⚡ Generate Free Now</Link>
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
          <a href="/affiliate" className="footer-link dm">Affiliate</a>
        </div>
        <div className="footer-copy dm">© 2026 SuperCool Influencer</div>
      </footer>
    </div>
  );
}
