"use client";

import { TransitionLink } from "@/components/TransitionLink";

export function HeroDiscoverScroll() {
  return (
    <TransitionLink
      href="/#realisations"
      className="hero-frame__discover"
      aria-label="Découvrir la suite"
    >
      <span className="hero-frame__discover-label">Découvrir</span>
      <span className="hero-frame__discover-icon" aria-hidden="true">
        ↓
      </span>
    </TransitionLink>
  );
}
