create extension if not exists pgcrypto;

create table if not exists public.contact_queries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) >= 2),
  email text not null check (position('@' in email) > 1),
  company text,
  details text not null check (char_length(trim(details)) >= 10),
  created_at timestamptz not null default now()
);

create index if not exists contact_queries_created_at_idx
  on public.contact_queries (created_at desc);

alter table public.contact_queries enable row level security;

drop policy if exists "Allow public insert contact queries" on public.contact_queries;
create policy "Allow public insert contact queries"
  on public.contact_queries
  for insert
  to anon, authenticated
  with check (true);
