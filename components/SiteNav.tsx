import Image from "next/image";
import logoAkno from "@/src/images/logo-akno-plus.png";
import { SiteNavInteractive } from "@/components/SiteNavInteractive";

export function SiteNav() {
  return (
    <SiteNavInteractive
      logo={
        <a href="/" className="site-nav__logo" aria-label="Retour à l'accueil">
          <Image
            src={logoAkno}
            alt="AKNO"
            width={206}
            height={78}
            draggable={false}
            priority
            sizes="(max-width: 768px) 96px, 206px"
            className="site-nav__logo-image"
          />
        </a>
      }
    />
  );
}
