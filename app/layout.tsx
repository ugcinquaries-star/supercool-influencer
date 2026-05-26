import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "SuperCool Influencer — AI UGC Production Briefs in 60 Seconds",
  description: "Generate hyper-realistic AI influencer production briefs for Seedance, Kling, Runway, Midjourney and Flux.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body style={{ margin: 0, padding: 0, background: '#06060b' }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
