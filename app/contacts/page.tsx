import type { Metadata } from "next";
import { Suspense } from "react";
import { EclypseOrb } from "@/components/EclypseOrb";
import { PageEnter } from "@/components/PageEnter";
import { ContactClock } from "@/components/ContactClock";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact — AKNO",
  description:
    "Contactez AKNO pour votre projet digital — réponse sous 24h, du lundi au vendredi.",
  path: "/contacts",
});

export default function ContactsPage() {
  return (
    <>
      <PageEnter>
      <main className="page-content">
        <section className="contact-page">
          <EclypseOrb
            variant="hero"
            className="contact-page__orb contact-page__orb--a"
            opacity={0.24}
            animationDelay="-2s"
          />
          <EclypseOrb
            variant="hero"
            className="contact-page__orb contact-page__orb--b"
            opacity={0.18}
            animationDelay="-4.5s"
          />

          <div className="contact-page__inner">
            <div className="contact-page__top">
              <Reveal className="contact-page__hours" y={28}>
                <p className="contact-page__hours-label">Nous sommes disponibles :</p>
                <div className="contact-page__hours-range">
                  <span className="contact-page__hours-value">09</span>
                  <div className="contact-page__hours-ampm">
                    <span>AM</span>
                    <span className="contact-page__hours-ampm-muted">PM</span>
                  </div>
                  <span className="contact-page__hours-sep">—</span>
                  <span className="contact-page__hours-value">18</span>
                  <div className="contact-page__hours-ampm">
                    <span className="contact-page__hours-ampm-muted">AM</span>
                    <span>PM</span>
                  </div>
                </div>
                <p className="contact-page__hours-note">Du lundi au vendredi · heure de Paris</p>
              </Reveal>

              <Reveal className="contact-page__clock-wrap" y={28} delay={0.08}>
                <ContactClock />
              </Reveal>
            </div>

            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </section>

        <Footer />
      </main>
      </PageEnter>
    </>
  );
}
