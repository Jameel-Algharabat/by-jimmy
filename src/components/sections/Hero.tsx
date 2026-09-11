import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { Button } from "../Button";
import { ClipReveal } from "../Reveal";
import { HeroDrawing } from "../HeroDrawing";
import { RasmWordmark } from "../RasmWordmark";

export function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 20, mass: 0.45 });
  const sy = useSpring(my, { stiffness: 70, damping: 20, mass: 0.45 });
  const x = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const y = useTransform(sy, [-0.5, 0.5], [-10, 10]);

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
      <section id="top" className="relative bg-night pt-24 md:min-h-svh md:pt-28">
        <HeroDrawing />

        <div className="shell relative z-10 flex flex-col justify-end pb-12 md:min-h-[calc(100svh-7rem)] md:pb-16">
          <ClipReveal>
            <p className="type-index text-gold">{t.hero.kicker}</p>
          </ClipReveal>

          <motion.h1
            className="type-hero mt-8 text-bone md:mt-10"
            aria-label={t.hero.title}
            dir="ltr"
            style={reduce ? undefined : { x, y }}
          >
            <RasmWordmark className="block" />
          </motion.h1>

          <div className="mt-10 grid grid-cols-1 items-end gap-10 pt-2 md:mt-14 md:grid-cols-12">
            <div className="md:col-span-7">
              <ClipReveal delay={0.45}>
                <p className="type-h3 max-w-[18ch] whitespace-pre-line text-bone">{t.hero.line}</p>
              </ClipReveal>
              <motion.p
                className="type-lead mt-6 max-w-[42ch] text-fog"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                {t.hero.lead}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col items-start gap-6 md:col-span-5 md:items-end"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button href="#contact">{t.hero.primary}</Button>
              <Button href="#work" variant="line">
                {t.hero.secondary}
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 flex items-center gap-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <span className="type-index text-fog">{t.scroll}</span>
            <span className="relative h-10 w-px overflow-hidden bg-line">
              <motion.span
                className="absolute inset-x-0 h-3 bg-gold"
                animate={reduce ? undefined : { y: ["-100%", "240%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.div>
        </div>
      </section>

      <Ticker items={t.hero.roles} />
    </>
  );
}

function Ticker({ items }: { items: readonly string[] }) {
  const reduce = useReducedMotion();
  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line bg-night" aria-hidden="true">
      <div className={`flex w-max items-center gap-10 py-3.5 ${reduce ? "" : "marquee-track"}`}>
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
