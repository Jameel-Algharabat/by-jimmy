import { site } from "../content/site";

/**
 * ARTBOX wordmark. Latin, always LTR.
 * A single square before the name references the "box" — restrained, 2D.
 */
export function Wordmark({ className = "", mark = true }: { className?: string; mark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 whitespace-nowrap ${className}`} dir="ltr" aria-label={site.name}>
      {mark ? <span className="size-[0.55em] shrink-0 bg-current" aria-hidden="true" /> : null}
      <span className="t-logo">{site.name}</span>
    </span>
  );
}
