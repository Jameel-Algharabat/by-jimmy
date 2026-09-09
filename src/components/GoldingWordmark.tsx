import { motion, useReducedMotion } from "framer-motion";
import { site } from "../content/site";

const GOLD = site.name.slice(0, 4);
const REST = site.name.slice(4);

type GoldingWordmarkProps = {
  className?: string;
  reveal?: boolean;
};

export function GoldingWordmark({ className = "", reveal = false }: GoldingWordmarkProps) {
  const reduce = useReducedMotion();

  if (!reveal) {
    return (
      <span className={`whitespace-nowrap ${className}`} dir="ltr" aria-label="GOLDING">
        <span className="gold-flow" aria-hidden="true">
          {GOLD}
        </span>
        <span className="text-bone" aria-hidden="true">
          {REST}
        </span>
      </span>
    );
  }

  return (
    <span className={`whitespace-nowrap ${className}`} dir="ltr" aria-label="GOLDING">
      <span className="inline-block overflow-hidden align-bottom" aria-hidden="true">
        <motion.span
          className="gold-flow inline-block"
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ delay: 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {GOLD}
        </motion.span>
      </span>
      <span className="inline-block overflow-hidden align-bottom" aria-hidden="true">
        <motion.span
          className="inline-block text-bone"
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ delay: 0.22, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {REST}
        </motion.span>
      </span>
    </span>
  );
}
