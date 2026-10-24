import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageTransitionProvider } from "@/components/motion/PageTransitionProvider";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ATELIER / FORM — Architecture in its purest form",
    template: "%s — ATELIER / FORM",
  },
  description:
    "ATELIER / FORM is a fictional independent architecture and design studio. Architecture shaped by structure, material, light, and the relationship between solid and void.",
  openGraph: { type: "website", siteName: "ATELIER / FORM", locale: "en" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F2F0EB",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        {/* Flags JS before first paint so hero elements can wait for their entrance */}
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js')`}
        </Script>
        <a
          href="#main"
          className="meta fixed top-3 left-3 z-[100] -translate-y-20 bg-ink px-4 py-3 text-ivory focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <PageTransitionProvider>
            <SiteHeader />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <SiteFooter />
          </PageTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
