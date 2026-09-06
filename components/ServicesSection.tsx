"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { EclypseOrb } from "@/components/EclypseOrb";
import { AnimatedText } from "@/components/AnimatedText";
import { TransitionLink } from "@/components/TransitionLink";
import { services } from "@/data/services";
import { ServicePopup } from "@/components/ServicePopup";
import {
  runServiceDeepLink,
  SERVICE_DEEP_LINK_EVENT,
  type ServiceDeepLinkDetail,
} from "@/lib/service-deep-link";

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
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetIndexRef = useRef(0);
  const currentIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [initialOfferId, setInitialOfferId] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const deepLinkRunRef = useRef(0);
  const handledSearchRef = useRef("");
  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(0);
  const maxIndex = Math.max(0, services.length - VISIBLE_CARDS);
  const scrollHeightVh = 100 + (maxIndex + 1) * SCROLL_STEP_VH;

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let frame = 0;

    const updateActiveSlide = () => {
      if (!isMobileViewport()) return;

      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;

        const cards = carousel.querySelectorAll<HTMLElement>(".service-card");
        if (!cards.length) return;

        const carouselRect = carousel.getBoundingClientRect();
        const carouselCenter = carouselRect.left + carouselRect.width / 2;

        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(cardCenter - carouselCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex !== activeSlideRef.current) {
          activeSlideRef.current = closestIndex;
          setActiveSlide(closestIndex);
        }
      });
    };

    carousel.addEventListener("scroll", updateActiveSlide, { passive: true });
    window.addEventListener("resize", updateActiveSlide);

    updateActiveSlide();

    return () => {
      carousel.removeEventListener("scroll", updateActiveSlide);
      window.removeEventListener("resize", updateActiveSlide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (isMobileViewport()) return;

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

      if (Math.abs(target - next) > 0.001) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    };

    const onScroll = () => {
      updateTargetFromScroll();
      if (!isMobileViewport() && rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const startCarousel = () => {
      if (isMobileViewport()) {
        stopCarousel();
        return;
      }

      updateTargetFromScroll();
      currentIndexRef.current = targetIndexRef.current;
      applySlideIndex(currentIndexRef.current);

      if (
        rafRef.current === null &&
        Math.abs(targetIndexRef.current - currentIndexRef.current) > 0.001
      ) {
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

  const openService = (index: number, offerId: string | null = null) => {
    setInitialOfferId(offerId);
    setSelectedIndex(index);
  };

  const closeService = () => {
    setSelectedIndex(null);
    setInitialOfferId(null);

    if (searchParams.get("service")) {
      window.history.replaceState(null, "", `${window.location.pathname}#services`);
    }
  };

  const playDeepLink = useCallback(
    async (serviceId: string, offerId: string | null = null) => {
      const runId = ++deepLinkRunRef.current;

      const result = await runServiceDeepLink({
        serviceId,
        offerId,
        scrollContainer: scrollRef.current,
        carousel: carouselRef.current,
        maxIndex,
        isMobile: isMobileViewport(),
      });

      if (!result || runId !== deepLinkRunRef.current) return;

      if (!isMobileViewport() && trackRef.current) {
        const targetSlide = Math.min(Math.max(result.serviceIndex - 1, 0), maxIndex);
        currentIndexRef.current = targetSlide;
        targetIndexRef.current = targetSlide;
        trackRef.current.style.setProperty("--slide-index", targetSlide.toFixed(4));
      }

      openService(result.serviceIndex, result.offerId);
    },
    [maxIndex],
  );

  useEffect(() => {
    const onDeepLink = (event: Event) => {
      const { serviceId, offerId } = (event as CustomEvent<ServiceDeepLinkDetail>).detail;
      void playDeepLink(serviceId, offerId ?? null);
    };

    window.addEventListener(SERVICE_DEEP_LINK_EVENT, onDeepLink);
    return () => window.removeEventListener(SERVICE_DEEP_LINK_EVENT, onDeepLink);
  }, [playDeepLink]);

  useEffect(() => {
    const serviceId = searchParams.get("service");
    const offerId = searchParams.get("offer");

    if (!serviceId) return;

    const key = `${serviceId}:${offerId ?? ""}`;
    if (handledSearchRef.current === key) return;
    handledSearchRef.current = key;

    const timer = window.setTimeout(() => {
      void playDeepLink(serviceId, offerId).then(() => {
        window.history.replaceState(null, "", `${window.location.pathname}#services`);
      });
    }, 180);

    return () => window.clearTimeout(timer);
  }, [playDeepLink, searchParams]);

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
            <div className="services__carousel-wrap">
              <div ref={carouselRef} className="services__carousel-shell">
                <div
                  ref={trackRef}
                  className="services__track"
                  style={{ "--slide-index": 0 } as React.CSSProperties}
                >
                  {services.map((service, index) => (
                    <button
                      key={service.id}
                      type="button"
                      className="service-card"
                      aria-label={`Ouvrir ${service.title}`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => openService(index)}
                    >
                      <Image
                        src={service.image}
                        alt=""
                        width={service.image.width}
                        height={service.image.height}
                        draggable={false}
                        className="service-card__image"
                        loading="lazy"
                        sizes="(max-width: 768px) 85vw, 33vw"
                      />
                      <span className="service-card__header">
                        <span className="service-card__chevron" aria-hidden="true">
                          ⌄
                        </span>
                        <span className="service-card__title" aria-hidden="true">
                          <AnimatedText
                            text={service.title}
                            externalHover={hoveredIndex === index}
                            decorative
                          />
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="services__slider-dots" aria-hidden="true">
                {services.map((service, index) => (
                  <span
                    key={service.id}
                    className={`services__slider-dot ${activeSlide === index ? "is-active" : ""}`}
                  />
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
        initialOfferId={initialOfferId}
      />
    </>
  );
}
