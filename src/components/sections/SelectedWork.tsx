import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Copy } from "../../content/copy";
import { useLanguage } from "../../context/LanguageProvider";
import { Button } from "../Button";
import { ClipReveal, Reveal } from "../Reveal";
import { Stroke } from "../Stroke";

export function SelectedWork() {
  const { t } = useLanguage();
  const featured = t.work.featured;
  const quote = t.work.testimonial;

  return (
    <section id="work" className="bg-night pb-8 pt-24 md:pt-36">
      <div className="shell mb-10 md:mb-16">
        <Reveal>
          <p className="type-index text-gold">
            {t.work.index} — {t.work.label}
          </p>
          <h2 className="type-display mt-5 max-w-[20ch] whitespace-pre-line rtl:max-w-[26ch]">{t.work.title}</h2>
          <p className="type-lead mt-6 max-w-[38ch] text-fog">{t.work.lead}</p>
        </Reveal>
        <Stroke className="mt-10 h-[2px] w-full md:w-2/3" delay={0.1} />
      </div>

      <article>
        <Exhibition featured={featured} />

        <div className="shell mt-8 pb-4 md:mt-10">
          <div className="surface px-6 py-8 md:px-10 md:py-12">
            <ClipReveal>
              <p className="type-index text-gold">{featured.category}</p>
            </ClipReveal>
            <ClipReveal delay={0.06}>
              <h3 className="type-h2 mt-4 max-w-[22ch] text-bone">{featured.header}</h3>
            </ClipReveal>
            <Reveal delay={0.08}>
              <p className="type-lead mt-5 max-w-[46ch] text-fog">{featured.subheading}</p>
              <p className="mt-6 max-w-[58ch] text-pretty text-bone/80">
                <EmphasizeBrand text={featured.story} brand={featured.name} />
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                {featured.badges.map((badge) => (
                  <li key={badge} className="type-meta text-fog">
                    {badge}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button href={featured.website} variant="ghost">
                  {t.work.visit} — {featured.websiteLabel}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      <FounderReference quote={quote} />
    </section>
  );
}

function EmphasizeBrand({ text, brand }: { text: string; brand: string }) {
  const index = text.indexOf(brand);
  if (index < 0) return text;

  return (
    <>
      {text.slice(0, index)}
      <strong className="font-medium text-bone">{brand}</strong>
      {text.slice(index + brand.length)}
    </>
  );
}

function Exhibition({ featured }: { featured: Copy["work"]["featured"] }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(reduce ?? false);

  return (
    <div className="shell">
      <motion.a
        href={featured.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={featured.videoAlt}
        className="group relative block"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        onViewportEnter={() => setOpen(true)}
      >
        <div className="surface-soft">
          <div className="relative overflow-hidden rounded-[inherit]">
            <div className={`mask-reveal aspect-[16/10] md:aspect-[21/10] ${open ? "is-open" : ""}`}>
              <video
                className="h-full w-full object-cover"
                poster={featured.poster}
                autoPlay={!reduce}
                muted
                loop
                playsInline
                preload={reduce ? "none" : "metadata"}
                aria-hidden="true"
              >
                <source src={featured.video} type="video/mp4" />
              </video>
            </div>
            <span className="pointer-events-none absolute inset-x-6 bottom-6 type-index text-night md:inset-x-10 md:bottom-8">
              {featured.name}
            </span>
          </div>
        </div>
      </motion.a>
    </div>
  );
}

function FounderReference({ quote }: { quote: Copy["work"]["testimonial"] }) {
  return (
    <div className="mt-8 md:mt-10">
      <div className="shell">
        <Reveal>
          <article className="surface px-5 py-5 md:px-8 md:py-6">
            <blockquote className="max-w-[62ch] rtl:max-w-[54ch]">
              <p className="font-display text-[clamp(20px,2.1vw,28px)] font-normal italic leading-[1.45] tracking-[-0.025em] text-pretty text-bone rtl:not-italic rtl:leading-[1.7] rtl:tracking-normal">
                {quote.quote}
              </p>
            </blockquote>

            <div className="mt-5 flex items-center gap-3.5">
              <FounderPhoto src={quote.photo} name={quote.name} initials={quote.initials} />
              <div className="min-w-0 leading-tight">
                <p className="text-[15px] font-semibold tracking-[-0.01em] text-bone rtl:tracking-normal">
                  {quote.name}
                </p>
                <p className="mt-1 text-[12px] font-normal text-fog">{quote.role}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
              <span className="type-index text-fog">{quote.contact}</span>
              <ContactAction href={quote.linkedIn} label={quote.linkedInLabel} />
              <ContactAction href={`mailto:${quote.email}`} label={quote.emailLabel} />
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  );
}

function FounderPhoto({ src, name, initials }: { src?: string; name: string; initials: string }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className="size-12 shrink-0 overflow-hidden rounded-full border border-line bg-void md:size-[3.25rem]">
      {showImage ? (
        <img
          src={src}
          alt={name}
          width={52}
          height={52}
          className="size-full object-cover object-center"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex size-full items-center justify-center text-[10px] font-medium text-fog" aria-hidden="true">
          {initials}
        </div>
      )}
    </div>
  );
}

function ContactAction({ href, label }: { href: string; label: string }) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="type-nav link-line text-bone"
    >
      {label}
    </a>
  );
}
