"use client";

import { useState } from "react";
import { faqItems } from "@/data/faq";
import { Reveal } from "@/components/Reveal";
import { TransitionLink } from "@/components/TransitionLink";
import { EclypseOrb } from "@/components/EclypseOrb";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="faq">
      <EclypseOrb
        className="faq__orb"
        opacity={0.24}
        animationDelay="-2.5s"
      />

      <div className="faq__inner">
        <div className="faq__header">
          <Reveal as="h2" className="faq__title" y={32}>
            Questions fréquentes
          </Reveal>
          <Reveal className="faq__intro" y={24} delay={0.08}>
            <p className="faq__description">
              Tout ce qu&apos;il faut savoir avant de lancer votre projet avec
              AKNO — délais, process, devis et accompagnement.
            </p>
            <TransitionLink href="/contacts" className="faq__cta">
              Poser une question
            </TransitionLink>
          </Reveal>
        </div>

        <div className="faq__list">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <Reveal
                key={item.id}
                as="article"
                className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                y={20}
                delay={0.06 + index * 0.05}
                duration={0.95}
              >
                <button
                  type="button"
                  className="faq-item__trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span className="faq-item__question">{item.question}</span>
                  <span className="faq-item__icon" aria-hidden="true" />
                </button>

                <div
                  className={`faq-item__panel ${isOpen ? "faq-item__panel--open" : ""}`}
                >
                  <div className="faq-item__panel-inner">
                    <p className="faq-item__answer">{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
