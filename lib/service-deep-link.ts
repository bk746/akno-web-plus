import { services } from "@/data/services";
import {
  prefersReducedMotion,
  scrollToServicesSection,
  scrollWindowTo,
} from "@/lib/smooth-scroll";

export const SERVICE_DEEP_LINK_EVENT = "akno:open-service";

export const TEMPLATE_SERVICE_ID = "dev-web";
export const TEMPLATE_OFFER_ID = "template";

export type ServiceDeepLinkDetail = {
  serviceId: string;
  offerId?: string | null;
};

export function buildServiceOfferHref(serviceId: string, offerId: string) {
  const params = new URLSearchParams({
    service: serviceId,
    offer: offerId,
  });

  return `/?${params.toString()}#services`;
}

export const templateAknoOfferHref = buildServiceOfferHref(
  TEMPLATE_SERVICE_ID,
  TEMPLATE_OFFER_ID,
);

export function getServiceIndex(serviceId: string) {
  return services.findIndex((service) => service.id === serviceId);
}

export function dispatchServiceDeepLink(serviceId: string, offerId?: string | null) {
  window.dispatchEvent(
    new CustomEvent<ServiceDeepLinkDetail>(SERVICE_DEEP_LINK_EVENT, {
      detail: { serviceId, offerId: offerId ?? null },
    }),
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export async function scrollCarouselToService(
  carousel: HTMLElement,
  serviceIndex: number,
) {
  const card = carousel.querySelectorAll<HTMLElement>(".service-card")[serviceIndex];
  if (!card) return;

  if (prefersReducedMotion()) {
    card.scrollIntoView({ inline: "center", block: "nearest" });
    return;
  }

  const carouselRect = carousel.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const targetLeft =
    carousel.scrollLeft +
    (cardRect.left - carouselRect.left) -
    (carouselRect.width - cardRect.width) / 2;

  carousel.scrollTo({ left: targetLeft, behavior: "smooth" });
  await wait(520);
}

export async function alignDesktopServicesCarousel(
  scrollContainer: HTMLElement,
  serviceIndex: number,
  maxIndex: number,
) {
  const scrollRange = scrollContainer.offsetHeight - window.innerHeight;
  if (scrollRange <= 0) return;

  const targetSlide = Math.min(Math.max(serviceIndex - 1, 0), maxIndex);
  const progress = maxIndex > 0 ? targetSlide / maxIndex : 0;
  const containerTop = scrollContainer.getBoundingClientRect().top + window.scrollY;
  const targetTop = containerTop + progress * scrollRange;

  await scrollWindowTo(targetTop);
}

export async function runServiceDeepLink({
  serviceId,
  offerId = null,
  scrollContainer,
  carousel,
  maxIndex,
  isMobile,
}: {
  serviceId: string;
  offerId?: string | null;
  scrollContainer: HTMLElement | null;
  carousel: HTMLElement | null;
  maxIndex: number;
  isMobile: boolean;
}) {
  const serviceIndex = getServiceIndex(serviceId);
  if (serviceIndex === -1) return null;

  await scrollToServicesSection();

  if (isMobile && carousel) {
    await scrollCarouselToService(carousel, serviceIndex);
  } else if (scrollContainer) {
    await alignDesktopServicesCarousel(scrollContainer, serviceIndex, maxIndex);
  }

  await wait(prefersReducedMotion() ? 0 : 280);

  return { serviceIndex, offerId };
}
