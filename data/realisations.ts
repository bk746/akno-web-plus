import type { StaticImageData } from "next/image";
import projetElegencia from "@/src/images/projet-1-elegencia.jpg";
import projetKafe from "@/src/images/projet-1-kafe.jpg";
import projetBkArchitecture from "@/src/images/projet-4-bkarchitecture.jpg";
import projetAvero from "@/src/images/projet-5-avero.jpg";

export function isExternalProjectUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

export type Realisation = {
  id: string;
  name: string;
  tags: string;
  role: string;
  url: string;
  image: StaticImageData;
  description: string;
  categories: [string, string];
};

export const realisations: Realisation[] = [
  {
    id: "elegencia",
    name: "Elegencia",
    tags: "Site vitrine, luxe",
    role: "Design & développement web",
    url: "#",
    image: projetElegencia,
    description:
      "Site vitrine haut de gamme pour une marque de luxe. Direction artistique, design sur mesure et développement front-end — sans template. Une expérience immersive pensée pour mettre en valeur l'univers de la marque et convertir une clientèle exigeante.",
    categories: ["Web design & développement", "Site vitrine, luxe"],
  },
  {
    id: "kafe",
    name: "Kafé",
    tags: "Restaurant, identité digitale",
    role: "Design & développement web",
    url: "#",
    image: projetKafe,
    description:
      "Identité digitale complète pour un restaurant. Site web responsive, menu interactif et prise de réservation en ligne. Design chaleureux et contemporain, fidèle à l'ambiance du lieu — du wireframe au lancement.",
    categories: ["Web design & développement", "Restaurant, identité digitale"],
  },
  {
    id: "bkarchitecture",
    name: "BK Architecture",
    tags: "Architecture, portfolio",
    role: "Design & développement web",
    url: "#",
    image: projetBkArchitecture,
    description:
      "Portfolio pour un cabinet d'architecture. Mise en avant des projets en grand format, navigation épurée et performance optimisée. Un site pensé comme une extension de la démarche créative du studio.",
    categories: ["Web design & développement", "Architecture, portfolio"],
  },
  {
    id: "avero",
    name: "Avero",
    tags: "Marque, expérience digitale",
    role: "Design & développement web",
    url: "#",
    image: projetAvero,
    description:
      "Expérience digitale pour une marque en lancement. Storytelling visuel, design system cohérent et site performant. Conçu pour affirmer l'identité de la marque et accompagner sa croissance en ligne.",
    categories: ["Web design & développement", "Marque, expérience digitale"],
  },
];
