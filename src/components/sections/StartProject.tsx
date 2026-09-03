import { useState, type FormEvent, type ReactNode } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import type { ProjectType } from "../../content/copy";
import { Button } from "../Button";
import { ClipReveal, Reveal } from "../Reveal";

type FormState = {
  name: string;
  email: string;
  type: ProjectType | "";
  message: string;
};

const empty: FormState = { name: "", email: "", type: "", message: "" };

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function StartProject() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function validate(next: FormState) {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!next.name.trim()) nextErrors.name = t.contact.errors.name;
    if (!isEmail(next.email.trim())) nextErrors.email = t.contact.errors.email;
    if (!next.type) nextErrors.type = t.contact.errors.type;
    if (!next.message.trim()) nextErrors.message = t.contact.errors.message;
    return nextErrors;
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 600);
  }

  const types: { id: ProjectType; label: string }[] = [
    { id: "design", label: t.contact.types.design },
    { id: "development", label: t.contact.types.development },
    { id: "landing", label: t.contact.types.landing },
    { id: "maintenance", label: t.contact.types.maintenance },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-void py-24 md:py-36">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[8vw] start-0 font-display text-[22vw] font-extrabold leading-none tracking-[-0.08em] text-bone/[0.035]"
      >
        {t.contact.label}
      </p>

      <div className="shell relative">
        <Reveal>
          <p className="type-index text-ember">
            {t.contact.index} — {t.contact.label}
          </p>
        </Reveal>
        <ClipReveal delay={0.05}>
          <h2 className="type-display mt-6 max-w-[14ch] whitespace-pre-line">{t.contact.title}</h2>
        </ClipReveal>
        <Reveal delay={0.12}>
          <p className="type-lead mt-8 max-w-[40ch] text-fog">{t.contact.lead}</p>
        </Reveal>

        <Reveal className="mt-16 md:mt-20" delay={0.16}>
          {status === "sent" ? (
            <div className="max-w-[520px] border border-line px-6 py-10 md:px-10">
              <h3 className="type-h3">{t.contact.successTitle}</h3>
              <p className="mt-4 text-fog">{t.contact.successBody}</p>
              <div className="mt-8">
                <Button
                  onClick={() => {
                    setForm(empty);
                    setStatus("idle");
                  }}
                >
                  {t.contact.another}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="space-y-8 md:col-span-6">
                <Field label={t.contact.name} htmlFor="project-name" error={errors.name}>
                  <input
                    id="project-name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="field-input"
                  />
                </Field>
                <Field label={t.contact.email} htmlFor="project-email" error={errors.email}>
                  <input
                    id="project-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="field-input"
                  />
                </Field>
              </div>

              <div className="space-y-8 md:col-span-6">
                <fieldset>
                  <legend className="type-meta text-fog">{t.contact.type}</legend>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {types.map((item) => {
                      const selected = form.type === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setForm({ ...form, type: item.id })}
                          className={`type-btn border px-4 py-3 transition-colors duration-300 ${
                            selected
                              ? "border-bone bg-bone text-night"
                              : "border-line text-fog hover:border-bone/40 hover:text-bone"
                          }`}
                          aria-pressed={selected}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.type ? <p className="mt-3 text-sm text-ember">{errors.type}</p> : null}
                </fieldset>

                <Field label={t.contact.message} htmlFor="project-message" error={errors.message}>
                  <textarea
                    id="project-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="field-input min-h-[140px] resize-y"
                  />
                </Field>

                <Button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? t.contact.sending : t.contact.submit}
                </Button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="type-meta text-fog">
        {label}
      </label>
      <div className="mt-3">{children}</div>
      {error ? <p className="mt-3 text-sm text-ember">{error}</p> : null}
    </div>
  );
}
