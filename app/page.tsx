'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ── Constants ──────────────────────────────────────────────
const AD_ANGLES = ['Before vs After','GRWM','Unboxing','Testimonial','Problem Solution','POV Storytime','Transformation','Myth Busting','TikTok Made Me Buy It','Honest Review','Day in the Life','Tutorial / How To'];
const NICHES = ['Beauty & Skincare','Fitness & Health','Finance & Crypto','Fashion & Style','Food & Cooking','Tech & AI','Travel','Mindset & Self-Help','Business','Home & Living','Pet Care','Baby & Parenting'];
const PLATFORMS = [{id:'tiktok',label:'TikTok'},{id:'instagram',label:'Instagram Reels'},{id:'youtube_shorts',label:'YT Shorts'},{id:'meta_ads',label:'Meta Ads'},{id:'tiktok_ads',label:'TikTok Ads'}];
const VIBES = ['Luxury & Aspirational','Raw & Authentic','Bold & Controversial','Educational','Funny & Relatable','Dark & Mysterious','Motivational','Soft & Feminine','Clean & Minimal'];
const AESTHETICS = ['Clean White Studio','Dark Moody Cinematic','Pastel Dreamy','Golden Hour Warm','Neon Futuristic','Cozy Home','Luxury Marble','Outdoor Natural'];
const CHARACTERS = ['The Busy Founder','The Everyday Creator','The Wellness Seeker','The Social Connector','The Travel Explorer','The Professional','The Parent / Caregiver','The Creative Artist','The Bold Expressor'];
const ETHNICITIES = ['African American','Mixed Race','Caucasian','Asian','Latina','Middle Eastern','South Asian','East African','Caribbean'];
const AGE_RANGES = ['18-22','22-28','28-35','35-45','45-55','55+'];
const FEMALE_BODY_TYPES = ['Slim','Tall','Average','Toned','Curvy','Plus-Size','Hourglass','Petite Curvy','Athletic Build','Soft Average','Strong & Curvy'];
const MALE_BODY_TYPES = ['Slim','Tall','Average','Toned','Muscular','Athletic Build','Dad Bod','Plus-Size','Lean Muscle','Stocky'];
const FEMALE_HAIRSTYLES = ['Messy Bun','Low Sleek Bun','Beach Waves','Defined Curly','Coily / Afro','Bone Straight Silk Press','Bouncy Blowout','Blunt Bob','Knotless Braids','Boho Braids','Butterfly Locs','Box Braids','High Ponytail','Half-Up Half-Down','Pixie Cut','Curtain Bangs','Space Buns'];
const MALE_HAIRSTYLES_BLACK = ['Textured crop + low taper fade','360 waves + drop fade','Taper Afro','High top fade','Buzz cut + beard combo','Coily low taper','Twist out + mid fade','Flat top','Sponge curls + taper','Burst fade','Shape-up / edge-up only','Afro fade','Short dreadlocks','Long dreadlocks','Cornrows straight back','High skin fade + shape-up'];
const MALE_HAIRSTYLES_GENERAL = ['Textured crop + mid fade','French crop + skin fade','Crew cut','Soft mullet + taper','Curtains / center part','Buzz cut','Pompadour','Caesar cut','Bro flow / flow cut','Skin fade + slick back','Low fade + side part','Shaved head','Short wavy + taper'];
const BEARD_OPTIONS = ['No beard / clean shaven','Light stubble','Short neat beard','Full beard','Long full beard','Goatee','Fade beard','Beard + line-up'];
const TATTOO_OPTIONS = ['No tattoos','Sleeve tattoo (one arm)','Sleeve tattoo (both arms)','Neck tattoo','Hand tattoos','Chest tattoo','Minimal tattoos','Mixed tattoos'];
const HAIR_COLORS = ['Natural Black','Dark Brown','Medium Brown','Golden Brown / Honey','Copper / Auburn','Caramel Balayage','Platinum Blonde','Rose Gold','Silver / Cool Grey','Bleached Blonde','Natural Grey'];
const FEMALE_OUTFIT_CATS: Record<string,string[]> = {
  'AI UGC / Creator':['Beauty creator outfit','GRWM outfit','Luxury skincare creator fit','Hyperreal influencer look'],
  'Luxury / High Fashion':['Quiet luxury outfit','Old money outfit','Parisian chic','Editorial fashion look'],
  'Baddie / Trendy':['Clean girl outfit','It girl outfit','Hot girl summer outfit','Viral TikTok fit'],
  'Soft Girl / Feminine':['Soft girl outfit','Coquette outfit','Balletcore look','Romantic girl outfit'],
  'Fitness / Sporty':['Pilates princess outfit','Gym baddie fit','Athleisure look','Luxury activewear'],
};
const MALE_OUTFIT_CATS: Record<string,string[]> = {
  'Streetwear / Hype':['Oversized hoodie + cargo pants','Hype fit','Graphic tee + baggy jeans','Vintage streetwear'],
  'Clean / Minimal':['White tee + slim jeans + white sneakers','Minimalist neutral tones','Smart casual','Quiet luxury menswear'],
  'Luxury / Designer':['Designer fit','Luxury casual premium basics','Editorial menswear'],
  'Fitness / Active':['Gym fit compression + shorts','Athleisure joggers + hoodie','Luxury activewear'],
};
const FEMALE_ACCESSORIES = ['No accessories','Gold necklace (delicate)','Gold necklace (statement)','Pearl necklace','Hoop earrings (small)','Hoop earrings (large)','Luxury handbag','Watch (luxury)','Bracelet stack','Rings (multiple)','Sunglasses'];
const MALE_ACCESSORIES = ['No accessories','Gold chain (thin)','Gold chain (thick / Cuban link)','Silver chain','Diamond stud earrings','Watch (luxury)','Rings (multiple)','Sunglasses','Cap (fitted)'];
const SCENE_LOCATIONS = [
  {id:'bathroom',label:'Bathroom',desc:'Skincare, mirror moments'},
  {id:'bedroom',label:'Bedroom',desc:'Morning / night routine'},
  {id:'kitchen',label:'Kitchen',desc:'Coffee ritual, supplements'},
  {id:'living_room',label:'Living Room',desc:'Relaxed, cozy'},
  {id:'car',label:'Car',desc:'Parking lot, drive reveal'},
  {id:'hotel',label:'Hotel / Airbnb',desc:'Luxury bathroom, travel'},
  {id:'spa',label:'Spa / Salon',desc:'Post-treatment, self-care'},
  {id:'fitness',label:'Gym / Fitness',desc:'Post-workout, active'},
  {id:'coffee_shop',label:'Coffee Shop',desc:'Café table, between meetings'},
  {id:'outdoor_street',label:'Street / Outdoor',desc:'Golden hour, city walk'},
];
const CAMERA_ANGLES = ['Selfie angle','Eye-level angle','Mirror angle','Over-the-shoulder','POV angle','Low angle','Overhead angle','Three-quarter angle','Intimate close angle'];
const LIGHTING_TYPES = ['Golden hour light','Window light','Ring light','Soft diffused light','Low-key moody light','Beauty lighting','Natural room lighting','Backlit window','Warm ambient lighting'];
const REALISM_MODES = [
  {id:'alive',label:'Alive Realism™',desc:'Motion truth + biological realism'},
  {id:'ultra',label:'Ultra Realism',desc:'Maximum raw authenticity, unfiltered'},
  {id:'everyday',label:'Everyday Realism',desc:'Relatable, natural, unposed'},
  {id:'brand_clean',label:'Brand Clean',desc:'Polished but human — luxury/corporate'},
];
const UGC_STYLES = ['Raw authentic UGC','Aesthetic UGC','Documentary-style','POV UGC','Talking-head','Voiceover','ASMR','Faceless','Hands-only','Testimonial','Vlog-style'];

const LOADING_STEPS = [
  'Analyzing creator identity...',
  'Building campaign brief...',
  'Engineering human realism...',
  'Generating cinematic direction...',
  'Calibrating motion psychology...',
  'Optimizing retention architecture...',
  'Finalizing your campaign...',
];

const PREVIEW_SCENES = [
  { bg: 'linear-gradient(135deg, #2C1810 0%, #5C3317 30%, #8B5E3C 60%, #C4956A 100%)', label: 'Golden Hour · Bathroom' },
  { bg: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 40%, #16213E 80%, #0F3460 100%)', label: 'Night Ritual · Bedroom' },
  { bg: 'linear-gradient(135deg, #F5F0E8 0%, #E8DDD0 40%, #D4C5B0 80%, #C4B49A 100%)', label: 'Soft Morning · Studio' },
  { bg: 'linear-gradient(135deg, #1A0A0A 0%, #3D1515 40%, #6B2525 80%, #9E3535 100%)', label: 'Moody Edit · Interior' },
  { bg: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 40%, #2E5F8A 80%, #4A90C4 100%)', label: 'Cool Cinematic · Outdoor' },
];

export default function GeneratePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<'content'|'ugc_ads'>('content');
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [previewIdx, setPreviewIdx] = useState(0);
  const [outfitCat, setOutfitCat] = useState('AI UGC / Creator');
  const [hairstyleType, setHairstyleType] = useState('general');
  const [form, setForm] = useState({
    mode:'content', niche:'', platform:'tiktok', adAngle:'',
    targetAudience:'', influencerVibe:'', aesthetic:'',
    avatarAction:'', customBrief:'',
    gender:'female', characterArchetype:'', ethnicity:'',
    ageRange:'', bodyType:'', hairstyle:'', hairColor:'',
    beardOption:'', tattooOption:'', accessories:'', outfit:'',
    sceneLocation:'bathroom', cameraAngle:'', lightingType:'',
    realismMode:'alive', ugcStyle:'', productDescription:'',
  });

  const set = (f: string, v: string) => setForm(p => ({...p, [f]: v}));

  useEffect(() => {
    if (!loading) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i < LOADING_STEPS.length) setLoadStep(i);
      else clearInterval(iv);
    }, 3500);
    return () => clearInterval(iv);
  }, [loading]);

  useEffect(() => {
    const iv = setInterval(() => setPreviewIdx(p => (p + 1) % PREVIEW_SCENES.length), 4000);
    return () => clearInterval(iv);
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setLoadStep(0);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({...form, mode}),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('brief', JSON.stringify(data.data));
        router.push('/output');
      } else {
        alert('Failed: ' + data.error);
        setLoading(false);
      }
    } catch {
      alert('Something went wrong. Try again.');
      setLoading(false);
    }
  };

  const Chip = ({label, field, val}: any) => {
    const active = form[field as keyof typeof form] === val;
    return (
      <button onClick={() => set(field, val)} style={{
        padding:'8px 14px', borderRadius:'6px', fontSize:'12px', fontWeight:500,
        cursor:'pointer', border:'1px solid '+(active ? 'rgba(212,175,135,0.6)' : 'rgba(255,255,255,0.1)'),
        background:active ? 'rgba(212,175,135,0.15)' : 'rgba(255,255,255,0.03)',
        color:active ? '#D4AF87' : 'rgba(255,255,255,0.5)',
        transition:'all 0.2s', letterSpacing:'0.02em',
      }}>{label}</button>
    );
  };

  const ChipGroup = ({label, field, options}: any) => (
    <div style={{marginBottom:'20px'}}>
      <div style={lbl}>{label}</div>
      <div style={{display:'flex', flexWrap:'wrap' as const, gap:'6px'}}>
        {options.map((o: string) => <Chip key={o} label={o} field={field} val={o} />)}
      </div>
    </div>
  );

  const Drop = ({label, field, options, placeholder}: any) => (
    <div style={{marginBottom:'14px'}}>
      <div style={lbl}>{label}</div>
      <select value={form[field as keyof typeof form]} onChange={e => set(field, e.target.value)} style={dropStyle}>
        <option value="" style={{background:'#1A1015'}}>{placeholder || 'Select...'}</option>
        {options.map((o: string) => <option key={o} value={o} style={{background:'#1A1015'}}>{o}</option>)}
      </select>
    </div>
  );

  const lbl: any = {
    fontSize:'10px', fontWeight:600, letterSpacing:'0.16em',
    textTransform:'uppercase', color:'rgba(212,175,135,0.6)',
    marginBottom:'8px', display:'block',
  };

  const dropStyle: any = {
    width:'100%', background:'rgba(255,255,255,0.04)',
    border:'1px solid rgba(255,255,255,0.08)',
    borderRadius:'6px', padding:'10px 12px',
    color:'rgba(255,255,255,0.8)', fontSize:'13px',
    outline:'none', cursor:'pointer', appearance:'none',
  };

  const ta: any = {
    width:'100%', background:'rgba(255,255,255,0.04)',
    border:'1px solid rgba(255,255,255,0.08)',
    borderRadius:'6px', padding:'12px',
    color:'rgba(255,255,255,0.8)', fontSize:'13px',
    resize:'none', outline:'none', boxSizing:'border-box',
    lineHeight:'1.6',
  };

  const STEPS = ['Content','Creative','Character','Scene','Realism'];
  const progress = ((step - 1) / 4) * 100;
  const scene = PREVIEW_SCENES[previewIdx];

  // ── LOADING SCREEN ──
  if (loading) return (
    <div style={{
      background:'#0D0A0E', minHeight:'100vh', color:'white',
      display:'flex', flexDirection:'column' as const,
      alignItems:'center', justifyContent:'center',
      fontFamily:"'Inter', sans-serif",
      position:'relative', overflow:'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes pulse { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(212,175,135,0.2)} 50%{box-shadow:0 0 60px rgba(212,175,135,0.5)} }
      `}</style>

      {/* ambient bg */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(158,90,43,0.12) 0%, transparent 65%)',pointerEvents:'none'}} />

      <div style={{position:'relative',textAlign:'center',maxWidth:'480px',padding:'0 32px'}}>
        <div style={{
          width:72,height:72,borderRadius:'50%',
          border:'1px solid rgba(212,175,135,0.3)',
          display:'flex',alignItems:'center',justifyContent:'center',
          margin:'0 auto 32px',
          animation:'glow 2s ease-in-out infinite',
          background:'rgba(212,175,135,0.06)',
        }}>
          <div style={{fontSize:28,animation:'pulse 2s ease-in-out infinite'}}>⚡</div>
        </div>

        <div style={{
          fontFamily:"'Cormorant Garamond', serif", fontWeight:300,
          fontSize:36, lineHeight:1.1, color:'#F5F0E8',
          letterSpacing:'-0.5px', marginBottom:16,
        }}>
          Building your<br /><em style={{color:'#D4AF87'}}>campaign</em>
        </div>

        <div key={loadStep} style={{
          fontSize:13, color:'rgba(212,175,135,0.7)', marginBottom:48,
          letterSpacing:'0.06em', animation:'fadeUp 0.5s ease',
          fontFamily:"'Inter', sans-serif", fontWeight:300,
        }}>
          {LOADING_STEPS[loadStep]}
        </div>

        {/* progress */}
        <div style={{
          width:'100%', height:1,
          background:'rgba(255,255,255,0.08)', borderRadius:1,
          marginBottom:16, overflow:'hidden', position:'relative',
        }}>
          <div style={{
            height:'100%',
            width:`${((loadStep + 1) / LOADING_STEPS.length) * 100}%`,
            background:'linear-gradient(90deg, rgba(212,175,135,0.4), #D4AF87)',
            transition:'width 3.5s linear',
            position:'relative',
          }}>
            <div style={{
              position:'absolute',inset:0,
              background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)',
              animation:'shimmer 1.5s infinite',
            }} />
          </div>
        </div>

        <div style={{
          display:'flex', justifyContent:'space-between',
          fontFamily:"'Inter', sans-serif", fontSize:10,
          color:'rgba(255,255,255,0.2)', letterSpacing:'0.1em',
          textTransform:'uppercase',
        }}>
          <span>Human Realism Engine™</span>
          <span>{Math.round(((loadStep + 1) / LOADING_STEPS.length) * 100)}%</span>
        </div>

        <div style={{marginTop:48, display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap' as const}}>
          {['Analyzing','Briefing','Realism','Motion','Retention','Finalizing'].map((s,i) => (
            <div key={s} style={{
              padding:'6px 12px', borderRadius:4,
              background: i <= loadStep ? 'rgba(212,175,135,0.12)' : 'rgba(255,255,255,0.03)',
              border:'1px solid '+(i <= loadStep ? 'rgba(212,175,135,0.3)' : 'rgba(255,255,255,0.06)'),
              fontSize:10, fontFamily:"'Inter',sans-serif", letterSpacing:'0.1em',
              color: i <= loadStep ? '#D4AF87' : 'rgba(255,255,255,0.2)',
              transition:'all 0.5s',
            }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── MAIN GENERATE UI ──
  return (
    <div style={{
      background:'#0D0A0E', minHeight:'100vh', color:'white',
      fontFamily:"'Inter', sans-serif", display:'flex', flexDirection:'column' as const,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(212,175,135,0.2); border-radius: 2px; }
        select option { background: #1A1015 !important; color: white; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sceneIn { from{opacity:0} to{opacity:1} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .step-btn:hover { background: rgba(212,175,135,0.08) !important; border-color: rgba(212,175,135,0.3) !important; }
        .platform-btn:hover { border-color: rgba(212,175,135,0.4) !important; color: #D4AF87 !important; }
        textarea::placeholder { color: rgba(255,255,255,0.2); }
        textarea:focus { border-color: rgba(212,175,135,0.3) !important; outline: none; }
        select:focus { border-color: rgba(212,175,135,0.3) !important; outline: none; }
      `}</style>

      {/* ── TOP NAV ── */}
      <nav style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 24px', height:52, flexShrink:0,
        borderBottom:'1px solid rgba(255,255,255,0.06)',
        background:'rgba(13,10,14,0.98)', backdropFilter:'blur(12px)',
        position:'sticky', top:0, zIndex:100,
      }}>
        <div style={{display:'flex',alignItems:'center',gap:32}}>
          <a href="/" style={{textDecoration:'none'}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:600,fontSize:14,color:'#F5F0E8',letterSpacing:'0.12em',textTransform:'uppercase' as const,lineHeight:1}}>
              Super<em style={{color:'#D4AF87',fontStyle:'italic',fontWeight:300}}>cool</em>
            </div>
            <div style={{fontSize:8,color:'rgba(255,255,255,0.2)',letterSpacing:'0.2em',textTransform:'uppercase' as const}}>Influencer</div>
          </a>
          <div style={{display:'flex',gap:4}}>
            {['Generate','History','Templates','Brand Kit'].map((item,i) => (
              <button key={item} style={{
                padding:'6px 14px', borderRadius:4, fontSize:12, fontWeight:i===0?500:400,
                border:'none', cursor:'pointer',
                background:i===0 ? 'rgba(212,175,135,0.12)' : 'transparent',
                color:i===0 ? '#D4AF87' : 'rgba(255,255,255,0.35)',
                display:'flex',alignItems:'center',gap:6,
              }}>
                {i===0 && <span style={{fontSize:10}}>⚡</span>}
                {item}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <div style={{
            display:'flex',alignItems:'center',gap:8,padding:'6px 14px',
            border:'1px solid rgba(212,175,135,0.2)',borderRadius:4,
            background:'rgba(212,175,135,0.06)',
          }}>
            <span style={{fontSize:12}}>⚡</span>
            <div>
              <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em',textTransform:'uppercase' as const}}>Credits</div>
              <div style={{fontSize:13,fontWeight:600,color:'#D4AF87'}}>1,250</div>
            </div>
          </div>
          <div style={{
            width:32,height:32,borderRadius:'50%',
            background:'linear-gradient(135deg,#8B5E3C,#D4AF87)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:13,fontWeight:600,color:'white',cursor:'pointer',
          }}>K</div>
        </div>
      </nav>

      {/* ── MAIN SPLIT ── */}
      <div style={{display:'flex',flex:1,overflow:'hidden',minHeight:0}}>

        {/* ── LEFT: VISUAL PREVIEW ── */}
        <div style={{
          width:'47%', flexShrink:0, position:'relative',
          background:'#0A0709', overflow:'hidden',
          display:'flex', flexDirection:'column' as const,
        }}>
          {/* Scene preview */}
          <div key={previewIdx} style={{
            flex:1, background:scene.bg,
            position:'relative', animation:'sceneIn 1.2s ease',
            display:'flex', flexDirection:'column' as const,
            justifyContent:'space-between', padding:20,
          }}>
            {/* Overlay */}
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,0.15) 0%,transparent 40%,rgba(0,0,0,0.6) 100%)',pointerEvents:'none'}} />

            {/* Top badge */}
            <div style={{position:'relative',zIndex:2,display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div style={{
                display:'flex',alignItems:'center',gap:6,
                background:'rgba(0,0,0,0.4)',backdropFilter:'blur(8px)',
                border:'1px solid rgba(255,255,255,0.15)',
                borderRadius:4,padding:'5px 10px',
              }}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'#4ADE80',animation:'pulse 1.5s infinite'}} />
                <span style={{fontSize:10,fontWeight:600,letterSpacing:'0.1em',color:'white'}}>VISUAL PREVIEW</span>
              </div>
              <div style={{
                background:'rgba(0,0,0,0.5)',backdropFilter:'blur(8px)',
                border:'1px solid rgba(255,255,255,0.15)',
                borderRadius:4,padding:'5px 10px',fontSize:11,fontWeight:600,color:'white',
              }}>9:16</div>
            </div>

            {/* Bottom info */}
            <div style={{position:'relative',zIndex:2}}>
              {/* Shot insight card */}
              <div style={{
                background:'rgba(0,0,0,0.55)',backdropFilter:'blur(12px)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:8,padding:'12px 14px',marginBottom:12,
              }}>
                <div style={{fontSize:9,fontWeight:600,letterSpacing:'0.14em',color:'rgba(212,175,135,0.7)',textTransform:'uppercase' as const,marginBottom:6}}>Shot Insight</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,0.75)',lineHeight:1.5,fontWeight:300}}>
                  {scene.label} creates cinematic depth and emotional warmth — ideal for retention.
                </div>
              </div>

              {/* Thumbnail strip */}
              <div style={{display:'flex',gap:6}}>
                {PREVIEW_SCENES.map((sc,i) => (
                  <div
                    key={i}
                    onClick={() => setPreviewIdx(i)}
                    style={{
                      flex:1,height:48,borderRadius:4,cursor:'pointer',
                      background:sc.bg,
                      border:'1px solid '+(i===previewIdx ? 'rgba(212,175,135,0.8)' : 'rgba(255,255,255,0.15)'),
                      transition:'border-color 0.3s',overflow:'hidden',
                    }}
                  />
                ))}
              </div>

              {/* Playbar */}
              <div style={{marginTop:12,display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:24,height:24,borderRadius:'50%',background:'rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:10}}>▶</div>
                <div style={{flex:1,height:2,background:'rgba(255,255,255,0.15)',borderRadius:1,position:'relative'}}>
                  <div style={{width:'30%',height:'100%',background:'rgba(212,175,135,0.8)',borderRadius:1}} />
                  <div style={{position:'absolute',top:'50%',left:'30%',transform:'translate(-50%,-50%)',width:8,height:8,borderRadius:'50%',background:'#D4AF87'}} />
                </div>
                <span style={{fontSize:10,color:'rgba(255,255,255,0.4)',fontFamily:'monospace'}}>00:12</span>
              </div>
            </div>
          </div>

          {/* Realism Engine Status */}
          <div style={{
            background:'#0F0B10',
            borderTop:'1px solid rgba(255,255,255,0.06)',
            padding:'14px 20px',
          }}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <span style={{fontSize:10,fontWeight:600,letterSpacing:'0.14em',color:'rgba(255,255,255,0.5)',textTransform:'uppercase' as const}}>Human Realism Engine</span>
              <span style={{fontSize:10,fontWeight:700,color:'#4ADE80',letterSpacing:'0.08em'}}>ACTIVE</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px 16px'}}>
              {['Skin Texture Simulation','Natural Lighting','Behavioral Delay','Fabric & Hair Physics','Micro Expressions','Eye Movement Tracking'].map(f => (
                <div key={f} style={{display:'flex',alignItems:'center',gap:6,fontSize:11,color:'rgba(255,255,255,0.45)'}}>
                  <span style={{color:'#4ADE80',fontSize:9}}>✓</span> {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: FORM ── */}
        <div style={{flex:1,display:'flex',flexDirection:'column' as const,overflow:'hidden',borderLeft:'1px solid rgba(255,255,255,0.06)'}}>

          {/* Step nav */}
          <div style={{
            padding:'0 24px',height:44,display:'flex',alignItems:'center',
            justifyContent:'space-between',
            borderBottom:'1px solid rgba(255,255,255,0.06)',
            background:'rgba(255,255,255,0.02)',flexShrink:0,
          }}>
            <div style={{display:'flex',gap:4}}>
              {STEPS.map((s,i) => (
                <button
                  key={s}
                  onClick={() => i < step && setStep(i+1)}
                  className="step-btn"
                  style={{
                    padding:'4px 12px',borderRadius:4,fontSize:11,fontWeight:500,
                    cursor:i < step ? 'pointer' : 'default',
                    border:'1px solid '+(i+1===step ? 'rgba(212,175,135,0.4)' : 'transparent'),
                    background:i+1===step ? 'rgba(212,175,135,0.1)' : 'transparent',
                    color:i+1===step ? '#D4AF87' : i+1<step ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                    letterSpacing:'0.04em',
                  }}
                >
                  {i+1 < step && <span style={{marginRight:4,color:'rgba(212,175,135,0.5)'}}>✓</span>}
                  {s}
                </button>
              ))}
            </div>
            <div style={{
              width:120,height:2,background:'rgba(255,255,255,0.08)',
              borderRadius:1,overflow:'hidden',
            }}>
              <div style={{
                height:'100%',width:`${progress}%`,
                background:'linear-gradient(90deg,rgba(212,175,135,0.5),#D4AF87)',
                transition:'width 0.4s ease',borderRadius:1,
              }} />
            </div>
          </div>

          {/* Form content */}
          <div style={{flex:1,overflowY:'auto' as const,padding:'24px'}}>

            {/* ── STEP 1: CONTENT ── */}
            {step===1 && (
              <div style={{animation:'fadeIn 0.3s ease'}}>
                <div style={{marginBottom:24}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:26,color:'#F5F0E8',letterSpacing:'-0.5px',marginBottom:4}}>What are you creating?</div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,0.3)',fontWeight:300}}>Define your content mode and niche.</div>
                </div>

                <div style={{marginBottom:20}}>
                  <div style={lbl}>Mode</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                    {[{id:'content',icon:'🎬',title:'Content Creator',desc:'Organic TikTok, Reels, Shorts'},{id:'ugc_ads',icon:'📢',title:'UGC Ads Mode',desc:'Meta Ads, TikTok Ads Manager'}].map(m => (
                      <button key={m.id} onClick={() => {setMode(m.id as any); set('mode',m.id);}} style={{
                        padding:'14px',borderRadius:6,textAlign:'left' as const,cursor:'pointer',
                        border:'1px solid '+(mode===m.id ? 'rgba(212,175,135,0.5)' : 'rgba(255,255,255,0.07)'),
                        background:mode===m.id ? 'rgba(212,175,135,0.08)' : 'rgba(255,255,255,0.03)',
                        transition:'all 0.2s',
                      }}>
                        <div style={{fontSize:18,marginBottom:6}}>{m.icon}</div>
                        <div style={{fontSize:13,fontWeight:600,color:mode===m.id ? '#D4AF87' : 'rgba(255,255,255,0.8)',marginBottom:3}}>{m.title}</div>
                        <div style={{fontSize:11,color:'rgba(255,255,255,0.3)',fontWeight:300}}>{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {mode==='ugc_ads' && (
                  <div style={{marginBottom:20}}>
                    <ChipGroup label="Ad Angle" field="adAngle" options={AD_ANGLES} />
                    <div>
                      <div style={lbl}>Product Description</div>
                      <textarea
                        placeholder="e.g. Dina Bright Radiant Glow Knuckle Serum — brightening serum for dark knuckles..."
                        value={form.productDescription}
                        onChange={e => set('productDescription',e.target.value)}
                        rows={3} style={ta}
                      />
                    </div>
                  </div>
                )}

                <ChipGroup label="Niche" field="niche" options={NICHES} />

                <div style={{marginBottom:20}}>
                  <div style={lbl}>Platform</div>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap' as const}}>
                    {PLATFORMS.map(p => (
                      <button key={p.id} onClick={() => set('platform',p.id)} className="platform-btn" style={{
                        padding:'8px 14px',borderRadius:5,fontSize:12,fontWeight:500,cursor:'pointer',
                        border:'1px solid '+(form.platform===p.id ? 'rgba(212,175,135,0.5)' : 'rgba(255,255,255,0.08)'),
                        background:form.platform===p.id ? 'rgba(212,175,135,0.1)' : 'rgba(255,255,255,0.03)',
                        color:form.platform===p.id ? '#D4AF87' : 'rgba(255,255,255,0.4)',
                        transition:'all 0.2s',
                      }}>{p.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: CREATIVE ── */}
            {step===2 && (
              <div style={{animation:'fadeIn 0.3s ease'}}>
                <div style={{marginBottom:24}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:26,color:'#F5F0E8',letterSpacing:'-0.5px',marginBottom:4}}>Define the creative.</div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,0.3)',fontWeight:300}}>Who speaks, who watches, what happens.</div>
                </div>

                <div style={{marginBottom:16}}>
                  <div style={lbl}>Target Audience</div>
                  <textarea placeholder="e.g. Women 25-35 who want glowy skin but are overwhelmed by routines..." value={form.targetAudience} onChange={e => set('targetAudience',e.target.value)} rows={2} style={ta} />
                </div>
                <div style={{marginBottom:16}}>
                  <div style={lbl}>Avatar Action — What Happens in the Video</div>
                  <textarea placeholder="e.g. She applies serum to her knuckles mid-FaceTime call, shows before/after..." value={form.avatarAction} onChange={e => set('avatarAction',e.target.value)} rows={2} style={ta} />
                </div>
                <div style={{marginBottom:20}}>
                  <div style={lbl}>Your Brief — Extra Direction</div>
                  <textarea placeholder="e.g. Tone should feel like a real girl sharing a secret with her friend, not a polished ad..." value={form.customBrief} onChange={e => set('customBrief',e.target.value)} rows={3} style={ta} />
                </div>
                <ChipGroup label="Content Vibe" field="influencerVibe" options={VIBES} />
                <ChipGroup label="Visual Aesthetic" field="aesthetic" options={AESTHETICS} />
                {mode==='ugc_ads' && <ChipGroup label="UGC Style" field="ugcStyle" options={UGC_STYLES} />}
              </div>
            )}

            {/* ── STEP 3: CHARACTER ── */}
            {step===3 && (
              <div style={{animation:'fadeIn 0.3s ease'}}>
                <div style={{marginBottom:24}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:26,color:'#F5F0E8',letterSpacing:'-0.5px',marginBottom:4}}>Build your character.</div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,0.3)',fontWeight:300}}>Who is the AI human in your video?</div>
                </div>

                <div style={{marginBottom:14}}>
                  <div style={lbl}>Gender</div>
                  <div style={{display:'flex',gap:8}}>
                    {['female','male'].map(g => (
                      <button key={g} onClick={() => { set('gender',g); set('hairstyle',''); set('outfit',''); setOutfitCat(g==='female' ? 'AI UGC / Creator' : 'Streetwear / Hype'); setHairstyleType('general'); }} style={{
                        flex:1,padding:'10px',borderRadius:6,cursor:'pointer',
                        border:'1px solid '+(form.gender===g ? 'rgba(212,175,135,0.5)' : 'rgba(255,255,255,0.08)'),
                        background:form.gender===g ? 'rgba(212,175,135,0.1)' : 'rgba(255,255,255,0.03)',
                        color:form.gender===g ? '#D4AF87' : 'rgba(255,255,255,0.4)',
                        fontSize:13,fontWeight:500,textTransform:'capitalize' as const,
                      }}>{g}</button>
                    ))}
                  </div>
                </div>

                <Drop label="Character Archetype" field="characterArchetype" options={CHARACTERS} />
                <Drop label="Ethnicity" field="ethnicity" options={ETHNICITIES} />
                <Drop label="Age Range" field="ageRange" options={AGE_RANGES} />
                <Drop label="Body Type" field="bodyType" options={form.gender==='female' ? FEMALE_BODY_TYPES : MALE_BODY_TYPES} />

                {form.gender==='male' && (
                  <div style={{marginBottom:14}}>
                    <div style={lbl}>Hairstyle Type</div>
                    <div style={{display:'flex',gap:6,marginBottom:10}}>
                      {[{id:'general',label:'General'},{id:'black',label:'Black / Dark Skin'}].map(t => (
                        <button key={t.id} onClick={() => { setHairstyleType(t.id); set('hairstyle',''); }} style={{flex:1,padding:'8px',borderRadius:5,border:'1px solid '+(hairstyleType===t.id ? 'rgba(212,175,135,0.5)' : 'rgba(255,255,255,0.08)'),background:hairstyleType===t.id ? 'rgba(212,175,135,0.1)' : 'rgba(255,255,255,0.03)',color:hairstyleType===t.id ? '#D4AF87' : 'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:12}}>{t.label}</button>
                      ))}
                    </div>
                    <Drop label="Hairstyle" field="hairstyle" options={hairstyleType==='black' ? MALE_HAIRSTYLES_BLACK : MALE_HAIRSTYLES_GENERAL} />
                  </div>
                )}

                {form.gender==='female' && <Drop label="Hairstyle" field="hairstyle" options={FEMALE_HAIRSTYLES} />}
                <Drop label="Hair Color" field="hairColor" options={HAIR_COLORS} />

                {form.gender==='male' && (
                  <>
                    <Drop label="Beard" field="beardOption" options={BEARD_OPTIONS} />
                    <Drop label="Tattoos" field="tattooOption" options={TATTOO_OPTIONS} />
                  </>
                )}

                <div style={{marginBottom:14}}>
                  <div style={lbl}>Outfit Category</div>
                  <select value={outfitCat} onChange={e => { setOutfitCat(e.target.value); set('outfit',''); }} style={dropStyle}>
                    {Object.keys(form.gender==='female' ? FEMALE_OUTFIT_CATS : MALE_OUTFIT_CATS).map(c => <option key={c} value={c} style={{background:'#1A1015'}}>{c}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:14}}>
                  <div style={lbl}>Specific Look</div>
                  <select value={form.outfit} onChange={e => set('outfit',e.target.value)} style={dropStyle}>
                    <option value="" style={{background:'#1A1015'}}>Select a look</option>
                    {(form.gender==='female' ? FEMALE_OUTFIT_CATS : MALE_OUTFIT_CATS)[outfitCat]?.map(o => <option key={o} value={o} style={{background:'#1A1015'}}>{o}</option>)}
                  </select>
                </div>
                <Drop label="Accessories" field="accessories" options={form.gender==='female' ? FEMALE_ACCESSORIES : MALE_ACCESSORIES} />
              </div>
            )}

            {/* ── STEP 4: SCENE ── */}
            {step===4 && (
              <div style={{animation:'fadeIn 0.3s ease'}}>
                <div style={{marginBottom:24}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:26,color:'#F5F0E8',letterSpacing:'-0.5px',marginBottom:4}}>Set the scene.</div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,0.3)',fontWeight:300}}>Where does this happen?</div>
                </div>
                <div style={{marginBottom:16}}>
                  <div style={lbl}>Scene Location</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                    {SCENE_LOCATIONS.map(scene => (
                      <button key={scene.id} onClick={() => set('sceneLocation',scene.id)} style={{
                        padding:'12px',borderRadius:6,cursor:'pointer',textAlign:'left' as const,
                        border:'1px solid '+(form.sceneLocation===scene.id ? 'rgba(212,175,135,0.5)' : 'rgba(255,255,255,0.07)'),
                        background:form.sceneLocation===scene.id ? 'rgba(212,175,135,0.08)' : 'rgba(255,255,255,0.03)',
                        transition:'all 0.2s',
                      }}>
                        <div style={{fontSize:12,fontWeight:600,color:form.sceneLocation===scene.id ? '#D4AF87' : 'rgba(255,255,255,0.75)',marginBottom:2}}>{scene.label}</div>
                        <div style={{fontSize:10,color:'rgba(255,255,255,0.3)',fontWeight:300}}>{scene.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <Drop label="Camera Angle" field="cameraAngle" options={CAMERA_ANGLES} />
                <Drop label="Lighting Type" field="lightingType" options={LIGHTING_TYPES} />
              </div>
            )}

            {/* ── STEP 5: REALISM ── */}
            {step===5 && (
              <div style={{animation:'fadeIn 0.3s ease'}}>
                <div style={{marginBottom:24}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:26,color:'#F5F0E8',letterSpacing:'-0.5px',marginBottom:4}}>Set the realism.</div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,0.3)',fontWeight:300}}>How human does this feel?</div>
                </div>
                <div style={{display:'flex',flexDirection:'column' as const,gap:8,marginBottom:24}}>
                  {REALISM_MODES.map(m => (
                    <button key={m.id} onClick={() => set('realismMode',m.id)} style={{
                      padding:'16px',borderRadius:6,cursor:'pointer',textAlign:'left' as const,
                      border:'1px solid '+(form.realismMode===m.id ? 'rgba(212,175,135,0.5)' : 'rgba(255,255,255,0.07)'),
                      background:form.realismMode===m.id ? 'rgba(212,175,135,0.08)' : 'rgba(255,255,255,0.03)',
                      transition:'all 0.2s',
                    }}>
                      <div style={{fontSize:13,fontWeight:600,color:form.realismMode===m.id ? '#D4AF87' : 'rgba(255,255,255,0.8)',marginBottom:4}}>{m.label}</div>
                      <div style={{fontSize:11,color:'rgba(255,255,255,0.35)',fontWeight:300}}>{m.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Summary */}
                <div style={{
                  background:'rgba(255,255,255,0.02)',
                  border:'1px solid rgba(255,255,255,0.06)',
                  borderRadius:8,padding:16,
                }}>
                  <div style={{fontSize:9,fontWeight:600,color:'rgba(212,175,135,0.5)',letterSpacing:'0.16em',textTransform:'uppercase' as const,marginBottom:12}}>Campaign Summary</div>
                  <div style={{display:'flex',flexDirection:'column' as const,gap:6}}>
                    {[
                      {label:'Mode', value:mode==='ugc_ads' ? 'UGC Ads' : 'Content Creator'},
                      {label:'Niche', value:form.niche},
                      {label:'Platform', value:form.platform},
                      {label:'Vibe', value:form.influencerVibe},
                      {label:'Character', value:[form.gender, form.ethnicity, form.ageRange].filter(Boolean).join(' · ')},
                      {label:'Look', value:form.outfit},
                      {label:'Scene', value:SCENE_LOCATIONS.find(sc => sc.id===form.sceneLocation)?.label||''},
                      {label:'Realism', value:REALISM_MODES.find(m => m.id===form.realismMode)?.label||''},
                    ].filter(i => i.value).map(item => (
                      <div key={item.label} style={{display:'flex',gap:8,fontSize:11}}>
                        <span style={{color:'rgba(255,255,255,0.25)',minWidth:70,fontWeight:300}}>{item.label}</span>
                        <span style={{color:'rgba(255,255,255,0.7)',fontWeight:400}}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── BOTTOM ACTIONS ── */}
          <div style={{
            padding:'14px 24px',
            borderTop:'1px solid rgba(255,255,255,0.06)',
            background:'rgba(255,255,255,0.02)',
            display:'flex',alignItems:'center',justifyContent:'space-between',
            flexShrink:0,
          }}>
            <div>
              {step > 1 && (
                <button onClick={() => setStep(s => s-1)} style={{
                  background:'none',border:'none',color:'rgba(255,255,255,0.3)',
                  cursor:'pointer',fontSize:12,letterSpacing:'0.06em',
                  fontFamily:"'Inter',sans-serif",
                }}>← Back</button>
              )}
            </div>

            <div style={{display:'flex',alignItems:'center',gap:12}}>
              {/* Technical settings strip */}
              {step===5 && (
                <div style={{display:'flex',gap:16,marginRight:8}}>
                  {[
                    {icon:'📐',label:'Platform',val:form.platform},
                    {icon:'📏',label:'Ratio',val:'9:16'},
                    {icon:'⏱️',label:'Duration',val:'15 sec'},
                  ].map(t => (
                    <div key={t.label} style={{textAlign:'center' as const}}>
                      <div style={{fontSize:14,marginBottom:2}}>{t.icon}</div>
                      <div style={{fontSize:9,color:'rgba(255,255,255,0.2)',textTransform:'uppercase' as const,letterSpacing:'0.1em'}}>{t.label}</div>
                      <div style={{fontSize:10,color:'rgba(255,255,255,0.5)',fontWeight:500,textTransform:'capitalize' as const}}>{t.val}</div>
                    </div>
                  ))}
                </div>
              )}

              {step < 5 ? (
                <button
                  onClick={() => setStep(s => s+1)}
                  disabled={step===1 && !form.niche}
                  style={{
                    background:step===1 && !form.niche ? 'rgba(212,175,135,0.3)' : '#D4AF87',
                    color:'#0D0A0E',padding:'10px 28px',borderRadius:4,
                    fontSize:12,fontWeight:600,cursor:step===1 && !form.niche ? 'not-allowed' : 'pointer',
                    border:'none',letterSpacing:'0.08em',textTransform:'uppercase' as const,
                    transition:'all 0.2s',
                  }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  style={{
                    background:'#D4AF87',color:'#0D0A0E',
                    padding:'10px 32px',borderRadius:4,
                    fontSize:12,fontWeight:700,cursor:'pointer',
                    border:'none',letterSpacing:'0.08em',textTransform:'uppercase' as const,
                    display:'flex',alignItems:'center',gap:8,
                    boxShadow:'0 4px 20px rgba(212,175,135,0.3)',
                  }}
                >
                  <span>⚡</span> Generate Campaign
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <style>{`
        @media (max-width: 768px) {
          .split-left { display: none !important; }
          .split-right { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
