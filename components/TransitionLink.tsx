"use client";

import type { ComponentProps, MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useNavigate } from "@/components/PageTransitionProvider";
import { scrollToHashWhenReady } from "@/lib/smooth-scroll";

type TransitionLinkProps = ComponentProps<"a">;

function parseHref(href: string) {
  const [pathPart, hashPart = ""] = href.split("#");
  const path = pathPart || "/";

  return {
    path,
    hash: hashPart ? `#${hashPart}` : "",
  };
}

function normalizePath(path: string) {
  const base = path.split("#")[0] || "/";
  if (base.endsWith("/") && base.length > 1) return base.slice(0, -1);
  return base || "/";
}

function isContactHref(href: string) {
  return normalizePath(parseHref(href).path) === "/contacts";
}

function isSectionHref(href: string) {
  return parseHref(href).hash.length > 1;
}

export function TransitionLink({ href = "", onClick, ...props }: TransitionLinkProps) {
  const { navigate } = useNavigate();
  const pathname = usePathname();
  const router = useRouter();
  const usesTransition = isContactHref(href) || isSectionHref(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!usesTransition) {
      onClick?.(event);
      return;
    }

    event.preventDefault();
    onClick?.(event);

    if (isContactHref(href)) {
      navigate(href);
      return;
    }

    const { path, hash } = parseHref(href);
    const targetPath = normalizePath(path);
    const currentPath = normalizePath(pathname ?? "/");
    const destination = `${targetPath}${hash}`;

    if (targetPath === currentPath) {
      void scrollToHashWhenReady(hash).then(() => {
        window.history.pushState(null, "", destination);
      });
      return;
    }

    router.push(destination);
  };

  if (!usesTransition) {
    return <a href={href} onClick={onClick} {...props} />;
  }

  return <a href={href} onClick={handleClick} {...props} />;
}
