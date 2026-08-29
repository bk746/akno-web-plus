"use client";

import type { ReactNode } from "react";
import {
  HOME_CONTACTS_EXIT_FADE_MS,
  useNavigate,
} from "@/components/PageTransitionProvider";

type HomePageShellProps = {
  children: ReactNode;
};

export function HomePageShell({ children }: HomePageShellProps) {
  const { homeExitPhase } = useNavigate();

  const style =
    homeExitPhase === "fading"
      ? {
          opacity: 0,
          transition: `opacity ${HOME_CONTACTS_EXIT_FADE_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }
      : homeExitPhase === "hidden"
        ? { opacity: 0 }
        : undefined;

  return (
    <main
      className={`page-content ${homeExitPhase !== "idle" ? "page-content--exit" : ""}`}
      style={style}
    >
      {children}
    </main>
  );
}
