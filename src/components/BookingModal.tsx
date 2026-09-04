import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageProvider";
import { site } from "../content/site";
import { Button } from "./Button";

export function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const calendly = site.calendlyUrl.trim();
  const mail = `mailto:${site.email}?subject=${encodeURIComponent("Discovery call")}&body=${encodeURIComponent(
    "Hi — I would like to book a discovery call.\n\nName:\nCompany:\nWhat you need:\n",
  )}`;

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-void/80"
            aria-label={t.contact.bookClose}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-[560px] border border-line bg-night p-6 md:p-10"
            initial={reduce ? false : { y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 16, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="type-index text-ember">{t.contact.label}</p>
                <h3 id={titleId} className="type-h3 mt-3">
                  {t.contact.bookModalTitle}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="type-nav text-fog hover:text-bone"
                onClick={onClose}
              >
                {t.contact.bookClose}
              </button>
            </div>
            <p className="type-lead mt-5 max-w-[36ch] text-fog">{t.contact.bookModalLead}</p>

            {calendly ? (
              <iframe
                title={t.contact.bookModalTitle}
                src={`${calendly}${calendly.includes("?") ? "&" : "?"}hide_gdpr_banner=1&background_color=090807&text_color=ede8df&primary_color=c9ae8a`}
                className="mt-8 h-[min(62vh,540px)] w-full border border-line"
              />
            ) : (
              <div className="mt-8">
                <Button href={mail}>{t.contact.bookModalCta}</Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
