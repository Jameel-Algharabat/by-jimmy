import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const COLS = 6;
const ROWS = 6;
const CELL = 100;

/**
 * Cells that light up in sequence. Chosen so the composition
 * reads as a loose, asymmetric constellation, never a symbol.
 */
const LIVE: Array<[number, number, number]> = [
  // [col, row, delaySeconds]
  [1, 1, 0],
  [3, 0, 0.9],
  [4, 2, 1.8],
  [2, 3, 2.7],
  [5, 4, 3.6],
  [0, 4, 4.5],
  [3, 5, 5.4],
  [1, 2, 6.3],
];

export function BoxGrid({ className = "", label }: { className?: string; label: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [24, -40]);

  const w = COLS * CELL;
  const h = ROWS * CELL;

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }} role="img" aria-label={label}>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" shapeRendering="crispEdges">
        <rect x="0.5" y="0.5" width={w - 1} height={h - 1} fill="none" stroke="var(--color-rule)" strokeWidth="1" />
        {Array.from({ length: COLS - 1 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * CELL + 0.5} y1="0" x2={(i + 1) * CELL + 0.5} y2={h} stroke="var(--color-rule)" strokeWidth="1" />
        ))}
        {Array.from({ length: ROWS - 1 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * CELL + 0.5} x2={w} y2={(i + 1) * CELL + 0.5} stroke="var(--color-rule)" strokeWidth="1" />
        ))}
        {LIVE.map(([c, r, d], i) => {
          const isStatic = reduce && i % 2 === 0;
          if (reduce && !isStatic) return null;
          return (
            <rect
              key={`${c}-${r}`}
              x={c * CELL + 1}
              y={r * CELL + 1}
              width={CELL - 1}
              height={CELL - 1}
              className={reduce ? "box-cell-static" : "box-cell"}
              style={reduce ? undefined : { animationDelay: `${d}s` }}
            />
          );
        })}
        {/* One permanent anchor cell — the "box" itself */}
        <rect x={4 * CELL + 1} y={1 * CELL + 1} width={CELL - 1} height={CELL - 1} fill="var(--color-ink)" />
      </svg>
    </motion.div>
  );
}
