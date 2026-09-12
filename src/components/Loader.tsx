import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

const KEY = "artbox-loaded";

export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return !sessionStorage.getItem(KEY);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!show) return;
    const ms = reduce ? 120 : 900;
    const id = window.setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      setShow(false);
    }, ms);
    return () => window.clearTimeout(id);
  }, [reduce, show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-paper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6">
            <Wordmark className="text-ink" />
            <div className="h-px w-24 overflow-hidden bg-rule">
              <motion.div
                className="h-full w-full origin-left bg-ink"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
