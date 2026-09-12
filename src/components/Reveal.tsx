import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "../motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "p";
  once?: boolean;
  amount?: number;
};

export function Reveal({ children, className, delay = 0, y = 16, as = "div", once = true, amount = 0.2 }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

export function ClipReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={`overflow-hidden pb-[0.12em] ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        variants={{ hidden: { y: "108%" }, show: { y: "0%" } }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Splits text on \n and reveals each line with a stagger. */
export function Lines({
  text,
  className,
  delay = 0,
  stagger = 0.08,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const lines = text.split("\n");
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <ClipReveal key={`${line}-${i}`} delay={delay + i * stagger} className="block">
          <span className="block">{line}</span>
        </ClipReveal>
      ))}
    </Tag>
  );
}

/** Hairline that draws from the reading start when in view. */
export function Rule({ className = "", delay = 0, inverse = false }: { className?: string; delay?: number; inverse?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className={`h-px w-full origin-left rtl:origin-right ${inverse ? "bg-paper/20" : "bg-rule"}`}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      />
    </div>
  );
}
