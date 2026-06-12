# Vigil — Comprehensive UI/UX Audit
**Date:** 2026-06-12  
**Scope:** cleaning.vigilservices.co.uk + security.vigilservices.co.uk  
**Standard:** WCAG 2.1 AA minimum  
**Audience:** B2B commercial buyers, facilities managers, property directors, construction managers, event organisers  
**Repos:** netyvee/vigil-cleaning | netyvee/security  
**Benchmark competitors:** Cleanology, OCS, Mitie (cleaning) · Corps Security, G4S, Securitas (security)

---

## Overall Scores

| Dimension | Cleaning | Security |
|---|---|---|
| Mobile responsiveness | 6 / 10 | 5 / 10 |
| Navigation | 5 / 10 | 4 / 10 |
| Conversion optimisation | 7 / 10 | 6 / 10 |
| Accessibility (WCAG 2.1 AA) | 5 / 10 | 3 / 10 |
| Branding consistency | 7 / 10 | 4 / 10 |
| Perceived performance | 8 / 10 | 4 / 10 |
| Trust signals | 6 / 10 | 7 / 10 |
| SEO support | 8 / 10 | 8 / 10 |
| Visual polish | 7 / 10 | 6 / 10 |
| **OVERALL** | **6.6 / 10** | **5.2 / 10** |

The cleaning site is structurally sound — correct font loading, 89 aria attributes, sticky mobile CTA, consistent brand colour. Its gaps are primarily in social proof, navigation depth, and accessibility polish.

The security site has systemic technical debt: no font loading, no favicon, 15 aria attributes vs 89 on cleaning, 10 focus-style occurrences vs 601 on cleaning, a broken nav CTA, and a render-blocking CDN stylesheet. It requires more immediate remediation.

---

## Critical Issues — Fix First

All items below are conversion blockers, legal compliance failures, or visible user-facing bugs.

| # | Issue | Site | Severity | File | Fix Effort |
|---|---|---|---|---|---|
| C1 | Nav "Get a quote" `href="/"` — inner-page visitors land on homepage not CRM | Security | Critical | `components/shared/Nav.tsx` | Trivial |
| C2 | No favicon declared in layout — blank browser tab on every visit | Security | Critical | `app/layout.tsx` | Low |
| C3 | No `next/font` — fonts not loaded; system fallbacks render instead | Security | Critical | `app/layout.tsx` | Low |
| C4 | Tabler Icons CDN `<link>` in `<head>` — render-blocking on every page | Security | Critical | `app/layout.tsx` | Low |
| C5 | QualificationFlow inputs 14–15 px — iOS Safari auto-zooms on focus | Cleaning | Critical | `components/QualificationFlow.tsx` | Low |
| C6 | No skip-navigation link on either site — WCAG 2.4.1 Level A violation | Both | Critical | `app/layout.tsx` (both) | Low |

---

## Top 15 Priorities by Revenue Impact

### P1 — Security Nav CTA Points to Homepage
**File:** `components/shared/Nav.tsx` — "Get a quote" button  
**Issue:** `href="/"` navigates away from any inner page and forces a scroll to find the qualification flow. On service pages, borough pages, and blog posts, this CTA is the primary conversion action — and it breaks.  
**Fix:** `href="https://app.vigilservices.co.uk/enquire/security"`  
**User impact:** Every desktop visitor clicking the primary CTA from an inner page loses their current context. Measurable conversion loss.  
**Regression risk:** None.

---

### P2 — Security Favicon
**File:** `app/layout.tsx` (security) — no `icons` metadata  
**Issue:** No favicon configured. Browser tab shows browser-default blank icon. Google Search cannot display a favicon next to the result. Returning visitors cannot identify the tab.  
**Fix:** Add `metadata.icons` with SVG for icon/shortcut, 180×180 PNG for apple, 192+512 PNG for manifest.  
**Regression risk:** None.

---

### P3 — Security Font Loading
**File:** `app/layout.tsx` (security)  
**Issue:** `tailwind.config.ts` references `"DM Sans"` and `"Playfair Display"` as font families but these are never loaded. No `next/font`, no Google Fonts link, no CSS import found in layout. Every page loads with system-font fallbacks. The cleaning site correctly uses `next/font/google` with `display: 'swap'` and preconnect.  
**Fix:** Mirror the cleaning site `layout.tsx` font setup: `import { DM_Sans, Playfair_Display } from 'next/font/google'`.  
**Expected benefit:** Correct brand typography on all pages; eliminates FOUT; adds automatic preload hints.  
**Regression risk:** Low — needs className wiring to `<body>` and Playfair elements.

---

### P4 — Tabler Icons CDN (Security)
**File:** `app/layout.tsx` (security), line with `cdn.jsdelivr.net/npm/@tabler/icons-webfont`  
**Issue:** Render-blocking `<link>` in `<head>`. The security site uses `@tabler/icons-react` SVG components — the webfont adds zero user-visible value while adding an external network dependency and ~150–200kb download on every page.  
**Fix:** Remove the `<link>` tag. Verify no `ti ti-*` class names exist in the codebase; if none, the webfont is entirely redundant.  
**Expected benefit:** ~100–300 ms LCP improvement; eliminates CDN single-point-of-failure.  
**Regression risk:** Medium — requires confirming no code depends on the webfont classes.

---

### P5 — iOS Input Zoom (Cleaning)
**File:** `components/QualificationFlow.tsx`, `components/CareersFlow.tsx`  
**Issue:** Inline styles and CSS module classes set input font-size to 14–15px. iOS Safari auto-zooms the viewport when any input receives focus at `font-size < 16px`. The qualification flow is the primary conversion mechanism on mobile.  
**Fix:** Set all `<input>`, `<select>`, `<textarea>` to `text-base` (16px). Labels can remain smaller.  
**Expected benefit:** Eliminates the most common mobile form abandonment trigger. iPhone is the largest single device category for UK B2B mobile traffic.  
**Regression risk:** Negligible (2px visual change).

---

### P6 — Skip Navigation Links (Both)
**File:** `app/layout.tsx` (both repos)  
**Issue:** Neither site has a skip link. Keyboard users and screen reader users tab through 7–8 elements (logo + nav links + phone + CTA) before reaching page content on every page load. WCAG 2.4.1 Level A is a mandatory requirement under the UK Equality Act 2010.  
**Fix:** Add as first `<body>` child: `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to main content</a>`. The cleaning site `app/page.tsx` already has `<main id="main-content">`.  
**Regression risk:** None.

---

### P7 — Services Dropdown Navigation (Both)
**File:** `components/Nav.tsx` (both repos)  
**Issue:** Flat navigation — no dropdown, no mega-menu. "Services" links to the hub page only. Reaching a specific service page requires 2 clicks. All benchmark competitors (Cleanology, Corps Security, G4S) have hover dropdowns exposing all services from the nav.  
**Fix:** Add hover dropdown on "Services" listing all service pages with a 1-line description each. Mobile: expand to an accordion under the Services link.  
**Expected benefit:** Service pages reachable in 1 click; lower navigation bounce.  
**Implementation complexity:** Medium.

---

### P8 — Security Nav Missing Blog, FAQ, Locations
**File:** `components/shared/Nav.tsx` (security)  
**Issue:** Security nav has 4 links (Services, About, Contact, Careers). Missing: Blog (3 indexed posts), FAQ (dedicated page), and any locations/coverage link. Cleaning nav correctly includes 5 links + Locations. These pages are published and indexed but invisible from the main nav.  
**Fix:** Add Blog, FAQ at minimum. Add "Coverage" → `/commercial-security-greater-london/` optionally.  
**Regression risk:** None.

---

### P9 — Qualification Flow State Not Persisted (Both)
**File:** `components/QualificationFlow.tsx`, `components/SecurityQualificationFlow.tsx`  
**Issue:** All flow state is in-memory React `useState`. Browser refresh, back-navigation, or phone interruption mid-flow loses all answers and resets to step 1. B2B buyers are frequently interrupted.  
**Fix:** Persist `{screen, answers}` to `sessionStorage` via `useEffect` on each state change. Restore on mount. Clear on completion screens.  
**Expected benefit:** Estimated 15–25% reduction in mid-flow abandonment.  
**Implementation complexity:** Low.

---

### P10 — Security Accessibility Gap
**File:** All security components  
**Issue:** Security has 15 aria attribute occurrences vs cleaning's 89. Security has 10 focus-style occurrences vs cleaning's 601. `btn-primary` and `btn-outline` (in globals.css) have no `focus-visible` ring — keyboard users cannot see which button is focused. WCAG 2.4.7 Level AA violation.  
**Fix:** Add `focus-visible:outline-2 focus-visible:outline-[#4ecdc4] focus-visible:outline-offset-2` to all interactive elements. Add `aria-expanded` to hamburger. Add `aria-label` to icon-only elements.  
**Implementation complexity:** Medium.  
**Regression risk:** Low.

---

### P11 — White Btn-Primary on Security (Contrast Fail)
**File:** `app/globals.css` (security)  
**Issue:** `.btn-primary { text-white bg-[#4ecdc4] }` — white (#fff) on teal (#4ecdc4) = **1.9:1 contrast ratio**. WCAG AA requires 4.5:1 for normal text. The cleaning site correctly uses navy text on teal (9:1 ratio). This is a visible CTA text readability problem, not just a technical fail.  
**Fix:** Change `.btn-primary` to `color: #0a1628` (navy). Navy on teal = 9.0:1.  
**Regression risk:** Low — visual change on all primary buttons.

---

### P12 — No Client Logo Strip (Both)
**File:** `app/page.tsx` (both repos)  
**Issue:** Neither homepage shows client logos, sector icons, or a "trusted by" bar. B2B buyers pattern-match against familiar names before engaging. Cleanology's homepage hero includes recognisable client logos above the fold. Both Vigil sites go directly from hero text to a conversion mechanism with no credibility anchors.  
**Fix:** Add a 4–6 item greyscale logo or sector-icon strip between the hero and the qualification flow. If client logos are confidential: use sector identifiers (NHS, retail, construction, hospitality, corporate).  
**Expected benefit:** 10–20% lift in qualification flow start rate based on B2B benchmarks.  
**Implementation complexity:** Low.

---

### P13 — FloatingCTA Hidden on Security Homepage
**File:** `components/FloatingCTA.tsx` (security)  
**Issue:** `if (pathname === "/") { setVisible(false); return; }` — the floating CTA never appears on the homepage, which is the only page with the embedded qualification flow. Visitors who scroll past the flow and back up have no persistent CTA.  
**Fix:** Allow FloatingCTA to show on homepage after 800px scroll (past the fold + flow), OR add a `#qualify` anchor CTA that scrolls to the flow.  
**Implementation complexity:** Low.

---

### P14 — Apple Touch Icon Wrong Format (Cleaning)
**File:** `app/layout.tsx` (cleaning)  
**Issue:** `icons.apple: "/favicon.svg"` — iOS does not support SVG for apple-touch-icon. Home screen saves and PWA contexts produce blank icons. Shortcut icon should also be ICO or PNG, not SVG.  
**Fix:** Generate `apple-touch-icon.png` (180×180 PNG) and reference separately.  
**Implementation complexity:** Low (image generation only).

---

### P15 — No AggregateRating Schema (Both)
**File:** Schema markup across all pages  
**Issue:** No `AggregateRating` on `LocalBusiness` schema. No review platform integration. Competitors with a handful of Google reviews show gold stars in SERPs. Both sites rely on inline testimonials without structured markup.  
**Fix:** Set up Google Business Profile → collect first 5–10 verified reviews → add `AggregateRating` to `LocalBusiness` schema in layout.  
**Expected benefit:** 20–30% CTR uplift from star ratings in search results.  
**Implementation complexity:** Low (schema) + ops work for reviews.

---

## Feature Comparison: Cleaning vs Security

| Feature | Cleaning | Security |
|---|---|---|
| Hamburger menu mobile | ✅ | ✅ |
| Services dropdown desktop | ❌ | ❌ |
| Nav CTA → CRM | ✅ | ❌ → "/" |
| Mobile sticky CTA bar | ✅ MobileBookingButton | ✅ FloatingCTA (inner pages) |
| Font loading (next/font) | ✅ display:swap | ❌ Not loaded |
| Favicon | ✅ SVG (apple fix needed) | ❌ None |
| Skip navigation link | ❌ | ❌ |
| aria attribute coverage | 89 occurrences | 15 occurrences |
| Focus styles coverage | 601 occurrences | 10 occurrences |
| btn-primary contrast | ✅ Navy on teal 9:1 | ❌ White on teal 1.9:1 |
| Input font-size ≥ 16px | ❌ 14–15px | ✅ 16–18px |
| OG image | ✅ /api/og | ✅ /api/og |
| Schema: LocalBusiness | ❌ Organization only | ✅ Org + LocalBusiness |
| Schema: FAQPage | ✅ Homepage | ✅ Homepage |
| Qualification flow | ✅ 762 lines, 14 screens | ✅ Multi-screen |
| Flow state persistence | ❌ | ❌ |
| Client logo strip | ❌ | ❌ |
| AggregateRating schema | ❌ | ❌ |
| CDN render-blocking CSS | ❌ | ❌ Tabler Icons |
| next/font | ✅ | ❌ |
| 'use client' components | 3 (admin only) | 23 |
| Duplicate component files | ❌ | ⚠️ Nav/Footer/TrustBar |
| Accent colour per spec | ✅ Teal | ⚠️ Teal (orange intended per AUTORUN) |
| Pre-footer CTA in layout | ❌ Footer.tsx unused | ❌ |

---

## Data Points from Code Audit

| Metric | Cleaning | Security |
|---|---|---|
| Total components | 17 | 28 (inc. admin) |
| Total pages | 44 | 41 |
| Aria attributes (occurrences) | 89 | 15 |
| Focus style occurrences | 601 | 10 |
| Animation occurrences | 278 | 216 |
| Client components | 3 admin pages | 23 files |
| Trust signal occurrences | 397 | 745 |
| CTA anchor occurrences | 137 | 104 |
| Accent colour occurrences | 445 (#4ecdc4) | 553 (#4ecdc4) |
| Images in /public | 2 | 0 (all Cloudinary) |
| Plain `<img>` tags | 3 | 0 |
| Qualification flow size | 762 lines | ~600+ lines |

---

## Detailed Audit Files

1. `MOBILE-RESPONSIVENESS-AUDIT.md` — Start here; mobile is primary conversion surface
2. `NAVIGATION-IMPROVEMENT-PLAN.md` — Structural changes affecting all pages
3. `CONVERSION-OPTIMISATION-PLAN.md` — CTA map, friction points, sticky bar spec
4. `ACCESSIBILITY-AUDIT.md` — WCAG 2.1 AA compliance gaps (Level A failures exist)
5. `BRANDING-CONSISTENCY-AUDIT.md` — Favicon, font, colour identity, OG images
6. `PERCEIVED-PERFORMANCE-AUDIT.md` — Font loading, CDN, LCP/CLS patterns
7. `TRUST-SIGNAL-AUDIT.md` — Credibility gaps vs Cleanology, Corps Security
8. `HOMEPAGE-IMPROVEMENT-PLAN.md` — First-fold hierarchy, user journey optimisation
