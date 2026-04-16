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

-- Add new columns to recent_avalanches (all nullable — no back-fill needed)
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