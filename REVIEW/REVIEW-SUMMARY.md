# VIGIL — Peer Review Summary
**Sites:** cleaning.vigilservices.co.uk · security.vigilservices.co.uk
**Review date:** 2026-06-10
**Reviewers:** 8-specialist panel (Technical SEO, IA, Search Quality, Local SEO, Entity SEO, LLM Retrieval, Business Growth, CRO)

---

## Overall Scores

| Dimension | Cleaning | Security | Combined |
|-----------|---------|---------|---------|
| Technical SEO | 68/100 | 63/100 | 66/100 |
| Information Architecture | 52/100 | 67/100 | 60/100 |
| AEO / GEO | 61/100 | 69/100 | 65/100 |
| Content Authority | 58/100 | 62/100 | 60/100 |
| Conversion | 65/100 | 58/100 | 62/100 |
| Entity SEO | — | — | 44/100 |
| Local SEO | — | — | 43/100 |
| GEO | — | — | 63/100 |
| Business Growth | — | — | 38/100 |
| **TOTAL** | **61/100** | **64/100** | **56/100** |

---

## Headline Assessment

Both sites are technically competent and better-structured than the average small London service business. The qualification flow on the cleaning site is a genuine standout. The regulatory blog posts on the security site (SIA, BS7858, Licensing Act 2003) are the strongest GEO assets across both sites. The automated agent infrastructure is architecturally well-designed.

The gap is not quality — it is scale and activation. 28% borough coverage, no case studies, no resource library, inactive agents, and one critical live bug (wrong phone number on every security CTA) prevent the sites from reaching their potential.

If the business growth score (38/100) is the most important number, the five things that move it most are: case studies, review acquisition, borough completion, agent activation, and fixing the security phone bug.

---

## Critical Bugs (fix before any other work)

| # | Bug | Site | File | Impact |
|---|-----|------|------|--------|
| C1 | Wrong phone in CTA component (020 3098 6037) | Security | components/shared/CTASection.tsx:17 | Live revenue loss |
| C2 | Wrong phone in llms.txt | Security | public/llms.txt:7 | AI citation corruption |
| C3 | Organisation schema in blog posts only | Cleaning | app/blog/*/page.tsx | Entity signal absent on hub pages |
| C4 | Organisation schema absent | Security | app/layout.tsx | Entity signal absent sitewide |

---

## Top 10 Priorities Across Both Sites

### Priority 1: Fix security phone number
**Sites:** Security only
**Impact:** Critical — live conversion misdirection and entity NAP failure
**Effort:** 5 minutes
**Files:** `components/shared/CTASection.tsx:17`, `public/llms.txt:7`

### Priority 2: Add Organisation schema to both layout.tsx files
**Sites:** Both
**Impact:** Critical — entity identity, sameAs, company reg, social links
**Effort:** 1 hour (both sites)
**Files:** `app/layout.tsx` (both repos)

### Priority 3: Activate the content agent (ANTHROPIC_API_KEY in Vercel)
**Sites:** Both
**Impact:** High — weekly content without owner time; closes content gap against competitors
**Effort:** 15 minutes to set env var; zero ongoing effort
**Dependency:** Owner must set ANTHROPIC_API_KEY in Vercel dashboard

### Priority 4: Complete all 32 boroughs on both sites
**Sites:** Both
**Impact:** High — coverage jumps from 28% to 100% of Greater London
**Effort:** 44 pages × ~1 session each via Borough Agent
**Phases:** Lambeth, Wandsworth, Croydon, Newham, Greenwich first

### Priority 5: Build 3 case studies per site (6 total)
**Sites:** Both
**Impact:** High — closes the trust ecosystem gap vs competitors
**Effort:** 2–3 client conversations + writing; highest ROI content investment
**Format:** Real sector, real outcome, measurable result, direct quote

### Priority 6: Add CTAs to FAQ and blog pages on both sites
**Sites:** Both
**Impact:** High — highest-intent pages currently converting no visitors
**Effort:** 30 minutes (CTASection component already exists)
**Pages:** faq, all blog posts, about, services hub

### Priority 7: Build door supervisors service page on security site
**Sites:** Security only
**Impact:** High — missing service category with significant commercial intent
**Effort:** 1 session
**URL:** `/door-supervisors-london/`

### Priority 8: Fix Tower Hamlets URL on cleaning site
**Sites:** Cleaning only
**Impact:** High — IA inconsistency dilutes borough equity
**Effort:** Move page, add 301 redirect, update sitemap and internal links
**From:** `/locations/commercial-cleaning-tower-hamlets/`
**To:** `/commercial-cleaning-tower-hamlets/`

### Priority 9: Confirm/create Google Business Profile for both divisions
**Sites:** Both (off-site action)
**Impact:** High — foundational for local search pack visibility
**Effort:** 30–60 minutes per division
**Action:** Search "Vigil Cleaning Services London" in Maps; claim or create

### Priority 10: Expand both llms.txt files to 150+ lines
**Sites:** Both
**Impact:** Medium-High — primary GEO asset; thin files underserve AI engine retrieval
**Effort:** 1–2 hours per file
**Include:** FAQ pairs, regulatory authority statements, priority URL list, sector context

---

## Cross-Site Opportunities (actions that help both sites simultaneously)

| Action | Both Sites Impact |
|--------|-----------------|
| Add Organisation schema to layout.tsx | Entity signals on all pages |
| Add areaServed to all service/borough pages | Local SEO schema across all local pages |
| Add sameAs social links to Organisation schema | Knowledge graph entity |
| Add CTA to all blog posts and FAQ pages | Conversion on high-intent pages |
| Activate content agent | Weekly authority content on both |
| Create 32 borough pages (Borough Agent) | Full London coverage |
| Add review platform integration (Google Business) | AggregateRating schema + rich results |
| Write case studies per division | Trust ecosystem across both |

---

## What Success Looks Like (6-month horizon)

If all Critical and Priority 1–5 items are completed:
- Both sites appear for 100% of Greater London borough queries in their category
- Vigil has a knowledge panel in Google for "Vigil Services Ltd"
- The content agent is publishing 2 posts/week across both sites
- Each site has 3 case studies and 10+ Google reviews
- The security CTA phone is correct
- Both sites have Organisation schema linking to the parent entity

At that point, the sites are structurally comparable to a mid-market competitor with a 3-year head start. The current gap is not quality — it is scale, time, and activation.
