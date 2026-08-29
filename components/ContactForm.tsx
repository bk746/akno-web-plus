"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ContactField } from "@/components/ContactField";
import { Reveal } from "@/components/Reveal";
import { contactInfo } from "@/data/contact";
import { services } from "@/data/services";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const serviceId = searchParams.get("service");
    const offerId = searchParams.get("offer");
    const projet = searchParams.get("projet");

    if (projet) {
      setMessage(`Bonjour,\n\nJe suis intéressé(e) par un projet similaire à ${projet}.`);
      return;
    }

    if (!serviceId) return;

    const service = services.find((item) => item.id === serviceId);
    if (!service) return;

    const offer = offerId
      ? service.offers?.find((item) => item.id === offerId)
      : null;

    if (offer) {
      setMessage(
        `Bonjour,\n\nJe souhaite un devis pour l'offre « ${offer.name} » (${service.title}) — ${offer.price}.`,
      );
      return;
    }

    setMessage(`Bonjour,\n\nJe souhaite un devis pour ${service.title}.`);
  }, [searchParams]);

  const handleSend = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;

    if (!isValidEmail(email)) {
      setEmailError("Adresse email invalide.");
      return;
    }

    setSending(true);

    const mailto = `mailto:${contactInfo.email}?subject=${encodeURIComponent(`Projet AKNO — ${name.trim()}`)}&body=${encodeURIComponent(`Nom: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`)}`;

    window.location.href = mailto;

    window.setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 600);
  };

  const canSend =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    message.trim().length > 0 &&
    !sending;

  return (
    <div className="contact-form">
      <Reveal y={20}>
        <p className="contact-form__heading">Parler de votre projet</p>
      </Reveal>

      <div className="contact-form__row contact-form__row--split">
        <Reveal className="contact-form__field" y={20} delay={0.08}>
          <ContactField label="Votre nom ?" value={name} onChange={setName} />
        </Reveal>

        <Reveal className="contact-form__field" y={20} delay={0.12}>
          <ContactField
            label="Votre email"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              if (emailError) setEmailError(null);
            }}
            error={emailError}
            onBlur={() => {
              if (email && !isValidEmail(email)) {
                setEmailError("Adresse email invalide.");
              }
            }}
          />
        </Reveal>
      </div>

      <Reveal className="contact-form__message-row" y={20} delay={0.16}>
        <ContactField
          label="Parlez-nous de votre projet"
          value={message}
          onChange={setMessage}
          multiline
        />

        <button
          type="button"
          className="contact-form__send"
          disabled={!canSend}
          onClick={(event) => {
            event.stopPropagation();
            handleSend();
          }}
        >
          <span>{sending ? "Envoi..." : "Envoyer"}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Reveal>

      {submitted ? (
        <p className="contact-form__success">
          Merci — votre client mail va s&apos;ouvrir pour finaliser l&apos;envoi.
        </p>
      ) : null}
    </div>
  );
}
