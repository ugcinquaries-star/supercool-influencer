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
    <div style={{ background: '#06060b', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <a href="/dashboard" style={{ fontWeight: 800, fontSize: '18px', textDecoration: 'none', color: 'white' }}>
          super<span style={{ color: '#a78bfa' }}>cool</span> influencer
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/pricing" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Upgrade</a>
          <UserButton />
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>

        <div style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: credits === 0 ? '#f87171' : '#a78bfa', fontWeight: 600, marginBottom: '16px' }}>
          {credits === null ? '...' : credits === 0 ? '⚠️ No credits remaining' : `⚡ ${credits} brief${credits === 1 ? '' : 's'} remaining`}
        </div>

        <h1 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-2px', marginBottom: '16px', lineHeight: 1 }}>
          Ready to generate?
        </h1>

        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', marginBottom: '48px', lineHeight: 1.6 }}>
          Build your complete AI UGC production brief — Seedance, Kling, Runway, Midjourney, Flux + Brand Voice. All in 60 seconds.
        </p>

        {credits === 0 ? (
          <a href="/pricing" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #dc2626, #ec4899)', color: 'white', padding: '20px 48px', borderRadius: '100px', fontSize: '20px', fontWeight: 700, textDecoration: 'none' }}>
            🔒 Upgrade to Generate →
          </a>
        ) : (
          <Link href="/generate" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white', padding: '20px 48px', borderRadius: '100px', fontSize: '20px', fontWeight: 700, textDecoration: 'none' }}>
            ⚡ Generate Production Brief →
          </Link>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '64px', textAlign: 'left' as const }}>
          <div style={{ background: '#0d0d14', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>🎬</div>
            <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Content Creator Mode</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>Build AI influencer content briefs for organic TikTok, Reels and Shorts.</div>
          </div>
          <div style={{ background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.25)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>📢</div>
            <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>UGC Ads Mode</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>Performance-focused ad briefs for Meta Ads and TikTok Ads Manager.</div>
          </div>
        </div>

      </div>
    </div>
  );
}