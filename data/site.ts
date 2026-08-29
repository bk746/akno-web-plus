export const siteConfig = {
  name: "AKNO",
  legalName: "Keryan Bouzerda — AKNO",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://akno.fr",
  title: "AKNO — Sites et produits digitaux sur mesure",
  description:
    "AKNO conçoit sites vitrines, e-commerce et identité digitale sur mesure pour les marques qui veulent se démarquer. Réponse sous 24h, du lundi au vendredi.",
  locale: "fr_FR",
  keywords: [
    "agence web",
    "création site internet",
    "site vitrine",
    "e-commerce",
    "identité digitale",
    "Annecy",
    "Haute-Savoie",
    "AKNO",
  ],
} as const;
