"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { EclypseOrb } from "@/components/EclypseOrb";
import { AnimatedText } from "@/components/AnimatedText";
import { TransitionLink } from "@/components/TransitionLink";
import { services } from "@/data/services";
import { ServicePopup } from "@/components/ServicePopup";

const MOBILE_BREAKPOINT = 768;
const VISIBLE_CARDS = 3;
const SCROLL_STEP_VH = 130;
const LERP = 0.18;

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

function isMobileViewport() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
}

export function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetIndexRef = useRef(0);
  const currentIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxIndex = Math.max(0, services.length - VISIBLE_CARDS);
  const scrollHeightVh = 100 + (maxIndex + 1) * SCROLL_STEP_VH;

  useEffect(() => {
    const container = scrollRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const applySlideIndex = (value: number) => {
      track.style.setProperty("--slide-index", value.toFixed(4));
    };

    const stopCarousel = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      applySlideIndex(0);
    };

    const updateTargetFromScroll = () => {
      if (selectedIndex !== null || isMobileViewport()) return;

      const scrollRange = container.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) {
        targetIndexRef.current = 0;
        return;
      }

      const rawProgress = Math.min(
        Math.max(-container.getBoundingClientRect().top / scrollRange, 0),
        1,
      );
      targetIndexRef.current = smoothstep(rawProgress) * maxIndex;
    };

    const animate = () => {
      const target = targetIndexRef.current;
      const current = currentIndexRef.current;
      const delta = target - current;
      const next =
        Math.abs(delta) < 0.001 ? target : current + delta * LERP;

      currentIndexRef.current = next;
      applySlideIndex(next);
      rafRef.current = requestAnimationFrame(animate);
    };

    const onScroll = () => {
      updateTargetFromScroll();
    };

    const startCarousel = () => {
      if (isMobileViewport()) {
        stopCarousel();
        return;
      }

      updateTargetFromScroll();
      currentIndexRef.current = targetIndexRef.current;
      applySlideIndex(currentIndexRef.current);

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    startCarousel();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      stopCarousel();
    };
  }, [maxIndex, selectedIndex]);

  const openService = (index: number) => {
    setSelectedIndex(index);
  };

  const closeService = () => {
    setSelectedIndex(null);
  };

  return (
    <>
      <div
        ref={scrollRef}
        className="services-scroll"
        style={{ "--services-scroll-height": `${scrollHeightVh}vh` } as React.CSSProperties}
      >
        <section id="services" className="services services--pinned">
          <EclypseOrb
            className="services__orb"
            opacity={0.22}
            animationDelay="-3s"
          />

          <Reveal as="h2" className="services__title" y={32} duration={1}>
            Nos services
          </Reveal>

          <div className="services__layout">
            <div className="services__carousel-shell">
              <div
                ref={trackRef}
                className="services__track"
                style={{ "--slide-index": 0 } as React.CSSProperties}
              >
                {services.map((service, index) => (
                  <article
                    key={service.id}
                    className="service-card"
                    role="button"
                    tabIndex={0}
                    aria-label={`Ouvrir ${service.title}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => openService(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openService(index);
                      }
                    }}
                  >
                    <Image
                      src={service.image}
                      alt=""
                      width={service.image.width}
                      height={service.image.height}
                      draggable={false}
                      className="service-card__image"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="service-card__header">
                      <span className="service-card__chevron" aria-hidden="true">
                        ⌄
                      </span>
                      <h3 className="service-card__title">
                        <span className="sr-only">{service.title}</span>
                        <AnimatedText
                          text={service.title}
                          externalHover={hoveredIndex === index}
                        />
                      </h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <Reveal className="services__footer" y={28} delay={0.12} duration={1}>
              <div className="services__conversion">
                <p className="services__conversion-text">
                  Nous concevons des produits digitaux qui dépassent les attentes —
                  du design à la mise en ligne, chaque détail compte.
                </p>
                <TransitionLink href="/contacts" className="hero-btn hero-btn--primary services__cta">
                  Demander un devis
                </TransitionLink>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      <ServicePopup
        isOpen={selectedIndex !== null}
        onClose={closeService}
        service={selectedIndex !== null ? services[selectedIndex] : null}
      />
    </>
  );
}
