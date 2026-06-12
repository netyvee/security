# BRANDING CONSISTENCY AUDIT
**Sites:** cleaning.vigilservices.co.uk · security.vigilservices.co.uk
**Design system:** CLAUDE.md Layer 2 — navy #0a1628 base, teal #4ecdc4 for cleaning, orange #EA580C for security

---

## EXECUTIVE SUMMARY

The cleaning site is **broadly consistent** with the design system. Minor issues only.

The security site has a **systemic branding failure**: every accent colour in every component is teal (#4ecdc4) when the design system specifies orange (#EA580C) for security. This affects the Tailwind config, globals.css, all shared components, the nav, footer, floating CTA, FAQ accordion, and section tags. The security site is visually indistinguishable from the cleaning site in terms of accent colour.

---

## SECURITY — ACCENT COLOUR FAILURES

### Root cause
`security/tailwind.config.ts:12`: `accent: '#4ecdc4'`
Should be: `accent: '#EA580C'`

This single config error cascades through every `bg-accent`, `text-accent`, `border-accent` utility in the codebase.

Additionally, `security/app/globals.css` hardcodes teal in component classes:
```css
.btn-primary { @apply ... bg-[#4ecdc4] ... }         /* should be #EA580C */
.section-tag { @apply ... text-[#4ecdc4] ... }        /* should be #EA580C */
.quick-answer-block { @apply ... border-[#4ecdc4] ... }/* should be #EA580C */
.tldr { @apply ... text-[#4ecdc4] ... }               /* should be #EA580C */
```

### Component-by-component failures

| Component | File | Issue |
|-----------|------|-------|
| Nav CTA button | `components/shared/Nav.tsx:65–68` | `bg-[#4ecdc4] hover:bg-[#3dbdb4]` — should be orange |
| Nav link hover | `components/shared/Nav.tsx:50` | `hover:text-[#4ecdc4]` — should be orange |
| Nav wordmark | `components/shared/Nav.tsx:37` | `color: "#fff"` (cleaning uses teal `#4ecdc4`) — consistent? See note below |
| FloatingCTA | `components/FloatingCTA.tsx:38` | `bg-[#4ecdc4] hover:bg-[#3dbdb4]` — should be orange |
| FloatingCTA glow | `components/FloatingCTA.tsx:43` | `rgba(78, 205, 196, 0.3)` — should be orange rgba |
| Footer brand em | `components/shared/Footer.tsx:44` | `text-[#4ecdc4]` — should be orange |
| Footer link hover | `components/shared/Footer.tsx:63` | `hover:text-[#4ecdc4]` — should be orange |
| FAQAccordion chevron | `components/shared/FAQAccordion.tsx:23` | `stroke="#4ecdc4"` — should be orange |
| TrustBar | `components/TrustBar.tsx` (security) | needs review — has its own component |
| All .section-tag | `globals.css` | teal — should be orange |
| All .btn-primary | `globals.css` | teal bg — should be orange |
| All .quick-answer-block | `globals.css` | teal border — should be orange |
| All .tldr | `globals.css` | teal text — should be orange |

**Note on nav wordmark colour:** Cleaning nav wordmark uses `color: "#4ecdc4"` (teal). Security nav wordmark uses `color: "#fff"` (white). This may be intentional differentiation — white on dark for security's more serious tone — or it may be an oversight. CLAUDE.md does not specify. Keep white for security as it reads as more authoritative/serious.

---

## SECURITY — CRM FORM COLOUR MISMATCH (known issue)

**Confirmed:** `app.vigilservices.co.uk/enquire/security` uses a purple header colour.
**Expected:** Orange (#EA580C) to match security brand.
**Status:** Known issue per AUTORUN-UI-UX-REVIEW.md. Fix is in the Laravel CRM, not the Next.js sites.
**Impact:** Every visitor who clicks "Get a quote" and reaches the CRM form sees a purple header — the brand breaks at the final conversion step. High priority fix once CRM access is available.

---

## CLEANING — MINOR CONSISTENCY ISSUES

### Two footer components

| Component | Used in layout? | Has pre-footer CTA? | Style |
|-----------|----------------|---------------------|-------|
| `Footer.tsx` | ✗ No | ✓ Yes ("Start your cleaning contract today") | Tailwind classes |
| `SiteFooter.tsx` | ✓ Yes | ✗ No | Inline styles |

The `Footer.tsx` uses Tailwind classes (`bg-navy`, `text-teal`, etc.) consistently with the design system.
The `SiteFooter.tsx` uses inline styles with hardcoded hex values — duplicating the design tokens.

This split creates maintenance risk: a colour change requires updating both files. The inline style approach in `SiteFooter.tsx` also bypasses the Tailwind purge/JIT system, potentially including dead CSS.

**Recommendation:** Consolidate to one footer component using `Footer.tsx` (the richer component) and swap the layout import.

### Inline styles vs Tailwind classes

Throughout `SiteFooter.tsx`, hover states use `onMouseEnter`/`onMouseLeave` event handlers:
```tsx
onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = '#4ecdc4'; }}
onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)'; }}
```

This is fragile (relies on TypeScript casting), leaks colour values out of the design system, and requires `'use client'` on a component that has no other interactive state.

`Footer.tsx` uses `hover:text-[#4ecdc4]` Tailwind class instead ✓ — cleaner pattern.

### `SiteFooter.tsx` insurance claim

`SiteFooter.tsx:148`: "£5 million public liability insurance"
`Footer.tsx:147`: "£5m public liability insurance"
`Homepage page.tsx:307`: "£5m insured"
`TrustBar.tsx:2`: "£5m"

Minor inconsistency: "£5 million" vs "£5m" — should be standardised. Choose one form.

---

## FAVICON & BRAND ASSETS

### Cleaning site

| Asset | Status | Notes |
|-------|--------|-------|
| `/public/favicon.svg` | ✓ Present | |
| `layout.tsx icons.icon` | `/favicon.svg` ✓ | |
| `layout.tsx icons.apple` | `/favicon.svg` ✗ | Apple expects PNG 180×180 — SVG may not display on iOS |
| `/public/apple-touch-icon.png` | ✗ Missing | Required for iOS homescreen icon |
| `/public/site.webmanifest` | ✗ Missing | PWA manifest for Android homescreen icon |
| OG image | `/api/og` dynamic ✓ | |

### Security site

| Asset | Status | Notes |
|-------|--------|-------|
| `/public/favicon.svg` | ✗ Missing | No favicon at all |
| `/public/favicon.ico` | ✗ Missing | |
| `/public/apple-touch-icon.png` | ✗ Missing | |
| `/public/site.webmanifest` | ✗ Missing | |
| `layout.tsx icons` | ✗ Not defined | No icons metadata in layout |
| OG image | `/api/og` referenced in metadata | Status of this route unknown — needs verification |

The security site has **zero favicon configuration**. Browser tabs show a blank/generic icon for every visitor. For a B2B security company, this is a significant trust signal gap — returning visitors cannot identify the tab.

---

## TYPOGRAPHY CONSISTENCY

### Cleaning — matches CLAUDE.md spec
- H1: Playfair Display, clamp(34px,3.8vw,50px), weight 500 ✓
- H2: Playfair Display, clamp(26px,2.8vw,36px), weight 500 ✓
- H3: DM Sans, 17px, weight 500 ✓ (globals.css)
- Body: DM Sans, 15px, weight 300, line-height 1.8 ✓
- Section tag: DM Sans, 11px, weight 500, uppercase, tracking 0.1em ✓
- Buttons: DM Sans, 14px, weight 500 ✓

### Security — mostly matches
- Same font families ✓
- Same button typography ✓
- `btn-primary` adds `text-white` instead of `text-navy` — accessibility failure (see Accessibility audit) AND branding deviation from CLAUDE.md spec ("Use the shared packages/ui and packages/design — do NOT fork a separate design system")
- Section tags use `text-[#4ecdc4]` — should be `text-[#EA580C]` for orange

---

## DESIGN SYSTEM RECOMMENDATION

Security should adopt orange as its primary accent everywhere teal currently appears. The fix is:

1. `tailwind.config.ts`: change `accent: '#4ecdc4'` → `accent: '#EA580C'` and `accent-dark: '#3dbdb4'` → `accent-dark: '#C04B0A'`
2. `globals.css`: change all hardcoded `#4ecdc4` to `#EA580C`
3. `components/shared/Nav.tsx`: change CTA bg and hover colours
4. `components/FloatingCTA.tsx`: change bg, hover, box-shadow rgba
5. `components/shared/Footer.tsx`: change brand em and link hover colours
6. `components/shared/FAQAccordion.tsx`: change chevron stroke colour

This is a find-and-replace of `#4ecdc4` → `#EA580C` and `rgba(78,205,196` → `rgba(234,88,12` across all security site files.
