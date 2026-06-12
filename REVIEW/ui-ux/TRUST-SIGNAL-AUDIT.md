# TRUST SIGNAL AUDIT
**Sites:** cleaning.vigilservices.co.uk · security.vigilservices.co.uk
**Audience:** B2B buyers — facilities managers, property directors, main contractors, operations managers
**Benchmark:** Cleanology, Corps Security, Mitie, G4S

---

## TRUST SIGNAL HIERARCHY FOR B2B SERVICE BUYERS

B2B buyers — particularly for outsourced services like cleaning and security — follow a predictable trust validation sequence before making contact:

1. **Regulatory/legal legitimacy** — are they licensed, insured, registered?
2. **Peer validation** — do businesses like mine use them?
3. **Team credibility** — are these real people I can hold accountable?
4. **Proof of delivery** — what evidence exists of work done?
5. **Commercial stability** — are they an established going concern?

Vigil's current implementation is strong on (1) but weak on (2), (3), (4), and (5).

---

## CURRENT TRUST SIGNALS — CLEANING SITE

### Present ✓

| Signal | Location | Strength |
|--------|----------|----------|
| Company registration (11756806) | Hero chips, footer, EEAT bar | Strong |
| DBS checked | Hero chips, trust bar, compliance strip | Strong |
| £5m public liability | Hero chips, trust bar, EEAT bar | Medium |
| COSHH 2002 compliance | Hero chips, compliance strip | Medium |
| AWR 2010 compliance | Compliance strip, hero sub | Medium |
| Direct employment statement | Hero sub, Why Vigil cards | Medium |
| TUPE experience | Why Vigil cards, SEO block | Medium |
| Regulatory references (TUPE 2006, CDM 2015, GDPR 2018) | Compliance strip | Medium |
| EEAT bar | Bottom of homepage | Low-medium |
| 3 testimonials (in QualificationFlow result screen) | Only visible after completing flow | Low |

### Missing ✗

| Signal | Competitor presence | Priority |
|--------|---------------------|----------|
| Star ratings / Trustpilot badge | Cleanology has 4.8 ★ Trustpilot | High |
| Google Reviews badge with rating | Cleanology, OCS | High |
| Client logos (anonymised sector if needed) | Mitie, Cleanology | High |
| Named team members / director photo | Cleanology (team page), Corps Security | Medium |
| Case studies with named outcomes | All major competitors | Medium |
| Sector accreditations (SafeContractor, BICSc, CHAS) | Cleanology | Medium |
| Photo evidence of work / premises | All competitors | Medium |
| "How many clients" / "years in business" (if accurate) | All competitors | Medium |
| Named account manager offer | Cleanology "dedicated account manager" | Low |

---

## CURRENT TRUST SIGNALS — SECURITY SITE

### Present ✓

| Signal | Location | Strength |
|--------|----------|----------|
| SIA licensed (individual officers) | Hero (via QualFlow context), about page | Medium |
| DBS checked | Trust bar | Medium |
| £10m public liability | Trust bar, footer | Medium |
| Direct employment | Footer, about page | Medium |
| Greater London coverage | Footer, layout | Low |

### Missing ✗ (same gaps as cleaning, plus security-specific)

| Signal | Notes |
|--------|-------|
| SIA licence verification link | Users can check officer licences on SIA website |
| BS7858 vetting mention | Already in FAQ schema (`app/page.tsx`) but not surfaced in hero trust signals |
| 24/7 availability proof | Footer says "24/7 cover available" — needs prominence |
| Event security insurance specifics | Event clients care about this |

---

## TESTIMONIALS — GAP ANALYSIS

### Cleaning site
The 3 testimonials in `QualificationFlow.tsx:59–72` are:
- "Vigil have been cleaning our EC2 offices for 14 months. Same team every time, zero issues. That consistency is rare." — Facilities Manager, City of London
- "Our welfare areas are spotless throughout the build. Vigil show up, do the job, and don't need managing." — Site Manager, Main Contractor — SE1
- "As a CQC-registered facility we need clinical-standard cleaning. Vigil understand that — and they document everything." — Operations Director, Healthcare Facility — N1

These are good, sector-specific testimonials with role and location attribution. However:
- **They are only visible after completing 3+ steps of the qualification flow** — the large majority of homepage visitors never see them.
- No star rating attached.
- No company name (understandable for anonymity, but weakens credibility vs named Trustpilot reviews).

**Recommendation:** Extract testimonials to a standalone section on the homepage, positioned between the "Why Vigil" section and the FAQ. This ensures all visitors see peer validation before deciding to engage.

### Security site
The SecurityQualificationFlow also has inline testimonials (not fully reviewed). Same issue — hidden inside the flow.

---

## SOCIAL PROOF ROADMAP

### Phase 1 — Zero-cost improvements (no new reviews needed)

1. **Homepage testimonials section:** Extract the 3 existing QualificationFlow testimonials to a dedicated section visible to all visitors. Add star rows (gold #c9a84c, 5 stars).

2. **Client sector logos:** Even without named clients, generic sector logos ("Property management company, SW1" with a grey placeholder logo) signal established client base. Only use real logos with permission.

3. **Google Business Profile:** Request reviews from existing clients via email. Link GBP profile to cleaning.vigilservices.co.uk and security.vigilservices.co.uk. 5–10 Google reviews with responses = meaningful trust signal.

### Phase 2 — Low-cost trust amplifiers

4. **Trustpilot free plan:** Set up profile. Send review requests to all completed clients. Once 5+ reviews exist, embed the Trustpilot widget in the hero or trust bar.

5. **Case study page:** One per sector — anonymised (e.g., "A CQC-registered GP surgery in North London"). Format: Challenge → Solution → Outcome (3 stats minimum). This is currently listed in CLAUDE.md Phase 3 deliverables.

6. **Team page or "Meet your account manager" section:** Even a single named director with a photo dramatically increases trust for B2B buyers. Companies without named personnel read as faceless and hard to hold accountable.

### Phase 3 — Accreditations

7. **SafeContractor or CHAS:** UK B2B procurement gateway — facilities managers frequently require this for contractor approval. Annual fee ~£300–£500. Membership logo is a high-value trust signal for the target audience.

8. **BICSc membership:** Industry body membership for cleaning companies. Low cost, adds credibility with facilities management buyers.

9. **Cyber Essentials:** Lightweight government scheme — signals data security to property management companies handling client data.

---

## COMPARISON TABLE

| Trust signal | Cleanology | Corps Security | Vigil Cleaning | Vigil Security |
|--------------|------------|----------------|----------------|----------------|
| Star rating badge | ✓ 4.8★ | ✗ | ✗ | ✗ |
| Client logos | ✓ | ✓ | ✗ | ✗ |
| Named team | ✓ team page | ✓ directors | ✗ | ✗ |
| Case studies | ✓ | ✓ | ✗ | ✗ |
| Accreditations | ✓ BICSc, SafeContractor | ✓ NSI Gold | ✗ | ✗ |
| Testimonials on homepage | ✓ | ✓ | ✗ (in flow only) | ✗ (in flow only) |
| Company reg visible | ✗ | ✗ | ✓ | ✓ |
| Insurance amount visible | ✗ | ✓ | ✓ | ✓ |
| Direct employment stated | ✗ | ✓ | ✓ | ✓ |

Vigil leads on regulatory transparency. Vigil trails on social proof. The combination of regulatory rigour + some social proof would be a strong differentiated position.

---

## PRIORITY ACTION LIST

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | Extract testimonials to homepage section | Low | High |
| 2 | Request 5 Google reviews from current clients | Low | High |
| 3 | Add named director/contact to About page | Low | Medium |
| 4 | Set up Trustpilot free profile | Low | Medium |
| 5 | Produce 1 anonymised case study per sector | Medium | High |
| 6 | Apply for SafeContractor or CHAS | Medium | High |
| 7 | Add BICSc membership | Low | Medium |
