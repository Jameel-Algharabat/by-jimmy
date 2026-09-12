import { useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { ClipReveal, Reveal } from "../Reveal";

export function Testimonial() {
  const { t } = useLanguage();
  const q = t.testimonial;

  return (
    <section className="bg-paper pb-24 md:pb-36" aria-label={q.label}>
      <div className="wrap">
        <div className="grid-12 border-t border-rule pt-6 md:pt-8">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="t-label text-mute">{q.label}</p>
          </Reveal>

          <figure className="col-span-12 mt-8 md:col-span-9 md:mt-0 lg:col-span-8">
            <blockquote>
              <ClipReveal>
                <p className="t-quote max-w-[34ch] text-ink rtl:max-w-[40ch]">
                  <span aria-hidden="true">“</span>
                  {q.quote}
                  <span aria-hidden="true">”</span>
                </p>
              </ClipReveal>
            </blockquote>

            <Reveal delay={0.12}>
              <figcaption className="mt-10 flex items-center gap-4 md:mt-12">
                <Photo src={q.photo} name={q.name} initials={q.initials} />
                <div className="min-w-0">
                  <p className="t-body font-medium leading-tight text-ink">{q.name}</p>
                  <p className="t-small mt-1 text-mute">{q.role}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <a href={q.linkedIn} target="_blank" rel="noopener noreferrer" className="t-caption u-line text-ink">
                      {q.linkedInLabel}
                    </a>
                    <a href={`mailto:${q.email}`} className="t-caption u-line text-ink">
                      {q.emailLabel}
                    </a>
                  </p>
                </div>
              </figcaption>
            </Reveal>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Photo({ src, name, initials }: { src?: string; name: string; initials: string }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className="size-16 shrink-0 overflow-hidden rounded-full bg-mist md:size-[4.5rem]">
      {showImage ? (
        <img
          src={src}
          alt={name}
          width={72}
          height={72}
          className="size-full object-cover object-center"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex size-full items-center justify-center t-caption font-medium text-mute" aria-hidden="true">
          {initials}
        </div>
      )}
    </div>
  );
}
