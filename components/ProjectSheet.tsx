"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { TransitionLink } from "@/components/TransitionLink";
import { isExternalProjectUrl, type Realisation } from "@/data/realisations";

type ProjectSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  project: Realisation | null;
  projectIndex: number;
  totalProjects: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function ProjectSheet({
  isOpen,
  onClose,
  project,
  projectIndex,
  totalProjects,
  onPrevious,
  onNext,
}: ProjectSheetProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);
  const projectRef = useRef<Realisation | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  if (project) {
    projectRef.current = project;
  }

  const activeProject = projectRef.current;
  const hasPrevious = projectIndex > 0;
  const hasNext = projectIndex < totalProjects - 1;

  useEffect(() => {
    setMounted(true);
  }, []);

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
    }, 650);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasPrevious) onPrevious();
      if (event.key === "ArrowRight" && hasNext) onNext();
    };

    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [hasNext, hasPrevious, isOpen, onClose, onNext, onPrevious]);

  if (!mounted || !visible || !activeProject) {
    return null;
  }

  return createPortal(
    <>
      <button
        type="button"
        className={`project-sheet__backdrop ${animated ? "project-sheet__backdrop--open" : ""}`}
        aria-label="Fermer la fiche projet"
        onClick={onClose}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <Image
          src={activeProject.image}
          alt=""
          fill
          draggable={false}
          className="project-sheet__backdrop-image"
          sizes="100vw"
        />
      </button>

      <div
        className={`project-sheet ${animated ? "project-sheet--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-sheet-title"
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div
          className={`project-sheet__preview ${animated ? "project-sheet__preview--open" : ""}`}
        >
          <div className="project-sheet__browser">
            <div className="project-sheet__browser-bar" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <Image
              src={activeProject.image}
              alt={`Aperçu du site ${activeProject.name}`}
              width={activeProject.image.width}
              height={activeProject.image.height}
              draggable={false}
              className="project-sheet__preview-image"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
        </div>

        <aside
          className={`project-sheet__panel ${animated ? "project-sheet__panel--open" : ""}`}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="project-sheet__close"
            aria-label="Fermer la fiche projet"
            onClick={onClose}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="project-sheet__content">
            <h2 id="project-sheet-title" className="project-sheet__title">
              {activeProject.name}
            </h2>

            <p className="project-sheet__description">{activeProject.description}</p>

            <div className="project-sheet__footer">
              <div className="project-sheet__meta">
                <p>{activeProject.categories[0]}</p>
                <p>{activeProject.categories[1]}</p>
              </div>

              {isExternalProjectUrl(activeProject.url) ? (
                <a
                  href={activeProject.url}
                  className="project-sheet__visit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Visiter</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M3.5 10.5L10.5 3.5M10.5 3.5H5.25M10.5 3.5V8.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : (
                <TransitionLink
                  href={`/contacts?projet=${encodeURIComponent(activeProject.name)}`}
                  className="project-sheet__visit"
                  onClick={onClose}
                >
                  <span>Demander un devis</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M3.5 10.5L10.5 3.5M10.5 3.5H5.25M10.5 3.5V8.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </TransitionLink>
              )}
            </div>
          </div>

          <div className="project-sheet__nav">
            <button
              type="button"
              className="project-sheet__nav-btn"
              aria-label="Projet précédent"
              disabled={!hasPrevious}
              onClick={onPrevious}
            >
              ←
            </button>
            <button
              type="button"
              className="project-sheet__nav-btn"
              aria-label="Projet suivant"
              disabled={!hasNext}
              onClick={onNext}
            >
              →
            </button>
          </div>
        </aside>
      </div>
    </>,
    document.body,
  );
}
