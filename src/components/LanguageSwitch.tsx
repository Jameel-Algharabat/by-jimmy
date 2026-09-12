import { useLanguage } from "../context/LanguageProvider";

export function LanguageSwitch({ className = "", inverse = false }: { className?: string; inverse?: boolean }) {
  const { lang, setLang, t } = useLanguage();
  const on = inverse ? "text-paper" : "text-ink";
  const off = inverse ? "text-paper/50 hover:text-paper" : "text-mute hover:text-ink";
  const sep = inverse ? "bg-paper/25" : "bg-rule";

  return (
    <div className={`flex items-center gap-3 ${className}`} role="group" aria-label={t.language.label}>
      <button
        type="button"
        className={`t-nav transition-colors duration-200 ${lang === "en" ? on : off}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        dir="ltr"
      >
        {t.language.en}
      </button>
      <span className={`h-3 w-px ${sep}`} aria-hidden="true" />
      <button
        type="button"
        className={`text-[14px] font-medium transition-colors duration-200 ${lang === "ar" ? on : off}`}
        aria-pressed={lang === "ar"}
        onClick={() => setLang("ar")}
        dir="rtl"
        lang="ar"
      >
        {t.language.ar}
      </button>
    </div>
  );
}
