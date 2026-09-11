import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageProvider";
import { site } from "../content/site";
import { LanguageSwitch } from "./LanguageSwitch";
import { Wordmark } from "./Wordmark";

const NAV_IDS = ["work", "services", "about", "contact"] as const;

export function Navigation() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = NAV_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!nodes.length) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const next = NAV_IDS.find((id) => visible.has(id)) ?? null;
        setActive(next);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onHome = pathname === "/";

  const links = [
    { id: "work", label: t.nav.work, n: "01" },
    { id: "services", label: t.nav.services, n: "02" },
    { id: "about", label: t.nav.about, n: "03" },
    { id: "contact", label: t.nav.contact, n: "04" },
  ];

  function isActive(id: string) {
    return onHome && active === id;
  }

  return (
    <>
      <aside className="fixed inset-y-0 start-0 z-50 hidden w-[12rem] flex-col border-e border-line bg-night px-7 py-8 lg:flex">
        <Link to="/" className="type-logo link-line w-fit text-bone" dir="ltr">
          <Wordmark />
        </Link>

        <nav className="mt-20 flex flex-1 flex-col justify-center gap-8" aria-label="Primary">
          {links.map((link) => (
            <NavAnchor
              key={link.id}
              id={link.id}
              pathname={pathname}
              className={`group type-nav relative w-fit ps-4 transition-colors duration-500 ${
                isActive(link.id) ? "text-bone" : "text-fog hover:text-bone"
              }`}
              dataActive={isActive(link.id)}
            >
              <span
                className={`absolute start-0 top-1/2 h-px w-2.5 -translate-y-1/2 origin-start bg-bone transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive(link.id) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
              {link.label}
            </NavAnchor>
          ))}
        </nav>

        <div className="flex flex-col gap-5">
          <LanguageSwitch />
          <a
            href={`mailto:${site.email}`}
            className="w-fit max-w-full break-all text-[11px] font-medium tracking-[0.04em] text-fog transition-colors duration-300 hover:text-bone"
            dir="ltr"
          >
            {site.email}
          </a>
        </div>
      </aside>

      <header
        className={`fixed inset-x-0 top-0 z-50 lg:hidden transition-[background-color,backdrop-filter] duration-500 ${
          open ? "bg-night" : scrolled ? "bg-night/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className={`shell flex items-center justify-between gap-4 ${scrolled && !open ? "h-14" : "h-16"}`}>
          <Link to="/" className="type-logo link-line" dir="ltr" onClick={() => setOpen(false)}>
            <Wordmark />
          </Link>
          <div className="flex items-center gap-5">
            <LanguageSwitch />
            <button
              type="button"
              className="type-nav text-bone"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <span
            className={`block h-px origin-start bg-line transition-transform duration-700 ${
              scrolled || open ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-40 bg-night lg:hidden"
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? undefined : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shell relative flex h-dvh flex-col justify-between py-28">
              <nav className="flex flex-col" aria-label="Mobile">
                {links.map((link, i) => (
                  <motion.div
                    key={link.id}
                    className="overflow-hidden"
                    initial={reduce ? false : { y: 36, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavAnchor
                      id={link.id}
                      pathname={pathname}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                    >
                      <span
                        className={`font-display text-[11vw] italic leading-[0.95] tracking-[-0.03em] rtl:not-italic rtl:tracking-normal ${
                          isActive(link.id) ? "text-bone" : "text-fog"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span className="type-index text-fog">{link.n}</span>
                    </NavAnchor>
                  </motion.div>
                ))}
              </nav>
              <div className="flex flex-col gap-5">
                <LanguageSwitch />
                <a href={`mailto:${site.email}`} className="type-nav text-fog" dir="ltr">
                  {site.email}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function NavAnchor({
  id,
  pathname,
  children,
  className,
  onClick,
  dataActive,
}: {
  id: string;
  pathname: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  dataActive?: boolean;
}) {
  const props = {
    className,
    onClick,
    "data-active": dataActive ? "true" : undefined,
    "aria-current": dataActive ? ("true" as const) : undefined,
  };

  if (pathname === "/") {
    return (
      <a href={`#${id}`} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={`/#${id}`} {...props}>
      {children}
    </Link>
  );
}
