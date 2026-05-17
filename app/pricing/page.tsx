'use client';
import { useUser } from '@clerk/nextjs';

export default function PricingPage() {
  const { isSignedIn } = useUser();

  const handleCheckout = async (plan: string) => {
    if (!isSignedIn) {
      window.location.href = '/sign-in';
      return;
    }
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert(data.error || 'Something went wrong');
  };

  const plans = [
    { id: 'starter', name: 'Starter', price: '$9', period: 'one-time', credits: '5 briefs', desc: 'Try it out. No commitment.', color: '#D4AF87', features: ['5 production briefs', 'All 8 output tabs', 'Seedance + Kling + Runway', 'Brand Bot + Calendar', 'Nano Banana prompts'], popular: false },
    { id: 'creator', name: 'Creator', price: '$29', period: '/month', credits: '30 briefs/mo', desc: 'For serious content creators.', color: '#D4AF87', features: ['30 production briefs/month', 'All 8 output tabs', 'Priority generation', 'Brand Bot + Calendar', 'Cancel anytime'], popular: true },
    { id: 'agency', name: 'Agency', price: '$79', period: '/month', credits: 'Unlimited', desc: 'For agencies and power users.', color: '#F2AFBC', features: ['Unlimited briefs', 'All 8 output tabs', 'Priority generation', 'Client-ready exports', 'Cancel anytime'], popular: false },
  ];

  return (
    <div style={{ background: '#0A0608', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <style>{`
        .pricing-wrap { padding: 80px 48px 60px; text-align: center; }
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1000px; margin: 0 auto 40px; }
        .price-val { font-size: 40px; font-weight: 800; line-height: 1; margin-bottom: 4px; }
        .price-period { font-size: 15px; color: rgba(255,255,255,0.4); font-weight: 400; }
        @media (max-width: 768px) {
          .pricing-wrap { padding: 60px 20px 60px; }
          .pricing-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto 40px; }
          .price-val { font-size: 48px; }
        }
      `}</style>
      <div className="pricing-wrap">
        <div style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#D4AF87', fontWeight: 600, marginBottom: '16px' }}>Pricing</div>
        <h1 style={{ fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>Simple, honest pricing.</h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginBottom: '56px' }}>No fluff. Pay for what you use.</p>

        <div className="pricing-grid">
          {plans.map(plan => (
            <div key={plan.id} style={{ background: plan.popular ? 'rgba(158,24,43,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${plan.popular ? 'rgba(158,24,43,0.5)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '16px', padding: '28px 24px', position: 'relative', textAlign: 'left' as const }}>
              {plan.popular && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #9E182B, #D4AF87)', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 16px', borderRadius: '100px', whiteSpace: 'nowrap' as const, letterSpacing: '0.08em' }}>MOST POPULAR</div>}
              <div style={{ color: plan.color, fontWeight: 700, fontSize: '14px', marginBottom: '10px' }}>{plan.name}</div>
              <div className="price-val">{plan.price}<span className="price-period">{plan.period}</span></div>
              <div style={{ color: plan.color, fontWeight: 700, fontSize: '13px', margin: '10px 0 6px' }}>{plan.credits}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '22px' }}>{plan.desc}</div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px', marginBottom: '28px' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', display: 'flex', gap: '8px', alignItems: 'flex-start' as const }}>
                    <span style={{ color: plan.color, flexShrink: 0, marginTop: '1px' }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleCheckout(plan.id)}
                style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', background: plan.popular ? 'linear-gradient(135deg, #9E182B, #D4AF87)' : 'rgba(255,255,255,0.08)', color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                Get {plan.name} →
              </button>
            </div>
          ))}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
          Payments powered by Stripe. Cancel anytime. No hidden fees.
        </div>
      </div>
    </div>
  );
}
