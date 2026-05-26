import { useWorkspace } from "@/context/WorkspaceContext";
import { site } from "@/data/site";

type BrandMarkProps = {
  size?: "sm" | "lg";
};

export function BrandMark({ size = "sm" }: BrandMarkProps) {
  const { navigate } = useWorkspace();
  const textSize =
    size === "lg" ? "text-2xl md:text-3xl" : "text-sm md:text-base";

  return (
    <button
      type="button"
      onClick={() => navigate("home")}
      className={`group font-heading font-semibold tracking-tight text-charcoal ${textSize}`}
      aria-label={`${site.name} — go to home`}
    >
      {site.name}
    </button>
  );
}
