import { motion, useReducedMotion } from "framer-motion";

export function Stroke({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="h-px w-full origin-left bg-gold"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
