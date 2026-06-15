create extension if not exists pg_cron;

select cron.schedule(
  'expire-members',
  '0 0 * * *',
  $$
    update members
    set status = 'expired'
    where status = 'active'
      and expires_at is not null
      and expires_at < current_date
  $$
);
