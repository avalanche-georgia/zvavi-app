-- Apply only after verifying forecast_avalanche junction table works correctly.
alter table recent_avalanches drop constraint recent_avalanches_forecast_id_fkey;
alter table recent_avalanches drop column forecast_id;
