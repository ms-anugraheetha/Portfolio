import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sage ${className}`}
    >
      {children}
    </p>
  );
}
