# HOMEPAGE IMPROVEMENT PLAN
**Sites:** cleaning.vigilservices.co.uk · security.vigilservices.co.uk
**Reference:** `vigil-cleaning-homepage.html` and `vigil-security-homepage.html` committed to repos (June 2026)
**Note:** vigil-cleaning-homepage.html and vigil-security-homepage.html were referenced in AUTORUN-UI-UX-REVIEW.md as the target state. These files should be reviewed directly for final visual spec — this plan addresses the structural and UX gaps identified from code analysis.

---

## CURRENT HOMEPAGE STRUCTURE — CLEANING

```
Nav (fixed, 64px)
│
├── SECTION 1: HERO
│   Quick Answer Block (40-60 words, teal border)
│   Section tag
│   H1 "London's specialist commercial cleaning company"
│   Hero subheading
│   Trust chips (DBS, directly employed, £5m, COSHH, Reg No.)
│   CTA row: [Get a free quote] [Call 020 3098 6037]
│
├── QualificationFlow (client component, full-width)
│
├── SECTION 2: STATS BAR (32 boroughs · 100% direct · £5m · DBS)
│
├── SECTION 3: INTRO CONTENT (2 paragraphs + callout block)
│
├── SECTION 4: SERVICES GRID (6 cards)
│
├── SECTION 5: WHY VIGIL (4 cards)
│
├── COMPLIANCE STRIP (7 items)
│
├── SECTION 6: SECTORS (9 pills)
│
├── SECTION 7: BOROUGH COVERAGE (12 linked pills + 7 plain + +13 more)
│
├── SECTION 8: FAQ (5 questions, accordion)
│
├── SECTION 9: EEAT BAR
│
├── CTASection
│
└── SECTION 11: SEO CONTENT BLOCK (2-column, 500+ words)
```

**Missing vs CLAUDE.md SOP:**
- No testimonials section
- No case study section
- No process/how-it-works section
- No AggregateRating (no reviews yet — acceptable)

---

## KEY IMPROVEMENT AREAS

### 1. HERO — NO VISUAL ELEMENT

The current hero is pure text. Every major competitor uses a photograph or illustration in the hero:
- Cleanology: professional commercial cleaning photograph, full bleed
- OCS: office environment photograph
- Mitie: diverse team photograph

Vigil's hero has:
- Quick Answer Block (good for SEO) ✓
- Strong headline ✓
- Good subhead ✓
- Good trust chips ✓
- Good CTAs ✓
- **No image** — text only

On desktop (1440px), the hero occupies approximately 300px of vertical space. It looks correct but lacks visual authority compared to photography-led competitors. For B2B buyers visiting from a Google search, first impressions happen in 50ms — a dark text-only page reads as "small business" vs a photo-backed hero that reads as "established company."

**Recommendation:** Once photography is available (see IMAGE-TASK.md), add a right-column image to the hero on desktop using a 2-column layout. On mobile, the image should be hidden or stacked below the CTAs. This matches the prototype referenced in the homepage HTML files.

### 2. QUALIFICATION FLOW PLACEMENT

The QualificationFlow appears immediately after the hero with no section heading or introduction. First-time visitors may not understand what the flow is before entering it.

**Recommendation:** Add a brief introduction above the flow:
```
SECTION TAG: "Find your solution"
H2: "Tell us about your business"
TL;DR: Our qualification takes 2 minutes and matches you to the right cleaning programme.
```
This frames the flow as a tool that benefits the user, not a form they fill in for Vigil's benefit.

### 3. MISSING TESTIMONIALS SECTION

Between "Why Vigil" (Section 5) and "Sectors" (Section 6), there should be a social proof section. The three testimonials already exist in QualificationFlow but are hidden.

**Proposed testimonials section:**
```
SECTION TAG: "What our clients say"
H2: "Trusted by facilities managers across London"
TL;DR: Clients cite consistent operatives and zero management overhead as the primary benefits.

[3-column grid on desktop, stacked on mobile]
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ ★★★★★           │  │ ★★★★★           │  │ ★★★★★           │
│ "Vigil have been │  │ "Our welfare     │  │ "As a CQC-       │
│ cleaning our EC2 │  │ areas are        │  │ registered       │
│ offices for 14   │  │ spotless..."     │  │ facility..."     │
│ months..."       │  │                  │  │                  │
│ — FM, City       │  │ — Site Manager   │  │ — Ops Director   │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### 4. SERVICE CARDS — EMOJI ICONS

The 6 service cards use emoji icons (🏢 🏗️ 🏥 🏘️ 🚧 ⚡). The Why Vigil cards use emoji (👥 🔐 📋 🔄).

Emoji render inconsistently across operating systems and platforms. On some Android devices, the emoji fonts differ significantly from Apple/Windows. More critically, emoji carry an informal visual register that mismatches the B2B professional buyer audience (facilities managers, property directors, main contractors).

**Recommendation:** Replace with SVG icons from the Tabler Icons library (already a dependency). Render as `<Icon color="#4ecdc4" size={24} />` style.

Suggested icon mapping:
- Office Cleaning: `IconBuilding`
- After Builders Cleaning: `IconTool`
- Healthcare: `IconHeartRateMonitor`
- Property Management: `IconBuildingEstate`
- Construction: `IconCrane`
- Emergency: `IconAlertTriangle`

### 5. SERVICE CARD REDUNDANT CTA TEXT

Each service card ends with `{svc.title} →` as a secondary CTA (e.g., "Office Cleaning London →"). This duplicates the card title and adds visual noise.

**Recommendation:** Replace with a consistent "Learn more →" or simply an arrow `→`. The card is already fully clickable.

### 6. HOMEPAGE SECTIONS WITHOUT H2 ARIA ASSOCIATION

The compliance strip (`app/page.tsx:496–508`) and sectors section have H2 headings associated via `aria-labelledby` IDs in some places. The compliance strip has no heading — it is a visual element only. This is acceptable.

The borough section H2 is "Commercial cleaning across all 32 London boroughs" — this is correct and keyword-rich ✓.

### 7. STATS BAR — "DBS" AS A STAT

The stats bar has four items: `32` boroughs · `100%` direct staff · `£5m` insurance · `DBS` enhanced.

The first three are numeric statistics. "DBS" is a credential, not a number. It breaks the visual pattern of the bar (which implies quantified values) and is less impactful as a stat.

**Recommendation:** Replace "DBS" stat with something measurable. Options (use only if verified):
- "3-month" rolling contracts (a contract term, not a count — but factual)
- "AWR" compliant (similar credential format to DBS — consistent)
- "£5m" is already there — consider "24/7" as a stat (24/7 cover available — true)

### 8. "HIGH CLIENT RETENTION" — VAGUE STAT

`QualificationFlow.tsx:259`: `<div className={s.statNum}>High</div>` with label "client retention".

"High" is not a stat. This was deliberately kept non-specific per the truthfulness rules in CLAUDE.md (no invented numbers). However, it reads as evasive or unfinished.

**Options:**
- Remove this stat entirely (show 2 stats instead of 3 in the welcome screen)
- Replace with "3-month" rolling contracts (factual, indicates commitment)
- Replace with a true statement: "100%" directly employed (already used elsewhere, but this reinforces the differentiator)

---

## HOMEPAGE IMPROVEMENT PRIORITY LIST

| # | Change | Effort | Impact |
|---|--------|--------|--------|
| 1 | Add testimonials section between Why Vigil and Sectors | Low | High |
| 2 | Frame QualificationFlow with H2 + introduction text | Low | Medium |
| 3 | Replace emoji with Tabler Icons SVG in service and Why Vigil cards | Low | Medium |
| 4 | Add hero image (2-column desktop layout) when photography available | Medium | High |
| 5 | Replace "Service title →" link text with "Learn more →" | Low | Low |
| 6 | Replace "High client retention" with factual stat | Low | Low |
| 7 | Replace "DBS" stats bar item with "24/7" or "AWR" | Low | Low |

---

## SECURITY HOMEPAGE — ADDITIONAL ISSUES

From full codebase analysis (2026-06-12), the security homepage (`app/page.tsx`) has 8+ sections:
Hero → Qualification Flow → Stats → Intro → Services → Why Choose → Sectors → Coverage → FAQ → Final CTA

The hero section exists and contains headline, trust chips, and CTAs. However:

1. **Missing testimonials section** — SecurityQualificationFlow has inline testimonials hidden inside the flow; none appear on the homepage before the flow.
2. **Nav CTA broken** — "Get a quote" in the nav links to `"/"` (homepage), not the CRM. See NAVIGATION-IMPROVEMENT-PLAN.md.
3. **Same emoji/icon recommendation applies** — replace emoji with Tabler Icons SVG.
4. **Sidebar layout offset** — `app/layout-client.tsx` applies `lg:mr-[224px]` right margin when a `Sidebar` component is visible. The Sidebar is hidden on the homepage, but the layout shift between homepage (no sidebar) and inner pages (sidebar visible) may cause visual discontinuity on wide screens. Verify the sidebar is hidden correctly on all page types and that the content width change is intentional.
5. **Qualification flow framing** — same recommendation as cleaning: add a brief H2 + introduction above the SecurityQualificationFlow to explain its purpose to first-time visitors.
6. **"Get a quote" flow context** — the security flow has 7 screens and captures premises type, service type, hours, and postcode. The welcome screen could benefit from a progress indicator (matching the cleaning site's progress bar in `QualificationFlow.tsx`).
