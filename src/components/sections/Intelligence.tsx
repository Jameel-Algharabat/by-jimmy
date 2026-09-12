import { useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageProvider";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";

const COLS = 18;
const ROWS = 6;
// Sparse set of "live" dots; the rest sit at low opacity.
const LIVE = new Set([3, 7, 12, 22, 27, 35, 41, 46, 58, 63, 71, 76, 84, 92, 99, 104]);

export function Intelligence() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section className="bg-ink py-24 text-paper md:py-36" aria-label={t.intelligence.label} data-dark="">
      <div className="wrap">
        <SectionHead
          index={t.intelligence.index}
          label={t.intelligence.label}
          title={t.intelligence.title}
          lead={t.intelligence.lead}
          inverse
        />

        <div className="grid-12 mt-16 gap-y-12 md:mt-24">
          <Reveal className="col-span-12 lg:col-span-4">
            <div className="max-w-[420px]" role="img" aria-label={t.intelligence.diagramLabel}>
              <svg viewBox={`0 0 ${COLS * 20} ${ROWS * 20}`} className="h-auto w-full">
                {Array.from({ length: COLS * ROWS }, (_, i) => {
                  const c = i % COLS;
                  const r = Math.floor(i / COLS);
                  const live = LIVE.has(i);
                  return (
                    <circle
                      key={i}
                      cx={c * 20 + 10}
                      cy={r * 20 + 10}
                      r={live ? 3.2 : 1.6}
                      fill="currentColor"
                      className={live && !reduce ? "dot-live" : ""}
                      style={{
                        opacity: live ? (reduce ? 1 : undefined) : 0.22,
                        animationDelay: live ? `${(i % 9) * 0.4}s` : undefined,
                      }}
                    />
                  );
                })}
              </svg>
            </div>
          </Reveal>

          <ol className="col-span-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:col-span-8">
            {t.intelligence.items.map((item, i) => (
              <Reveal as="li" key={item.n} delay={i * 0.06} className="border-t border-paper/15 py-7 md:py-8">
                <p className="t-label t-num text-paper/50">
                  <span dir="ltr">{item.n}</span>
                </p>
                <h3 className="t-h3 mt-4 text-paper">{item.title}</h3>
                <p className="t-small mt-3 max-w-[38ch] text-paper/65">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
