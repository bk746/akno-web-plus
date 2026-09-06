import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import eclypse from "@/src/images/eclypse2-x2.png";
import { SiteIntro } from "@/components/SiteIntro";
import { HomePageShell } from "@/components/HomePageShell";
import { TransitionLink } from "@/components/TransitionLink";
import { HeroSocialLinks } from "@/components/HeroSocialLinks";
import { HeroDiscoverScroll } from "@/components/HeroDiscoverScroll";
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
        <HomePageShell>
          <section className="hero-frame" aria-labelledby="hero-title">
            <div className="hero-frame__grid" aria-hidden="true" />

            <Image
              src={eclypse}
              alt=""
              fetchPriority="low"
              sizes="(max-width: 768px) 34vw, 18vw"
              className="hero-frame__orb hero-frame__orb--top"
            />
            <Image
              src={eclypse}
              alt=""
              fetchPriority="low"
              sizes="(max-width: 768px) 65vw, 42vw"
              className="hero-frame__orb hero-frame__orb--left"
            />
            <Image
              src={eclypse}
              alt=""
              fetchPriority="low"
              sizes="(max-width: 768px) 65vw, 42vw"
              className="hero-frame__orb hero-frame__orb--right"
            />

            <div className="hero-frame__content">
              <h1 id="hero-title" className="hero-frame__title">
                <span className="hero-frame__title-line">
                  <span>Votre marque </span>
                  <span className="hero-frame__gradient">
                    mérite une expérience
                  </span>
                </span>
                <span className="hero-frame__title-line hero-frame__gradient">
                  sur mesure.
                </span>
              </h1>

              <p className="hero-frame__subtitle">
                AKNO conçoit sites et produits digitaux pour les marques qui veulent se
                démarquer — du design au lancement.
              </p>

              <div className="hero-frame__actions">
                <TransitionLink
                  href="/contacts"
                  className="hero-frame__button hero-frame__button--blue"
                >
                  <span>Parler de votre projet</span>
                  <span className="hero-frame__arrow" aria-hidden="true">›</span>
                </TransitionLink>
                <TransitionLink
                  href="/#realisations"
                  className="hero-frame__button hero-frame__button--light"
                >
                  <span>Voir nos réalisations</span>
                  <span className="hero-frame__arrow" aria-hidden="true">›</span>
                </TransitionLink>
              </div>

              <p className="hero-frame__note">
                <span>Réponse sous 24h</span>
                <span>Sans engagement</span>
                <span>Devis détaillé</span>
              </p>

              <HeroSocialLinks />

              <HeroDiscoverScroll />
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
