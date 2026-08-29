"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logoAkno from "@/src/images/logo-akno-plus.png";
import buttonHamburger from "@/src/images/button-hambuger.png";
import buttonCross from "@/src/images/button-cross.png";
import { TransitionLink } from "@/components/TransitionLink";
import { useIntro } from "@/components/IntroProvider";

const menuLinks = [
  { label: "Réalisations", href: "/#realisations" },
  { label: "Services", href: "/#services" },
  { label: "À propos", href: "/#apropos" },
  { label: "Contact", href: "/contacts" },
];

const SCROLL_THRESHOLD = 64;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { introComplete } = useIntro();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header
        className={`site-nav hero-header-enter ${scrolled ? "site-nav--scrolled" : ""} ${introComplete ? "site-nav--intro-ready" : "site-nav--intro-pending"}`}
      >
        <a href="/" className="site-nav__logo" aria-label="Retour à l'accueil">
          <Image
            src={logoAkno}
            alt="AKNO"
            width={206}
            height={78}
            draggable={false}
            priority
            className={`site-nav__logo-image ${introComplete ? "site-nav__logo-image--ready" : ""}`}
          />
        </a>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className={`menu-toggle ${open ? "menu-toggle--open" : ""}`}
        >
          <img
            src={buttonHamburger.src}
            alt=""
            width={38}
            height={21}
            draggable={false}
            className="menu-toggle__icon menu-toggle__icon--hamburger"
          />
          <img
            src={buttonCross.src}
            alt=""
            width={21}
            height={24}
            draggable={false}
            className="menu-toggle__icon menu-toggle__icon--cross"
          />
        </button>
      </header>

      <div
        className={`menu-overlay ${open ? "menu-overlay--open" : ""}`}
        aria-hidden={!open}
      >
        <nav className="menu-overlay__nav">
          {menuLinks.map((link, index) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className="menu-overlay__link"
              style={{ transitionDelay: open ? `${120 + index * 60}ms` : "0ms" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </TransitionLink>
          ))}
        </nav>
      </div>
    </>
  );
}
