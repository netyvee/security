#!/usr/bin/env bash
# Vercel "Ignored Build Step" wrapper — SEO governance gate (Phase 1).
#
# Set this as the project's Ignored Build Step (Settings → Git → Ignored Build
# Step) command:   bash scripts/vercel-ignore-build.sh
#
# Vercel exit-code semantics for the Ignored Build Step are INVERTED:
#   exit 0  → build is CANCELLED (ignored)
#   exit 1  → build PROCEEDS
#
# Our gate (scripts/seo-integrity-check.mjs) exits 0 on PASS and 1 on FAIL, so
# we invert: cancel the build when the gate FAILS, proceed when it PASSES.
#   gate passes (exit 0)  →  `&& exit 1`  →  build PROCEEDS
#   gate fails  (exit 1)  →  `|| exit 0`  →  build CANCELLED
#
# The check reads source only (no node_modules / no build needed) and uses Node
# built-ins, so it runs in the Ignored-Build-Step phase before install.
# The GitHub Actions workflow (.github/workflows/seo-check.yml) remains the
# authoritative, human-readable gate; this makes Vercel itself refuse the build.

node scripts/seo-integrity-check.mjs --config seo-governance.config.json && exit 1 || exit 0
