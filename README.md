# Alsama — "Lavinia's Session" Poll

A tiny, single-question polling app: *"How are you finding Lavinia's session?"*
Built for internal use at Alsama Project, meant to be shared as a link right
after a training session.

- Next.js (App Router, TypeScript)
- Supabase (Postgres + Realtime) for storing and streaming votes
- Vercel for hosting

## Local setup

```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase project values
npm run dev
```

## One-time Supabase setup (manual — not run by this repo)

1. Open the Supabase SQL editor for your project and run
   [`supabase/schema.sql`](./supabase/schema.sql). It creates the `votes`
   table with row-level security policies allowing anonymous insert + read.
2. Enable Realtime replication on the `votes` table: **Database → Replication**
   in the Supabase dashboard, toggle it on for `votes`. This can't be done
   from SQL or code.

## Environment variables

Set these in `.env.local` locally and in the Vercel project settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## How it works

- Voting inserts one row into `votes` and stores the choice in
  `localStorage` (`alsama_lavinia_poll_vote`) so a returning visitor on the
  same browser goes straight to results instead of voting again. This is a
  soft limit — clearing storage lets someone vote again, by design.
- The results view subscribes to Supabase Realtime and updates the bar
  chart live as other people vote, no refresh needed.
- Whichever option currently has the most votes is highlighted in pink; the
  rest stay grey, recomputed on every update.
