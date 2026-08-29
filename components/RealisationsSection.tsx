"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { EclypseOrb } from "@/components/EclypseOrb";
import { ProjectSheet } from "@/components/ProjectSheet";
import { realisations, isExternalProjectUrl } from "@/data/realisations";

const MIN_WIDTH = 50;
const MAX_WIDTH = 65;

function computeMediaWidth(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const elementCenter = rect.top + rect.height / 2;
  const viewportCenter = viewportHeight / 2;
  const distance = Math.abs(elementCenter - viewportCenter);
  const range = viewportHeight / 2 + rect.height / 2;
  const progress = Math.max(0, Math.min(1, 1 - distance / range));
  const eased = progress * progress * (3 - 2 * progress);

  return MIN_WIDTH + eased * (MAX_WIDTH - MIN_WIDTH);
}

function computeMediaShift(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const progress = (rect.top + rect.height * 0.5 - viewportHeight * 0.5) / viewportHeight;

  return progress * -28;
}

export function RealisationsSection() {
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isSheetOpen = activeIndex !== null;
  const activeProject = activeIndex !== null ? realisations[activeIndex] : null;

  useEffect(() => {
    let ticking = false;

    const updateWidths = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      rowRefs.current.forEach((row) => {
        if (!row) return;

        if (isMobile) {
          row.style.setProperty("--media-width", "100%");
          row.style.setProperty("--media-shift", "0px");
          return;
        }

        row.style.setProperty("--media-width", `${computeMediaWidth(row)}%`);
        row.style.setProperty("--media-shift", `${computeMediaShift(row).toFixed(2)}px`);
      });
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateWidths);
    };

    updateWidths();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const openProject = (index: number) => {
    setActiveIndex(index);
  };

  const closeProject = () => {
    setActiveIndex(null);
  };

  const goToPrevious = () => {
    setActiveIndex((current) => {
      if (current === null || current <= 0) return current;
      return current - 1;
    });
  };

  const goToNext = () => {
    setActiveIndex((current) => {
      if (current === null || current >= realisations.length - 1) return current;
      return current + 1;
    });
  };

  return (
    <>
      <section id="realisations" className="realisations">
        <EclypseOrb
          className="realisations__orb"
          opacity={0.28}
          animationDelay="-1.5s"
        />

        {realisations.map((project, index) => (
          <article
            key={project.id}
            ref={(node) => {
              rowRefs.current[index] = node;
            }}
            className="project-row"
            style={
              {
                "--media-width": `${MIN_WIDTH}%`,
                "--media-shift": "0px",
              } as React.CSSProperties
            }
          >
            <button
              type="button"
              className="project-row__media"
              aria-label={`Voir le projet ${project.name}`}
              onClick={() => openProject(index)}
            >
              <div className="project-row__media-inner">
                <Image
                  src={project.image}
                  alt={`Aperçu du projet ${project.name}`}
                  width={project.image.width}
                  height={project.image.height}
                  draggable={false}
                  className="project-row__image"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 90vw, 55vw"
                />
              </div>
            </button>

            <Reveal
              className="project-row__info"
              x={28}
              y={0}
              delay={index * 0.08}
              duration={0.95}
            >
              <h2 className="project-row__title">{project.name}</h2>
              <p className="project-row__tags">{project.tags}</p>
              <p className="project-row__role">Rôle : {project.role}</p>
              {isExternalProjectUrl(project.url) ? (
                <a
                  href={project.url}
                  className="project-row__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Visiter le site</span>
                  <span className="project-row__link-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              ) : (
                <button
                  type="button"
                  className="project-row__link"
                  onClick={() => openProject(index)}
                >
                  <span>Voir le projet</span>
                  <span className="project-row__link-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              )}
            </Reveal>
          </article>
        ))}
      </section>

      <ProjectSheet
        isOpen={isSheetOpen}
        onClose={closeProject}
        project={activeProject}
        projectIndex={activeIndex ?? 0}
        totalProjects={realisations.length}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </>
  );
}
