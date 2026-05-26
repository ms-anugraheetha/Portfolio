import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "ghost" | "outline";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-sage text-ivory hover:bg-sage/90 active:scale-[0.98]",
  ghost:
    "text-charcoal-muted hover:text-charcoal hover:bg-ivory-deep/80 active:scale-[0.98]",
  outline:
    "border border-line bg-ivory/60 text-charcoal hover:border-sage hover:bg-sage-muted/30 hover:text-charcoal active:scale-[0.98]",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
