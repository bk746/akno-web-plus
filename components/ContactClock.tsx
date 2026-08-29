"use client";

import { useEffect, useState } from "react";

function getParisTime(date: Date) {
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "00";

  return {
    hours: read("hour"),
    minutes: read("minute"),
    seconds: read("second"),
  };
}

export function ContactClock() {
  const [now, setNow] = useState<Date | null>(null);
  const [colonVisible, setColonVisible] = useState(true);

  useEffect(() => {
    setNow(new Date());

    const tick = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    const blink = window.setInterval(() => {
      setColonVisible((visible) => !visible);
    }, 500);

    return () => {
      window.clearInterval(tick);
      window.clearInterval(blink);
    };
  }, []);

  const parts = now ? getParisTime(now) : { hours: "00", minutes: "00", seconds: "00" };

  return (
    <div className="contact-clock">
      <div className="contact-clock__card" aria-hidden="true" />
      <div className="contact-clock__content">
        <p className="contact-clock__time" aria-live="polite">
          <span>{parts.hours}</span>
          <span className={colonVisible ? "contact-clock__colon" : "contact-clock__colon contact-clock__colon--hidden"}>
            :
          </span>
          <span>{parts.minutes}</span>
          <span className="contact-clock__seconds">{parts.seconds}</span>
        </p>
        <p className="contact-clock__location">France</p>
        <p className="contact-clock__timezone">Paris · UTC+1</p>
      </div>
    </div>
  );
}
