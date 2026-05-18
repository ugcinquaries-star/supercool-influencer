'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ── Constants ──────────────────────────────────────────────
const AD_ANGLES = ['Before vs After','GRWM','Unboxing','Testimonial','Problem Solution','POV Storytime','Transformation','Myth Busting','TikTok Made Me Buy It','Honest Review','Day in the Life','Tutorial / How To'];
const NICHES = ['Beauty & Skincare','Fitness & Health','Finance & Crypto','Fashion & Style','Food & Cooking','Tech & AI','Travel','Mindset & Self-Help','Business','Home & Living','Pet Care','Baby & Parenting'];
const PLATFORMS = [{id:'tiktok',label:'TikTok'},{id:'instagram',label:'Instagram'},{id:'youtube_shorts',label:'YouTube Shorts'},{id:'meta_ads',label:'Meta Ads'},{id:'tiktok_ads',label:'TikTok Ads'}];
const VIBES = ['Luxury & Aspirational','Raw & Authentic','Bold & Controversial','Educational','Funny & Relatable','Dark & Mysterious','Motivational','Soft & Feminine','Clean & Minimal'];
const AESTHETICS = ['Clean White Studio','Dark Moody Cinematic','Pastel Dreamy','Golden Hour Warm','Neon Futuristic','Cozy Home','Luxury Marble','Outdoor Natural'];
const CHARACTERS = ['The Busy Founder','The Everyday Creator','The Wellness Seeker','The Social Connector','The Travel Explorer','The Professional','The Parent / Caregiver','The Creative Artist','The Bold Expressor'];
const ETHNICITIES = ['African American','Mixed Race','Caucasian','Asian','Latina','Middle Eastern','South Asian','East African','Caribbean'];
const AGE_RANGES = ['18-22','22-28','28-35','35-45','45-55','55+'];
const FEMALE_BODY_TYPES = ['Slim','Tall','Average','Toned','Curvy','Plus-Size','Hourglass','Petite Curvy','Athletic Build','Soft Average','Strong & Curvy'];
const MALE_BODY_TYPES = ['Slim','Tall','Average','Toned','Muscular','Athletic Build','Dad Bod','Plus-Size','Lean Muscle','Stocky'];
const FEMALE_HAIRSTYLES = ['Messy Bun','Low Sleek Bun','Beach Waves','Defined Curly','Coily / Afro','Bone Straight Silk Press','Bouncy Blowout','Blunt Bob','Knotless Braids','Boho Braids','Butterfly Locs','Box Braids','High Ponytail','Half-Up Half-Down','Pixie Cut','Curtain Bangs','Space Buns'];
const MALE_HAIRSTYLES_BLACK = ['Textured crop + low taper fade','360 waves + drop fade','Taper Afro','High top fade (modern controlled)','Buzz cut + beard combo','Coily low taper','Twist out + mid fade','Flat top (modern clean)','Sponge curls + taper','Burst fade','Shape-up / edge-up only','Afro fade','Short dreadlocks / starter locs','Long dreadlocks','Cornrows (straight back)','Cornrows (designs)','High skin fade + shape-up','Low fade + natural curls on top'];
const MALE_HAIRSTYLES_GENERAL = ['Textured crop + mid fade','French crop + skin fade','Crew cut (modern)','Soft mullet + taper','Curtains / center part','Buzz cut','Grown-out buzz','Pompadour (modern)','Caesar cut (modern)','Warrior cut','Bro flow / flow cut','Bowl cut (modern tapered)','Boy bangs / fringe','Skin fade + slick back','Low fade + side part','Shaved head','Short wavy + taper'];
const BEARD_OPTIONS = ['No beard / clean shaven','Light stubble (3-5 day)','Short neat beard (trimmed)','Full beard (medium length)','Long full beard','Goatee','Disconnected goatee','Mustache only','Fade beard (blended into skin)','Beard + line-up (sharp edges)'];
const TATTOO_OPTIONS = ['No tattoos','Sleeve tattoo (one arm)','Sleeve tattoo (both arms)','Neck tattoo','Hand tattoos','Chest tattoo (visible)','Full back tattoo','Minimal tattoos (few small)','Face tattoo (subtle)','Mixed tattoos (arms + neck)'];
const HAIR_COLORS = ['Natural Black','Dark Brown','Medium Brown','Golden Brown / Honey','Copper / Auburn','Caramel Balayage','Platinum Blonde','Rose Gold','Silver / Cool Grey','Bleached Blonde','Natural Grey','Two-tone / Dyed tips'];
const FEMALE_OUTFIT_CATS: Record<string,string[]> = {
  'AI UGC / Creator':['Beauty creator outfit','GRWM outfit','Sephora girl aesthetic','Luxury skincare creator fit','Hyperreal influencer look'],
  'Luxury / High Fashion':['Quiet luxury outfit','Old money outfit','Parisian chic','Editorial fashion look'],
  'Baddie / Trendy':['Clean girl outfit','It girl outfit','Hot girl summer outfit','Viral TikTok fit'],
  'Soft Girl / Feminine':['Soft girl outfit','Coquette outfit','Balletcore look','Romantic girl outfit'],
  'Fitness / Sporty':['Pilates princess outfit','Gym baddie fit','Athleisure look','Luxury activewear'],
  'Corporate / Boss':['Boss babe outfit','CEO look','Office siren outfit','Power suit look'],
  'Luxury Vacation':['Resort wear','Beach club look','Amalfi coast aesthetic','Euro summer aesthetic'],
};
const MALE_OUTFIT_CATS: Record<string,string[]> = {
  'Streetwear / Hype':['Oversized hoodie + cargo pants','Hype fit — Nike / Jordan / Adidas','Graphic tee + baggy jeans + sneakers','Vintage streetwear look','Skater aesthetic'],
  'Clean / Minimal':['White tee + slim jeans + white sneakers','Minimalist fit — neutral tones','Smart casual — chinos + polo','Quiet luxury menswear','Old money aesthetic'],
  'Luxury / Designer':['Designer fit — Louis Vuitton / Gucci / Dior','Luxury casual — premium basics','Fashion week aesthetic','Editorial menswear look'],
  'Fitness / Active':['Gym fit — compression + shorts','Athleisure — joggers + hoodie','Running / athletic fit','Luxury activewear (Lululemon / Represent)'],
  'Corporate / Professional':['Business casual — blazer + chinos','Full suit (modern cut)','CEO look — tailored with sneakers','Smart professional fit'],
  'Urban / ATL Vibe':['ATL fit — graphic tee + Jordan + gold chain','Trap aesthetic — designer + streetwear mix','Clean baller fit','Rapper aesthetic'],
  'Vacation / Lifestyle':['Summer fit — linen shirt + shorts','Beach look — swim shorts + open shirt','Resort wear — premium vacation fit','Euro summer aesthetic'],
};
const FEMALE_ACCESSORIES = ['No accessories','Gold necklace (delicate)','Gold necklace (statement)','Pearl necklace','Hoop earrings (small)','Hoop earrings (large)','Stud earrings','Luxury handbag','Mini bag / shoulder bag','Watch (luxury)','Bracelet stack','Rings (multiple)','Sunglasses','Hair accessory (claw clip / ribbon)'];
const MALE_ACCESSORIES = ['No accessories','Gold chain (thin)','Gold chain (thick / Cuban link)','Silver chain','Diamond stud earrings','Hoop earrings','Watch (luxury — AP / Rolex)','Watch (casual)','Rings (multiple)','Bracelet stack','Sunglasses','Cap (fitted)','Cap (snapback)','Beanie'];
const SCENE_LOCATIONS = [
  {id:'bathroom',label:'Bathroom',desc:'Skincare routines, post-shower, mirror moments'},
  {id:'bedroom',label:'Bedroom',desc:'Morning wake-up, night routine, wind-down'},
  {id:'kitchen',label:'Kitchen',desc:'Morning supplements, coffee ritual'},
  {id:'living_room',label:'Living Room',desc:'Couch moments, relaxed apply'},
  {id:'car',label:'Car',desc:'Parking lot haul, drive reveal'},
  {id:'hotel',label:'Hotel / Airbnb',desc:'Travel routine, luxury bathroom'},
  {id:'spa',label:'Spa / Salon',desc:'Post-treatment reveal, self-care'},
  {id:'fitness',label:'Gym / Fitness',desc:'Post-workout, active lifestyle'},
  {id:'coffee_shop',label:'Coffee Shop',desc:'Cafe table, between meetings'},
  {id:'outdoor_street',label:'Street / Outdoor',desc:'Golden hour, city walk'},
  {id:'airport',label:'Airport',desc:'Departure gate, travel moment'},
  {id:'travel_city',label:'Travel / City',desc:'Iconic locations, city backdrop'},
  {id:'gala_celebrity',label:'Gala / Red Carpet',desc:'Formal event, luxury venue'},
  {id:'amusement_museum',label:'Amusement / Museum',desc:'Fun environment, cultural setting'},
  {id:'concert_event',label:'Concert / Event',desc:'Venue energy, crowd, live event'},
];
const CAMERA_ANGLES = ['Selfie angle','Eye-level angle','Mirror angle','Over-the-shoulder','POV angle','Low angle','Overhead angle','Three-quarter angle','Intimate close angle','Dashboard angle'];
const LIGHTING_TYPES = ['Golden hour light','Window light','Ring light','Soft diffused light','Low-key moody light','Beauty lighting','Natural room lighting','Backlit window','Warm ambient lighting','Clean white lighting'];
const REALISM_MODES = [
  {id:'alive',label:'Alive Realism',desc:'Motion truth + biological realism — best for UGC'},
  {id:'ultra',label:'Ultra Realism',desc:'Maximum raw authenticity, unfiltered imperfection'},
  {id:'everyday',label:'Everyday Realism',desc:'Relatable, natural, unposed — casual creator energy'},
  {id:'brand_clean',label:'Brand Clean',desc:'Polished but human — for luxury or corporate content'},
];
const UGC_STYLES = ['Raw authentic UGC','Aesthetic UGC','Documentary-style UGC','POV UGC','Talking-head UGC','Voiceover UGC','ASMR UGC','Faceless UGC','Hands-only UGC','Testimonial UGC','Vlog-style UGC'];

const s: any = {
  drop: {width:'100%',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'10px',padding:'12px 14px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer',appearance:'none' as const},
  label: {fontSize:'11px',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase' as const,color:'rgba(255,255,255,0.35)',marginBottom:'8px',display:'block'},
  textarea: {width:'100%',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',padding:'14px',color:'white',fontSize:'14px',resize:'none' as const,outline:'none',boxSizing:'border-box' as const},
};

// ── Component ──────────────────────────────────────────────
export default function GeneratePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<'content'|'ugc_ads'>('content');
  const [loading, setLoading] = useState(false);
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
    reelDuration:'10',
  });

  const set = (f: string, v: string) => setForm(p => ({...p, [f]: v}));

  const handleGenerate = async () => {
    setLoading(true);
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

  const Chip = ({label, field, val, color}: any) => (
    <button onClick={() => set(field, val)} style={{padding:'9px 14px',borderRadius:'9px',fontSize:'13px',fontWeight:500,cursor:'pointer',border:'1px solid '+(form[field as keyof typeof form]===val ? color : 'rgba(255,255,255,0.1)'),background:form[field as keyof typeof form]===val ? color+'22' : 'rgba(255,255,255,0.04)',color:form[field as keyof typeof form]===val ? color : 'rgba(255,255,255,0.6)'}}>
      {label}
    </button>
  );

  const ChipGroup = ({label, field, options, color}: any) => (
    <div style={{marginBottom:'24px'}}>
      <span style={s.label}>{label}</span>
      <div style={{display:'flex',flexWrap:'wrap' as const,gap:'8px'}}>
        {options.map((o: string) => <Chip key={o} label={o} field={field} val={o} color={color} />)}
      </div>
    </div>
  );

  const Drop = ({label, field, options, placeholder}: any) => (
    <div style={{marginBottom:'16px'}}>
      <span style={s.label}>{label}</span>
      <select value={form[field as keyof typeof form]} onChange={e => set(field, e.target.value)} style={s.drop}>
        <option value="" style={{background:'#131013'}}>{placeholder || 'Select '+label}</option>
        {options.map((o: string) => <option key={o} value={o} style={{background:'#131013'}}>{o}</option>)}
      </select>
    </div>
  );

  if (loading) return (
    <div style={{background:'#0D0A0E',minHeight:'100vh',color:'white',fontFamily:'sans-serif',display:'flex',flexDirection:'column' as const,alignItems:'center',justifyContent:'center',gap:'24px'}}>
      <div style={{fontSize:'56px'}}>⚡</div>
      <h1 style={{fontSize:'32px',fontWeight:800,letterSpacing:'-1px'}}>Building your production brief...</h1>
      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Applying Alive Realism system. About 30 seconds.</p>
      <div style={{width:'240px',height:'3px',background:'rgba(255,255,255,0.1)',borderRadius:'2px',overflow:'hidden'}}>
        <div style={{height:'100%',background:'linear-gradient(90deg, #9E182B, #D4AF87)',animation:'load 30s linear forwards',borderRadius:'2px'}} />
      </div>
      <style>{'@keyframes load { from { width: 0% } to { width: 100% } }'}</style>
    </div>
  );

  return (
    <div style={{background:'#0D0A0E',minHeight:'100vh',color:'white',fontFamily:'sans-serif'}}>
      <div style={{height:'3px',background:'rgba(255,255,255,0.1)'}}>
        <div style={{height:'100%',width:((step/5)*100)+'%',background:'linear-gradient(90deg, #9E182B, #D4AF87)',transition:'width 0.4s'}} />
      </div>
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'18px 48px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
        <a href="/dashboard" style={{fontWeight:800,fontSize:'18px',textDecoration:'none',color:'white'}}>super<span style={{color:'#D4AF87'}}>cool</span> influencer</a>
        <div style={{fontSize:'13px',color:'rgba(255,255,255,0.4)'}}>Step {step} of 5</div>
      </nav>

      <div style={{maxWidth:'680px',margin:'0 auto',padding:'48px 24px'}}>

        {/* STEP 1 */}
        {step===1 && (
          <div>
            <h1 style={{fontSize:'36px',fontWeight:800,letterSpacing:'-2px',marginBottom:'8px'}}>What are you creating?</h1>
            <p style={{color:'rgba(255,255,255,0.4)',marginBottom:'32px'}}>Choose your mode first.</p>
            <div style={{marginBottom:'32px'}}>
              <span style={s.label}>Creation Mode</span>
              <div style={{display:'flex',gap:'12px'}}>
                {[{id:'content',icon:'🎬',title:'Content Creator',desc:'Organic TikTok, Reels, Shorts'},{id:'ugc_ads',icon:'📢',title:'UGC Ads Mode',desc:'Meta Ads, TikTok Ads Manager'}].map(m => (
                  <button key={m.id} onClick={() => {setMode(m.id as any); set('mode',m.id);}} style={{flex:1,padding:'18px',borderRadius:'12px',border:'1px solid '+(mode===m.id ? 'rgba(158,24,43,0.6)' : 'rgba(255,255,255,0.1)'),background:mode===m.id ? 'rgba(158,24,43,0.12)' : 'rgba(255,255,255,0.04)',cursor:'pointer',textAlign:'left' as const}}>
                    <div style={{fontSize:'20px',marginBottom:'6px'}}>{m.icon}</div>
                    <div style={{fontSize:'14px',fontWeight:700,color:mode===m.id ? '#F2E0D2' : 'white',marginBottom:'4px'}}>{m.title}</div>
                    <div style={{fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            {mode==='ugc_ads' && (
              <div style={{marginBottom:'24px'}}>
                <ChipGroup label="Ad Angle" field="adAngle" options={AD_ANGLES} color="#f9a8d4" />
                <div style={{marginBottom:'16px'}}>
                  <span style={s.label}>Product / Service Description</span>
                  <textarea placeholder="e.g. Dina Bright Radiant Glow Knuckle Serum — brightening serum for dark knuckles..." value={form.productDescription} onChange={e => set('productDescription',e.target.value)} rows={3} style={s.textarea} />
                </div>
              </div>
            )}
            <ChipGroup label="Niche" field="niche" options={NICHES} color="#D4AF87" />
            <div style={{marginBottom:'24px'}}>
              <span style={s.label}>Platform</span>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap' as const}}>
                {PLATFORMS.map(p => (
                  <button key={p.id} onClick={() => set('platform',p.id)} style={{padding:'12px 16px',borderRadius:'10px',border:'1px solid '+(form.platform===p.id ? 'rgba(158,24,43,0.6)' : 'rgba(255,255,255,0.1)'),background:form.platform===p.id ? 'rgba(158,24,43,0.15)' : 'rgba(255,255,255,0.04)',color:form.platform===p.id ? '#F2E0D2' : 'rgba(255,255,255,0.6)',cursor:'pointer',fontSize:'13px',fontWeight:600}}>{p.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step===2 && (
          <div>
            <h1 style={{fontSize:'36px',fontWeight:800,letterSpacing:'-2px',marginBottom:'8px'}}>Define the content.</h1>
            <p style={{color:'rgba(255,255,255,0.4)',marginBottom:'32px'}}>Who speaks, who watches, what happens.</p>
            <div style={{marginBottom:'24px'}}>
              <span style={s.label}>Target Audience</span>
              <textarea placeholder="e.g. Women 25-35 who want glowy skin but are overwhelmed by routines..." value={form.targetAudience} onChange={e => set('targetAudience',e.target.value)} rows={3} style={s.textarea} />
            </div>
            <div style={{marginBottom:'24px'}}>
              <span style={s.label}>Avatar Action — What Happens in the Video</span>
              <textarea placeholder="e.g. She applies serum to her knuckles mid-FaceTime call, shows the before/after to camera, then picks up the cream jar..." value={form.avatarAction} onChange={e => set('avatarAction',e.target.value)} rows={3} style={s.textarea} />
            </div>
            <div style={{marginBottom:'24px'}}>
              <span style={s.label}>Your Brief — Extra Direction for the AI</span>
              <textarea placeholder="e.g. This is for Dina Bright skincare. Tone should feel like a real girl sharing a secret with her friend, not a polished ad..." value={form.customBrief} onChange={e => set('customBrief',e.target.value)} rows={4} style={s.textarea} />
            </div>
            <ChipGroup label="Content Vibe" field="influencerVibe" options={VIBES} color="#f9a8d4" />
            <ChipGroup label="Visual Aesthetic" field="aesthetic" options={AESTHETICS} color="#6ee7b7" />
            {mode==='ugc_ads' && <ChipGroup label="UGC Style" field="ugcStyle" options={UGC_STYLES} color="#fcd34d" />}
          </div>
        )}

        {/* STEP 3 */}
        {step===3 && (
          <div>
            <h1 style={{fontSize:'36px',fontWeight:800,letterSpacing:'-2px',marginBottom:'8px'}}>Build your character.</h1>
            <p style={{color:'rgba(255,255,255,0.4)',marginBottom:'32px'}}>Who is the AI human in your video?</p>

            <div style={{marginBottom:'16px'}}>
              <span style={s.label}>Gender</span>
              <div style={{display:'flex',gap:'10px'}}>
                {['female','male'].map(g => (
                  <button key={g} onClick={() => { set('gender',g); set('hairstyle',''); set('outfit',''); setOutfitCat(g==='female' ? 'AI UGC / Creator' : 'Streetwear / Hype'); setHairstyleType('general'); }} style={{flex:1,padding:'12px',borderRadius:'10px',border:'1px solid '+(form.gender===g ? 'rgba(158,24,43,0.6)' : 'rgba(255,255,255,0.1)'),background:form.gender===g ? 'rgba(158,24,43,0.15)' : 'rgba(255,255,255,0.04)',color:form.gender===g ? '#F2E0D2' : 'rgba(255,255,255,0.6)',cursor:'pointer',fontSize:'14px',fontWeight:600,textTransform:'capitalize' as const}}>{g}</button>
                ))}
              </div>
            </div>

            <Drop label="Character Archetype" field="characterArchetype" options={CHARACTERS} />
            <Drop label="Ethnicity" field="ethnicity" options={ETHNICITIES} />
            <Drop label="Age Range" field="ageRange" options={AGE_RANGES} />
            <Drop label="Body Type" field="bodyType" options={form.gender==='female' ? FEMALE_BODY_TYPES : MALE_BODY_TYPES} />

            {form.gender==='male' && (
              <div style={{marginBottom:'16px'}}>
                <span style={s.label}>Hairstyle Type</span>
                <div style={{display:'flex',gap:'8px',marginBottom:'10px'}}>
                  {[{id:'general',label:'General / Caucasian'},{id:'black',label:'Black / Dark Skin'}].map(t => (
                    <button key={t.id} onClick={() => { setHairstyleType(t.id); set('hairstyle',''); }} style={{flex:1,padding:'10px',borderRadius:'8px',border:'1px solid '+(hairstyleType===t.id ? 'rgba(158,24,43,0.6)' : 'rgba(255,255,255,0.1)'),background:hairstyleType===t.id ? 'rgba(158,24,43,0.15)' : 'rgba(255,255,255,0.04)',color:hairstyleType===t.id ? '#F2E0D2' : 'rgba(255,255,255,0.6)',cursor:'pointer',fontSize:'13px',fontWeight:600}}>{t.label}</button>
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

            <div style={{marginBottom:'16px'}}>
              <span style={s.label}>Outfit Category</span>
              <select value={outfitCat} onChange={e => { setOutfitCat(e.target.value); set('outfit',''); }} style={s.drop}>
                {Object.keys(form.gender==='female' ? FEMALE_OUTFIT_CATS : MALE_OUTFIT_CATS).map(c => <option key={c} value={c} style={{background:'#131013'}}>{c}</option>)}
              </select>
            </div>

            <div style={{marginBottom:'16px'}}>
              <span style={s.label}>Specific Look</span>
              <select value={form.outfit} onChange={e => set('outfit',e.target.value)} style={s.drop}>
                <option value="" style={{background:'#131013'}}>Select a look</option>
                {(form.gender==='female' ? FEMALE_OUTFIT_CATS : MALE_OUTFIT_CATS)[outfitCat]?.map(o => <option key={o} value={o} style={{background:'#131013'}}>{o}</option>)}
              </select>
            </div>

            <Drop label="Accessories" field="accessories" options={form.gender==='female' ? FEMALE_ACCESSORIES : MALE_ACCESSORIES} />
          </div>
        )}

        {/* STEP 4 */}
        {step===4 && (
          <div>
            <h1 style={{fontSize:'36px',fontWeight:800,letterSpacing:'-2px',marginBottom:'8px'}}>Set the scene.</h1>
            <p style={{color:'rgba(255,255,255,0.4)',marginBottom:'32px'}}>Where does this happen?</p>
            <div style={{marginBottom:'20px'}}>
              <span style={s.label}>Scene Location</span>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'8px'}}>
                {SCENE_LOCATIONS.map(scene => (
                  <button key={scene.id} onClick={() => set('sceneLocation',scene.id)} style={{padding:'14px 16px',borderRadius:'10px',border:'1px solid '+(form.sceneLocation===scene.id ? 'rgba(158,24,43,0.6)' : 'rgba(255,255,255,0.08)'),background:form.sceneLocation===scene.id ? 'rgba(158,24,43,0.1)' : 'rgba(255,255,255,0.03)',cursor:'pointer',textAlign:'left' as const}}>
                    <div style={{fontSize:'13px',fontWeight:600,color:form.sceneLocation===scene.id ? '#F2E0D2' : 'white'}}>{scene.label}</div>
                    <div style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',marginTop:'2px'}}>{scene.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <Drop label="Camera Angle" field="cameraAngle" options={CAMERA_ANGLES} />
            <Drop label="Lighting Type" field="lightingType" options={LIGHTING_TYPES} />
          </div>
        )}

        {/* STEP 5 */}
        {step===5 && (
          <div>
            <h1 style={{fontSize:'36px',fontWeight:800,letterSpacing:'-2px',marginBottom:'8px'}}>Set the realism.</h1>
            <p style={{color:'rgba(255,255,255,0.4)',marginBottom:'32px'}}>How human does this feel?</p>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'10px',marginBottom:'32px'}}>
              {REALISM_MODES.map(m => (
                <button key={m.id} onClick={() => set('realismMode',m.id)} style={{padding:'18px 20px',borderRadius:'12px',border:'1px solid '+(form.realismMode===m.id ? 'rgba(158,24,43,0.6)' : 'rgba(255,255,255,0.08)'),background:form.realismMode===m.id ? 'rgba(158,24,43,0.12)' : 'rgba(255,255,255,0.03)',cursor:'pointer',textAlign:'left' as const}}>
                  <div style={{fontSize:'15px',fontWeight:700,color:form.realismMode===m.id ? '#F2E0D2' : 'white',marginBottom:'4px'}}>{m.label}</div>
                  <div style={{fontSize:'13px',color:'rgba(255,255,255,0.4)'}}>{m.desc}</div>
                </button>
              ))}
            </div>
            {/* Reel Duration */}
            <div style={{marginBottom:'32px'}}>
              <div style={{fontSize:'11px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em',textTransform:'uppercase' as const,marginBottom:'14px'}}>⏱ Reel Duration</div>
              <div style={{display:'flex',gap:'10px'}}>
                {[{v:'7',label:'7 seconds',desc:'Ultra-hook'},{ v:'10',label:'10 seconds',desc:'Standard'},{ v:'15',label:'15 seconds',desc:'Story arc'}].map(d => (
                  <button key={d.v} onClick={() => set('reelDuration', d.v)} style={{flex:1,padding:'14px 10px',borderRadius:'10px',border:'1px solid '+(form.reelDuration===d.v ? 'rgba(158,24,43,0.6)' : 'rgba(255,255,255,0.08)'),background:form.reelDuration===d.v ? 'rgba(158,24,43,0.12)' : 'rgba(255,255,255,0.03)',cursor:'pointer',textAlign:'center' as const}}>
                    <div style={{fontSize:'18px',fontWeight:800,color:form.reelDuration===d.v ? '#F2E0D2' : 'white',marginBottom:'2px'}}>{d.label}</div>
                    <div style={{fontSize:'11px',color:'rgba(255,255,255,0.4)'}}>{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'20px'}}>
              <div style={{fontSize:'11px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em',textTransform:'uppercase' as const,marginBottom:'14px'}}>Summary</div>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'6px'}}>
                {[
                  {label:'Mode', value:mode==='ugc_ads' ? 'UGC Ads' : 'Content Creator'},
                  {label:'Niche', value:form.niche},
                  {label:'Platform', value:form.platform},
                  {label:'Vibe', value:form.influencerVibe},
                  {label:'Character', value:form.gender+' | '+form.ethnicity},
                  {label:'Hair', value:form.hairstyle+' '+form.hairColor},
                  {label:'Beard', value:form.beardOption},
                  {label:'Tattoos', value:form.tattooOption},
                  {label:'Outfit', value:form.outfit},
                  {label:'Accessories', value:form.accessories},
                  {label:'Scene', value:SCENE_LOCATIONS.find(sc => sc.id===form.sceneLocation)?.label||''},
                  {label:'Realism', value:REALISM_MODES.find(m => m.id===form.realismMode)?.label||''},
                ].filter(i => i.value).map(item => (
                  <div key={item.label} style={{display:'flex',gap:'8px',fontSize:'13px'}}>
                    <span style={{color:'rgba(255,255,255,0.3)',minWidth:'80px'}}>{item.label}:</span>
                    <span style={{color:'rgba(255,255,255,0.85)'}}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NAV BUTTONS */}
        <div style={{display:'flex',justifyContent:'space-between',marginTop:'40px'}}>
          {step>1 ? (
            <button onClick={() => setStep(s => s-1)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'15px'}}>← Back</button>
          ) : <div />}
          {step<5 ? (
            <button onClick={() => setStep(s => s+1)} disabled={step===1 && !form.niche} style={{background:'white',color:'black',padding:'14px 32px',borderRadius:'100px',fontSize:'15px',fontWeight:700,cursor:'pointer',border:'none',opacity:step===1 && !form.niche ? 0.3 : 1}}>
              Continue →
            </button>
          ) : (
            <button onClick={handleGenerate} style={{background:'linear-gradient(135deg, #9E182B, #D4AF87)',color:'white',padding:'14px 36px',borderRadius:'100px',fontSize:'15px',fontWeight:700,cursor:'pointer',border:'none'}}>
              ⚡ Generate Production Brief
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
