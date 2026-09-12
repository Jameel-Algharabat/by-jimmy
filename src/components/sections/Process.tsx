import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";

export function Process() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section id="process" className="bg-paper py-24 md:py-36" aria-label={t.process.label}>
      <div className="wrap">
        <SectionHead index={t.process.index} label={t.process.label} title={t.process.title} />

        <div className="relative mt-16 md:mt-24">
          {/* Track + progress line (desktop: horizontal across the columns) */}
          <div className="absolute inset-x-0 top-0 hidden h-px bg-rule lg:block" aria-hidden="true">
            <motion.div
              className="h-full w-full origin-left bg-ink rtl:origin-right"
              style={{ scaleX: reduce ? 1 : progress }}
            />
          </div>

          <ol ref={ref} className="grid grid-cols-1 gap-x-8 lg:grid-cols-4">
            {t.process.steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.n}
                delay={i * 0.08}
                className="relative border-t border-rule py-8 lg:border-t-0 lg:pt-10"
              >
                <span className="absolute -top-px start-0 hidden size-1.5 -translate-y-[2.5px] bg-ink lg:block" aria-hidden="true" />
                <div className="grid grid-cols-[3.5rem_1fr] gap-x-4 lg:block">
                  <p className="t-h2 t-num text-ink" aria-hidden="true">
                    <span dir="ltr">{step.n}</span>
                  </p>
                  <div className="lg:mt-10">
                    <h3 className="t-h3 text-ink">
                      <span className="sr-only">{step.n} — </span>
                      {step.title}
                    </h3>
                    <p className="t-small mt-3 max-w-[32ch] text-mute">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
