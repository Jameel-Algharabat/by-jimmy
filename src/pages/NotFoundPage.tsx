import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "../components/Button";
import { useLanguage } from "../context/LanguageProvider";
import { site } from "../content/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function NotFoundPage() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  useEffect(() => {
    const previous = document.title;
    document.title = t.notFound.documentTitle;
    return () => {
      document.title = previous || site.title;
    };
  }, [t.notFound.documentTitle]);

  return (
    <main
      id="main"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-night pb-24 pt-32 md:pb-28 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />

      <motion.p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[6vw] end-[-6vw] select-none font-display text-[48vw] font-extrabold leading-[0.7] tracking-[-0.08em] text-bone/[0.055] md:end-[-3vw] md:text-[26vw]"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        {t.notFound.label}
      </motion.p>

      <div className="shell relative">
        <motion.p
          className="type-index text-gold"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {t.notFound.label}
        </motion.p>

        <div className="mt-6 overflow-hidden">
          <motion.h1
            className="type-display max-w-[10ch] text-pretty whitespace-pre-line"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
          >
            {t.notFound.title}
          </motion.h1>
        </div>

        <motion.p
          className="type-lead mt-8 max-w-[36ch] text-fog"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease }}
        >
          {t.notFound.lead}
        </motion.p>

        <motion.div
          className="mt-12 max-w-full md:mt-16"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          <Button href="/" className="min-h-12 px-8 py-4">
            {t.notFound.home}
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
