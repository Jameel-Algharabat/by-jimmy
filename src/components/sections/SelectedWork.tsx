import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Copy } from "../../content/copy";
import { useLanguage } from "../../context/LanguageProvider";
import { Button } from "../Button";
import { ClipReveal, Reveal } from "../Reveal";

export function SelectedWork() {
  const { t } = useLanguage();
  const featured = t.work.featured;
  const quote = t.work.testimonial;

  return (
    <section id="work" className="bg-night pb-8 pt-24 md:pt-36">
      <div className="shell mb-14 md:mb-20">
        <Reveal>
          <p className="type-index text-gold">
            {t.work.index} — {t.work.label}
          </p>
          <h2 className="type-display mt-5 max-w-[20ch] whitespace-pre-line">{t.work.title}</h2>
          <p className="type-lead mt-6 max-w-[38ch] text-fog">{t.work.lead}</p>
        </Reveal>
      </div>

      <article>
        <DeviceShowcase featured={featured} visit={t.work.visit} />

        <div className="shell mt-14 grid grid-cols-1 gap-10 pb-4 md:mt-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
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
              <ul className="mt-8 flex flex-wrap gap-2">
                {featured.badges.map((badge) => (
                  <li
                    key={badge}
                    className="type-meta rounded-full border border-line bg-ash/80 px-4 py-2 text-fog"
                  >
                    {badge}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button href={featured.website}>
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

function DeviceShowcase({
  featured,
  visit,
}: {
  featured: Copy["work"]["featured"];
  visit: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="shell">
      <motion.a
        href={featured.website}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor
        aria-label={featured.videoAlt}
        className="group mx-auto block max-w-4xl"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="rounded-2xl bg-gradient-to-br from-bone/30 via-line to-gold/50 p-px shadow-2xl shadow-black/50 transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.012]">
          <div className="overflow-hidden rounded-[15px] bg-void ring-1 ring-bone/5">
            <div className="flex items-center gap-3 border-b border-white/5 px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-2 rounded-full bg-[#3A3733]" />
                <span className="size-2 rounded-full bg-[#3A3733]" />
                <span className="size-2 rounded-full bg-gold/70" />
              </span>
              <span className="min-w-0 flex-1 truncate rounded-full bg-ash px-3 py-1 text-center type-meta text-fog">
                {featured.websiteLabel}
              </span>
              <span className="hidden type-meta text-fog/60 sm:inline">{visit} →</span>
            </div>
            <div className="relative aspect-video overflow-hidden bg-ash">
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
          </div>
        </div>
      </motion.a>
    </div>
  );
}

function FounderReference({ quote }: { quote: Copy["work"]["testimonial"] }) {
  return (
    <div className="mt-20 border-t border-line md:mt-28">
      <div className="shell py-16 md:py-24">
        <Reveal>
          <article className="mx-auto max-w-3xl rounded-2xl border border-bone/10 bg-neutral-900/50 p-7 shadow-2xl shadow-black/30 backdrop-blur-md md:p-10">
            <blockquote>
              <p className="type-h3 text-pretty text-bone">“{quote.quote}”</p>
            </blockquote>

            <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-7">
              <FounderPhoto src={quote.photo} name={quote.name} initials={quote.initials} />
              <div>
                <p className="font-display text-lg font-semibold tracking-tight text-bone">{quote.name}</p>
                <p className="type-meta mt-1 text-fog">{quote.role}</p>
              </div>
            </div>

            <div className="mt-7">
              <p className="type-meta text-gold">{quote.contact}</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <ContactAction href={quote.linkedIn} label={quote.linkedInLabel} icon="linkedin" />
                <ContactAction href={`mailto:${quote.email}`} label={quote.emailLabel} icon="email" />
              </div>
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
    <div className="rounded-full bg-gradient-to-br from-gold to-bone/40 p-[2px]">
      <div className="size-16 overflow-hidden rounded-full bg-night md:size-[4.5rem]">
        {showImage ? (
          <img
            src={src}
            alt={name}
            width={72}
            height={72}
            className="size-full object-cover object-center"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex size-full items-center justify-center type-meta text-bone" aria-hidden="true">
            {initials}
          </div>
        )}
      </div>
    </div>
  );
}

function ContactAction({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: "linkedin" | "email";
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-bone/10 bg-night/70 px-5 py-3.5 text-bone transition-all duration-300 hover:border-gold/70 hover:bg-gold/10 hover:shadow-[0_0_24px_-6px_rgba(197,164,106,0.45)]"
    >
      {icon === "linkedin" ? <LinkedInIcon /> : <MailIcon />}
      <span className="type-btn">{label}</span>
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
