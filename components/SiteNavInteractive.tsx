"use client";

import { useEffect, useState, type ReactNode } from "react";
import buttonHamburger from "@/src/images/button-hambuger.png";
import buttonCross from "@/src/images/button-cross.png";
import { TransitionLink } from "@/components/TransitionLink";

const menuLinks = [
  { label: "Réalisations", href: "/#realisations" },
  { label: "Services", href: "/#services" },
  { label: "À propos", href: "/#apropos" },
  { label: "Contact", href: "/contacts" },
];

type SiteNavInteractiveProps = {
  logo: ReactNode;
};

export function SiteNavInteractive({ logo }: SiteNavInteractiveProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="site-header">
        <header className="site-nav hero-header-enter">
          {logo}

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
      </div>

      <div
        className={`menu-overlay ${open ? "menu-overlay--open" : ""}`}
        {...(!open ? { "aria-hidden": true } : {})}
      >
        <nav className="menu-overlay__nav" aria-label="Menu principal">
          {menuLinks.map((link, index) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className="menu-overlay__link"
              style={{ transitionDelay: open ? `${120 + index * 60}ms` : "0ms" }}
              tabIndex={open ? undefined : -1}
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
