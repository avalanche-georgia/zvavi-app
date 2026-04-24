-- Rename avalanche_problem_type → avalanche_type (it is now shared by problems and recent_avalanches)
alter type avalanche_problem_type rename to avalanche_type;

-- Add 'unknown' value (only valid for recent_avalanches, not problems, but allowed at DB level)
alter type avalanche_type add value if not exists 'unknown';

-- Create trigger enum (camelCase values, snake_case type name)
create type avalanche_trigger as enum (
  'natural',
  'riderAccidental',
  'riderCut',
  'explosives',
  'vehicle',
  'unknown'
);

-- Add new columns to recent_avalanches (all nullable — back-filled below where required)
alter table recent_avalanches
  add column type          avalanche_type,
  add column quantity      smallint,
  add column location      text,
  add column latitude      numeric,
  add column longitude     numeric,
  add column trigger       avalanche_trigger,
  add column involvement   text,
  add column width         numeric,
  add column slab_depth    numeric;

-- Back-fill existing records and enforce NOT NULL on required fields
update recent_avalanches set trigger = 'unknown' where trigger is null;
alter table recent_avalanches alter column trigger set not null;

update recent_avalanches set type = 'unknown' where type is null;
alter table recent_avalanches alter column type set not null;

update recent_avalanches set size = 1 where size is null;
alter table recent_avalanches alter column size set not null;

update recent_avalanches set quantity = 1 where quantity is null;
alter table recent_avalanches alter column quantity set not null;