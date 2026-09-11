import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageProvider";
import { RasmWordmark } from "../RasmWordmark";
import { ClipReveal, Reveal } from "../Reveal";
import { Stroke } from "../Stroke";

export function About() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden bg-void py-24 md:py-36">
      <p
        aria-hidden="true"
        className="outline-type pointer-events-none absolute -end-[4vw] top-4 font-display text-[28vw] italic leading-none tracking-[-0.08em] md:top-0"
        dir="ltr"
      >
        {t.about.name}
      </p>

      <svg
        className="pointer-events-none absolute start-[-8%] bottom-[8%] h-[46%] w-[42%] text-gold/40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M 8 72 C 22 40, 38 28, 54 46 S 78 86, 94 58"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.18"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="type-index text-gold">
                {t.about.index} — {t.about.label}
              </p>
              <p className="type-meta mt-10" dir="ltr">
                <RasmWordmark />
              </p>
              <p className="mt-3 max-w-[18ch] text-fog">{t.about.aside}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ClipReveal delay={0.08}>
              <h2 className="type-h2 max-w-[24ch]">{t.about.title}</h2>
            </ClipReveal>
            <Stroke className="mt-8 h-[2px] w-28" delay={0.12} />

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
