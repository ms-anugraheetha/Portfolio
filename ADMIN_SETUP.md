# Admin dashboard — setup

The portfolio has a private content dashboard at **`/admin`** (sign-in at
**`/admin/login`**). It uses **Supabase** for sign-in, the database and image
storage. Until Supabase is configured, the public site keeps showing its
built-in content exactly as before, and `/admin/login` explains what's missing.

> The 5-clicks-on-the-cat shortcut is only a convenience for reaching the login
> page. It is **not** security. Protection comes from Supabase Auth plus
> database Row Level Security (RLS): even someone who finds `/admin` can't read
> drafts or change anything without your admin account.

## 1. Create a Supabase project

1. Create a free project at <https://supabase.com>.
2. **Authentication → Sign In / Providers → Email**: keep *Email* enabled, then
   **turn OFF "Allow new users to sign up"**. There is no public registration.
3. **Authentication → Users → Add user → Create new user**: enter your email and
   a strong password and tick *Auto Confirm User*. Supabase stores only a
   salted hash of the password.

## 2. Run the database migrations

In **SQL Editor**, run these two files in order (copy and paste each one in turn):

1. `supabase/migrations/20261022000000_portfolio_cms.sql`: tables, RLS policies and the `is_admin()` check.
2. `supabase/migrations/20261022000100_project_images_storage.sql`: the `project-images` bucket (5 MB limit, PNG/JPEG/WebP/GIF only) and its admin-only upload policies.

Both are safe to re-run.

## 3. Make your account the admin

Still in the SQL editor (replace the email):

```sql
insert into public.admins (user_id)
select id from auth.users where email = 'you@example.com';
```

Only accounts listed in `public.admins` can see drafts or change content. That
table can't be read or written through the public API.

## 4. Environment variables

From **Project Settings → API**, copy the *Project URL* and the *anon* (or
*publishable*) key into `.env.local` in the project folder (see `.env.example`),
and into your hosting provider's environment settings:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
```

These two values are public by design. **Never** put the `service_role` /
secret key in any `VITE_` variable. The app refuses to start the CMS if it
detects one.

Restart `npm run dev` after changing them.

## 5. First sign-in

1. Open `/admin/login` (or click the cat five times quickly).
2. Sign in, then click **Import current content**. This copies the current
   pages and the four projects (Rasova, Travel Destination Recommendation
   System, UniMoney, Python Confidence Coach), with their illustrations, into
   the database. The live site looks identical afterwards.

## Hosting

`/admin` and `/admin/login` must serve `index.html`:

- **Vercel**: handled by `vercel.json`.
- **Netlify / Cloudflare Pages**: handled by `public/_redirects`.
- Anything else: add an equivalent rewrite for `/admin/*` → `/index.html`.

## How publishing works

- **Page sections** (Home, About, Skills, Experience, Contact): *Save draft*
  stores changes privately; *Preview* opens the site with your drafts (only
  visible to you while signed in); *Publish* makes them public.
- **Projects**: new projects start as hidden drafts. *Publish* / *Unpublish*
  toggles visibility. Edits to an already-published project go live when saved.
- Images you upload are stored in the `project-images` bucket. Replacing or
  deleting a project removes its old uploaded image.
