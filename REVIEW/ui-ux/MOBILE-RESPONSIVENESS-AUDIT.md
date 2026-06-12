# MOBILE RESPONSIVENESS AUDIT
**Sites:** cleaning.vigilservices.co.uk · security.vigilservices.co.uk
**Breakpoints assessed:** 320px · 375px · 390px · 428px · 768px · 1024px · 1440px
**Standard:** WCAG 2.5.5 (44×44px touch targets) · iOS zoom prevention (16px inputs)

---

## 1. NAVIGATION — HAMBURGER TAP TARGET

**Issue:** The mobile hamburger button has no explicit padding or min-height.
- Cleaning `Nav.tsx:72–80`: `<button className="md:hidden text-white">` — no padding, no min-height.
- The button contains three `<span>` bars (w-6, h-0.5) totalling ~12px height with no spacing.
- Effective tap target is approximately 24×14px — well below the WCAG 2.5.5 recommendation of 44×44px.
- Security `shared/Nav.tsx:73–92`: Same issue — SVG icon inside button with no padding.

**Severity:** High
**User impact:** Users on small Android devices (320–375px) regularly miss the hamburger, causing them to leave rather than navigate.
**Recommended solution:** Add `p-3` (12px padding on all sides) to the hamburger button element, giving an effective 48×48px target area while the visual icon stays unchanged. Also add `min-h-[44px] flex items-center` as a safety net.
**Expected benefit:** Eliminates tap-miss failures — critical for mobile conversion rates.
**Implementation complexity:** Low
**Regression risk:** None — padding is outward, does not affect layout of other elements.

---

## 2. NAVIGATION — MOBILE MENU PATTERN

**Issue:** The mobile menu is absolutely positioned (`absolute top-16 left-0 right-0`) and drops down over page content with no animation, no backdrop, and no close-on-outside-click.

- Cleaning `Nav.tsx:83–104`: Drops as absolute div. Closes when a link is clicked ✓ but no backdrop click to close.
- Security `shared/Nav.tsx:95–119`: Same pattern. No backdrop. No focus trap.
- At 320px, a 5-link menu with phone + CTA adds ~270px of height, potentially obscuring all above-fold content on short phones.

**Severity:** Medium
**User impact:** Users who accidentally open the menu cannot close it by tapping outside — they must tap the hamburger again (which they may miss). No animation makes the interaction feel broken.
**Recommended solution:**
1. Add `onClick={() => setOpen(false)}` to an invisible backdrop div rendered behind the menu at `z-index: 49`.
2. Add a CSS transition: `transition-all duration-200` with max-height 0 → max-height:500px for smooth open/close.
3. Consider upgrading to a slide-in drawer (translate-x) for phones — industry standard pattern (Cleanology, Corps Security).
**Expected benefit:** Reduces bounce from menu confusion; improves perceived quality.
**Implementation complexity:** Low
**Regression risk:** Low

---

## 3. MOBILE BOOKING BUTTON — COLOUR MISMATCH

**Issue:** `MobileBookingButton.tsx:28`: `className="... bg-white/95 ... border-t border-gray-200"` — white background on a site with dark navy theme.

- The entire site is navy (#0a1628) background. The mobile sticky bar is white, creating a jarring break.
- This is present in the cleaning `layout.tsx` and renders on every page.
- No equivalent on the security site.

**Severity:** Medium
**User impact:** Visual inconsistency destroys theme coherence. On dark pages (all pages), a white bar appearing at the bottom reads as an error or unrelated UI element.
**Recommended solution:** Change to dark theme: `bg-[rgba(10,22,40,0.95)] border-t border-[rgba(78,205,196,0.15)]` with `text-navy` → `text-[#4ecdc4]` on the button text or keep navy-on-teal.
**Expected benefit:** Design coherence; higher click rate when button matches page brand.
**Implementation complexity:** Low
**Regression risk:** None

---

## 4. TRUST BAR — HORIZONTAL SCROLL WITHOUT AFFORDANCE

**Issue:** `TrustBar.tsx:12–13`: `className="... overflow-x-auto"` with `min-w-max md:min-w-0` — the trust bar scrolls horizontally on mobile but there is no visual indicator (no fade, no scroll shadow, no partial pill visible).

- At 375px, the 6-item trust bar with `gap-8` is approximately 520px wide — the user sees the first 3–4 items only.
- No affordance tells them more items exist to the right.

**Severity:** Low
**User impact:** Users on mobile never see "3-month rolling contracts" or "32 boroughs" trust pills — losing key differentiators.
**Recommended solution:** Add a right-side fade mask using a CSS `::after` pseudo-element on the container: `background: linear-gradient(to right, transparent 80%, #0a1628 100%)`. This signals scrollability. Alternatively, reflow to a 2×3 grid at ≤768px.
**Expected benefit:** All 6 trust signals seen; reinforces key differentiators.
**Implementation complexity:** Low
**Regression risk:** None

---

## 5. QUALIFICATION FLOW — iOS ZOOM PREVENTION

**Issue:** `QualificationFlow.module.css` is not read in this audit, but input font sizes applied via CSS module must be ≥16px to prevent iOS Safari from auto-zooming when an input is focused.

- The postcode input (`QualificationFlow.tsx:435`), write-in form inputs, and careers form inputs are all styled via `s.fin` class.
- If `.fin` applies `font-size: 14px` or smaller, every iOS user gets an unwanted zoom on tap.
- The qualification flow module CSS was not accessible in this reading — **this must be verified**.

**Severity:** High (if font-size < 16px)
**User impact:** iOS zoom on input focus shifts the entire viewport, breaking the flow experience. Users often abandon rather than continue after this happens.
**Recommended solution:** Ensure all `input`, `select`, `textarea` elements in QualificationFlow.module.css have `font-size: 16px` minimum. The `text-base` Tailwind class (16px) is the correct utility.
**Expected benefit:** Eliminates iOS viewport zoom — a top mobile form abandonment cause.
**Implementation complexity:** Low
**Regression risk:** None

---

## 6. STATS BAR — BORDER ARTEFACT ON 2-COLUMN LAYOUT

**Issue:** `app/page.tsx:341–358`: The stats bar grid uses `grid-cols-2 md:grid-cols-4`. Each stat div has `borderRight: i < 3 ? '1px solid ...' : undefined` — designed for a 4-column layout.

- At 375–767px (2-column layout), items 0 and 1 are in row 1, items 2 and 3 are in row 2.
- Items 0 and 2 have a right border that extends to the right edge of the left column — correct.
- Items 1 and 3 (right column) also have a right border — this renders as a border against whitespace/padding with no purpose.
- Item 3 has no border per the logic (`i < 3` = false for i=3) — correct.
- Item 1 has a border (i=1 < 3 = true) — this should be suppressed on the 2-col layout.

**Severity:** Low
**User impact:** Minor visual artefact on mobile — a right border appears on the rightmost column item.
**Recommended solution:** Use `[&:nth-child(2n)]:border-r-0 md:border-r` Tailwind utility to suppress even-column right borders on mobile, or restructure to conditional classes.
**Expected benefit:** Cleaner visual presentation at 375–767px.
**Implementation complexity:** Low
**Regression risk:** None

---

## 7. FORM INPUTS — MISSING LABELS IN WRITE-IN FLOW

**Issue:** In the write-in and outside-London screens of QualificationFlow, labels use `className={s.fl}` (CSS module class). The `<label>` elements do have matching `<input>` siblings but NO explicit `htmlFor`/`id` association.

- `QualificationFlow.tsx:458–459`: `<label className={s.fl}>Your name</label><input className={s.fin} ... />` — no `htmlFor` / no `id`.
- Screen readers may associate them by proximity but WCAG 1.3.1 requires programmatic association.

**Severity:** Medium
**User impact:** Screen reader users on mobile may not hear the label when the input is focused.
**Recommended solution:** Add `id` to each input and matching `htmlFor` to each label. Example: `<label htmlFor="wiName">Name</label><input id="wiName" ...>`.
**Expected benefit:** WCAG 1.3.1 compliance; screen reader usability.
**Implementation complexity:** Low
**Regression risk:** None

---

## 8. SECURITY SITE — FONT LOADING ON MOBILE

**Issue:** `security/app/globals.css:5`: `@import url('https://fonts.googleapis.com/css2?family=DM+Sans...')` — CSS @import is render-blocking on mobile.

- Unlike the cleaning site which uses `next/font` (optimized, self-hosted, preloaded with LCP hint), the security site loads fonts via a CSS @import.
- On mobile networks (4G average ~20Mbps), this adds one extra network round-trip before the browser can render text.
- The security layout also includes `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />` (layout.tsx:96) — a second render-blocking CSS file.

**Severity:** High
**User impact:** On mobile, the page may render with a flash of unstyled text (FOUT) before fonts load. Slower FCP on mobile networks.
**Recommended solution:** Replace the @import with `next/font/google` in the security layout (matching the cleaning site pattern). Remove the CDN Tabler icon font — it is only used via React components which import from `@tabler/icons-react` directly; the webfont is redundant.
**Expected benefit:** Estimated 200–500ms improvement in mobile FCP. Eliminates FOUT.
**Implementation complexity:** Low
**Regression risk:** Low

---

## 9. SECURITY SITE — NO MOBILE BOTTOM BAR

**Issue:** The security site has `FloatingCTA` (centred pill that appears after 300px scroll on non-homepage pages) but no equivalent of the cleaning site's `MobileBookingButton` for the homepage.

- On the security homepage, the `SecurityQualificationFlow` is the primary conversion mechanism. After a user completes or abandons the flow and scrolls back up, there is no persistent CTA at the bottom of the screen.
- The `FloatingCTA` is hidden on homepage (`if (pathname === "/") { setVisible(false) }`).

**Severity:** Medium
**User impact:** Homepage mobile users who exit the qualification flow have no persistent escape hatch to the enquiry form.
**Recommended solution:** Either (a) allow FloatingCTA to show on homepage after 1000px scroll (past the qualification flow), or (b) add a mobile bottom bar to the security layout matching the cleaning site pattern but with orange branding.
**Expected benefit:** Recovered mobile conversions from users who abandon the qualification flow.
**Implementation complexity:** Low
**Regression risk:** Low

---

## SUMMARY TABLE

| # | Issue | Site | Severity | Complexity |
|---|-------|------|----------|------------|
| 1 | Hamburger tap target too small (~14×24px) | Both | High | Low |
| 2 | Mobile menu no backdrop / no animation | Both | Medium | Low |
| 3 | MobileBookingButton white bg on dark site | Cleaning | Medium | Low |
| 4 | TrustBar scrolls with no visual affordance | Cleaning | Low | Low |
| 5 | QualificationFlow inputs: verify ≥16px font | Cleaning | High | Low |
| 6 | Stats bar border artefact on 2-col layout | Cleaning | Low | Low |
| 7 | Write-in form: labels not programmatically linked | Cleaning | Medium | Low |
| 8 | Security: render-blocking font @import + CDN CSS | Security | High | Low |
| 9 | Security: no persistent mobile CTA on homepage | Security | Medium | Low |
