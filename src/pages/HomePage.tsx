import { useEffect } from "react";
import { About } from "../components/sections/About";
import { Hero } from "../components/sections/Hero";
import { Process } from "../components/sections/Process";
import { SelectedWork } from "../components/sections/SelectedWork";
import { Services } from "../components/sections/Services";
import { StartProject } from "../components/sections/StartProject";
import { Why } from "../components/sections/Why";
import { useLanguage } from "../context/LanguageProvider";

export function HomePage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t.meta.description);
  }, [t.meta.title, t.meta.description]);

  return (
    <main id="main">
      <Hero />
      <SelectedWork />
      <Services />
      <About />
      <Process />
      <Why />
      <StartProject />
    </main>
  );
}
