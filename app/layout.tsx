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
        <body style={{ margin: 0, padding: 0, background: '#06060b' }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}