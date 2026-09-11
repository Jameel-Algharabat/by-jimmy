import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect } from "react";

export function HeroDrawing() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.5 });
  const y = useSpring(my, { stiffness: 60, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      mx.set((event.clientX / window.innerWidth - 0.5) * 28);
      my.set((event.clientY / window.innerHeight - 0.5) * 18);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <motion.svg
      className="pointer-events-none absolute inset-0 h-full w-full text-gold"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={reduce ? undefined : { x, y }}
    >
      <motion.path
        d="M 40 210 C 260 90, 520 80, 860 190 S 1320 250, 1400 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        pathLength={1}
        className={reduce ? "opacity-70" : "draw-in"}
      />
      <motion.path
        d="M 980 40 C 940 280, 1080 430, 1380 510"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        pathLength={1}
        className={reduce ? "opacity-40" : "draw-in opacity-45"}
        style={reduce ? undefined : { animationDelay: "0.45s" }}
      />
      <motion.path
        d="M 720 820 C 980 760, 1240 800, 1410 680"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        pathLength={1}
        className={reduce ? "opacity-30" : "draw-in opacity-35"}
        style={reduce ? undefined : { animationDelay: "0.85s" }}
      />
    </motion.svg>
  );
}
