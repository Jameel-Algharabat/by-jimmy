import { useLanguage } from "../../context/LanguageProvider";
import { ClipReveal, Reveal } from "../Reveal";

export function Intro() {
  const { t } = useLanguage();

  return (
    <section className="bg-paper py-24 md:py-36" aria-labelledby="intro-heading">
      <div className="wrap">
        <div className="grid-12 gap-y-8">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="t-label text-mute">{t.intro.label}</p>
          </Reveal>
          <div className="col-span-12 md:col-span-9 lg:col-span-8">
            <ClipReveal>
              <p id="intro-heading" className="t-h1 max-w-[24ch] text-ink rtl:max-w-[30ch]">
                {t.intro.statement}
              </p>
            </ClipReveal>
            <Reveal delay={0.14}>
              <p className="t-lead mt-8 max-w-[48ch] text-mute md:mt-10">{t.intro.supporting}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
