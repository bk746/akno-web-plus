"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoAkno from "@/src/images/logo-akno-plus.png";
import { EclypseOrb } from "@/components/EclypseOrb";
import { useIntro } from "@/components/IntroProvider";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function SiteIntro() {
  const { completeIntro, skipIntro } = useIntro();
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">("enter");
  const [visible, setVisible] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };

    const schedule = (callback: () => void, delay: number) => {
      timersRef.current.push(window.setTimeout(callback, delay));
    };

    if (prefersReducedMotion()) {
      skipIntro();
      return clearTimers;
    }

    if (sessionStorage.getItem("akno-intro-seen") === "1") {
      skipIntro();
      return clearTimers;
    }

    document.documentElement.classList.add("intro-pending");
    setVisible(true);

    schedule(() => setPhase("hold"), 1000);
    schedule(() => setPhase("exit"), 2200);
    schedule(() => {
      sessionStorage.setItem("akno-intro-seen", "1");
      completeIntro();
    }, 2800);
    schedule(() => {
      setPhase("done");
      setVisible(false);
    }, 3400);

    return clearTimers;
  }, [completeIntro, skipIntro]);

  if (!visible || phase === "done") return null;

  const exiting = phase === "exit";

  return (
    <div
      className={`site-intro ${exiting ? "site-intro--exit" : ""}`}
      aria-hidden="true"
    >
      <div className="site-intro__inner">
        <div className="site-intro__cluster">
          <div
            className={`site-intro__copy site-intro__copy--left ${exiting ? "is-exiting" : "is-entering"}`}
          >
            <div className="site-intro__copy-block site-intro__copy-block--left">
              <span>Des expériences</span>
              <span>digitales sur mesure</span>
            </div>
            <div className="site-intro__copy-block site-intro__copy-block--right">
              <span>depuis —</span>
              <span>AKNO</span>
            </div>
          </div>

          <div
            className={`site-intro__orb-wrap ${exiting ? "is-exiting" : "is-entering"}`}
          >
            <EclypseOrb
              variant="hero"
              className="site-intro__orb"
              opacity={1}
              animationDelay="0s"
            />
          </div>

          <div
            className={`site-intro__brand ${exiting ? "is-exiting" : "is-entering"}`}
          >
            <Image
              src={logoAkno}
              alt="AKNO"
              width={206}
              height={78}
              draggable={false}
              priority
              className="site-intro__brand-logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
