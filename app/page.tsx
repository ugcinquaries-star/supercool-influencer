'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const T = {
  bg: '#0D0A0E',
  bg2: '#131013',
  bg3: '#1A1418',
  bg4: '#201C20',
  border: 'rgba(255,255,255,0.08)',
  borderGold: 'rgba(212,175,135,0.25)',
  gold: '#D4AF87',
  goldDim: 'rgba(212,175,135,0.55)',
  goldFaint: 'rgba(212,175,135,0.1)',
  ivory: '#F5F0E8',
  ivoryDim: 'rgba(245,240,232,0.6)',
  ivoryFaint: 'rgba(245,240,232,0.06)',
  textMid: 'rgba(255,255,255,0.45)',
  textLow: 'rgba(255,255,255,0.22)',
  green: '#4ADE80',
  greenFaint: 'rgba(74,222,128,0.08)',
  greenBorder: 'rgba(74,222,128,0.2)',
};

// Curated cinematic mood scenes — no fake generation
const MOODS = [
  {
    label: 'Morning Skincare Ritual',
    sub: 'Natural light • Soft shadows • Calm energy',
    bg: 'linear-gradient(180deg, #1C1209 0%, #3D2410 35%, #6B4020 65%, #8B5E35 100%)',
    imgs: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80',
    ],
  },
  {
    label: 'Golden Hour Editorial',
    sub: 'Warm tones • Cinematic depth • High contrast',
    bg: 'linear-gradient(180deg, #0D0A05 0%, #2E1A08 35%, #5C3810 65%, #8B6020 100%)',
    imgs: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&q=80',
    ],
  },
  {
    label: 'Luxury Interior Moment',
    sub: 'Soft ambient • Intimate framing • Premium feel',
    bg: 'linear-gradient(180deg, #080608 0%, #1A1020 35%, #2E1835 65%, #3D2445 100%)',
    imgs: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
    ],
  },
  {
    label: 'Cinematic Night Edit',
    sub: 'Low-key moody • Deep shadows • High emotion',
    bg: 'linear-gradient(180deg, #050305 0%, #120810 35%, #1E0E1A 65%, #2A1425 100%)',
    imgs: [
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&q=80',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80',
    ],
  },
];

const TABS = [
  { id: 'content', label: 'Content' },
  { id: 'creator', label: 'Creator' },
  { id: 'character', label: 'Character' },
  { id: 'environment', label: 'Environment' },
  { id: 'motion', label: 'Motion' },
  { id: 'realism', label: 'Realism' },
];

export default function OutputPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('content');
  const [copied, setCopied] = useState('');
  const [moodIdx, setMoodIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [showMoodPicker, setShowMoodPicker] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('brief');
    if (!stored) { router.push('/generate'); return; }
    setData(JSON.parse(stored));
  }, [router]);

  const copy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text).catch(() => {
      const el = document.createElement('textarea');
      el.value = text; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    });
    setCopied(id);
    setTimeout(() => setCopied(''), 2500);
  };

  const mood = MOODS[moodIdx];

  const CopyBtn = ({ text, id, label }: { text: string; id: string; label?: string }) => (
    <button onClick={() => copy(text, id)} style={{
      background: copied === id ? T.greenFaint : 'transparent',
      border: `1px solid ${copied === id ? T.greenBorder : T.border}`,
      color: copied === id ? T.green : T.textMid,
      padding: '4px 10px', borderRadius: '3px', cursor: 'pointer',
      fontSize: '10px', fontWeight: 500, whiteSpace: 'nowrap' as const,
      letterSpacing: '0.08em', transition: 'all 0.2s', flexShrink: 0,
      fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: 4,
    }}>
      {copied === id ? '✓' : '⎘'} {label || (copied === id ? 'Copied' : 'Copy')}
    </button>
  );

  const lbl: any = {
    fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: T.goldDim,
    marginBottom: '6px', display: 'block', fontFamily: "'Inter', sans-serif",
  };

  const OutputCard = ({ icon, title, id, children, copyText }: any) => (
    <div style={{
      background: T.bg2, border: `1px solid ${T.border}`,
      borderRadius: '6px', padding: '18px 20px', marginBottom: 10,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, opacity: 0.7 }}>{icon}</span>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: T.ivory, fontFamily: "'Inter', sans-serif" }}>{title}</span>
        </div>
        {copyText && <CopyBtn text={copyText} id={id} />}
      </div>
      {children}
    </div>
  );

  const bodyText: any = { fontSize: 13, color: T.ivoryDim, lineHeight: 1.75, fontWeight: 300, fontFamily: "'Inter', sans-serif" };
  const boldKey: any = { fontWeight: 600, color: T.ivory };

  if (!data) return (
    <div style={{ background: T.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.gold, fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: '0.1em' }}>
      Loading campaign...
    </div>
  );

  // Build copyable text blocks from data
  const briefText = data.brief_summary ? `${data.brief_summary.concept}\n\nGoal: ${data.brief_summary.emotional_arc}\n\nHook: ${data.brief_summary.hook}` : '';
  const imagePromptText = data.midjourney_master || data.flux_master || '';
  const reelText = data.seedance_master?.substring(0, 600) || '';
  const hookCaption = data.brand_identity?.tiktok ? `Hook: ${data.brand_identity.tiktok.hooks?.[0] || ''}\n\nCaption: ${data.brand_identity.tiktok.caption || ''}` : '';
  const hashtagsText = data.brand_identity?.tiktok?.hashtags?.join(' ') || '';
  const motionText = data.kling_master?.substring(0, 500) || '';

  return (
    <div style={{ background: T.bg, height: '100vh', color: T.ivory, fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,135,0.15); border-radius: 2px; }
        .tab-btn:hover { color: rgba(245,240,232,0.6) !important; }
        .mood-thumb:hover { border-color: rgba(212,175,135,0.6) !important; opacity: 1 !important; }
        .tool-btn:hover { background: rgba(212,175,135,0.12) !important; border-color: rgba(212,175,135,0.4) !important; color: #D4AF87 !important; }
        .output-card-hover:hover { border-color: rgba(212,175,135,0.2) !important; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes imgFade { from{opacity:0} to{opacity:1} }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 28px', height: 48, flexShrink: 0,
        borderBottom: `1px solid ${T.border}`,
        background: 'rgba(13,10,14,0.98)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '4px',
            background: T.gold, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 14, color: T.bg,
          }}>S</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.ivory, letterSpacing: '0.1em', textTransform: 'uppercase' as const, fontFamily: "'Inter', sans-serif" }}>SUPERCOOL INFLUENCER</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => copy(JSON.stringify(data, null, 2), 'full')} style={{
            background: 'transparent', border: `1px solid ${T.border}`,
            color: copied === 'full' ? T.green : T.textMid,
            padding: '7px 18px', borderRadius: '4px', fontSize: '11px',
            fontWeight: 500, cursor: 'pointer', letterSpacing: '0.08em',
            fontFamily: "'Inter', sans-serif",
          }}>
            {copied === 'full' ? '✓ Exported' : 'Export Campaign'}
          </button>
          <button style={{
            background: 'transparent', border: `1px solid ${T.border}`,
            color: T.textMid, padding: '7px 10px', borderRadius: '4px',
            cursor: 'pointer', fontSize: 16, lineHeight: 1,
          }}>≡</button>
        </div>
      </nav>

      {/* ── MAIN SPLIT ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── LEFT: CINEMATIC VISUAL ── */}
        <div style={{
          width: '46%', flexShrink: 0, position: 'relative',
          overflow: 'hidden', display: 'flex', flexDirection: 'column' as const,
        }}>
          {/* Main image */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <img
              key={`${moodIdx}-${imgIdx}`}
              src={mood.imgs[imgIdx]}
              alt={mood.label}
              style={{
                width: '100%', height: '100%', objectFit: 'cover' as const,
                animation: 'imgFade 0.8s ease',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.removeAttribute('style');
              }}
            />
            {/* Fallback gradient */}
            <div style={{ position: 'absolute', inset: 0, background: mood.bg, zIndex: -1 }} />

            {/* Top badge */}
            <div style={{
              position: 'absolute', top: 16, left: 16, right: 16,
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              zIndex: 10,
            }}>
              <div style={{
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                border: `1px solid rgba(255,255,255,0.12)`,
                borderRadius: '4px', padding: '6px 10px',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F87171' }} />
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: T.ivory }}>IMMERSIVE CINEMATIC PREVIEW</span>
              </div>
            </div>

            {/* Bottom overlay */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(13,10,14,0.95) 0%, rgba(13,10,14,0.6) 50%, transparent 100%)',
              padding: '60px 20px 16px', zIndex: 10,
            }}>
              <div style={{ fontSize: 9, color: T.goldDim, letterSpacing: '0.16em', textTransform: 'uppercase' as const, marginBottom: 6, fontWeight: 500 }}>Scene Mood</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 22, color: T.ivory, marginBottom: 4, lineHeight: 1 }}>{mood.label}</div>
              <div style={{ fontSize: 11, color: T.textMid, marginBottom: 14, fontWeight: 300 }}>{mood.sub}</div>

              {/* Thumbnails */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                {mood.imgs.map((img, i) => (
                  <div
                    key={i}
                    className="mood-thumb"
                    onClick={() => setImgIdx(i)}
                    style={{
                      width: 64, height: 48, borderRadius: '3px', overflow: 'hidden',
                      cursor: 'pointer', flexShrink: 0,
                      border: `1px solid ${i === imgIdx ? T.gold : 'rgba(255,255,255,0.15)'}`,
                      opacity: i === imgIdx ? 1 : 0.6,
                      transition: 'all 0.2s',
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' as const }} />
                  </div>
                ))}
              </div>

              {/* Change mood btn */}
              <button
                onClick={() => setShowMoodPicker(!showMoodPicker)}
                style={{
                  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                  border: `1px solid rgba(255,255,255,0.15)`,
                  color: T.ivory, padding: '7px 16px', borderRadius: '3px',
                  fontSize: '11px', fontWeight: 500, cursor: 'pointer',
                  letterSpacing: '0.06em', fontFamily: "'Inter', sans-serif",
                }}
              >
                Change Mood
              </button>
            </div>

            {/* Mood picker overlay */}
            {showMoodPicker && (
              <div style={{
                position: 'absolute', inset: 0, background: 'rgba(13,10,14,0.92)',
                backdropFilter: 'blur(12px)', zIndex: 20, padding: 24,
                display: 'flex', flexDirection: 'column' as const, gap: 12,
                animation: 'fadeIn 0.2s ease',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: T.goldDim }}>Select Scene Mood</span>
                  <button onClick={() => setShowMoodPicker(false)} style={{ background: 'none', border: 'none', color: T.textMid, cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>
                </div>
                {MOODS.map((m, i) => (
                  <button key={i} onClick={() => { setMoodIdx(i); setImgIdx(0); setShowMoodPicker(false); }} style={{
                    background: i === moodIdx ? T.goldFaint : T.bg2,
                    border: `1px solid ${i === moodIdx ? T.borderGold : T.border}`,
                    borderRadius: '4px', padding: '12px 16px', cursor: 'pointer',
                    textAlign: 'left' as const, transition: 'all 0.2s',
                    display: 'flex', gap: 12, alignItems: 'center',
                  }}>
                    <div style={{ width: 40, height: 30, borderRadius: '2px', background: m.bg, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: T.ivory, marginBottom: 2 }}>{m.label}</div>
                      <div style={{ fontSize: 10, color: T.textMid, fontWeight: 300 }}>{m.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: OUTPUT PANEL ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden', borderLeft: `1px solid ${T.border}` }}>

          {/* Tab nav */}
          <div style={{
            display: 'flex', gap: 0, padding: '0 20px',
            borderBottom: `1px solid ${T.border}`,
            background: T.bg2, flexShrink: 0, overflowX: 'auto' as const,
          }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="tab-btn" style={{
                padding: '12px 14px', background: 'none', border: 'none',
                borderBottom: `2px solid ${activeTab === tab.id ? T.gold : 'transparent'}`,
                color: activeTab === tab.id ? T.ivory : T.textLow,
                cursor: 'pointer', fontSize: '11px', fontWeight: activeTab === tab.id ? 500 : 400,
                whiteSpace: 'nowrap' as const, letterSpacing: '0.06em',
                transition: 'all 0.2s', fontFamily: "'Inter', sans-serif",
              }}>{tab.label}</button>
            ))}
          </div>

          {/* Scrollable output */}
          <div style={{ flex: 1, overflowY: 'auto' as const, padding: '16px 20px 100px' }}>

            {/* ── CONTENT TAB ── */}
            {activeTab === 'content' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>

                <OutputCard icon="📋" title="Campaign Brief" id="brief" copyText={briefText}>
                  {data.brief_summary && (
                    <div style={bodyText}>
                      <div style={{ marginBottom: 6 }}><span style={boldKey}>Concept:</span> {data.brief_summary.concept}</div>
                      <div style={{ marginBottom: 6 }}><span style={boldKey}>Goal:</span> {data.brief_summary.emotional_arc}</div>
                      {data.brief_summary.hook && <div style={{ marginBottom: 6 }}><span style={boldKey}>Tone:</span> Cinematic, intimate, elevated</div>}
                      <div><span style={boldKey}>Platform:</span> {data.brief_summary.mode === 'ugc_ads' ? 'Meta Ads · TikTok Ads' : 'Instagram Reels · TikTok'}</div>
                    </div>
                  )}
                </OutputCard>

                <OutputCard icon="🖼️" title="Image Prompt" id="imgprompt" copyText={imagePromptText}>
                  <div style={bodyText}>{imagePromptText?.substring(0, 320) || 'No image prompt generated.'}{imagePromptText?.length > 320 ? '...' : ''}</div>
                  {imagePromptText && (
                    <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
                      {['Midjourney', 'Flux', 'Firefly'].map(tool => (
                        <button key={tool} className="tool-btn" style={{
                          background: T.bg3, border: `1px solid ${T.border}`,
                          color: T.textMid, padding: '4px 10px', borderRadius: '3px',
                          fontSize: '10px', cursor: 'pointer', letterSpacing: '0.06em',
                          fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
                        }}>Open in {tool} ↗</button>
                      ))}
                    </div>
                  )}
                </OutputCard>

                <OutputCard icon="🎬" title="Reel Direction" id="reel" copyText={reelText}>
                  <div style={bodyText}>
                    {data.seedance_master ? (
                      data.seedance_master.split('\n').slice(0, 8).map((line: string, i: number) => (
                        line.trim() ? <div key={i} style={{ marginBottom: 4 }}>{line}</div> : null
                      ))
                    ) : 'No reel direction generated.'}
                  </div>
                  {data.seedance_master && (
                    <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
                      {['Higgsfield / Seedance', 'Kling', 'Runway', 'Veo'].map(tool => (
                        <button key={tool} className="tool-btn" style={{
                          background: T.bg3, border: `1px solid ${T.border}`,
                          color: T.textMid, padding: '4px 10px', borderRadius: '3px',
                          fontSize: '10px', cursor: 'pointer', letterSpacing: '0.06em',
                          fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
                        }}>Open in {tool} ↗</button>
                      ))}
                    </div>
                  )}
                </OutputCard>

                <OutputCard icon="✍️" title="Hook + Caption" id="hookcap" copyText={hookCaption}>
                  {data.brand_identity?.tiktok && (
                    <div style={bodyText}>
                      <div style={{ marginBottom: 8 }}><span style={boldKey}>Hook:</span> {data.brand_identity.tiktok.hooks?.[0]}</div>
                      <div><span style={boldKey}>Caption:</span> {data.brand_identity.tiktok.caption}</div>
                    </div>
                  )}
                </OutputCard>

                <OutputCard icon="#" title="Hashtags + Keywords" id="hashtags" copyText={hashtagsText}>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 5 }}>
                      {data.brand_identity?.tiktok?.hashtags?.map((h: string, i: number) => (
                        <span key={i} style={{
                          background: T.ivoryFaint, border: `1px solid ${T.border}`,
                          color: T.ivoryDim, padding: '3px 8px', borderRadius: '3px', fontSize: 11,
                        }}>{h}</span>
                      ))}
                    </div>
                  </div>
                  {data.brand_identity?.tiktok?.keywords?.length > 0 && (
                    <div style={{ ...bodyText, fontSize: 12 }}>
                      <span style={boldKey}>Keywords:</span> {data.brand_identity.tiktok.keywords?.join(', ')}
                    </div>
                  )}
                </OutputCard>

                <OutputCard icon="🎯" title="Motion Psychology" id="motion" copyText={motionText}>
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
                    {[
                      'Slow, intentional movements',
                      'Natural light = trust signal',
                      'Close-ups increase perceived authenticity',
                      'Soft pauses improve retention',
                    ].map((point, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: T.ivoryDim, fontWeight: 300 }}>
                        <span style={{ color: T.green, fontSize: 10, marginTop: 2, flexShrink: 0 }}>✓</span>
                        {point}
                      </div>
                    ))}
                  </div>
                </OutputCard>

              </div>
            )}

            {/* ── CREATOR TAB ── */}
            {activeTab === 'creator' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                {['tiktok', 'instagram', 'youtube'].map(platform => {
                  const pd = data.brand_identity?.[platform];
                  if (!pd) return null;
                  const labels: Record<string,string> = { tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube' };
                  return (
                    <div key={platform} style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: T.goldDim, marginBottom: 10 }}>{labels[platform]}</div>
                      {pd.hooks?.length > 0 && (
                        <OutputCard icon="🎣" title="Hooks" id={`${platform}-hooks`} copyText={pd.hooks?.join('\n')}>
                          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
                            {pd.hooks?.map((h: string, i: number) => (
                              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, background: T.bg3, border: `1px solid ${T.border}`, borderRadius: '4px', padding: '8px 10px' }}>
                                <div style={{ fontSize: 12, color: T.ivoryDim, lineHeight: 1.6, fontWeight: 300 }}>{h}</div>
                                <CopyBtn text={h} id={`${platform}-h-${i}`} />
                              </div>
                            ))}
                          </div>
                        </OutputCard>
                      )}
                      {pd.caption && (
                        <OutputCard icon="✍️" title="Caption" id={`${platform}-caption`} copyText={pd.caption}>
                          <div style={bodyText}>{pd.caption}</div>
                        </OutputCard>
                      )}
                    </div>
                  );
                })}
                {!data.brand_identity?.tiktok && (
                  <div style={{ textAlign: 'center' as const, padding: '40px 0', color: T.textLow, fontSize: 13 }}>No creator content generated.</div>
                )}
              </div>
            )}

            {/* ── CHARACTER TAB ── */}
            {activeTab === 'character' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                {data.brief_summary && (
                  <OutputCard icon="👤" title="Character Direction" id="char" copyText={data.nanobanana_master || ''}>
                    <div style={bodyText}>
                      <div style={{ marginBottom: 8 }}>Your character has been engineered for biological realism — believable skin texture, natural movement, and emotional authenticity.</div>
                      <div style={{ marginBottom: 6 }}><span style={boldKey}>Realism Mode:</span> Alive Realism™</div>
                      <div style={{ marginBottom: 6 }}><span style={boldKey}>Scene:</span> {data.brief_summary.scene}</div>
                    </div>
                  </OutputCard>
                )}
                {data.nanobanana_master && (
                  <OutputCard icon="🧬" title="Nano Banana Skin Prompt" id="nano" copyText={data.nanobanana_master}>
                    <div style={{ ...bodyText, fontFamily: 'monospace', fontSize: 11 }}>{data.nanobanana_master?.substring(0, 500)}</div>
                    <div style={{ marginTop: 10 }}>
                      <button className="tool-btn" style={{ background: T.bg3, border: `1px solid ${T.border}`, color: T.textMid, padding: '4px 10px', borderRadius: '3px', fontSize: '10px', cursor: 'pointer', letterSpacing: '0.06em', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }}>Open in Nano Banana ↗</button>
                    </div>
                  </OutputCard>
                )}
              </div>
            )}

            {/* ── ENVIRONMENT TAB ── */}
            {activeTab === 'environment' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                {data.midjourney_master && (
                  <OutputCard icon="🖼️" title="Midjourney Environment" id="mj" copyText={data.midjourney_master}>
                    <div style={{ ...bodyText, fontFamily: 'monospace', fontSize: 11, lineHeight: 1.8 }}>{data.midjourney_master}</div>
                    <div style={{ marginTop: 10 }}>
                      <button className="tool-btn" style={{ background: T.bg3, border: `1px solid ${T.border}`, color: T.textMid, padding: '4px 10px', borderRadius: '3px', fontSize: '10px', cursor: 'pointer', letterSpacing: '0.06em', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }}>Open in Midjourney ↗</button>
                    </div>
                  </OutputCard>
                )}
                {data.flux_master && (
                  <OutputCard icon="✨" title="Flux Environment" id="flux" copyText={data.flux_master}>
                    <div style={{ ...bodyText, fontFamily: 'monospace', fontSize: 11, lineHeight: 1.8 }}>{data.flux_master}</div>
                    <div style={{ marginTop: 10 }}>
                      <button className="tool-btn" style={{ background: T.bg3, border: `1px solid ${T.border}`, color: T.textMid, padding: '4px 10px', borderRadius: '3px', fontSize: '10px', cursor: 'pointer', letterSpacing: '0.06em', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }}>Open in Flux ↗</button>
                    </div>
                  </OutputCard>
                )}
                {!data.midjourney_master && !data.flux_master && (
                  <div style={{ textAlign: 'center' as const, padding: '40px 0', color: T.textLow, fontSize: 13 }}>No environment prompts generated.</div>
                )}
              </div>
            )}

            {/* ── MOTION TAB ── */}
            {activeTab === 'motion' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                {data.seedance_master && (
                  <OutputCard icon="⚡" title="Seedance / Higgsfield" id="seedance" copyText={data.seedance_master}>
                    <div style={{ ...bodyText, fontFamily: 'monospace', fontSize: 11, lineHeight: 1.8, whiteSpace: 'pre-wrap' as const }}>{data.seedance_master}</div>
                    <div style={{ marginTop: 10 }}>
                      <button className="tool-btn" style={{ background: T.bg3, border: `1px solid ${T.border}`, color: T.textMid, padding: '4px 10px', borderRadius: '3px', fontSize: '10px', cursor: 'pointer', letterSpacing: '0.06em', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }}>Open in Higgsfield ↗</button>
                    </div>
                  </OutputCard>
                )}
                {data.kling_master && (
                  <OutputCard icon="🎬" title="Kling 1.6" id="kling" copyText={data.kling_master}>
                    <div style={{ ...bodyText, fontFamily: 'monospace', fontSize: 11, lineHeight: 1.8, whiteSpace: 'pre-wrap' as const }}>{data.kling_master}</div>
                    <div style={{ marginTop: 10 }}>
                      <button className="tool-btn" style={{ background: T.bg3, border: `1px solid ${T.border}`, color: T.textMid, padding: '4px 10px', borderRadius: '3px', fontSize: '10px', cursor: 'pointer', letterSpacing: '0.06em', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }}>Open in Kling ↗</button>
                    </div>
                  </OutputCard>
                )}
                {data.runway_master && (
                  <OutputCard icon="🎥" title="Runway Gen-4" id="runway" copyText={data.runway_master}>
                    <div style={{ ...bodyText, fontFamily: 'monospace', fontSize: 11, lineHeight: 1.8, whiteSpace: 'pre-wrap' as const }}>{data.runway_master}</div>
                    <div style={{ marginTop: 10 }}>
                      <button className="tool-btn" style={{ background: T.bg3, border: `1px solid ${T.border}`, color: T.textMid, padding: '4px 10px', borderRadius: '3px', fontSize: '10px', cursor: 'pointer', letterSpacing: '0.06em', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }}>Open in Runway ↗</button>
                    </div>
                  </OutputCard>
                )}
              </div>
            )}

            {/* ── REALISM TAB ── */}
            {activeTab === 'realism' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <OutputCard icon="🧬" title="Human Realism Engine™" id="realism-engine" copyText="">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{ fontSize: 11, color: T.textMid }}>All realism systems active for this campaign</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.green, letterSpacing: '0.1em' }}>ACTIVE</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px' }}>
                    {['Skin Texture Simulation', 'Natural Lighting', 'Behavioral Delay', 'Fabric & Hair Physics', 'Micro Expressions', 'Eye Movement Tracking', 'Breathing Architecture', 'Asymmetric Movement'].map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: T.ivoryDim, fontWeight: 300 }}>
                        <span style={{ color: T.green, fontSize: 9 }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                </OutputCard>

                {data.calendar && (
                  <OutputCard icon="📅" title="7-Day Content Calendar" id="calendar" copyText={data.calendar?.map((d: any) => `Day ${d.day}: ${d.concept}\nHook: ${d.hook}`).join('\n\n')}>
                    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
                      {data.calendar?.map((item: any) => (
                        <div key={item.day} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 10px', background: T.bg3, border: `1px solid ${T.border}`, borderRadius: '4px' }}>
                          <div style={{ width: 24, height: 24, borderRadius: '3px', background: T.goldFaint, border: `1px solid ${T.borderGold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: T.gold, flexShrink: 0 }}>{item.day}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 500, color: T.ivory, marginBottom: 2 }}>{item.concept}</div>
                            <div style={{ fontSize: 11, color: T.textMid, fontStyle: 'italic', fontWeight: 300 }}>{item.hook}</div>
                          </div>
                          <CopyBtn text={`Day ${item.day}: ${item.concept}\nHook: ${item.hook}`} id={`cal-${item.day}`} />
                        </div>
                      ))}
                    </div>
                  </OutputCard>
                )}
              </div>
            )}

          </div>

          {/* ── BOTTOM CTA ── */}
          <div style={{
            padding: '12px 20px',
            borderTop: `1px solid ${T.border}`,
            background: T.bg2, flexShrink: 0,
            display: 'flex', gap: 10,
          }}>
            <button
              onClick={() => copy(JSON.stringify({ brief: briefText, imagePrompt: imagePromptText, reel: reelText, caption: hookCaption, hashtags: hashtagsText }, null, 2), 'download')}
              style={{
                flex: 1, background: 'transparent',
                border: `1px solid ${T.border}`,
                color: T.textMid, padding: '11px', borderRadius: '4px',
                fontSize: '11px', fontWeight: 500, cursor: 'pointer',
                letterSpacing: '0.08em', fontFamily: "'Inter', sans-serif",
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              ⬇ Download All
            </button>
            <button
              onClick={() => router.push('/generate')}
              style={{
                flex: 2, background: T.gold, color: T.bg,
                border: 'none', padding: '11px', borderRadius: '4px',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                letterSpacing: '0.08em', fontFamily: "'Inter', sans-serif",
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              ⚡ Generate Full Campaign
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 768px) {
          .split-left { display: none !important; }
        }
      `}</style>
    </div>
  );
}
