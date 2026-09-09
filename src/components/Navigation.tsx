import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageProvider";
import { site } from "../content/site";

const NAV_IDS = ["work", "services", "about", "contact"] as const;

export function Navigation() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = NAV_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.6] },
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
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          open ? "bg-void" : scrolled ? "bg-night/85 backdrop-blur-md" : ""
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between lg:h-20">
          <Link to="/" className="type-logo link-line text-bone" dir="ltr" onClick={() => setOpen(false)}>
            {site.name}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <NavAnchor
                key={link.id}
                id={link.id}
                pathname={pathname}
                className={`type-nav link-line ${isActive(link.id) ? "text-bone" : "text-bone/70"}`}
                dataActive={isActive(link.id)}
              >
                {link.label}
              </NavAnchor>
            ))}
          </nav>

          <button
            type="button"
            className="type-nav text-bone lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-40 bg-void lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="shell flex h-dvh flex-col justify-between py-28">
              <nav className="flex flex-col" aria-label="Mobile">
                {links.map((link, i) => (
                  <motion.div
                    key={link.id}
                    className="overflow-hidden"
                    initial={reduce ? false : { y: 48, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavAnchor
                      id={link.id}
                      pathname={pathname}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between gap-6 border-b border-line py-4"
                    >
                      <span
                        className={`font-display text-[11.5vw] font-bold leading-[0.85] tracking-[-0.05em] ${
                          isActive(link.id) ? "text-gold" : "text-bone"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span className="type-index text-fog">{link.n}</span>
                    </NavAnchor>
                  </motion.div>
                ))}
              </nav>
              <div className="flex items-center justify-between gap-6">
                <a href={`mailto:${site.email}`} className="type-nav text-fog">
                  {site.email}
                </a>
                <p className="type-meta text-fog" dir="ltr">
                  {site.name}
                </p>
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
