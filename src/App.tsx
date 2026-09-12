import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { Navigation } from "./components/Navigation";
import { ScrollManager } from "./components/ScrollManager";
import { ScrollProgress } from "./components/ScrollProgress";
import { BookingProvider } from "./context/BookingProvider";
import { useLanguage } from "./context/LanguageProvider";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

function SiteLayout() {
  const { t } = useLanguage();

  return (
    <BookingProvider>
      <ScrollProgress />
      <Loader />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {t.skip}
      </a>
      <Navigation />
      <Outlet />
      <Footer />
    </BookingProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
