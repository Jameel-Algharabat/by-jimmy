import { useLanguage } from "../context/LanguageProvider";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="type-lang flex items-center gap-2" role="group" aria-label="Language">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={lang === "en" ? "text-bone" : "text-fog hover:text-bone"}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <span className="text-line" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => setLang("ar")}
        className={lang === "ar" ? "text-bone" : "text-fog hover:text-bone"}
        aria-pressed={lang === "ar"}
      >
        AR
      </button>
    </div>
  );
}
