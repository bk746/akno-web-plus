import { Inter } from "next/font/google";
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
      <body className={inter.className}>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
