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
          <h2 className="type-display mt-5 max-w-[18ch] whitespace-pre-line">{t.why.title}</h2>
        </ClipReveal>
        <Stroke className="mt-10 h-[2px] w-32" delay={0.08} />

        <div className="mt-16 md:mt-24">
          {t.why.items.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.06}>
              <article className="group grid grid-cols-1 gap-4 border-t border-line py-10 md:grid-cols-12 md:items-baseline md:gap-8 md:py-16">
                <p className="type-index text-fog transition-colors duration-500 group-hover:text-gold md:col-span-2">
                  {item.n}
                </p>
                <h3 className="type-h3 italic md:col-span-5">{item.title}</h3>
                <p className="max-w-[40ch] text-fog md:col-span-5">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
