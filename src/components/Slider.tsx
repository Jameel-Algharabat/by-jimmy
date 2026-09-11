import {
  Children,
  useCallback,
  useId,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageProvider";

type SliderProps = {
  children: ReactNode;
  label: string;
};

export function Slider({ children, label }: SliderProps) {
  const reduce = useReducedMotion();
  const { t, dir } = useLanguage();
  const rtl = dir === "rtl";
  const id = useId();
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);
  const slides = Children.toArray(children);
  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      if (!count) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging.current = true;
    startX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    const delta = event.clientX - startX.current;
    if (Math.abs(delta) > 48) go(index + (delta < 0 ? 1 : -1));
  }

  if (!count) return null;

  return (
    <div className="relative" aria-roledescription="carousel" aria-label={label}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="type-index text-fog">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <SliderButton label={t.slider.prev} onClick={() => go(index - 1)}>
            {rtl ? "→" : "←"}
          </SliderButton>
          <SliderButton label={t.slider.next} onClick={() => go(index + 1)}>
            {rtl ? "←" : "→"}
          </SliderButton>
        </div>
      </div>

      <div
        className="overflow-hidden px-2 py-4 touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            go(index + (rtl ? -1 : 1));
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(index + (rtl ? 1 : -1));
          }
        }}
        tabIndex={0}
        role="group"
        aria-labelledby={id}
      >
        <span id={id} className="sr-only">
          {label}
        </span>
        <div
          className="flex"
          dir="ltr"
          style={{
            transform: `translate3d(-${index * 100}%, 0, 0)`,
            transition: reduce ? "none" : "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {slides.map((child, i) => (
            <div
              key={i}
              className="w-full shrink-0 select-none px-1"
              dir={dir}
              aria-hidden={i !== index}
              aria-roledescription="slide"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${t.slider.goto} ${i + 1}`}
            className={`h-px transition-all duration-500 ${i === index ? "w-8 bg-bone" : "w-3 bg-line hover:bg-fog"}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

function SliderButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-xl border border-line bg-white text-bone transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-night"
    >
      {children}
    </button>
  );
}
