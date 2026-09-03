import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Copy } from "../content/copy";
import { useLanguage } from "../context/LanguageProvider";
import { Button } from "../components/Button";
import { ClipReveal, Reveal } from "../components/Reveal";
import { SiteStill } from "../components/SiteStill";

export function GharabatCaseStudy() {
  const { t, lang } = useLanguage();
  const item = t.work.items.find((entry) => entry.id === "gharabat");
  const sections = t.work.gharabatSections;

  useEffect(() => {
    document.title = "Gharabat.site — BY JIMMY";
    return () => {
      document.title = "BY JIMMY — Web Designer & Web Developer";
    };
  }, [lang]);

  if (!item || item.id !== "gharabat") return null;

  const [overview, concept, design, development, result] = sections;

  return (
    <main id="main" className="bg-night pt-20">
      <header className="shell py-16 md:py-24">
        <Reveal>
          <Link to="/#work" className="type-nav link-line text-fog hover:text-bone">
            {t.work.backToWork}
          </Link>
          <p className="type-index mt-12 text-ember">01 — {item.category}</p>
        </Reveal>
        <ClipReveal delay={0.06}>
          <h1 className="type-display mt-5">{item.title}</h1>
        </ClipReveal>
        <Reveal delay={0.1}>
          <p className="type-lead mt-8 max-w-[40ch] text-fog">{item.summary}</p>
          <dl className="mt-10 grid max-w-[720px] grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <dt className="type-meta text-fog">{t.work.metaRole}</dt>
              <dd className="mt-2 type-meta text-bone">{item.role}</dd>
            </div>
            <div>
              <dt className="type-meta text-fog">{t.work.metaType}</dt>
              <dd className="mt-2 type-meta text-bone">{item.type}</dd>
            </div>
            <div>
              <dt className="type-meta text-fog">{t.work.metaContribution}</dt>
              <dd className="mt-2 type-meta text-bone">{item.contributionMeta}</dd>
            </div>
          </dl>
          <div className="mt-10">
            <Button href={item.website}>
              {t.work.visit} — {item.websiteLabel}
            </Button>
          </div>
        </Reveal>
      </header>

      <Reveal>
        <div className="overflow-hidden">
          <SiteStill src="/work/gharabat-hero.png" alt="Gharabat.site landing page." caption="Gharabat.site" />
        </div>
      </Reveal>

      <CaseBlock section={overview} />
      <CaseBlock section={concept} />
      <CaseBlock section={design}>
        <div className="mt-12 space-y-8">
          <SiteStill src="/work/gharabat-about.png" alt="Gharabat.site — story section." caption="Story" />
          <SiteStill src="/work/gharabat-work.png" alt="Gharabat.site — expertise section." caption="The site in use" />
        </div>
      </CaseBlock>
      <CaseBlock section={development}>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <SiteStill
              src="/work/gharabat-mobile.png"
              alt="Gharabat.site on a small screen."
              ratio="mobile"
              caption="Small screen"
            />
          </div>
          <div className="md:col-span-8">
            <SiteStill src="/work/gharabat-contact.png" alt="Gharabat.site — contact." caption="Contact" />
          </div>
        </div>
      </CaseBlock>
      <CaseBlock section={result}>
        <div className="mt-12">
          <SiteStill
            src="/work/gharabat-full.png"
            alt="Gharabat.site — full page."
            ratio="page"
            caption="The complete website"
          />
        </div>
        <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Button href={item.website}>
            {t.work.visit} — {item.websiteLabel}
          </Button>
          <Button href="/#work" variant="line">
            {t.work.backToWork}
          </Button>
        </div>
      </CaseBlock>
    </main>
  );
}

function CaseBlock({
  section,
  children,
}: {
  section: Copy["work"]["gharabatSections"][number];
  children?: ReactNode;
}) {
  return (
    <section className="border-t border-line">
      <div className="shell py-16 md:py-24">
        <Reveal>
          <p className="type-index text-ember">
            {section.index} — {section.label}
          </p>
          <h2 className="type-h2 mt-5 max-w-[16ch]">{section.title}</h2>
          <p className="mt-6 max-w-[640px] text-fog">{section.body}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
