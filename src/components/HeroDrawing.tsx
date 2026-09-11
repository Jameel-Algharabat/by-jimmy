import { useReducedMotion } from "framer-motion";

export function HeroDrawing() {
  const reduce = useReducedMotion();

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-bone/20"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        d="M 40 210 C 260 90, 520 80, 860 190 S 1320 250, 1400 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        pathLength={1}
        className={reduce ? "opacity-70" : "draw-in"}
      />
      <path
        d="M 980 40 C 940 280, 1080 430, 1380 510"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        pathLength={1}
        className={reduce ? "opacity-40" : "draw-in opacity-45"}
        style={reduce ? undefined : { animationDelay: "0.45s" }}
      />
      <path
        d="M 720 820 C 980 760, 1240 800, 1410 680"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        pathLength={1}
        className={reduce ? "opacity-30" : "draw-in opacity-35"}
        style={reduce ? undefined : { animationDelay: "0.85s" }}
      />
    </svg>
  );
}
