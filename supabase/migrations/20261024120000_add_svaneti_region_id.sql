-- Svaneti was added to staging by hand; this records it. Kept apart from the
-- seed because a new enum value can't be used in the transaction that adds it.
alter type public.region_id add value if not exists 'svaneti';
