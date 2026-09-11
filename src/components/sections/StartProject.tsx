import { useLanguage } from "../../context/LanguageProvider";
import { site } from "../../content/site";
import { Button } from "../Button";
import { ContactDrawing } from "../ContactDrawing";
import { ClipReveal, Reveal } from "../Reveal";

export function StartProject() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative overflow-hidden bg-night py-24 md:py-40">
      <ContactDrawing />

      <div className="shell relative">
        <Reveal>
          <p className="type-index text-gold">
            {t.contact.index} — {t.contact.label}
          </p>
        </Reveal>
        <ClipReveal delay={0.05}>
          <h2 className="type-display mt-6 max-w-[16ch] text-pretty whitespace-pre-line rtl:max-w-[24ch]">{t.contact.title}</h2>
        </ClipReveal>

        <Reveal className="mt-12 max-w-full md:mt-16" delay={0.12}>
          <Button
            href={site.bookingUrl}
            ariaLabel={t.contact.bookAria}
            className="max-w-full px-5 py-4 text-center leading-snug whitespace-normal sm:px-8"
          >
            {t.contact.book}
          </Button>
        </Reveal>

        <Reveal className="mt-8 md:mt-10" delay={0.18}>
          <a
            href={`mailto:${site.email}`}
            className="type-nav link-line inline-block max-w-full break-all text-fog hover:text-bone"
          >
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
