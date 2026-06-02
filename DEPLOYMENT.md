# Vigil Security — Vercel Deployment Guide

## Overview
This guide deploys `apps/security/` to **security.vigilservices.co.uk** as a separate Vercel project from the cleaning site.

---

## STEP 1 — Create Vercel Project

### Option A: Vercel Dashboard (Recommended)
1. Go to https://vercel.com/new
2. Import repository: `netyvee/vigil-cleaning`
3. Configure project:
   - **Project Name:** `vigil-security`
   - **Framework Preset:** Next.js
   - **Root Directory:** `apps/security`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

### Option B: Vercel CLI (if CLI is installed)
```bash
cd apps/security
vercel --prod
```

When prompted:
- Set up and deploy? **Y**
- Which scope? **Select your account**
- Link to existing project? **N**
- Project name? **vigil-security**
- Directory? **./apps/security**

---

## STEP 2 — Environment Variables

Go to Vercel Dashboard → vigil-security → Settings → Environment Variables

Add the following (all environments: Production, Preview, Development):

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_GTM_ID` | `GTM-N74LRNBJ` | Google Tag Manager for security division |
| `NEXT_PUBLIC_CALENDLY_URL` | `https://calendly.com/vigilsecurity/[event-slug]` | **Owner must create security Calendly** |
| `NEXT_PUBLIC_CRM_ENDPOINT` | `https://app.vigilservices.co.uk/enquiry` | Laravel CRM endpoint |
| `NEXT_PUBLIC_NOTIFICATION_EMAIL` | `security@vigilservices.co.uk` | Email notifications |
| `NEXT_PUBLIC_SERVICE_TYPE` | `Security` | Service type for CRM |
| `RESEND_API_KEY` | `re_xxxxx` | *Optional* — for email notifications via Resend |
| `RESEND_FROM` | `security@vigilservices.co.uk` | *Optional* — verified sender domain |
| `RESEND_REPLY_TO` | `security@vigilservices.co.uk` | *Optional* — reply-to address |

### Critical: Calendly Setup
**Owner must:**
1. Create a new Calendly event type specifically for security discovery calls
2. Copy the event URL (e.g., `https://calendly.com/vigilsecurity/discovery-call`)
3. Add to Vercel env vars as `NEXT_PUBLIC_CALENDLY_URL`

**Do NOT reuse the cleaning division Calendly** — security needs its own calendar routing.

---

## STEP 3 — Domain Configuration

### A. DNS Records (cPanel or Cloudflare)

Add these records to `vigilservices.co.uk` domain:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `A` | `security` | `76.76.21.21` | 3600 |
| `CNAME` | `security` | `cname.vercel-dns.com.` | 3600 |

**Note:** Use either A record OR CNAME, not both. CNAME is recommended.

### B. Vercel Domain Setup

1. Go to Vercel Dashboard → vigil-security → Settings → Domains
2. Add domain: `security.vigilservices.co.uk`
3. Wait for DNS propagation (5-30 minutes)
4. Vercel will auto-provision SSL certificate

### C. Verify

```bash
# Check DNS propagation
nslookup security.vigilservices.co.uk

# Should return Vercel IP: 76.76.21.21
```

---

## STEP 4 — Build Configuration

Verify `apps/security/next.config.mjs` has:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/duhicmygg/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

✅ **Already configured** — no changes needed.

---

## STEP 5 — Test Deployment

### A. Preview Deployment (automatic on PR)
Every push to a branch triggers a preview deployment:
```
https://vigil-security-[git-branch]-[account].vercel.app
```

### B. Production Deployment (automatic on main)
Every push to `main` triggers production deployment:
```
https://security.vigilservices.co.uk
```

### C. Manual Deployment
```bash
cd apps/security
vercel --prod
```

---

## STEP 6 — Post-Deployment Checklist

Once deployed, verify:

- [ ] Homepage loads at `https://security.vigilservices.co.uk`
- [ ] GTM tracking fires (check Network tab for GTM-N74LRNBJ)
- [ ] Qualification flow: welcome → premises → service → hours → postcode
- [ ] isLondon() validation works (test with E14, SW1A, RM12)
- [ ] Outside London screen shows for non-London postcodes (test with M1 1AA)
- [ ] Result screen shows trust pill + brief card + testimonial + Calendly
- [ ] Calendly loads in iframe (min-height 630px)
- [ ] Calendly event listener triggers thank-you screen on booking
- [ ] `/api/qualify` POST succeeds (check Network tab)
- [ ] CRM receives lead at `https://app.vigilservices.co.uk/enquiry` with `service_type=Security`
- [ ] Email notification sent to `security@vigilservices.co.uk` (if Resend configured)
- [ ] Security headers present (check DevTools Network → Response Headers)
- [ ] Lighthouse mobile score 90+ (especially Performance, Accessibility, Best Practices, SEO)
- [ ] `/robots.txt` returns correct rules (permits GPTBot, ClaudeBot, etc.)
- [ ] `/sitemap.xml` returns valid XML
- [ ] `res.cloudinary.com` images load (once real images replace placeholders)

---

## STEP 7 — Analytics Setup

### Google Analytics 4
1. Create new GA4 property: **Vigil Security**
2. Copy Measurement ID (e.g., `G-XXXXXXXXXX`)
3. Add GTM trigger in GTM-N74LRNBJ container:
   - Trigger: All Pages
   - Tag: GA4 Config
   - Measurement ID: `G-XXXXXXXXXX`

### Google Search Console
1. Add property: `https://security.vigilservices.co.uk`
2. Verify via DNS TXT record:
   ```
   Type: TXT
   Name: @
   Value: google-site-verification=xxxxx
   ```
3. Submit sitemap: `https://security.vigilservices.co.uk/sitemap.xml`

### Microsoft Clarity (Optional)
1. Create new project: **Vigil Security**
2. Copy tracking code
3. Add to GTM-N74LRNBJ container as Custom HTML tag

---

## STEP 8 — GitHub Actions (Optional Auto-Deploy)

Vercel already auto-deploys on push to `main`. No additional CI/CD needed.

If you want explicit control:

**.github/workflows/deploy-security.yml**
```yaml
name: Deploy Security

on:
  push:
    branches: [main]
    paths:
      - 'apps/security/**'
      - 'packages/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm install
      - run: cd apps/security && npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./apps/security
```

---

## STEP 9 — Monitoring

### Vercel Logs
```bash
# Real-time logs
vercel logs vigil-security --follow

# Last 100 lines
vercel logs vigil-security -n 100

# Filter by function
vercel logs vigil-security --filter=/api/qualify
```

### Error Tracking (Optional)
Consider adding Sentry:
```bash
npm install @sentry/nextjs --workspace=@vigil/security
```

Update `next.config.mjs`:
```js
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  nextConfig,
  { silent: true },
  { hideSourceMaps: true }
)
```

---

## TROUBLESHOOTING

### Build fails: "Cannot find module '@vigil/ui'"
**Cause:** Monorepo workspace not installing shared packages.

**Fix:**
```bash
# Root of repo
npm install

# Rebuild
cd apps/security
npm run build
```

### Calendly not loading
**Cause:** `NEXT_PUBLIC_CALENDLY_URL` not set or invalid.

**Check:**
1. Vercel Dashboard → Environment Variables
2. Value must be full Calendly event URL (not just username)
3. Redeploy after adding env var

### CRM not receiving leads
**Cause:** CORS or Laravel endpoint rejecting POST.

**Check:**
1. Laravel `app/Http/Middleware/VerifyCsrfToken.php` excludes `/enquiry`
2. CORS headers allow Vercel domain
3. Check Vercel function logs for error details

### isLondon() returns false for valid postcodes
**Cause:** Prefix not in `londonPfx` array.

**Check:** Postcode prefix against line 2 of `test-isLondon.js`:
```js
const londonPfx = ["E","EC","N","NW","SE","SW","W","WC","BR","CR","DA","EN","HA","IG","KT","RM","SM","TW","UB","WD"]
```

If legitimate London postcode missing, add prefix to array.

### Images not loading
**Cause:** Cloudinary `duhicmygg` cloud not accessible or images not uploaded.

**Fix:**
1. Check `lib/cloudinary.ts` has correct cloud name
2. Verify images exist at `res.cloudinary.com/duhicmygg/security/[filename]`
3. Once real images uploaded, replace all `ImagePlaceholder` components

---

## ROLLBACK

If deployment fails:

### Instant Rollback (Vercel Dashboard)
1. Go to Vercel Dashboard → vigil-security → Deployments
2. Find previous working deployment
3. Click three dots → "Promote to Production"

### Git Rollback
```bash
git revert HEAD
git push origin main
# Vercel auto-deploys previous commit
```

---

## PRODUCTION CHECKLIST

Before announcing the site:

- [ ] All environment variables set
- [ ] Domain DNS propagated (security.vigilservices.co.uk resolves)
- [ ] SSL certificate active (https works)
- [ ] GTM tracking verified in Google Tag Manager preview mode
- [ ] GA4 receiving pageviews
- [ ] Search Console property verified + sitemap submitted
- [ ] Calendly event type created for security division
- [ ] CRM receiving test leads with `service_type=Security`
- [ ] Email notifications working (if Resend configured)
- [ ] Lighthouse mobile 90+ on all core pages
- [ ] No console errors in browser DevTools
- [ ] Qualification flow tested end-to-end (all 7 screens)
- [ ] Outside London path tested (M1 1AA postcode)
- [ ] Thank-you screen triggers after Calendly booking
- [ ] Real Cloudinary images uploaded (if applicable)
- [ ] 404 page styled correctly
- [ ] Robots.txt allows all crawlers
- [ ] Schema markup validates (Google Rich Results Test)

---

## NEXT STEPS AFTER DEPLOYMENT

1. **Build 8 service pages** (manned-guarding, mobile-patrols, key-holding, etc.)
2. **Build borough pages** (10 at launch, matching cleaning site)
3. **Add blog** (3 seed posts: BS7858 guide, SIA licensing, construction site security)
4. **Set up autonomous agents** (site health, SEO, content)
5. **Configure lead nurture** (Resend email sequences by sector)
6. **Add client portal** (if security division offers SLA reporting)

See `CLAUDE.md` Layer 4 for full Phase Delivery Plan.
