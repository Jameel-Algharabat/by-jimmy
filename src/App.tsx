import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Cursor } from "./components/Cursor";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { ScrollManager } from "./components/ScrollManager";
import { ScrollProgress } from "./components/ScrollProgress";
import { useLanguage } from "./context/LanguageProvider";
import { HomePage } from "./pages/HomePage";

function SiteLayout() {
  const { t } = useLanguage();

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-5 focus:top-5 focus:z-[90] focus:bg-bone focus:px-4 focus:py-2 focus:text-night"
      >
        {t.skip}
      </a>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
