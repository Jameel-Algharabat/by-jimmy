import { useLanguage } from "../../context/LanguageProvider";
import { ClipReveal, Reveal } from "../Reveal";
import { Stroke } from "../Stroke";

export function Why() {
  const { t } = useLanguage();

  return (
    <section id="why" className="bg-void py-24 md:py-36">
      <div className="shell">
        <Reveal>
          <p className="type-index text-gold">
            {t.why.index} — {t.why.label}
          </p>
        </Reveal>
        <ClipReveal delay={0.06}>
          <h2 className="type-display mt-5 max-w-[18ch] whitespace-pre-line rtl:max-w-[24ch]">{t.why.title}</h2>
        </ClipReveal>
        <Stroke className="mt-10 h-[2px] w-32" delay={0.08} />

        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {t.why.items.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.06} className="h-full">
              <article className="surface flex h-full flex-col px-6 py-8 md:px-7 md:py-10">
                <p className="type-index text-fog">{item.n}</p>
                <h3 className="type-h3 mt-6 italic rtl:not-italic">{item.title}</h3>
                <p className="mt-4 max-w-[36ch] text-fog">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
