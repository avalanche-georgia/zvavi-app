-- Table for logging suspicious requests (old forecast URL formats)
create table if not exists suspicious_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  path text not null,
  ip_address text,
  user_agent text,
  referer text,
  country text,
  city text
);

-- Index for querying by time and IP
create index idx_suspicious_requests_created_at on suspicious_requests(created_at desc);
create index idx_suspicious_requests_ip on suspicious_requests(ip_address);

-- Enable RLS but allow inserts from anon (middleware uses anon key)
alter table suspicious_requests enable row level security;

-- Policy: allow insert from anyone (anon), but only service_role can read
create policy "Allow anonymous inserts" on suspicious_requests
  for insert to anon with check (true);

create policy "Only service role can read" on suspicious_requests
  for select to service_role using (true);

-- Auto-cleanup: delete records older than 90 days
-- Note: pg_cron not available on Free plan
-- Run this manually or via external cron (e.g., GitHub Actions):
-- DELETE FROM suspicious_requests WHERE created_at < now() - interval '90 days';