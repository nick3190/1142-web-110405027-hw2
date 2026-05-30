import type { ButtonHTMLAttributes, ReactNode } from "react";

interface GlitchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "option" | "danger";
}

export function GlitchButton({
  children,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: GlitchButtonProps) {
  const baseClass =
    variant === "option"
      ? "pixel-border-thin dither-bg text-xs sm:text-sm"
      : variant === "danger"
        ? "bg-accent-red text-white"
        : "pixel-border dither-bg text-sm sm:text-base";

  return (
    <button
      type="button"
      disabled={disabled}
      className={`glitch-btn group relative cursor-pointer overflow-hidden tracking-widest uppercase transition disabled:cursor-not-allowed disabled:opacity-50 ${baseClass} ${className}`}
      {...props}
    >
      <span className="glitch-btn__wave pointer-events-none absolute inset-0 opacity-0" />
      <span className="glitch-btn__scan pointer-events-none absolute inset-0 opacity-0" />
      <span className="glitch-btn__text relative z-[1] inline-flex items-center gap-1">
        {children}
      </span>
    </button>
  );
}
