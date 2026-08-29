"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TransitionLink } from "@/components/TransitionLink";
import { contactInfo } from "@/data/contact";
import type { Service } from "@/data/services";

type ServicePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
};

export function ServicePopup({ isOpen, onClose, service }: ServicePopupProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const serviceRef = useRef<Service | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  if (service) {
    serviceRef.current = service;
  }

  const activeService = serviceRef.current;
  const hasOffers = Boolean(activeService?.offers?.length);
  const selectedOffer =
    activeService?.offers?.find((offer) => offer.id === selectedOfferId) ??
    activeService?.offers?.[0] ??
    null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && service?.offers?.[0]) {
      setSelectedOfferId(service.offers[0].id);
    }
  }, [isOpen, service]);

  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      setVisible(true);
      setAnimated(false);

      const animateTimer = window.setTimeout(() => {
        setAnimated(true);
      }, 20);

      return () => {
        window.clearTimeout(animateTimer);
      };
    }

    setAnimated(false);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, 700);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !visible || !activeService) {
    return null;
  }

  const contactHref =
    hasOffers && selectedOffer
      ? `/contacts?service=${encodeURIComponent(activeService.id)}&offer=${encodeURIComponent(selectedOffer.id)}`
      : hasOffers
        ? `/contacts?service=${encodeURIComponent(activeService.id)}`
        : "/contacts";

  return createPortal(
    <>
      <button
        type="button"
        className={`service-popup__backdrop ${animated ? "service-popup__backdrop--open" : ""}`}
        aria-label="Fermer le détail du service"
        onClick={onClose}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      />

      <aside
        className={`service-popup__drawer ${animated ? "service-popup__drawer--open" : ""}`}
        style={{
          "--popup-from": activeService.theme.from,
          "--popup-to": activeService.theme.to,
          "--popup-glow-a": activeService.theme.glowA,
          "--popup-glow-b": activeService.theme.glowB,
          pointerEvents: isOpen ? "auto" : "none",
        } as React.CSSProperties}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-popup-title"
      >
        <div className="service-popup__bg" aria-hidden="true">
          <div className="service-popup__bg-base" />
          <div className="service-popup__bg-glow service-popup__bg-glow--a" />
          <div className="service-popup__bg-glow service-popup__bg-glow--b" />
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          className={`service-popup__close ${animated ? "service-popup__close--open" : ""}`}
          aria-label="Fermer le détail du service"
          onClick={onClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="service-popup__layout">
          <div className="service-popup__scroll">
            <h2
              id="service-popup-title"
              className={`service-popup__title service-popup__reveal ${animated ? "service-popup__reveal--open" : ""}`}
              style={{ transitionDelay: "0.3s" }}
            >
              {activeService.title}
            </h2>

            {hasOffers ? (
              <>
                <div
                  className={`service-popup__offer-tabs ${animated ? "service-popup__offer-tabs--open" : ""}`}
                  role="tablist"
                  aria-label="Offres disponibles"
                >
                  {activeService.offers?.map((offer) => (
                    <button
                      key={offer.id}
                      type="button"
                      role="tab"
                      aria-selected={selectedOfferId === offer.id}
                      className={`service-popup__offer-tab ${selectedOfferId === offer.id ? "is-active" : ""}`}
                      onClick={() => setSelectedOfferId(offer.id)}
                    >
                      {offer.name}
                    </button>
                  ))}
                </div>

                {selectedOffer ? (
                  <div
                    key={selectedOffer.id}
                    className={`service-popup__offer-panel ${animated ? "service-popup__offer-panel--open" : ""}`}
                    role="tabpanel"
                  >
                    <p className="service-popup__offer-panel-price">{selectedOffer.price}</p>
                    <p className="service-popup__offer-panel-desc">{selectedOffer.description}</p>
                  </div>
                ) : null}

                <p
                  className={`service-popup__paragraph service-popup__paragraph--compact service-popup__reveal ${animated ? "service-popup__reveal--open" : ""}`}
                  style={{ transitionDelay: "0.5s" }}
                >
                  {activeService.paragraph}
                </p>
              </>
            ) : (
              <>
                <p
                  className={`service-popup__subtitle service-popup__reveal ${animated ? "service-popup__reveal--open" : ""}`}
                  style={{ transitionDelay: "0.4s" }}
                >
                  {activeService.subtitle}
                </p>

                <p
                  className={`service-popup__paragraph service-popup__reveal ${animated ? "service-popup__reveal--open" : ""}`}
                  style={{ transitionDelay: "0.45s" }}
                >
                  {activeService.paragraph}
                </p>

                <ul className="service-popup__points">
                  {activeService.points.map((point, index) => (
                    <li
                      key={point}
                      className={animated ? "service-popup__point--open" : ""}
                      style={{ transitionDelay: `${0.5 + index * 0.05}s` }}
                    >
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div
            className={`service-popup__actions ${animated ? "service-popup__actions--open" : ""}`}
          >
            <TransitionLink href={contactHref} className="service-popup__btn service-popup__btn--primary" onClick={onClose}>
              Demander un devis
            </TransitionLink>
            <a
              href={`mailto:${contactInfo.email}`}
              className="service-popup__btn service-popup__btn--secondary"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>
      </aside>
    </>,
    document.body,
  );
}
