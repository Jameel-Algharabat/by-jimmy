import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

/** Cal.com brand tokens mapped to the site's monochrome palette. */
const CAL_VARS = {
  "cal-brand": "#000000",
  "cal-brand-emphasis": "#171717",
  "cal-brand-text": "#F7F7F5",
  "cal-brand-accent": "#F7F7F5",
  "cal-bg": "#FFFFFF",
  "cal-bg-emphasis": "#F7F7F5",
  "cal-bg-subtle": "#F7F7F5",
  "cal-bg-muted": "#F7F7F5",
  "cal-border": "#E1E1DE",
  "cal-border-subtle": "#E8E8E5",
  "cal-border-emphasis": "#171717",
  "cal-text": "#000000",
  "cal-text-emphasis": "#000000",
  "cal-text-subtle": "#777777",
  "cal-text-muted": "#777777",
  "cal-border-booker": "#E1E1DE",
  "cal-border-booker-width": "0px",
};

/** If Cal.com hasn't reported the booker ready by then, surface a retry instead of an endless spinner. */
const TIMEOUT_MS = 20_000;

type Props = {
  /** Cal.com path after the domain, e.g. "user/30min". */
  calLink: string;
  /**
   * Cal embed namespace. A Cal instance binds to a single iframe, so callers pass a
   * fresh namespace each time the booker is mounted (e.g. every time the dialog opens).
   */
  namespace: string;
  /** Fired once the embedded booking page has rendered. */
  onReady?: () => void;
  /** Fired if Cal.com reports a failure or never becomes ready. */
  onFail?: () => void;
};

export default function CalEmbed({ calLink, namespace: NS, onReady, onFail }: Props) {
  useEffect(() => {
    let active = true;
    let settled = false;
    const timer = window.setTimeout(() => {
      if (active && !settled) onFail?.();
    }, TIMEOUT_MS);

    const handleReady = () => {
      if (!active || settled) return;
      settled = true;
      window.clearTimeout(timer);
      onReady?.();
    };
    const handleFail = () => {
      if (!active || settled) return;
      settled = true;
      window.clearTimeout(timer);
      onFail?.();
    };

    void getCalApi({ namespace: NS }).then((cal) => {
      if (!active) return;
      cal("ui", {
        theme: "light",
        layout: "month_view",
        hideEventTypeDetails: false,
        cssVarsPerTheme: { light: CAL_VARS, dark: CAL_VARS },
      });
      cal("on", { action: "linkReady", callback: handleReady });
      cal("on", { action: "linkFailed", callback: handleFail });
    });

    return () => {
      active = false;
      window.clearTimeout(timer);
      void getCalApi({ namespace: NS }).then((cal) => {
        cal("off", { action: "linkReady", callback: handleReady });
        cal("off", { action: "linkFailed", callback: handleFail });
      });
    };
  }, [NS, onReady, onFail]);

  return (
    <Cal
      namespace={NS}
      calLink={calLink}
      config={{ layout: "month_view", theme: "light" }}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    />
  );
}
