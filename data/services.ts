import type { StaticImageData } from "next/image";
import card1 from "@/src/images/card1.webp";
import card2 from "@/src/images/card2.webp";
import card3 from "@/src/images/card3.webp";
import card4 from "@/src/images/card4.webp";
import card5 from "@/src/images/card5.webp";

export type ServiceTheme = {
  from: string;
  to: string;
  glowA: string;
  glowB: string;
};

export type ServiceOffer = {
  id: string;
  name: string;
  price: string;
  description: string;
};

export type Service = {
  id: string;
  title: string;
  image: StaticImageData;
  theme: ServiceTheme;
  subtitle: string;
  paragraph: string;
  points: string[];
  offers?: ServiceOffer[];
};

export const services: Service[] = [
  {
    id: "ux-ui",
    title: "UX/UI Design",
    image: card1,
    theme: {
      from: "#0f3eb8",
      to: "#5a8fe8",
      glowA: "#97a0d6",
      glowB: "#2b4040",
    },
    subtitle:
      "L'UX/UI n'est pas un détail esthétique — c'est le levier qui transforme vos visiteurs en clients.",
    paragraph:
      "Avant même qu'un mot soit lu, votre interface crée une impression. Un design réfléchi inspire confiance, facilite la navigation et donne envie d'agir. À l'inverse, une expérience confuse fait fuir — et chaque visite perdue est une opportunité manquée. Chez AKNO, nous plaçons l'utilisateur au centre de chaque décision : recherche, parcours, wireframes, prototypes et interfaces finales. Parce qu'un beau site qui ne convertit pas ne sert pas votre business. Un bon design, si.",
    points: [],
    offers: [
      {
        id: "audit-ux",
        name: "Audit UX",
        price: "à partir de 490 €",
        description:
          "Analyse de votre interface existante, parcours utilisateur et points de friction. Recommandations concrètes pour améliorer l'expérience, la clarté et le taux de conversion — sans refonte complète.",
      },
      {
        id: "maquettes",
        name: "Maquettes UI",
        price: "à partir de 790 €",
        description:
          "Wireframes et écrans finaux pour vos pages clés. Design responsive, hiérarchie visuelle claire et composants réutilisables — prêts à être intégrés par votre équipe ou la nôtre.",
      },
      {
        id: "design-system",
        name: "Design system",
        price: "à partir de 1 490 €",
        description:
          "Bibliothèque de composants, tokens couleur/typo et guidelines d'usage. Une base cohérente pour faire évoluer votre produit ou votre site sans perdre en qualité visuelle.",
      },
      {
        id: "ux-ui-complet",
        name: "UX/UI complet",
        price: "à partir de 2 490 €",
        description:
          "Recherche utilisateur, parcours, prototypes interactifs et interfaces finales. De la stratégie à la livraison dev-ready — pour un site ou une app pensé pour convertir.",
      },
    ],
  },
  {
    id: "dev-web",
    title: "Site internet",
    image: card2,
    theme: {
      from: "#d94810",
      to: "#ff7a2f",
      glowA: "#ffb347",
      glowB: "#8a2a08",
    },
    subtitle:
      "Du portfolio à la boutique en ligne — des sites sur mesure, rapides et pensés pour convertir.",
    paragraph:
      "Chaque projet est différent. Nous concevons et développons des sites adaptés à votre activité, votre budget et vos objectifs — avec un code propre, une expérience fluide et une base solide pour évoluer.",
    points: [],
    offers: [
      {
        id: "portfolio",
        name: "Portfolio",
        price: "à partir de 890 €",
        description:
          "Site pensé pour mettre en valeur votre travail : projets, case studies, galeries et biographie. Idéal pour créatifs, photographes, architectes ou freelances qui veulent une vitrine élégante et crédible.",
      },
      {
        id: "pret-a-lemploi",
        name: "Site prêt à l'emploi",
        price: "à partir de 690 €",
        description:
          "Une base solide, personnalisée à votre image et livrée rapidement. Structure clé en main, contenus adaptés, mise en ligne incluse — parfait pour démarrer vite sans compromis sur la qualité.",
      },
      {
        id: "vitrine",
        name: "Site vitrine",
        price: "à partir de 1 890 €",
        description:
          "Présentation claire de votre activité, vos services et votre expertise. Pages sur mesure, formulaire de contact, SEO de base et design aligné sur votre marque — pour rassurer et convertir vos visiteurs.",
      },
      {
        id: "ecommerce",
        name: "Site e-commerce",
        price: "à partir de 3 490 €",
        description:
          "Boutique en ligne complète : catalogue produits, panier, paiement sécurisé et gestion des commandes. UX d'achat optimisée, responsive et performante — pour vendre en ligne sereinement.",
      },
    ],
  },
  {
    id: "ecommerce",
    title: "Direction artistique",
    image: card3,
    theme: {
      from: "#4f5d52",
      to: "#8f9f8a",
      glowA: "#b8c4b0",
      glowB: "#2f3832",
    },
    subtitle:
      "Une vision créative cohérente qui unit storytelling, design et identité de marque.",
    paragraph:
      "Nous pilotons la direction artistique de bout en bout pour garantir impact, cohérence et émotion à chaque point de contact.",
    points: [],
    offers: [
      {
        id: "direction-ponctuelle",
        name: "Direction ponctuelle",
        price: "à partir de 590 €",
        description:
          "Brief créatif, axes visuels et recommandations pour un projet ou une campagne. Idéal pour cadrer une direction avant production — site, lancement produit ou contenu social.",
      },
      {
        id: "moodboards",
        name: "Moodboards & concepts",
        price: "à partir de 890 €",
        description:
          "Exploration visuelle : palettes, typographies, références photo et moodboards. Plusieurs pistes créatives pour valider l'univers de votre marque avant de passer à la production.",
      },
      {
        id: "shooting-assets",
        name: "Shooting & assets",
        price: "à partir de 1 290 €",
        description:
          "Direction de shooting, sélection visuelle et déclinaison d'assets pour web et réseaux. Images, visuels hero et contenus prêts à intégrer dans vos supports digitaux.",
      },
      {
        id: "da-complete",
        name: "DA complète",
        price: "à partir de 2 490 €",
        description:
          "Pilotage créatif de bout en bout : concept, guidelines visuelles, assets et cohérence sur tous vos points de contact. Storytelling, design et identité alignés sur une même vision.",
      },
    ],
  },
  {
    id: "branding",
    title: "Branding digital",
    image: card4,
    theme: {
      from: "#5a48c8",
      to: "#9b8cf0",
      glowA: "#5ae3ed",
      glowB: "#3a2f80",
    },
    subtitle:
      "Des identités fortes qui se démarquent et inspirent confiance en ligne.",
    paragraph:
      "Logo, tonalité, univers visuel : nous construisons des marques mémorables adaptées aux codes du digital.",
    points: [],
    offers: [
      {
        id: "logo",
        name: "Logo",
        price: "à partir de 490 €",
        description:
          "Création de logo sur mesure avec plusieurs propositions et déclinaisons (couleur, monochrome, favicon). Un symbole fort, lisible en petit format et adapté au digital.",
      },
      {
        id: "identite",
        name: "Identité visuelle",
        price: "à partir de 990 €",
        description:
          "Logo, palette couleur, typographies et univers graphique. Les fondations de votre marque en ligne — cohérentes, mémorables et prêtes à décliner sur vos supports.",
      },
      {
        id: "charte",
        name: "Charte graphique",
        price: "à partir de 1 690 €",
        description:
          "Identité complète + règles d'usage, templates réseaux sociaux et éléments de communication. Tout ce qu'il faut pour que votre marque reste homogène partout.",
      },
      {
        id: "brand-book",
        name: "Brand book",
        price: "à partir de 2 490 €",
        description:
          "Documentation complète de votre marque : logo, tonalité, visuels, do's & don'ts et templates. La référence pour votre équipe, vos prestataires et vos futurs projets.",
      },
    ],
  },
  {
    id: "seo",
    title: "SEO & performance",
    image: card5,
    theme: {
      from: "#0b7a72",
      to: "#34d4bf",
      glowA: "#6ee7d9",
      glowB: "#064e47",
    },
    subtitle:
      "Visibilité, vitesse et conversion — optimisés pour durer.",
    paragraph:
      "Audit, structure technique et contenu : nous optimisons votre présence pour être trouvé, rapide et efficace.",
    points: [],
    offers: [
      {
        id: "audit-seo",
        name: "Audit SEO",
        price: "à partir de 390 €",
        description:
          "Analyse technique, structure, contenu et concurrence. Rapport détaillé avec priorités d'action pour améliorer votre visibilité sur Google — sans engagement long terme.",
      },
      {
        id: "performance",
        name: "Performance web",
        price: "à partir de 590 €",
        description:
          "Optimisation vitesse de chargement, Core Web Vitals et bonnes pratiques techniques. Un site plus rapide = meilleure expérience, meilleur référencement et plus de conversions.",
      },
      {
        id: "seo-contenu",
        name: "SEO & contenu",
        price: "à partir de 890 €",
        description:
          "Structure sémantique, balises, maillage interne et recommandations éditoriales. On aligne votre contenu sur ce que vos clients recherchent réellement.",
      },
      {
        id: "pack-complet",
        name: "Pack complet",
        price: "à partir de 1 890 €",
        description:
          "Audit SEO, optimisations techniques, performance et suivi analytics. Un accompagnement global pour être trouvé, rapide et mesurer ce qui fonctionne vraiment.",
      },
    ],
  },
];
