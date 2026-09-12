import type { ReactNode } from "react";
import { Lines, Reveal } from "./Reveal";

/**
 * Editorial section header: index + label on the left column,
 * title (and optional lead) on the right. Consistent rhythm across the page.
 */
export function SectionHead({
  index,
  label,
  title,
  lead,
  inverse = false,
  children,
  titleClass = "t-h1",
}: {
  index: string;
  label: string;
  title: string;
  lead?: string;
  inverse?: boolean;
  children?: ReactNode;
  titleClass?: string;
}) {
  const muted = inverse ? "text-paper/55" : "text-mute";
  const rule = inverse ? "border-paper/15" : "border-rule";

  return (
    <div className={`grid-12 border-t ${rule} pt-6 md:pt-8`}>
      <Reveal className="col-span-12 md:col-span-3">
        <p className={`t-label t-num ${muted}`}>
          <span dir="ltr">{index}</span>
          <span className="mx-2" aria-hidden="true">
            —
          </span>
          {label}
        </p>
      </Reveal>
      <div className="col-span-12 mt-8 md:col-span-9 md:mt-0 lg:col-span-8">
        <Lines as="h2" text={title} className={`${titleClass} block`} />
        {lead ? (
          <Reveal delay={0.12}>
            <p className={`t-lead mt-6 max-w-[46ch] ${muted}`}>{lead}</p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </div>
  );
}
