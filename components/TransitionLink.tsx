"use client";

import type { ComponentProps, MouseEvent } from "react";
import { useNavigate } from "@/components/PageTransitionProvider";

type TransitionLinkProps = ComponentProps<"a">;

function isContactHref(href: string) {
  const path = href.split("#")[0] || "/";
  return path === "/contacts" || path === "/contacts/";
}

export function TransitionLink({ href = "", onClick, ...props }: TransitionLinkProps) {
  const { navigate } = useNavigate();

  if (!isContactHref(href)) {
    return <a href={href} onClick={onClick} {...props} />;
  }

  return (
    <a
      href={href}
      {...props}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        onClick?.(event);
        navigate(href);
      }}
    />
  );
}
