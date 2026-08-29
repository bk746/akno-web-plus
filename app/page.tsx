import type { Metadata } from "next";
import Image from "next/image";
import line2 from "@/src/images/line2.png";
import lineHeroAkno from "@/src/images/line-hero-akno.png";
import { EclypseOrb } from "@/components/EclypseOrb";
import { IntroProvider } from "@/components/IntroProvider";
import { SiteIntro } from "@/components/SiteIntro";
import { SiteNav } from "@/components/SiteNav";
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
    <IntroProvider>
    <>
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

      <SiteIntro />
      <SiteNav />

      <HomePageShell>
      <section className="hero-section relative w-full overflow-hidden">

      <div className="hero-orbs select-none">
        <EclypseOrb
          variant="hero"
          className="hero-orb-enter absolute right-[60%] top-[7%] w-[min(17vw,240px)] max-md:right-[45%] max-md:top-[4%] max-md:w-[min(28vw,180px)]"
          enterDelay="0.35s"
          animationDelay="-2.5s"
        />

        <EclypseOrb
          variant="hero"
          className="hero-orb-enter absolute right-[2%] top-1/2 w-[min(44vw,580px)] -translate-y-[48%] max-md:right-[-8%] max-md:w-[min(72vw,420px)]"
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

      <div className="hero-line-wrap">
        <Image
          src={lineHeroAkno}
          alt=""
          width={3158}
          height={248}
          draggable={false}
          className="hero-line-bottom hero-line-enter"
          priority
          sizes="100vw"
        />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-line hero-enter" style={{ "--hero-delay": "0.12s" } as React.CSSProperties}>
            Votre marque mérite une
          </span>
          <span
            className="hero-title-line text-gradient hero-enter"
            style={{ "--hero-delay": "0.22s" } as React.CSSProperties}
          >
            expérience sur mesure.
          </span>
        </h1>

        <p
          className="hero-subtitle mt-[1.375rem] hero-enter"
          style={{ "--hero-delay": "0.34s" } as React.CSSProperties}
        >
          AKNO conçoit sites et produits digitaux pour les marques qui veulent
          se démarquer — du design au lancement.
        </p>

        <div
          className="hero-cta hero-enter"
          style={{ "--hero-delay": "0.46s" } as React.CSSProperties}
        >
          <div className="hero-cta-row">
            <TransitionLink href="/contacts" className="hero-btn hero-btn--primary">
              <span className="hero-btn__label">Devis gratuit</span>
              <span className="hero-btn__icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </TransitionLink>
            <a href="#realisations" className="hero-btn hero-btn--secondary">
              <span className="hero-btn__label">Nos réalisations</span>
            </a>
          </div>
          <div className="hero-reassurance-block">
            <p className="hero-reassurance">
              <span>Réponse sous 24h</span>
              <span className="hero-reassurance__sep" aria-hidden="true">
                ·
              </span>
              Sans engagement
              <span className="hero-reassurance__sep" aria-hidden="true">
                ·
              </span>
              Devis détaillé
            </p>
            <HeroSocialLinks />
          </div>
        </div>
      </div>
    </section>

    <RealisationsSection />

    <ServicesSection />

    <CtaSection />

    <AboutSection />

    <FaqSection />

    <Footer />
      </HomePageShell>
    </>
    </IntroProvider>
  );
}
