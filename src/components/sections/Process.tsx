import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { Reveal } from "../Reveal";
import { Stroke } from "../Stroke";

export function Process() {
  const { t } = useLanguage();

  return (
    <section id="process" className="relative bg-night">
      <div className="shell py-24 md:hidden">
        <p className="type-index text-gold">
          {t.process.index} — {t.process.label}
        </p>
        <h2 className="type-display mt-5 whitespace-pre-line rtl:max-w-[22ch]">{t.process.title}</h2>
        <Stroke className="mt-8 h-[2px] w-20" />
        <div className="mt-12 space-y-4">
          {t.process.steps.map((step) => (
            <article key={step.n} className="surface px-6 py-7">
              <p className="type-index text-gold">{step.n}</p>
              <h3 className="type-h3 mt-3 italic rtl:not-italic">{step.title}</h3>
              <p className="mt-3 max-w-[32ch] text-fog">{step.body}</p>
            </article>
          ))}
        </div>
      </div>

      <DesktopProcess />
    </section>
  );
}

function DesktopProcess() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);
  const step = t.process.steps[active];

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(3, Math.floor(v * 4)));
  });

  return (
    <div ref={ref} className="hidden md:block">
      <div className="h-[280vh]">
        <div className="sticky top-16 flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-x-clip py-20 lg:top-0 lg:min-h-svh">
          <div className="shell">
            <Reveal>
              <p className="type-index text-gold">
                {t.process.index} — {t.process.label}
              </p>
              <h2 className="type-display mt-5 whitespace-pre-line rtl:max-w-[22ch]">{t.process.title}</h2>
            </Reveal>

            <div className="relative mt-14 grid grid-cols-12 items-end gap-10">
              <div className="col-span-5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${step.n}-n`}
                    aria-hidden="true"
                    className="font-display text-[14vw] italic leading-[0.75] tracking-[-0.08em] text-bone/10 lg:text-[12vw]"
                    initial={reduce ? false : { y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduce ? undefined : { y: -20, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step.n}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="col-span-7 pb-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.n}
                    initial={reduce ? false : { y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduce ? undefined : { y: -12, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="surface px-8 py-10 lg:px-10 lg:py-12">
                      <p className="type-index text-gold">{step.n}</p>
                      <h3 className="type-h2 mt-4 text-bone">{step.title}</h3>
                      <p className="type-lead mt-6 max-w-[34ch] text-fog">{step.body}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-16 flex gap-3">
              {t.process.steps.map((item, i) => (
                <span
                  key={item.n}
                  className={`h-px flex-1 origin-start transition-colors duration-500 ${
                    i <= active ? "bg-gold" : "bg-line"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
