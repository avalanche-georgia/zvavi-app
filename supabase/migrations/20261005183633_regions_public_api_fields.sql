-- Region metadata for the public bulletin API (CAAML v6).
--
-- caaml_region_id: self-assigned region code (NOT an official EAWS code).
--   Never change a code once published — partners key on it.
-- name_en: public area name in the bulletins.
-- elevation_low_m / elevation_high_m: band thresholds in metres, multiples of
--   100 (the CAAML schema's elevation regex doesn't enforce 100 m resolution,
--   so we do it here).
--
-- The columns stay nullable: a region without metadata is simply not published
-- by the API (inventing codes or thresholds for a public feed is worse than
-- leaving the region out). All four are set together or not at all.
--
-- Additive and safe to re-run; safe to apply before the code that reads it.

alter table public.regions
  add column if not exists caaml_region_id text,
  add column if not exists name_en text,
  add column if not exists elevation_low_m smallint,
  add column if not exists elevation_high_m smallint;

alter table public.regions
  drop constraint if exists regions_caaml_region_id_key,
  drop constraint if exists regions_caaml_region_id_format,
  drop constraint if exists regions_name_en_not_empty,
  drop constraint if exists regions_elevation_thresholds_valid,
  drop constraint if exists regions_public_api_fields_complete;

alter table public.regions
  add constraint regions_caaml_region_id_key unique (caaml_region_id),
  add constraint regions_caaml_region_id_format
    check (caaml_region_id ~ '^[A-Z]{2}(-[A-Z0-9]+)*$'),
  add constraint regions_name_en_not_empty check (btrim(name_en) <> ''),
  add constraint regions_elevation_thresholds_valid check (
    elevation_low_m > 0
    and elevation_low_m < elevation_high_m
    and elevation_low_m % 100 = 0
    and elevation_high_m % 100 = 0
  ),
  add constraint regions_public_api_fields_complete check (
    num_nulls(caaml_region_id, name_en, elevation_low_m, elevation_high_m) in (0, 4)
  );

update public.regions
set caaml_region_id = 'GE-MM-01',
    name_en = 'Gudauri',
    elevation_low_m = 2000,
    elevation_high_m = 2600
where id = 'gudauri' and caaml_region_id is null;
