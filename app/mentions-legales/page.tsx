import type { Metadata } from "next";
import Image from "next/image";
import line2 from "@/src/images/line2.png";
import { Footer } from "@/components/Footer";
import { PageEnter } from "@/components/PageEnter";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { contactInfo } from "@/data/contact";
import { legalInfo } from "@/data/legal";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Mentions légales — AKNO",
  description:
    "Mentions légales du site AKNO — éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  const { publisher, headquarters, hosting } = legalInfo;

  return (
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

      <SiteNav />

      <PageEnter>
        <main className="page-content">
          <section className="legal-page">
            <div className="legal-page__inner">
              <Reveal as="h1" className="legal-page__title" y={28}>
                Mentions légales
              </Reveal>

              <Reveal className="legal-page__block" y={24} delay={0.06}>
                <h2>Éditeur du site</h2>
                <p>
                  {publisher.name} — {siteConfig.name}
                  <br />
                  {publisher.status}
                  <br />
                  SIRET : {publisher.siret}
                  <br />
                  SIREN : {publisher.siren}
                  <br />
                  Code APE : {publisher.ape}
                  <br />
                  {headquarters.postalCode} {headquarters.city}, {headquarters.country}
                  <br />
                  Email :{" "}
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  <br />
                  Téléphone :{" "}
                  <a href={`tel:${contactInfo.phoneTel}`}>{contactInfo.phoneDisplay}</a>
                </p>
              </Reveal>

              <Reveal className="legal-page__block" y={24} delay={0.1}>
                <h2>Directeur de la publication</h2>
                <p>{publisher.name}</p>
              </Reveal>

              <Reveal className="legal-page__block" y={24} delay={0.14}>
                <h2>Hébergement</h2>
                <p>
                  {hosting.name}
                  <br />
                  {hosting.address}
                  <br />
                  <a href={hosting.website} target="_blank" rel="noopener noreferrer">
                    {hosting.website}
                  </a>
                </p>
              </Reveal>

              <Reveal className="legal-page__block" y={24} delay={0.18}>
                <h2>Propriété intellectuelle</h2>
                <p>
                  L&apos;ensemble du contenu de ce site (textes, visuels, logo, mise en page,
                  code) est la propriété exclusive de {publisher.name} / {siteConfig.name},
                  sauf mention contraire. Toute reproduction, représentation ou diffusion,
                  totale ou partielle, sans autorisation écrite préalable est interdite.
                </p>
              </Reveal>

              <Reveal className="legal-page__block" y={24} delay={0.22}>
                <h2>Données personnelles</h2>
                <p>
                  Les informations transmises via le formulaire de contact (nom, email, message)
                  sont utilisées uniquement pour répondre à votre demande. Elles ne sont ni
                  vendues ni cédées à des tiers. Conformément au RGPD, vous disposez d&apos;un
                  droit d&apos;accès, de rectification et de suppression en écrivant à{" "}
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>.
                </p>
              </Reveal>

              <Reveal className="legal-page__block" y={24} delay={0.26}>
                <h2>Cookies</h2>
                <p>
                  Ce site n&apos;utilise pas de cookies publicitaires ou de traçage tiers par
                  défaut. Des cookies techniques peuvent être déposés par l&apos;hébergeur ou
                  des outils d&apos;analyse si activés ultérieurement.
                </p>
              </Reveal>
            </div>
          </section>

          <Footer />
        </main>
      </PageEnter>
    </>
  );
}
