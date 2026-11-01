# C2S — College to Service (GitHub / Vercel static version)

C2S — College to Service, Patrapada, Bhubaneswar.
NH-16, opposite Sani Mandir, Patrapada, Bhubaneswar, Odisha 751019.
Phones: 9777481909 / 9658177712. Tagline: "Your Selection Our Mission".

A coaching centre with a library, later its own institute — Adda247/Testbook-style.

## What this is

A **static site with no build step**: plain HTML/CSS/JS only.
It is the GitHub-ready, Vercel-deployable version of the C2S platform,
separate from the hosted fullstack version. It works as a demo/preview and
as the codebase that can later be connected to a real backend/database.

Pages:
- `index.html` — Home, Exams, Test Series, Batches/Classes, Blog, Notices,
  Help/Contact, Main Login. The Library is reached **only via the Library
  button** on the main site.
- `library.html` — the Library section only: separate Library Login,
  "C2S Library – Online Admission Form" / "C2S Premium Library" /
  "Quick Admission", seat map, members, income/expense ledger, dashboard.
- `styles.css`, `app.js`, `exams.js`, `library.js`, `sitemap.xml`, `robots.txt`

## Data — read this first

**All data in this version is browser-local (localStorage) only.**
Main-site accounts/tests and Library accounts/members are stored under
separate keys and never mix. This is clearly labelled in the UI as local
demo data **until an external database is connected later**.

That means: no real user accounts, no shared data between browsers/devices,
no live backend. When the external database is connected later, replace the
localStorage calls in `app.js` / `library.js` with real API calls — do not
treat localStorage data as production data.

## What is NOT live here (no secrets, nothing invented)

- **Cashfree** is the chosen payment provider, shown as a **settings
  placeholder only**. No API keys, merchant ID, sandbox/production choice
  or live payment link is included or invented.
- **WhatsApp / Mail connections are placeholders only, not live.**
  Welcome messages are shown as queued / not-connected — never fake-sent.
- **No invented dates, fees or notification dates** for exams. Where a
  detail is unconfirmed, the site says to check the official notification.
- Per-shift library prices are staff-configurable. Only **Afternoon
  ₹800** is a known screenshot example — it is not hardcoded as the price
  for all shifts; other shifts start unset (0) until staff set them.
- Batches / Classes is a placeholder section for videos to be added later.
  No schedule is invented.
- Analytics ID is an empty configurable placeholder (`window.C2S_ANALYTICS_ID = ""`
  in `app.js`). Paste a real ID only when one exists.
- In `sitemap.xml`, replace `example.invalid` with the real deployed
  domain after Vercel deploy.

## Test Series — exam mode (static version)

- A submitted test moves out of Available Tests into Given Tests with
  marks, correct/wrong/skip and a solutions review, and cannot be retaken
  (checked in this browser's localStorage).
- Exam mode: instructions + declaration first, then a fullscreen locked
  window. Tab-switch / minimise / fullscreen-exit warnings, 3 violations
  auto-submit, time-up auto-submit, exit/submit only via confirmation.
- Calculator: BANK tests show an on-screen calculator; SSC, Railway,
  OSSC, OSSSC, UPSC and others show no calculator, only a rough scratch
  pad. The flag is staff-configurable per test in `app.js` (`calculatorAllowed`).
- Note: a browser cannot 100% lock a whole device — the lock here is the
  strongest a browser page can enforce (fullscreen, visibility/blur
  detection, copy/paste blocking).

## Deploy on Vercel — exact steps

1. Push this folder to a GitHub repository (parent will push after
   verifying these files — this build does **not** push itself).
2. In Vercel: **Add New → Project → Import** that GitHub repository.
3. **Framework Preset: Other** (Static).
4. **Build Command: (leave empty / none).**
5. **Output Directory: (leave as default — do not change).**
6. **Deploy.** No environment variables are required for this static version.
   Do not add Cashfree / WhatsApp / mail secrets here — those integrations
   are placeholders until a real backend is connected.

## Local preview

Open `index.html` in a browser, or serve the folder with any static server,
e.g. `python3 -m http.server` from inside this folder, then open
`http://localhost:8000/`.
