# VIGIL — SEARCH AUTHORITY & GROWTH PEER REVIEW
# Covers: cleaning + security sites in one session
# Cleaning repo: netyvee/vigil-cleaning
# Security repo: netyvee/security
#
# THIS IS ANALYSIS ONLY — ZERO CHANGES TO ANY FILE
# Do not fix. Do not implement. Do not commit code changes.
# Read, analyse, document findings only.
# Commit only the REVIEW/ markdown files at the end.
#
# ACT AS: Independent panel of senior specialists
# - Senior Technical SEO Engineer
# - Information Architecture Specialist
# - Search Quality Engineer
# - Local SEO Strategist
# - Knowledge Graph / Entity SEO Engineer
# - LLM Retrieval Optimisation Specialist
# - Business Growth Strategist
# - Conversion Rate Optimisation Specialist
#
# MINDSET:
# Challenge assumptions. Challenge architecture decisions.
# Challenge SEO decisions. Challenge content structure.
# Challenge conversion strategy. Challenge everything.
# Do not assume existing implementations are optimal.
# Your task is not to prove the project is good.
# Your task is to determine how much stronger it could
# become and what is required to reach that level.
#
# KNOWN ISSUES (already identified — note root cause only):
# - /office-cleaning-london returns 404 on cleaning site
# - Canonical/sitemap conflicts from previous SEO session
# - Admin login bypass currently active (temporary)
# Do not focus on these as findings. If the review reveals
# a deeper architectural root cause — document it.
#
# SITE FACTS (do not re-discover):
# Cleaning: cleaning.vigilservices.co.uk
#   Brand: navy #0a1628, teal #4ecdc4
#   Phone: 020 3098 6037
#   Services: office, after builders, construction,
#     property management, emergency, healthcare
#   Schema type: CleaningService
#
# Security: security.vigilservices.co.uk
#   Brand: navy #0a1628, orange #EA580C
#   Phone: 020 3973 8887
#   Services: manned guarding, event security,
#     mobile patrols, key holding, retail security,
#     door supervisors
#   Schema type: SecurityService
#   Permitted claims: SIA-licensed, DBS-checked,
#     directly employed, £10M liability
#   Forbidden: ACS approved, ISO certified,
#     government approved, police approved
#
# SHARED:
#   Company: Vigil Services Ltd, Reg: 11756806
#   Address: Ferguson House, 113 Cranbrook Road,
#     Ilford IG1 4PU
#   Coverage: Greater London, all 32 boroughs

================================================================================
SETUP — READ BOTH SITES
================================================================================
mkdir -p REVIEW/cleaning REVIEW/security REVIEW/shared

# ── CLEANING SITE ──────────────────────────────────────────
cd /c/laragon/www/vigil-cleaning
git remote -v | grep "netyvee/vigil-cleaning"
# STOP IF WRONG REPO

echo "=== CLEANING SITE MAP ===" > /tmp/cleaning_context.txt
find app -name "page.tsx" \
  | grep -v "node_modules\|\.next" | sort \
  >> /tmp/cleaning_context.txt
echo "Pages: $(wc -l < /tmp/cleaning_context.txt)"

cat app/sitemap.ts >> /tmp/cleaning_context.txt
cat next.config.mjs >> /tmp/cleaning_context.txt
cat public/robots.txt 2>/dev/null >> /tmp/cleaning_context.txt
cat public/llms.txt 2>/dev/null >> /tmp/cleaning_context.txt

# Count key metrics
echo "Cleaning sitemap entries:" \
  $(grep -c "url:" app/sitemap.ts 2>/dev/null)
echo "Cleaning redirects:" \
  $(grep -c "source:" next.config.mjs 2>/dev/null)
echo "Cleaning pages with canonical:" \
  $(grep -rln "canonical" app/ --include="page.tsx" | wc -l)
echo "Cleaning pages with schema:" \
  $(grep -rln "LocalBusiness\|@type.*Service\|FAQPage" \
    app/ --include="*.tsx" | wc -l)
echo "Cleaning pages with OG tags:" \
  $(grep -rln "openGraph" app/ --include="page.tsx" | wc -l)
echo "Cleaning borough pages:" \
  $(find app -name "page.tsx" \
    | grep -i "location\|westminster\|camden\|hackney\|islington\
\|southwark\|canary\|barnet\|tower\|hackney\|lewisham\|greenwich" \
    | wc -l)
echo "Cleaning blog posts:" \
  $(find app/blog -name "page.tsx" 2>/dev/null | wc -l)

# Read sample pages to understand content depth
head -60 app/page.tsx 2>/dev/null
head -60 app/commercial-cleaning-london/page.tsx 2>/dev/null
head -60 app/services/office-cleaning-london/page.tsx 2>/dev/null

# ── SECURITY SITE ──────────────────────────────────────────
cd /c/laragon/www/security
git remote -v | grep "netyvee/security"
# STOP IF WRONG REPO

echo "=== SECURITY SITE MAP ===" > /tmp/security_context.txt
find app -name "page.tsx" \
  | grep -v "node_modules\|\.next" | sort \
  >> /tmp/security_context.txt
echo "Pages: $(wc -l < /tmp/security_context.txt)"

cat app/sitemap.ts 2>/dev/null >> /tmp/security_context.txt
cat next.config.mjs 2>/dev/null >> /tmp/security_context.txt
cat public/robots.txt 2>/dev/null >> /tmp/security_context.txt
cat public/llms.txt 2>/dev/null >> /tmp/security_context.txt

echo "Security sitemap entries:" \
  $(grep -c "url:" app/sitemap.ts 2>/dev/null)
echo "Security redirects:" \
  $(grep -c "source:" next.config.mjs 2>/dev/null)
echo "Security pages with canonical:" \
  $(grep -rln "canonical" app/ --include="page.tsx" | wc -l)
echo "Security pages with schema:" \
  $(grep -rln "SecurityService\|LocalBusiness\|FAQPage" \
    app/ --include="*.tsx" | wc -l)
echo "Security blog posts:" \
  $(find app/blog -name "page.tsx" 2>/dev/null | wc -l)

# Read sample security pages
head -60 app/page.tsx 2>/dev/null
head -60 app/manned-guarding-london/page.tsx 2>/dev/null \
  || find app -name "page.tsx" | head -3 | xargs head -30

================================================================================
REVIEW 1 — TECHNICAL SEO (both sites)
================================================================================
# Write to: REVIEW/cleaning/TECHNICAL-SEO.md
#           REVIEW/security/TECHNICAL-SEO.md

cd /c/laragon/www/vigil-cleaning

# Cleaning technical audit:
echo "=== CANONICAL CONFLICTS ==="
grep -rn "canonical:" app/ --include="*.tsx" \
  | grep -oP "https://[^'\"]+" \
  | sed "s|https://cleaning.vigilservices.co.uk||" \
  | while read slug; do
    slug=$(echo $slug | sed "s|/$||")
    grep -q "source:.*'${slug}" next.config.mjs 2>/dev/null \
      && echo "CONFLICT: $slug"
  done

echo "=== PAGES MISSING CANONICAL ==="
grep -rL "canonical\|alternates" app/ --include="page.tsx" | wc -l

echo "=== PAGES MISSING TITLE ==="
grep -rL "title:" app/ --include="page.tsx" | wc -l

echo "=== PAGES MISSING DESCRIPTION ==="
grep -rL "description:" app/ --include="page.tsx" | wc -l

echo "=== PAGES MISSING OG ==="
grep -rL "openGraph" app/ --include="page.tsx" | wc -l

echo "=== NOINDEX PAGES ==="
grep -rn "noindex" app/ --include="*.tsx"

echo "=== TRAILING SLASH CONSISTENCY ==="
withSlash=$(grep -roh "canonical: 'https://[^']*/" \
  app/ --include="*.tsx" 2>/dev/null | wc -l)
withoutSlash=$(grep -roh "canonical: 'https://[^'/]*'" \
  app/ --include="*.tsx" 2>/dev/null | wc -l)
echo "With slash: $withSlash | Without: $withoutSlash"

echo "=== SITEMAP vs REDIRECT CONFLICTS ==="
grep -oP "url: ['\"]https://[^'\"]+['\"]" app/sitemap.ts \
  | grep -oP "https://[^'\"]+" \
  | sed "s|https://cleaning.vigilservices.co.uk||" \
  | sed "s|/$||" \
  | while read slug; do
    grep -q "source:.*'${slug}" next.config.mjs 2>/dev/null \
      && echo "REDIRECT IN SITEMAP: $slug"
  done

cd /c/laragon/www/security
# Same checks for security site

================================================================================
REVIEW 2 — INFORMATION ARCHITECTURE (both sites)
================================================================================
# Write to: REVIEW/cleaning/IA-REVIEW.md
#           REVIEW/security/IA-REVIEW.md

cd /c/laragon/www/vigil-cleaning

echo "=== CLEANING SITE STRUCTURE ==="
find app -name "page.tsx" \
  | sed 's|app||' | sed 's|/page.tsx||' \
  | sort

echo "=== URL STRUCTURE ANALYSIS ==="
# Check for architectural inconsistencies:
# Some pages at /service-name (top level)
# Some pages at /services/service-name (nested)
# Is this intentional? Does it cause cannibalisation?
find app -name "page.tsx" | grep -v "node_modules" \
  | sed 's|app||' | sed 's|/page.tsx||' \
  | grep -i "cleaning\|service" | sort

echo "=== BOROUGH PAGE ARCHITECTURE ==="
# Are boroughs at /commercial-cleaning-[borough] OR
# /locations/commercial-cleaning-[borough]?
# Inconsistency = authority dilution
find app -name "page.tsx" | grep -v "node_modules" \
  | sed 's|app||' | sed 's|/page.tsx||' \
  | grep -i "commercial-cleaning\|location" | sort

echo "=== ORPHAN PAGES (not in sitemap) ==="
find app -name "page.tsx" \
  | sed 's|app||' | sed 's|/page.tsx||' \
  | while read slug; do
    grep -q "$slug" app/sitemap.ts 2>/dev/null \
      || echo "NOT IN SITEMAP: $slug"
  done

cd /c/laragon/www/security
echo "=== SECURITY SITE STRUCTURE ==="
find app -name "page.tsx" \
  | sed 's|app||' | sed 's|/page.tsx||' \
  | sort

================================================================================
REVIEW 3 — ENTITY SEO (both sites)
================================================================================
# Write to: REVIEW/shared/ENTITY-REVIEW.md

cd /c/laragon/www/vigil-cleaning

echo "=== NAP CONSISTENCY ==="
echo "Phone refs:" $(grep -roh "020 3098 6037\|02030986037" \
  app/ components/ --include="*.tsx" | wc -l)
echo "Wrong phone on cleaning:" \
  $(grep -roh "020 3973 8887" \
    app/ components/ --include="*.tsx" | wc -l)
echo "Address refs:" $(grep -roh "Cranbrook\|IG1 4PU" \
  app/ components/ --include="*.tsx" | wc -l)
echo "Reg number refs:" $(grep -roh "11756806" \
  app/ components/ --include="*.tsx" | wc -l)

echo "=== SCHEMA TYPES IN USE ==="
grep -roh "@type.*['\"]:[^'\"]*['\"]" \
  app/ --include="*.tsx" | sort -u

echo "=== ORGANIZATION SCHEMA ==="
grep -rln "Organization\|legalName" \
  app/ --include="*.tsx"

echo "=== SERVICE ENTITIES ==="
grep -roh "\"name\":.*[Cc]leaning" \
  app/ --include="*.tsx" | sort -u | head -20

cd /c/laragon/www/security
echo "=== SECURITY NAP ==="
echo "Phone refs:" $(grep -roh "020 3973 8887\|02039738887" \
  app/ components/ --include="*.tsx" | wc -l)
echo "Wrong phone on security:" \
  $(grep -roh "020 3098 6037" \
    app/ components/ --include="*.tsx" | wc -l)
echo "SIA references:" $(grep -roh "SIA\|sia" \
  app/ components/ --include="*.tsx" | wc -l)
echo "DBS references:" $(grep -roh "DBS\|dbs" \
  app/ components/ --include="*.tsx" | wc -l)

================================================================================
REVIEW 4 — AEO (both sites)
================================================================================
# Write to: REVIEW/cleaning/AEO-REVIEW.md
#           REVIEW/security/AEO-REVIEW.md

cd /c/laragon/www/vigil-cleaning

echo "=== FAQ COVERAGE ==="
grep -rln "FAQPage\|FAQAccordion" \
  app/ --include="*.tsx" | wc -l
echo "FAQ pages:"
grep -rln "FAQPage\|FAQAccordion" app/ --include="*.tsx"

echo "=== QUESTION HEADINGS ==="
grep -roh ">[^<]*?[^<]*<" app/ --include="*.tsx" 2>/dev/null \
  | grep -i "what\|how\|why\|when\|which\|can\|do\|is\|are" \
  | wc -l

echo "=== DIRECT ANSWER BLOCKS ==="
grep -rn "tldr\|quick.answer\|summary\|answer" \
  app/ components/ --include="*.tsx" | wc -l

cd /c/laragon/www/security
echo "=== SECURITY FAQ COVERAGE ==="
grep -rln "FAQPage\|FAQAccordion" \
  app/ --include="*.tsx" | wc -l

================================================================================
REVIEW 5 — GEO (both sites)
================================================================================
# Write to: REVIEW/shared/GEO-REVIEW.md

cd /c/laragon/www/vigil-cleaning

echo "=== LLM.TXT ==="
cat public/llms.txt 2>/dev/null || echo "MISSING"

echo "=== AI CRAWLER ACCESS ==="
grep -i "GPTBot\|ClaudeBot\|Perplexity\|anthropic\|openai" \
  public/robots.txt 2>/dev/null || echo "No AI rules"

echo "=== UNIQUE AUTHORITATIVE CONTENT ==="
# What information exists here that cannot be found elsewhere?
# Check for: original statistics, unique methodology,
# proprietary frameworks, verified credentials
grep -rn "£\|COSHH\|AWR\|CDM\|TUPE\|SIA\|CQC\|DBS\|Reg.*11756806" \
  app/ --include="*.tsx" | wc -l

echo "=== CONTENT CHUNK QUALITY ==="
# Are paragraphs self-contained and answer-ready?
# Read 3 representative pages and assess
head -100 app/commercial-cleaning-london/page.tsx 2>/dev/null
head -100 app/faq/page.tsx 2>/dev/null

cd /c/laragon/www/security
cat public/llms.txt 2>/dev/null || echo "Security llms.txt MISSING"

================================================================================
REVIEW 6 — CONTENT AUTHORITY MAP (both sites)
================================================================================
# Write to: REVIEW/cleaning/CONTENT-AUTHORITY.md
#           REVIEW/security/CONTENT-AUTHORITY.md

cd /c/laragon/www/vigil-cleaning

echo "=== EXISTING CONTENT INVENTORY ==="
echo "Service pages:"
find app -name "page.tsx" \
  | grep -i "cleaning\|service\|builder\|construction\
\|property\|emergency\|healthcare" \
  | grep -v "blog\|location" | sort

echo "Location pages:"
find app -name "page.tsx" \
  | grep -i "location\|westminster\|camden\|hackney\|islington\
\|southwark\|canary\|barnet\|tower\|lewisham\|greenwich\
\|lambeth\|wandsworth\|city-of-london\|commercial-cleaning-" \
  | sort

echo "Blog/informational:"
find app/blog -name "page.tsx" 2>/dev/null | sort

echo "Supporting pages:"
find app -name "page.tsx" \
  | grep -i "about\|faq\|contact\|privacy\|cookie\
\|modern-slavery\|environmental\|equal\|accessibility" \
  | sort

echo "=== 32 LONDON BOROUGHS — COVERAGE CHECK ==="
BOROUGHS="westminster camden islington hackney tower-hamlets
  newham waltham-forest haringey enfield barnet harrow
  brent ealing hounslow richmond-upon-thames kingston
  merton sutton croydon bromley bexley havering
  redbridge barking-and-dagenham lewisham greenwich
  southwark lambeth wandsworth hammersmith-and-fulham
  kensington-and-chelsea city-of-london"
for borough in $BOROUGHS; do
  count=$(find app -name "page.tsx" \
    | grep -i "$borough" | wc -l)
  echo "$borough: $count pages"
done

cd /c/laragon/www/security

echo "=== SECURITY CONTENT INVENTORY ==="
find app -name "page.tsx" \
  | grep -v "node_modules\|\.next" | sort

echo "=== SECURITY BOROUGH COVERAGE ==="
for borough in westminster camden islington hackney \
  southwark lambeth canary-wharf city-of-london \
  greenwich lewisham; do
  count=$(find app -name "page.tsx" \
    | grep -i "$borough" | wc -l)
  echo "$borough: $count pages"
done

================================================================================
REVIEW 7 — BUSINESS GROWTH REVIEW (both sites)
================================================================================
# Write to: REVIEW/shared/BUSINESS-GROWTH-REVIEW.md
# THIS IS THE MOST IMPORTANT SECTION

# Answer these 7 questions with evidence from the codebase.
# This is strategy, not SEO.

# Q1: DOMINANCE ASSETS
# What website assets are missing for London market dominance?
# Check for: resource centre, buyer guides, specification
# templates, compliance resources, industry reports

grep -rln "guide\|resource\|template\|checklist\|download" \
  app/ --include="*.tsx" 2>/dev/null | head -10

# Q2: TRUST ECOSYSTEM
# What trust assets does a £5m competitor have that Vigil lacks?
# Check for: case studies, client logos, testimonials,
# accreditations, team pages, award pages, press mentions
grep -rln "case.stud\|testimonial\|client.logo\|award\|press\|team" \
  app/ --include="*.tsx" 2>/dev/null | head -10

# Q3: CONTENT ASSETS
# What content assets does a dominant market player have?
# Check for: newsletter, resource centre, video content,
# training materials, industry statistics

# Q4: CONVERSION INFRASTRUCTURE
# What conversion tools are missing?
# Check for: instant quote, service area checker,
# ROI calculator, availability calendar
grep -rln "quote\|calculator\|checker\|estimate" \
  app/ --include="*.tsx" 2>/dev/null | head -10

# Q5: AUTOMATION ASSETS
# What automation would a mature business have?
grep -rln "review\|referral\|renewal\|portal\|reporting" \
  app/ --include="*.tsx" 2>/dev/null | head -10

# Q6: COMPETITOR STRUCTURAL ANALYSIS
# Review these 3 competitors for structure only (20 min max):
# - cleanology.com (commercial cleaning)
# - mitie.com/cleaning (enterprise cleaning)
# - ocs.com (facilities management)
# For security:
# - g4s.com (global security)
# - corps-security.com (UK security)
# Focus ONLY on: page count, service architecture,
# location strategy, content hub structure
# Do not analyse keywords, backlinks or rankings

# Q7: MISSING INDUSTRY VERTICALS
# What industry-specific pages would dominate niche searches?
# Cleaning verticals: schools, restaurants, gyms, hotels,
#   retail, warehouses, medical centres, co-working spaces,
#   data centres, pharmaceutical, food production
# Security verticals: retail, construction, events, NHS,
#   education, hospitality, residential developments

================================================================================
REVIEW 8 — CONVERSION REVIEW (both sites)
================================================================================
# Write to: REVIEW/cleaning/CONVERSION-REVIEW.md
#           REVIEW/security/CONVERSION-REVIEW.md

cd /c/laragon/www/vigil-cleaning

echo "=== CTA COVERAGE ==="
pagesWithCTA=$(grep -rln "book-call\|get-started\
\|href.*contact\|book.*call\|enquiry" \
  app/ --include="page.tsx" | wc -l)
totalPages=$(find app -name "page.tsx" \
  | grep -v "node_modules" | wc -l)
echo "Pages with CTA: $pagesWithCTA / $totalPages"

echo "=== PAGES WITHOUT CTA ==="
grep -rL "book-call\|get-started\|enquiry\|contact" \
  app/ --include="page.tsx" | head -20

echo "=== PHONE NUMBER VISIBILITY ==="
grep -rn "020 3098 6037" app/ components/ \
  --include="*.tsx" | wc -l

echo "=== TRUST SIGNALS NEAR CTAs ==="
grep -rn "DBS\|insured\|directly employed\|regulated" \
  app/ --include="*.tsx" | wc -l

cd /c/laragon/www/security

echo "=== SECURITY CTA COVERAGE ==="
pagesWithCTA=$(grep -rln "book-call\|get-started\
\|enquiry\|contact" \
  app/ --include="page.tsx" | wc -l)
totalPages=$(find app -name "page.tsx" \
  | grep -v "node_modules" | wc -l)
echo "Security pages with CTA: $pagesWithCTA / $totalPages"

================================================================================
REVIEW 9 — LOCAL SEO (both sites)
================================================================================
# Write to: REVIEW/shared/LOCAL-SEO-REVIEW.md

cd /c/laragon/www/vigil-cleaning

echo "=== CLEANING BOROUGH COVERAGE ==="
find app -name "page.tsx" \
  | grep -v "node_modules" \
  | sed 's|app||' | sed 's|/page.tsx||' \
  | grep -i "location\|commercial-cleaning-[a-z]" | sort

echo "=== BOROUGH PAGE QUALITY CHECK ==="
# Read one borough page to assess depth
find app -name "page.tsx" \
  | grep -i "commercial-cleaning-westminster\|commercial-cleaning-camden" \
  | head -1 | xargs head -80 2>/dev/null

echo "=== LocalBusiness schema with areaServed ==="
grep -rln "areaServed" app/ --include="*.tsx" | wc -l

cd /c/laragon/www/security

echo "=== SECURITY LOCATION COVERAGE ==="
find app -name "page.tsx" \
  | grep -v "node_modules" \
  | sed 's|app||' | sed 's|/page.tsx||' \
  | grep -i "location\|london\|westminster\|canary\|city" | sort

================================================================================
GENERATE ALL REVIEW FILES
================================================================================
# Based on ALL findings above — write each file.
# Use file:line citations where possible.
# State confidence: HIGH/MEDIUM/LOW per finding.
# Categorise impact: Critical/High/Medium/Low.
# Always distinguish between the two sites.

# REVIEW/REVIEW-SUMMARY.md
# Executive summary covering both sites.
# Overall scores per dimension per site (out of 100).
# Top 10 priorities across both sites combined.
# Cross-site opportunities (fixes that help both).

# REVIEW/cleaning/TECHNICAL-SEO.md
# REVIEW/cleaning/IA-REVIEW.md
# REVIEW/cleaning/AEO-REVIEW.md
# REVIEW/cleaning/CONTENT-AUTHORITY.md
# REVIEW/cleaning/CONVERSION-REVIEW.md

# REVIEW/security/TECHNICAL-SEO.md
# REVIEW/security/IA-REVIEW.md
# REVIEW/security/AEO-REVIEW.md
# REVIEW/security/CONTENT-AUTHORITY.md
# REVIEW/security/CONVERSION-REVIEW.md

# REVIEW/shared/ENTITY-REVIEW.md (covers both sites)
# REVIEW/shared/GEO-REVIEW.md (covers both sites)
# REVIEW/shared/LOCAL-SEO-REVIEW.md (covers both sites)
# REVIEW/shared/BUSINESS-GROWTH-REVIEW.md (covers both)

# REVIEW/MASTER-OPPORTUNITY-ROADMAP.md
# Ranked table covering both sites:
# | Opportunity | Site | Traffic | Authority |
# | Conversion | Effort | Risk | Session |
# Minimum 20 opportunities, maximum 50.
# Every item must have all 6 columns filled.

================================================================================
COMMIT ALL REVIEW FILES
================================================================================
cd /c/laragon/www/vigil-cleaning
git add REVIEW/
git commit -m "docs: peer review — cleaning + security search authority"
git push origin main

cd /c/laragon/www/security
git add REVIEW/
git commit -m "docs: peer review — security search authority"
git push origin main

echo "================================"
echo "PEER REVIEW COMPLETE"
echo ""
echo "Start reading here:"
echo "1. REVIEW/REVIEW-SUMMARY.md"
echo "2. REVIEW/MASTER-OPPORTUNITY-ROADMAP.md"
echo "3. REVIEW/shared/BUSINESS-GROWTH-REVIEW.md"
echo "================================"
ls -la /c/laragon/www/vigil-cleaning/REVIEW/
ls -la /c/laragon/www/vigil-cleaning/REVIEW/cleaning/
ls -la /c/laragon/www/vigil-cleaning/REVIEW/security/
ls -la /c/laragon/www/vigil-cleaning/REVIEW/shared/
