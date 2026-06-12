# ACCESSIBILITY AUDIT
**Sites:** cleaning.vigilservices.co.uk · security.vigilservices.co.uk
**Standard:** WCAG 2.1 AA
**Note:** This is a code-based audit. Full WCAG compliance requires live testing with assistive technology (NVDA, VoiceOver, JAWS).

---

## COLOUR CONTRAST

### Calculated contrast ratios

| Foreground | Background | Ratio | AA normal | AA large | Notes |
|------------|------------|-------|-----------|----------|-------|
| White #fff | Navy #0a1628 | 16.1:1 | PASS | PASS | Body text — excellent |
| Teal #4ecdc4 | Navy #0a1628 | 9.0:1 | PASS | PASS | Accent text on dark — excellent |
| Navy #0a1628 | Teal #4ecdc4 | 9.0:1 | PASS | PASS | Cleaning `.btn-primary` — excellent |
| **White #fff** | **Teal #4ecdc4** | **1.9:1** | **FAIL** | **FAIL** | **Security `.btn-primary` — CRITICAL** |
| rgba(255,255,255,0.75) | Navy #0a1628 | ~11.0:1 | PASS | PASS | Nav links |
| rgba(255,255,255,0.55) | Navy #0a1628 | ~7.5:1 | PASS | PASS | Secondary body text |
| rgba(255,255,255,0.45) | #0f1f36 | ~4.3:1 | FAIL | PASS | Service card descriptions — borderline |
| rgba(255,255,255,0.35) | Navy #0a1628 | ~3.6:1 | FAIL | PASS | EEAT bar, footer address |
| rgba(255,255,255,0.30) | #060f20 | ~2.4:1 | FAIL | FAIL | SEO block text — fails all thresholds |

**Critical failure — Security `btn-primary`:**
`security/app/globals.css:12`: `.btn-primary { @apply ... text-white bg-[#4ecdc4] ... }`
White on teal #4ecdc4 = **1.9:1** — fails WCAG AA by a factor of 2.4× for normal text.
At 14px weight 500 (not bold per WCAG definition at <700 weight), the 4.5:1 threshold applies.

Fix: change `text-white` to `text-[#0a1628]` — navy on teal = 9.0:1 ✓
(The cleaning site's `btn-primary` correctly uses `color: var(--navy)` — security regressed from this.)

**Dim text failures across both sites:**
The pattern `rgba(255,255,255,0.30)` for SEO block text and `rgba(255,255,255,0.35)` for EEAT/footer address text are below the 4.5:1 threshold. While these are informational (not interactive), WCAG 1.4.3 applies to all text.

Fix: increase all text opacity to 0.55 minimum. SEO blocks serve a dual purpose (crawlable + readable) — at 0.30 opacity they may not read as real content to users with moderate low vision.

---

## MISSING SKIP LINK — WCAG 2.4.1 (Level A)

**Both sites.** Neither layout includes a skip-to-main-content link.

WCAG 2.4.1 requires a mechanism to bypass repeated navigation blocks. Every page forces keyboard/AT users to navigate through the full nav bar before reaching page content.

`app/page.tsx:255`: `<main id="main-content">` exists ✓ — the anchor target is already in place.

Fix: insert as first focusable element in `app/layout.tsx`:
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-[#4ecdc4] focus:text-[#0a1628] focus:px-4 focus:py-2 focus:rounded focus:text-[14px] focus:font-medium"
>
  Skip to main content
</a>
```
The `.sr-only` class is already defined in `globals.css` ✓.

---

## MISSING FOCUS STYLES — WCAG 2.4.7 (Level AA)

**Both sites.** `.btn-primary` and `.btn-outline` have no `focus-visible` ring.

WCAG 2.4.7: "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible."

Tailwind resets default browser focus outlines. Without explicit `focus-visible` styles, keyboard users see no focus indicator on the primary action buttons — the most important interactive elements on the page.

Fix for `globals.css` (cleaning):
```css
.btn-primary:focus-visible {
  outline: 2px solid #4ecdc4;
  outline-offset: 2px;
}
.btn-outline:focus-visible {
  outline: 2px solid #4ecdc4;
  outline-offset: 2px;
}
```
Security: replace `#4ecdc4` with `#EA580C` in security globals.css.

---

## NAV HAMBURGER — MISSING aria-expanded — WCAG 4.1.2

**Both sites.**
- Cleaning `Nav.tsx:75`: `aria-label="Toggle menu"` ✓ but no `aria-expanded`
- Security `shared/Nav.tsx:74`: `aria-label="Toggle menu"` ✓ but no `aria-expanded`

WCAG 4.1.2: "For all user interface components… the name, role, and value are programmatically determinable."

A screen reader user hears "Toggle menu, button" — they cannot determine whether the menu is currently open or closed without exploring the DOM.

Fix:
```tsx
<button
  aria-label="Toggle menu"
  aria-expanded={open}
  aria-controls="mobile-menu"
  onClick={() => setOpen((v) => !v)}
>
```
Add `id="mobile-menu"` to the mobile menu container div.

---

## FORM LABELS NOT PROGRAMMATICALLY ASSOCIATED — WCAG 1.3.1

**Cleaning QualificationFlow.tsx — all form screens.**

Every `<label>` / `<input>` pair in the qualification flow lacks `htmlFor` / `id` association:

```tsx
// Current — no association:
<label className={s.fl}>Name</label>
<input className={s.fin} value={ans.wiName} onChange={...} />

// Required — explicit association:
<label htmlFor="wiName" className={s.fl}>Name</label>
<input id="wiName" className={s.fin} value={ans.wiName} onChange={...} />
```

Affected screens:
- `write-in`: wiName, wiCompany, wiEmail, wiPhone, wiReqs (5 fields)
- `outside-london` sub-form: olName, olEmail (2 fields)
- `careers-form`: crName, crEmail, crPhone, crPostcode, crExp, crEligible, crDbs, crLetter (8 fields)
- `postcode` screen: postcode input (1 field)

Total: 16 input fields without programmatic label association.

Fix: add `id` to each input and matching `htmlFor` to each label. The `id` values can be the existing `Ans` key names.

---

## QUALIFICATION FLOW — iOS ZOOM PREVENTION

**Cleaning QualificationFlow.tsx** (styles in QualificationFlow.module.css — not reviewed).

iOS Safari auto-zooms the viewport when an `<input>` or `<select>` has `font-size < 16px`. This is a known issue that breaks the flow experience.

The module CSS was not accessible in this audit. The following inputs must be verified to have `font-size: 16px` minimum:
- Postcode input (`s.fin`)
- Write-in form inputs (`s.fin`)
- Careers form inputs (`s.fin`)
- All `<select>` dropdowns (`s.finSelect`, `s.rsel`)
- The result screen date picker (`s.rdate`)

Fix: ensure all input/select/textarea elements in `QualificationFlow.module.css` have `font-size: 16px`. Tailwind equivalent: `text-base`.

---

## FAQ ACCORDION — CONTENT STILL IN DOM WHEN COLLAPSED

**Cleaning `FAQAccordion.tsx:30–33`:**
```tsx
<div className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? 'max-h-[600px]' : 'max-h-0'}`}>
  <p className="px-5 pb-5 ...">
    {item.answer}
  </p>
</div>
```

Collapsed panels use `max-h-0` (CSS height), not `display: none` or `hidden`. The content is present in the DOM and can be read by some screen readers even when visually hidden.

WCAG 1.3.1: Content that is visually hidden should also be hidden from the accessibility tree.

Fix: add `aria-hidden={open !== i}` to the panel div, or use `hidden` attribute toggled with the open state. The `hidden` attribute approach is simpler:
```tsx
<div
  hidden={open !== i}
  className="overflow-hidden transition-all duration-300 ease-in-out"
>
```

Note: Using `hidden` removes the CSS transition. For animated collapse with AT hiding, the recommended approach is `aria-hidden`:
```tsx
<div
  aria-hidden={open !== i}
  className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? 'max-h-[600px]' : 'max-h-0'}`}
>
```

---

## HEADING HIERARCHY

**Cleaning homepage `app/page.tsx`:**
- H1 (one): "London's specialist commercial cleaning company" ✓
- H2 (multiple): section headings throughout ✓
- H3 (in cards): Why Vigil card titles ✓
- H2 in SEO block at `font-size: 18px` — these are inside a 2-column section and visually appear as sub-headings, but are coded as H2 (same level as the section headings above). Recommendation: recode as H3 inside the SEO block section.

**No H1→H3 jumps detected.** The hierarchy is structurally correct, with the SEO block H2 → H3 downgrade the one recommended improvement.

---

## WCAG 2.1 AA COMPLIANCE MATRIX

| Criterion | Level | Cleaning | Security | Notes |
|-----------|-------|----------|----------|-------|
| 1.1.1 Non-text content | A | Partial | Partial | Logo alt="" correct; emoji buttons lack text alternatives |
| 1.3.1 Info & relationships | A | Fail | Unknown | QualFlow form labels not associated |
| 1.4.3 Contrast minimum | AA | Partial | Fail | Security btn-primary 1.9:1; dim text both sites |
| 1.4.4 Resize text | AA | Pass | Pass | clamp/em sizing used |
| 2.1.1 Keyboard accessible | A | Pass | Pass | All interactive elements reach keyboard |
| 2.4.1 Bypass blocks | A | Fail | Fail | No skip link on either site |
| 2.4.7 Focus visible | AA | Fail | Fail | No focus-visible ring on CTAs |
| 4.1.2 Name, role, value | A | Partial | Partial | aria-expanded missing on hamburger |

**Overall WCAG 2.1 AA status: Non-compliant on both sites.**
Primary failures: contrast (security), skip link (both), focus styles (both), form labels (cleaning).

---

## QUANTITATIVE COVERAGE (from full codebase scan, 2026-06-12)

| Metric | Cleaning | Security | Gap |
|---|---|---|---|
| aria-* / role= / tabIndex / sr-only occurrences | **89** | **15** | Security 83% below cleaning |
| focus: / focus-visible: / outline / ring occurrences | **601** | **10** | Security has near-zero focus styles |
| `'use client'` components | 3 (admin only) | **23** | 23 client components increases hydration overhead |
| Plain `<img>` tags | 3 | 0 | Cleaning: 3 images need alt verification |

The security site's aria count of 15 across 41 pages and 28 components is critically low. SecurityQualificationFlow, the Sidebar component, and all service page interactive elements lack systematic aria coverage. The 10 focus-style occurrences confirm keyboard navigation is functionally broken on most of the site. The security site requires a dedicated accessibility pass before it can be considered WCAG 2.1 AA compliant.
