#!/bin/bash
set -eo pipefail

source "$(dirname "$0")/lib/log.sh"

# Read-only: connects to staging and prod with their own DB password and lists
# each one's migrations (local vs remote). Changes nothing; ends linked to staging.

[ ! -f .env.local ] && error ".env.local not found — run from project root"

readEnv() { grep "^$1=" .env.local | cut -d '=' -f2- || true; }

export SUPABASE_ACCESS_TOKEN=$(readEnv SUPABASE_ACCESS_TOKEN)
STAGING_REF=$(readEnv SUPABASE_STAGING_PROJECT_REF)

trap 'supabase link --project-ref "$STAGING_REF" > /dev/null 2>&1 || true' EXIT

checkProject() {
  local name=$1 ref password
  ref=$(readEnv "SUPABASE_${name}_PROJECT_REF")
  password=$(readEnv "SUPABASE_${name}_DB_PASSWORD")

  [ -z "$ref" ] && error "SUPABASE_${name}_PROJECT_REF must be set in .env.local"
  [ -z "$password" ] && error "SUPABASE_${name}_DB_PASSWORD must be set in .env.local"

  echo ""
  info "$name ($ref)"
  supabase link --project-ref "$ref" > /dev/null 2>&1
  if ! output=$(SUPABASE_DB_PASSWORD=$password supabase migration list 2>&1); then
    printf '%s\n' "$output" | sed '/^$/d; s/^/  /'
    error "$name: could not connect — check SUPABASE_${name}_DB_PASSWORD"
  fi
  printf '%s\n' "$output" | sed '/^$/d; s/^/  /'
  success "$name password works"
}

checkProject STAGING
checkProject PROD
echo ""
