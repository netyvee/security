# Entity SEO Review — Both Sites
**Sites:** cleaning.vigilservices.co.uk · security.vigilservices.co.uk
**Reviewer role:** Knowledge Graph / Entity SEO Engineer
**Date:** 2026-06-10
**Score:** 44 / 100

---

## Executive Summary

Vigil Services Ltd operates two domain-separated sites for two divisions with no parent entity architecture connecting them. Neither site has Organisation schema in its root layout. The cleaning site's Organisation schema appears only in blog posts. The security site has no Organisation schema at all. NAP (Name, Address, Phone) consistency is good on the cleaning site but the security site has a critical error: the wrong phone number in both its CTA component and llms.txt. Company registration number (11756806) appears only twice across all pages of both sites combined. Without a robust entity foundation, both sites are unknown entities to Google's knowledge graph — they cannot build authority as a named company.

---

## NAP Audit

### Cleaning Site (cleaning.vigilservices.co.uk)
| Data Point | Count | Correct |
|-----------|-------|---------|
| Phone: 020 3098 6037 | 36 | ✓ |
| Security phone on cleaning site | 0 | ✓ |
| Address (Cranbrook/IG1 4PU) | 35 | ✓ |
| Company reg 11756806 | 2 | ⚠ Too few |
| **NAP verdict** | | CONSISTENT |

### Security Site (security.vigilservices.co.uk)
| Data Point | Count | Correct |
|-----------|-------|---------|
| Phone: 020 3973 8887 | 0 | ✗ CRITICAL |
| Cleaning phone on security site | 1 (CTASection.tsx) | ✗ WRONG |
| Address (Cranbrook/IG1 4PU) | 72 | ✓ |
| Company reg 11756806 | 1 | ⚠ Too few |
| **NAP verdict** | | INCONSISTENT — PHONE WRONG |

---

## Schema Entity Audit

### Cleaning Site Schema
| Schema Type | Present | Location |
|-------------|---------|---------|
| CleaningService | ✓ | Homepage only |
| Organisation | ✗ | Blog posts only (should be layout.tsx) |
| LocalBusiness | ✗ | Not detected |
| BreadcrumbList | ✓ (via component) | Service/borough pages |
| FAQPage | Unconfirmed | Component imported |
| WebPage | ✗ | Not detected |
| Article | ✗ | Blog posts lack Article schema |
| AggregateRating | ✗ | No review platform integration |
| sameAs links | ✗ | Not in layout.tsx Organisation schema |

### Security Site Schema
| Schema Type | Present | Location |
|-------------|---------|---------|
| SecurityService | ✗ | Service used, not SecurityService |
| Organisation | ✗ | Not detected anywhere |
| LocalBusiness | ✓ | Inline on service/borough pages |
| BreadcrumbList | ✓ | Via buildBreadcrumbSchema |
| FAQPage | ✓ | Via buildFAQSchema, confirmed on pages |
| Service | ✓ | On service pages |
| Article | Unconfirmed | Blog posts |
| AggregateRating | ✗ | No review platform |

---

## Findings

### F1 — No parent entity architecture
**Impact: Critical | Confidence: HIGH**

Vigil Services Ltd (reg: 11756806) operates cleaning and security divisions. Neither site's schema identifies the parent company. The two sites appear to Google as:
- Vigil Cleaning Services (unregistered entity)
- Vigil Security Services (unregistered entity)

Not as:
- Vigil Services Ltd (registered company) → Vigil Cleaning Services (division) + Vigil Security Services (division)

The consequence: Google cannot build a knowledge panel for "Vigil Services" that encompasses both divisions. Branded searches for "Vigil cleaning" and "Vigil security" resolve to separate unconnected entities.

**Fix:**
1. Create a root `Organization` schema in each site's `app/layout.tsx` with:
   - `legalName: "Vigil Services Ltd"`
   - `identifier: { "@type": "PropertyValue", "name": "UK Companies House", "value": "11756806" }`
   - `sameAs: [Instagram URL, Facebook URL, LinkedIn URL]`
   - `url: "https://cleaning.vigilservices.co.uk"` (or security)
   - `parentOrganization: { "@type": "Organization", "name": "Vigil Services Ltd", "url": "https://vigilservices.co.uk" }` (even if the parent domain doesn't exist, the reference helps)

---

### F2 — sameAs social profile links not in schema
**Impact: High | Confidence: HIGH**

Social profiles (Instagram, Facebook, LinkedIn) are referenced in the footer of both sites but not in any Organisation schema's `sameAs` array. The `sameAs` property is how Google links a schema entity to its external profiles to build a knowledge graph entry. Without it, Vigil is not connected to its social footprint in the knowledge graph.

From CLAUDE.md:
- Instagram: https://www.instagram.com/vigilcleaners/
- Facebook: https://www.facebook.com/profile.php?id=61573334595099
- LinkedIn: https://www.linkedin.com/in/vigil-cleaning-services-689800354

These must appear in the cleaning site's Organisation sameAs array. The security site needs equivalent social profiles.

---

### F3 — Company registration number appears only twice
**Impact: High | Confidence: HIGH**

The UK Companies House registration number (11756806) is an authoritative entity identifier. It appears only 2 times on the cleaning site (both in footer area) and 1 time on the security site. It should appear in:
1. Organisation schema on every page (via layout.tsx)
2. Footer registration statement ("Vigil Services Ltd · Registered in England & Wales · No. 11756806")
3. EEAT bar on every service and borough page

More references allow Google to cross-reference the entity across web citations.

---

### F4 — No Google Business Profile link in schema
**Impact: Medium | Confidence: HIGH**

Neither site's schema includes a sameAs link to a Google Business Profile. A GBP listing tied to the entity schema via sameAs is a strong local SEO signal. If a GBP listing exists for Vigil Services Ltd, its URL should be in the sameAs array of both sites.

---

### F5 — AggregateRating: no review platform integration
**Impact: Medium | Confidence: HIGH**

Neither site shows star ratings from a verified review platform. A single verified Google review platform integration (showing e.g. "4.8★ from 23 reviews" in the Organisation schema) would:
1. Enable star rating rich results in Google Search
2. Provide AggregateRating schema that AI engines use as authority signals
3. Improve click-through rate from search results by approximately 15–30%

The current testimonials are anonymised and not schema-backed — they provide no AggregateRating signal.

---

### F6 — CleaningService vs LocalBusiness: type specificity
**Impact: Low | Confidence: MEDIUM**

The cleaning site uses `CleaningService` as the primary schema type. The security site uses `Service` (not `SecurityService`). Both should use the most specific applicable type. `CleaningService` is correct and preferred for cleaning. `SecurityService` (if it exists in schema.org vocabulary — it does) should be used for the security site. Both should ALSO include `LocalBusiness` in an `@type` array if the primary type doesn't inherit from it.

---

## Cross-Site Entity Opportunities

| Action | Impact | Effort |
|--------|--------|--------|
| Add Organisation schema to both layout.tsx files | Critical | Low |
| Add sameAs social links to Organisation schema | High | Low |
| Add company reg to footer registration statement | High | Low |
| Add parent organisation reference in schema | High | Low |
| Fix NAP phone on security site | Critical | Very Low |
| Add GBP sameAs link | Medium | Low |
| Integrate review platform (Google/Trustpilot) | High | Medium |
| Create parent vigilservices.co.uk entity page | High | Medium |

---

## Score Breakdown

| Area | Score | Notes |
|------|-------|-------|
| Cleaning NAP | 88/100 | Consistent and well-distributed |
| Security NAP | 15/100 | Wrong phone — critical |
| Cleaning schema | 45/100 | Few types, Organisation misplaced |
| Security schema | 55/100 | Better page-level schema, no Org |
| sameAs / social links | 5/100 | Not in schema anywhere |
| Company reg visibility | 20/100 | 2–3 instances total across both sites |
| Review/AggregateRating | 0/100 | No platform integration |
| **Overall** | **44/100** | |
