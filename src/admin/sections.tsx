import type {
  AboutContent,
  Achievement,
  ContactContent,
  EducationEntry,
  ExperienceContent,
  HomeContent,
  SkillsContent,
} from "@/content/types";
import type { Skill, TechCategory } from "@/data/techStack";
import { brandLogos } from "@/data/skillLogos";
import { SKILL_GLYPHS } from "@/lib/techLogos";
import { SectionEditor } from "./SectionEditor";
import { Button, Card, Field, isHttpsUrl, move, RowControls, Select, TextArea } from "./ui";

type EditorProps = { onSessionExpired: () => void };

/* ───────────── Home ───────────── */

export function HomeEditor(props: EditorProps) {
  return (
    <SectionEditor
      sectionKey="home"
      title="Home page"
      description="Hero heading, introduction and call to action."
      validate={(v) => (!v.headingLine1.trim() ? "The main heading can't be empty." : !isHttpsUrl(v.cvUrl) && !v.cvUrl.startsWith("/") ? "CV link must be an https:// URL or a /path." : null)}
      {...props}
    >
      {(v, set) => {
        const f = <K extends keyof HomeContent>(k: K) => (e: { target: { value: string } }) => set({ ...v, [k]: e.target.value });
        return (
          <>
            <Card title="Heading">
              <Field label="Small line above the name" value={v.greeting} onChange={f("greeting")} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Main heading — line 1" value={v.headingLine1} onChange={f("headingLine1")} />
                <Field label="Main heading — line 2" value={v.headingLine2} onChange={f("headingLine2")} />
              </div>
            </Card>
            <Card title="Introduction">
              <Field label="Title (red line under the name)" value={v.title} onChange={f("title")} />
              <TextArea label="Introduction" value={v.intro} onChange={f("intro")} rows={3} />
            </Card>
            <Card title="Buttons & links">
              <Field label="Main button text" value={v.ctaLabel} onChange={f("ctaLabel")} hint="Opens the Projects tab." />
              <Field
                label="CV link (optional)"
                value={v.cvUrl}
                onChange={f("cvUrl")}
                placeholder="https://… or /cv.pdf"
                hint="When set, a “Download CV” button appears. GitHub, LinkedIn and email buttons use Contact details."
              />
            </Card>
          </>
        );
      }}
    </SectionEditor>
  );
}

/* ───────────── About ───────────── */

export function AboutEditor(props: EditorProps) {
  return (
    <SectionEditor sectionKey="about" title="About me" description="Biography, quick facts, education and how you work." {...props}>
      {(v, set) => (
        <>
          <Card title="Biography">
            <Field label="Heading" value={v.heading} onChange={(e) => set({ ...v, heading: e.target.value })} />
            <StringList
              label="Paragraph"
              items={v.paragraphs}
              onChange={(paragraphs) => set({ ...v, paragraphs })}
              multiline
            />
          </Card>
          <Card title="Quick facts">
            <Field label="Studying" value={v.studying} onChange={(e) => set({ ...v, studying: e.target.value })} />
            <Field label="Status" value={v.status} onChange={(e) => set({ ...v, status: e.target.value })} hint="Also shown on the Contact tab." />
          </Card>
          <Card title="Education">
            <ObjectList<EducationEntry>
              noun="education entry"
              items={v.education}
              onChange={(education) => set({ ...v, education })}
              blank={{ degree: "", school: "", period: "", location: "" }}
              fields={[
                ["degree", "Degree"],
                ["school", "School"],
                ["period", "Dates", "e.g. Sep 2023 - Sep 2026"],
                ["location", "Location"],
              ]}
              titleOf={(e) => e.degree || "New entry"}
            />
          </Card>
          <Card title="How I work">
            <ObjectList<AboutContent["principles"][number]>
              noun="principle"
              items={v.principles}
              onChange={(principles) => set({ ...v, principles })}
              blank={{ title: "", body: "" }}
              fields={[
                ["title", "Title"],
                ["body", "Description"],
              ]}
              titleOf={(p) => p.title || "New principle"}
            />
          </Card>
        </>
      )}
    </SectionEditor>
  );
}

/* ───────────── Contact ───────────── */

export function ContactEditor(props: EditorProps) {
  const validate = (v: ContactContent) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) return "Enter a valid email address.";
    for (const [k, label] of [["github", "GitHub"], ["linkedin", "LinkedIn"], ["instagram", "Instagram"]] as const) {
      if (!isHttpsUrl(v[k])) return `${label} must be a full https:// link.`;
    }
    return null;
  };
  return (
    <SectionEditor sectionKey="contact" title="Contact details" description="Public contact information and social links used across the site." validate={validate} {...props}>
      {(v, set) => {
        const f = (k: keyof ContactContent) => (e: { target: { value: string } }) => set({ ...v, [k]: e.target.value });
        return (
          <>
            <Card title="You">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" value={v.fullName} onChange={f("fullName")} />
                <Field label="Short name" value={v.shortName} onChange={f("shortName")} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" type="email" value={v.email} onChange={f("email")} />
                <Field label="Location" value={v.location} onChange={f("location")} />
              </div>
            </Card>
            <Card title="Social links">
              <Field label="GitHub" value={v.github} onChange={f("github")} placeholder="https://github.com/…" />
              <Field label="LinkedIn" value={v.linkedin} onChange={f("linkedin")} placeholder="https://www.linkedin.com/in/…" />
              <Field label="Instagram (optional)" value={v.instagram} onChange={f("instagram")} placeholder="https://instagram.com/…" />
            </Card>
          </>
        );
      }}
    </SectionEditor>
  );
}

/* ───────────── Skills ───────────── */

const logoOptions = [
  { value: "", label: "Automatic (match by name)" },
  ...SKILL_GLYPHS.map((g) => ({ value: `glyph:${g}`, label: `Icon · ${g}` })),
  ...Object.entries(brandLogos)
    .sort((a, b) => a[1].title.localeCompare(b[1].title))
    .map(([id, b]) => ({ value: `brand:${id}`, label: `Logo · ${b.title}` })),
];

function logoValue(s: Skill) {
  if (!s.logo) return "";
  return "brand" in s.logo ? `brand:${s.logo.brand}` : `glyph:${s.logo.glyph}`;
}
function withLogo(s: Skill, value: string): Skill {
  const [kind, id] = value.split(":");
  if (kind === "brand") return { ...s, logo: { brand: id as keyof typeof brandLogos } };
  if (kind === "glyph") return { ...s, logo: { glyph: id as (typeof SKILL_GLYPHS)[number] } };
  return { name: s.name };
}

export function SkillsEditor(props: EditorProps) {
  return (
    <SectionEditor
      sectionKey="skills"
      title="Skills"
      description="Skill categories and the skills inside them."
      validate={(v: SkillsContent) => (v.categories.some((c) => !c.name.trim()) ? "Every category needs a name." : null)}
      {...props}
    >
      {(v, set) => {
        const setCat = (i: number, cat: TechCategory) =>
          set({ categories: v.categories.map((c, j) => (j === i ? cat : c)) });
        return (
          <>
            {v.categories.map((cat, i) => (
              <Card
                key={i}
                title={cat.name || "New category"}
                actions={
                  <RowControls
                    index={i}
                    count={v.categories.length}
                    label={`category ${cat.name}`}
                    onMove={(a, b) => set({ categories: move(v.categories, a, b) })}
                    onRemove={() => {
                      if (window.confirm(`Remove the “${cat.name || "new"}” category and its ${cat.items.length} skills?`)) {
                        set({ categories: v.categories.filter((_, j) => j !== i) });
                      }
                    }}
                  />
                }
              >
                <Field label="Category name" value={cat.name} onChange={(e) => setCat(i, { ...cat, name: e.target.value })} />
                <ul className="space-y-2">
                  {cat.items.map((skill, k) => (
                    <li key={k} className="flex flex-wrap items-end gap-2 rounded-xl bg-paper-deep/40 p-2 sm:flex-nowrap">
                      <div className="min-w-0 flex-1 basis-40">
                        <Field
                          label="Skill"
                          value={skill.name}
                          onChange={(e) =>
                            setCat(i, { ...cat, items: cat.items.map((s, j) => (j === k ? { ...s, name: e.target.value } : s)) })
                          }
                        />
                      </div>
                      <div className="min-w-0 flex-1 basis-48">
                        <Select
                          label="Logo"
                          value={logoValue(skill)}
                          options={logoOptions}
                          onChange={(val) =>
                            setCat(i, { ...cat, items: cat.items.map((s, j) => (j === k ? withLogo(s, val) : s)) })
                          }
                        />
                      </div>
                      <RowControls
                        index={k}
                        count={cat.items.length}
                        label={`skill ${skill.name}`}
                        onMove={(a, b) => setCat(i, { ...cat, items: move(cat.items, a, b) })}
                        onRemove={() => setCat(i, { ...cat, items: cat.items.filter((_, j) => j !== k) })}
                      />
                    </li>
                  ))}
                </ul>
                <Button size="sm" onClick={() => setCat(i, { ...cat, items: [...cat.items, { name: "" }] })}>
                  + Add skill
                </Button>
              </Card>
            ))}
            <Button onClick={() => set({ categories: [...v.categories, { name: "", items: [] }] })}>+ Add category</Button>
          </>
        );
      }}
    </SectionEditor>
  );
}

/* ───────────── Experience ───────────── */

export function ExperienceEditor(props: EditorProps) {
  return (
    <SectionEditor
      sectionKey="experience"
      title="Experience"
      description="Programmes, milestones and achievements, in display order. Education is edited under About me."
      validate={(v: ExperienceContent) => (v.achievements.some((a) => !a.title.trim()) ? "Every entry needs a title." : null)}
      {...props}
    >
      {(v, set) => (
        <Card title="Entries">
          <ObjectList<Achievement>
            noun="entry"
            items={v.achievements}
            onChange={(achievements) => set({ ...v, achievements })}
            blank={{ title: "", detail: "", period: "", status: "", description: "" }}
            fields={[
              ["title", "Title"],
              ["detail", "Detail (optional)"],
              ["period", "Dates (optional)"],
              ["status", "Status badge (optional)", "e.g. Applied"],
              ["description", "Description (optional)"],
            ]}
            titleOf={(a) => a.title || "New entry"}
          />
        </Card>
      )}
    </SectionEditor>
  );
}

/* ───────────── Generic list editors ───────────── */

function StringList({
  label,
  items,
  onChange,
  multiline,
}: {
  label: string;
  items: string[];
  onChange: (next: string[]) => void;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-3">
      {items.map((text, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            {multiline ? (
              <TextArea label={`${label} ${i + 1}`} value={text} rows={3} onChange={(e) => onChange(items.map((t, j) => (j === i ? e.target.value : t)))} />
            ) : (
              <Field label={`${label} ${i + 1}`} value={text} onChange={(e) => onChange(items.map((t, j) => (j === i ? e.target.value : t)))} />
            )}
          </div>
          <div className="pt-6">
            <RowControls index={i} count={items.length} label={`${label.toLowerCase()} ${i + 1}`} onMove={(a, b) => onChange(move(items, a, b))} onRemove={() => onChange(items.filter((_, j) => j !== i))} />
          </div>
        </div>
      ))}
      <Button size="sm" onClick={() => onChange([...items, ""])}>
        + Add {label.toLowerCase()}
      </Button>
    </div>
  );
}

function ObjectList<T extends object>({
  noun,
  items,
  onChange,
  blank,
  fields,
  titleOf,
}: {
  noun: string;
  items: T[];
  onChange: (next: T[]) => void;
  blank: T;
  fields: [keyof T & string, string, string?][];
  titleOf: (item: T) => string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-line bg-paper-deep/30 p-3 md:p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="truncate text-sm font-bold text-ink">{titleOf(item)}</p>
            <RowControls
              index={i}
              count={items.length}
              label={`${noun} ${titleOf(item)}`}
              onMove={(a, b) => onChange(move(items, a, b))}
              onRemove={() => {
                if (window.confirm(`Remove “${titleOf(item)}”?`)) onChange(items.filter((_, j) => j !== i));
              }}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map(([key, label, placeholder]) => (
              <Field
                key={key}
                label={label}
                placeholder={placeholder}
                value={String((item as Record<string, unknown>)[key] ?? "")}
                onChange={(e) => onChange(items.map((it, j) => (j === i ? { ...it, [key]: e.target.value } : it)))}
              />
            ))}
          </div>
        </div>
      ))}
      <Button size="sm" onClick={() => onChange([...items, { ...blank }])}>
        + Add {noun}
      </Button>
    </div>
  );
}
