-- C2S production — Supabase / Postgres schema for LIVE mode.
-- Run this in the Supabase SQL editor, in a NEW, EMPTY project.
-- No real data is included here. No keys or secrets are in this file.
-- The Vercel API functions use only the SUPABASE_URL + SUPABASE_SERVICE_KEY
-- env vars (set in Vercel, never committed) to talk to these tables via
-- Supabase's REST (PostgREST) API. Row Level Security is enabled below;
-- the service key bypasses RLS, which is why it must stay server-side only.

-- Users: main-site students, library members, and admin accounts.
-- role: 'main' = coaching / test-series user, 'library' = library member,
--       'admin' = staff/admin (reached only via the separate admin URL).
create table if not exists public.c2s_users (
  id uuid primary key default gen_random_uuid(),
  name text,
  mobile text,
  email text,
  role text not null check (role in ('main', 'library', 'admin')),
  registration_no text unique,
  created_at timestamptz not null default now()
);
create index if not exists idx_c2s_users_mobile on public.c2s_users (mobile);
create index if not exists idx_c2s_users_email on public.c2s_users (email);
create index if not exists idx_c2s_users_registration_no on public.c2s_users (registration_no);

-- One-time codes. Only the SHA-256 hash is stored, never the plain OTP.
-- expires_at is set by the API to created_at + 5 minutes; attempts is
-- incremented on each failed verify and the code is locked after 5 failures;
-- used is set to true on a successful verify so a code cannot be reused.
create table if not exists public.otp_codes (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('sms', 'whatsapp', 'email')),
  destination text not null,
  code_hash text not null,
  expires_at timestamptz not null,
  attempts integer not null default 0,
  used boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_otp_codes_destination on public.otp_codes (destination);
create index if not exists idx_otp_codes_created_at on public.otp_codes (created_at);
create index if not exists idx_otp_codes_expires_at on public.otp_codes (expires_at);

-- Library members. Column names mirror the fields already used by the
-- frontend library admission form, so no frontend field is lost in live mode.
create table if not exists public.library_members (
  id uuid primary key default gen_random_uuid(),
  registration_no text unique not null,
  name text,
  mobile text,
  email text,
  shift text,
  from_date date,
  to_date date,
  exam_pref text,
  shift_fees numeric not null default 0,
  locker_fees numeric not null default 0,
  total_fees numeric not null default 0,
  discount numeric not null default 0,
  paid numeric not null default 0,
  pending numeric not null default 0,
  payment_mode text,
  seat_status text,
  created_at timestamptz not null default now()
);
create index if not exists idx_library_members_registration_no on public.library_members (registration_no);
create index if not exists idx_library_members_mobile on public.library_members (mobile);

-- Test attempts. A submitted test is stored here in live mode so that
-- Given Tests, marks and solutions survive across devices. answers is
-- the list of chosen option indexes (null = skipped), matching the
-- frontend's local Given Tests format.
create table if not exists public.test_attempts (
  id uuid primary key default gen_random_uuid(),
  registration_no text,
  test_id text not null,
  title text,
  score integer not null default 0,
  total integer not null default 0,
  correct integer not null default 0,
  wrong integer not null default 0,
  skipped integer not null default 0,
  violations integer not null default 0,
  reason text,
  answers jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_test_attempts_registration_no on public.test_attempts (registration_no);
create index if not exists idx_test_attempts_test_id on public.test_attempts (test_id);

-- Keep these tables reachable only with the service key (server-side).
-- Do not add public anon policies for otp_codes: its hashes must never
-- be readable from the browser.
alter table public.c2s_users enable row level security;
alter table public.otp_codes enable row level security;
alter table public.library_members enable row level security;
alter table public.test_attempts enable row level security;
