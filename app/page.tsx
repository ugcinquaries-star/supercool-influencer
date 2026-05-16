import Link from "next/link";

export default function Home() {
  return (
    <div style={{ background: '#06060b', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontWeight: 800, fontSize: '18px' }}>super<span style={{ color: '#a78bfa' }}>cool</span> influencer</div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="/sign-in" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>Sign in</a>
          <a href="/generate" style={{ background: 'white', color: 'black', padding: '10px 20px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Start Free →</a>
        </div>
      </nav>
      <section style={{ textAlign: 'center', padding: '100px 48px 80px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', color: '#a78bfa', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: '100px', marginBottom: '32px' }}>
          ⚡ Alive Realism System — Velora Standard Prompts
        </div>
        <h1 style={{ fontSize: '72px', fontWeight: 800, lineHeight: 1, letterSpacing: '-3px', marginBottom: '24px' }}>
          AI UGC Production Briefs.<br /><span style={{ color: '#a78bfa' }}>Velora Standard.</span>
        </h1>
        <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}>
          Generate complete production briefs for Seedance, Kling, Runway, Midjourney and Flux — with full character identity lock, biological realism, scene direction, lighting, camera behavior and brand voice. In 60 seconds.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px' }}>
          <Link href="/generate" style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white', padding: '16px 36px', borderRadius: '100px', fontSize: '17px', fontWeight: 700, textDecoration: 'none' }}>⚡ Generate Free →</Link>
          <Link href="#features" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', padding: '16px 36px', borderRadius: '100px', fontSize: '17px', fontWeight: 500, textDecoration: 'none' }}>See how it works</Link>
        </div>
        <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { num: '5 Tools', label: 'Seedance · Kling · Runway · MJ · Flux' },
            { num: 'Alive Realism', label: 'Biological realism system built in' },
            { num: '60 Seconds', label: 'Full production brief generated' },
            { num: 'Velora Standard', label: 'Agency-grade output quality' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#a78bfa' }}>{s.num}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section id="features" style={{ padding: '80px 48px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
          {[
            { icon: '🧬', title: 'Biological Realism', desc: 'Blink schedules, micro-expressions, nervous system behavior, skin truth — built into every brief.' },
            { icon: '🔒', title: 'Identity Lock', desc: 'Character never drifts across frames. Face lock, body truth, outfit consistency enforced.' },
            { icon: '⚡', title: 'Seedance Master Brief', desc: 'Full production document — not a short prompt. Scene by scene, timestamp by timestamp.' },
            { icon: '🎬', title: 'Kling + Runway', desc: 'Separate complete master prompts for Kling 1.6 and Runway Gen-4. Ready to paste.' },
            { icon: '🎨', title: 'Midjourney + Flux', desc: 'Editorial image prompts with full parameters. Plug directly into MJ or Flux.' },
            { icon: '🤖', title: 'Brand Identity Bot', desc: 'Hooks, captions, scripts and CTAs generated alongside every visual brief.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0d0d14', padding: '32px 24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{f.title}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '80px 48px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ec4899', fontWeight: 600, marginBottom: '16px' }}>Special Mode</div>
        <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-2px', marginBottom: '16px' }}>UGC Ads Mode</h2>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', marginBottom: '40px', lineHeight: 1.6 }}>A dedicated mode for AI UGC ad creation. Choose your ad angle, UGC style, product category, and conversion goal.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {['Before vs After', 'GRWM', 'Unboxing', 'Testimonial', 'Problem Solution', 'POV Storytime', 'Transformation', 'Myth Busting', 'TikTok Made Me Buy It', 'Honest Review'].map(angle => (
            <span key={angle} style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.25)', color: '#f9a8d4', padding: '8px 16px', borderRadius: '100px', fontSize: '13px' }}>{angle}</span>
          ))}
        </div>
      </section>
      <div style={{ margin: '0 48px 80px', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '24px', padding: '80px 48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-2px', marginBottom: '16px' }}>Start generating.<br />Velora standard.</h2>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', marginBottom: '40px' }}>3 free briefs on signup. No credit card.</p>
        <Link href="/generate" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white', padding: '18px 48px', borderRadius: '100px', fontSize: '18px', fontWeight: 700, textDecoration: 'none' }}>⚡ Generate Free Now →</Link>
      </div>
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
        <div style={{ fontWeight: 800 }}>super<span style={{ color: '#a78bfa' }}>cool</span> influencer</div>
        <div>© 2026 SuperCool Influencer. All rights reserved.</div>
      </footer>
    </div>
  );
}