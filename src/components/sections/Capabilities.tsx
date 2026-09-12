import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { EASE } from "../../motion";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

export function Capabilities() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [active, setActive] = useState<number | null>(null);
  const expandOnHover = fine && !reduce;

  return (
    <section id="capabilities" className="bg-paper py-24 md:py-36" aria-label={t.capabilities.label}>
      <div className="wrap">
        <SectionHead
          index={t.capabilities.index}
          label={t.capabilities.label}
          title={t.capabilities.title}
          lead={t.capabilities.lead}
        />

        <ol className="mt-16 border-t border-rule md:mt-24" onMouseLeave={() => setActive(null)}>
          {t.capabilities.items.map((item, i) => {
            const isActive = active === i;
            const dim = expandOnHover && active !== null && !isActive;
            const open = !expandOnHover || isActive;

            return (
              <Reveal as="li" key={item.n} delay={i * 0.05} className="border-b border-rule">
                <div
                  className={`grid-12 gap-y-3 py-7 transition-opacity duration-300 md:py-9 ${dim ? "opacity-40" : "opacity-100"}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null);
                  }}
                  tabIndex={expandOnHover ? 0 : -1}
                  aria-expanded={expandOnHover ? isActive : undefined}
                >
                  <p className="t-label t-num col-span-12 text-mute md:col-span-1">
                    <span dir="ltr">{item.n}</span>
                  </p>

                  <h3
                    className={`t-h2 col-span-12 text-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:col-span-5 lg:col-span-4 ${
                      isActive && expandOnHover ? "translate-x-2 rtl:-translate-x-2" : ""
                    }`}
                  >
                    {item.title}
                  </h3>

                  <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
                    <p className="t-body max-w-[46ch] text-graphite">{item.body}</p>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.p
                          key="detail"
                          className="t-small max-w-[46ch] overflow-hidden text-mute"
                          initial={expandOnHover ? { height: 0, opacity: 0, marginTop: 0 } : false}
                          animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                          exit={expandOnHover ? { height: 0, opacity: 0, marginTop: 0 } : undefined}
                          transition={{ duration: 0.35, ease: EASE }}
                        >
                          {item.detail}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
