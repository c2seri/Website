# C2S — College to Service (Production v2, GitHub + Vercel only)

C2S — College to Service, Patrapada, Bhubaneswar.
NH-16, opposite Sani Mandir, Patrapada, Bhubaneswar, Odisha 751019.
Phones: 9777481909 / 9658177712. Tagline: "Your Selection Our Mission".

A coaching centre with a library, later its own institute — built to go
far beyond a static demo, on GitHub + Vercel only, with **no VPS and no
Hostinger for now** (user decision). This code goes directly in the same
repo **c2seri/Website** — no new repo.

## What this version is

- Static frontend (HTML/CSS/JS, no build step) + Vercel Serverless
  Functions under `api/` (plain Node, no external npm dependencies,
  native fetch only — so Vercel deploys without install failures).
- Pages:
  - `index.html` — Home, Exams (mega-menu dropdowns), Test Series,
    Batches/Classes (HLS-ready video placeholder), Blog, Notices,
    Help/Contact, Main Login/Signup (OTP).
  - `library.html` — reached **only via the Library button** on the main
    site. Completely separate login/data from Main Login: Library OTP
    login/signup, "C2S Library – Online Admission Form" / "C2S Premium
    Library" / "Quick Admission", seat map, members, ledger, dashboard.
  - `admin.html` — **admin page, separate URL only.** It is NOT linked
    from the main navigation or from any login page. Open it directly as
    `admin.html` on the deployed site. It shows dashboard placeholders
    (tests, members, income/pending, notices/blog management) in preview
    mode. Admin access via a separate URL is handled by the owner, not
    by a public demo button on the site.
  - `styles.css`, `exams.js`, `app.js`, `library.js`, `admin.js`,
    `api/otp-request.js`, `api/otp-verify.js`, `sitemap.xml`, `robots.txt`,
    `.env.example` (empty placeholders only, no secrets).

## PREVIEW vs LIVE — read this first

**Right now this is PREVIEW mode, not live production data:**

- **Database: PREVIEW only.** Until `DATABASE_URL` is set in Vercel
  (external managed Postgres, Supabase/Neon style), all accounts, tests,
  members and ledger entries are stored only in the browser
  (localStorage). They do not sync across browsers/devices, and they are
  NOT saved to a real database. Never claim otherwise.
- **OTP: PREVIEW only.** Login/signup offer all three channels —
  **SMS OTP, WhatsApp OTP, Email OTP** — and the user chooses one.
  `api/otp-request` reads `OTP_PROVIDER_SMS`, `OTP_PROVIDER_WHATSAPP`
  and `OTP_PROVIDER_EMAIL` and returns `provider_configured:false`
  honestly when the matching env var is missing. In that case the
  frontend shows a clearly labelled **PREVIEW OTP on screen for testing
  only**. No real SMS, WhatsApp or email is sent, and no OTP code,
  secret or token is hardcoded anywhere.
- **Payment: placeholder only.** Cashfree is the chosen provider, shown
  as a settings placeholder only. No API keys, merchant ID or live
  payment link is included or invented.
- **Videos: placeholder only.** Batches/Classes has an HLS-ready player
  placeholder and **no video files**. No 1 TB / 2 TB of video is claimed
  as already uploaded.
- **No demo logins.** All previous Admin/Student/Library demo buttons
  and demo accounts have been removed. Login is OTP only. Admin is
  reachable only via the separate `admin.html` URL above.

## Exams, Test Series, Library (production v2 scope)

- 10 exam tracks, state-wise filter + keyword search: All India — BANK,
  SSC, Railway, UPSC, Defence, Teaching; Odisha State — OSSC, OSSSC,
  OPSC, Odisha Police. Collapsible pattern / syllabus / eligibility /
  posts / state relation. No invented dates, fees or notification
  dates — check the official notification where unconfirmed.
- Test Series: a submitted test moves out of Available into Given Tests
  with marks, correct/wrong/skip and solutions, and cannot be retaken.
  Exam mode: instructions + declaration, fullscreen locked window,
  tab-switch / minimise / fullscreen-exit warnings, 3 violations
  auto-submit, time-up auto-submit, exit/submit only via confirmation.
  Calculator: BANK only (on-screen calculator); other exams show no
  calculator, only a rough scratch pad. Flag is staff-configurable per
  test in `app.js` (`calculatorAllowed`). Note: a browser cannot 100%
  lock a whole device — this is the strongest a browser page can enforce.
- Library: 1-month From/To access validation, student details +
  exam preferences, present address, separate Shift section
  (Morning / Afternoon / Full Day / Night, times, seat status) and
  separate Payment section. Registration Fee ₹200 non-refundable,
  separate from monthly payment. Per-shift prices configurable — only
  Afternoon ₹800 is a known screenshot example, not the price for all
  shifts; other shifts start unset (0). Discount amount/percent,
  auto total/pending, payment mode, Cancel/Reset/Submit, auto Library
  Registration No, welcome shown as queued / not-connected — never
  fake-sent. Seat map is a 2D grid in 3 zones in this GitHub/Vercel
  version (the 3D-style hall lives in the hosted full platform).

## Videos — the 1–2 TB path (do this, not Vercel disk, not the database)

1. Upload videos to S3-compatible object storage (env vars in
   `.env.example`: `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY`,
   `S3_SECRET_KEY` — all empty placeholders here).
2. Transcode uploads to HLS (multi-bitrate, segmented) so mobile/tab
   playback does not need a full download and content is harder to
   copy wholesale.
3. Serve HLS through a CDN in front of the bucket.
4. Store only video metadata (title, batch, HLS URL, duration) in
   Postgres — never the video files themselves in the database or on
   Vercel's disk. Vercel's filesystem is ephemeral and is not storage.

## Deploy on Vercel — exact steps (GitHub + Vercel only, no VPS)

1. This folder is the content of repo **c2seri/Website** (parent pushes
   after verifying — this build does **not** push itself).
2. In Vercel: **Add New → Project → Import** `c2seri/Website`.
3. **Framework Preset: Other** (Static).
4. **Build Command: (leave empty / none).**
5. **Output Directory: (leave as default — do not change).**
6. **Deploy.** `api/` functions are picked up by Vercel automatically
   as Serverless Functions; no install step is needed because there
   are no npm dependencies.

## Env vars to set in Vercel for LIVE mode (no secrets in this repo)

Copy names from `.env.example` and fill values only in Vercel's
dashboard (never commit real values):

- `DATABASE_URL` — external managed Postgres connection string
  (Supabase/Neon style). Until set, the site stays in PREVIEW mode.
- `OTP_PROVIDER_SMS` — SMS OTP provider name/endpoint identifier
  (provider integration step still required before live sending).
- `OTP_PROVIDER_WHATSAPP` — WhatsApp OTP provider identifier
  (template approval required with the provider).
- `OTP_PROVIDER_EMAIL` — Email OTP provider identifier.
- `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`,
  `S3_REGION`, `CDN_URL` — object storage + CDN for videos.
- `CASHFREE_APP_ID`, `CASHFREE_SECRET_KEY`, `CASHFREE_ENV`
  (sandbox/production) — only when Cashfree is actually connected.
- `ANALYTICS_ID` — only a real analytics ID, when one exists.

After the real Vercel domain exists, replace `example.invalid` in
`sitemap.xml` with that domain.

## Local preview

Serve the folder with any static server, e.g. `python3 -m http.server`
from inside this folder, then open `http://localhost:8000/`.
Note: `/api/*` OTP endpoints need Vercel (or `vercel dev`) to run —
on a plain static server they return unreachable and the frontend
falls back to PREVIEW OTP, which is the honest behaviour for preview.
