# VIGIL — COMPLETE SEO FIX RUNNER
# Covers: cleaning + security sites
# Repos: netyvee/vigil-cleaning | netyvee/security
# Goal: Fix every diagnosable SEO issue autonomously
#
# RULES:
# 1. Read before changing. grep first, edit second.
# 2. npm run build must pass before every commit.
# 3. Commit per fix category — not per file.
# 4. Never edit: next.config.mjs directly unless adding redirects.
# 5. Never change URL slugs of indexed pages.
# 6. Skip Core Web Vitals — requires Vercel Pro for measurement.
# 7. Run cleaning site first, then security site.
# 8. Generate SEO-REPORT.md at the end.
#
# KNOWN FACTS (do not re-discover):
# - Cleaning brand: navy #0a1628, teal #4ecdc4
# - Security brand: navy #0a1628, orange #EA580C
# - NAP cleaning: Vigil Cleaning Services, Ferguson House
#   113 Cranbrook Road, Ilford IG1 4PU, 020 3098 6037
# - NAP security: Vigil Security Services, same address
#   020 3973 8887
# - NHS references in blog/healthcare pages are safe —
#   authority citations only, never flag or remove
# - No forbidden claims found in cleaning codebase
# - All redirects already in next.config.mjs (24 existing)

================================================================================
PRE-FLIGHT — CLEANING SITE
================================================================================
cd C:/laragon/www/vigil-cleaning
git remote -v | grep "netyvee/vigil-cleaning"
# STOP IF WRONG REPO

# Record baseline
echo "=== BASELINE ===" > SEO-REPORT.md
echo "Date: $(date)" >> SEO-REPORT.md
echo "Cleaning repo: $(git log --oneline -1)" >> SEO-REPORT.md

# Map all pages
find app -name "page.tsx" | grep -v "node_modules\|\.next" | sort \
  > /tmp/all_pages.txt
echo "Total pages: $(wc -l < /tmp/all_pages.txt)" >> SEO-REPORT.md
cat /tmp/all_pages.txt

================================================================================
FIX C1 — FORBIDDEN CLAIMS + DOMESTIC LANGUAGE (cleaning)
================================================================================
# Search for all issues first
echo "=== FORBIDDEN CLAIMS ===" >> SEO-REPORT.md
grep -rn "NHS-approved\|5-star\|your home\|transform your home\
\|Tell us about your home\|residential cleaning\|house cleaning\
\|homeowner\|5 star rated\|five.star" \
  app/ --include="*.tsx" | grep -v "nhs.uk\|NHS guidance\|NHS framework\
\|cqc\|blog\|healthcare" >> SEO-REPORT.md

# Fix each instance found:
# "NHS-approved cleaning products" → "COSHH-compliant cleaning products"
# "5-star rated" → remove entirely or replace with "trusted by London businesses"
# "your home" → "your premises"
# "transform your home" → "transform your space"
# "Tell us about your home" → "Tell us about your requirements"
# "residential cleaning" → "commercial cleaning"
# Do NOT touch: NHS references in blog/healthcare/CQC pages

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add -A
git commit -m "fix(seo): remove forbidden claims and domestic language"
git push origin main

================================================================================
FIX C2 — ROBOTS.TXT (cleaning)
================================================================================
echo "=== ROBOTS.TXT ===" >> SEO-REPORT.md
cat public/robots.txt 2>/dev/null || echo "MISSING" >> SEO-REPORT.md

# If missing or incomplete — create/update:
cat > public/robots.txt << 'ROBOTS'
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/
Disallow: /_next/

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://cleaning.vigilservices.co.uk/sitemap.xml
ROBOTS

echo "robots.txt created/updated" >> SEO-REPORT.md

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add public/robots.txt
git commit -m "fix(seo): robots.txt — allow all bots, block admin, add sitemap reference"
git push origin main

================================================================================
FIX C3 — LLM.TXT (cleaning)
================================================================================
cat public/llms.txt 2>/dev/null || echo "MISSING"

# If missing — create:
cat > public/llms.txt << 'LLMS'
# Vigil Cleaning Services
> Commercial cleaning services across London for offices,
> construction sites, property management and facilities.
> B2B only. Directly employed, DBS-checked operatives.

## Core services
- [Commercial Cleaning London](https://cleaning.vigilservices.co.uk/commercial-cleaning-london/)
- [Office Cleaning London](https://cleaning.vigilservices.co.uk/services/office-cleaning-london/)
- [After Builders Cleaning](https://cleaning.vigilservices.co.uk/after-builders-cleaning-london/)
- [Construction Site Cleaning](https://cleaning.vigilservices.co.uk/construction-site-cleaning-london/)
- [Property Management Cleaning](https://cleaning.vigilservices.co.uk/property-management-cleaning-london/)
- [Emergency Cleaning](https://cleaning.vigilservices.co.uk/emergency-cleaning-london/)

## Coverage
London and all 32 surrounding boroughs including Westminster,
Camden, Islington, Hackney, Tower Hamlets, Southwark, Lambeth,
Wandsworth, Kensington, City of London.

## Contact
- Phone: 020 3098 6037
- Email: cleaning@vigilservices.co.uk
- Address: Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU
LLMS

git add public/llms.txt
git commit -m "fix(seo): add llms.txt for AI search readiness"
git push origin main

================================================================================
FIX C4 — SITEMAP COMPLETENESS (cleaning)
================================================================================
echo "=== SITEMAP AUDIT ===" >> SEO-REPORT.md
cat app/sitemap.ts >> SEO-REPORT.md

# Count pages in sitemap vs actual pages
grep -c "url:" app/sitemap.ts 2>/dev/null || \
  grep -c "loc\|url" app/sitemap.ts >> SEO-REPORT.md

# Read sitemap file fully
cat app/sitemap.ts

# For every page found in /tmp/all_pages.txt —
# derive its URL and check if it appears in sitemap.ts
# If missing — add it with appropriate priority:
# Homepage: priority 1.0
# Service pages: priority 0.9
# Location pages: priority 0.8
# Blog/FAQ/About: priority 0.7

# Read the sitemap pattern from existing entries
# Add all missing pages following the same pattern
# Every app/**/page.tsx must have a corresponding sitemap entry

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add app/sitemap.ts
git commit -m "fix(seo): sitemap — all pages included with correct priorities"
git push origin main

================================================================================
FIX C5 — CANONICAL TAGS (cleaning)
================================================================================
echo "=== CANONICAL AUDIT ===" >> SEO-REPORT.md

# Find pages missing canonical
grep -rL "canonical" app/**/page.tsx 2>/dev/null | head -20
grep -rL "alternates" app/ --include="page.tsx" | head -20

echo "Pages missing canonical:" >> SEO-REPORT.md
grep -rL "alternates\|canonical" app/ --include="page.tsx" \
  >> SEO-REPORT.md

# For each page missing canonical — add to metadata export:
# alternates: {
#   canonical: 'https://cleaning.vigilservices.co.uk/page-slug/',
# }
# Derive canonical URL from file path:
# app/commercial-cleaning-london/page.tsx
# → https://cleaning.vigilservices.co.uk/commercial-cleaning-london/
# app/services/office-cleaning-london/page.tsx
# → https://cleaning.vigilservices.co.uk/services/office-cleaning-london/

# Read each page missing canonical, find metadata export, add alternates
# Use trailing slash consistently (check what majority use first)

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add app/
git commit -m "fix(seo): add canonical tags to all pages missing them"
git push origin main

================================================================================
FIX C6 — META TITLES AUDIT AND FIX (cleaning)
================================================================================
echo "=== META TITLE AUDIT ===" >> SEO-REPORT.md

# Extract all title tags
grep -rn "title:" app/ --include="page.tsx" | head -50

# Check for:
# 1. Missing titles
grep -rL "title:" app/ --include="page.tsx" >> SEO-REPORT.md

# 2. Titles over 60 chars
grep -rn "title:" app/ --include="page.tsx" \
  | awk 'length($0) > 100' >> SEO-REPORT.md

# 3. Duplicate titles
grep -roh "title: '[^']*'" app/ --include="*.tsx" \
  | grep -oP "title: '\K[^']+" \
  | sort | uniq -d >> SEO-REPORT.md

# Fix each issue found:
# Missing title: add descriptive title with focus keyword
# Too long (>60 chars): trim to 55-60 chars keeping keyword at start
# Duplicate: make each unique — add location or service differentiator
# Format: "Focus Keyword | Vigil Cleaning Services"

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add app/
git commit -m "fix(seo): meta titles — missing, too long, duplicates resolved"
git push origin main

================================================================================
FIX C7 — META DESCRIPTIONS AUDIT AND FIX (cleaning)
================================================================================
echo "=== META DESCRIPTION AUDIT ===" >> SEO-REPORT.md

# Find all description values
grep -rn "description:" app/ --include="page.tsx" | head -50

# Check for missing
grep -rL "description:" app/ --include="page.tsx" \
  >> SEO-REPORT.md

# Check for too long (>155 chars)
# Read each description and measure length

# Fix priorities:
# 1. Missing descriptions — generate from page H1 + service type
#    Format: "[Service] in [Location] — directly employed,
#    DBS-checked operatives. [CTA]. Vigil Cleaning Services."
# 2. Too long — trim to 150 chars keeping focus keyword and CTA
# 3. Too short (<120) — expand with value proposition

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add app/
git commit -m "fix(seo): meta descriptions — missing, length, content improved"
git push origin main

================================================================================
FIX C8 — OPEN GRAPH + TWITTER METADATA (cleaning)
================================================================================
echo "=== OG TAGS AUDIT ===" >> SEO-REPORT.md

# Find pages missing OG tags
grep -rL "openGraph\|og:" app/ --include="page.tsx" | head -20
echo "Pages missing OG tags:" >> SEO-REPORT.md
grep -rL "openGraph" app/ --include="page.tsx" >> SEO-REPORT.md

# Standard OG block to add to each page missing it:
# openGraph: {
#   title: '[page title]',
#   description: '[meta description]',
#   url: 'https://cleaning.vigilservices.co.uk/[slug]/',
#   siteName: 'Vigil Cleaning Services',
#   locale: 'en_GB',
#   type: 'website',
# },
# twitter: {
#   card: 'summary_large_image',
#   title: '[page title]',
#   description: '[meta description]',
# },

# Read baseSEOConfig from packages/seo/seo.config.ts
# Ensure all pages spread baseSEOConfig and add page-specific OG

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add app/
git commit -m "fix(seo): OG tags and Twitter metadata added to all pages"
git push origin main

================================================================================
FIX C9 — STRUCTURED DATA / SCHEMA (cleaning)
================================================================================
echo "=== SCHEMA AUDIT ===" >> SEO-REPORT.md

# Find pages with schema
grep -rln "application/ld+json\|SchemaMarkup\|schema\|LocalBusiness\
\|Service\|FAQPage\|BreadcrumbList" \
  app/ --include="*.tsx" >> SEO-REPORT.md

# Check SchemaMarkup component
find . -name "SchemaMarkup*" -o -name "*schema*" \
  | grep -v node_modules | grep -v .next
cat components/SchemaMarkup.tsx 2>/dev/null \
  || find components -name "*chema*" | head -5

# Required schema per page type:
# Homepage:
#   - Organization (name, address, phone, email, url)
#   - LocalBusiness (same + openingHours, areaServed)
#   - WebSite (with SearchAction)
#
# Service pages (office cleaning, after builders etc):
#   - Service (name, description, provider, areaServed)
#   - LocalBusiness
#   - BreadcrumbList (Home > Services > [Page])
#
# Location/borough pages:
#   - LocalBusiness (with specific borough areaServed)
#   - Service
#   - BreadcrumbList
#
# FAQ page:
#   - FAQPage (with Question/Answer pairs)
#
# Blog pages:
#   - Article (with author, datePublished)

# For each page type missing schema:
# Read existing SchemaMarkup component
# Add appropriate schema following existing pattern
# If no SchemaMarkup component — create one

# NAP for schema (must be exact):
# name: "Vigil Cleaning Services"
# address: {
#   streetAddress: "Ferguson House, 113 Cranbrook Road",
#   addressLocality: "Ilford",
#   postalCode: "IG1 4PU",
#   addressCountry: "GB"
# }
# telephone: "02030986037"
# email: "cleaning@vigilservices.co.uk"

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add app/ components/
git commit -m "fix(seo): structured data — LocalBusiness, Service, FAQ, Breadcrumb schema"
git push origin main

================================================================================
FIX C10 — IMAGE ALT TEXT (cleaning)
================================================================================
echo "=== IMAGE ALT AUDIT ===" >> SEO-REPORT.md

# Find images missing alt text
grep -rn "<Image\|<img" app/ components/ --include="*.tsx" \
  | grep -v "alt=" >> SEO-REPORT.md

# Find images with empty alt=""
grep -rn 'alt=""' app/ components/ --include="*.tsx" \
  | grep -v "decorative\|aria-hidden" >> SEO-REPORT.md

echo "Images missing alt:" >> SEO-REPORT.md
grep -rn "<Image\|<img" app/ components/ --include="*.tsx" \
  | grep -v "alt=" | wc -l >> SEO-REPORT.md

# Fix rules:
# Meaningful images: alt="[descriptive text] — Vigil Cleaning Services"
# Decorative images: alt="" (empty is correct for decorative)
# Logo: alt="Vigil Cleaning Services logo"
# Team/staff: alt="Vigil cleaning operative at work in London"
# Service images: alt="[service type] cleaning London"

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add app/ components/
git commit -m "fix(seo): image alt text — all meaningful images have descriptive alt"
git push origin main

================================================================================
FIX C11 — INTERNAL LINKING (cleaning)
================================================================================
echo "=== INTERNAL LINKING AUDIT ===" >> SEO-REPORT.md

# Find orphan pages (pages not linked from any other page)
# Extract all internal links from all pages
grep -roh 'href="\/[^"]*"' app/ components/ --include="*.tsx" \
  | grep -oP 'href="\K[^"]+' \
  | sort -u > /tmp/linked_pages.txt

echo "Unique internal link destinations: $(wc -l < /tmp/linked_pages.txt)" \
  >> SEO-REPORT.md

# Check which pages receive zero internal links
while read page; do
  slug=$(echo $page \
    | sed 's|app||' \
    | sed 's|/page.tsx||' \
    | sed 's|//|/|g')
  count=$(grep -c "$slug" /tmp/linked_pages.txt 2>/dev/null || echo 0)
  if [ "$count" -eq 0 ]; then
    echo "ORPHAN: $slug" >> SEO-REPORT.md
  fi
done < /tmp/all_pages.txt

# Fix internal linking strategy:
# Every service page must link to 3 related services
# Every borough page must link to the main service pages
# Every page must link back to homepage via breadcrumb or nav
# Add a "Related services" section to service pages if missing:
# Office Cleaning → After Builders → Construction → Property Management
# Check each service page for related links and add where missing

# Also check: is there a footer with links to all main services?
grep -n "footer\|Footer" components/ -r --include="*.tsx" | head -5

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add app/ components/
git commit -m "fix(seo): internal linking — orphan pages linked, service cross-links added"
git push origin main

================================================================================
FIX C12 — BOROUGH PAGES UNIQUENESS CHECK (cleaning)
================================================================================
echo "=== BOROUGH PAGE AUDIT ===" >> SEO-REPORT.md

# Find all borough/location pages
find app/locations -name "page.tsx" 2>/dev/null \
  | sort > /tmp/borough_pages.txt
echo "Borough pages: $(wc -l < /tmp/borough_pages.txt)" >> SEO-REPORT.md

# Check for duplicate meta descriptions across borough pages
grep -rn "description:" app/locations/ --include="*.tsx" 2>/dev/null \
  | grep -oP "description: '\K[^']+" \
  | sort | uniq -d >> SEO-REPORT.md

# Check for duplicate titles
grep -rn "title:" app/locations/ --include="*.tsx" 2>/dev/null \
  | grep -oP "title: '\K[^']+" \
  | sort | uniq -d >> SEO-REPORT.md

# Each borough page must have:
# - Unique title: "Commercial Cleaning [Borough] | Vigil"
# - Unique meta description mentioning the borough specifically
# - Unique H1 with borough name
# - Borough-specific content (postcodes, landmarks, businesses)
# - LocalBusiness schema with borough as areaServed
# Fix any duplicates found

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add app/
git commit -m "fix(seo): borough pages — unique titles, descriptions, schema per borough"
git push origin main

================================================================================
FIX C13 — EEAT SIGNALS (cleaning)
================================================================================
echo "=== EEAT AUDIT ===" >> SEO-REPORT.md

# Check about page for trust signals
grep -rn "insurance\|liability\|DBS\|COSHH\|accreditation\
\|years.*experience\|founded\|registered\|11756806" \
  app/about*/page.tsx 2>/dev/null \
  || find app -name "page.tsx" | xargs grep -l "about\|About" \
  | head -5

# Required EEAT elements — check and add if missing:
# Company registration number: 11756806
# Public liability insurance: £10M
# DBS-checked operatives mention
# COSHH compliance statement
# Address with postcode: IG1 4PU
# Year established / experience
# Named contact or team reference

# Check contact page for NAP consistency
grep -rn "020 3098 6037\|cleaning@vigilservices\|Ilford\|IG1 4PU" \
  app/ --include="*.tsx" | wc -l >> SEO-REPORT.md

# Check if company registration appears anywhere
grep -rn "11756806" app/ --include="*.tsx" | wc -l >> SEO-REPORT.md

# If registration number missing from footer or about page — add it

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add app/ components/
git commit -m "fix(seo): EEAT signals — insurance, registration, DBS, COSHH mentions"
git push origin main

================================================================================
FIX C14 — OLD WORDPRESS REDIRECTS (cleaning)
================================================================================
echo "=== REDIRECT AUDIT ===" >> SEO-REPORT.md

# Test old WordPress URLs that may still be indexed
OLD_URLS=(
  "/industrial-cleaning/"
  "/construction-site-cleaning-services/"
  "/household-cleaning-service/"
  "/retail-cleaning-service/"
  "/office-cleaning-service/"
  "/healthcare-cleaning-service/"
  "/carpet-cleaning/"
  "/end-of-tenancy-cleaning/"
)

for url in "${OLD_URLS[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" \
    "https://cleaning.vigilservices.co.uk$url" --max-time 5)
  echo "$url: $status" >> SEO-REPORT.md
  echo "$url: $status"
done

# Read existing redirects in next.config.mjs:
grep -n "source\|destination\|permanent" next.config.mjs \
  | head -40

# For any old URL returning 200 (not already redirected):
# Add 301 redirect to the correct new URL in next.config.mjs
# Under async redirects() { return [ ... ] }
# Examples:
# { source: '/industrial-cleaning/:path*',
#   destination: '/services/', permanent: true },
# { source: '/end-of-tenancy-cleaning/:path*',
#   destination: '/after-builders-cleaning-london/', permanent: true }

npm run build 2>&1 | grep -E "error TS|compiled" | head -5
git add next.config.mjs
git commit -m "fix(seo): 301 redirects for old WordPress URLs"
git push origin main

================================================================================
SECURITY SITE — SAME FIXES
================================================================================
cd /c/laragon/www/security
git remote -v | grep "netyvee/security"
# STOP IF WRONG REPO

echo "" >> /c/laragon/www/vigil-cleaning/SEO-REPORT.md
echo "=== SECURITY SITE ===" >> /c/laragon/www/vigil-cleaning/SEO-REPORT.md
echo "Security repo: $(git log --oneline -1)" \
  >> /c/laragon/www/vigil-cleaning/SEO-REPORT.md

# Map all pages
find app -name "page.tsx" | grep -v "node_modules\|\.next" | sort \
  > /tmp/security_pages.txt
echo "Security pages: $(wc -l < /tmp/security_pages.txt)" \
  >> /c/laragon/www/vigil-cleaning/SEO-REPORT.md

# Run same 14 fixes on security site
# Key differences for security:
# Brand: orange #EA580C (not teal)
# NAP: Vigil Security Services, 020 3973 8887
# Schema type: SecurityService not CleaningService
# Service schema: Manned Guarding, Event Security, Mobile Patrols etc
# SIA licensing is a trust signal — mention explicitly
# DBS checks — mention
# Permitted claims: SIA-licensed, DBS-checked, directly employed
#   £10M liability, Greater London coverage
# NEVER claim: ACS approved, ISO certified, government approved

# FIX S1 — robots.txt
cat > public/robots.txt << 'SROBOTS'
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: GPTBot
Allow: /

Sitemap: https://security.vigilservices.co.uk/sitemap.xml
SROBOTS

git add public/robots.txt
git commit -m "fix(seo): robots.txt for security site"
git push origin main

# FIX S2 — LLM.TXT security
cat > public/llms.txt << 'SLLMS'
# Vigil Security Services
> Professional security services across Greater London.
> SIA-licensed officers, directly employed, DBS-checked.

## Core services
- Manned Guarding London
- Event Security London
- Mobile Patrols London
- Key Holding and Alarm Response London
- Retail Security London
- Door Supervisors London

## Contact
- Phone: 020 3973 8887
- Email: vigsecs@gmail.com
- Address: Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU
SLLMS

git add public/llms.txt
git commit -m "fix(seo): llms.txt for security site AI search readiness"
git push origin main

# FIX S3-S14 — Apply same pattern as cleaning site
# Robots, canonicals, meta titles, meta descriptions,
# OG tags, schema, image alts, internal linking,
# EEAT signals, old URL redirects
# Adapt all content for security context:
# - Schema: SecurityService, LocalBusiness
# - EEAT: SIA licence, DBS, £10M insurance, directly employed
# - Internal links: service pages cross-link each other
# - Borough pages if they exist: unique per borough

# Run all same fixes following cleaning site pattern
# Commit per fix category
# All commits to security main branch

npm run build 2>&1 | grep -E "error TS|compiled" | head -5

================================================================================
FINAL REPORT GENERATION
================================================================================
cd /c/laragon/www/vigil-cleaning

cat >> SEO-REPORT.md << 'SUMMARY'

================================================================================
FINAL SUMMARY
================================================================================
CLEANING SITE FIXES APPLIED:
C1  - Forbidden claims + domestic language
C2  - robots.txt
C3  - llms.txt
C4  - Sitemap completeness
C5  - Canonical tags
C6  - Meta titles (missing, too long, duplicates)
C7  - Meta descriptions (missing, too long, too short)
C8  - Open Graph + Twitter metadata
C9  - Structured data (LocalBusiness, Service, FAQ, Breadcrumb)
C10 - Image alt text
C11 - Internal linking (orphans fixed, cross-links added)
C12 - Borough pages uniqueness
C13 - EEAT signals
C14 - Old WordPress redirects

SECURITY SITE FIXES APPLIED:
S1  - robots.txt
S2  - llms.txt
S3-S14 - Same as cleaning adapted for security context

WHAT CANNOT BE FIXED AUTOMATICALLY:
- Core Web Vitals (requires PageSpeed API + Pro plan)
- GSC data (requires OAuth credentials)
- Google Business Profile signals (requires manual GBP access)
- Real user reviews (requires external review platforms)
- Backlink building (requires outreach)
SUMMARY

git add SEO-REPORT.md
git commit -m "docs: complete SEO fix report — cleaning and security"
git push origin main

echo "=============================="
echo "SEO FIX RUNNER COMPLETE"
echo "Read SEO-REPORT.md for full details"
echo "=============================="
git log --oneline -15
