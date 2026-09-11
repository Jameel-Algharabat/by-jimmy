import { motion, useReducedMotion } from "framer-motion";

export function ContactDrawing() {
  const reduce = useReducedMotion();

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-gold"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M 6 88 C 22 70, 38 92, 52 74 S 78 48, 94 62"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.22"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0.35 }}
        whileInView={{ pathLength: 1, opacity: 0.9 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M 10 18 C 28 8, 46 26, 62 14 S 88 6, 96 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.12"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0.2 }}
        whileInView={{ pathLength: 1, opacity: 0.45 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
