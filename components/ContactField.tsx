"use client";

import { useId, useRef, useState } from "react";

type ContactFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email";
  multiline?: boolean;
  error?: string | null;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function ContactField({
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
  error = null,
  onFocus,
  onBlur,
}: ContactFieldProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const active = focused || value.length > 0;

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={`contact-field ${focused ? "contact-field--focused" : ""} ${active ? "contact-field--filled" : ""}`}
      onClick={focusInput}
      onKeyDown={(event) => {
        if (
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement
        ) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          focusInput();
        }
      }}
      role="presentation"
    >
      <label
        htmlFor={id}
        className={`contact-field__label ${active ? "contact-field__label--active" : ""}`}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          id={id}
          rows={1}
          value={value}
          className="contact-field__input contact-field__input--area"
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          id={id}
          type={type}
          value={value}
          className="contact-field__input"
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
        />
      )}

      <div className="contact-field__line contact-field__line--base" aria-hidden="true" />
      <div className="contact-field__line contact-field__line--focus" aria-hidden="true" />

      {error ? <p className="contact-field__error">{error}</p> : null}
    </div>
  );
}
