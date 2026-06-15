#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
RESET='\033[0m'

info()    { printf "${BOLD}%b${RESET}\n" "$*"; }
success() { printf "${GREEN}✓ %b${RESET}\n" "$*"; }
error()   { printf "${RED}✗ %b${RESET}\n" "$*"; exit 1; }
warn()    { printf "${YELLOW}⚠ %b${RESET}\n" "$*"; }
run_cmd() { "$@" 2>&1 | sed '/^$/d; s/^/  /'; }
