import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Magnetic } from "./Magnetic";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "ghost" | "line";
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

const variants = {
  solid:
    "relative inline-flex items-center justify-center overflow-hidden bg-bone px-8 py-4 text-night before:absolute before:inset-0 before:origin-bottom before:scale-y-0 before:bg-gold before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:scale-y-100",
  ghost:
    "relative inline-flex items-center justify-center border border-bone/20 px-8 py-4 text-bone transition-colors duration-300 hover:border-gold hover:text-gold",
  line: "relative inline-flex flex-col items-start text-bone after:mt-2 after:block after:h-px after:w-full after:origin-start after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100",
};

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "solid",
  className = "",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = `type-btn ${variants[variant]} ${className}`;
  const inner = <span className="relative z-10">{children}</span>;

  const node = href ? (
    href.startsWith("#") ? (
      <a href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {inner}
      </a>
    ) : href.startsWith("http") ? (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {inner}
      </a>
    ) : (
      <Link to={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {inner}
      </Link>
    )
  ) : (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {inner}
    </button>
  );

  return (
    <Magnetic className="max-w-full" strength={variant === "line" ? 18 : 10}>
      {node}
    </Magnetic>
  );
}
