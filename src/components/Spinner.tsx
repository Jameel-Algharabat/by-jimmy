/**
 * Square loading spinner: a hollow rounded square whose outline stays still
 * while a gap in the stroke travels around the perimeter (the square analogue
 * of a circular indeterminate spinner). Colour follows `currentColor`.
 */
export function Spinner({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`block ${className}`} aria-hidden="true" focusable="false">
      <rect className="spinner-track" x="3" y="3" width="34" height="34" rx="9" ry="9" strokeWidth="3" pathLength={100} />
    </svg>
  );
}
