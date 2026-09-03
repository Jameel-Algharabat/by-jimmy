import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useSpring(0, { stiffness: 400, damping: 40, mass: 0.4 });
  const y = useSpring(0, { stiffness: 400, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, input, textarea, [data-cursor]");
      setHovering(Boolean(interactive));
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden mix-blend-difference lg:block"
      style={{ x, y }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-bone"
        animate={{
          width: hovering ? 56 : 12,
          height: hovering ? 56 : 12,
          backgroundColor: hovering ? "rgba(237,232,223,0.08)" : "#ede8df",
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      />
    </motion.div>
  );
}
