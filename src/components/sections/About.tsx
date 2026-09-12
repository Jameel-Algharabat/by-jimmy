import { useLanguage } from "../../context/LanguageProvider";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-white py-24 md:py-36" aria-label={t.about.label}>
      <div className="wrap">
        <SectionHead index={t.about.index} label={t.about.label} title={t.about.title} />

        <div className="grid-12 mt-14 gap-y-8 md:mt-20">
          <Reveal className="col-span-12 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-4">
            <p className="t-lead text-graphite">{t.about.p1}</p>
          </Reveal>
          <Reveal delay={0.08} className="col-span-12 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-9">
            <p className="t-body text-mute">{t.about.p2}</p>
            <p className="t-body mt-5 text-mute">{t.about.p3}</p>
          </Reveal>
        </div>

        <div className="grid-12 mt-20 gap-y-6 md:mt-28">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="t-label text-mute">{t.about.principlesLabel}</p>
          </Reveal>
          <ol className="col-span-12 md:col-span-9 lg:col-span-8">
            {t.about.principles.map((item, i) => (
              <Reveal as="li" key={item.n} delay={i * 0.06} className="grid-12 border-t border-rule py-6 md:py-7">
                <p className="t-label t-num col-span-12 text-mute md:col-span-1">
                  <span dir="ltr">{item.n}</span>
                </p>
                <h3 className="t-h3 col-span-12 text-ink md:col-span-5 lg:col-span-5">{item.title}</h3>
                <p className="t-small col-span-12 max-w-[40ch] text-mute md:col-span-6">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
