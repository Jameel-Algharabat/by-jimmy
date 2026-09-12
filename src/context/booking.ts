import { createContext, useContext } from "react";

export type BookingContextValue = {
  isOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
};

export const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}
