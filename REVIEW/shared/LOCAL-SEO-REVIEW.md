# Local SEO Review — Both Sites
**Sites:** cleaning.vigilservices.co.uk · security.vigilservices.co.uk
**Reviewer role:** Local SEO Strategist
**Date:** 2026-06-10
**Score:** 43 / 100

---

## Executive Summary

Both sites have the structural elements of local SEO in place: consistent address, London-focused keyword targeting, borough pages for ~9 boroughs each. The critical weakness is coverage: both sites cover 28% of Greater London (9/32 boroughs) when their stated coverage is 100% (all 32 boroughs). A competitor with pages for all 32 boroughs will outrank Vigil for the 22 uncovered borough searches — and those searches represent the majority of local commercial intent. Additionally, `areaServed` schema is nearly absent (2 instances on the cleaning site, unknown on security), and no Google Business Profile link appears in either site's schema.

---

## Borough Coverage Audit

### Cleaning Site
| Borough | Page | Priority |
|---------|------|---------|
| Barnet | ✓ /commercial-cleaning-barnet/ | High (403 impressions) |
| Camdem | ✓ /commercial-cleaning-camden/ | High |
| Canary Wharf | ✓ /commercial-cleaning-canary-wharf/ | High |
| City of London | ✓ /commercial-cleaning-city-of-london/ | High |
| Hackney | ✓ /commercial-cleaning-hackney/ | High |
| Islington | ✓ /commercial-cleaning-islington/ | High |
| Southwark | ✓ /commercial-cleaning-southwark/ | High |
| Tower Hamlets | ✓ /locations/commercial-cleaning-tower-hamlets/ | High (wrong path) |
| Westminster | ✓ /commercial-cleaning-westminster/ | High |
| **Lambeth** | ✗ | Very High (Brixton, Clapham, Vauxhall) |
| **Wandsworth** | ✗ | High (Battersea, Tooting, Clapham Junction) |
| **Newham** | ✗ | High (Stratford, Olympic Park regeneration) |
| **Lewisham** | ✗ | Medium |
| **Greenwich** | ✗ | Medium |
| **Haringey** | ✗ | Medium |
| **Enfield** | ✗ | Medium |
| **Waltham Forest** | ✗ | Medium |
| **Ealing** | ✗ | Medium |
| **Hounslow** | ✗ | Medium |
| **Croydon** | ✗ | Very High (second-largest commercial district in GLA) |
| **Bexley** | ✗ | Low |
| **Bromley** | ✗ | Low |
| **Havering** | ✗ | Low |
| **Redbridge** | ✗ | Low |
| **Barking & Dagenham** | ✗ | Low |
| **Harrow** | ✗ | Low |
| **Brent** | ✗ | Low |
| **Richmond** | ✗ | Low |
| **Kingston** | ✗ | Low |
| **Merton** | ✗ | Low |
| **Sutton** | ✗ | Low |
| **Hammersmith & Fulham** | ✗ | High (commercial corridor) |
| **Kensington & Chelsea** | ✗ | High (premium office market) |

**Coverage: 9/32 boroughs (28%)**
**Missing: 22 boroughs — 68% of the target market is unaddressed**

### Security Site
Same 9 boroughs covered (Barnet, Camden, Canary Wharf, City of London, Hackney, Islington, Southwark, Tower Hamlets, Westminster), all at correct root paths.

---

## Findings

### F1 — 22 boroughs uncovered on both sites
**Impact: Critical | Confidence: HIGH**

Every uncovered borough is a gap in local search coverage. "Commercial cleaning Lambeth" returns no Vigil result because no Vigil page exists. "Security company Croydon" returns no Vigil result. These are buyer-intent searches — people looking for a specific service in a specific location — the highest-converting query type in local B2B.

**Revenue impact estimate:** If each missing borough page generates 2 qualified leads per month at Vigil's average contract value, 22 missing cleaning boroughs × 2 leads × 12 months = 528 missed enquiry opportunities annually from cleaning alone. Security doubles this.

**Priority build order (cleaning + security combined):**
1. Lambeth, Wandsworth, Hammersmith & Fulham (inner south)
2. Croydon (largest commercial district after central)
3. Newham (Stratford — major regeneration)
4. Greenwich (O2, residential towers, development)
5. Haringey, Enfield (north corridor)
6. Ealing, Hounslow (west corridor)
7. Remaining 15 boroughs

---

### F2 — areaServed schema: nearly absent
**Impact: High | Confidence: HIGH**

Cleaning site: 2 `areaServed` instances across 40 pages.
Security site: Not audited in detail — likely similar.

`areaServed` in schema tells Google's local algorithm which geographic areas a business explicitly serves. Without it:
- Google must infer service area from page content
- Borough pages lack the formal schema signal tying service to location
- LocalBusiness schema cannot express multi-borough service area

Every service page and every borough page needs:
```json
"areaServed": [
  { "@type": "City", "name": "London" },
  { "@type": "AdministrativeArea", "name": "Greater London" }
]
```
Borough pages additionally need:
```json
"areaServed": { "@type": "Borough", "name": "Islington" }
```

---

### F3 — Google Business Profile: not integrated into schema
**Impact: High | Confidence: MEDIUM**

No GBP URL appears in either site's schema. A verified GBP listing is the primary local SEO signal for Google Maps and the local pack. If Vigil has a GBP listing, its URL should be in the `sameAs` array of the Organisation schema on both sites. If it does not have a GBP listing, creating one is a higher priority than building borough pages — GBP is the foundation of local search for any service business.

**Action required:** Confirm GBP listing exists (search "Vigil Cleaning Services London" in Google Maps). If not present, create one at business.google.com with:
- Category: Commercial cleaning (cleaning) / Security guard service (security)
- Address: Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU
- Service area: All 32 London boroughs
- Phone: Division-specific
- Link to respective website

---

### F4 — Borough page URL structure: one inconsistency on cleaning site
**Impact: Medium | Confidence: HIGH**

Cleaning: Tower Hamlets at `/locations/commercial-cleaning-tower-hamlets/` vs root for all others.
Security: All boroughs at root — correct and consistent.

The cleaning site inconsistency means Tower Hamlets receives different link equity treatment and may rank differently than peer borough pages for no legitimate reason.

---

### F5 — Borough page content quality: not audited at scale
**Impact: Medium | Confidence: LOW**

Borough pages need 1,200+ words per CLAUDE.md SOP. A sample read of a borough page would confirm whether this target is being met. Pages that are thin (< 800 words) will not rank for competitive borough queries against established local directory pages and competitors with deeper content.

**Recommended check:** Read one cleaning borough page and one security borough page in full to assess actual word count and content specificity.

---

### F6 — No local review signals on borough pages
**Impact: Medium | Confidence: HIGH**

Borough pages would benefit from borough-specific testimonials: a client from Islington testimonial on the Islington page, a client from Barnet on the Barnet page. Currently testimonials are service-type attributed, not location attributed. Borough-specific testimonials provide:
1. Relevance signals for local search
2. Location-specific social proof for borough-searching buyers
3. Natural keyword inclusion ("our office in Islington")

---

## Priority Local SEO Actions

### Immediate
- Confirm/create Google Business Profile for both divisions
- Add GBP URL to sameAs in Organisation schema (both sites)
- Fix Tower Hamlets URL on cleaning site

### Short-term (Phase 3)
- Build Lambeth, Wandsworth, Hammersmith, Croydon borough pages on both sites
- Add `areaServed` to all service pages and borough pages
- Verify borough page word counts meet 1,200+ minimum

### Medium-term (Phase 4)
- Build remaining 18 boroughs on both sites
- Add borough-specific testimonials to borough pages
- Audit GBP regularly for review requests (Day 30 and Day 90 per CLAUDE.md)

---

## Score Breakdown

| Area | Score | Notes |
|------|-------|-------|
| Borough coverage | 28/100 | 9/32 boroughs both sites |
| areaServed schema | 15/100 | Nearly absent |
| NAP consistency | 65/100 | Good on cleaning, broken on security |
| GBP integration | 10/100 | Not confirmed/integrated |
| URL structure consistency | 70/100 | Good on security, one issue on cleaning |
| Borough content depth | Unconfirmed | Requires page reads |
| Local review signals | 20/100 | Anonymised, not location-specific |
| **Overall** | **43/100** | |
