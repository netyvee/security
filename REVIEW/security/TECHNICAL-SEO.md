# Technical SEO Review — Security Site
**Site:** security.vigilservices.co.uk
**Repo:** netyvee/security
**Reviewer role:** Senior Technical SEO Engineer
**Date:** 2026-06-10
**Score:** 63 / 100

---

## Executive Summary

The security site is more consistent than the cleaning site in its URL structure (all boroughs at root level, all services at root level — no nesting anomalies). However it carries one Critical bug that must be fixed before any other work: the wrong phone number is hardcoded in the shared CTA component, meaning every CTA button on every page of the site displays the cleaning phone number. This is a NAP failure affecting conversion and entity signals simultaneously. Additionally, the Organisation schema is absent from the root layout, schema types are not being detected in the vocabulary audit (possible rendering issue), and llms.txt contains the wrong phone number.

---

## Findings

### F1 — CRITICAL: Wrong phone number in CTA component
**Impact: Critical | Confidence: HIGH**

`components/shared/CTASection.tsx:17`:
```tsx
outlineLabel = "Call us: 020 3098 6037",
```

`020 3098 6037` is the **cleaning site** phone number. The security site phone is `020 3973 8887`.

This affects every page that renders `CTASection` — which is most pages. Consequences:
1. Callers reach the wrong team
2. NAP (Name, Address, Phone) is inconsistent — Google cross-references phone numbers across the web; a phone mismatch signals unreliable entity data
3. Any citation built from the security site's CTA will carry the wrong phone
4. If a user saves the phone number from a security page, they reach cleaning support

**Fix:** Change the default in `CTASection` to `020 3973 8887`. Immediate priority — this is a live conversion and entity error.

---

### F2 — Wrong phone number in llms.txt
**Impact: Critical | Confidence: HIGH**

`public/llms.txt` line 7:
```
Phone: 020 3098 6037 / +44 2030 986037
```

This is the cleaning phone number. AI engines reading llms.txt to understand the security company will associate it with the wrong contact. This contaminates the entity record in AI knowledge bases.

**Fix:** Update to `020 3973 8887 / +44 2039 738887`.

---

### F3 — Schema vocabulary returns empty from grep
**Impact: High | Confidence: MEDIUM**

```bash
grep -roh '"@type":[[:space:]]*"[^"]*"' app/ --include="*.tsx" | sort -u
# Returns: (empty)
```

Yet inline JSON-LD schema IS present on individual pages (confirmed in `app/cctv-monitoring-london/page.tsx:74–84` and `app/commercial-security-barnet/page.tsx:79–98`). The grep failure suggests the schema uses single-quote keys (`'@type': 'Service'`) rather than double-quote JSON format. This is not a rendering issue — the schema is likely outputting correctly to the browser.

However: the pattern `'@type': 'LocalBusiness'` vs `"@type": "LocalBusiness"` matters for JSON-LD validity. JSON requires double quotes. Single-quote schema in a `JSON.stringify()` call may output correctly (JavaScript objects with JS keys), but this should be verified with Google's Rich Results Test.

**Confirmed schema in use** (from source reading):
- `Service`
- `LocalBusiness`
- `PostalAddress`
- `City`
- `BreadcrumbList` (via `buildBreadcrumbSchema`)
- `FAQPage` (via `buildFAQSchema`)

**Missing:**
- `Organization` (with legalName, company reg, sameAs social links)
- `SecurityService` (more specific than Service)
- `WebPage`
- `Article` (on blog posts)

---

### F4 — Organisation schema absent from root layout
**Impact: High | Confidence: HIGH**

No `Organization` schema in `app/layout.tsx`. This means every page on the security site produces no legal entity signal. Google cannot confidently associate security.vigilservices.co.uk with Vigil Services Ltd (reg: 11756806). With 1 instance of the company reg number found in the entire codebase, entity disambiguation is at risk.

---

### F5 — 2 pages missing canonical, 2 missing OG
**Impact: Medium | Confidence: HIGH**

```
Pages missing canonical: 2
Pages missing OG: 2
```

Files not identified in the audit (require follow-up grep). Most likely candidates: admin and portal pages. If these are the only 2, the issue is minor. If any content pages are missing canonicals, risk of duplicate content indexation increases.

---

### F6 — Security redirects: 18 source URLs
**Impact: Low | Confidence: MEDIUM**

18 redirect rules in `next.config.mjs`. These map old WordPress URLs to new Next.js paths — this is correct migration practice. However, the sitemap should be verified to confirm no redirect-source URLs appear in it (which would waste crawl budget on redirect chains).

---

### F7 — Sitemap URLs: no trailing slashes
**Impact: Low | Confidence: MEDIUM**

Sitemap consistently uses no trailing slashes (`/manned-guarding-london`). Internal links should match. If any internal navigation links use trailing slashes, there is a canonical mismatch. Quick check recommended on all `href=` values in nav and service page cross-links.

---

### F8 — dateModified: needs verification
**Impact: Low | Confidence: LOW**

Not confirmed whether security site pages use static `dateModified` strings (as seen on cleaning site) or dynamic build-time values. Should be audited to match cleaning site finding.

---

## Score Breakdown

| Area | Score | Notes |
|------|-------|-------|
| Metadata coverage | 78/100 | 2 pages missing canonical/OG |
| Schema implementation | 55/100 | Present on service/borough pages, missing Org |
| URL architecture | 85/100 | Consistent structure — no cleaning site anomalies |
| NAP consistency | 20/100 | Critical: wrong phone in CTA and llms.txt |
| Canonical strategy | 78/100 | Consistent, needs trailing slash verification |
| Crawlability | 80/100 | AI bots permitted, robots.ts correct |
| **Overall** | **63/100** | Dragged down by critical phone bug |
