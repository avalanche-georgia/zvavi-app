#!/bin/bash
set -eo pipefail

source "$(dirname "$0")/lib/log.sh"

echo ""
info "🚀 Pushing migrations to production..."
echo ""

[ ! -f .env.local ] && error ".env.local not found — run from project root"

SUPABASE_PROD_PROJECT_REF=$(grep '^SUPABASE_PROD_PROJECT_REF=' .env.local | cut -d '=' -f2- || true)
SUPABASE_STAGING_PROJECT_REF=$(grep '^SUPABASE_STAGING_PROJECT_REF=' .env.local | cut -d '=' -f2- || true)
export SUPABASE_ACCESS_TOKEN=$(grep '^SUPABASE_ACCESS_TOKEN=' .env.local | cut -d '=' -f2- || true)

[ -z "$SUPABASE_PROD_PROJECT_REF" ] || [ -z "$SUPABASE_STAGING_PROJECT_REF" ] && \
  error "SUPABASE_PROD_PROJECT_REF and SUPABASE_STAGING_PROJECT_REF must be set in .env.local"

[ -z "$SUPABASE_ACCESS_TOKEN" ] && \
  error "SUPABASE_ACCESS_TOKEN must be set in .env.local\n  Get your token at: https://supabase.com/dashboard/account/tokens"

trap 'supabase link --project-ref "$SUPABASE_STAGING_PROJECT_REF" > /dev/null 2>&1 || true' EXIT

info "Linking to production..."
run_cmd supabase link --project-ref "$SUPABASE_PROD_PROJECT_REF"
success "Linked to production"

echo ""
info "Pushing migrations..."
run_cmd supabase db push
success "Migrations pushed"

echo ""
success "🎉 Done! Production is up to date."
echo ""
