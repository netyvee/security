# Vigil Security — Standalone App Extraction Report

**Date:** 2026-06-02  
**Location:** C:\laragon\www\vigil-security  
**Git Commit:** ee4d12cc  
**Build Status:** ✓ PASSING (0 errors, 0 warnings)

---

## EXTRACTION COMPLETE ✓

Successfully extracted the Vigil Security app from the monorepo into a standalone Next.js application.

### Source:
- **From:** `C:\laragon\www\security` (monorepo with 5 apps + shared packages)
- **Extracted:** `/apps/security/` → standalone app
- **Inlined:** `/packages/ui/` components → `/components/shared/`

### Result:
- **Location:** `C:\laragon\www\vigil-security`
- **Structure:** Standalone Next.js 14 app
- **Dependencies:** No monorepo workspace references
- **Build:** 0 errors, 9 routes compiled successfully

---

## FILE STRUCTURE

```
vigil-security/
├── app/
│   ├── api/qualify/route.ts          # Email + CRM integration
│   ├── layout.tsx                     # Root layout with GTM
│   ├── page.tsx                       # Homepage with qualification flow
│   ├── globals.css                    # Teal color system
│   ├── robots.ts                      # SEO robots config
│   ├── sitemap.ts                     # Dynamic sitemap
│   ├── manned-guarding-london/        # Service page 1 (2,850+ words)
│   │   └── page.tsx
│   └── mobile-patrols-london/         # Service page 2 (2,780+ words)
│       └── page.tsx
│
├── components/
│   ├── SecurityQualificationFlow.tsx  # 4-screen qualification flow
│   └── shared/                        # Inlined from packages/ui
│       ├── SchemaMarkup.tsx          # Schema builders
│       ├── Nav.tsx
│       ├── Footer.tsx
│       ├── CTASection.tsx
│       ├── FAQAccordion.tsx
│       └── TrustBar.tsx
│
├── lib/
│   ├── seo.config.ts                 # SEO metadata config
│   └── cloudinary.ts                 # Image helpers
│
├── public/                            # Static assets
├── middleware.ts                      # Rate limiting
├── next.config.mjs                    # Next.js config with CSP
├── tailwind.config.ts                 # Standalone config (no @vigil/design)
├── package.json                       # Standalone dependencies
├── .gitignore                         # Excludes node_modules, .next
└── .eslintrc.json                     # ESLint config
```

**Total tracked files:** 29 source files (node_modules and .next excluded)

---

## CHANGES FROM MONOREPO

### 1. Package Dependencies
**Before (monorepo):**
```json
"dependencies": {
  "@vigil/ui": "*",
  "@vigil/design": "*",
  "@vigil/seo": "*",
  "next": "14.2.35",
  ...
}
```

**After (standalone):**
```json
"dependencies": {
  "next": "14.2.35",
  "react": "^18",
  "react-calendly": "^4.4.0",
  "react-dom": "^18",
  "zod": "^4.4.3",
  "nodemailer": "^8.0.10"
}
```

All `@vigil/*` workspace dependencies removed.

### 2. Tailwind Config
**Before:** Extended from `@vigil/design/tailwind` base config

**After:** Standalone config with colors inlined:
```ts
colors: {
  navy: '#0a1628',
  'navy-mid': '#0f1f3d',
  'navy-light': '#162849',
  accent: '#4ecdc4',
  'accent-dark': '#3dbdb4',
  gold: '#c9a84c',
}
```

### 3. Component Imports
**Before:**
```ts
import { buildFAQSchema } from '@vigil/ui/SchemaMarkup'
```

**After:**
```ts
import { buildFAQSchema } from '@/components/shared/SchemaMarkup'
```

All 6 shared UI components copied to `/components/shared/`.

### 4. Package Name
**Before:** `@vigil/security` (monorepo workspace)  
**After:** `vigil-security` (standalone package)

---

## BUILD VERIFICATION ✓

```bash
npm run build
```

**Result:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (9/9)

Route (app)                              Size     First Load JS
┌ ○ /                                    8.85 kB        96.1 kB
├ ○ /_not-found                          873 B          88.2 kB
├ ƒ /api/qualify                         0 B                0 B
├ ○ /manned-guarding-london              188 B           101 kB
├ ○ /mobile-patrols-london               188 B           101 kB
├ ○ /robots.txt                          0 B                0 B
└ ○ /sitemap.xml                         0 B                0 B
```

**Errors:** 0  
**Warnings:** 0  
**Routes:** 9 compiled successfully

---

## GIT STATUS

**Repository:** Initialized at `C:\laragon\www\vigil-security`  
**Remote:** `https://github.com/netyvee/vigil-security.git` (pending creation)  
**Branch:** main  
**Commit:** ee4d12cc — "feat: vigil security standalone app - initial commit"  
**Files tracked:** 29 (node_modules and .next properly gitignored)

### To Push:
1. Create repository at: https://github.com/new
   - Name: `vigil-security`
   - Private or Public (your choice)
   - Do NOT initialize with README (we already have code)

2. Then run:
   ```bash
   cd C:\laragon\www\vigil-security
   git push -u origin main
   ```

---

## PHASE 4A CONTENT INCLUDED

All Phase 4A work from the monorepo is included:

### ✅ Color System
- 100% teal (#4ecdc4) across all components
- No orange (#EA580C) remaining
- Verified in: SecurityQualificationFlow.tsx, globals.css, tailwind.config.ts

### ✅ Qualification Flow
- 4-screen conversational flow
- Calendly integration with teal styling
- History stack navigation
- isLondon() validation
- Email routing to vigsecs@gmail.com
- CRM POST to app.vigilservices.co.uk/enquiry

### ✅ Service Pages (2 Complete)
1. **Manned Guarding London** — 2,850+ words
   - Focus keyword: manned guarding London
   - 20/20 SOP checklist items PASS
   - Hero image: Unsplash via Cloudinary
   - 6 FAQs with FAQPage schema
   - Case study + 3 testimonials
   - 3+ external authority links

2. **Mobile Patrols London** — 2,780+ words
   - Focus keyword: mobile patrol security London
   - 20/20 SOP checklist items PASS
   - Hero image: Unsplash via Cloudinary
   - 6 FAQs with FAQPage schema
   - Case study + 3 testimonials
   - 3+ external authority links

### ✅ Forbidden Claims
**Grep verified:** 0 instances of "SIA Approved", "ACS", "BS7858", "98%", "500+"

**ALLOWED claims only:**
- SIA-licensed officers
- DBS-checked officers
- Directly employed officers
- £10M public/employer's liability insurance
- Greater London coverage
- 24/7 cover available

---

## DEPLOYMENT READY ✓

The standalone app is ready for Vercel deployment:

### Vercel Project Setup:
1. Import from GitHub: `netyvee/vigil-security` (after push)
2. Framework Preset: Next.js
3. Root Directory: `.` (repository root)
4. Build Command: `npm run build`
5. Output Directory: `.next`

### Environment Variables Required:
```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/vigsecs/30min
GMAIL_USER=<Gmail address>
GMAIL_APP_PASSWORD=<Gmail app password>
NEXT_PUBLIC_GTM_ID=GTM-N74LRNBJ
```

### Post-Deployment Verification:
1. Visit homepage with qualification flow
2. Test Calendly embed renders with teal colors
3. Verify service pages load: `/manned-guarding-london/`, `/mobile-patrols-london/`
4. Check schema markup in view-source (4 types per service page)
5. Test mobile responsive (375px viewport)

---

## PHASE 4B REMAINING WORK

The standalone app is deployment-ready but Phase 4B work remains:

### 6 Service Pages to Complete:
- `/key-holding-alarm-response-london/`
- `/event-security-london/`
- `/retail-security-london/`
- `/construction-site-security-london/`
- `/cctv-monitoring-london/`
- `/concierge-security-london/`

Follow the exact structure of the 2 completed pages (manned-guarding and mobile-patrols).

### Additional Pages:
- `/security-services/` — services hub page
- 10 borough pages (1,200+ words each)
- Supporting pages (about, contact, faq, blog, legal)

### Next.config.js:
- Add 17 migration redirects from old WordPress URLs

---

## NEXT STEPS

1. **Create GitHub repository:**
   - Go to https://github.com/new
   - Name: `vigil-security`
   - Do NOT initialize with README
   - Click "Create repository"

2. **Push code:**
   ```bash
   cd C:\laragon\www\vigil-security
   git push -u origin main
   ```

3. **Deploy to Vercel:**
   - Connect Vercel to GitHub repo
   - Add environment variables
   - Deploy to production

4. **Continue Phase 4B:**
   - Complete remaining 6 service pages
   - Build services hub
   - Add borough pages
   - Implement redirects

---

## CONCLUSION

**Extraction Status: COMPLETE ✓**

Successfully extracted Vigil Security from monorepo to standalone Next.js app:
- ✅ No monorepo dependencies
- ✅ All shared components inlined
- ✅ Build passes: 0 errors, 9 routes
- ✅ Git initialized with clean commit
- ✅ Ready for GitHub push
- ✅ Ready for Vercel deployment

The app maintains all Phase 4A work:
- Teal color system
- Working qualification flow
- 2 SOP-perfect service pages (5,630+ words total)
- Zero forbidden claims
- Full schema markup

**Location:** `C:\laragon\www\vigil-security`  
**Remote:** `https://github.com/netyvee/vigil-security.git` (pending creation)  
**Status:** Deployment-ready standalone app

---

**Report generated:** 2026-06-02  
**Extraction completed by:** Claude Sonnet 4.5
