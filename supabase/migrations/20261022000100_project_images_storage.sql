-- ─────────────────────────────────────────────────────────────────────────
-- Storage for project images.
--   • Public bucket: anyone can VIEW an image by its public URL (the
--     portfolio shows them), but cannot list, upload, replace or delete.
--   • Only admins (public.is_admin()) can upload, replace or delete.
--   • The bucket itself enforces a 5 MB limit and image MIME types, so the
--     rules hold even if someone bypasses the dashboard.
-- Requires 20261022000000_portfolio_cms.sql (for public.is_admin()).
-- ─────────────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "project-images: admin read" on storage.objects;
create policy "project-images: admin read" on storage.objects
  for select to authenticated
  using (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "project-images: admin upload" on storage.objects;
create policy "project-images: admin upload" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "project-images: admin update" on storage.objects;
create policy "project-images: admin update" on storage.objects
  for update to authenticated
  using (bucket_id = 'project-images' and public.is_admin())
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "project-images: admin delete" on storage.objects;
create policy "project-images: admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'project-images' and public.is_admin());
