import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/content/types";
import {
  createProject,
  deleteProject,
  listProjects,
  removeUploadedImage,
  reorderProjects,
  SessionExpiredError,
  setProjectPublished,
  updateProject,
  uploadProjectImage,
  validateImage,
  type AdminProject,
} from "./api";
import { Badge, Button, Card, Field, IconButton, isHttpsUrl, move, Select, Spinner, TextArea, useToast } from "./ui";

const blankProject: Project = {
  id: "",
  slug: "",
  title: "",
  shortTitle: "",
  category: "",
  summary: "",
  tagline: "",
  description: "",
  stack: [],
  behindTheBuild: [],
  github: "",
  demo: "",
  image: "",
  status: "live",
};

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

export function ProjectsEditor({ onSessionExpired }: { onSessionExpired: () => void }) {
  const toast = useToast();
  const [items, setItems] = useState<AdminProject[] | null>(null);
  const [editing, setEditing] = useState<AdminProject | "new" | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fail = useCallback(
    (err: unknown) => {
      if (err instanceof SessionExpiredError) return onSessionExpired();
      toast("error", err instanceof Error ? err.message : "Something went wrong.");
    },
    [onSessionExpired, toast],
  );

  const reload = useCallback(async () => {
    try {
      setItems(await listProjects());
    } catch (err) {
      fail(err);
      setItems((prev) => prev ?? []);
    }
  }, [fail]);

  useEffect(() => {
    reload();
    window.addEventListener("cms:imported", reload);
    return () => window.removeEventListener("cms:imported", reload);
  }, [reload]);

  const togglePublish = async (p: AdminProject) => {
    setBusyId(p.id);
    try {
      await setProjectPublished(p.id, !p.published);
      toast("success", p.published ? `“${p.title}” is now hidden from visitors.` : `“${p.title}” is now live.`);
      await reload();
    } catch (err) {
      fail(err);
    } finally {
      setBusyId(null);
    }
  };

  const reorder = async (from: number, to: number) => {
    if (!items) return;
    const next = move(items, from, to);
    setItems(next);
    try {
      await reorderProjects(next.map((p) => p.id));
      toast("success", "Order updated.");
    } catch (err) {
      fail(err);
      reload();
    }
  };

  const remove = async (p: AdminProject) => {
    setBusyId(p.id);
    try {
      await deleteProject(p);
      toast("success", `Deleted “${p.title}”.`);
      setConfirmDelete(null);
      await reload();
    } catch (err) {
      fail(err);
    } finally {
      setBusyId(null);
    }
  };

  if (editing) {
    return (
      <ProjectForm
        initial={editing === "new" ? null : editing}
        order={editing === "new" ? (items?.length ?? 0) : items!.findIndex((p) => p.id === editing.id)}
        takenSlugs={(items ?? []).filter((p) => editing === "new" || p.id !== editing.id).map((p) => p.slug)}
        onDone={async (msg) => {
          setEditing(null);
          if (msg) toast("success", msg);
          await reload();
        }}
        onError={fail}
      />
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 pt-4">
        <div>
          <h2 className="font-heading text-xl font-extrabold text-ink">Projects</h2>
          <p className="mt-0.5 text-sm text-ink-muted">
            New projects start as private drafts. Published projects update on the live site as soon as you save.
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => window.open("/?preview", "_blank", "noopener")}>
            Preview drafts
          </Button>
          <Button variant="primary" size="sm" onClick={() => setEditing("new")}>
            + New project
          </Button>
        </div>
      </div>

      {!items ? (
        <div className="flex items-center gap-2 text-sm text-ink-muted" role="status">
          <Spinner /> Loading projects…
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line p-8 text-center text-sm text-ink-muted">No projects yet.</p>
      ) : (
        <ol className="space-y-3">
          {items.map((p, i) => (
            <li key={p.id} className="rounded-2xl border border-line bg-paper p-3 sm:p-4">
              <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
                <div className="flex shrink-0 flex-col">
                  <IconButton label={`Move ${p.title} up`} disabled={i === 0} onClick={() => reorder(i, i - 1)}>
                    <path d="M12 19V5M6 11l6-6 6 6" />
                  </IconButton>
                  <IconButton label={`Move ${p.title} down`} disabled={i === items.length - 1} onClick={() => reorder(i, i + 1)}>
                    <path d="M12 5v14M6 13l6 6 6-6" />
                  </IconButton>
                </div>
                <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#fdf3f1] ring-1 ring-line">
                  {p.image ? <img src={p.image} alt="" className="h-full w-full object-contain mix-blend-multiply" /> : <span className="text-[11px] text-ink-soft">No image</span>}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold tabular-nums text-cherry">{String(i + 1).padStart(2, "0")}</span>
                    <p className="truncate font-heading font-bold text-ink">{p.title}</p>
                    {p.published ? <Badge tone="live">Published</Badge> : <Badge tone="draft">Draft · hidden</Badge>}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-ink-muted">{p.category || "No category"} · /projects/{p.slug}</p>
                </div>
                <div className="flex w-full shrink-0 flex-wrap gap-2 sm:w-auto">
                  <Button size="sm" loading={busyId === p.id && confirmDelete !== p.id} onClick={() => togglePublish(p)}>
                    {p.published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button size="sm" onClick={() => setEditing(p)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => setConfirmDelete(p.id)}>
                    Delete
                  </Button>
                </div>
              </div>
              {confirmDelete === p.id && (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-blush/70 px-4 py-3" role="alertdialog" aria-label={`Delete ${p.title}?`}>
                  <p className="text-sm text-ink">
                    Delete <strong>{p.title}</strong> permanently? This can’t be undone.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => setConfirmDelete(null)} autoFocus>
                      Cancel
                    </Button>
                    <Button size="sm" variant="primary" loading={busyId === p.id} onClick={() => remove(p)}>
                      Yes, delete
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/* ───────────── Create / edit form ───────────── */

function ProjectForm({
  initial,
  order,
  takenSlugs,
  onDone,
  onError,
}: {
  initial: AdminProject | null;
  order: number;
  takenSlugs: string[];
  onDone: (message?: string) => void;
  onError: (err: unknown) => void;
}) {
  const [p, setP] = useState<Project>(() => (initial ? { ...initial } : { ...blankProject }));
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [stackText, setStackText] = useState(() => (initial?.stack ?? []).join(", "));
  const [notesText, setNotesText] = useState(() => (initial?.behindTheBuild ?? []).join("\n"));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const uploadedThisSession = useRef<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Project>(k: K, value: Project[K]) => setP((prev) => ({ ...prev, [k]: value }));

  const onTitle = (title: string) =>
    setP((prev) => ({ ...prev, title, slug: slugTouched ? prev.slug : slugify(title), shortTitle: prev.shortTitle }));

  const onFile = async (file?: File) => {
    if (!file) return;
    const problem = validateImage(file);
    if (problem) return setErrors((e) => ({ ...e, image: problem }));
    setErrors((e) => ({ ...e, image: "" }));
    setUploading(true);
    try {
      const url = await uploadProjectImage(file);
      uploadedThisSession.current.push(url);
      set("image", url);
    } catch (err) {
      onError(err);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const validate = (proj: Project) => {
    const e: Record<string, string> = {};
    if (!proj.title.trim()) e.title = "Give the project a name.";
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(proj.slug)) e.slug = "Use lowercase letters, numbers and single dashes.";
    else if (takenSlugs.includes(proj.slug)) e.slug = "Another project already uses this.";
    if (!isHttpsUrl(proj.github)) e.github = "Use a full https:// link.";
    if (!isHttpsUrl(proj.demo ?? "")) e.demo = "Use a full https:// link.";
    return e;
  };

  const save = async (publishNow?: boolean) => {
    const proj: Project = {
      ...p,
      title: p.title.trim(),
      shortTitle: p.shortTitle.trim() || p.title.trim(),
      stack: stackText.split(",").map((s) => s.trim()).filter(Boolean),
      behindTheBuild: notesText.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    const e = validate(proj);
    setErrors(e);
    if (Object.values(e).some(Boolean)) return;
    setSaving(true);
    try {
      if (initial) {
        const published = publishNow ?? initial.published;
        await updateProject(initial.id, proj, order, published);
        if (initial.image && initial.image !== proj.image) await removeUploadedImage(initial.image);
      } else {
        const created = await createProject(proj, order);
        if (publishNow) await setProjectPublished(created.id, true);
      }
      // Tidy up images uploaded and then replaced before saving.
      for (const url of uploadedThisSession.current) if (url !== proj.image) await removeUploadedImage(url);
      onDone(
        initial
          ? `Saved “${proj.title}”${(publishNow ?? initial.published) ? " — live now" : " as a draft"}.`
          : `Created “${proj.title}”${publishNow ? " and published it" : " as a private draft"}.`,
      );
    } catch (err) {
      onError(err);
    } finally {
      setSaving(false);
    }
  };

  const cancel = async () => {
    for (const url of uploadedThisSession.current) await removeUploadedImage(url).catch(() => {});
    onDone();
  };

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-4 mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
        <div className="flex items-center gap-2">
          <h2 className="font-heading text-xl font-extrabold text-ink">{initial ? `Edit “${initial.title}”` : "New project"}</h2>
          {initial && (initial.published ? <Badge tone="live">Published</Badge> : <Badge tone="draft">Draft · hidden</Badge>)}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="ghost" onClick={cancel} disabled={saving}>
            Cancel
          </Button>
          {(!initial || !initial.published) && (
            <Button size="sm" loading={saving} disabled={uploading} onClick={() => save(false)}>
              Save draft
            </Button>
          )}
          <Button size="sm" variant="primary" loading={saving} disabled={uploading} onClick={() => save(initial?.published ? undefined : true)}>
            {initial?.published ? "Save — updates live site" : "Save & publish"}
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-5">
          <Card title="Basics">
            <Field label="Project name" value={p.title} onChange={(e) => onTitle(e.target.value)} error={errors.title} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Short name" value={p.shortTitle} onChange={(e) => set("shortTitle", e.target.value)} hint="Used where space is tight." />
              <Field
                label="Address (slug)"
                value={p.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", e.target.value.toLowerCase());
                }}
                error={errors.slug}
                hint={`anugraheetha.dev/projects/${p.slug || "…"}`}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category" value={p.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Machine Learning" />
              <Select
                label="Status"
                value={p.status ?? "live"}
                onChange={(v) => set("status", v as Project["status"])}
                options={[
                  { value: "live", label: "Live / deployed" },
                  { value: "in-development", label: "In development" },
                ]}
              />
            </div>
          </Card>
          <Card title="Description">
            <TextArea label="Card summary" value={p.summary} onChange={(e) => set("summary", e.target.value)} hint="One or two sentences shown on the project card." />
            <Field label="Tagline" value={p.tagline} onChange={(e) => set("tagline", e.target.value)} />
            <TextArea label="Full description" value={p.description} rows={4} onChange={(e) => set("description", e.target.value)} hint="Used in the recruiter brief." />
            <Field label="Technology tags" value={stackText} onChange={(e) => setStackText(e.target.value)} hint="Comma-separated, e.g. React, FastAPI, PostgreSQL" />
            <TextArea label="Behind the build" value={notesText} rows={4} onChange={(e) => setNotesText(e.target.value)} hint="One point per line." />
          </Card>
          <Card title="Links">
            <Field label="Live demo URL" value={p.demo ?? ""} onChange={(e) => set("demo", e.target.value)} placeholder="https://…" error={errors.demo} />
            <Field label="GitHub URL" value={p.github} onChange={(e) => set("github", e.target.value)} placeholder="https://github.com/…" error={errors.github} />
          </Card>
        </div>

        <Card title="Card image">
          <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-[#fdf3f1] ring-1 ring-line">
            {uploading ? (
              <Spinner className="size-6 text-cherry" />
            ) : p.image ? (
              <img src={p.image} alt="Current card image" className="h-full w-full object-contain p-2 mix-blend-multiply" />
            ) : (
              <span className="text-sm text-ink-soft">No image</span>
            )}
          </div>
          <input
            ref={fileInput}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="sr-only"
            id="project-image"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" loading={uploading} onClick={() => fileInput.current?.click()}>
              {p.image ? "Replace image" : "Upload image"}
            </Button>
            {p.image && (
              <Button size="sm" variant="ghost" onClick={() => set("image", "")}>
                Remove
              </Button>
            )}
          </div>
          {errors.image ? (
            <p className="text-xs text-cherry" role="alert">{errors.image}</p>
          ) : (
            <p className="text-xs text-ink-soft">PNG, JPEG, WebP or GIF, up to 5 MB. Illustrations on a white background blend into the card.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
