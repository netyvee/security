# CLAUDE.md — Vigil Security Services

## PERMANENT SETTINGS — Never Change These

### Site Identity
- **Site:** Vigil Security Services
- **Local folder:** C:\laragon\www\vigil-security
- **GitHub repo:** https://github.com/netyvee/security
- **Vercel project:** https://security-sable.vercel.app
- **Domain:** security.vigilservices.co.uk

### Stack
- Next.js 14
- Tailwind CSS
- TypeScript
- Vercel hosting
- Standalone site (shares no code with vigil-cleaning)

### Design System
- **Accent color:** #4ecdc4 (teal)
- **Navy base:** #0a1628
- **Navy mid:** #0f1f3d
- **Navy light:** #162849
- **Gold (stars only):** #c9a84c
- **Typography:** DM Sans (body), Playfair Display (headings)

### Contact Details
- **Email:** security@vigilservices.co.uk — ALL forms, ALL notifications, ALL API routes
- **Phone:** 020 3973 8892
- **Address:** Ferguson House, 113 Cranbrook Road, Ilford, IG1 4PU
- **Instagram:** https://www.instagram.com/vigil.security/

### Integrations
- **GTM:** GTM-N74LRNBJ (this site's own container)
- **Calendly:** Read from `NEXT_PUBLIC_CALENDLY_URL` env var — NEVER hardcode
- **CRM:** POST https://app.vigilservices.co.uk/enquiry with `service_type=Security`
- **Cloudinary:** cloud `duhicmygg`, folder `security/`
- **Email:** Gmail SMTP using `GMAIL_USER` and `GMAIL_APP_PASSWORD` env vars

---

## TRUTHFUL CLAIMS ONLY

### ALLOWED Claims:
- SIA-licensed officers
- DBS-checked officers
- Directly employed officers
- £10M public/employer's liability insurance
- Greater London coverage
- 24/7 cover available

### FORBIDDEN — Never Write:
- "SIA Approved" or "SIA Approved Contractor"
- "ACS" or "ACS Registered" or "ACS compliant"
- "ISO Certified" or "ISO 9001"
- "BS7858" or "BS7858 certified" or "BS7858 vetted"
- "98%" or any other percentage statistic
- "500+" or any site/guard/client count
- "32 boroughs" (say "Greater London" or "all Greater London boroughs")
- Any retention rate, response time, or invented number

**If a stat slot needs filling, use a true fact from the ALLOWED list — never invent a number.**

---

## OPERATING RULES

1. **Never deploy without owner approval** (exception: security fixes, bug fixes)
2. **Always use security@vigilservices.co.uk** for ALL email addresses
3. **Always use #4ecdc4 teal** for accent colors — never orange
4. **Always check forbidden claims** before pushing any content
5. **Always test build** — must show 0 errors before pushing
6. **Never use git add -A** — stage specific source files only
7. **Keep .next/ and node_modules gitignored**
8. **Match the exact design system** — no new colors, fonts, or spacing
9. **SOP compliance required** — every page 2,500+ words, full schema, FAQs, etc.
10. **When in doubt, ask** — never assume or invent

---

## SOP REQUIREMENTS FOR SERVICE PAGES

Every service page must have ALL 20 checklist items:

1. Quick Answer Block 40-60 words BEFORE H1
2. TL;DR under EVERY H2 in teal #4ecdc4
3. 2,500+ words total
4. 6+ FAQ questions, each 100+ words, FAQPage schema
5. 3+ external authority links (sia.homeoffice.gov.uk, hse.gov.uk, gov.uk)
6. Case study with 3 statistics (ALLOWED facts only)
7. 3 testimonials with gold stars #c9a84c
8. Full schema stack (LocalBusiness + Service + BreadcrumbList + FAQPage)
9. Hero image via Cloudinary fetch from Unsplash
10. Title 55-63 chars, focus keyword first
11. Meta description 145-155 chars, CTA present
12. EEAT bar with current review date
13. CTA section linking to qualification flow
14. SEO content block 500+ words, #060f20 background
15. All internal links resolve
16. robots meta: index,follow
17. Canonical tag points to own URL
18. Mobile responsive
19. Breadcrumb with BreadcrumbList schema
20. Zero forbidden claims (grep verify before marking complete)

---

## PHASE 4 STATUS

### Complete (2/8 service pages):
- ✅ Manned Guarding London (2,850+ words, 20/20 SOP)
- ✅ Mobile Patrols London (2,780+ words, 20/20 SOP)

### Remaining (6 service pages):
- Key Holding & Alarm Response London
- Event Security London
- Retail Security London
- Construction Site Security London
- CCTV Monitoring London
- Concierge Security London

### Also Needed:
- Services hub page `/security-services/`
- 17 migration redirects in next.config.mjs
- 10 borough pages (1,200+ words each)
- Supporting pages (about, contact, faq, blog, legal)

---

## GIT WORKFLOW

### Staging Files:
**ALWAYS stage specific paths:**
```bash
git add app/ components/ public/ lib/ 
git add next.config.mjs package.json tailwind.config.ts tsconfig.json
git add middleware.ts CLAUDE.md PROJECT-STATUS.md CHANGELOG.md
```

**NEVER use:**
```bash
git add -A  # NO — includes build artifacts
git add .   # NO — includes everything
```

### Commit Format:
```
feat: clear description of what changed

Detailed explanation of:
- What was built/fixed
- Why it was done this way
- Any decisions made

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Push:
```bash
git push origin main
```

---

## BUILD VERIFICATION

Before every push:

1. **Run build:**
   ```bash
   npm run build
   ```
   Must show: ✓ 0 errors, ✓ 0 warnings

2. **Forbidden claims grep:**
   ```bash
   grep -r "98%\|SIA Approved\|ACS\|BS7858\|500+\|32 boroughs" app/ components/
   ```
   Must show: 0 matches

3. **Color verification:**
   ```bash
   grep -r "#EA580C\|rgba(234,88,12" app/ components/
   ```
   Must show: 0 matches

4. **Email verification:**
   ```bash
   grep -r "@gmail.com\|@vigilservices.co.uk" app/ components/
   ```
   Must show: only security@vigilservices.co.uk (and vigsecs@gmail.com in API route is OK)

---

## DEPLOYMENT

### Vercel Environment Variables:
```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/vigsecs/30min
NEXT_PUBLIC_GTM_ID=GTM-N74LRNBJ
NEXT_PUBLIC_APP_URL=https://security.vigilservices.co.uk
GMAIL_USER=vigsecs@gmail.com
GMAIL_APP_PASSWORD=[owner to supply]
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=duhicmygg
ANTHROPIC_API_KEY=[same key as cleaning site]
CRM_ENDPOINT=https://app.vigilservices.co.uk/enquiry
```

### Post-Deployment Checks:
1. Homepage qualification flow works
2. Calendly renders with teal colors
3. Service pages load correctly
4. Email routing to security@vigilservices.co.uk
5. Schema markup present (view-source)
6. Mobile responsive (375px viewport)
7. Build: 0 errors in Vercel logs

---

## NOTES

- This is a STANDALONE site — not part of the monorepo
- All shared components inlined to `/components/shared/`
- No `@vigil/*` workspace dependencies
- Phone number: 020 3973 8892 (NOT the cleaning number)
- Email: security@vigilservices.co.uk (NOT cleaning@)
- Instagram: vigil.security (NOT vigilcleaners)

**Always read this file at the start of every session.**
