import type { StaticImageData } from "next/image";
import keryanPhoto from "@/src/images/keryan-bouzerda.png";
import louisePhoto from "@/src/images/louise-lejoille.jpg";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: StaticImageData;
  imagePosition?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "keryan",
    name: "Keryan Bouzerda",
    role: "Développeur · Fondateur d'AKNO",
    image: keryanPhoto,
    imagePosition: "center 18%",
  },
  {
    id: "louise",
    name: "Louise Lejoille",
    role: "UI/UX Designer",
    image: louisePhoto,
    imagePosition: "center center",
  },
];
