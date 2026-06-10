# Conversion Review — Security Site
**Site:** security.vigilservices.co.uk
**Repo:** netyvee/security
**Reviewer role:** Conversion Rate Optimisation Specialist
**Date:** 2026-06-10
**Score:** 58 / 100

---

## Executive Summary

The security site has a more severe conversion problem than the cleaning site: not only do key pages lack CTAs, but the CTAs that DO exist display the wrong phone number. Every "Call us" button on the site shows 020 3098 6037 (cleaning) instead of 020 3973 8887 (security). This means the primary conversion mechanism is misdirecting leads. This is a live revenue loss issue — any security lead who calls from a CTA button reaches the cleaning team. This must be the first fix before any other conversion work.

---

## CTA Coverage

### Pages WITHOUT CTA
30 of 37 pages were found to have a CTA pattern. 7 pages have none:
- Admin pages (acceptable — not public-facing)
- Likely: legal pages, careers, environmental commitment

The cleaner ratio (30/37 vs 28/40 on cleaning) is better. But the quality of CTAs that exist is compromised by the wrong phone number.

---

## Findings

### F1 — CRITICAL: Every CTA button shows the wrong phone number
**Impact: Critical | Confidence: HIGH**

`components/shared/CTASection.tsx:17`:
```tsx
outlineLabel = "Call us: 020 3098 6037",
```

Security site phone: **020 3973 8887**

This is not a styling or positioning issue — it is a hard misdirection. A security lead who clicks the phone CTA button and dials will reach the Vigil Cleaning reception, not security operations. This creates:
1. Direct revenue loss from callers who hang up when they reach the wrong team
2. Customer confusion and trust erosion
3. An operational burden on the cleaning team (wrong department calls)
4. Brand damage (disorganised company perception)

**Fix:** Change `CTASection.tsx` default to `020 3973 8887`. Check for all other hardcoded phone instances.

---

### F2 — No qualification flow equivalent to cleaning site
**Impact: High | Confidence: HIGH**

The cleaning site's QualificationFlow (6-screen guided journey) is an excellent conversion mechanism because it:
- Routes leads to the right pathway (qualified, non-standard, outside London, careers)
- Qualifies intent before creating an enquiry
- Reduces back-and-forth for the sales team
- Works on mobile without a form

The security site uses a static contact form at `/contact/`. This is functional but loses the qualification benefits. Security leads need similar routing:
- Type of security needed (manned guarding / mobile patrol / events / keyholding)
- Sector (retail / construction / events / commercial / residential)
- Coverage needed (single site / multiple sites)
- Start date / urgency

A qualification flow for security would increase lead quality and reduce unqualified enquiries.

---

### F3 — Blog posts lack CTAs
**Impact: High | Confidence: HIGH**

The 3 blog posts (SIA, BS7858, Licensing Act 2003) attract high-intent readers who are researching before purchasing. A facilities manager reading "SIA Licensing Explained" is likely evaluating whether Vigil's officers are compliant. No CTA exists after the article. The conversion window closes without capture.

**Fix:** Add CTA block at the end of every blog post: "Vigil Security Services employs only SIA-licensed officers — book a free site assessment."

---

### F4 — No instant quote or site assessment booking tool
**Impact: High | Confidence: HIGH**

Security contracts are high-value but require a site visit before specification. The conversion path should be:
1. Landing page → "Book a free site assessment" → Calendly / booking flow → Site visit → Quote → Contract

Currently the conversion path is:
1. Landing page → Contact form → Wait for response → Wait for visit → Quote → Contract

The additional friction between steps 1 and 2 will cause drop-off. A Calendly booking integration on key service pages (manned guarding, construction, event security) would shorten the cycle and signal a professional operation.

---

### F5 — Trust signals: correct claims, insufficient density near CTAs
**Impact: Medium | Confidence: HIGH**

The permitted trust claims (SIA-licensed, DBS-checked, directly employed, £10M liability) are present across service pages. However the density and positioning near CTAs needs reviewing. Buyers considering a security contract need trust reassurance at the moment of decision — immediately before clicking "book a call". A compact trust line directly above the CTA button ("SIA-licensed officers · DBS-checked · £10M insured · Greater London") would increase CTA click rate.

---

### F6 — No urgency or response time commitment
**Impact: Medium | Confidence: MEDIUM**

Security buyers often have urgent needs (event next week, site theft last night, new contract starting Monday). The site does not address response time anywhere visible near CTAs. A simple statement like "Same-day assessment available for urgent requirements" or "24/7 availability for emergency deployments" near CTAs would capture urgent-need buyers who might otherwise call the first company that signals quick response.

---

### F7 — Social proof: anonymised testimonials only
**Impact: Medium | Confidence: HIGH**

All testimonials use job title + company type without a real company name or person name. Security buyers are risk-averse — they want to know that real identifiable organisations trust Vigil. Even one testimonial with a named individual and company (with permission) would outperform five anonymised ones.

Where named testimonials are not possible (client confidentiality), the alternative is a verified review platform (Google Business, Trustpilot, Clutch). A widget showing real star ratings with review count provides third-party verification that anonymised testimonials cannot.

---

## Priority Fixes

1. Fix phone number in CTASection.tsx — immediate live revenue impact
2. Fix phone in llms.txt — entity integrity
3. Add CTAs to all 3 blog posts
4. Add Calendly booking option to service pages (manned guarding, events, construction priority)
5. Add trust line above CTA buttons on all service pages
6. Add urgency/response signal to CTA sections
7. Evaluate qualification flow equivalent for security

---

## Score Breakdown

| Area | Score | Notes |
|------|-------|-------|
| Phone number accuracy | 5/100 | Critical bug: wrong number everywhere |
| CTA coverage | 72/100 | 30/37 pages — better than cleaning |
| Qualification depth | 40/100 | Static form vs cleaning's flow |
| Blog CTAs | 0/100 | No CTAs on any blog posts |
| Trust signals at CTAs | 65/100 | Present but could be denser |
| Urgency signals | 20/100 | Missing near CTAs |
| Social proof quality | 45/100 | Anonymised only |
| **Overall** | **58/100** | |
