import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { TransitionLink } from "@/components/TransitionLink";
import { EclypseOrb } from "@/components/EclypseOrb";
import { aboutContent } from "@/data/about";
import { teamMembers } from "@/data/team";

export function AboutSection() {
  return (
    <section id="apropos" className="about">
      <EclypseOrb
        className="about__orb"
        opacity={0.2}
        animationDelay="-5s"
      />

      <div className="about__content">
        <Reveal as="h2" className="about__title" y={32}>
          {aboutContent.title}
        </Reveal>

        <Reveal className="about__text" y={24} delay={0.08}>
          {aboutContent.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal y={24} delay={0.14}>
          <TransitionLink href="/contacts" className="hero-btn hero-btn--secondary about__cta">
            Travaillons ensemble
          </TransitionLink>
        </Reveal>

        <div className="about__members">
          {teamMembers.map((member, index) => (
            <Reveal
              key={member.id}
              className="about-member"
              y={32}
              scale={0.96}
              delay={0.12 + index * 0.1}
            >
              <div className="about-member__photo-wrap">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={member.image.width}
                  height={member.image.height}
                  draggable={false}
                  loading="lazy"
                  className="about-member__photo"
                  sizes="(max-width: 768px) 80vw, 280px"
                  style={{
                    ...(member.imagePosition
                      ? { objectPosition: member.imagePosition }
                      : {}),
                    ...(member.imageScale
                      ? { transform: `scale(${member.imageScale})` }
                      : {}),
                  }}
                />
              </div>
              <h3 className="about-member__name">{member.name}</h3>
              <p className="about-member__role">{member.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
