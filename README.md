# Zvavi — Avalanche Forecasting App

Professional avalanche forecasting platform for backcountry skiing in Georgia (Caucasus). Provides daily danger assessments, avalanche problem analysis, weather station data, and member management for the Georgian avalanche forecasting team.

**Live site:** https://avalanche.ge

## Features

- Daily avalanche forecasts with hazard levels, problem breakdowns, and recent avalanche history
- Interactive forecast area maps (Leaflet/GeoJSON)
- Real-time weather station data
- Member verification via QR codes
- Bilingual: English and Georgian (ka)
- Admin panel for forecast authoring and member management

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **Supabase** — Postgres database + auth
- **TanStack Query 5** — server state & caching
- **Tailwind CSS v4** + **base-ui** / Radix UI / Headless UI
- **next-intl v4** — i18n (en/ka)
- **Zod v4** + **React Hook Form** — validation
- **Vercel** — hosting, analytics, speed insights

## Quick Start

```bash
cp .env.example .env.local   # fill in Supabase keys
pnpm install
pnpm dev                     # http://localhost:3000
```

Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Further Reading

- [FEATURES.md](./FEATURES.md) — detailed feature and domain model reference
- [CLAUDE.md](./CLAUDE.md) — developer & agent guide (patterns, conventions, commands)
