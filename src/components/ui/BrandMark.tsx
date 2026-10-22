import { brandLogos, type BrandLogoId } from "@/data/skillLogos";

/** A brand logo (Simple Icons path) drawn in `currentColor`. */
export function BrandMark({
  id,
  className = "size-4",
}: {
  id: BrandLogoId;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={brandLogos[id].path} />
    </svg>
  );
}
