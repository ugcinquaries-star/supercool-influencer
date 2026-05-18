'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AffiliatePage() {
  const [form, setForm] = useState({ name:'', email:'', platform:'', handle:'', followers:'', niche:'', why:'' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (f: string, v: string) => setForm(p => ({...p, [f]: v}));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.platform || !form.handle) return;
    setLoading(true);
    try {
      const res = await fetch('/api/affiliate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inp: React.CSSProperties = {
    width:'100%', background:'rgba(245,240,232,0.04)', border:'1px solid rgba(245,240,232,0.1)',
    borderRadius:'6px', padding:'13px 16px', color:'#F5F0E8', fontSize:'14px',
    fontFamily:"'DM Sans',sans-serif", fontWeight:300, outline:'none', boxSizing:'border-box',
  };
  const lbl: React.CSSProperties = {
    display:'block', fontFamily:"'DM Sans',sans-serif", fontSize:'10px', fontWeight:600,
    letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(245,240,232,0.4)', marginBottom:'8px',
  };

  return (
    <div style={{background:'#0F0B0C',minHeight:'100vh',color:'#F5F0E8',fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box}
        input::placeholder,textarea::placeholder{color:rgba(245,240,232,0.2)}
        input:focus,textarea:focus,select:focus{border-color:rgba(158,24,43,0.4)!important;outline:none}
        select option{background:#1C1616;color:#F5F0E8}
        .chip{padding:9px 16px;border-radius:100px;border:1px solid rgba(245,240,232,0.1);background:rgba(245,240,232,0.03);color:rgba(245,240,232,0.5);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;transition:all 0.2s;white-space:nowrap}
        .chip.on{border-color:rgba(158,24,43,0.5);background:rgba(158,24,43,0.1);color:#F2AFBC}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @media(max-width:768px){
          .grid2{grid-template-columns:1fr!important}
          .grid4{grid-template-columns:1fr 1fr!important}
          .nav-pad{padding:14px 20px!important}
          .page-pad{padding:60px 20px 100px!important}
        }
      `}</style>

      <nav className="nav-pad" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'18px 52px',borderBottom:'1px solid rgba(245,240,232,0.07)',background:'rgba(15,11,12,0.95)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:100}}>
        <Link href="/" style={{textDecoration:'none',display:'flex',flexDirection:'column',gap:0}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:'14px',color:'#F5F0E8',letterSpacing:'0.22em',textTransform:'uppercase'}}><strong style={{fontWeight:700}}>SUPER</strong>COOL Influencer</span>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:'9px',fontWeight:300,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(245,240,232,0.3)',marginTop:'2px'}}>Your AI Content Director</span>
        </Link>
        <div style={{display:'flex',gap:20,alignItems:'center'}}>
          <Link href="/pricing" style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(245,240,232,0.4)',textDecoration:'none'}}>Pricing</Link>
          <Link href="/generate" style={{background:'#9E182B',color:'white',fontFamily:"'DM Sans',sans-serif",fontSize:'11px',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',padding:'10px 22px',borderRadius:'3px',textDecoration:'none'}}>Start Free</Link>
        </div>
      </nav>

      <div className="page-pad" style={{maxWidth:'1100px',margin:'0 auto',padding:'80px 24px 120px'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:'64px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(158,24,43,0.1)',border:'1px solid rgba(158,24,43,0.22)',color:'#F2AFBC',fontFamily:"'DM Sans',sans-serif",fontSize:'10px',fontWeight:600,letterSpacing:'0.2em',textTransform:'uppercase',padding:'5px 14px',borderRadius:'100px',marginBottom:'24px'}}>
            <div style={{width:5,height:5,borderRadius:'50%',background:'#F2AFBC',animation:'pulse 2s ease-in-out infinite'}} />
            Affiliate Program
          </div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:'clamp(40px,6vw,80px)',lineHeight:0.95,letterSpacing:'-2px',color:'#F5F0E8',marginBottom:8}}>Earn while you</h1>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:'clamp(40px,6vw,80px)',lineHeight:0.95,letterSpacing:'-2px',fontStyle:'italic',color:'#9E182B',marginBottom:28}}>create.</h1>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'16px',fontWeight:300,color:'rgba(245,240,232,0.5)',maxWidth:520,margin:'0 auto',lineHeight:1.75}}>
            Share SuperCool with your audience and earn <strong style={{color:'#F2AFBC',fontWeight:600}}>40% recurring commission</strong> on every paying user — for as long as they stay subscribed.
          </p>
        </div>

        {/* Stats */}
        <div className="grid4" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:2,marginBottom:64}}>
          {[{n:'40%',l:'Recurring commission'},{n:'Monthly',l:'Payout schedule'},{n:'∞',l:'No earnings cap'},{n:'Instant',l:'Link activation'}].map(s => (
            <div key={s.l} style={{background:'#181214',border:'1px solid rgba(245,240,232,0.07)',borderRadius:'4px',padding:'28px 20px',textAlign:'center'}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4vw,36px)',fontWeight:900,color:'#9E182B',lineHeight:1,marginBottom:8}}>{s.n}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:'10px',fontWeight:400,color:'rgba(245,240,232,0.4)',letterSpacing:'0.06em',textTransform:'uppercase'}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* How it works + Form */}
        <div className="grid2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'start'}}>

          {/* Left */}
          <div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:'9px',fontWeight:600,letterSpacing:'0.24em',textTransform:'uppercase',color:'#F2AFBC',marginBottom:14,display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:18,height:1,background:'#F2AFBC'}} />How it works
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:'clamp(24px,3vw,40px)',lineHeight:1,letterSpacing:'-1px',color:'#F5F0E8',marginBottom:32}}>Simple.<br /><span style={{fontStyle:'italic',color:'#F2AFBC'}}>Recurring.</span></h2>

            {[
              {n:'01',t:'Apply below',d:'Fill out the form. Approval is instant for creators with an active audience.'},
              {n:'02',t:'Get your link',d:'Receive a unique referral link and promo assets ready to share.'},
              {n:'03',t:'Share SuperCool',d:'Post, story, mention — however fits your style. No scripts, no pressure.'},
              {n:'04',t:'Earn every month',d:'40% of every payment your referrals make, paid monthly. Forever.'},
            ].map(step => (
              <div key={step.n} style={{display:'flex',gap:20,padding:'18px 0',borderBottom:'1px solid rgba(245,240,232,0.06)'}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'11px',color:'rgba(245,240,232,0.2)',flexShrink:0,marginTop:2,width:20}}>{step.n}</div>
                <div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:'14px',fontWeight:600,color:'#F5F0E8',marginBottom:4}}>{step.t}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:300,color:'rgba(245,240,232,0.42)',lineHeight:1.65}}>{step.d}</div>
                </div>
              </div>
            ))}

            <div style={{background:'rgba(158,24,43,0.06)',border:'1px solid rgba(158,24,43,0.2)',borderRadius:'8px',padding:'24px 20px',marginTop:32}}>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:'9px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'#F2AFBC',marginBottom:14}}>Example earnings</div>
              {[{l:'10 Creator subscribers ($29/mo)',v:'$116/mo'},{l:'10 Agency subscribers ($79/mo)',v:'$316/mo'},{l:'25 mixed subscribers',v:'$580+/mo'},{l:'100 subscribers',v:'~$2,320/mo'}].map((r,i) => (
                <div key={r.l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:i<3?'1px solid rgba(245,240,232,0.05)':'none',borderTop:i===3?'1px solid rgba(158,24,43,0.2)':'none',marginTop:i===3?8:0,paddingTop:i===3?12:7}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'rgba(245,240,232,0.45)',fontWeight:i===3?600:300}}>{r.l}</span>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,color:i===3?'#F2AFBC':'rgba(245,240,232,0.6)'}}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div style={{background:'rgba(158,24,43,0.08)',border:'1px solid rgba(158,24,43,0.25)',borderRadius:'12px',padding:'48px 32px',textAlign:'center'}}>
                <div style={{fontSize:48,marginBottom:20}}>🎉</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:28,color:'#F5F0E8',marginBottom:12}}>Application received!</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:300,color:'rgba(245,240,232,0.5)',lineHeight:1.7,marginBottom:28}}>
                  We'll review and send your affiliate link to <strong style={{color:'#F2AFBC'}}>{form.email}</strong> within 24 hours.
                </p>
                <Link href="/generate" style={{display:'inline-block',background:'#9E182B',color:'white',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',padding:'14px 28px',borderRadius:'3px',textDecoration:'none'}}>
                  Generate a free brief while you wait →
                </Link>
              </div>
            ) : (
              <div style={{background:'#181214',border:'1px solid rgba(245,240,232,0.07)',borderRadius:'12px',padding:'32px 28px'}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:22,color:'#F5F0E8',marginBottom:6}}>Apply to join</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:300,color:'rgba(245,240,232,0.4)',marginBottom:28,lineHeight:1.6}}>2 minutes. Instant approval for active creators.</p>

                <div style={{display:'flex',flexDirection:'column',gap:18}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    <div><label style={lbl}>Full Name *</label><input style={inp} placeholder="Your name" value={form.name} onChange={e=>set('name',e.target.value)} /></div>
                    <div><label style={lbl}>Email *</label><input style={inp} type="email" placeholder="you@email.com" value={form.email} onChange={e=>set('email',e.target.value)} /></div>
                  </div>

                  <div>
                    <label style={lbl}>Primary Platform *</label>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      {['TikTok','Instagram','YouTube','Facebook','Other'].map(p => (
                        <button key={p} onClick={()=>set('platform',p)} className={`chip${form.platform===p?' on':''}`}>{p}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    <div><label style={lbl}>Your Handle *</label><input style={inp} placeholder="@yourhandle" value={form.handle} onChange={e=>set('handle',e.target.value)} /></div>
                    <div>
                      <label style={lbl}>Followers / Reach</label>
                      <select style={{...inp,appearance:'none'}} value={form.followers} onChange={e=>set('followers',e.target.value)}>
                        <option value="">Select range</option>
                        {['Under 1K','1K – 10K','10K – 50K','50K – 100K','100K – 500K','500K+'].map(o=><option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={lbl}>Your Niche</label>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      {['Beauty','Skincare','Fashion','Lifestyle','AI & Tech','UGC Creator','Fitness','Other'].map(n => (
                        <button key={n} onClick={()=>set('niche',n)} className={`chip${form.niche===n?' on':''}`}>{n}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={lbl}>Why SuperCool? <span style={{fontWeight:300,textTransform:'none',letterSpacing:0,fontSize:10}}>optional</span></label>
                    <textarea style={{...inp,resize:'none',height:80,lineHeight:'1.6'} as React.CSSProperties} placeholder="How would you share SuperCool with your audience?" value={form.why} onChange={e=>set('why',e.target.value)} />
                  </div>

                  <button onClick={handleSubmit} disabled={!form.name||!form.email||!form.platform||!form.handle||loading} style={{width:'100%',padding:'15px',background:(!form.name||!form.email||!form.platform||!form.handle)?'rgba(158,24,43,0.3)':'#9E182B',color:'white',border:'none',borderRadius:'3px',fontFamily:"'DM Sans',sans-serif",fontSize:'12px',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',cursor:(!form.name||!form.email||!form.platform||!form.handle)?'not-allowed':'pointer',boxShadow:(!form.name||!form.email||!form.platform||!form.handle)?'none':'0 4px 20px rgba(158,24,43,0.3)',transition:'all 0.2s'}}>
                    {loading ? 'Submitting...' : '⚡ Apply to Affiliate Program →'}
                  </button>

                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'rgba(245,240,232,0.2)',textAlign:'center',lineHeight:1.6}}>Payouts via PayPal or bank transfer · No minimum threshold · Cancel anytime</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
