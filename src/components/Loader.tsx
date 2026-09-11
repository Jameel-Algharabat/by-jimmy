import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "../content/site";

export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("rasm-loaded");
  });

  useEffect(() => {
    if (!show) return;
    const ms = reduce ? 200 : 1400;
    const id = window.setTimeout(() => {
      sessionStorage.setItem("rasm-loaded", "1");
      setShow(false);
    }, ms);
    return () => window.clearTimeout(id);
  }, [reduce, show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-8%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <p className="type-logo text-bone">{site.name}</p>
          <svg className="mt-8 h-[2px] w-40 overflow-visible" viewBox="0 0 160 2" aria-hidden="true">
            <motion.line
              x1="0"
              y1="1"
              x2="160"
              y2="1"
              stroke="currentColor"
              className="text-gold"
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
