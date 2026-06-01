"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeNav() {
  const pathname = usePathname();

  return (
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
      <Link href="/" style={{ textDecoration: "none" }}>
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

      {/* NAV LINKS */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Link href="/generate" style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textDecoration: "none",
          color: pathname === "/generate" ? "#F5F0E8" : "#8A7A7E",
        }}>
          Generate
        </Link>
        <Link href="/dashboard" style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textDecoration: "none",
          color: pathname === "/dashboard" ? "#F5F0E8" : "#8A7A7E",
        }}>
          Dashboard
        </Link>
        <Link href="/academy" style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textDecoration: "none",
          color: pathname === "/academy" ? "#F5F0E8" : "#8A7A7E",
        }}>
          Academy
        </Link>
        <Link href="/pricing" style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textDecoration: "none",
          color: pathname === "/pricing" ? "#F5F0E8" : "#8A7A7E",
        }}>
          Pricing
        </Link>
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
    </nav>
  );
}
