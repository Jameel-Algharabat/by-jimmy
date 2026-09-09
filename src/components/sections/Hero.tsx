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
  const spotX = useTransform(sx, (v) => (v + 0.5) * window.innerWidth);
  const spotY = useTransform(sy, (v) => (v + 0.5) * window.innerHeight);

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
        className="relative flex flex-col overflow-hidden bg-night pb-8 pt-24 md:pb-12 lg:min-h-svh lg:justify-end lg:pt-32"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className={`hero-grid absolute -inset-[72px] ${reduce ? "" : "hero-grid-drift"}`}
          />
          {reduce ? null : (
            <>
              <div className="hero-wash" />
              <div className="hero-rule-h" />
              <div className="hero-rule-v" />
              <motion.div
                className="hero-spot hidden lg:block"
                style={{ x: spotX, y: spotY }}
              />
            </>
          )}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />

        <div className="shell relative z-10">
          <ClipReveal>
            <p className="type-index text-gold">{t.hero.kicker}</p>
          </ClipReveal>

          <motion.h1
            className="type-hero mt-7 text-bone md:mt-10"
            aria-label={t.hero.title}
            dir="ltr"
            style={reduce ? undefined : { x, y }}
          >
            <span className="block whitespace-nowrap">
              <Letters text={t.hero.title} delay={0.12} accentFirst />
            </span>
          </motion.h1>

          <div className="mt-10 grid grid-cols-1 items-end gap-10 border-t border-line pt-8 md:mt-14 md:grid-cols-12 md:pt-10">
            <div className="md:col-span-7">
              <p className="type-h3 max-w-[22ch] overflow-hidden whitespace-pre-line text-bone">
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
                className="type-lead mt-6 max-w-[42ch] text-fog"
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
                className="absolute inset-x-0 h-4 bg-gold"
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

function Letters({
  text,
  delay,
  accentFirst = false,
}: {
  text: string;
  delay: number;
  accentFirst?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <>
      {text.split("").map((char, i) => (
        <span key={`${char}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${accentFirst && i === 0 ? "text-gold" : ""}`}
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
            <span className="text-gold">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
