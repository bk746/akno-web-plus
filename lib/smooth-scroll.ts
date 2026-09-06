export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function getScrollOffset() {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const paddingTop = Number.parseFloat(rootStyles.scrollPaddingTop || "0");
  return Number.isFinite(paddingTop) ? paddingTop : 0;
}

export function scrollWindowTo(targetTop: number) {
  const top = Math.max(0, targetTop);

  if (prefersReducedMotion()) {
    window.scrollTo({ top });
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    window.scrollTo({ top, behavior: "smooth" });

    let lastScroll = window.scrollY;
    let stableFrames = 0;
    let frames = 0;
    const maxFrames = 100;

    const finish = () => resolve();
    const timeout = window.setTimeout(finish, 1300);

    const tick = () => {
      frames += 1;
      const current = window.scrollY;

      if (Math.abs(current - top) < 2) {
        window.clearTimeout(timeout);
        finish();
        return;
      }

      if (Math.abs(current - lastScroll) < 0.5) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        lastScroll = current;
      }

      if (stableFrames >= 8 || frames >= maxFrames) {
        window.clearTimeout(timeout);
        finish();
        return;
      }

      window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
  });
}

export async function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;

  if (id === "services") {
    await scrollToServicesCards();
    return;
  }

  const section = document.getElementById(id);
  if (!section) return;

  const offset = getScrollOffset();
  const targetTop = section.getBoundingClientRect().top + window.scrollY - offset;
  await scrollWindowTo(targetTop);
}

async function scrollToServicesCards() {
  const carousel = document.querySelector<HTMLElement>("#services .services__carousel-shell");
  const section = document.getElementById("services");

  if (!carousel || !section) {
    if (section) {
      const offset = getScrollOffset();
      const targetTop = section.getBoundingClientRect().top + window.scrollY - offset;
      await scrollWindowTo(targetTop);
    }
    return;
  }

  const offset = getScrollOffset();
  const rect = carousel.getBoundingClientRect();
  const visibleHeight = window.innerHeight - offset;
  const carouselCenter = rect.top + rect.height / 2 + window.scrollY;
  const viewportAnchor = offset + visibleHeight * 0.56;
  const targetTop = carouselCenter - viewportAnchor;

  await scrollWindowTo(targetTop);
}

export function isMenuOpen() {
  return document.querySelector(".menu-overlay--open") !== null;
}

export async function scrollToHashWhenReady(hash: string) {
  if (isMenuOpen()) {
    await wait(460);
  }

  await scrollToHash(hash);
}

export async function scrollToServicesSection() {
  await scrollToServicesCards();
}
