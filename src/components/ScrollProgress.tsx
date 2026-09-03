import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const reduce = useReducedMotion();
  if (reduce) return null;
  return <motion.div className="progress-bar" style={{ scaleX }} />;
}
