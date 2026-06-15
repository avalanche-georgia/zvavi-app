#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
RESET='\033[0m'

info()    { echo -e "${BOLD}$1${RESET}"; }
success() { echo -e "${GREEN}✓ $1${RESET}"; }
error()   { echo -e "${RED}✗ $1${RESET}"; exit 1; }
warn()    { echo -e "${YELLOW}⚠ $1${RESET}"; }