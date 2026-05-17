import Link from "next/link";

export default function Home() {
  return (
    <div style={{ background: '#080608', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --ivory: #F5F0E8;
          --cream: #E8DDD0;
          --warm: #C9B49A;
          --wine: #6B1A2A;
          --wine-bright: #9E182B;
          --blush: #D4A0A8;
          --dark: #080608;
          --dark2: #0E0A0C;
          --dark3: #140F11;
          --grain: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
        }

        html { scroll-behavior: smooth; }

        .cg { font-family: 'Cormorant Garamond', Georgia, serif; }
        .inter { font-family: 'Inter', sans-serif; }

        /* GRAIN OVERLAY */
        body::after {
          content: ''; position: fixed; inset: 0;
          background-image: var(--grain);
          pointer-events: none; z-index: 9999; opacity: 0.35;
        }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 32px;
          background: linear-gradient(to bottom, rgba(8,6,8,0.95) 0%, transparent 100%);
          backdrop-filter: blur(2px);
        }
        .nav-logo {
          font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 15px;
          color: var(--ivory); letter-spacing: 0.18em; text-transform: uppercase;
        }
        .nav-logo em { color: var(--blush); font-style: italic; font-weight: 300; }
        .nav-r { display: flex; gap: 20px; align-items: center; }
        .nav-link {
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 400;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(245,240,232,0.45); text-decoration: none;
          transition: color 0.3s;
        }
        .nav-link:hover { color: var(--ivory); }
        .nav-cta {
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: var(--ivory); color: var(--dark); padding: 9px 22px;
          border-radius: 2px; text-decoration: none; transition: background 0.3s;
        }
        .nav-cta:hover { background: var(--cream); }

        /* ── STICKY CTA (mobile) ── */
        .sticky-cta {
          display: none; position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
          z-index: 998; width: calc(100% - 48px); max-width: 380px;
        }
        .sticky-cta-btn {
          display: block; text-align: center; width: 100%;
          background: var(--ivory); color: var(--dark);
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 16px 32px; border-radius: 2px; text-decoration: none;
          box-shadow: 0 16px 48px rgba(0,0,0,0.6);
        }

        /* ── HERO ── */
        .hero {
          min-height: 100svh; display: flex; flex-direction: column;
          justify-content: flex-end; align-items: flex-start;
          padding: 0 32px 72px; position: relative; overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 100% 80% at 60% 20%, rgba(107,26,42,0.25) 0%, transparent 55%),
            radial-gradient(ellipse 60% 60% at 20% 80%, rgba(158,24,43,0.12) 0%, transparent 50%),
            linear-gradient(165deg, #0E0608 0%, #080608 40%, #0A0608 100%);
        }
        .hero-grid-lines {
          position: absolute; inset: 0; opacity: 0.04;
          background-image:
            linear-gradient(to right, var(--ivory) 1px, transparent 1px),
            linear-gradient(to bottom, var(--ivory) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .hero-content { position: relative; z-index: 2; max-width: 800px; }
        .hero-kicker {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 28px;
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase; color: var(--blush);
        }
        .hero-kicker::before {
          content: ''; width: 24px; height: 1px; background: var(--blush);
        }
        .hero-h1 {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(52px, 11vw, 120px); line-height: 0.92;
          letter-spacing: -2px; color: var(--ivory); margin-bottom: 32px;
        }
        .hero-h1 em {
          font-style: italic; color: var(--blush); display: block;
          font-weight: 300;
        }
        .hero-h1 strong {
          font-weight: 600; display: block; font-style: normal;
        }
        .hero-sub {
          font-family: 'Inter', sans-serif; font-size: clamp(13px, 2vw, 15px);
          font-weight: 300; line-height: 1.8; color: rgba(245,240,232,0.45);
          max-width: 400px; margin-bottom: 48px; letter-spacing: 0.02em;
        }
        .hero-ctas { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
        .btn-primary-lg {
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          background: var(--ivory); color: var(--dark);
          padding: 16px 40px; border-radius: 2px; text-decoration: none;
          transition: all 0.3s; box-shadow: 0 8px 40px rgba(245,240,232,0.12);
        }
        .btn-primary-lg:hover { background: var(--cream); box-shadow: 0 12px 48px rgba(245,240,232,0.2); }
        .btn-ghost-lg {
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 400;
          letter-spacing: 0.14em; text-transform: uppercase; color: rgba(245,240,232,0.45);
          text-decoration: none; transition: color 0.3s; display: flex; align-items: center; gap: 8px;
        }
        .btn-ghost-lg:hover { color: var(--ivory); }
        .hero-scroll {
          position: absolute; bottom: 32px; right: 32px; z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 400;
          letter-spacing: 0.2em; text-transform: uppercase; color: rgba(245,240,232,0.2);
        }
        .hero-scroll-line {
          width: 1px; height: 48px;
          background: linear-gradient(to bottom, rgba(245,240,232,0.2), transparent);
          animation: scrollline 2s ease-in-out infinite;
        }
        @keyframes scrollline {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }

        /* ── MARQUEE ── */
        .marquee-wrap {
          border-top: 1px solid rgba(245,240,232,0.06);
          border-bottom: 1px solid rgba(245,240,232,0.06);
          padding: 18px 0; overflow: hidden; background: var(--dark2);
        }
        .marquee-track {
          display: flex; gap: 0; white-space: nowrap;
          animation: marquee 30s linear infinite;
        }
        .marquee-item {
          display: inline-flex; align-items: center; gap: 32px; padding: 0 32px;
          font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 400;
          font-style: italic; color: rgba(245,240,232,0.25); letter-spacing: 0.06em;
          flex-shrink: 0;
        }
        .marquee-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--blush); opacity: 0.5; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── SECTION BASE ── */
        .section { padding: 120px 32px; }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-tag {
          font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 500;
          letter-spacing: 0.24em; text-transform: uppercase; color: var(--blush);
          margin-bottom: 24px; display: flex; align-items: center; gap: 12px;
        }
        .section-tag::before { content: ''; width: 20px; height: 1px; background: var(--blush); }
        .section-h2 {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(40px, 7vw, 80px); line-height: 0.95;
          letter-spacing: -1.5px; color: var(--ivory); margin-bottom: 24px;
        }
        .section-h2 em { font-style: italic; color: var(--blush); font-weight: 300; }
        .section-sub {
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 300;
          line-height: 1.85; color: rgba(245,240,232,0.4); max-width: 480px;
          letter-spacing: 0.02em;
        }

        /* ── PAIN / BEFORE ── */
        .pain { background: var(--dark); }
        .pain-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .pain-list { margin-top: 48px; display: flex; flex-direction: column; gap: 0; }
        .pain-item {
          display: flex; gap: 20px; align-items: flex-start;
          padding: 24px 0; border-bottom: 1px solid rgba(245,240,232,0.05);
        }
        .pain-item:first-child { border-top: 1px solid rgba(245,240,232,0.05); }
        .pain-num {
          font-family: 'Cormorant Garamond', serif; font-size: 11px; font-weight: 300;
          color: rgba(245,240,232,0.2); letter-spacing: 0.1em; flex-shrink: 0; margin-top: 2px;
        }
        .pain-text { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 300; color: rgba(245,240,232,0.35); line-height: 1.7; letter-spacing: 0.02em; }
        .pain-text strong { color: rgba(245,240,232,0.6); font-weight: 500; }
        .pain-right { padding-top: 80px; }
        .pain-quote {
          font-family: 'Cormorant Garamond', serif; font-size: clamp(24px, 4vw, 36px);
          font-weight: 300; font-style: italic; line-height: 1.4;
          color: var(--ivory); margin-bottom: 32px; letter-spacing: -0.5px;
        }
        .pain-quote em { color: var(--blush); }

        /* ── DIFF / TRANSFORMATION ── */
        .diff { background: var(--dark2); border-top: 1px solid rgba(245,240,232,0.04); }
        .diff-grid { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 0; margin-top: 64px; }
        .diff-divider { background: rgba(245,240,232,0.06); }
        .diff-col { padding: 0 48px; }
        .diff-col:first-child { padding-left: 0; }
        .diff-col:last-child { padding-right: 0; }
        .diff-col-label {
          font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 36px;
          padding-bottom: 20px; border-bottom: 1px solid rgba(245,240,232,0.06);
        }
        .diff-col-before .diff-col-label { color: rgba(245,240,232,0.2); }
        .diff-col-after .diff-col-label { color: var(--blush); }
        .diff-row { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 20px; }
        .diff-icon { font-size: 12px; flex-shrink: 0; margin-top: 2px; opacity: 0.5; }
        .diff-col-after .diff-icon { opacity: 1; }
        .diff-text {
          font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 300;
          line-height: 1.65; letter-spacing: 0.02em;
        }
        .diff-col-before .diff-text { color: rgba(245,240,232,0.25); }
        .diff-col-after .diff-text { color: rgba(245,240,232,0.75); }

        /* ── REALISM ENGINE ── */
        .realism { background: var(--dark); position: relative; overflow: hidden; }
        .realism::before {
          content: ''; position: absolute;
          top: -200px; right: -200px; width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(107,26,42,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .realism-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .realism-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(245,240,232,0.05); border: 1px solid rgba(245,240,232,0.05); margin-top: 48px; }
        .realism-card {
          background: var(--dark); padding: 28px 24px;
          transition: background 0.4s;
        }
        .realism-card:hover { background: var(--dark3); }
        .realism-card-icon { font-size: 18px; margin-bottom: 14px; display: block; }
        .realism-card-title {
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500;
          color: var(--ivory); margin-bottom: 8px; letter-spacing: 0.04em;
        }
        .realism-card-desc {
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 300;
          color: rgba(245,240,232,0.35); line-height: 1.7; letter-spacing: 0.02em;
        }
        .realism-tag {
          display: inline-block; margin-top: 12px;
          font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--blush);
        }
        .realism-right { padding-top: 120px; }

        /* ── MOTION PSYCHOLOGY ── */
        .motion { background: var(--dark2); border-top: 1px solid rgba(245,240,232,0.04); }
        .motion-header { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-bottom: 80px; align-items: end; }
        .motion-principles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(245,240,232,0.05); }
        .motion-card {
          background: var(--dark2); padding: 36px 28px;
          border-top: 2px solid transparent; transition: border-color 0.4s;
        }
        .motion-card:hover { border-top-color: var(--blush); }
        .motion-card-num {
          font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 300;
          color: rgba(245,240,232,0.06); line-height: 1; margin-bottom: 20px; letter-spacing: -2px;
        }
        .motion-card-title {
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500;
          color: var(--ivory); margin-bottom: 10px; letter-spacing: 0.04em;
        }
        .motion-card-desc {
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 300;
          color: rgba(245,240,232,0.35); line-height: 1.75; letter-spacing: 0.02em;
        }

        /* ── GENERATE FLOW ── */
        .flow { background: var(--dark); border-top: 1px solid rgba(245,240,232,0.04); }
        .flow-ui {
          margin-top: 64px;
          background: var(--dark2); border: 1px solid rgba(245,240,232,0.07);
          border-radius: 4px; overflow: hidden;
        }
        .flow-ui-bar {
          display: flex; align-items: center; gap: 8px; padding: 14px 20px;
          border-bottom: 1px solid rgba(245,240,232,0.06); background: var(--dark3);
        }
        .flow-dot { width: 8px; height: 8px; border-radius: 50%; }
        .flow-url {
          flex: 1; background: rgba(245,240,232,0.04); border-radius: 2px;
          padding: 5px 12px; font-family: 'Inter', sans-serif; font-size: 10px;
          color: rgba(245,240,232,0.25); letter-spacing: 0.04em; margin: 0 12px;
        }
        .flow-body { display: grid; grid-template-columns: 280px 1fr; min-height: 480px; }
        .flow-input {
          border-right: 1px solid rgba(245,240,232,0.06); padding: 32px 24px;
          display: flex; flex-direction: column; gap: 16px;
        }
        .flow-input-label {
          font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: rgba(245,240,232,0.2);
          margin-bottom: 4px;
        }
        .flow-input-field {
          background: rgba(245,240,232,0.04); border: 1px solid rgba(245,240,232,0.08);
          border-radius: 2px; padding: 12px 14px;
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 300;
          color: rgba(245,240,232,0.6); line-height: 1.5;
        }
        .flow-input-field.active { border-color: rgba(212,160,168,0.4); color: var(--ivory); }
        .flow-generate {
          margin-top: auto; background: var(--ivory); color: var(--dark);
          text-align: center; padding: 14px; border-radius: 2px;
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
        }
        .flow-output { padding: 32px; display: flex; flex-direction: column; gap: 16px; }
        .flow-output-tab {
          display: flex; align-items: flex-start; gap: 16px; padding: 16px;
          border: 1px solid rgba(245,240,232,0.06); border-radius: 2px;
          transition: border-color 0.3s;
        }
        .flow-output-tab:hover { border-color: rgba(212,160,168,0.2); }
        .flow-output-tab-icon {
          font-size: 14px; flex-shrink: 0; margin-top: 1px;
        }
        .flow-output-tab-title {
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--blush);
          margin-bottom: 6px;
        }
        .flow-output-tab-content {
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 300;
          color: rgba(245,240,232,0.4); line-height: 1.65;
        }
        .flow-output-tab-content strong { color: rgba(245,240,232,0.7); font-weight: 400; }

        /* ── FOR WHO ── */
        .forwho { background: var(--dark2); border-top: 1px solid rgba(245,240,232,0.04); }
        .forwho-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(245,240,232,0.05); margin-top: 64px; }
        .forwho-card {
          background: var(--dark2); padding: 36px 24px;
          border-top: 1px solid transparent; transition: all 0.4s;
        }
        .forwho-card:hover { background: var(--dark3); border-top-color: var(--blush); }
        .forwho-emoji { font-size: 24px; display: block; margin-bottom: 20px; }
        .forwho-title {
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500;
          color: var(--ivory); margin-bottom: 10px; letter-spacing: 0.04em;
        }
        .forwho-desc {
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 300;
          color: rgba(245,240,232,0.35); line-height: 1.75; letter-spacing: 0.02em;
        }

        /* ── PLATFORMS ── */
        .platforms { background: var(--dark); border-top: 1px solid rgba(245,240,232,0.04); padding: 80px 32px; }
        .platforms-inner { max-width: 1100px; margin: 0 auto; }
        .platforms-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 40px; }
        .platform-pill {
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 400;
          letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid rgba(245,240,232,0.1); color: rgba(245,240,232,0.35);
          padding: 9px 18px; border-radius: 1px; transition: all 0.3s;
        }
        .platform-pill:hover { border-color: var(--blush); color: var(--blush); }

        /* ── FINAL CTA ── */
        .cta-final {
          min-height: 80vh; display: flex; flex-direction: column;
          justify-content: center; align-items: center; text-align: center;
          padding: 120px 32px; position: relative; overflow: hidden;
          background: var(--dark);
        }
        .cta-final::before {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(107,26,42,0.2) 0%, transparent 65%);
          pointer-events: none;
        }
        .cta-final-content { position: relative; z-index: 2; max-width: 700px; }
        .cta-final-h2 {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(48px, 9vw, 100px); line-height: 0.9;
          letter-spacing: -2px; color: var(--ivory); margin-bottom: 32px;
        }
        .cta-final-h2 em { font-style: italic; color: var(--blush); display: block; font-weight: 300; }
        .cta-final-sub {
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 300;
          color: rgba(245,240,232,0.35); margin-bottom: 48px; line-height: 1.8; letter-spacing: 0.02em;
        }
        .cta-final-note {
          margin-top: 24px; font-family: 'Inter', sans-serif; font-size: 10px;
          font-weight: 300; letter-spacing: 0.1em; color: rgba(245,240,232,0.2);
          text-transform: uppercase;
        }

        /* ── FOOTER ── */
        .footer {
          border-top: 1px solid rgba(245,240,232,0.06); padding: 40px 32px;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 16px; background: var(--dark);
        }
        .footer-logo {
          font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 13px;
          color: var(--ivory); letter-spacing: 0.18em; text-transform: uppercase;
        }
        .footer-logo em { color: var(--blush); font-style: italic; font-weight: 300; }
        .footer-links { display: flex; gap: 24px; }
        .footer-link {
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 300;
          letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,240,232,0.2);
          text-decoration: none; transition: color 0.3s;
        }
        .footer-link:hover { color: var(--ivory); }
        .footer-copy {
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 300;
          color: rgba(245,240,232,0.15); letter-spacing: 0.08em;
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .nav { padding: 18px 20px; }
          .nav-link { display: none; }
          .sticky-cta { display: block; }

          .hero { padding: 0 20px 100px; min-height: 100svh; justify-content: flex-end; }
          .hero-h1 { letter-spacing: -1.5px; }
          .hero-ctas { flex-direction: column; width: 100%; }
          .btn-primary-lg { text-align: center; width: 100%; }
          .btn-ghost-lg { justify-content: center; }
          .hero-scroll { display: none; }

          .section { padding: 80px 20px; }

          .pain-layout { grid-template-columns: 1fr; gap: 0; }
          .pain-right { padding-top: 48px; }

          .diff-grid { grid-template-columns: 1fr; }
          .diff-divider { display: none; }
          .diff-col { padding: 0; }
          .diff-col:first-child { margin-bottom: 40px; }

          .realism-layout { grid-template-columns: 1fr; gap: 0; }
          .realism-right { padding-top: 48px; }
          .realism-grid { grid-template-columns: 1fr; }

          .motion-header { grid-template-columns: 1fr; gap: 32px; margin-bottom: 48px; }
          .motion-principles { grid-template-columns: 1fr; }

          .flow-body { grid-template-columns: 1fr; }
          .flow-input { border-right: none; border-bottom: 1px solid rgba(245,240,232,0.06); }

          .forwho-grid { grid-template-columns: 1fr 1fr; }

          .footer { flex-direction: column; align-items: flex-start; }
          .footer-links { flex-wrap: wrap; gap: 16px; }

          .cta-final { padding: 100px 20px 140px; min-height: auto; }
        }

        @media (max-width: 480px) {
          .forwho-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-logo inter">Super<em>cool</em></div>
        <div className="nav-r">
          <a href="/sign-in" className="nav-link">Sign in</a>
          <a href="/pricing" className="nav-link">Pricing</a>
          <a href="/generate" className="nav-cta inter">Start Free</a>
        </div>
      </nav>

      {/* ── STICKY MOBILE CTA ── */}
      <div className="sticky-cta">
        <a href="/generate" className="sticky-cta-btn inter">⚡ Generate Free — No Card</a>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />
        <div className="hero-content">
          <div className="hero-kicker inter">
            The AI Cinematic Creator OS
          </div>
          <h1 className="hero-h1 cg">
            <strong>Your content.</strong>
            <em>Cinematically</em>
            real.
          </h1>
          <p className="hero-sub inter">
            From idea to campaign-ready content in under 60 seconds.
            Briefings. Image prompts. Reel direction. Captions. All of it.
            Built on human realism — not generic AI.
          </p>
          <div className="hero-ctas">
            <Link href="/generate" className="btn-primary-lg inter">Generate Free Now</Link>
            <Link href="/pricing" className="btn-ghost-lg inter">
              View Pricing <span style={{ opacity: 0.4 }}>→</span>
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span className="inter">Scroll</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex', flexShrink: 0 }}>
              {['Human Realism Engine™', 'Motion Psychology™', 'GTA-Style Behavioral Realism', 'Cinematic Campaign Briefings', 'Anti-Generic AI Output', 'Biological Movement Systems', 'Identity Lock™', 'Emotion Architecture', '60-Second Campaigns', 'Creator OS'].map((t, j) => (
                <span key={j} className="marquee-item cg">
                  {t}
                  <span className="marquee-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── PAIN ── */}
      <section className="section pain">
        <div className="section-inner">
          <div className="pain-layout">
            <div>
              <div className="section-tag inter">The reality</div>
              <h2 className="section-h2 cg">Your content<br /><em>is suffering.</em></h2>
              <div className="pain-list">
                {[
                  { title: 'Content burnout', desc: 'You\'ve run out of ideas. The blank page wins every day. Creative paralysis is real — and expensive.' },
                  { title: 'Generic AI output', desc: 'Your AI content looks like everyone else\'s. Robotic faces, stiff motion, dead eyes. Scroll-past energy.' },
                  { title: 'No direction', desc: 'You know what to post but not how to make it feel cinematic, believable, or emotionally resonant.' },
                  { title: 'Inconsistent identity', desc: 'Your brand changes every week. No visual signature. No recognisable aesthetic. Just content for the algorithm.' },
                  { title: 'Zero engagement', desc: 'Posting consistently and getting nothing back. The problem isn\'t frequency — it\'s quality and feeling.' },
                ].map((p, i) => (
                  <div className="pain-item" key={p.title}>
                    <span className="pain-num inter">0{i + 1}</span>
                    <div className="pain-text inter">
                      <strong>{p.title} — </strong>{p.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pain-right">
              <div className="pain-quote cg">
                "Most AI content doesn't fail because of the tool.<br />It fails because there was <em>no direction</em> behind it."
              </div>
              <p className="section-sub inter" style={{ fontSize: '13px' }}>
                SuperCool isn't a prompt generator. It's a creative operating system that thinks like a cinematic director — and builds campaigns that feel emotionally real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRANSFORMATION ── */}
      <section className="section diff">
        <div className="section-inner">
          <div className="section-tag inter">The transformation</div>
          <h2 className="section-h2 cg">Before.<br /><em>After.</em></h2>
          <div className="diff-grid">
            <div className="diff-col diff-col-before">
              <div className="diff-col-label inter">Without SuperCool</div>
              {[
                'Hours spent guessing what to post',
                'Robotic AI humans with dead eyes',
                'Generic prompts, generic output',
                'Content that looks AI-generated',
                'No brand identity or visual signature',
                'Low engagement, no emotional connection',
                'Creative burnout every single week',
              ].map(t => (
                <div className="diff-row" key={t}>
                  <span className="diff-icon">—</span>
                  <span className="diff-text inter">{t}</span>
                </div>
              ))}
            </div>
            <div className="diff-divider" />
            <div className="diff-col diff-col-after">
              <div className="diff-col-label inter">With SuperCool</div>
              {[
                'Full campaign ready in 60 seconds',
                'Believable human motion and skin realism',
                'Cinematic direction built into every brief',
                'Content that looks filmed, not generated',
                'Locked creator identity across every post',
                'Emotional storytelling that drives results',
                'Creative confidence — never blank again',
              ].map(t => (
                <div className="diff-row" key={t}>
                  <span className="diff-icon" style={{ color: 'var(--blush)' }}>↗</span>
                  <span className="diff-text inter">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HUMAN REALISM ENGINE ── */}
      <section className="section realism">
        <div className="section-inner">
          <div className="realism-layout">
            <div>
              <div className="section-tag inter">Human Realism Engine™</div>
              <h2 className="section-h2 cg">We engineer<br /><em>believable</em><br />humans.</h2>
              <p className="section-sub inter" style={{ marginTop: '24px' }}>
                Every AI character generated through SuperCool is built on a biological realism system — the same principles that make Rockstar Games characters feel alive. Not avatars. Not templates. Humans.
              </p>
            </div>
            <div className="realism-right">
              <div className="realism-grid">
                {[
                  { icon: '👁️', title: 'Eye Behaviour System', desc: 'Saccadic movement, lid weight, dilation response. Eyes that actually see — not eyes that stare.', tag: 'Ocular Realism' },
                  { icon: '🫁', title: 'Breathing Architecture', desc: 'Chest rise, clavicle shift, subtle shoulder movement. The character breathes between every line.', tag: 'Respiratory Motion' },
                  { icon: '🤝', title: 'Asymmetric Movement', desc: 'Real humans don\'t move symmetrically. Micro-asymmetry is built into every gesture and expression.', tag: 'Natural Imperfection' },
                  { icon: '🎭', title: 'Micro-Expression Engine', desc: 'Involuntary facial movements — jaw tension, nostril flare, brow microlifts — before the emotion lands.', tag: 'Emotional Leakage' },
                  { icon: '👗', title: 'Fabric Physics', desc: 'Clothing moves with the body. Gravity, weight, texture response — material that behaves like material.', tag: 'Procedural Fabric' },
                  { icon: '⏱️', title: 'Behavioural Delay', desc: 'Real humans hesitate. Pause. Self-correct. Timing imperfection is the signature of a real person.', tag: 'Temporal Realism' },
                  { icon: '🧬', title: 'Skin Truth System', desc: 'Pore depth, subsurface scattering, oil variation, flush response. Skin that reacts to light correctly.', tag: 'Biological Texture' },
                  { icon: '🎬', title: 'GTA-Style Realism', desc: 'Procedural NPC-level movement systems applied to creator characters. Inhabited, not performed.', tag: 'Motion Capture Logic' },
                ].map(r => (
                  <div className="realism-card" key={r.title}>
                    <span className="realism-card-icon">{r.icon}</span>
                    <div className="realism-card-title inter">{r.title}</div>
                    <div className="realism-card-desc inter">{r.desc}</div>
                    <span className="realism-tag inter">{r.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOTION PSYCHOLOGY ── */}
      <section className="section motion">
        <div className="section-inner">
          <div className="motion-header">
            <div>
              <div className="section-tag inter">Motion Psychology™</div>
              <h2 className="section-h2 cg">Movement<br /><em>engineered</em><br />to retain.</h2>
            </div>
            <div>
              <p className="section-sub inter">
                Every camera angle, cut timing, and body movement in your brief is calculated to hold attention, trigger emotion, and drive action — based on how the human nervous system processes visual motion.
              </p>
            </div>
          </div>
          <div className="motion-principles">
            {[
              { n: '01', title: 'Attention Engineering', desc: 'The first 0.3 seconds determine everything. SuperCool briefs are built to interrupt the scroll with pattern-breaking visual information that forces attention.' },
              { n: '02', title: 'Retention Pacing', desc: 'Cognitive load, visual novelty cycles, and tension-release pacing — structured to hold watch-through from first frame to CTA.' },
              { n: '03', title: 'Subconscious Realism', desc: 'Your brain detects fake humans in milliseconds. Our realism systems neutralise the uncanny valley — so trust is felt, not decided.' },
              { n: '04', title: 'Platform-Native Movement', desc: 'TikTok physics, Reels pacing, Shorts rhythm — each brief is calibrated to how movement performs on each specific platform.' },
              { n: '05', title: 'Emotional Camera Behaviour', desc: 'Camera distance, angle, lens choice and movement direction are psychological tools. SuperCool assigns each based on the emotional outcome required.' },
              { n: '06', title: 'Narrative Escalation', desc: 'Desire → friction → release → aspiration. Every campaign follows emotional escalation architecture — the same structure used in luxury advertising.' },
            ].map(m => (
              <div className="motion-card" key={m.n}>
                <div className="motion-card-num cg">{m.n}</div>
                <div className="motion-card-title inter">{m.title}</div>
                <div className="motion-card-desc inter">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GENERATE FLOW ── */}
      <section className="section flow">
        <div className="section-inner">
          <div className="section-tag inter">The experience</div>
          <h2 className="section-h2 cg">One idea.<br /><em>Full campaign.</em><br />60 seconds.</h2>
          <div className="flow-ui">
            <div className="flow-ui-bar">
              <div className="flow-dot" style={{ background: '#FF5F57' }} />
              <div className="flow-dot" style={{ background: '#FFBD2E' }} />
              <div className="flow-dot" style={{ background: '#28CA41' }} />
              <div className="flow-url inter">supercoolinfluencer.com/generate</div>
            </div>
            <div className="flow-body">
              <div className="flow-input">
                <div>
                  <div className="flow-input-label inter">Your Idea</div>
                  <div className="flow-input-field active inter">"Luxury skincare morning routine. Soft natural light. Real skin texture. Confident, unhurried energy."</div>
                </div>
                <div>
                  <div className="flow-input-label inter">Platform</div>
                  <div className="flow-input-field inter">Instagram Reels + TikTok</div>
                </div>
                <div>
                  <div className="flow-input-label inter">Angle</div>
                  <div className="flow-input-field inter">Before vs After — Skin Transformation</div>
                </div>
                <div>
                  <div className="flow-input-label inter">Creator Style</div>
                  <div className="flow-input-field inter">Luxury lifestyle — minimal, cinematic</div>
                </div>
                <div className="flow-generate inter">⚡ Generate Campaign</div>
              </div>
              <div className="flow-output">
                {[
                  { icon: '🎬', title: 'Campaign Brief', content: '<strong>Concept:</strong> Morning ritual as devotion. Character wakes before the city. Soft amber. Real skin. No performance. Pure presence.' },
                  { icon: '🖼️', title: 'Image Prompt', content: '<strong>Seedance:</strong> "Close ECU, cheekbone to clavicle. Subsurface scattering active. Morning light from left. Skin pore depth 0.4. Nostril fill shadow. No symmetry lock."' },
                  { icon: '🎥', title: 'Reel Direction', content: '<strong>Scene 1 [0–3s]:</strong> Macro on eyelid opening. Blink delay 0.3s. Catch light enters iris. No cut. Hold.' },
                  { icon: '✍️', title: 'Caption + Hook', content: '<strong>Hook:</strong> "The AI skin that breaks the uncanny valley." Caption: Scientifically engineered. Emotionally real. This is what good looks like.' },
                  { icon: '#', title: 'Hashtags + Keywords', content: '#AICreator #SkinRealism #LuxuryContent #CinematicAI #MotionPsychology #ViralReels' },
                ].map(o => (
                  <div className="flow-output-tab" key={o.title}>
                    <span className="flow-output-tab-icon">{o.icon}</span>
                    <div>
                      <div className="flow-output-tab-title inter">{o.title}</div>
                      <div className="flow-output-tab-content inter" dangerouslySetInnerHTML={{ __html: o.content }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR WHO ── */}
      <section className="section forwho">
        <div className="section-inner">
          <div className="section-tag inter">This is built for</div>
          <h2 className="section-h2 cg">Every creator.<br /><em>Every brand.</em></h2>
          <div className="forwho-grid">
            {[
              { e: '🎬', title: 'AI Creators', desc: 'You create with AI tools and need output that doesn\'t look AI-generated. Realism is your competitive edge.' },
              { e: '💄', title: 'Beauty & Lifestyle', desc: 'Your niche is visual luxury. You need skin truth, texture, light behaviour. SuperCool was built with you first.' },
              { e: '👗', title: 'Fashion & Aesthetic', desc: 'Fabric physics, editorial composition, identity lock across every frame. Your aesthetic — consistent, cinematic.' },
              { e: '🛍️', title: 'Brand Owners', desc: 'Product ads that feel human. No production team. No weeks of creative. Brief → campaign in 60 seconds.' },
              { e: '📱', title: 'Content Agencies', desc: 'Scale output without scaling headcount. Generate client campaigns in minutes — not days.' },
              { e: '🌍', title: 'Luxury Lifestyle', desc: 'Your world is elevated. Your content should feel the same. Cinematic direction built into every single brief.' },
              { e: '🧠', title: 'Burned-Out Creators', desc: 'The blank page is over. SuperCool generates the idea, the direction, the prompts, and the copy. You just create.' },
              { e: '⚡', title: 'Fast Movers', desc: 'Trend moves fast. SuperCool moves faster. Idea to campaign-ready content before the moment passes.' },
            ].map(f => (
              <div className="forwho-card" key={f.title}>
                <span className="forwho-emoji">{f.e}</span>
                <div className="forwho-title inter">{f.title}</div>
                <div className="forwho-desc inter">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section className="platforms">
        <div className="platforms-inner">
          <div className="section-tag inter">Works with every tool</div>
          <h2 className="section-h2 cg" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '8px' }}>Your brief.<br /><em>Any platform.</em></h2>
          <div className="platforms-row">
            {['Seedance 2.0', 'Kling 1.6', 'Runway Gen-4', 'Midjourney', 'Flux', 'HeyGen', 'TikTok', 'Instagram Reels', 'YouTube Shorts', 'Facebook', 'Nano Banana', 'Enhancor'].map(p => (
              <span className="platform-pill inter" key={p}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="cta-final">
        <div className="cta-final-content">
          <h2 className="cta-final-h2 cg">
            Stop creating.
            <em>Start directing.</em>
          </h2>
          <p className="cta-final-sub inter">
            3 free campaigns. No credit card. No setup.<br />
            Just your idea — and 60 seconds.
          </p>
          <Link href="/generate" className="btn-primary-lg inter">
            Enter SuperCool
          </Link>
          <p className="cta-final-note inter">Human Realism Engine™ · Motion Psychology™ · Creator OS</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">Super<em>cool</em> Influencer</div>
        <div className="footer-links">
          <a href="/pricing" className="footer-link inter">Pricing</a>
          <a href="/generate" className="footer-link inter">Generate</a>
          <a href="/sign-in" className="footer-link inter">Sign in</a>
        </div>
        <div className="footer-copy inter">© 2026 SuperCool Influencer. All rights reserved.</div>
      </footer>
    </div>
  );
}
