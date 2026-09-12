import { useCallback, useMemo, useState, type ReactNode } from "react";
import { BookingModal } from "../components/BookingModal";
import { BookingContext, type BookingContextValue } from "./booking";

/**
 * Owns the open/closed state of the in-page Cal.com booking dialog.
 * Every "book a call" CTA calls `openBooking()` instead of leaving the site.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const openBooking = useCallback(() => setOpen(true), []);
  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo<BookingContextValue>(
    () => ({ isOpen, openBooking, closeBooking }),
    [isOpen, openBooking, closeBooking],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal open={isOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}
