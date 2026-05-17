'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OutputPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('brief');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('brief');
    if (!stored) { router.push('/generate'); return; }
    setData(JSON.parse(stored));
  }, [router]);

  const copy = (text: string, id: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const CopyBtn = ({ text, id }: { text: string; id: string }) => (
    <button onClick={() => copy(text, id)} style={{ background: copied === id ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)', border: `1px solid ${copied === id ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.1)'}`, color: copied === id ? '#6ee7b7' : 'rgba(255,255,255,0.5)', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap' as const, transition: 'all 0.2s', flexShrink: 0 }}>
      {copied === id ? '✓ Copied!' : 'Copy'}
    </button>
  );

  const PromptBlock = ({ content, id, color, tool }: { content: string; id: string; color: string; tool: string }) => (
    <div>
      <div style={{ background: `${color}15`, border: `1px solid ${color}40`, borderRadius: '10px', padding: '12px 16px', fontSize: '12px', color, marginBottom: '16px' }}>
        💡 Paste this entire prompt directly into <strong>{tool}</strong>. This is your complete production document.
      </div>
      <div style={{ background: '#131013', border: `1px solid ${color}30`, borderRadius: '14px', padding: '28px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
          <CopyBtn text={content} id={id} />
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, fontFamily: 'monospace', whiteSpace: 'pre-wrap' as const, paddingRight: '80px' }}>{content}</div>
      </div>
    </div>
  );

  const ListBlock = ({ items, prefix, color }: { items: string[]; prefix: string; color: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
      {items?.map((item, i) => (
        <div key={i} style={{ background: '#131013', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{item}</div>
          <CopyBtn text={item} id={`${prefix}-${i}`} />
        </div>
      ))}
    </div>
  );

  if (!data) return (
    <div style={{ background: '#0D0A0E', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif', fontSize: '16px' }}>
      Loading your production brief...
    </div>
  );

  const tabs = [
    { id: 'brief', label: '📋 Brief' },
    { id: 'seedance', label: '⚡ Seedance' },
    { id: 'kling', label: '🎬 Kling' },
    { id: 'runway', label: '🎥 Runway' },
    { id: 'midjourney', label: '🎨 Midjourney' },
    { id: 'flux', label: '✨ Flux' },
    { id: 'nanobanana', label: '🍌 Nano Banana' },
    { id: 'brand', label: '🤖 Brand Bot' },
    { id: 'calendar', label: '📅 Calendar' },
  ];

  return (
    <div style={{ background: '#0D0A0E', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontWeight: 800, fontSize: '16px' }}>super<span style={{ color: '#D4AF87' }}>cool</span> influencer</div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={() => copy(JSON.stringify(data, null, 2), 'full')} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: copied === 'full' ? '#6ee7b7' : 'rgba(255,255,255,0.7)', padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            {copied === 'full' ? '✓ Copied!' : '📋 Copy Full Brief'}
          </button>
          <button onClick={() => router.push('/generate')} style={{ background: 'linear-gradient(135deg, #9E182B, #D4AF87)', color: 'white', padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', border: 'none' }}>
            ⚡ New Brief
          </button>
        </div>
      </nav>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '2px', padding: '0 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', overflowX: 'auto' as const }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '12px 16px', background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === tab.id ? '#9E182B' : 'transparent'}`, color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' as const, letterSpacing: '0.04em' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '920px', margin: '0 auto', padding: '36px 24px' }}>

        {/* BRIEF */}
        {activeTab === 'brief' && data.brief_summary && (
          <div>
            <div style={{ background: 'linear-gradient(135deg, rgba(158,24,43,0.12), rgba(236,72,153,0.08))', border: '1px solid rgba(158,24,43,0.3)', borderRadius: '20px', padding: '32px', marginBottom: '20px' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>{data.brief_summary.title}</div>
              <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px', fontStyle: 'italic' }}>{data.brief_summary.concept}</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
                <span style={{ color: '#D4AF87', fontWeight: 600 }}>Emotional Arc: </span>{data.brief_summary.emotional_arc}
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '6px' }}>Opening Hook (0-3s)</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>{data.brief_summary.hook}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { label: 'Scene', value: data.brief_summary.scene },
                { label: 'Mode', value: data.brief_summary.mode === 'ugc_ads' ? '📢 UGC Ads' : '🎬 Content Creator' },
                { label: 'Tools Ready', value: 'Seedance · Kling · Runway · MJ · Flux' },
              ].map(item => (
                <div key={item.label} style={{ background: '#131013', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '6px' }}>{item.label}</div>
                  <div style={{ fontSize: '13px', color: 'white', fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEEDANCE */}
        {activeTab === 'seedance' && data.seedance_master && (
          <PromptBlock content={data.seedance_master} id="seedance" color="#D4AF87" tool="Seedance 2.0 on Higgsfield" />
        )}

        {/* KLING */}
        {activeTab === 'kling' && data.kling_master && (
          <PromptBlock content={data.kling_master} id="kling" color="#F9CBD6" tool="Kling 1.6" />
        )}

        {/* RUNWAY */}
        {activeTab === 'runway' && data.runway_master && (
          <PromptBlock content={data.runway_master} id="runway" color="#6ee7b7" tool="Runway Gen-4" />
        )}

        {/* MIDJOURNEY */}
        {activeTab === 'midjourney' && data.midjourney_master && (
          <PromptBlock content={data.midjourney_master} id="midjourney" color="#fcd34d" tool="Midjourney v6.1" />
        )}

        {/* FLUX */}
        {activeTab === 'flux' && data.flux_master && (
          <PromptBlock content={data.flux_master} id="flux" color="#93c5fd" tool="Flux Dev" />
        )}

        {/* NANO BANANA */}
        {activeTab === 'nanobanana' && data.nanobanana_master && (
          <PromptBlock content={data.nanobanana_master} id="nanobanana" color="#fcd34d" tool="Nano Banana 2 — Hyper-realistic skin & hair" />
        )}

        {/* BRAND IDENTITY BOT */}
        {activeTab === 'brand' && data.brand_identity && (
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '32px' }}>

            {/* Research Insight */}
            {data.brand_identity.research_insight && (
              <div style={{ background: 'rgba(158,24,43,0.1)', border: '1px solid rgba(158,24,43,0.3)', borderRadius: '12px', padding: '16px 20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#D4AF87', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>🔍 What's Working Right Now</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{data.brand_identity.research_insight}</div>
              </div>
            )}

            {/* Platform Tabs */}
            {['tiktok', 'instagram', 'youtube'].map(p => {
              const pd = data.brand_identity[p];
              if (!pd) return null;
              const colors: Record<string, string> = { tiktok: '#F9CBD6', instagram: '#F2AFBC', youtube: '#fca5a5' };
              const icons: Record<string, string> = { tiktok: '⚡', instagram: '💎', youtube: '🔴' };
              const color = colors[p];
              return (
                <div key={p} style={{ background: '#131013', border: `1px solid ${color}30`, borderRadius: '16px', overflow: 'hidden' }}>
                  <div style={{ background: `${color}15`, padding: '14px 20px', borderBottom: `1px solid ${color}20` }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{icons[p]} {p}</div>
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column' as const, gap: '20px' }}>

                    {/* Hooks */}
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '10px' }}>🎣 Hooks (5)</div>
                      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
                        {pd.hooks?.map((h: string, i: number) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px 14px' }}>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{h}</div>
                            <CopyBtn text={h} id={`${p}-hook-${i}`} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Caption */}
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '10px' }}>✍️ Caption</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px 14px' }}>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{pd.caption}</div>
                        <CopyBtn text={pd.caption} id={`${p}-caption`} />
                      </div>
                    </div>

                    {/* Keywords */}
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '10px' }}>🔍 10 Searchable Keywords</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                        {pd.keywords?.map((k: string, i: number) => (
                          <span key={i} onClick={() => { const el = document.createElement('textarea'); el.value = k; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); }} style={{ background: `${color}15`, border: `1px solid ${color}30`, color, padding: '5px 12px', borderRadius: '100px', fontSize: '12px', cursor: 'pointer' }}>{k}</span>
                        ))}
                      </div>
                    </div>

                    {/* Hashtags */}
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '10px' }}>
                        # 8 Hashtags
                        <button onClick={() => { const el = document.createElement('textarea'); el.value = pd.hashtags?.join(' ') || ''; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); }} style={{ marginLeft: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', padding: '3px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '10px', fontWeight: 600 }}>Copy All</button>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                        {pd.hashtags?.map((h: string, i: number) => (
                          <span key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', padding: '5px 12px', borderRadius: '100px', fontSize: '12px' }}>{h}</span>
                        ))}
                      </div>
                    </div>

                    {/* First Comment */}
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '10px' }}>💬 First Comment (post immediately)</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px 14px' }}>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{pd.first_comment}</div>
                        <CopyBtn text={pd.first_comment} id={`${p}-comment`} />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

            {/* Voiceover */}
            {data.brand_identity.voiceover && (
              <div style={{ background: '#131013', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#6ee7b7', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '16px' }}>🎙 Voiceover Script</div>
                <div style={{ marginBottom: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}><strong style={{ color: 'rgba(255,255,255,0.7)' }}>Accent:</strong> {data.brand_identity.voiceover.accent}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ fontSize: '14px', color: 'white', lineHeight: 1.8, fontFamily: 'monospace', whiteSpace: 'pre-wrap' as const, flex: 1 }}>{data.brand_identity.voiceover.script}</div>
                  <CopyBtn text={data.brand_identity.voiceover.script} id="vo-script" />
                </div>
              </div>
            )}

          </div>
        )}

        {/* CALENDAR */}
        {activeTab === 'calendar' && data.calendar && (
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>7-Day Content Calendar</h2>
              <CopyBtn text={data.calendar.map((d: any) => `Day ${d.day}: ${d.concept}\nHook: ${d.hook}\nFormat: ${d.format}\nGoal: ${d.goal}`).join('\n\n')} id="cal-all" />
            </div>
            {data.calendar.map((item: any) => (
              <div key={item.day} style={{ background: '#131013', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '18px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <a href="/dashboard" style={{ fontWeight: 800, fontSize: '16px', textDecoration: 'none', color: 'white' }}>super<span style={{ color: '#D4AF87' }}>cool</span> influencer</a>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{item.concept}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '8px', fontStyle: 'italic' }}>{item.hook}</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
                    {item.format && <span style={{ fontSize: '11px', background: 'rgba(158,24,43,0.12)', border: '1px solid rgba(158,24,43,0.3)', color: '#F2AFBC', padding: '3px 10px', borderRadius: '6px' }}>{item.format}</span>}
                    {item.goal && <span style={{ fontSize: '11px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#6ee7b7', padding: '3px 10px', borderRadius: '6px' }}>{item.goal}</span>}
                  </div>
                </div>
                <CopyBtn text={`Day ${item.day}: ${item.concept}\nHook: ${item.hook}\nFormat: ${item.format}\nGoal: ${item.goal}`} id={`cal-${item.day}`} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
