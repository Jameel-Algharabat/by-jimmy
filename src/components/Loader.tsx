import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "../motion";
import { Spinner } from "./Spinner";

const KEY = "artbox-loaded";
/** Keep the frame on screen long enough to read as intentional, not a flash. */
const MIN_MS = 700;
/** Never trap the visitor behind the loader if `load` is slow (e.g. a stalled font request). */
const MAX_MS = 2500;

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
    const started = performance.now();
    let hideTimer = 0;
    let done = false;

    const hide = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      setShow(false);
    };

    // Hide once the page has fully loaded, but not before the minimum display time.
    const onReady = () => {
      const min = reduce ? 120 : MIN_MS;
      const wait = Math.max(0, min - (performance.now() - started));
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(hide, wait);
    };

    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });

    const maxTimer = window.setTimeout(hide, reduce ? 400 : MAX_MS);

    return () => {
      window.removeEventListener("load", onReady);
      window.clearTimeout(hideTimer);
      window.clearTimeout(maxTimer);
    };
  }, [reduce, show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          aria-hidden="true"
        >
          <Spinner className="size-9 text-ink" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
