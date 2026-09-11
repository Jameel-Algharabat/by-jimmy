import { useEffect, type ReactNode } from "react";
import { copy } from "../content/copy";

export function LanguageProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    window.localStorage.removeItem("altura-lang");
    window.localStorage.removeItem("by-pixel-lang");
    window.localStorage.removeItem("golding-lang");
  }, []);

  return children;
}

export function useLanguage() {
  return { t: copy };
}
