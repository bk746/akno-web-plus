import { Inter } from "next/font/google";
import { IntroBoot } from "@/components/IntroBoot";
import { JsonLd } from "@/components/JsonLd";
import { PageTransitionProvider } from "@/components/PageTransitionProvider";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = createPageMetadata();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html:not(.intro-complete) .site-shell { visibility: hidden; }
              html:not(.intro-complete) .site-intro-curtain { display: block; }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <IntroBoot />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
