"use client";

import { useEffect, useRef, useState } from "react";
import { TransitionLink } from "@/components/TransitionLink";

const CONSENT_KEY = "akno-cookie-consent";
const EXIT_MS = 480;

type BannerPhase = "hidden" | "visible" | "exiting";

function hasConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === "1";
  } catch {
    return false;
  }
}

function isIntroComplete() {
  return document.documentElement.classList.contains("intro-complete");
}

export function CookieBanner() {
  const [phase, setPhase] = useState<BannerPhase>("hidden");
  const exitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (hasConsent()) return;

    const showBanner = () => setPhase("visible");

    if (isIntroComplete()) {
      showBanner();
      return;
    }

    const observer = new MutationObserver(() => {
      if (!isIntroComplete()) return;
      observer.disconnect();
      showBanner();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const accept = () => {
    if (phase === "exiting") return;

    try {
      localStorage.setItem(CONSENT_KEY, "1");
    } catch {
      // Ignore storage failures and still dismiss the banner.
    }

    setPhase("exiting");
    exitTimerRef.current = window.setTimeout(() => {
      exitTimerRef.current = null;
      setPhase("hidden");
    }, EXIT_MS);
  };

  if (phase === "hidden") return null;

  return (
    <div
      className={`cookie-banner ${phase === "exiting" ? "cookie-banner--exit" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="cookie-banner__backdrop" aria-hidden="true" />
      <div className="cookie-banner__inner">
        <div className="cookie-banner__copy">
          <p id="cookie-banner-title" className="cookie-banner__title">
            Ce site utilise des cookies
          </p>
          <p id="cookie-banner-desc" className="cookie-banner__text">
            Des cookies techniques sont utilisés pour le bon fonctionnement du site.
            Aucun cookie publicitaire n&apos;est déposé.
          </p>
        </div>

        <div className="cookie-banner__actions">
          <TransitionLink href="/mentions-legales#cookies" className="cookie-banner__link">
            En savoir plus
          </TransitionLink>
          <button type="button" className="cookie-banner__accept" onClick={accept}>
            J&apos;accepte
          </button>
        </div>
      </div>
    </div>
  );
}
