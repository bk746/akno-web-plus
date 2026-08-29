"use client";

import { useState } from "react";

type AnimatedTextProps = {
  text: string;
  className?: string;
  externalHover?: boolean;
  decorative?: boolean;
};

export function AnimatedText({
  text,
  className = "",
  externalHover,
  decorative = false,
}: AnimatedTextProps) {
  const [hovered, setHovered] = useState(false);
  const isHovered = externalHover ?? hovered;
  const characters = text.split("");

  return (
    <span
      className={`animated-text ${className}`.trim()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden={decorative ? true : undefined}
    >
      {characters.map((character, index) => (
        <span key={`${character}-${index}`} className="animated-text__char">
          <span className="animated-text__stack">
            <span
              className="animated-text__layer animated-text__layer--incoming"
              style={{
                transform: isHovered ? "translateY(0)" : "translateY(-110%)",
                transitionDelay: `${index * 0.01}s`,
              }}
            >
              {character === " " ? "\u00a0" : character}
            </span>
            <span
              className="animated-text__layer animated-text__layer--outgoing"
              style={{
                transform: isHovered ? "translateY(110%)" : "translateY(0)",
                transitionDelay: `${index * 0.01}s`,
              }}
            >
              {character === " " ? "\u00a0" : character}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}
