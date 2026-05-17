import Link from "next/link";

export default function Home() {
  return (
    <div style={{ background: '#06060b', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <style>{`
        .nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .nav-logo { font-weight: 800; font-size: 17px; white-space: nowrap; }
        .nav-links { display: flex; gap: 12px; align-items: center; }
        .hero { text-align: center; padding: 60px 24px 60px; }
        .hero-badge { display: inline-block; background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.4); color: #a78bfa; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 6px 14px; border-radius: 100px; margin-bottom: 28px; }
        .hero-h1 { font-size: clamp(36px, 10vw, 72px); font-weight: 800; line-height: 1.05; letter-spacing: -2px; margin-bottom: 20px; }
        .hero-p { font-size: clamp(15px, 4vw, 20px); color: rgba(255,255,255,0.5); max-width: 580px; margin: 0 auto 36px; line-height: 1.6; }
        .hero-ctas { display: flex; gap: 12px; justify-content: center; margin-bottom: 52px; flex-wrap: wrap; }
        .hero-cta-primary { background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; padding: 14px 28px; border-radius: 100px; font-size: 16px; font-weight: 700; text-decoration: none; }
        .hero-cta-secondary { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: white; padding: 14px 28px; border-radius: 100px; font-size: 16px; font-weight: 500; text-decoration: none; }
        .hero-stats { display: flex; gap: 32px; justify-content: center; flex-wrap: wrap; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; overflow: hidden; }
        .features-section { padding: 60px 24px; max-width: 1100px; margin: 0 auto; }
        .ugc-section { padding: 60px 24px; max-width: 900px; margin: 0 auto; text-align: center; }
        .cta-section { margin: 0 16px 60px; background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.3); border-radius: 24px; padding: 60px 24px; text-align: center; }
        .cta-h2 { font-size: clamp(28px, 7vw, 48px); font-weight: 800; letter-spacing: -1px; margin-bottom: 14px; }
        .footer { border-top: 1px solid rgba(255,255,255,0.07); padding: 24px; display: flex; justify-content: space-between; align-items: center; color: rgba(255,255,255,0.4); font-size: 13px; flex-wrap: wrap; gap: 8px; }
        @media (max-width: 640px) {
          .features-grid { grid-template-columns: 1fr; }
          .hero-ctas { flex-direction: column; align-items: center; }
          .hero-cta-primary, .hero-cta-secondary { width: 100%; max-width: 280px; text-align: center; }
          .footer { flex-direction: column; text-align: center; }
        }
      `}</style>

      <nav className="nav">
        <div className="nav-logo">super<span style={{ color: '#a78bfa' }}>cool</span> influencer</div>
        <div className="nav-links">
          <a href="/sign-in" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>Sign in</a>
          <a href="/generate" style={{ background: 'white', color: 'black', padding: '9px 18px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>Start Free →</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">⚡ Alive Realism System — Velora Standard Prompts</div>
        <h1 className="hero-h1">
          AI UGC Production Briefs.<br /><span style={{ color: '#a78bfa' }}>Velora Standard.</span>
        </h1>
        <p className="hero-p">
          Generate complete production briefs for Seedance, Kling, Runway, Midjourney and Flux — with full character identity lock, biological realism, scene direction, lighting, camera behavior and brand voice. In 60 seconds.
        </p>
        <div className="hero-ctas">
          <Link href="/generate" className="hero-cta-primary">⚡ Generate Free →</Link>
          <Link href="#features" className="hero-cta-secondary">See how it works</Link>
        </div>
        <div className="hero-stats">
          {[
            { num: '5 Tools', label: 'Seedance · Kling · Runway · MJ · Flux' },
            { num: 'Alive Realism', label: 'Biological realism system built in' },
            { num: '60 Seconds', label: 'Full production brief generated' },
            { num: 'Velora Standard', label: 'Agency-grade output quality' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#a78bfa' }}>{s.num}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="features-grid">
          {[
            { icon: '🧬', title: 'Biological Realism', desc: 'Blink schedules, micro-expressions, nervous system behavior, skin truth — built into every brief.' },
            { icon: '🔒', title: 'Identity Lock', desc: 'Character never drifts across frames. Face lock, body truth, outfit consistency enforced.' },
            { icon: '⚡', title: 'Seedance Master Brief', desc: 'Full production document — not a short prompt. Scene by scene, timestamp by timestamp.' },
            { icon: '🎬', title: 'Kling + Runway', desc: 'Separate complete master prompts for Kling 1.6 and Runway Gen-4. Ready to paste.' },
            { icon: '🎨', title: 'Midjourney + Flux', desc: 'Editorial image prompts with full parameters. Plug directly into MJ or Flux.' },
            { icon: '🤖', title: 'Brand Identity Bot', desc: 'Hooks, captions, scripts and CTAs generated alongside every visual brief.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0d0d14', padding: '28px 22px' }}>
              <div style={{ fontSize: '26px', marginBottom: '10px' }}>{f.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{f.title}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="ugc-section">
        <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ec4899', fontWeight: 600, marginBottom: '14px' }}>Special Mode</div>
        <h2 style={{ fontSize: 'clamp(28px, 8vw, 48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '14px' }}>UGC Ads Mode</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px', lineHeight: 1.6 }}>A dedicated mode for AI UGC ad creation. Choose your ad angle, UGC style, product category, and conversion goal.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {['Before vs After', 'GRWM', 'Unboxing', 'Testimonial', 'Problem Solution', 'POV Storytime', 'Transformation', 'Myth Busting', 'TikTok Made Me Buy It', 'Honest Review'].map(angle => (
            <span key={angle} style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.25)', color: '#f9a8d4', padding: '7px 14px', borderRadius: '100px', fontSize: '13px' }}>{angle}</span>
          ))}
        </div>
      </section>

      <div className="cta-section">
        <h2 className="cta-h2">Start generating.<br />Velora standard.</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>3 free briefs on signup. No credit card.</p>
        <Link href="/generate" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white', padding: '16px 40px', borderRadius: '100px', fontSize: '17px', fontWeight: 700, textDecoration: 'none' }}>⚡ Generate Free Now →</Link>
      </div>

      <footer className="footer">
        <div style={{ fontWeight: 800 }}>super<span style={{ color: '#a78bfa' }}>cool</span> influencer</div>
        <div>© 2026 SuperCool Influencer. All rights reserved.</div>
      </footer>
    </div>
  );
}
