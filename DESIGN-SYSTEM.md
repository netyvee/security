# VIGIL DESIGN SYSTEM
# Version: 1.0 — June 2026
# Status: Confirmed by founder
# Governs: All Vigil division websites
#
# READ THIS BEFORE TOUCHING ANY COMPONENT ON ANY SITE.
# This document is the authoritative source for visual decisions.
# It overrides any code that contradicts it.

---

## CORE PRINCIPLE

All Vigil division websites share the SAME LAYOUT STRUCTURE.
Each division is visually distinct through its ACCENT COLOUR only.
Never mistake shared structure for shared colour palette.

---

## SHARED LAYOUT STRUCTURE (all divisions)

Every Vigil website uses this exact section order:

1. Sticky navigation bar
2. Hero section (with qualification flow above fold)
3. Trust/stats bar
4. Intro content section
5. Services grid
6. Why Vigil section (EEAT)
7. Compliance strip
8. Sectors served
9. Borough/coverage section
10. FAQ section
11. Final CTA section
12. Footer

This order never changes between divisions.
Components within each section adapt — structure does not.

---

## SHARED TYPOGRAPHY (all divisions)

Font pairing (BOTH fonts on ALL sites — no exceptions):
- Body: DM Sans — loaded via next/font/google, display: swap
- Headings: Playfair Display — loaded via next/font/google, display: swap

CSS variables:
- --font-dm-sans
- --font-playfair

This was confirmed in the original design session May 2026.
The security site currently does not load these fonts — this is a bug.

---

## SHARED BASE COLOUR (all divisions)

Primary background: #0a1628 (navy)
This never changes across any Vigil site.

Secondary background (alternate sections): #0d1a2d
Card backgrounds: #0f1f36
Darker sections (nav, footer): #060e1a
Darkest (footer base): #04090f

Text on dark backgrounds:
- Primary: #ffffff
- Secondary: rgba(255,255,255,0.65)
- Tertiary: rgba(255,255,255,0.4)
- Micro-copy: rgba(255,255,255,0.25)

---

## DIVISION ACCENT COLOURS

| Division | Accent | Use |
|----------|--------|-----|
| Cleaning | #4ecdc4 (teal) | CTAs, links, chips, borders, icons |
| Security | #EA580C (orange) | CTAs, links, chips, borders, icons |
| Care | #0284c7 (sky blue) | CTAs, links, chips, borders, icons |
| Staffing | #0284c7 (sky blue) | Same as Care (sister division) |
| CRM/App | rgba(255,255,255,0.35) | Subtle white — parent brand |

The accent colour is the ONLY colour that changes between divisions.
Everything else — backgrounds, text, card styles — is identical.

---

## CONTRAST REQUIREMENTS (WCAG 2.1 AA)

CLEANING:
- Teal #4ecdc4 on navy #0a1628 = 4.8:1 ✓ AA pass
- Navy #0a1628 on teal #4ecdc4 = 9.0:1 ✓ AA pass (use for CTA text)
- DO NOT use white text on teal — white on teal = 2.1:1 ✗ FAIL

SECURITY:
- Orange #EA580C on navy #0a1628 = 4.6:1 ✓ AA pass
- White #ffffff on orange #EA580C = 3.2:1 ✗ FAIL
- Navy #0a1628 on orange #EA580C = 4.8:1 ✓ AA pass (use for CTA text)

RULE: All CTA buttons use dark text on accent background.
- Cleaning: text-[#0a1628] on bg-[#4ecdc4]
- Security: text-[#0a1628] on bg-[#EA580C]
- Never use white text on any accent colour.

---

## FAVICON SYSTEM (confirmed final)

Design: Navy square (#0a1628), VG serif monogram in white,
        open circle arc in division accent colour.
The circle uses stroke-dasharray to reference the open arc
from the existing Vigil logo mark.

| Division | Favicon accent |
|----------|---------------|
| Cleaning | #4ecdc4 |
| Security | #EA580C |
| Care | #0284c7 |
| Staffing | #0284c7 |
| CRM | rgba(255,255,255,0.35) |

Confirmed: The VG favicon on the cleaning site is the final design.
All other sites must implement the same design with their accent colour.
Format: SVG (primary) + PNG fallback for apple-touch-icon.

---

## COMPONENT SPECIFICATIONS

### Navigation bar
Background: #060e1a
Border-bottom: 1px solid rgba([accent-rgb],0.15)
Logo: white text, division accent on division name
Links: rgba(255,255,255,0.55), hover: accent colour
CTA button: bg-[accent] text-[#0a1628] font-weight-700
Sticky: yes (position: sticky, top: 0, z-index: 100)
Mobile: hamburger menu — confirmed present on both sites

### Qualification flow card
Background: #0f1f36
Border: 1px solid rgba([accent-rgb],0.2)
Border-radius: 14px
Progress bar: accent colour fill, rgba([accent-rgb],0.12) track
Option cards: background #162338, hover border-color accent
Selected card: bg rgba([accent-rgb],0.07), border accent
Continue button: bg-[accent] text-[#0a1628] full width
Footer: bg #060e1a, trust pills in accent colour

### CTA section (CTASection component)
Primary button: bg-[accent] text-[#0a1628] font-bold
Outline button: border rgba([accent-rgb],0.35) text-[accent]
Both must point to CRM enquiry URL — never internal routes

### Trust chips / pills
background: rgba([accent-rgb],0.10)
border: 0.5px solid rgba([accent-rgb],0.25)
text: accent colour
font-size: 12px

### Service cards
Background: #0f1f36
Border: 1px solid rgba([accent-rgb],0.10)
Border-radius: 10px
Hover: border-color rgba([accent-rgb],0.35)

### FAQ items
Background: #0f1f36
Border: 1px solid rgba(255,255,255,0.06)
Border-radius: 10px
Question text: white, font-weight 700
Answer text: rgba(255,255,255,0.5)
Expand icon: accent colour

---

## WHAT MUST NEVER CHANGE BETWEEN SESSIONS

1. Navy #0a1628 as primary background — never change
2. Division accent colours — never change without founder approval
3. Font pairing (DM Sans + Playfair) — never change
4. CTA text colour (navy on accent) — never change to white on accent
5. VG favicon design — never redesign without founder approval
6. Section order — never reorder homepage sections
7. Nav structure — never remove links or CTA without approval

---

## WHAT REQUIRES FOUNDER APPROVAL BEFORE CHANGING

- Any colour value
- Any font change
- Any logo or favicon change
- Any nav link addition or removal
- Any footer structural change
- Any CTA label change
- Any section removal from homepage

---

## WHAT CLAUDE CODE CAN CHANGE WITHOUT APPROVAL

- Content within sections (text, copy)
- Internal links (adding, fixing)
- Schema markup
- Meta descriptions and titles
- Image alt text
- Bug fixes that restore correct behaviour
- Accessibility improvements (adding aria, focus styles)

