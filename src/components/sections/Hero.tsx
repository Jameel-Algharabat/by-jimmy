import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { Button } from "../Button";
import { ClipReveal } from "../Reveal";

export function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 80, damping: 22, mass: 0.4 });
  const x = useTransform(sx, [-0.5, 0.5], [-28, 28]);
  const y = useTransform(sy, [-0.5, 0.5], [-16, 16]);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      mx.set(event.clientX / window.innerWidth - 0.5);
      my.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <>
      <section
        id="top"
        className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-night pb-8 pt-28 md:pb-12 md:pt-32"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="hero-atmosphere absolute inset-0" />
          <div className="hero-wash hero-wash-a" />
          <div className="hero-wash hero-wash-b" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />

        <div className="shell relative z-10">
          <ClipReveal>
            <p className="type-index text-ember">{t.hero.kicker}</p>
          </ClipReveal>

          <motion.h1
            className="type-hero mt-7 text-bone md:mt-10"
            aria-label="BY JIMMY"
            dir="ltr"
            style={reduce ? undefined : { x, y }}
          >
            <span className="block whitespace-nowrap">
              <Letters text="BY" delay={0.12} />
            </span>
            <span className="block whitespace-nowrap">
              <Letters text="JIMMY" delay={0.28} />
            </span>
          </motion.h1>

          <div className="mt-10 grid grid-cols-1 items-end gap-10 border-t border-line pt-8 md:mt-14 md:grid-cols-12 md:pt-10">
            <div className="md:col-span-7">
              <p className="type-h3 max-w-[16ch] overflow-hidden whitespace-pre-line text-bone">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t.hero.line}
                </motion.span>
              </p>
              <motion.p
                className="type-lead mt-6 max-w-[36ch] text-fog"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                {t.hero.lead}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col items-start gap-6 md:col-span-5 md:items-end"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button href="#contact">{t.hero.primary}</Button>
              <Button href="#work" variant="line">
                {t.hero.secondary}
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 flex items-center gap-4 md:mt-16"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.8 }}
          >
            <span className="type-index text-fog">{t.scroll}</span>
            <span className="relative h-11 w-px overflow-hidden bg-line">
              <motion.span
                className="absolute inset-x-0 h-4 bg-ember"
                animate={reduce ? undefined : { y: ["-100%", "240%"] }}
                transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.div>
        </div>
      </section>

      <Ticker items={t.hero.roles} />
    </>
  );
}

function Letters({ text, delay }: { text: string; delay: number }) {
  const reduce = useReducedMotion();

  return (
    <>
      {text.split("").map((char, i) => (
        <span key={`${char}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              delay: delay + i * 0.035,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </>
  );
}

function Ticker({ items }: { items: readonly string[] }) {
  const reduce = useReducedMotion();
  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line bg-night" aria-hidden="true">
      <div className={`flex w-max items-center gap-10 py-4 ${reduce ? "" : "marquee-track"}`}>
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="type-meta flex items-center gap-10 whitespace-nowrap text-fog">
            {item}
            <span className="text-ember">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
