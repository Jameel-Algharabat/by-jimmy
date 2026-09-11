import { useLanguage } from "../context/LanguageProvider";

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className={`flex items-center gap-2 ${className}`} role="group" aria-label={t.language.label}>
      <button
        type="button"
        className={`type-nav transition-colors duration-300 ${lang === "en" ? "text-bone" : "text-fog hover:text-bone"}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        {t.language.en}
      </button>
      <span className="text-line" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`text-[12px] font-medium transition-colors duration-300 ${
          lang === "ar" ? "text-bone" : "text-fog hover:text-bone"
        }`}
        aria-pressed={lang === "ar"}
        dir="rtl"
        onClick={() => setLang("ar")}
      >
        {t.language.ar}
      </button>
    </div>
  );
}
