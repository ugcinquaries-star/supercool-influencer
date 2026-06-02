"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function HomeNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/generate", label: "Generate" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/academy", label: "Academy" },
    { href: "/pricing", label: "Pricing" },
    { href: "/free", label: "Free Kit" },
  ];

  return (
    <>
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "#0A0608",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>

        {/* LOGO */}
        <Link href="/" style={{ textDecoration: "none" }} onClick={() => setOpen(false)}>
          <div style={{ lineHeight: 1 }}>
            <div style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#F5F0E8",
            }}>
              <span style={{ color: "#9E182B" }}>SUPER</span>COOL INFLUENCER
            </div>
            <div style={{
              fontSize: "0.55rem",
              letterSpacing: "0.18em",
              color: "#8A7A7E",
              marginTop: "2px",
            }}>
              YOUR AI CONTENT DIRECTOR
            </div>
          </div>
        </Link>

        {/* DESKTOP LINKS — hidden on mobile */}
        <div className="sc-nav-desktop" style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: pathname === l.href ? "#F5F0E8" : "#8A7A7E",
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/generate" style={{
            padding: "9px 18px",
            background: "#9E182B",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}>
            START FREE
          </Link>
        </div>

        {/* HAMBURGER — mobile only */}
        <button
          className="sc-nav-hamburger"
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            zIndex: 110,
          }}
          aria-label="Toggle menu"
        >
          <span style={{
            display: "block",
            width: "22px",
            height: "2px",
            background: "#F5F0E8",
            borderRadius: "2px",
            transition: "all 0.25s",
            transform: open ? "translateY(7px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block",
            width: "22px",
            height: "2px",
            background: "#F5F0E8",
            borderRadius: "2px",
            transition: "all 0.25s",
            opacity: open ? 0 : 1,
          }} />
          <span style={{
            display: "block",
            width: "22px",
            height: "2px",
            background: "#F5F0E8",
            borderRadius: "2px",
            transition: "all 0.25s",
            transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
          }} />
        </button>
      </nav>

      {/* MOBILE DROPDOWN */}
      <div
        className="sc-nav-dropdown"
        style={{
          display: "none",
          position: "fixed",
          top: "53px",
          left: 0,
          right: 0,
          background: "#0A0608",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          zIndex: 99,
          flexDirection: "column",
          padding: open ? "16px 24px 24px" : "0 24px",
          maxHeight: open ? "400px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease, padding 0.3s ease",
        }}
      >
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{
              fontSize: "0.88rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: pathname === l.href ? "#F5F0E8" : "#8A7A7E",
              padding: "14px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "block",
            }}
          >
            {l.label}
          </Link>
        ))}

        <Link
          href="/generate"
          onClick={() => setOpen(false)}
          style={{
            marginTop: "16px",
            padding: "14px 0",
            background: "#9E182B",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "0.82rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            textAlign: "center",
            display: "block",
          }}
        >
          ⚡ START FREE — 3 BRIEFS
        </Link>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 98,
            background: "rgba(0,0,0,0.5)",
          }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .sc-nav-desktop { display: none !important; }
          .sc-nav-hamburger { display: flex !important; }
          .sc-nav-dropdown { display: flex !important; }
        }
      `}</style>
    </>
  );
}
