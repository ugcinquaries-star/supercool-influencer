'use client';

import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useUser();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/credits').then(r => r.json()).then(d => setCredits(d.credits));
  }, []);

  return (
    <div style={{ background: '#0F0B0C', minHeight: '100vh', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 48px', borderBottom: '1px solid rgba(245,240,232,0.07)', background: 'rgba(15,11,12,0.95)', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/dashboard" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '14px', color: '#F5F0E8', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            <strong style={{ fontWeight: 700 }}>SUPER</strong>COOL Influencer
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 300, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', marginTop: '2px' }}>
            Your AI Content Director
          </span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/pricing" style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', textDecoration: 'none' }}>Upgrade</a>
          <a href="/" style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', textDecoration: 'none' }}>Home</a>
          <UserButton />
        </div>
      </nav>

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>

        {/* Credits badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: credits === 0 ? 'rgba(248,113,113,0.1)' : 'rgba(158,24,43,0.1)',
          border: `1px solid ${credits === 0 ? 'rgba(248,113,113,0.3)' : 'rgba(158,24,43,0.25)'}`,
          color: credits === 0 ? '#f87171' : '#F2AFBC',
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase' as const,
          padding: '5px 14px', borderRadius: '100px', marginBottom: '28px'
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: credits === 0 ? '#f87171' : '#F2AFBC', animation: 'pulse 2s ease-in-out infinite' }} />
          {credits === null ? 'Loading...' : credits === 0 ? '⚠️ No credits remaining' : `⚡ ${credits} brief${credits === 1 ? '' : 's'} remaining`}
        </div>

        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(36px,6vw,64px)', letterSpacing: '-2px', marginBottom: '12px', lineHeight: 0.95, color: '#F5F0E8' }}>
          Ready to direct?
        </h1>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px,2vw,22px)', fontWeight: 300, fontStyle: 'italic', color: '#F2AFBC', marginBottom: '16px', letterSpacing: '-0.5px' }}>
          Your AI content director is standing by.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 300, color: 'rgba(245,240,232,0.42)', marginBottom: '44px', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 44px' }}>
          Generate complete AI UGC briefs — Seedance scripts, motion direction, image prompts, captions, keywords and hashtags. All in 60 seconds.
        </p>

        {/* CTA */}
        {credits === 0 ? (
          <a href="/pricing" style={{ display: 'inline-block', background: '#9E182B', color: 'white', padding: '18px 48px', borderRadius: '3px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 4px 20px rgba(158,24,43,0.35)' }}>
            🔒 Upgrade to Generate →
          </a>
        ) : (
          <Link href="/generate" style={{ display: 'inline-block', background: '#9E182B', color: 'white', padding: '18px 48px', borderRadius: '3px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 4px 20px rgba(158,24,43,0.35)' }}>
            ⚡ Generate Production Brief →
          </Link>
        )}
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(245,240,232,0.25)', marginTop: '12px', letterSpacing: '0.06em' }}>
          {credits !== null && credits > 0 && `${credits} brief${credits === 1 ? '' : 's'} remaining on your plan`}
        </div>

        {/* Mode cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginTop: '64px', textAlign: 'left' as const }}>
          <div style={{ background: '#181214', border: '1px solid rgba(245,240,232,0.07)', borderRadius: '4px', padding: '28px 24px', transition: 'border-color 0.2s' }}>
            <div style={{ fontSize: '22px', marginBottom: '14px' }}>🎬</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: '#F5F0E8' }}>Content Creator Mode</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: 'rgba(245,240,232,0.42)', lineHeight: 1.7 }}>Build AI influencer content briefs for organic TikTok, Reels and Shorts.</div>
          </div>
          <div style={{ background: 'rgba(158,24,43,0.06)', border: '1px solid rgba(158,24,43,0.2)', borderRadius: '4px', padding: '28px 24px' }}>
            <div style={{ fontSize: '22px', marginBottom: '14px' }}>📢</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: '#F5F0E8' }}>UGC Ads Mode</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: 'rgba(245,240,232,0.42)', lineHeight: 1.7 }}>Performance-focused ad briefs for Meta Ads and TikTok Ads Manager.</div>
          </div>
        </div>

        {/* Quick links */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '40px', flexWrap: 'wrap' as const }}>
          {[{href:'/pricing',label:'View Plans'},{href:'/',label:'Homepage'},{href:'/generate',label:'New Brief'}].map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', textDecoration: 'none', border: '1px solid rgba(245,240,232,0.07)', padding: '8px 16px', borderRadius: '3px', transition: 'all 0.2s' }}>
              {l.label}
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
