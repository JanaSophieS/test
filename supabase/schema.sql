-- Alsama "Lavinia's Session" poll
-- Run this once in the Supabase SQL editor. Claude Code cannot execute this
-- against the live project — it must be run manually.

create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  option text not null check (option in ('amazing', 'wonderful', 'mumtaz', 'mnee7')),
  created_at timestamptz not null default now()
);

alter table public.votes enable row level security;

create policy "anyone can insert a vote"
  on public.votes for insert
  to anon
  with check (true);

create policy "anyone can read votes"
  on public.votes for select
  to anon
  using (true);

-- After running this, also enable Realtime replication on `votes`:
-- Supabase dashboard -> Database -> Replication -> toggle it on for this table.
-- That step can't be done from SQL/code and must be done manually.
