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
        <h2 className="type-display mt-5 whitespace-pre-line">{t.process.title}</h2>
        <Stroke className="mt-8 h-[2px] w-20" />
        <div className="relative mt-12 border-s border-line ps-6">
          {t.process.steps.map((step) => (
            <div key={step.n} className="relative pb-12 last:pb-0">
              <span className="absolute top-1.5 -start-[29px] h-2 w-2 rounded-full bg-gold" />
              <p className="type-index text-gold">{step.n}</p>
              <h3 className="type-h3 mt-3 italic">{step.title}</h3>
              <p className="mt-3 max-w-[32ch] text-fog">{step.body}</p>
            </div>
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
        <div className="sticky top-0 flex min-h-svh flex-col justify-center overflow-hidden py-24">
          <div className="shell">
            <Reveal>
              <p className="type-index text-gold">
                {t.process.index} — {t.process.label}
              </p>
              <h2 className="type-display mt-5 whitespace-pre-line">{t.process.title}</h2>
            </Reveal>

            <div className="relative mt-16 grid grid-cols-12 items-end gap-10">
              <div className="col-span-5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${step.n}-n`}
                    aria-hidden="true"
                    className="font-display text-[16vw] italic leading-[0.75] tracking-[-0.08em] text-gold/20"
                    initial={reduce ? false : { y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduce ? undefined : { y: -32, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step.n}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="col-span-7 pb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.n}
                    initial={reduce ? false : { y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduce ? undefined : { y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="type-index text-gold">{step.n}</p>
                    <h3 className="type-display mt-4 text-bone">{step.title}</h3>
                    <p className="type-lead mt-6 max-w-[34ch] text-fog">{step.body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-16 flex gap-3">
              {t.process.steps.map((item, i) => (
                <span
                  key={item.n}
                  className={`h-px flex-1 origin-left transition-colors duration-500 ${
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
