import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Copy } from "../../content/copy";
import { useLanguage } from "../../context/LanguageProvider";
import { TextLink } from "../Button";
import { EASE } from "../../motion";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";

export function Work() {
  const { t } = useLanguage();
  const featured = t.work.featured;

  return (
    <section id="work" className="bg-paper pb-24 pt-8 md:pb-36" aria-label={t.work.label}>
      <div className="wrap">
        <SectionHead index={t.work.index} label={t.work.label} title={t.work.title} lead={t.work.lead} />

        <article className="mt-16 md:mt-24" aria-labelledby="featured-title">
          {/* Plate caption */}
          <Reveal className="flex items-baseline justify-between gap-6 border-b border-rule pb-4">
            <p className="t-label t-num text-ink">
              <span dir="ltr">{featured.n}</span>
              <span className="mx-3 text-mute" aria-hidden="true">
                /
              </span>
              <span dir="ltr">{featured.name}</span>
            </p>
            <p className="t-label text-mute">{featured.category}</p>
          </Reveal>

          <Plate featured={featured} viewLabel={t.work.viewProject} />

          <div className="grid-12 mt-10 gap-y-10 md:mt-14">
            <dl className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-4 md:grid-cols-1 lg:col-span-3">
              <Meta label={t.work.metaClient}>
                <span dir="ltr">{featured.name}</span>
              </Meta>
              <Meta label={t.work.metaCategory}>{featured.category}</Meta>
              <Meta label={t.work.metaScope} className="col-span-2 md:col-span-1">
                <ul className="flex flex-col gap-1.5">
                  {featured.badges.map((badge) => (
                    <li key={badge}>{badge}</li>
                  ))}
                </ul>
              </Meta>
            </dl>

            <div className="col-span-12 md:col-span-8 lg:col-span-7 lg:col-start-6">
              <Reveal>
                <h3 id="featured-title" className="t-h2 max-w-[22ch] text-ink rtl:max-w-[28ch]">
                  {featured.header}
                </h3>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="t-lead mt-6 max-w-[44ch] text-graphite">{featured.subheading}</p>
                <p className="t-body mt-5 max-w-[60ch] text-mute">{featured.story}</p>
              </Reveal>
              <Reveal delay={0.14} className="mt-8">
                <TextLink href={featured.website} ariaLabel={`${t.work.viewProject} — ${featured.websiteLabel}`}>
                  {t.work.viewProject}
                  <span className="text-mute" dir="ltr">
                    {" "}
                    · {featured.websiteLabel}
                  </span>
                </TextLink>
              </Reveal>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Meta({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <Reveal className={className}>
      <dt className="t-label text-mute">{label}</dt>
      <dd className="t-small mt-2 text-ink">{children}</dd>
    </Reveal>
  );
}

function Plate({ featured, viewLabel }: { featured: Copy["work"]["featured"]; viewLabel: string }) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  return (
    <motion.a
      href={featured.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${viewLabel} — ${featured.name}`}
      className="group mt-6 block"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE }}
      onViewportEnter={() => setReady(true)}
    >
      <div className="media aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/10]">
        {ready ? (
          <video
            poster={featured.poster}
            autoPlay={!reduce}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={featured.video} type="video/mp4" />
          </video>
        ) : (
          <img src={featured.poster} alt={featured.videoAlt} loading="lazy" decoding="async" />
        )}
      </div>
    </motion.a>
  );
}
