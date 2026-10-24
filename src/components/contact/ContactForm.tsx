"use client";

import { ArrowRight, Check } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";

const PROJECT_TYPES = ["Residential", "Cultural", "Interior", "Other"] as const;

type Values = { name: string; email: string; type: string; description: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", type: "", description: "" };
const FIELD_ORDER: (keyof Values)[] = ["name", "email", "type", "description"];

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!values.type) errors.type = "Please choose a project type.";
  if (values.description.trim().length < 20)
    errors.description = "Please describe the project in at least 20 characters.";
  return errors;
}

export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const update = (field: keyof Values, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // After a first submit attempt, errors clear as soon as a field becomes valid.
    if (touched) setErrors(validate(next));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    const found = validate(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      const target = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`);
      target?.focus();
      return;
    }
    setSubmitted(true);
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched(false);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="border border-ink p-6 outline-none md:p-10">
        <p className="meta flex items-center gap-2">
          <Check aria-hidden="true" size={14} strokeWidth={1.5} />
          Demo submission complete
        </p>
        <p className="title mt-6">Thank you, {values.name.trim().split(" ")[0]}.</p>
        <p className="body mt-6 max-w-[48ch]">
          Your message passed validation, but <strong className="font-semibold text-ink">it has not been sent</strong>.
          ATELIER / FORM is a fictional studio and this site has no backend, so nothing was delivered or stored.
        </p>
        <dl className="meta mt-8 grid grid-cols-[7rem_1fr] gap-y-2 border-t border-concrete pt-4 text-charcoal">
          <dt>Project type</dt>
          <dd className="text-ink">{values.type}</dd>
          <dt>Reply to</dt>
          <dd className="break-all text-ink">{values.email.trim()}</dd>
        </dl>
        <button type="button" onClick={reset} className="btn group mt-10">
          Write another message
          <ArrowRight aria-hidden="true" size={14} strokeWidth={1.5} className="arrow-shift" />
        </button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const fieldClass = (field: keyof Values) =>
    `w-full border-0 border-b bg-transparent py-3 text-lg tracking-[-0.01em] outline-none transition-colors duration-300 placeholder:text-charcoal/60 focus:border-ink ${
      errors[field] ? "border-ink" : "border-concrete"
    }`;

  const errorText = (field: keyof Values) =>
    errors[field] ? (
      <p id={`${id}-${field}-error`} className="meta mt-2 text-ink">
        — {errors[field]}
      </p>
    ) : null;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={`${id}-note`} className="space-y-10">
      <p id={`${id}-note`} className="meta border border-concrete px-4 py-3 text-charcoal">
        Concept form — validation works, but messages are not sent anywhere.
      </p>

      <p className="sr-only" role="alert">
        {touched && errorCount > 0 ? `${errorCount} field${errorCount > 1 ? "s need" : " needs"} attention.` : ""}
      </p>

      <div className="grid gap-10 md:grid-cols-2 md:gap-[var(--gutter)]">
        <div>
          <label htmlFor={`${id}-name`} className="meta text-charcoal">
            Name
          </label>
          <input
            id={`${id}-name`}
            data-field="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            className={fieldClass("name")}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="meta text-charcoal">
            Email
          </label>
          <input
            id={`${id}-email`}
            data-field="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            className={fieldClass("email")}
          />
          {errorText("email")}
        </div>
      </div>

      <fieldset
        aria-invalid={Boolean(errors.type)}
        aria-describedby={errors.type ? `${id}-type-error` : undefined}
      >
        <legend className="meta text-charcoal">Project type</legend>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PROJECT_TYPES.map((type, i) => (
            <label key={type} className="relative cursor-pointer">
              <input
                type="radio"
                name="type"
                value={type}
                data-field={i === 0 ? "type" : undefined}
                checked={values.type === type}
                onChange={(e) => update("type", e.target.value)}
                className="peer sr-only"
              />
              <span className="meta flex min-h-12 items-center justify-between border border-concrete px-3 text-charcoal transition-colors duration-300 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ink hover:border-ink">
                {type}
                <span aria-hidden="true" className="text-[0.625rem]">
                  0{i + 1}
                </span>
              </span>
            </label>
          ))}
        </div>
        {errorText("type")}
      </fieldset>

      <div>
        <label htmlFor={`${id}-description`} className="meta text-charcoal">
          Project description
        </label>
        <textarea
          id={`${id}-description`}
          data-field="description"
          name="description"
          rows={5}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? `${id}-description-error` : undefined}
          placeholder="Site, programme, scale, and what matters most to you."
          className={`${fieldClass("description")} resize-y`}
        />
        <div className="flex justify-between">
          {errorText("description") ?? <span />}
          <p className="meta mt-2 text-charcoal/80" aria-hidden="true">
            {values.description.trim().length} / 20+
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-concrete pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta max-w-[40ch] text-charcoal">All fields are required. Nothing leaves your browser.</p>
        <button type="submit" className="btn group w-full sm:w-auto">
          Submit enquiry (demo)
          <ArrowRight aria-hidden="true" size={14} strokeWidth={1.5} className="arrow-shift" />
        </button>
      </div>
    </form>
  );
}
