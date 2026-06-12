# PERCEIVED PERFORMANCE AUDIT
**Sites:** cleaning.vigilservices.co.uk · security.vigilservices.co.uk
**Note:** Lighthouse cannot be run in this session. This audit assesses performance patterns from code analysis only. Scores are estimates; verify with PageSpeed Insights.

---

## CLEANING SITE — PERFORMANCE ASSESSMENT

### Rendering architecture

| Component | Rendering | Impact |
|-----------|-----------|--------|
| `app/page.tsx` (homepage) | Server Component ✓ | Good LCP — HTML arrives pre-rendered |
| `components/Nav.tsx` | Client Component (useState) | Adds to hydration bundle |
| `components/QualificationFlow.tsx` | Client Component | Large bundle (~763 lines + @tabler/icons) |
| `components/SiteFooter.tsx` | Client Component (`'use client'`) | Unnecessary — no interactive state |
| `components/MobileBookingButton.tsx` | Client Component (scroll listener) | Correct — needs DOM event |
| `components/CTASection.tsx` | Server Component ✓ | No JS needed |
| `components/FAQAccordion.tsx` | Client Component (useState) ✓ | Correct — interactive |
| `components/TrustBar.tsx` | Server Component ✓ | No JS needed |

**Concern:** `SiteFooter.tsx` has `'use client'` at line 1 with no interactive state — only `onMouseEnter`/`onMouseLeave` handlers which could be replaced with CSS `:hover`. Removing `'use client'` from this component would reduce the client JS bundle.

### Font loading

`app/layout.tsx:8–21`: Uses `next/font/google` with `display: "swap"` ✓
- DM Sans: weights 300, 400, 500
- Playfair Display: weight 500, normal + italic
- `variable` mode — fonts assigned to CSS custom properties ✓
- Preconnect links in `<head>` ✓

This is the correct implementation. Fonts are self-hosted at build time, no external network call at runtime.

### Image strategy

- `public/images/vigil-logo.png` — only image in public/
- `Nav.tsx:31`: `<Image ... priority />` — correct, LCP-eligible image gets priority ✓
- `Nav.tsx:32`: `width={36} height={36}` — explicit dimensions prevent CLS ✓
- `ImagePlaceholder.tsx` is used on service and borough pages — no real images currently

**No large unoptimised images in /public.** The site relies primarily on backgrounds and CSS, which is good for performance but creates a visual quality gap vs competitors who use photography.

### Third-party scripts

`app/layout.tsx:154`: GTM loaded with `strategy="afterInteractive"` ✓ — does not block render
DNS prefetch for Google Analytics and Clarity ✓

### Bundle size concerns

`QualificationFlow.tsx` imports:
```tsx
import {
  IconBuildingSkyscraper, IconCrane, IconHeartRateMonitor,
  IconCalendarWeek, IconCalendar, IconCalendarCheck,
  IconTool, IconSparkles, IconLayoutFilled, IconLayout2,
  IconBuilding, IconHelp, IconSunrise, IconSun, IconMoon,
  IconWash, IconUsers, IconBriefcase, IconArrowLeft,
  IconArrowRight, IconSend, IconCheck, IconPhone, IconMail,
} from '@tabler/icons-react'
```

This is 24 named imports from `@tabler/icons-react`. With tree-shaking, only these icons are bundled. However, `@tabler/icons-react` uses SVG-in-JS — each icon is an inline SVG React component. The total adds ~15–30kb to the client bundle for this file.

Since `QualificationFlow` is a client component that loads below the fold, this does not affect LCP but does increase TTI and Total Blocking Time.

**Recommendation:** Consider lazy loading QualificationFlow with `next/dynamic` and `{ loading: () => <FlowSkeleton /> }`. The flow is below the hero on the homepage — no user sees it before scroll.

### No skeleton loading

`QualificationFlow` is rendered synchronously on the homepage. On slower connections, the user sees the hero and stats bar but the qualification flow area is empty until JS hydrates. There is no loading skeleton.

**Recommendation:** Add a static skeleton/placeholder for the QualificationFlow area that matches its approximate dimensions. This prevents layout shift on hydration.

### CLS risks

- `Nav.tsx:30–38`: Image with explicit width/height ✓ — no CLS
- Stats bar: fixed height with grid — no CLS ✓
- No images without explicit dimensions found
- `SiteFooter.tsx:18`: `gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'` — auto-fit grids can cause reflow as columns resolve. Consider fixed `grid-cols-2 md:grid-cols-4` pattern instead.

**Estimated mobile Lighthouse score (cleaning): 78–85**
Primary bottlenecks: QualificationFlow client bundle, SiteFooter 'use client', no skeletons.

---

## SECURITY SITE — PERFORMANCE ASSESSMENT

### Critical: Render-blocking resources

**Issue 1 — Google Fonts via CSS @import:**
`security/app/globals.css:5`:
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans...');
```

CSS `@import` is processed after the main CSS file is parsed — it is render-blocking and adds a full network round-trip before fonts can be requested. On a mobile 4G connection (~20Mbps), this can add 150–400ms to FCP.

Compare to cleaning site: uses `next/font/google` which self-hosts fonts, eliminates the external request, and adds a `<link rel="preload">` automatically.

**Issue 2 — CDN Tabler Icons webfont:**
`security/app/layout.tsx:96`:
```tsx
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
```

This is a `<link>` in the `<head>` — it is **render-blocking CSS**. The browser cannot render the page until this external CSS file is fetched.

The `@tabler/icons-webfont` package loads a full icon font (~150–200kb including the .woff2 file). However, the security site uses `@tabler/icons-react` React components (SecurityQualificationFlow imports icon components). The webfont appears to be a redundant duplicate that provides no benefit while causing render-blocking overhead.

**Recommended fix:** Remove the CDN link from the layout. Keep `@tabler/icons-react` imports in components. Verify no icon font classes (`ti ti-shield` etc.) are used anywhere — if none are, the webfont provides zero value.

### Font strategy

- `globals.css`: `@import url(...)` — render-blocking ✗
- No `next/font` configuration found in `security/app/layout.tsx`
- Body text may FOUT (flash of unstyled text) on slower connections

**Fix:** Replace @import with `next/font/google` matching the cleaning site implementation.

### Body background

`security/app/globals.css:9`: `@apply bg-navy` sets navy background.
`security/app/layout.tsx:98`: `<body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>` — no explicit `background-color`.

If Tailwind CSS takes more than one render cycle to apply, there may be a flash of white background before `bg-navy` is applied. This is rare but can occur on slower connections.

**Fix:** Add `backgroundColor: '#0a1628'` to the body inline style in layout.tsx as a guarantee.

### No favicon — browser request cost

The security site has no favicon. Browsers attempt to load `https://security.vigilservices.co.uk/favicon.ico` on every page load and get a 404. This is a wasted network request (typically 10–30ms) on every pageview.

**Fix:** Add a favicon (see Branding Consistency Audit).

### Estimated mobile Lighthouse score (security): 65–72

Primary bottlenecks: render-blocking font @import, render-blocking CDN CSS link, no next/font, missing favicon (404 request).

---

## SHARED ISSUES — BOTH SITES

### No lazy loading for qualification flows

Both `QualificationFlow` and `SecurityQualificationFlow` are imported directly, not with `next/dynamic`. These are large client components (700+ lines each) that render below the fold on the homepage.

Using `next/dynamic` with `{ ssr: false }` would defer their JS loading until after the page is interactive, improving TTI and potentially Lighthouse score.

```tsx
// Instead of:
import QualificationFlow from '@/components/QualificationFlow'

// Use:
const QualificationFlow = dynamic(() => import('@/components/QualificationFlow'), {
  ssr: false,
  loading: () => <FlowSkeleton />
})
```

### GTM loading

Both sites load GTM `afterInteractive` ✓. The cleaning site uses `GTM-KRNS3652`, security uses `GTM-N74LRNBJ`. Both hardcoded — environment variable approach would be safer but this is low priority.

---

## PRIORITY FIXES

| # | Fix | Site | Score impact |
|---|-----|------|-------------|
| 1 | Replace Google Fonts @import with next/font | Security | High (+8–12pts) |
| 2 | Remove redundant Tabler Icons CDN CSS link | Security | High (+5–8pts) |
| 3 | Add background-color to security layout body | Security | Low |
| 4 | Remove 'use client' from SiteFooter (use CSS hover) | Cleaning | Low (+2pts) |
| 5 | Lazy-load qualification flows with next/dynamic | Both | Medium (+3–5pts) |
| 6 | Add loading skeleton for qualification flow area | Both | Medium (CLS) |
