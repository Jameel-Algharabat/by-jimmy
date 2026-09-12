import { useEffect } from "react";
import { About } from "../components/sections/About";
import { Capabilities } from "../components/sections/Capabilities";
import { Contact } from "../components/sections/Contact";
import { Hero } from "../components/sections/Hero";
import { Intelligence } from "../components/sections/Intelligence";
import { Intro } from "../components/sections/Intro";
import { Process } from "../components/sections/Process";
import { Testimonial } from "../components/sections/Testimonial";
import { Work } from "../components/sections/Work";
import { useLanguage } from "../context/LanguageProvider";

export function HomePage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;
    const set = (selector: string, value: string) => {
      document.querySelector(selector)?.setAttribute("content", value);
    };
    set('meta[name="description"]', t.meta.description);
    set('meta[property="og:title"]', t.meta.title);
    set('meta[property="og:description"]', t.meta.description);
    set('meta[name="twitter:title"]', t.meta.title);
    set('meta[name="twitter:description"]', t.meta.description);
  }, [t.meta.title, t.meta.description]);

  return (
    <main id="main">
      <Hero />
      <Intro />
      <Work />
      <Testimonial />
      <Capabilities />
      <Intelligence />
      <Process />
      <About />
      <Contact />
    </main>
  );
}
