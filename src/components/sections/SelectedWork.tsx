import { motion, useReducedMotion } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import type { Copy } from "../../content/copy";
import { useLanguage } from "../../context/LanguageProvider";
import { Button } from "../Button";
import { ClipReveal, Reveal } from "../Reveal";

type WorkItem = Copy["work"]["items"][number];

export function SelectedWork() {
  const { t } = useLanguage();

  return (
    <section id="work" className="bg-night pb-8 pt-24 md:pt-36">
      <div className="shell mb-16 md:mb-28">
        <Reveal>
          <p className="type-index text-ember">
            {t.work.index} — {t.work.label}
          </p>
          <h2 className="type-display mt-5 max-w-[20ch] whitespace-pre-line">{t.work.title}</h2>
          <p className="type-lead mt-6 max-w-[38ch] text-fog">{t.work.lead}</p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-20 md:gap-28">
        {t.work.items.map((item, i) => (
          <ProjectChapter key={item.id} item={item} index={String(i + 1).padStart(2, "0")} copy={t.work} />
        ))}
      </div>
    </section>
  );
}

function ProjectChapter({
  item,
  index,
  copy,
}: {
  item: WorkItem;
  index: string;
  copy: Copy["work"];
}) {
  const isGharabat = item.id === "gharabat";
  const caseStudy = "caseStudy" in item ? item.caseStudy : undefined;

  return (
    <article className="relative">
      <div className="shell">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <ClipReveal>
              <p className="type-index text-fog">
                {index} / {item.category}
              </p>
            </ClipReveal>
            <ClipReveal delay={0.08}>
              <h3 className="type-display mt-3 text-bone">{item.title}</h3>
            </ClipReveal>
          </div>
          <div className="lg:col-span-4 lg:text-end">
            <p className="type-meta text-ember">{item.role}</p>
            <p className="type-meta mt-2 text-fog">{item.contributionMeta}</p>
          </div>
        </div>
      </div>

      <ProjectFrame
        src={item.image}
        alt={item.title}
        href={isGharabat && caseStudy ? caseStudy : item.website}
        internal={Boolean(isGharabat && caseStudy)}
        cta={isGharabat ? copy.viewCase : copy.visit}
      />

      <div className="shell mt-8 grid grid-cols-1 gap-8 pb-4 md:grid-cols-12 md:mt-10">
        <p className="type-lead max-w-[46ch] text-fog md:col-span-7">{item.summary}</p>
        <div className="md:col-span-5 md:justify-self-end">
          {"intro" in item && item.intro ? (
            <p className="mb-6 max-w-[40ch] text-bone/80">{item.intro}</p>
          ) : null}
          {"contribution" in item && item.contribution
            ? item.contribution.map((p) => (
                <p key={p} className="mb-4 max-w-[40ch] text-fog">
                  {p}
                </p>
              ))
            : null}
          {"referenceNote" in item && item.referenceNote ? (
            <p className="type-meta mb-6 text-fog/70">{item.referenceNote}</p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-center gap-6">
            {isGharabat && caseStudy ? <Button href={caseStudy}>{copy.viewCase}</Button> : null}
            <Button href={item.website} variant="line">
              {copy.visit} — {item.websiteLabel}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectFrame({
  src,
  alt,
  href,
  internal,
  cta,
}: {
  src: string;
  alt: string;
  href: string;
  internal: boolean;
  cta: string;
}) {
  const reduce = useReducedMotion();
  const img = useRef<HTMLImageElement>(null);

  function onMove(event: MouseEvent<HTMLElement>) {
    if (reduce || !img.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    img.current.style.transform = `scale(1.08) translate(${px * 18}px, ${py * 12}px)`;
  }

  function onLeave() {
    if (!img.current) return;
    img.current.style.transform = "scale(1) translate(0, 0)";
  }

  const visual = (
    <>
      <img
        ref={img}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-[48vh] w-full object-cover object-top transition-transform duration-700 ease-out will-change-transform md:h-[72vh]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/65 via-transparent to-night/20" />
      <div className="pointer-events-none absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-10">
        <span className="type-btn text-bone">{cta} →</span>
      </div>
    </>
  );

  const frameClass = "group relative mt-7 block overflow-hidden md:mt-10";
  const frameMotion = {
    initial: reduce ? false : { clipPath: "inset(14% 10% 14% 10%)" },
    whileInView: { clipPath: "inset(0% 0% 0% 0%)" },
    viewport: { once: true, amount: 0.28 },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  } as const;

  if (internal) {
    return (
      <motion.div className={frameClass} data-cursor {...frameMotion} onMouseMove={onMove} onMouseLeave={onLeave}>
        <Link to={href} className="block">
          {visual}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={frameClass}
      data-cursor
      {...frameMotion}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {visual}
    </motion.a>
  );
}
