import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function Thread() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 48, damping: 22, restDelta: 0.001 });
  const d = "M 92 2 C 86 16, 96 28, 90 40 S 78 54, 88 66 S 98 80, 84 92 S 90 98, 93 100";

  if (reduce) {
    return (
      <svg
        className="pointer-events-none fixed inset-0 z-[4] hidden h-full w-full text-bone/15 md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={d} fill="none" stroke="currentColor" strokeWidth="0.14" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
        className="pointer-events-none fixed inset-0 z-[4] hidden h-full w-full text-bone/15 md:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.14"
        strokeLinecap="round"
        style={{ pathLength }}
      />
    </svg>
  );
}
