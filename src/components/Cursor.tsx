import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useSpring(0, { stiffness: 320, damping: 36, mass: 0.35 });
  const y = useSpring(0, { stiffness: 320, damping: 36, mass: 0.35 });
  const tx = useSpring(0, { stiffness: 90, damping: 22, mass: 0.7 });
  const ty = useSpring(0, { stiffness: 90, damping: 22, mass: 0.7 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      tx.set(event.clientX);
      ty.set(event.clientY);
      setVisible(true);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, input, textarea, [data-cursor]")));
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [reduce, x, y, tx, ty]);

  if (reduce) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden lg:block"
        style={{ x: tx, y: ty }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 size-10 rounded-full border border-gold/35" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[81] hidden lg:block"
        style={{ x, y }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
          animate={{
            width: hovering ? 10 : 6,
            height: hovering ? 10 : 6,
            opacity: visible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        />
      </motion.div>
    </>
  );
}
