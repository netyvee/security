# VIGIL SERVICES — PROJECT CONTEXT
# Version: 2.0 — June 13 2026
# Read this file at the start of EVERY session.
# Then read DESIGN-SYSTEM.md and SOP-WEBSITE-BUILD.md.
# This file is the index. Those files are the detail.

---

## MANDATORY — SEO GOVERNANCE GATE (read before any change)

Before making ANY change to this repo:
1. Read SEO-GOVERNANCE.md (the binding rules for this site).
2. Run `node scripts/seo-integrity-check.mjs --config seo-governance.config.json`
   and CONFIRM IT EXITS 0 (clean). If it is not clean, fixing the existing
   findings is the first task — do not add new work on top of a red gate.
3. After your change, run the check again AND `npm run build`; commit only if both pass.

The check is enforced in CI on every push (.github/workflows/seo-check.yml): a wrong
phone number (this site = 020 3973 8892 only; 020 3973 8887 is permanently forbidden),
a canonical→redirect conflict, a sitemap/canonical mismatch, or a missing canonical
BLOCKS the deploy. NAP and build failures are never overridable.

---

## COMPANY

Vigil Services Ltd
Company Registration: 11756806
Registered address: Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU
Registered in England and Wales

---

## THE FOUR BUSINESSES

These are four INDEPENDENT businesses sharing one legal entity.
They do not cross-refer. They do not cross-sell.
They do not link to each other on their websites.
Treat each as a completely separate business.

| Business | Trading name | Market |
|----------|-------------|--------|
| Cleaning | Vigil Cleaning Services | B2B commercial cleaning, London |
| Security | Vigil Security Services | B2B security services, London |
| Care | Vigil Care Services | Domiciliary care, London (deferred) |
| Staffing | Vigil Care Staffing | Care sector staffing, London (deferred) |

Each business:
- Has its own website (separate repo, separate Vercel project)
- Has its own phone number
- Has its own enquiry URL
- Has its own target buyer
- Has its own regulatory environment
- Operates completely independently

NEVER mix content between businesses.
NEVER suggest cross-divisional links on websites.
NEVER treat them as divisions of one company in content.
The only shared element visible to users is the company
registration number and registered address in the footer.

---

## PHONE NUMBERS — NEVER CHANGE

Cleaning:  020 3098 6037
Security:  020 3973 8892

The security number has been corrected four times.
020 3973 8887 is WRONG. 020 3973 8892 is CORRECT.
Commit this before touching any file on the security site.

---

## BRAND — CONFIRMED FINAL

Both cleaning AND security websites:
- Same colour palette: navy #0a1628 + teal #4ecdc4
- Same layout structure (section order, spacing, patterns)
- Same font pairing: DM Sans (body) + Playfair Display (headings)
- Same VG favicon design (navy square, VG monogram, teal circle arc)

Do NOT use different accent colours per division on websites.
Do NOT mention orange for the security site.
The security site uses teal #4ecdc4 — same as cleaning.

Read DESIGN-SYSTEM.md for full visual specification.

---

## REPOSITORIES

| Business | Repo | Branch | Live URL |
|----------|------|--------|---------|
| Cleaning | netyvee/vigil-cleaning | main | cleaning.vigilservices.co.uk |
| Security | netyvee/security | main | security.vigilservices.co.uk |
| CRM | netyvee/app | master | app.vigilservices.co.uk |

Local paths:
- Cleaning: C:\laragon\www\vigil-cleaning
- Security: C:\laragon\www\security
- CRM: C:\laragon\www\app

Always verify repo with git remote -v before starting.
STOP if wrong repo.

---

## DEPLOYMENT

Next.js sites: Auto-deploy via Vercel on git push to main.
Laravel CRM: Deploy via CPANEL-DEPLOY-COMMANDS.txt.
GitHub Actions CI: GREEN (8 tests, 19 assertions).

---

## CRM ENQUIRY URLS — CONFIRMED LIVE

Cleaning: https://app.vigilservices.co.uk/enquire/cleaning
Security: https://app.vigilservices.co.uk/enquire/security
Care:     https://app.vigilservices.co.uk/enquire/care
Staffing: https://app.vigilservices.co.uk/enquire/staffing

All CTAs on all websites must link to these URLs.
NEVER link to /get-started, /request-a-quote, /book-call.
These routes are deprecated.

The qualification flow links DIRECTLY to the CRM.
It does not collect data first — it redirects immediately.

---

## CORE USP — USE IN ALL CONTENT

"Vigil responds to every client query within 15 minutes."

Positioning: Speed + value + reliability = operations partner.
Not a cleaning company. Not a security company.
A dependable operations partner.

This is specific, verifiable, and true.
Use it in hero sections, Why Vigil sections, and content.
Do not dilute it with generic claims.

---

## PERMITTED CLAIMS

Cleaning:
✓ Directly employed operatives
✓ DBS checked (Enhanced)
✓ COSHH 2002 compliant
✓ AWR 2010 compliant
✓ CDM 2015 compliant
✓ TUPE 2006 experience
✓ £10M public liability insurance
✓ 15-minute response to every client query
✓ Company Reg. 11756806

Security:
✓ SIA-licensed officers
✓ DBS checked (Enhanced)
✓ BS7858 vetted
✓ Directly employed officers
✓ £10M public liability insurance
✓ Private Security Industry Act 2001 compliant
✓ 15-minute response to every client query
✓ Company Reg. 11756806

---

## FORBIDDEN — NEVER USE

Content forbidden on any Vigil site:
✗ ACS Approved Contractor
✗ ISO [any number]
✗ Government approved / police approved
✗ Specific response time in minutes (e.g. "20 minutes")
✗ "32 boroughs" or "all 32" — use "Greater London"
✗ 500+ clients
✗ 98% satisfaction
✗ Award-winning
✗ Guaranteed (in service quality context)
✗ &amp; in JSX — use & or {'&'}
✗ Cross-divisional links on websites
✗ Domestic / residential language
✗ Agency language

---

## CONTENT RULES

Target buyer: facilities manager, property director,
              construction manager, event organiser.
B2B only. Never domestic. Never residential.
UK English throughout (not US English).
Minimum contract: 2 visits/week, 4 hours/visit, 3-month rolling.
Regulatory language is authority — never remove it.
NHS references in healthcare content — keep them.
Founder reviews all content before publishing.

---

## SITE ARCHITECTURE

Cleaning (44 pages):
- Homepage: qualification flow above fold + SEO content below
- Borough pages: /commercial-cleaning-[borough]/
- Blog: 3 posts (CDM 2015, CQC, TUPE)

Security (41 pages):
- Homepage: qualification flow above fold + SEO content below
- Borough pages: /commercial-security-[borough]/
- Blog: 3 posts (SIA, BS7858, Licensing Act)

Both sites share same section order (see DESIGN-SYSTEM.md).
Qualification flow is the primary conversion mechanism.
Never remove or replace the qualification flow.

---

## KEY COMPONENTS

Cleaning:
- QualificationFlow.tsx — 14-screen flow (primary conversion)
- CTASection.tsx — reusable CTA with CRM links
- MobileBookingButton.tsx — sticky mobile CTA
- Nav.tsx — navigation
- Footer.tsx — primary footer (used in layout.tsx)
- SiteFooter.tsx — legacy, review for consolidation

Security:
- SecurityQualificationFlow.tsx — multi-screen flow
- components/shared/CTASection.tsx — reusable CTA
- components/shared/Nav.tsx — navigation
- components/Footer.tsx — primary footer
- components/shared/Footer.tsx — may be duplicate, check

---

## CREDENTIALS STATUS — JUNE 2026

| Credential | Cleaning | Security |
|-----------|---------|---------|
| ANTHROPIC_API_KEY | ✅ Active + running | ❓ Check Vercel |
| GITHUB_TOKEN | ✅ Active | ❌ Needs adding |
| PAGESPEED_API_KEY | ❌ Needs adding | ❌ Needs adding |
| GSC credentials | ❌ Not set up | ❌ Not set up |
| RESEND_API_KEY | ✅ Active | ✅ Active |

Google Cloud project: elegant-hope-453720-r1
GBP: Claimed for both divisions ✅

---

## CRM STATUS — JUNE 2026

Confirmed working:
- CI/CD pipeline via GitHub Actions ✅
- 5 real clients in production ✅
- shift_types 500 error FIXED ✅
- Scheduling pages unblocked ✅
- Session 5 fixes deployed ✅

Outstanding:
- Sessions 6-9 not yet run
- Enquiry funnels unverified end-to-end
- Client signing portal unverified end-to-end
- June 8 bugs: Lead 404, sidebar duplication,
  inactive buttons — all on Session 8 list

CRM client portal shows specific trading name
the client hired (not generic "Vigil Services").

---

## OUTSTANDING ISSUES — WEBSITES

Both sites:
- No skip navigation link (WCAG Level A violation)
- Services dropdown missing from desktop nav
- Qualification flow state not persisted (sessionStorage)
- No sector strip on homepage
- Homepage rebuild in progress

Cleaning specific:
- Two footer components — consolidate
- QualificationFlow inputs 14-15px — iOS zoom bug
- Apple touch icon needs PNG version
- Canonical/sitemap conflicts (34 pages)
- 7 broken images

Security specific:
- No favicon
- Fonts not loaded via next/font
- Tabler Icons CDN render-blocking link in layout
- btn-primary contrast fail
- FloatingCTA hidden on homepage
- Nav missing Blog, FAQ, Locations links

---

## GOVERNANCE DOCUMENTS

Read these before the relevant type of work:

| Document | Read before |
|----------|------------|
| DESIGN-SYSTEM.md | Any component or visual change |
| SOP-WEBSITE-BUILD.md | Any page creation or update |
| VIGIL-CHECKLIST.md | Every session (progress tracker) |
| REVIEW/REVIEW-SUMMARY.md | SEO or content sessions |

---

## MANDATORY RULES — NO EXCEPTIONS

1. Read CLAUDE.md, DESIGN-SYSTEM.md before any component work
2. Read SOP-WEBSITE-BUILD.md before any page work
3. Verify repo with git remote -v — STOP if wrong
4. Read every file before editing it
5. grep before creating — never duplicate components
6. npm run build before every commit
7. Commit per fix — not one giant commit
8. Never use sed bulk replace — edit files surgically
9. SEO order: redirects → canonicals → sitemap
10. Never remove qualification flow component
11. Never add cross-divisional links to websites
12. Never use orange for security site
13. Never claim 32 boroughs — use Greater London
14. Never add specific response time figures
15. Update VIGIL-CHECKLIST.md after every session

---

## SESSION START CHECKLIST

- [ ] Read CLAUDE.md (this file)
- [ ] Read DESIGN-SYSTEM.md (if touching components)
- [ ] Read SOP-WEBSITE-BUILD.md (if touching pages)
- [ ] Read VIGIL-CHECKLIST.md (current progress)
- [ ] Verify repo: git remote -v
- [ ] Read files you will edit
- [ ] grep for existing patterns before creating new ones
- [ ] Confirm CRM URL for this division
- [ ] Confirm phone number for this division
