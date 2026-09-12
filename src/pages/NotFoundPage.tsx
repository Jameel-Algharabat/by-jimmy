import { useEffect } from "react";
import { Button } from "../components/Button";
import { Lines, Reveal } from "../components/Reveal";
import { useLanguage } from "../context/LanguageProvider";

export function NotFoundPage() {
  const { t } = useLanguage();

  useEffect(() => {
    const previous = document.title;
    document.title = t.notFound.documentTitle;
    return () => {
      document.title = previous || t.notFound.documentTitle;
    };
  }, [t.notFound.documentTitle]);

  return (
    <main id="main" className="flex min-h-svh flex-col justify-center bg-paper pb-24 pt-[calc(var(--header-h)+40px)]">
      <div className="wrap">
        <div className="grid-12 border-t border-rule pt-6 md:pt-8">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="t-label t-num text-mute">{t.notFound.label}</p>
          </Reveal>
          <div className="col-span-12 mt-8 md:col-span-9 md:mt-0">
            <h1>
              <Lines text={t.notFound.title} className="t-display block max-w-[12ch] text-ink rtl:max-w-[16ch]" />
            </h1>
            <Reveal delay={0.14}>
              <p className="t-lead mt-8 max-w-[40ch] text-mute">{t.notFound.lead}</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <Button href="/" arrow>
                {t.notFound.home}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
