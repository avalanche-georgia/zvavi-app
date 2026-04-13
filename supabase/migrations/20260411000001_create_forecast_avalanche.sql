-- Add created_at to recent_avalanches for recency-based sorting
alter table recent_avalanches
  add column created_at timestamptz not null default now();

-- Back-fill existing rows using id order as a creation-time proxy
update recent_avalanches
  set created_at = now() - (
    (select max(id) from recent_avalanches) - id
  ) * interval '1 second';

-- Create junction table replacing the forecast_id FK
create table forecast_avalanche (
  forecast_id  bigint not null references forecasts(id) on delete cascade,
  avalanche_id bigint not null references recent_avalanches(id) on delete cascade,
  primary key (forecast_id, avalanche_id)
);

alter table forecast_avalanche enable row level security;

create policy "Public can read forecast_avalanche" on forecast_avalanche
  for select using (true);

create policy "Admins can manage forecast_avalanche" on forecast_avalanche
  for all using (auth.role() = 'authenticated');

-- Migrate existing relationships from recent_avalanches.forecast_id
insert into forecast_avalanche (forecast_id, avalanche_id)
select forecast_id, id from recent_avalanches where forecast_id is not null;

-- Make forecast_id nullable so new avalanches (not yet tied to a forecast via FK) can be inserted
-- The junction table is now the source of truth; this column is kept for rollback safety
alter table recent_avalanches alter column forecast_id drop not null;
