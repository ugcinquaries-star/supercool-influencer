'use client';
import { useUser, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function HomeNav() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <nav className="nav">
      <a href="/" className="logo dm" style={{display:'flex',flexDirection:'column' as const,gap:0,textDecoration:'none'}}>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:'14px',color:'#F5F0E8',letterSpacing:'0.22em',textTransform:'uppercase' as const}}><strong style={{fontWeight:700}}>SUPER</strong>COOL Influencer</span>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:'9px',fontWeight:300,letterSpacing:'0.22em',textTransform:'uppercase' as const,color:'rgba(245,240,232,0.3)',marginTop:'2px'}}>Your AI Content Director</span>
      </a>
      <div className="nav-links">
        {isLoaded && isSignedIn ? (
          <>
            <Link href="/generate" className="nav-a">Generate</Link>
            <Link href="/dashboard" className="nav-a">Dashboard</Link>
            <SignOutButton>
              <button style={{
                background: 'none', border: '1.5px solid rgba(158,24,43,0.3)',
                color: 'rgba(26,10,14,0.6)', fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em',
                textTransform: 'uppercase' as const, padding: '8px 18px',
                borderRadius: '2px', cursor: 'pointer',
              }}>Sign Out</button>
            </SignOutButton>
          </>
        ) : (
          <>
            <a href="/sign-in" className="nav-a">Sign in</a>
            <a href="/pricing" className="nav-a">Pricing</a>
            <a href="/generate" className="nav-cta">Start Free</a>
          </>
        )}
      </div>
    </nav>
  );
}
