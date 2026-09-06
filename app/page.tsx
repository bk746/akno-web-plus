import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import line2 from "@/src/images/line2.png";
import buttonBlancAkno from "@/src/images/button-blanc-akno.png";
import buttonBleuAkno from "@/src/images/button-bleu-akno.png";
import { EclypseOrb } from "@/components/EclypseOrb";
import { SiteIntro } from "@/components/SiteIntro";
import { HomePageShell } from "@/components/HomePageShell";
import { TransitionLink } from "@/components/TransitionLink";
import { HeroSocialLinks } from "@/components/HeroSocialLinks";
import { RealisationsSection } from "@/components/RealisationsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { CtaSection } from "@/components/CtaSection";
import { AboutSection } from "@/components/AboutSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  path: "/",
});

export default function Home() {
  return (
    <>
      <div className="site-intro-curtain" aria-hidden="true" />

      <SiteIntro />

      <div className="site-shell">
      <Image
        src={line2}
        alt=""
        width={1835}
        height={1964}
        draggable={false}
        className="site-grid"
        priority
        sizes="100vw"
      />

      <HomePageShell>
      <section className="hero-section relative w-full overflow-hidden">

      <div className="hero-orbs select-none" aria-hidden="true">
        <EclypseOrb
          variant="hero"
          className="hero-orb-enter hero-orb--accent absolute right-[60%] top-[7%] w-[min(17vw,240px)]"
          enterDelay="0.35s"
          animationDelay="-2.5s"
        />

        <EclypseOrb
          variant="hero"
          className="hero-orb-enter hero-orb--main absolute right-[2%] top-1/2 w-[min(44vw,580px)] -translate-y-[48%]"
          enterDelay="0.1s"
          animationDelay="0s"
        />

        <EclypseOrb
          variant="hero"
          className="hero-orb-enter absolute right-[5%] bottom-[9%] w-[min(9vw,130px)] max-md:hidden"
          enterDelay="0.55s"
          animationDelay="-5s"
        />
      </div>

      <div className="hero-content">
        <div className="hero-copy">
          <h1 className="hero-title">
            <span className="hero-title-line hero-enter" style={{ "--hero-delay": "0.12s" } as React.CSSProperties}>
              Votre marque mérite
            </span>
            <span
              className="hero-title-line text-gradient hero-enter"
              style={{ "--hero-delay": "0.18s" } as React.CSSProperties}
            >
              une expérience
            </span>
            <span
              className="hero-title-line text-gradient hero-enter"
              style={{ "--hero-delay": "0.24s" } as React.CSSProperties}
            >
              sur mesure.
            </span>
          </h1>

          <p
            className="hero-subtitle hero-enter"
            style={{ "--hero-delay": "0.34s" } as React.CSSProperties}
          >
            AKNO conçoit sites et produits digitaux pour les marques qui veulent
            se démarquer — du design au lancement.
          </p>
        </div>

        <div
          className="hero-cta hero-enter"
          style={{ "--hero-delay": "0.46s" } as React.CSSProperties}
        >
          <div className="hero-cta-row">
            <TransitionLink href="/contacts" className="hero-btn hero-btn--primary hero-btn--png">
              <Image
                src={buttonBlancAkno}
                alt=""
                width={292}
                height={85}
                draggable={false}
                className="hero-btn__img"
                priority
              />
              <span className="hero-btn__text">Devis gratuit</span>
            </TransitionLink>
            <TransitionLink href="/#realisations" className="hero-btn hero-btn--secondary hero-btn--png">
              <Image
                src={buttonBleuAkno}
                alt=""
                width={292}
                height={85}
                draggable={false}
                className="hero-btn__img"
              />
              <span className="hero-btn__text">Nos réalisations</span>
            </TransitionLink>
          </div>
          <div className="hero-reassurance-block">
            <p className="hero-reassurance">
              <span className="hero-reassurance__lead">Réponse sous 24h</span>
              <span className="hero-reassurance__meta">
                <span>Sans engagement</span>
                <span className="hero-reassurance__sep" aria-hidden="true">
                  ·
                </span>
                <span>Devis détaillé</span>
              </span>
            </p>
            <HeroSocialLinks />
          </div>
        </div>
      </div>
    </section>

    <RealisationsSection />

    <Suspense fallback={null}>
      <ServicesSection />
    </Suspense>

    <CtaSection />

    <AboutSection />

    <FaqSection />

    <Footer />
      </HomePageShell>
      </div>
    </>
  );
}
