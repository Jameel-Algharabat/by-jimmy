import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { Reveal } from "../Reveal";

export function Services() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);
  const active = t.services.items[open];

  return (
    <section id="services" className="border-t border-line bg-night py-24 md:py-36">
      <div className="shell">
        <Reveal>
          <p className="type-index text-ember">
            {t.services.index} — {t.services.label}
          </p>
          <h2 className="type-display mt-5">{t.services.title}</h2>
        </Reveal>

        <div className="mt-14 md:hidden">
          {t.services.items.map((item, i) => {
            const on = open === i;
            return (
              <div key={item.n} className="border-t border-line last:border-b">
                <button
                  type="button"
                  className="flex w-full items-baseline justify-between gap-6 py-7 text-start"
                  onClick={() => setOpen(i)}
                  aria-expanded={on}
                >
                  <span className="type-index text-fog">{item.n}</span>
                  <span
                    className={`flex-1 font-display text-[8vw] font-bold leading-[0.9] tracking-[-0.04em] ${
                      on ? "text-bone" : "text-fog"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.div
                      key={item.n}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="type-lead max-w-[42ch] pb-8 ps-14 text-fog">{item.body}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-20 hidden grid-cols-12 gap-12 md:grid lg:gap-20">
          <div className="col-span-7">
            {t.services.items.map((item, i) => {
              const on = open === i;
              return (
                <button
                  key={item.n}
                  type="button"
                  className="flex w-full items-baseline gap-8 border-t border-line py-8 text-start last:border-b"
                  onMouseEnter={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  aria-pressed={on}
                >
                  <span className={`type-index ${on ? "text-ember" : "text-fog"}`}>{item.n}</span>
                  <span
                    className={`font-display text-[4vw] font-bold leading-[0.9] tracking-[-0.045em] transition-colors duration-500 ${
                      on ? "text-bone" : "text-fog/55"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative col-span-5">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.n}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p
                    aria-hidden="true"
                    className="font-display text-[8vw] font-extrabold leading-none tracking-[-0.08em] text-bone/[0.06]"
                  >
                    {active.n}
                  </p>
                  <p className="type-lead mt-4 max-w-[34ch] text-fog">{active.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
