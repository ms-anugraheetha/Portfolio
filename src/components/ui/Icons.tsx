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

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.5} {...props}>
      <path d="M12 2.5c.6 5 2.5 7.4 7.5 9.5-5 2.1-6.9 4.5-7.5 9.5-.6-5-2.5-7.4-7.5-9.5 5-2.1 6.9-4.5 7.5-9.5Z" />
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
