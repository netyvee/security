# Information Architecture Review — Security Site
**Site:** security.vigilservices.co.uk
**Repo:** netyvee/security
**Reviewer role:** Information Architecture Specialist
**Date:** 2026-06-10
**Score:** 67 / 100

---

## Executive Summary

The security site has a cleaner URL architecture than the cleaning site — all service pages at root level, all boroughs at root level, no nesting anomalies. The `/security-services/` hub mirrors `/services/` on the cleaning site and serves as an adequate hub for now. However the site is missing a door supervisors service page (listed in CLAUDE.md site facts), has only 9/32 boroughs covered, no sector hubs, and the `/about/` vs `/about-vigil-cleaning-services/` naming is not consistent with the cleaning site's more descriptive slug pattern. Most significantly, the architecture has no plan for how the security and cleaning sites link to each other to reinforce the Vigil Services Ltd parent entity.

---

## Current Site Structure

```
/                                         ← Homepage
/security-services/                       ← Services hub
/manned-guarding-london/                  ← Service
/mobile-patrols-london/                   ← Service
/key-holding-alarm-response-london/       ← Service
/cctv-monitoring-london/                  ← Service
/event-security-london/                   ← Service
/construction-site-security-london/       ← Service
/retail-security-london/                  ← Service
/concierge-security-london/               ← Service
/commercial-security-barnet/              ← Borough
/commercial-security-camden/              ← Borough
/commercial-security-canary-wharf/        ← Borough
/commercial-security-city-of-london/      ← Borough
/commercial-security-hackney/             ← Borough
/commercial-security-islington/           ← Borough
/commercial-security-southwark/           ← Borough
/commercial-security-tower-hamlets/       ← Borough (CORRECT path)
/commercial-security-westminster/         ← Borough
/commercial-security-greater-london/      ← Greater London hub
/about/
/careers/
/contact/
/faq/
/blog/
/blog/[3 posts]
/environmental-commitment/
/[legal pages]
```

---

## Findings

### F1 — Door supervisors service page is missing
**Impact: High | Confidence: HIGH**

CLAUDE.md lists "door supervisors" as a core security service and the AUTORUN brief lists it in site facts. The sitemap and file system show no `/door-supervisors-london/` page. This is a high-volume commercial intent keyword (`door supervisor company london`, `SIA door supervisor london`) with clear conversion value for event organisers, nightclub operators, and venue managers.

Current service coverage: 8 pages
Missing: door-supervisors-london (a 9th service page)

---

### F2 — 22 of 32 boroughs missing
**Impact: High | Confidence: HIGH**

| Borough | Coverage |
|---------|---------|
| Westminster | ✓ |
| Camden | ✓ |
| Islington | ✓ |
| Hackney | ✓ |
| Tower Hamlets | ✓ |
| Southwark | ✓ |
| Barnet | ✓ |
| Canary Wharf | ✓ |
| City of London | ✓ |
| All others (22) | ✗ |

High-priority missing boroughs for security:
- **Lambeth**: Brixton nightlife venues, large event spaces
- **Newham**: Stratford retail, ExCeL (largest exhibition centre in London)
- **Lewisham**: Commercial growth area
- **Greenwich**: O2 Arena — enormous event security market
- **Waltham Forest**: Retail parks, warehouse districts
- **Croydon**: Major retail hub, Westfield development
- **Ealing**: Corporate offices, retail

The O2 Arena (Greenwich) and ExCeL (Newham) alone represent a segment that justifies dedicated borough pages. Neither borough has a page.

---

### F3 — No sector hub architecture
**Impact: High | Confidence: HIGH**

Security clients divide sharply by sector, each with distinct regulatory requirements and buying criteria:

| Sector | Buying driver |
|--------|-------------|
| Retail | Theft prevention, uniformed presence, SIA required |
| Events | SIA door supervisor licensing, crowd management |
| Construction | CDM 2015, access control, site thefts |
| NHS/Healthcare | Lone worker safety, CQC environment |
| Education | Safeguarding, after-hours patrol |
| Hospitality | Front-of-house concierge security |
| Residential developments | Keyholding, out-of-hours patrol |

None of these have dedicated sector pages. A security company wanting to dominate "retail security company London" or "event security company London" needs pages that speak to the specific sector's problems — not just the service type.

---

### F4 — /about/ slug too short vs cleaning site pattern
**Impact: Low | Confidence: LOW**

Cleaning site uses `/about-vigil-cleaning-services/` (descriptive, keyword-enriched). Security uses `/about/` (generic). Minor inconsistency but the cleaning pattern is better for SEO — it captures "about vigil security services" as a branded query.

---

### F5 — No cross-site links to cleaning division
**Impact: Medium | Confidence: HIGH**

Vigil operates two divisions visible to customers (and will likely add staffing, care). There is no link from the security site to the cleaning site or to a parent Vigil Services Ltd page. A property management company could need both services — the architecture currently provides no path to discover this. Cross-divisional links also reinforce the Vigil Services Ltd entity in Google's knowledge graph.

---

### F6 — /complaints-procedure/ is in the sitemap at priority 0.3
**Impact: Low | Confidence: HIGH**

A complaints procedure page is a legal/reputational page. Including it in the sitemap at 0.3 is correct. No structural issue — flagged for completeness.

---

## Ideal Architecture Evolution

### Immediate (Phase 1 fix)
- Add `/door-supervisors-london/` (missing service)

### Near-term (Phase 3)
- Add 22 remaining borough pages at `/commercial-security-[borough]/`
- Rename `/about/` to `/about-vigil-security-services/`

### Medium-term (Phase 4+)
- Add sector hubs: `/security-for-retail/`, `/security-for-events/`, `/security-for-construction/`, `/security-for-nhs/`
- Add cross-divisional footer link: "Also need commercial cleaning? Vigil Cleaning Services → [link]"

---

## Score Breakdown

| Area | Score | Notes |
|------|-------|-------|
| URL consistency | 88/100 | Clean — no cleaning site anomalies |
| Service completeness | 70/100 | 8/9 services — door supervisors missing |
| Borough coverage | 28/100 | 9/32 boroughs |
| Sector structure | 15/100 | No sector hubs |
| Cross-site architecture | 0/100 | No entity linking between divisions |
| Hub pages | 75/100 | security-services hub and greater-london hub present |
| **Overall** | **67/100** | |
