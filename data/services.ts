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
        id: "maquettes",
        name: "Maquettes UI",
        price: "990 €",
        description:
          "Jusqu'à 5 écrans clés en desktop et mobile : wireframes et interfaces finales livrées sur Figma, prêtes à intégrer. Une base visuelle claire pour lancer le développement sans repartir de zéro.",
      },
      {
        id: "design-system",
        name: "Design system",
        price: "1 990 €",
        description:
          "Bibliothèque de composants, tokens couleur et typographie, plus guidelines d'usage. Une base cohérente pour faire évoluer votre site ou produit sans perdre en qualité visuelle.",
      },
      {
        id: "ux-ui-complet",
        name: "UX/UI complet",
        price: "2 990 € – 3 990 €",
        description:
          "De la recherche au handoff dev : parcours utilisateur, wireframes, prototypes et interfaces finales. Livrable complet pour un site vitrine ou un produit digital pensé pour convertir.",
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
        id: "template",
        name: "Template AKNO",
        price: "499 €",
        description:
          "Un site professionnel livré rapidement à partir de notre base AKNO : structure optimisée, design soigné, personnalisation de votre identité (logo, couleurs, textes) et mise en ligne incluse. Idéal pour démarrer vite avec un rendu premium, sans budget sur-mesure.",
      },
      {
        id: "sur-mesure",
        name: "Site web personnalisé",
        price: "3 500 € – 5 000 €",
        description:
          "Conception et développement sur mesure, pensés pour votre marque et vos objectifs business. Design unique, parcours utilisateur optimisé, animations, SEO de base et performance — pour une vitrine digitale qui se démarque vraiment.",
      },
      {
        id: "ecommerce",
        name: "E-commerce",
        price: "Sur devis",
        description:
          "Boutique en ligne adaptée à votre catalogue, vos flux et vos ambitions : catalogue produits, panier, paiement sécurisé, gestion des commandes et UX d'achat optimisée. Chiffrage personnalisé selon le volume, les intégrations et le niveau de customisation.",
      },
    ],
  },
  {
    id: "ecommerce",
    title: "Direction artistique",
    image: card4,
    theme: {
      from: "#5a48c8",
      to: "#9b8cf0",
      glowA: "#5ae3ed",
      glowB: "#3a2f80",
    },
    subtitle:
      "Une vision créative cohérente qui unit storytelling, design et identité de marque.",
    paragraph:
      "Nous pilotons la direction artistique de bout en bout pour garantir impact, cohérence et émotion à chaque point de contact.",
    points: [],
    offers: [
      {
        id: "shooting-assets",
        name: "Shooting & assets",
        price: "500 €",
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
    id: "accompagnement",
    title: "Accompagnement",
    image: card3,
    theme: {
      from: "#4f5d52",
      to: "#8f9f8a",
      glowA: "#b8c4b0",
      glowB: "#2f3832",
    },
    subtitle:
      "Votre site reste à jour, sécurisé et performant — sans y penser.",
    paragraph:
      "Un abonnement mensuel pour la maintenance, les mises à jour et les ajustements de contenu. Vous vous concentrez sur votre business, on s'occupe du reste.",
    points: [],
    offers: [
      {
        id: "basique",
        name: "Basique",
        price: "49 € / mois",
        description:
          "Maintenance technique, mises à jour de sécurité, sauvegarde mensuelle et jusqu'à 2 modifications de texte par mois (titres, descriptions, coordonnées). Support par email sous 72 h.",
      },
      {
        id: "confort",
        name: "Confort",
        price: "89 € / mois",
        description:
          "Tout le Basique, plus jusqu'à 5 modifications de contenu par mois (textes, images, liens), ajustements visuels légers et support prioritaire sous 48 h. Rapport de performance trimestriel.",
      },
      {
        id: "premium",
        name: "Premium",
        price: "149 € / mois",
        description:
          "Tout le Confort, plus modifications de contenu illimitées (dans la limite du raisonnable), ajout de sections ou pages simples, suivi SEO light et 1 call mensuel de 30 min. Support sous 24 h.",
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
      "Un coup d'accélérateur pour être trouvé et charger vite — le suivi, c'est l'Accompagnement.",
    paragraph:
      "Ces offres courent sur des missions ponctuelles : lancement, refonte ou optimisation ciblée. Pour la maintenance, les mises à jour et le suivi dans la durée, voir nos formules Accompagnement (Basique, Confort, Premium).",
    points: [],
    offers: [
      {
        id: "performance",
        name: "Performance web",
        price: "690 €",
        description:
          "Optimisation one-shot : vitesse de chargement, Core Web Vitals, images et bonnes pratiques techniques. Idéal au lancement ou après une refonte. Déjà inclus dans Accompagnement : maintenance technique (Basique+) et rapport de performance trimestriel (Confort+).",
      },
      {
        id: "seo-setup",
        name: "SEO setup",
        price: "990 €",
        description:
          "Mise en place SEO on-page : balises, structure sémantique, maillage interne, sitemap et recommandations éditoriales pour vos pages clés. Déjà inclus dans Accompagnement : modifications de contenu régulières (Confort+) et suivi SEO light (Premium).",
      },
      {
        id: "pack-visibilite",
        name: "Pack visibilité",
        price: "1 990 €",
        description:
          "Performance + SEO setup + configuration analytics en une seule mission. Le meilleur point de départ pour un site neuf ou une refonte complète. Le suivi mensuel, les modifs courantes et le monitoring continu → formules Accompagnement.",
      },
    ],
  },
];
