import { contactInfo } from "@/data/contact";
import { legalInfo } from "@/data/legal";
import { siteConfig } from "@/data/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: contactInfo.email,
    telephone: contactInfo.phoneTel,
    address: {
      "@type": "PostalAddress",
      addressLocality: legalInfo.headquarters.city,
      postalCode: legalInfo.headquarters.postalCode,
      addressRegion: "Haute-Savoie",
      addressCountry: "FR",
    },
    founder: {
      "@type": "Person",
      name: legalInfo.publisher.name,
    },
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [contactInfo.instagram.url, contactInfo.tiktok.url],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "fr-FR",
  };
}
