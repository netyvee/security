# NAVIGATION IMPROVEMENT PLAN
**Sites:** cleaning.vigilservices.co.uk · security.vigilservices.co.uk
**Current pattern:** Sticky top nav · flat links · hamburger mobile menu
**Target pattern:** Sticky top nav · Services dropdown · mobile drawer

---

## CURRENT STATE ASSESSMENT

### Cleaning Nav (components/Nav.tsx)
```
Logo | Services · Locations · Blog · About · FAQ | Phone · [Get a free quote CTA]
```
- 5 centre links + phone + CTA button
- Services → /services/ (hub page — user must then choose a service)
- Locations → /commercial-cleaning-london/ (geographic hub)
- No dropdown on any link
- No active page indicator
- No breadcrumb on inner pages (pages define their own if any)
- Mobile: hamburger → flat list of 5 links + phone + CTA

### Security Nav (components/shared/Nav.tsx)
```
Logo | Services · About · Contact · Careers | Phone · [Get a quote CTA]
```
- 4 centre links + phone + CTA button
- **CRITICAL BUG: CTA href="/" — does not reach any enquiry page**
- Services → /security-services/ (hub page)
- No dropdown
- No active page indicator
- Mobile: hamburger → flat list + phone (NO CTA in mobile menu)

---

## CLICK DEPTH ANALYSIS

### Current state

| Destination | Cleaning | Security |
|-------------|----------|----------|
| Service page | 2 clicks (Services hub → service) | 2 clicks (Services hub → service) |
| Borough page | 3 clicks (Locations hub → commercial hub → borough) | N/A |
| Blog post | 2 clicks (Blog → post) | N/A |
| Contact/enquiry | 1 click (Nav CTA) | 1 click (but CTA is broken) |
| FAQ | 1 click | 1 click |

Service pages should be reachable in 1 click from the nav. Currently they require 2. This is a friction point vs competitors — Cleanology has all service pages in a hover dropdown.

### Target state
| Destination | Target | Method |
|-------------|--------|--------|
| Service page | 1 click | Services dropdown in nav |
| Borough page | 2 clicks | Locations dropdown → borough |
| Blog post | 2 clicks | Blog hub (unchanged) |
| Contact/enquiry | 1 click | Nav CTA (must be fixed for security) |

---

## ISSUE 1 — SECURITY CTA BUG

**File:** `components/shared/Nav.tsx:65`
**Current code:** `href="/"`
**Required:** `href="https://app.vigilservices.co.uk/enquire/security"` (or NEXT_PUBLIC_ENQUIRY_URL env var)

**Severity:** Critical
**User impact:** Every desktop visitor who clicks "Get a quote" on the security site lands on the homepage — zero conversion possible via this route.

---

## ISSUE 2 — NO SERVICES DROPDOWN

**Both sites:** Nav "Services" link goes to a hub page. There is no hover dropdown to service pages.

**Competitor comparison:**
- Cleanology: hover dropdown shows all services with icons and descriptions
- Corps Security: hover dropdown with all service types
- G4S: mega menu with service categories

**Recommended pattern — Services mega menu:**

```
Services ▾
┌──────────────────────────────────────────┐
│ Office Cleaning London                    │
│ Healthcare Facility Cleaning              │
│ After Builders Cleaning                   │
│ Construction Site Cleaning                │
│ Property Management Cleaning              │
│ Emergency Cleaning                        │
│ ─────────────────────────────────────── │
│ View all services →                       │
└──────────────────────────────────────────┘
```

Implementation approach:
- Use CSS `:hover` on the nav `<li>` to reveal an absolute positioned dropdown
- No JavaScript needed for desktop hover state
- Dropdown closes when mouse leaves the nav item area
- On mobile (hamburger menu), expand to accordion under "Services" link rather than showing all links at top level

**Locations dropdown (cleaning only):**
```
Locations ▾
┌──────────────────────────────────────────┐
│ Westminster · City of London             │
│ Camden · Islington · Hackney             │
│ Tower Hamlets · Southwark · Barnet       │
│ Canary Wharf · Lambeth · Wandsworth      │
│ ─────────────────────────────────────── │
│ View all 32 London boroughs →            │
└──────────────────────────────────────────┘
```

---

## ISSUE 3 — NO ACTIVE PAGE INDICATOR

**Current:** All nav links have identical styling regardless of current page.
**Impact:** Users cannot tell which section they are in — poor wayfinding.

**Recommended solution:** Use Next.js `usePathname()` hook to add an active style:
```tsx
const pathname = usePathname()
// ...
className={`text-[13px] transition-colors duration-200 ${
  pathname?.startsWith(l.href)
    ? 'text-[#4ecdc4]'
    : 'text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4]'
}`}
```
For security: replace `#4ecdc4` with `#EA580C`.

**Note:** This requires adding `'use client'` directive — Nav.tsx already has `'use client'` ✓.

---

## ISSUE 4 — MOBILE MENU LACKS CTA (SECURITY)

**Security `shared/Nav.tsx`:** The mobile menu (`open && <div>`) contains nav links and a phone number but NO enquiry CTA button.

Cleaning mobile menu includes: links + phone + "Get a free quote" CTA ✓
Security mobile menu includes: links + phone only ✗

**Recommended solution:** Add CTA to security mobile menu matching cleaning site pattern:
```tsx
<Link href="https://app.vigilservices.co.uk/enquire/security"
  className="block bg-[#EA580C] text-white text-[14px] font-medium text-center py-3 px-4 rounded-lg"
  onClick={() => setOpen(false)}>
  Get a free quote
</Link>
```

---

## ISSUE 5 — NO SKIP-TO-MAIN-CONTENT LINK

**Both sites:** No skip link exists. WCAG 2.4.1 requires a mechanism to bypass repeated nav blocks.

**Recommended solution:** Add as first focusable element in layout, visually hidden but visible on focus:
```tsx
<a href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#4ecdc4] focus:text-navy focus:px-4 focus:py-2 focus:rounded">
  Skip to main content
</a>
```
The cleaning homepage already has `<main id="main-content">` ✓ — this just needs the skip link added to the layout.

---

## RECOMMENDED FINAL NAV PATTERN

For both sites — Pattern A+B (desktop mega menu + mobile drawer):

**Desktop (≥768px):**
- Sticky nav with backdrop blur (current) ✓
- Services: hover → dropdown showing all service pages with 1-line descriptions
- Locations (cleaning) / Coverage (security): hover → borough pills
- Phone number visible ✓
- CTA button — brand accent colour ✓ (fix security)
- Active page indicator ✓

**Mobile (<768px):**
- Hamburger with 44px tap target (fix padding)
- Slide-in drawer from right (or top-down as current, with backdrop)
- Grouped sections: Services (expanded), Company, Phone, CTA
- Smooth open/close animation (200ms ease)
- Close on backdrop tap + ESC key

**Implementation complexity:** Medium (dropdown hover state + mobile accordion)
**Expected benefit:** Service pages reachable in 1 click; measurable improvement in service page traffic; lower navigation bounce rate.
