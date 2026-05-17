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
    { id: 'starter', name: 'Starter', price: '$9', period: 'one-time', credits: '5 briefs', desc: 'Try it out. No commitment.', color: '#6ee7b7', features: ['5 production briefs', 'All 8 output tabs', 'Seedance + Kling + Runway', 'Brand Bot + Calendar', 'Nano Banana prompts'], popular: false },
    { id: 'creator', name: 'Creator', price: '$29', period: '/month', credits: '30 briefs/mo', desc: 'For serious content creators.', color: '#a78bfa', features: ['30 production briefs/month', 'All 8 output tabs', 'Priority generation', 'Brand Bot + Calendar', 'Cancel anytime'], popular: true },
    { id: 'agency', name: 'Agency', price: '$79', period: '/month', credits: 'Unlimited', desc: 'For agencies and power users.', color: '#f9a8d4', features: ['Unlimited briefs', 'All 8 output tabs', 'Priority generation', 'Client-ready exports', 'Cancel anytime'], popular: false },
  ];

  return (
    <div style={{ background: '#06060b', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <style>{`
        .pricing-wrap { padding: 60px 20px 40px; text-align: center; }
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1000px; margin: 0 auto 40px; }
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr; max-width: 400px; }
          .pricing-wrap { padding: 48px 16px 32px; }
        }
      `}</style>

      <div className="pricing-wrap">
        <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a78bfa', fontWeight: 600, marginBottom: '14px' }}>Pricing</div>
        <h1 style={{ fontSize: 'clamp(28px, 8vw, 48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '12px' }}>Simple, honest pricing.</h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginBottom: '48px' }}>No fluff. Pay for what you use.</p>

        <div className="pricing-grid">
          {plans.map(plan => (
            <div key={plan.id} style={{ background: plan.popular ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${plan.popular ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '20px', padding: '28px 20px', position: 'relative', textAlign: 'left' }}>
              {plan.popular && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 16px', borderRadius: '100px', whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
              <div style={{ color: plan.color, fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>{plan.name}</div>
              <div style={{ fontSize: '38px', fontWeight: 800, marginBottom: '4px', lineHeight: 1 }}>{plan.price}<span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>{plan.period}</span></div>
              <div style={{ color: plan.color, fontWeight: 700, fontSize: '13px', marginBottom: '6px', marginTop: '8px' }}>{plan.credits}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>{plan.desc}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: plan.color, flexShrink: 0 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleCheckout(plan.id)}
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: plan.popular ? 'linear-gradient(135deg, #7c3aed, #ec4899)' : 'rgba(255,255,255,0.08)', color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                Get {plan.name} →
              </button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '32px', color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
          Payments powered by Stripe. Cancel anytime. No hidden fees.
        </div>
      </div>
    </div>
  );
}
