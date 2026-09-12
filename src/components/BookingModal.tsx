import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageProvider";
import { site } from "../content/site";
import { EASE } from "../motion";
import { Spinner } from "./Spinner";

const CalEmbed = lazy(() => import("./CalEmbed"));

/** "https://cal.com/user/30min" → "user/30min" */
const CAL_LINK = site.bookingUrl.replace(/^https?:\/\/(www\.)?cal\.com\//, "");

/** Counts dialog opens; used to mint a fresh Cal namespace per session. */
let sessions = 0;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function BookingModal({ open, onClose }: Props) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Lock the page exactly where it is; restore that position on close.
  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    const body = document.body;
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      Object.assign(body.style, prev);
      const behavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, y);
      html.style.scrollBehavior = behavior;
    };
  }, [open]);

  // Focus management: move focus into the dialog, return it to the trigger afterwards.
  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const id = window.requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(id);
      returnFocusRef.current?.focus?.();
    };
  }, [open]);

  // Escape closes; Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80]" role="presentation">
          <motion.button
            type="button"
            className="absolute inset-0 h-full w-full bg-ink/45 backdrop-blur-[3px]"
            aria-label={t.nav.close}
            tabIndex={-1}
            onClick={onClose}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />

          <div className="pointer-events-none absolute inset-0 flex items-end justify-center sm:items-center sm:p-6 lg:p-10">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-title"
              className="pointer-events-auto relative flex h-dvh w-full flex-col overflow-hidden bg-white sm:h-[min(800px,calc(100dvh-48px))] sm:max-w-[1120px] sm:rounded-[20px] sm:border sm:border-rule sm:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.35)] lg:h-[min(800px,calc(100dvh-80px))]"
              initial={reduce ? false : { opacity: 0, y: 28, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 20, scale: 0.985 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <header className="flex items-start justify-between gap-6 border-b border-rule px-5 pt-[max(16px,env(safe-area-inset-top))] pb-4 md:px-7 md:pt-6 md:pb-5">
                <div className="min-w-0">
                  <p className="t-label flex items-center gap-3 text-mute">
                    <span className="size-1.5 bg-ink" aria-hidden="true" />
                    {t.booking.label}
                  </p>
                  <h2 id="booking-title" className="t-h3 mt-3 text-ink">
                    {t.booking.title}
                  </h2>
                  <p className="t-small mt-1 hidden text-mute sm:block">{t.booking.hint}</p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label={t.nav.close}
                  className="group -me-2 -mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-200 hover:border-ink focus-visible:border-ink focus-visible:outline-none"
                >
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" />
                  </svg>
                </button>
              </header>

              <Scheduler />
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * The embedded Cal.com booker plus a loading state.
 * Mounted only while the dialog is open, so `ready` resets naturally on every open.
 */
function Scheduler() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  // A Cal namespace binds to one iframe for its lifetime, so each mount gets its own.
  const [namespace, setNamespace] = useState(() => `artbox-${++sessions}`);
  const onReady = useCallback(() => setStatus("ready"), []);
  const onFail = useCallback(() => setStatus("failed"), []);
  const retry = () => {
    setStatus("loading");
    setNamespace(`artbox-${++sessions}`);
  };

  return (
    <div className="relative min-h-0 flex-1 bg-white">
      {status !== "failed" ? (
        <Suspense fallback={null}>
          <CalEmbed key={namespace} calLink={CAL_LINK} namespace={namespace} onReady={onReady} onFail={onFail} />
        </Suspense>
      ) : null}

      <AnimatePresence>
        {status !== "ready" ? (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-white px-6 text-center"
            initial={false}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            aria-live="polite"
          >
            {status === "loading" ? (
              <>
                <Spinner className="size-8 text-ink" />
                <span className="sr-only">{t.booking.loading}</span>
              </>
            ) : (
              <>
                <p className="t-body max-w-[32ch] text-graphite">{t.booking.failed}</p>
                <button type="button" onClick={retry} className="btn btn-secondary">
                  <span>{t.booking.retry}</span>
                </button>
              </>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
