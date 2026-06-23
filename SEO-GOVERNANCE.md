# SEO-GOVERNANCE.md — Vigil Security website

**This is the mandatory read for every session (human or AI) that touches this repo.**
It is enforced by `scripts/seo-integrity-check.mjs`, run in CI on every push
(`.github/workflows/seo-check.yml`). The full architecture is in netyvee/app
`AUDIT/WEBSITE-GOVERNANCE/` (docs 05, 06, 09).

Site: **security** · Domain: **https://security.vigilservices.co.uk** ·
Phone (the ONLY correct number for this site): **020 3973 8892** / `+442039738892`.
`020 3973 8887` is permanently forbidden. The cleaning number `020 3098 6037` must
never appear on this site.

---

## 1. Mandatory pre-session protocol
Before making ANY change:
1. Read this file and `CLAUDE.md` (and the app/CRM `CLAUDE.md` if doing CRM-linked work).
2. Read `types/page-templates.ts` if you will touch image slots or SEO blocks.
3. **Run the gate and confirm it is clean:**
   `node scripts/seo-integrity-check.mjs --config seo-governance.config.json`
   If it is not clean, fixing the existing findings is the session's first job —
   do not add new work on top of a red gate.
4. Record the baseline (page count + `seo-integrity-report.json` result).
5. Declare your scope explicitly (see §4).

## 2. Mandatory post-session protocol
1. `node scripts/seo-integrity-check.mjs` → confirm clean (exit 0).
2. `npm run build` → confirm success (never trust Vercel before a local/CI green build;
   the Session-37 slot-contract break shipped because this step was skipped).
3. Compare the SEO baseline before vs after — no unintended regressions.
4. Commit only if both pass. Commit per fix; build before commit.
5. Record the outcome in `AUDIT/AI-SESSION-LOG.md` (date, scope, pages changed, checks,
   baseline delta, commit SHAs).

## 3. The gate rules
**HARD blocks (deploy must not proceed — exit 1):**
- `H_MISSING_CANONICAL` — a content page declares no canonical.
- `H_CANONICAL_FORM` — canonical ≠ `canonicalBase + route` with no trailing slash
  (this site is `trailingSlash:false`; canonicals must have NO trailing slash).
- `H_CANONICAL_REDIRECT` — a canonical points at a `redirect()` source.
- `H_SITEMAP_CANONICAL` — the sitemap URL set ≠ the indexable canonical set.
- `H_NAP_PHONE` — a forbidden phone number appears in the source. The only number
  permitted in this repo is **020 3973 8892**. `020 3098 6037` (cleaning) and
  `020 3973 8887` (the historically-wrong number) are forbidden and block the deploy.

**SOFT warnings (do not block on their own; fix when you can):**
- `S_NO_DESCRIPTION`, `S_DUPLICATE_TITLE`, `S_SCORE_DROP` (page SEO score dropped >10
  vs `.seo-baseline.json`).

## 4. Session scope control
Declare a scope at session start and stay in it. Cross-scope changes need a new session.
- `fix-canonicals` → canonical strings, redirects only.
- `add-images` → the `images` blocks (via the CRM Page Manager), image hosts only.
- `fix-nap` → the NAP value only.
- `content-edit` → body copy, FAQs, headings only.
- `schema-fix` → `lib/schema/*`, layout JSON-LD only.

## 5. Single source of truth
- **Never hand-type a canonical** — it must equal `canonicalBase + route` (no trailing
  slash). Relative `/path` canonicals are acceptable only if they carry no trailing slash.
- **Never hand-type the phone number** in a way that could drift — this site is
  020 3973 8892 only; never the cleaning number or the wrong 8887.
- **No cross-division links / `sameAs` / image hosts.** The four Vigil businesses are
  independent and never link to each other. (Known follow-up: remove the
  `cleaning.vigilservices.co.uk` entries in image `remotePatterns` and Organization
  `sameAs` — flagged in netyvee/app AUDIT/WEBSITE-GOVERNANCE/02.)
- The CRM owns the `// IMAGES BLOCK` (and, later, `// SEO BLOCK`) regions of `page.tsx`.
  Do not hand-edit them. After any CRM image apply, build the site locally before
  trusting Vercel (the Session-37 slot-contract lesson).

## 6. Content & imagery rules
- **B2B only. UK English. No domestic/residential or agency language.** Target buyer:
  facilities/property/construction/event managers.
- **Never use orange** for the security site (brand: navy #0a1628 + teal #4ecdc4).
- **Forbidden claims:** ACS Approved Contractor; ISO [any]; government/police approved;
  specific response-time minutes; "32 boroughs"/"all 32" (use "Greater London"); 500+
  clients; 98% satisfaction; award-winning; "guaranteed" (service quality); `&amp;` in JSX.
- **Permitted claims (security):** SIA-licensed officers; DBS Enhanced; BS7858 vetted;
  directly employed officers; £10M public liability; Private Security Industry Act 2001
  compliant; "15-minute response to every client query"; Company Reg. 11756806.
- **EEAT imagery:** real photography only on trust/team/"our officers"/"our premises"
  slots. AI imagery is permitted on content/step/borough/og slots (recorded as
  ai-generated). AI-drafted copy goes to review — never auto-publish.

## 7. Override mechanism
A commit message containing `[seo-override: reason]` downgrades the OVERRIDABLE hard
blocks (canonical/sitemap rules) for **that commit only** — it is single-use; the next
commit without the flag re-blocks. Every override is logged to `AUDIT/OVERRIDE-LOG.md`.
**`H_NAP_PHONE` and build failures are NEVER overridable.** Do not use an override as a
standing bypass — fix the issue in the next PR.

## 8. Evidence to close a task
- SEO score before/after; `git diff --stat`; CI green; and a file:line verification of
  the specific fix (not "I fixed the canonical" but "canonical for /x changed from … to …,
  verified in file:line; gate now passes").
