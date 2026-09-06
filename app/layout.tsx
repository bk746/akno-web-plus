import { Inter } from "next/font/google";
import { introBootScript } from "@/components/IntroBoot";
import { IntroProvider } from "@/components/IntroProvider";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageTransitionProvider } from "@/components/PageTransitionProvider";
import { SiteFrameGrid } from "@/components/SiteFrameGrid";
import { SiteNav } from "@/components/SiteNav";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = createPageMetadata();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html:not(.intro-complete) .site-shell { visibility: hidden; }
              html:not(.intro-complete) .site-intro-curtain { display: block; }
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <IntroProvider>
          <PageTransitionProvider>
            <SiteNav />
            <SiteFrameGrid />
            {children}
            <CookieBanner />
          </PageTransitionProvider>
        </IntroProvider>
      </body>
    </html>
  );
}
