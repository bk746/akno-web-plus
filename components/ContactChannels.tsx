import { contactInfo } from "@/data/contact";

type ContactChannelsProps = {
  className?: string;
  variant?: "default" | "footer";
};

export function ContactChannels({ className = "", variant = "default" }: ContactChannelsProps) {
  return (
    <div className={`contact-channels contact-channels--${variant} ${className}`.trim()}>
      <a href={`tel:${contactInfo.phoneTel}`} className="contact-channels__link">
        {contactInfo.phoneDisplay}
      </a>
      <a href={`mailto:${contactInfo.email}`} className="contact-channels__link">
        {contactInfo.email}
      </a>
      <a
        href={contactInfo.instagram.url}
        className="contact-channels__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram · @{contactInfo.instagram.handle}
      </a>
      <a
        href={contactInfo.tiktok.url}
        className="contact-channels__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        TikTok · @{contactInfo.tiktok.handle}
      </a>
      <a
        href={contactInfo.whatsappUrl}
        className="contact-channels__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </div>
  );
}
