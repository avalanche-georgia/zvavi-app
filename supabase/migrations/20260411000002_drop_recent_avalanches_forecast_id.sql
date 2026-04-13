alter table recent_avalanches drop constraint if exists recent_avalanches_forecast_id_fkey;
alter table recent_avalanches drop column if exists forecast_id;
