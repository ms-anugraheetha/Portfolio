import type { SVGProps } from "react";
import type { TabIcon } from "@/data/routes";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Hand-drawn style cat face — the anu.exe mark. */
export function CatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 19.5c-1.2-3-.9-6.7.8-9L4.6 4l4.6 3.1a10 10 0 0 1 5.6 0L19.4 4l-.7 6.5c1.7 2.3 2 6 .8 9-2 1.3-4.6 1.9-7.5 1.9s-5.5-.6-7.5-1.9Z" />
      <circle cx="9.4" cy="13.6" r=".9" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="13.6" r=".9" fill="currentColor" stroke="none" />
      <path d="M10.9 16.5c.6.6 1.6.6 2.2 0" />
      <path d="M2 14.5h3M2.4 17l2.8-.8M22 14.5h-3M21.6 17l-2.8-.8" strokeWidth={1.2} />
    </svg>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7.5V18a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 18V9a1.5 1.5 0 0 0-1.5-1.5h-7.2L10.5 5H4.5A1.5 1.5 0 0 0 3 6.5Z" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8.5" r="3.7" />
      <path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" />
    </svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" />
    </svg>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7.5 4h9v5a4.5 4.5 0 0 1-9 0Z" />
      <path d="M7.5 6H4.5a3 3 0 0 0 3 4M16.5 6h3a3 3 0 0 1-3 4M12 13.5V17M8.5 20h7M9.5 17h5v3h-5z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3 12.5h18" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15M14 7l5 5-5 5" />
    </svg>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v11M7 10.5l5 5 5-5M4.5 19.5h15" />
    </svg>
  );
}

/* Generic marks for skills that have no brand logo. */

export function DatabaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
    </svg>
  );
}

export function DevicesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4.5" width="14" height="10" rx="1.5" />
      <path d="M6 18.5h7M9.5 14.5v4" />
      <rect x="15.5" y="9" width="6" height="11" rx="1.3" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3.5 9 4.5-9 4.5L3 8z" />
      <path d="m3 12 9 4.5 9-4.5M3 16l9 4.5 9-4.5" />
    </svg>
  );
}

export function ApiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4.5c-2 0-2.5 1-2.5 2.5v2.5c0 1.2-.8 2.5-2.5 2.5 1.7 0 2.5 1.3 2.5 2.5V17c0 1.5.5 2.5 2.5 2.5M16 4.5c2 0 2.5 1 2.5 2.5v2.5c0 1.2.8 2.5 2.5 2.5-1.7 0-2.5 1.3-2.5 2.5V17c0 1.5-.5 2.5-2.5 2.5" />
      <circle cx="9.5" cy="12" r=".6" fill="currentColor" />
      <circle cx="12" cy="12" r=".6" fill="currentColor" />
      <circle cx="14.5" cy="12" r=".6" fill="currentColor" />
    </svg>
  );
}

export function KeyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="15" r="4.5" />
      <path d="m11.3 11.7 8.2-8.2M16.5 6.5l2.5 2.5M14 9l2 2" />
    </svg>
  );
}

export function SparkDiamondIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 9 9-9 9-9-9z" />
      <path d="m12 8 4 4-4 4-4-4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function NetworkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="18" r="2.2" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="m7.6 7.6 2.8 2.8M16.4 7.6l-2.8 2.8M7.6 16.4l2.8-2.8M16.4 16.4l-2.8-2.8" />
    </svg>
  );
}

export function BrainIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5.5a3 3 0 0 0-5.6-1.4A3 3 0 0 0 4 8.6a3.2 3.2 0 0 0 .4 5.6A3.2 3.2 0 0 0 8 19.4a3 3 0 0 0 4 .1Z" />
      <path d="M12 5.5a3 3 0 0 1 5.6-1.4A3 3 0 0 1 20 8.6a3.2 3.2 0 0 1-.4 5.6 3.2 3.2 0 0 1-3.6 5.2 3 3 0 0 1-4 .1Z" />
      <path d="M12 5.5v14M8 9.5c1.2 0 2 .8 2 2M16 9.5c-1.2 0-2 .8-2 2M8.5 15c1 0 1.8-.5 2.2-1.3M15.5 15c-1 0-1.8-.5-2.2-1.3" />
    </svg>
  );
}

export function CubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </svg>
  );
}

const tabIcons: Record<TabIcon, (p: IconProps) => React.JSX.Element> = {
  cat: CatIcon,
  folder: FolderIcon,
  user: UserIcon,
  code: CodeIcon,
  trophy: TrophyIcon,
  mail: MailIcon,
};

export function TabGlyph({ icon, ...props }: IconProps & { icon: TabIcon }) {
  const Glyph = tabIcons[icon];
  return <Glyph {...props} />;
}
