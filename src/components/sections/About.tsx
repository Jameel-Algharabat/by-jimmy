import { useLanguage } from "../../context/LanguageProvider";
import { ClipReveal, Reveal } from "../Reveal";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative overflow-hidden border-t border-line bg-ash py-24 md:py-36">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -end-[6vw] top-6 font-display text-[32vw] font-extrabold leading-none tracking-[-0.08em] text-bone/[0.035] md:top-0"
      >
        {t.about.name}
      </p>

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="type-index text-ember">
                {t.about.index} — {t.about.label}
              </p>
              <p className="type-meta mt-10 text-fog">{t.about.name}</p>
              <p className="mt-3 max-w-[18ch] text-bone/70">{t.about.aside}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ClipReveal delay={0.08}>
              <h2 className="type-h2 max-w-[18ch]">{t.about.title}</h2>
            </ClipReveal>

            <div className="mt-14 max-w-[640px] space-y-6 text-bone/80 md:mt-20">
              <Reveal>
                <p>{t.about.p1}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>{t.about.p2}</p>
              </Reveal>
              <Reveal delay={0.14}>
                <p>{t.about.p3}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
