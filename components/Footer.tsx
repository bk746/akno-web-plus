import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";
import { TransitionLink } from "@/components/TransitionLink";
import { EclypseOrb } from "@/components/EclypseOrb";
import { contactInfo } from "@/data/contact";
import { legalInfo } from "@/data/legal";
import logoAkno from "@/src/images/logoX2.png";

const footerLinks = [
  { label: "Réalisations", href: "/#realisations" },
  { label: "Services", href: "/#services" },
  { label: "À propos", href: "/#apropos" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contacts" },
];

export function Footer() {
  const { publisher, headquarters, hours } = legalInfo;

  return (
    <footer className="site-footer">
      <EclypseOrb
        className="site-footer__orb"
        opacity={0.12}
        animationDelay="-6s"
      />

      <div className="site-footer__inner">
        <div className="site-footer__main">
          <Reveal className="site-footer__brand" y={28}>
            <a href="/" className="site-footer__logo-link" aria-label="Retour à l'accueil">
              <Image
                src={logoAkno}
                alt="AKNO"
                width={206}
                height={78}
                draggable={false}
                className="site-footer__logo"
              />
            </a>
            <p className="site-footer__tagline">
              Sites et produits digitaux sur mesure — du design au lancement.
            </p>
            <SocialLinks className="site-footer__social social-links" />
          </Reveal>

          <Reveal className="site-footer__col" y={28} delay={0.06}>
            <p className="site-footer__col-label">Navigation</p>
            <nav className="site-footer__nav" aria-label="Navigation pied de page">
              {footerLinks.map((link) => (
                <TransitionLink key={link.href} href={link.href} className="site-footer__link">
                  {link.label}
                </TransitionLink>
              ))}
            </nav>
          </Reveal>

          <Reveal className="site-footer__col" y={28} delay={0.1}>
            <p className="site-footer__col-label">Contact</p>
            <div className="site-footer__contact">
              <a href={`tel:${contactInfo.phoneTel}`} className="site-footer__contact-link">
                {contactInfo.phoneDisplay}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="site-footer__contact-link">
                {contactInfo.email}
              </a>
            </div>
          </Reveal>

          <Reveal className="site-footer__col site-footer__col--studio" y={28} delay={0.14}>
            <p className="site-footer__col-label">Studio</p>
            <div className="site-footer__studio">
              <p>
                {hours.label}
                <br />
                <span className="site-footer__studio-strong">{hours.range}</span>
              </p>
              <p>
                {headquarters.postalCode} {headquarters.city}
                <br />
                {headquarters.country}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="site-footer__bar" y={20} delay={0.18} duration={0.95}>
          <div className="site-footer__bar-left">
            <span>© {new Date().getFullYear()} AKNO</span>
            <span className="site-footer__bar-sep" aria-hidden="true">
              ·
            </span>
            <span className="site-footer__bar-meta">
              {publisher.name} · SIRET {publisher.siret}
            </span>
          </div>
          <TransitionLink href="/mentions-legales" className="site-footer__bar-link">
            Mentions légales
          </TransitionLink>
        </Reveal>
      </div>
    </footer>
  );
}
