import { useEffect } from "react";
import { About } from "../components/sections/About";
import { Hero } from "../components/sections/Hero";
import { Process } from "../components/sections/Process";
import { SelectedWork } from "../components/sections/SelectedWork";
import { Services } from "../components/sections/Services";
import { StartProject } from "../components/sections/StartProject";
import { Why } from "../components/sections/Why";
import { site } from "../content/site";

export function HomePage() {
  useEffect(() => {
    document.title = site.title;
  }, []);

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
