-- ─────────────────────────────────────────────────────────────────────────
-- Portfolio CMS: content tables, admin allow-list and Row Level Security.
--
-- Security model
--   • Only users listed in public.admins can write anything.
--   • Visitors (anon) and ordinary signed-in users can read ONLY published
--     content: content_published rows and projects where is_published = true.
--   • Drafts (content_drafts) and unpublished projects are admin-only.
--   • public.admins itself has RLS enabled and no policies, so it cannot be
--     read or changed through the API; it is managed from the SQL editor.
-- ─────────────────────────────────────────────────────────────────────────

-- Admin allow-list ---------------------------------------------------------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;

-- True when the caller's JWT belongs to a listed admin. SECURITY DEFINER so
-- it can read public.admins, which callers themselves cannot.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Shared updated_at trigger -----------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Page content (home, about, contact, skills, experience) ------------------
-- One JSON document per page. Drafts and published copies live in separate
-- tables so RLS can keep drafts private without column-level tricks.
create table if not exists public.content_drafts (
  key        text primary key
             check (key in ('home', 'about', 'contact', 'skills', 'experience')),
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.content_published (
  key          text primary key
               check (key in ('home', 'about', 'contact', 'skills', 'experience')),
  data         jsonb not null,
  published_at timestamptz not null default now()
);

drop trigger if exists content_drafts_touch on public.content_drafts;
create trigger content_drafts_touch
  before update on public.content_drafts
  for each row execute function public.touch_updated_at();

alter table public.content_drafts enable row level security;
alter table public.content_published enable row level security;

drop policy if exists "drafts: admin only" on public.content_drafts;
create policy "drafts: admin only" on public.content_drafts
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "published: anyone can read" on public.content_published;
create policy "published: anyone can read" on public.content_published
  for select to anon, authenticated
  using (true);

drop policy if exists "published: admin insert" on public.content_published;
create policy "published: admin insert" on public.content_published
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists "published: admin update" on public.content_published;
create policy "published: admin update" on public.content_published
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "published: admin delete" on public.content_published;
create policy "published: admin delete" on public.content_published
  for delete to authenticated
  using (public.is_admin());

-- Projects -----------------------------------------------------------------
create table if not exists public.projects (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique
                   check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title            text not null check (char_length(title) between 1 and 160),
  short_title      text not null default '',
  category         text not null default '',
  summary          text not null default '',
  tagline          text not null default '',
  description      text not null default '',
  stack            text[] not null default '{}',
  behind_the_build text[] not null default '{}',
  github_url       text check (github_url is null or github_url ~ '^https://'),
  demo_url         text check (demo_url is null or demo_url ~ '^https://'),
  image_url        text,
  status           text not null default 'live'
                   check (status in ('live', 'in-development')),
  sort_order       integer not null default 0,
  is_published     boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

drop trigger if exists projects_touch on public.projects;
create trigger projects_touch
  before update on public.projects
  for each row execute function public.touch_updated_at();

alter table public.projects enable row level security;

drop policy if exists "projects: read published, admins read all" on public.projects;
create policy "projects: read published, admins read all" on public.projects
  for select to anon, authenticated
  using (is_published or public.is_admin());

drop policy if exists "projects: admin insert" on public.projects;
create policy "projects: admin insert" on public.projects
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists "projects: admin update" on public.projects;
create policy "projects: admin update" on public.projects
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "projects: admin delete" on public.projects;
create policy "projects: admin delete" on public.projects
  for delete to authenticated
  using (public.is_admin());
