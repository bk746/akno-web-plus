"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export const HOME_CONTACTS_EXIT_FADE_MS = 420;

type TransitionPhase = "idle" | "in" | "out";
type HomeExitPhase = "idle" | "fading" | "hidden";

type PageTransitionContextValue = {
  navigate: (href: string) => void;
  isTransitioning: boolean;
  homeExitPhase: HomeExitPhase;
};

const PageTransitionContext = createContext<PageTransitionContextValue>({
  navigate: () => {},
  isTransitioning: false,
  homeExitPhase: "idle",
});

export function useNavigate() {
  return useContext(PageTransitionContext);
}

function normalizePath(path: string) {
  const base = path.split("#")[0] || "/";
  if (base.endsWith("/") && base.length > 1) return base.slice(0, -1);
  return base || "/";
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function PageTransitionOverlay({ phase }: { phase: TransitionPhase }) {
  if (phase === "idle") return null;

  return (
    <div className="page-transition" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={`page-transition__stripe page-transition__stripe--${phase}`}
          style={{ "--stripe-index": index } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [homeExitPhase, setHomeExitPhase] = useState<HomeExitPhase>("idle");
  const navigatingRef = useRef(false);
  const targetRef = useRef<string | null>(null);
  const homeExitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phase !== "in" || !targetRef.current) return;

    if (normalizePath(pathname ?? "/") === normalizePath(targetRef.current)) {
      targetRef.current = null;
      setPhase("out");
    }
  }, [phase, pathname]);

  useEffect(() => {
    if (normalizePath(pathname ?? "/") !== "/") {
      setHomeExitPhase("idle");
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = phase !== "idle" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    return () => {
      if (homeExitTimerRef.current) clearTimeout(homeExitTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== "out") return;

    const timer = setTimeout(() => {
      setPhase("idle");
      navigatingRef.current = false;
    }, 1130);

    return () => clearTimeout(timer);
  }, [phase]);

  const navigate = useCallback(
    (href: string) => {
      if (navigatingRef.current) return;

      const target = normalizePath(href);
      const current = normalizePath(pathname ?? "/");

      if (target === current) return;

      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      navigatingRef.current = true;

      if (target === "/") {
        router.push(href);
        navigatingRef.current = false;
        return;
      }

      const runTransition = () => {
        targetRef.current = target;
        setPhase("in");

        window.setTimeout(() => {
          router.push(href);

          window.setTimeout(() => {
            if (targetRef.current) {
              targetRef.current = null;
              setPhase((prev) => (prev === "in" ? "out" : prev));
            }
          }, 5000);
        }, 1030);
      };

      if (current === "/" && target === "/contacts") {
        setHomeExitPhase("fading");
        homeExitTimerRef.current = setTimeout(() => {
          homeExitTimerRef.current = null;
          setHomeExitPhase("hidden");
          runTransition();
        }, HOME_CONTACTS_EXIT_FADE_MS);
        return;
      }

      runTransition();
    },
    [pathname, router],
  );

  return (
    <PageTransitionContext.Provider
      value={{
        navigate,
        isTransitioning: phase !== "idle",
        homeExitPhase,
      }}
    >
      {children}
      <PageTransitionOverlay phase={phase} />
    </PageTransitionContext.Provider>
  );
}
