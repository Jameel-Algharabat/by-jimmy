export function Arrow({ className = "", direction = "forward" }: { className?: string; direction?: "forward" | "down" | "external" }) {
  if (direction === "down") {
    return (
      <svg viewBox="0 0 16 16" className={`size-4 ${className}`} aria-hidden="true">
        <path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (direction === "external") {
    return (
      <svg viewBox="0 0 16 16" className={`size-4 rtl:-scale-x-100 ${className}`} aria-hidden="true">
        <path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" className={`size-4 rtl:-scale-x-100 ${className}`} aria-hidden="true">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
