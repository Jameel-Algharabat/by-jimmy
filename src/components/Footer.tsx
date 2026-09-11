import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageProvider";
import { site } from "../content/site";
import { RasmWordmark } from "./RasmWordmark";
import { Stroke } from "./Stroke";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { href: "/#work", label: t.nav.work },
    { href: "/#services", label: t.nav.services },
    { href: "/#about", label: t.nav.about },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-night">
      <div className="shell py-12 md:py-16">
        <Stroke className="mb-12 h-[2px] w-full" />
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Link to="/" className="type-hero whitespace-nowrap text-[10vw] leading-none md:text-[4.8vw]" dir="ltr">
            <RasmWordmark />
          </Link>
          <p className="type-lead max-w-[24ch] text-fog">{t.footer.line}</p>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            {links.map((link) => (
              <Link key={link.href} to={link.href} className="type-nav link-line text-fog hover:text-bone">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap items-center gap-6">
            <a href={`mailto:${site.email}`} className="type-nav link-line text-fog hover:text-bone">
              {t.footer.email}
            </a>
          </div>
        </div>

        <p className="type-index mt-10 text-fog/70">
          © {year} · {site.fullName}
        </p>
      </div>
    </footer>
  );
}
