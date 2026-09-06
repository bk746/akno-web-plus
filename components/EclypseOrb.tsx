import Image from "next/image";
import eclypse2 from "@/src/images/eclypse2-x2.png";
import eclypse3 from "@/src/images/eclypse3X2.png";

export type EclypseOrbTone = "cyan" | "blue" | "green";

type EclypseOrbProps = {
  className?: string;
  opacity?: number;
  animationDelay?: string;
  enterDelay?: string;
  variant?: "section" | "hero";
  tone?: EclypseOrbTone;
};

export function EclypseOrb({
  className = "",
  opacity = 1,
  animationDelay = "0s",
  enterDelay,
  variant = "section",
  tone = "blue",
}: EclypseOrbProps) {
  const orbit = (
    <div className="eclypse-orbit relative">
      <Image
        src={eclypse2}
        alt=""
        width={1218}
        height={1218}
        draggable={false}
        className="eclypse-orbit__frame eclypse-orbit__frame--a"
        sizes="(max-width: 768px) 40vw, 20vw"
      />
      <Image
        src={eclypse3}
        alt=""
        width={1218}
        height={1218}
        draggable={false}
        className="eclypse-orbit__frame eclypse-orbit__frame--b"
        sizes="(max-width: 768px) 40vw, 20vw"
      />
    </div>
  );

  return (
    <div
      className={`section-orb hero-orb-tone--${tone} ${className}`.trim()}
      style={
        {
          opacity,
          "--orb-delay": animationDelay,
          ...(enterDelay ? { "--hero-delay": enterDelay } : {}),
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {variant === "hero" ? (
        <div className="eclypse-orbit-drift">{orbit}</div>
      ) : (
        orbit
      )}
    </div>
  );
}
