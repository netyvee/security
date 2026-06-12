# CONVERSION OPTIMISATION PLAN
**Sites:** cleaning.vigilservices.co.uk · security.vigilservices.co.uk
**Primary conversion event:** Qualified lead submission via CRM (app.vigilservices.co.uk/enquire/)
**Secondary conversion events:** Phone call (tel:) · Email link tap

---

## CTA MAP — CURRENT STATE

### Cleaning homepage CTA inventory

| Position | Element | Destination | Visible on |
|----------|---------|-------------|------------|
| Hero — primary | "Get a free quote" btn-primary | CRM enquiry | Desktop + mobile |
| Hero — secondary | "Call 020 3098 6037" btn-outline | tel: | Desktop + mobile |
| End of page | CTASection "Get a free quote" | CRM enquiry | Desktop + mobile |
| End of page | CTASection "Call us: 020 3098 6037" | tel: | Desktop + mobile |
| Layout (mobile only) | MobileBookingButton "Get a free quote" | CRM enquiry | Mobile only, all pages |
| Nav (desktop only) | "Get a free quote" btn-primary | CRM enquiry | Desktop only |
| **Footer.tsx pre-footer** | **"Get a free quote" btn** | **CRM enquiry** | **NOT RENDERED — Footer.tsx is not used in layout** |

The `Footer.tsx` component has a full pre-footer CTA section ("Start your cleaning contract today") but the layout uses `SiteFooter.tsx` which has no pre-footer CTA. This is a lost CTA placement.

### Security homepage CTA inventory

| Position | Element | Destination | Visible on |
|----------|---------|-------------|------------|
| Nav — primary | "Get a quote" btn | "/" (broken!) | Desktop |
| SecurityQualificationFlow | Booking calendar at result screen | CRM booking | All |
| FloatingCTA | "Get a free security quote" pill | CRM enquiry | Inner pages, after 300px scroll |
| **Mobile** | **No persistent bottom CTA** | N/A | — |

---

## CRITICAL ISSUE 1 — SECURITY NAV CTA IS BROKEN

**File:** `security/components/shared/Nav.tsx:65`
`href="/"` — lands on homepage, not enquiry form.

Every desktop user who clicks "Get a quote" in the security nav is taken to the homepage, not the enquiry form. They have already navigated away from the page they were reading. This is a full conversion loss for this CTA placement.

**Fix:** Change to `href="https://app.vigilservices.co.uk/enquire/security"`.

---

## CRITICAL ISSUE 2 — CLEANING FOOTER CTA NOT IN LAYOUT

**Finding:** `components/Footer.tsx:34–43` contains a full pre-footer CTA section. `app/layout.tsx` uses `SiteFooter` (not `Footer`). The pre-footer CTA is never rendered.

The cleaning site has no CTA between the final CTASection and the SiteFooter. On long service pages and borough pages, this creates a dead zone at the bottom of the page.

**Recommendation:** Two options:
1. Add a simple pre-footer CTA directly to `SiteFooter.tsx` (keeping one footer component).
2. Replace `SiteFooter` with `Footer` in `layout.tsx` (the richer component).

Option 1 is lower risk. Option 2 is cleaner long-term.

---

## ISSUE 3 — NO STICKY CTA ON DESKTOP FOR INNER PAGES

The cleaning site has `MobileBookingButton` for mobile (all pages) but no desktop equivalent. On long service and borough pages, a user reading the 2,500+ word content has no CTA visible unless they scroll all the way to the CTASection at the bottom.

**Competitor comparison:**
- Cleanology: sticky side enquiry widget visible on all service pages
- Corps Security: floating "Get a Quote" button appears after 400px scroll

**Recommended additions:**

**Option A — Floating pill (desktop, matching security FloatingCTA pattern):**
Add a `FloatingCTA` component to the cleaning layout, visible on service/borough pages after 400px scroll, hidden on homepage (which already has the QualificationFlow). Design: teal, same pill shape, disappears near footer.

**Option B — Sticky side bar (desktop only):**
A vertically centred side tab ("Get a quote →") at right edge, transforms to full button on hover. Used by Cleanology and many B2B service sites.

**Recommendation:** Option A — matches existing security pattern and adds the least code.

---

## ISSUE 4 — QUALIFICATION FLOW: NO STATE PERSISTENCE ON REFRESH

**File:** `QualificationFlow.tsx:77–82`
```tsx
const [screen, setScreen] = useState<Screen>('welcome')
const [hist, setHist] = useState<Screen[]>([])
const [ans, setAns] = useState<Ans>(INIT)
```

All state is in-memory React state. If the user:
- Refreshes the browser at any point in the flow
- Navigates away and returns (back button)
- Their browser crashes

…all answers are lost and the flow resets to the welcome screen.

For a 6–8 step flow targeting B2B buyers who may be interrupted by phone calls, this is a meaningful abandonment risk.

**Recommended solution:** Persist `ans` and `screen` to `sessionStorage` on every state change using `useEffect`. On mount, read from `sessionStorage` to restore state. Clear `sessionStorage` on `thank-you`, `write-in-confirmed`, and `careers-confirmed` screens.

**Expected benefit:** Reduced flow abandonment from accidental navigation. B2B buyers often step away mid-form.
**Implementation complexity:** Low
**Regression risk:** None

---

## ISSUE 5 — QUALIFICATION FLOW: NO EARLY ESCAPE TO DIRECT CONTACT

**Finding:** The qualification flow has a "My requirements are different →" ghost button on the `type` screen. But on all subsequent screens, a user who wants to just call or email has no visible escape path — they must either complete the flow or use back buttons.

At the `postcode` and `hours` screens, there is no secondary action visible — only the tile selections.

**Recommended solution:** Add a small "Prefer to call? 020 3098 6037" link below the continue button on the `postcode` and `hours` screens. This captures phone-preferring users who are abandoning because the flow feels long.

This link already exists on the `result` screen (`Prefer to email your brief instead →`) but not on journey screens.

---

## ISSUE 6 — NO TESTIMONIALS ON HOMEPAGE (ABOVE FOLD OR NEAR HERO)

The QualificationFlow result screen shows a sector-specific testimonial (triggered by business type selection). But these testimonials are invisible on the homepage to users who haven't entered the flow.

Users who bounce before starting the qualification flow see no social proof on the homepage. The Why Vigil section (4 cards) is factual but not testimonial-based.

See `TRUST-SIGNAL-AUDIT.md` for full recommendations.

---

## ISSUE 7 — CLICK-TO-CALL NOT PROMINENT ON MOBILE

The cleaning Nav hides the phone number on mobile (`hidden md:flex`). On mobile, the only phone CTA visible is:
- Inside the mobile menu (after opening hamburger)
- The MobileBookingButton (CRM, not phone)
- Inside QualificationFlow thank-you screen

B2B buyers — particularly facilities managers and operations directors — often prefer phone over form. The phone number should be accessible from the homepage without opening the menu.

**Recommended solution:** Add a tel: link icon to the mobile nav bar beside the hamburger:
```tsx
<a href="tel:+442030986037" className="md:hidden mr-3 text-[#4ecdc4]" aria-label="Call Vigil Cleaning">
  <svg ...phone-icon... />
</a>
```
This gives a one-tap phone call from any page on mobile.

---

## PRIORITY ORDER

| # | Fix | Site | Impact | Effort |
|---|-----|------|--------|--------|
| 1 | Fix security nav CTA href | Security | Critical | Trivial |
| 2 | Add pre-footer CTA to SiteFooter or swap Footer | Cleaning | High | Low |
| 3 | Add FloatingCTA to cleaning layout (inner pages) | Cleaning | High | Low |
| 4 | Persist flow state to sessionStorage | Both | Medium | Low |
| 5 | Add phone CTA to mobile nav bar | Both | Medium | Low |
| 6 | Add early escape to direct contact on flow screens | Both | Medium | Low |
| 7 | Add testimonials section to homepage | Both | Medium | Medium |
