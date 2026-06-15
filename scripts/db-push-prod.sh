#!/bin/bash
set -eo pipefail

source "$(dirname "$0")/lib/log.sh"

echo ""
info "🚀 Pushing migrations to production..."
echo ""

[ ! -f .env.local ] && error ".env.local not found — run from project root"

SUPABASE_PROD_PROJECT_REF=$(grep '^SUPABASE_PROD_PROJECT_REF=' .env.local | cut -d '=' -f2 || true)
SUPABASE_STAGING_PROJECT_REF=$(grep '^SUPABASE_STAGING_PROJECT_REF=' .env.local | cut -d '=' -f2 || true)
export SUPABASE_ACCESS_TOKEN=$(grep '^SUPABASE_ACCESS_TOKEN=' .env.local | cut -d '=' -f2 || true)

[ -z "$SUPABASE_PROD_PROJECT_REF" ] || [ -z "$SUPABASE_STAGING_PROJECT_REF" ] && \
  error "SUPABASE_PROD_PROJECT_REF and SUPABASE_STAGING_PROJECT_REF must be set in .env.local"

[ -z "$SUPABASE_ACCESS_TOKEN" ] && \
  error "SUPABASE_ACCESS_TOKEN must be set in .env.local\n  Get your token at: https://supabase.com/dashboard/account/tokens"

info "Linking to production..."
supabase link --project-ref "$SUPABASE_PROD_PROJECT_REF" 2>&1 | sed '/^$/d; s/^/  /'
success "Linked to production"

echo ""
info "Pushing migrations..."
supabase db push 2>&1 | sed '/^$/d; s/^/  /'
success "Migrations pushed"

echo ""
info "Switching back to staging..."
supabase link --project-ref "$SUPABASE_STAGING_PROJECT_REF" 2>&1 | sed '/^$/d; s/^/  /'
success "Linked back to staging"

echo ""
printf "${GREEN}${BOLD}🎉 Done! Production is up to date.${RESET}\n"
echo ""