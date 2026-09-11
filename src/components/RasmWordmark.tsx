import { motion, useReducedMotion } from "framer-motion";
import { site } from "../content/site";

type RasmWordmarkProps = {
  className?: string;
  reveal?: boolean;
};

export function RasmWordmark({ className = "", reveal = false }: RasmWordmarkProps) {
  const reduce = useReducedMotion();

  if (!reveal) {
    return (
      <span className={`whitespace-nowrap ${className}`} dir="ltr" aria-label="RASM">
        {site.name}
      </span>
    );
  }

  return (
    <span className={`whitespace-nowrap ${className}`} dir="ltr" aria-label="RASM">
      <span className="inline-block overflow-hidden align-bottom py-[0.08em]" aria-hidden="true">
        <motion.span
          className="inline-block"
          initial={reduce ? false : { y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ delay: 0.18, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.name}
        </motion.span>
      </span>
    </span>
  );
}
