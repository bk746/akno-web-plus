import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { TransitionLink } from "@/components/TransitionLink";
import bgBlue from "@/src/images/bg-blue.svg";
import logoAkno from "@/src/images/logoX2.png";

export function CtaSection() {
  return (
    <section id="contact" className="cta">
      <Image
        src={bgBlue}
        alt=""
        width={1880}
        height={730}
        draggable={false}
        className="cta__bg"
        loading="lazy"
        sizes="100vw"
      />

      <Reveal className="cta__content" y={36} scale={0.98} duration={1.15}>
        <Image
          src={logoAkno}
          alt="AKNO"
          width={206}
          height={78}
          draggable={false}
          className="cta__logo"
          loading="lazy"
        />

        <div className="cta__conversion">
          <p className="cta__text">
            Prêt à donner vie à votre projet ? Discutons de vos ambitions —
            réponse sous 24h, sans engagement.
          </p>
          <TransitionLink href="/contacts" className="hero-btn hero-btn--primary cta__btn">
            Demander un devis
          </TransitionLink>
        </div>
      </Reveal>
    </section>
  );
}
