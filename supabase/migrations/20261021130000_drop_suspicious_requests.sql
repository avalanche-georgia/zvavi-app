-- Old forecast URLs are now redirected in the proxy instead of logged
drop table if exists public.suspicious_requests;
