import { useLanguage } from "../../context/LanguageProvider";
import { Reveal } from "../Reveal";
import { Slider } from "../Slider";
import { Stroke } from "../Stroke";

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-night py-24 md:py-36">
      <div className="shell">
        <Reveal>
          <p className="type-index text-gold">
            {t.services.index} — {t.services.label}
          </p>
          <h2 className="type-display mt-5">{t.services.title}</h2>
        </Reveal>
        <Stroke className="mt-10 h-[2px] w-24" />

        <div className="mt-14 md:mt-20">
          <Slider label={t.services.title}>
            {t.services.items.map((item) => (
              <article key={item.n} className="surface px-6 py-10 md:px-12 md:py-14">
                <p className="type-index text-gold">{item.n}</p>
                <h3 className="type-h2 mt-6 italic text-bone rtl:not-italic">{item.title}</h3>
                <p className="type-lead mt-6 max-w-[38ch] text-fog">{item.body}</p>
              </article>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
