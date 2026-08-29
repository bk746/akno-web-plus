import { TbBrandInstagram, TbBrandTiktok, TbBrandWhatsapp } from "react-icons/tb";
import { contactInfo } from "@/data/contact";

export const socialLinks = [
  {
    name: "TikTok",
    href: contactInfo.tiktok.url,
    Icon: TbBrandTiktok,
  },
  {
    name: "Instagram",
    href: contactInfo.instagram.url,
    Icon: TbBrandInstagram,
  },
  {
    name: "WhatsApp",
    href: contactInfo.whatsappUrl,
    Icon: TbBrandWhatsapp,
  },
] as const;

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className = "social-links" }: SocialLinksProps) {
  return (
    <div className={className} aria-label="Réseaux sociaux AKNO">
      {socialLinks.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          className="social-links__item"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
