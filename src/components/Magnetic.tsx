import { useReducedMotion } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";

export function Magnetic({
  children,
  className = "",
  strength = 12,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  }

  function onLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  }

  return (
    <div
      ref={ref}
      className={`inline-flex transition-transform duration-300 ease-out will-change-transform ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
