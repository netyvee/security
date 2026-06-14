# VIGIL — WEBSITE BUILD AND UPDATE SOP
# Version: 1.0 — June 2026
# Status: Draft — awaiting founder Q6/Q7 answers
# Applies to: All Vigil division websites
#
# This SOP governs how every page on every Vigil website
# is created, updated, reviewed, and protected.
# It replaces the original SOP Word document from May 2026.

---

## PART 1 — BEFORE YOU BUILD ANYTHING

### Pre-flight checklist (mandatory — every session)

Before writing a single line of code or content:

- [ ] Read CLAUDE.md
- [ ] Read DESIGN-SYSTEM.md
- [ ] Read DECISION-REGISTER.md
- [ ] Confirm correct repo: git remote -v
- [ ] Read every file you will edit
- [ ] grep for existing patterns before creating new components
- [ ] Confirm CRM enquiry URL for this division
- [ ] Confirm phone number for this division
- [ ] Confirm accent colour for this division

If any item above is unclear — stop and resolve before proceeding.

---

## PART 2 — PAGE TYPES AND THEIR RULES

### Type A: Service pages
Examples: /services/office-cleaning-london/, /manned-guarding-london/

Mandatory elements:
- H1: focus keyword in first 4 words, division name optional
- Meta title: 50-60 chars, focus keyword first
- Meta description: 145-155 chars, focus keyword in first 60 chars
- Canonical: absolute URL with trailing slash
- OG image: /api/og (both sites have this endpoint)
- H2s: minimum 4, question format encouraged
- Word count: minimum 600 words of crawlable text
- Internal links: minimum 3 (related services + borough hub)
- CTA: minimum 2 (above fold + end of page)
- CTA destination: CRM enquiry URL (never internal route)
- Schema: Service + LocalBusiness + FAQPage (if FAQ section)
- FAQ section: minimum 4 questions, direct answers
- Trust signals: DBS, directly employed, insurance, reg number
- Compliance: relevant regulatory references per division
- UK English: throughout, no US spellings

Forbidden on service pages:
- Specific response time guarantees
- Percentage claims (98%, 100% satisfaction)
- "32 boroughs" — use "Greater London"
- Domestic/residential language
- Agency language
- ACS, ISO, government approved claims
- Invented statistics

---

### Type B: Borough pages
Examples: /commercial-cleaning-westminster/, /commercial-security-camden/

Mandatory elements:
- H1: "[Service type] [Borough]" — exact match format
- Meta title: "[Service] [Borough] | [Division name]"
- Meta description: location-specific, mentions specific areas
- Canonical: absolute URL with trailing slash
- LocalBusiness schema with areaServed: specific borough
- Internal link: back to main service hub page
- Internal link: to 2-3 related borough pages
- CTA: primary + phone number (paired — local buyers call)
- Unique content: borough-specific (landmarks, postcodes, sectors)
- Word count: minimum 400 words unique to that borough
- No copy-paste from other borough pages

Forbidden on borough pages:
- Generic content identical to other borough pages
- "32 boroughs" claim
- Specific response time guarantees

---

### Type C: Blog posts
Examples: /blog/cdm-2015-welfare-cleaning/

Mandatory elements:
- H1: question or problem-focused, not keyword-stuffed
- Meta title: 50-60 chars
- Meta description: 145-155 chars
- Canonical: absolute URL
- Author: Vigil [Division] Services team
- Published date: accurate
- Word count: minimum 800 words
- CTA: outline/ghost style at end (not hard sell)
- CTA label: contextual to the article topic
- Internal links: minimum 2 to relevant service pages
- Schema: Article + FAQPage (if FAQ present)

Blog posts must be informational or regulatory — never promotional.
The CTA is soft. The content does the work.

---

### Type C: Homepage
Governed separately by DESIGN-SYSTEM.md.
Section order is fixed — never reorder.
Qualification flow must always be above fold.
SEO content must always be below the flow.
Do not edit the homepage without reading DESIGN-SYSTEM.md first.

---

## PART 3 — CONTENT RULES

### Voice and tone
B2B only. Never domestic. Never residential.
Direct. Professional. Authoritative but not arrogant.
UK English throughout (not US English).

Examples of wrong words:
- "home" → use "premises" or "site"
- "cleaner" → use "operative" or "officer"
- "guys" → use "team" or "operatives"
- "awesome" → not used
- "color" → "colour"
- "organize" → "organise"

### Regulatory language
Regulatory references are authority signals — never remove them.
COSHH, AWR, CDM, TUPE, PSIA, SIA, BS7858, GDPR — all permitted.
NHS references in healthcare content — permitted, keep them.
These citations make content citable by AI engines.

### Permitted claims per division

CLEANING:
✓ Directly employed operatives
✓ DBS-checked (Enhanced)
✓ COSHH 2002 compliant
✓ AWR 2010 compliant
✓ CDM 2015 compliant
✓ TUPE 2006 experience
✓ £10M public liability insurance
✓ Company Reg. 11756806

SECURITY:
✓ SIA-licensed officers
✓ DBS-checked (Enhanced)
✓ BS7858 vetted
✓ Directly employed officers
✓ £10M public liability insurance
✓ PSIA 2001 compliant
✓ Company Reg. 11756806

FORBIDDEN (both divisions):
✗ ACS Approved Contractor
✗ ISO [any number]
✗ Government approved
✗ Police approved
✗ Guaranteed response (with time)
✗ 500+ clients
✗ 98% satisfaction
✗ Award-winning
✗ "32 boroughs" or "all 32"

---

## PART 4 — TECHNICAL REQUIREMENTS

### Every page must have:
- Unique title tag (no duplicates across the site)
- Unique meta description (no duplicates)
- Canonical tag matching the page URL exactly
- OG title, description, and image
- At least one H1 (never more than one)
- H2s in logical hierarchy (never skip from H1 to H3)
- All images with alt text (descriptive, keyword-relevant)
- All images using Next.js <Image> component (not plain <img>)
- Internal links using Next.js <Link> component
- External links (CRM) using <a> with target="_blank" rel="noopener"

### Schema requirements per page type:
- Homepage: Organisation + LocalBusiness + FAQPage + BreadcrumbList
- Service page: Service + LocalBusiness + FAQPage
- Borough page: LocalBusiness with areaServed
- Blog post: Article + FAQPage (if has FAQ)

### SEO dependency order (MANDATORY — never violate):
1. Set redirects first
2. Set canonicals second (never point to a redirect source)
3. Update sitemap last (only include canonical URLs)
4. Cross-check: no canonical points to a redirect source
5. Cross-check: no redirect source appears in sitemap

---

## PART 5 — REVIEW AND APPROVAL

### What requires founder approval before publishing:
- New page (any type)
- Change to any URL slug
- Change to any phone number
- Change to any CTA destination
- Change to any section order
- Change to any nav or footer link
- Any new component or design pattern
- Any change to accent colours

### What Claude Code can publish without approval:
- Bug fixes restoring correct behaviour
- Spelling and grammar corrections
- Internal link additions
- Alt text additions
- Schema markup additions
- Meta description improvements (within length rules)
- FAQ additions to existing pages

### The review process:
1. Claude Code builds the change
2. Claude Code runs npm run build — must pass
3. Claude Code verifies the specific fix worked
4. Claude Code updates VIGIL-CHECKLIST.md
5. Claude Code commits with descriptive message
6. Vercel auto-deploys
7. Founder reviews the live URL

---

## PART 6 — PAGE PROTECTION RULES

### What must NEVER change between sessions:

ACROSS ALL SITES:
- Phone numbers (cleaning: 020 3098 6037 | security: 020 3973 8892)
- CTA destinations (always CRM enquiry URLs)
- Brand colours (navy base + division accent)
- Font pairing (DM Sans + Playfair Display)
- VG favicon design
- Homepage section order
- Company registration number (11756806)
- Registered address (Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU)
- Trading name statements in footer

CLEANING SITE SPECIFICALLY:
- /commercial-cleaning-[borough]/ URL pattern for all borough pages
- CTASection component defaults (CRM destination)
- Qualification flow component (never remove or replace)

SECURITY SITE SPECIFICALLY:
- /commercial-security-[borough]/ URL pattern
- SecurityQualificationFlow component (never remove or replace)
- SIA licensing language (never remove or weaken)

---

## PART 7 — COMMON MISTAKES TO AVOID

Learned from 6 months of this project:

1. NEVER use sed bulk replace — it creates malformed JSX
   Always edit files individually after reading context

2. NEVER generate code without reading existing code first
   Always grep for existing patterns before creating new ones

3. NEVER fix SEO in the wrong dependency order
   Redirects → canonicals → sitemap — always in this sequence

4. NEVER add content without checking FORBIDDEN TERMS list
   Run a grep for forbidden terms after every content session

5. NEVER mix division content across sites
   Cleaning content stays on cleaning site. Security on security.
   sameAs in schema is the only permitted cross-site reference.

6. NEVER leave a session without updating VIGIL-CHECKLIST.md
   The checklist is the memory between sessions.

7. NEVER start a session without reading CLAUDE.md
   It takes 2 minutes and prevents hours of rework.

8. NEVER commit without building first
   npm run build must pass before every git commit.

9. NEVER assume a fix worked — verify with a real HTTP request
   Not with php artisan internal handler which bypasses middleware.

10. NEVER create a new component without checking if one exists
    There are already duplicate footer components on the security site
    because this rule was not followed.

---

## PART 8 — QUALITY STANDARDS

Every page built to this SOP should score:
- Internal V8 auditor: 80+ before publishing
- Ahrefs errors on publication: zero
- WCAG 2.1 AA: no Level A failures
- Build: compiled successfully (no TypeScript errors)
- Mobile: all tap targets 44x44px minimum
- Input font-size: 16px minimum (iOS zoom prevention)

