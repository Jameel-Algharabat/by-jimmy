/**
 * ARTBOX logo mark: a rounded square outline.
 * Traced from the brand artwork (outer 566, stroke 58, radius 64 → normalised to 100).
 * Uses currentColor so it inverts with the header over dark sections.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`block shrink-0 ${className}`}
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M11.3 0H88.7A11.3 11.3 0 0 1 100 11.3V88.7A11.3 11.3 0 0 1 88.7 100H11.3A11.3 11.3 0 0 1 0 88.7V11.3A11.3 11.3 0 0 1 11.3 0ZM21.55 10.25H78.45A11.3 11.3 0 0 1 89.75 21.55V78.45A11.3 11.3 0 0 1 78.45 89.75H21.55A11.3 11.3 0 0 1 10.25 78.45V21.55A11.3 11.3 0 0 1 21.55 10.25Z" />
    </svg>
  );
}
