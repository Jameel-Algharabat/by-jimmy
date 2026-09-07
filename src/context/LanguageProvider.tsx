import { useEffect, type ReactNode } from "react";
import { copy } from "../content/copy";
import { site } from "../content/site";

export function LanguageProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    document.title = site.title;
    window.localStorage.removeItem("altura-lang");
    window.localStorage.removeItem("by-pixel-lang");
  }, []);

  return children;
}

export function useLanguage() {
  return { t: copy };
}
