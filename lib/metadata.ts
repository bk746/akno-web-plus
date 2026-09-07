import type { Metadata } from "next";
import { contactInfo } from "@/data/contact";
import { siteConfig } from "@/data/site";

export function createPageMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const pageTitle = title ?? siteConfig.title;
  const pageDescription = description ?? siteConfig.description;
  const canonical = `${siteConfig.url}${path}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: pageTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: pageDescription,
    applicationName: siteConfig.name,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical,
    },
    icons: {
      icon: [
        { url: "/icon.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/icon.png",
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: "/icon-512.png",
          width: 512,
          height: 512,
          alt: "AKNO — Agence web",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description: pageDescription,
      images: ["/icon-512.png"],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    other: {
      "contact:email": contactInfo.email,
      "contact:phone_number": contactInfo.phoneTel,
    },
  };
}
