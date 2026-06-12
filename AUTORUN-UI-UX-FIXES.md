# VIGIL — UI/UX IMPLEMENTATION
# Based on: REVIEW/ui-ux/UI-UX-AUDIT.md
# Covers: cleaning + security repos
# Date: June 2026
#
# PRIORITY ORDER (revenue impact benchmark):
# Tier 1 — Critical bugs (broken CTAs, missing fonts, render-blocking)
# Tier 2 — Conversion (flow persistence, sticky CTAs, iOS zoom)
# Tier 3 — Navigation (dropdown, missing links)
# Tier 4 — Accessibility (WCAG Level A violations first)
# Tier 5 — Trust and polish (logos, contrast, apple icon)
#
# PHONES: Cleaning 020 3098 6037 | Security 020 3973 8892
# CRM: cleaning → app.vigilservices.co.uk/enquire/cleaning
#      security → app.vigilservices.co.uk/enquire/security
# NEVER: claim 32 boroughs, response time guarantees, ACS, ISO

================================================================================
SECURITY REPO — TIER 1 CRITICAL FIXES
================================================================================
cd /c/laragon/www/security
git remote -v | grep "netyvee/security"
# STOP IF WRONG REPO

# ── FIX S1 — Nav CTA pointing to homepage ─────────────────────────────────
cat components/shared/Nav.tsx

# Find the "Get a quote" button with href="/"
# Replace ONLY that href:
# FROM: href="/"
# TO:   href="https://app.vigilservices.co.uk/enquire/security"

# Also check if any other nav links point to "/":
grep -n 'href="/"' components/shared/Nav.tsx
# Fix all CTA instances. Leave logo href="/" alone.

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add components/shared/Nav.tsx
git commit -m "fix(critical): security nav CTA now points to CRM not homepage"
git push origin main

# ── FIX S2 — Add favicon to security layout ───────────────────────────────
cat app/layout.tsx | head -60

# Add to metadata export in app/layout.tsx:
# icons: {
#   icon: [
#     { url: '/favicon.svg', type: 'image/svg+xml' },
#     { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
#   ],
#   shortcut: '/favicon.svg',
#   apple: '/apple-touch-icon.png',
# },

# Check if favicon.svg exists in public/:
ls public/ | grep -i "fav\|icon\|apple"

# If NO favicon files exist — create them:
# Create public/favicon.svg (VG monogram, orange accent):
cat > public/favicon.svg << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
     width="64" height="64">
  <rect width="64" height="64" rx="12" fill="#0a1628"/>
  <circle cx="32" cy="31" r="21" fill="none"
    stroke="#EA580C" stroke-width="2.5"
    stroke-dasharray="100 10" stroke-dashoffset="5"/>
  <text x="31" y="39" text-anchor="middle"
    font-family="Georgia,serif" font-weight="900"
    font-size="24" fill="#ffffff"
    letter-spacing="-1">VG</text>
</svg>
SVGEOF

# Create apple-touch-icon.png placeholder instruction:
# NOTE: Apple touch icon must be 180x180 PNG
# The SVG cannot be used directly for apple-touch-icon
# Generate PNG from SVG using sharp in a build script
# OR create a simple PNG manually and commit to public/
# For now: reference the SVG and add PNG TODO comment

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add app/layout.tsx public/favicon.svg
git commit -m "fix(critical): add favicon to security site"
git push origin main

# ── FIX S3 — Add next/font to security layout ─────────────────────────────
cat app/layout.tsx | head -20
cat tailwind.config.ts | grep -i "font\|DM\|Playfair" | head -10

# Read cleaning site layout for the font pattern to mirror:
cat /c/laragon/www/vigil-cleaning/app/layout.tsx \
  | grep -A 20 "next/font\|DM_Sans\|font"

# Add to security app/layout.tsx:
# import { DM_Sans, Playfair_Display } from 'next/font/google'
#
# const dmSans = DM_Sans({
#   subsets: ['latin'],
#   display: 'swap',
#   variable: '--font-dm-sans',
# })
#
# const playfairDisplay = Playfair_Display({
#   subsets: ['latin'],
#   display: 'swap',
#   variable: '--font-playfair',
# })
#
# In RootLayout <body>:
# className={`${dmSans.variable} ${playfairDisplay.variable}`}

# Verify tailwind.config.ts uses these CSS variables:
grep "dm-sans\|playfair\|font-sans\|font-serif" \
  tailwind.config.ts | head -5
# If variables not wired in tailwind — add:
# fontFamily: {
#   sans: ['var(--font-dm-sans)', ...defaultTheme.fontFamily.sans],
#   serif: ['var(--font-playfair)', ...defaultTheme.fontFamily.serif],
# }

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add app/layout.tsx tailwind.config.ts
git commit -m "fix(critical): add next/font DM Sans + Playfair Display to security"
git push origin main

# ── FIX S4 — Remove Tabler Icons CDN render-blocking link ─────────────────
cat app/layout.tsx | grep -n "cdn\|tabler\|jsdelivr\|webfont\|stylesheet"

# Check if any ti-* class names exist (webfont classes):
grep -rn '"ti ti-\|ti ti-\|className.*ti ' \
  app/ components/ --include="*.tsx" \
  | grep -v "node_modules\|\.next" | head -10

# If ti ti- classes ARE found:
# These reference the webfont — replace with @tabler/icons-react SVG imports
# Check what icons are used:
grep -roh '"ti ti-[a-z-]*"' app/ components/ --include="*.tsx" \
  | sort | uniq | head -20
# For each icon — replace with equivalent from @tabler/icons-react

# If NO ti ti- classes found:
# Remove the CDN <link> tag entirely from layout.tsx

# Either way — remove the render-blocking CDN link

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add app/layout.tsx app/ components/
git commit -m "fix(performance): remove Tabler Icons CDN render-blocking link"
git push origin main

# ── FIX S5 — Fix btn-primary contrast on security ─────────────────────────
cat app/globals.css | grep -A 5 "btn-primary\|btn-outline"

# Current: .btn-primary likely has text-white on bg-[#EA580C] or teal
# Issue from audit: white on teal = 1.9:1 (WCAG FAIL)
#
# Audit says security uses #4ecdc4 (teal) where it should use #EA580C (orange)
# This is the accent colour mismatch:
grep -roh "#4ecdc4\|teal" app/ components/ --include="*.tsx" \
  | wc -l
echo "teal references on security site"
grep -roh "#EA580C\|orange" app/ components/ --include="*.tsx" \
  | wc -l
echo "orange references on security site"

# The audit found: "553 occurrences of #4ecdc4 on security site"
# This means teal is used throughout security when orange should be used
# This is the branding inconsistency confirmed in the audit

# Fix the btn-primary contrast first (quick win):
# In app/globals.css:
# .btn-primary { @apply bg-[#EA580C] text-white }
# White on orange #EA580C = 3.2:1 — still borderline
# Better: use navy text
# .btn-primary { @apply bg-[#EA580C] text-white font-semibold }
# OR for AA compliance: navy text on orange
# .btn-primary { @apply bg-[#EA580C] text-[#0a1628] font-semibold }
# Navy on orange #EA580C = 4.8:1 ✓ WCAG AA PASS

# Read globals.css fully first:
cat app/globals.css

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add app/globals.css
git commit -m "fix(a11y): btn-primary contrast fix — navy text on orange passes WCAG AA"
git push origin main

# ── FIX S6 — Add missing nav links to security nav ────────────────────────
cat components/shared/Nav.tsx

# Current security nav: Services, About, Contact, Careers
# Missing: Blog, FAQ, Locations/Coverage
# Add:
# <Link href="/blog">Blog</Link>
# <Link href="/faq">FAQ</Link>
# Optionally: <Link href="/commercial-security-greater-london">Coverage</Link>

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add components/shared/Nav.tsx
git commit -m "feat(nav): add Blog, FAQ, Coverage links to security nav"
git push origin main

================================================================================
CLEANING REPO — TIER 1 CRITICAL FIXES
================================================================================
cd /c/laragon/www/vigil-cleaning
git remote -v | grep "netyvee/vigil-cleaning"
# STOP IF WRONG REPO

# ── FIX C1 — iOS input zoom fix in QualificationFlow ──────────────────────
cat components/QualificationFlow.tsx \
  | grep -n "fontSize\|font-size\|text-sm\|text-xs\|14\|15" \
  | head -20

# Find all input/select/textarea elements:
grep -n "<input\|<select\|<textarea" \
  components/QualificationFlow.tsx | head -20

# For each input — ensure font-size is 16px minimum:
# Replace: fontSize: 14 or fontSize: 15 or text-sm on inputs
# With: text-base (16px) on all interactive inputs
# Labels and helper text can remain smaller

# Also check CareersFlow if it exists:
find components -name "*Careers*\|*careers*" | head -3 \
  | xargs grep -n "fontSize\|text-sm" 2>/dev/null | head -10

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add components/QualificationFlow.tsx
git commit -m "fix(mobile): qualification flow inputs min 16px — prevents iOS zoom"
git push origin main

# ── FIX C2 — Fix apple-touch-icon (SVG → PNG reference) ──────────────────
cat app/layout.tsx | grep -n "apple\|icon"

# Current: icons.apple = '/favicon.svg'
# iOS does not support SVG for apple-touch-icon
# Fix: Create a 180x180 PNG version

# Generate apple-touch-icon.png using Node canvas or sharp:
node -e "
const fs = require('fs');
// Create a minimal PNG notice file if sharp not available
// This is a placeholder — proper PNG generation needs sharp
console.log('apple-touch-icon.png needs manual creation at 180x180');
console.log('Use favicon.svg as reference');
"

# Update layout.tsx to reference PNG:
# apple: '/apple-touch-icon.png'
# Add TODO comment for PNG generation

# For now — add manifest.json with correct icon references:
cat > public/manifest.json << 'MANIFESTEOF'
{
  "name": "Vigil Cleaning Services",
  "short_name": "Vigil Cleaning",
  "description": "Commercial cleaning services across London",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a1628",
  "theme_color": "#4ecdc4",
  "icons": [
    {
      "src": "/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}
MANIFESTEOF

# Add manifest link to layout.tsx metadata:
# manifest: '/manifest.json'

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add app/layout.tsx public/manifest.json
git commit -m "fix(pwa): add web manifest, fix apple-touch-icon reference"
git push origin main

================================================================================
BOTH REPOS — TIER 2 CONVERSION FIXES
================================================================================

# ── FIX B1 — Skip navigation links (WCAG 2.4.1 Level A) ──────────────────
# This is a legal compliance requirement under UK Equality Act 2010
# Must be FIRST element inside <body>

# CLEANING:
cd /c/laragon/www/vigil-cleaning
cat app/layout.tsx | grep -n "body\|main\|children"

# Add as FIRST child of <body> in layout.tsx:
# <a
#   href="#main-content"
#   className="sr-only focus:not-sr-only focus:fixed focus:top-4
#     focus:left-4 focus:z-50 focus:px-4 focus:py-2
#     focus:bg-[#4ecdc4] focus:text-[#0a1628] focus:font-semibold
#     focus:rounded-md focus:outline-none"
# >
#   Skip to main content
# </a>

# Verify main content has correct id:
grep -n 'id="main-content"\|id="main"' app/page.tsx | head -3
# If missing — add id="main-content" to the <main> element

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add app/layout.tsx app/page.tsx
git commit -m "fix(a11y): add skip navigation link — WCAG 2.4.1 Level A compliance"
git push origin main

# SECURITY:
cd /c/laragon/www/security
# Same fix — orange variant:
# focus:bg-[#EA580C] focus:text-white

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add app/layout.tsx
git commit -m "fix(a11y): add skip navigation link — WCAG 2.4.1 Level A compliance"
git push origin main

# ── FIX B2 — Qualification flow state persistence ─────────────────────────
# Both repos — saves user progress across browser refresh
# Read the flow component first:

cd /c/laragon/www/vigil-cleaning
cat components/QualificationFlow.tsx | head -80

# Add sessionStorage persistence to QualificationFlow.tsx:
# In the component — add these two useEffects:
#
# // Restore saved state on mount
# useEffect(() => {
#   const saved = sessionStorage.getItem('vigil-flow-state')
#   if (saved) {
#     try {
#       const { screen, answers } = JSON.parse(saved)
#       setScreen(screen)
#       setAnswers(answers)
#     } catch {}
#   }
# }, [])
#
# // Save state on every change
# useEffect(() => {
#   sessionStorage.setItem('vigil-flow-state',
#     JSON.stringify({ screen, answers }))
# }, [screen, answers])
#
# // Clear on completion
# const handleComplete = () => {
#   sessionStorage.removeItem('vigil-flow-state')
#   // existing completion logic
# }
#
# Confirm actual state variable names match before adding

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add components/QualificationFlow.tsx
git commit -m "feat(ux): persist qualification flow state in sessionStorage"
git push origin main

# SECURITY repo — same fix on SecurityQualificationFlow:
cd /c/laragon/www/security
cat components/SecurityQualificationFlow.tsx 2>/dev/null \
  || find components -name "*Flow*\|*flow*" | head -1 | xargs head -40
# Apply same sessionStorage pattern
# Use key: 'vigil-security-flow-state'

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add components/
git commit -m "feat(ux): persist security qualification flow state in sessionStorage"
git push origin main

# ── FIX B3 — Fix FloatingCTA hidden on security homepage ─────────────────
cd /c/laragon/www/security
cat components/FloatingCTA.tsx 2>/dev/null \
  || find components -name "*Floating*\|*floating*" | head -1 | xargs cat

# Current: returns null when pathname === "/"
# Fix: show FloatingCTA on homepage but only after 800px scroll
# Replace the early return with scroll-based visibility:
#
# const [visible, setVisible] = useState(false)
# const [scrolled, setScrolled] = useState(false)
#
# useEffect(() => {
#   const handleScroll = () => {
#     setScrolled(window.scrollY > 800)
#   }
#   window.addEventListener('scroll', handleScroll)
#   return () => window.removeEventListener('scroll', handleScroll)
# }, [])
#
# // Show on inner pages immediately, on homepage after 800px scroll
# const shouldShow = pathname !== "/" ? true : scrolled
# if (!shouldShow) return null

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add components/FloatingCTA.tsx
git commit -m "fix(conversion): FloatingCTA now shows on homepage after 800px scroll"
git push origin main

================================================================================
BOTH REPOS — TIER 3 NAVIGATION
================================================================================

# ── FIX N1 — Services dropdown on desktop nav ─────────────────────────────
# Add hover dropdown to both Nav components
# This must work for both desktop hover AND mobile accordion

# CLEANING:
cd /c/laragon/www/vigil-cleaning
cat components/Nav.tsx | head -60

# Add services dropdown. Read the full Nav component first.
# Pattern:
# <div className="relative group">
#   <button className="nav-link flex items-center gap-1">
#     Services
#     <ChevronDownIcon className="w-4 h-4 group-hover:rotate-180
#       transition-transform"/>
#   </button>
#   <div className="absolute top-full left-0 hidden group-hover:block
#     bg-[#0f1f36] border border-[rgba(78,205,196,0.15)]
#     rounded-lg shadow-xl py-2 min-w-[220px] z-50">
#     <Link href="/services/office-cleaning-london/"
#       className="flex items-start gap-3 px-4 py-3 hover:bg-[rgba(78,205,196,0.05)]">
#       <span className="text-xl">🏢</span>
#       <div>
#         <div className="text-sm font-semibold text-white">
#           Office cleaning</div>
#         <div className="text-xs text-[rgba(255,255,255,0.5)]">
#           Daily and contract cleaning</div>
#       </div>
#     </Link>
#     <Link href="/after-builders-cleaning-london/" ...>
#       After builders cleaning
#     </Link>
#     <Link href="/services/healthcare-facility-cleaning-london/" ...>
#       Healthcare cleaning
#     </Link>
#     <Link href="/construction-site-cleaning-london/" ...>
#       Construction cleaning
#     </Link>
#     <Link href="/property-management-cleaning-london/" ...>
#       Property management
#     </Link>
#     <Link href="/emergency-cleaning-london/" ...>
#       Emergency cleaning
#     </Link>
#     <div className="border-t border-[rgba(255,255,255,0.06)] mt-2 pt-2">
#       <Link href="/services/" ...>View all services →</Link>
#     </div>
#   </div>
# </div>

# Also add Locations dropdown with top 6 boroughs:
# Westminster, City of London, Camden, Canary Wharf, Southwark, Lambeth
# + "View all locations →" link

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add components/Nav.tsx
git commit -m "feat(nav): services + locations dropdown on desktop nav"
git push origin main

# SECURITY:
cd /c/laragon/www/security
# Same pattern — orange accent colours
# Services: manned guarding, event security, mobile patrols,
#   key holding, door supervisors, retail security
# Locations: Westminster, City, Canary Wharf, Camden, Southwark, Lambeth

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add components/shared/Nav.tsx
git commit -m "feat(nav): services + locations dropdown on security desktop nav"
git push origin main

================================================================================
BOTH REPOS — TIER 4 ACCESSIBILITY
================================================================================

# ── FIX A1 — Focus styles on security (WCAG 2.4.7 Level AA) ──────────────
cd /c/laragon/www/security
cat app/globals.css

# Add to globals.css:
# /* Focus visible styles — WCAG 2.4.7 */
# *:focus-visible {
#   outline: 2px solid #EA580C;
#   outline-offset: 2px;
# }
# button:focus-visible,
# a:focus-visible,
# input:focus-visible,
# select:focus-visible,
# textarea:focus-visible {
#   outline: 2px solid #EA580C;
#   outline-offset: 2px;
#   border-radius: 4px;
# }

# Also add aria-expanded to hamburger button in Nav:
grep -n "hamburger\|mobile.*menu\|menu.*toggle\|MenuIcon" \
  components/shared/Nav.tsx | head -5
# Add aria-expanded={isMenuOpen} aria-label="Toggle navigation"

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add app/globals.css components/shared/Nav.tsx
git commit -m "fix(a11y): focus-visible styles and aria-expanded on security nav"
git push origin main

# ── FIX A2 — Add aria attributes to security components ───────────────────
# Security has 15 aria occurrences vs cleaning 89
# Minimum required:
# - All icon-only buttons: aria-label
# - All toggle buttons: aria-expanded
# - All nav landmarks: role or semantic element
# - Main content: id="main-content"

grep -rn "aria-" components/ --include="*.tsx" | head -10
# Read each component and add missing aria attributes

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add components/
git commit -m "fix(a11y): add missing aria attributes to security components"
git push origin main

================================================================================
BOTH REPOS — TIER 5 TRUST AND POLISH
================================================================================

# ── FIX T1 — Add sector icon trust strip to both homepages ────────────────
# Until real client logos are available — use sector identifiers
# This goes between hero trust chips and qualification flow

# CLEANING app/page.tsx:
cd /c/laragon/www/vigil-cleaning
# Add a "Trusted by businesses across these sectors" strip:
# <section aria-label="Sectors served">
#   <p className="text-xs text-center text-[rgba(255,255,255,0.3)]
#     uppercase tracking-widest mb-4">
#     Trusted by London businesses in
#   </p>
#   <div className="flex gap-6 justify-center flex-wrap">
#     {[
#       { icon: '🏢', label: 'Corporate offices' },
#       { icon: '🏥', label: 'Healthcare' },
#       { icon: '🏗️', label: 'Construction' },
#       { icon: '🏘️', label: 'Property management' },
#       { icon: '🛍️', label: 'Retail' },
#       { icon: '🎓', label: 'Education' },
#     ].map(sector => (
#       <div key={sector.label}
#         className="flex flex-col items-center gap-1 opacity-60
#           hover:opacity-100 transition-opacity">
#         <span className="text-2xl">{sector.icon}</span>
#         <span className="text-xs text-[rgba(255,255,255,0.5)]">
#           {sector.label}
#         </span>
#       </div>
#     ))}
#   </div>
# </section>
# Position: between hero trust chips and qualification flow

npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add app/page.tsx
git commit -m "feat(trust): sector icon strip on cleaning homepage"
git push origin main

# SECURITY app/page.tsx — same pattern with security sectors:
# Corporate offices, Construction sites, Events/venues, Retail,
# NHS/Healthcare, Licensed premises

cd /c/laragon/www/security
npm run build 2>&1 | grep -E "error TS|compiled" | head -3
git add app/page.tsx
git commit -m "feat(trust): sector icon strip on security homepage"
git push origin main

================================================================================
FINAL VERIFICATION — BOTH REPOS
================================================================================

cd /c/laragon/www/vigil-cleaning

echo "=== CLEANING CRITICAL FIXES ==="
echo "iOS input zoom fix:"
grep -n "text-base\|fontSize.*16\|16px" \
  components/QualificationFlow.tsx | head -3

echo "Skip nav link:"
grep -n "skip.*main\|main-content" app/layout.tsx | head -2

echo "Flow persistence:"
grep -n "sessionStorage" components/QualificationFlow.tsx | head -3

echo "Apple touch icon:"
grep -n "apple\|manifest" app/layout.tsx | head -3

npm run build 2>&1 | grep -E "error TS|compiled" | head -3

cd /c/laragon/www/security

echo "=== SECURITY CRITICAL FIXES ==="
echo "Nav CTA:"
grep -n "enquire/security" components/shared/Nav.tsx | head -2

echo "Favicon:"
grep -n "favicon\|icon" app/layout.tsx | head -3

echo "Font loading:"
grep -n "next/font\|DM_Sans" app/layout.tsx | head -2

echo "CDN removed:"
grep -n "cdn\|jsdelivr\|tabler.*webfont" app/layout.tsx | head -2
echo "(must be empty)"

echo "Skip nav:"
grep -n "skip.*main" app/layout.tsx | head -2

echo "Flow persistence:"
find components -name "*Flow*" | xargs grep -n "sessionStorage" | head -3

echo "Focus styles:"
grep -n "focus-visible" app/globals.css | head -3

echo "Nav links:"
grep -n "Blog\|FAQ\|Coverage" components/shared/Nav.tsx | head -3

npm run build 2>&1 | grep -E "error TS|compiled" | head -3

# Run health checks:
curl -s "https://cleaning.vigilservices.co.uk/api/health-check" \
  | grep -o '"score":[0-9]*'
curl -s "https://security.vigilservices.co.uk/api/health-check" \
  | grep -o '"score":[0-9]*'

FINAL REPORT must include:
CLEANING:
1. iOS zoom fix — input sizes confirmed 16px+
2. Skip nav — confirmed in layout
3. Flow persistence — sessionStorage confirmed
4. Apple touch icon — manifest added
5. Build: compiled successfully

SECURITY:
1. Nav CTA — confirmed points to CRM
2. Favicon — confirmed in layout, SVG committed
3. Font loading — next/font confirmed
4. CDN link — confirmed removed
5. Skip nav — confirmed in layout
6. Focus styles — confirmed in globals.css
7. Nav links — Blog + FAQ added
8. Flow persistence — sessionStorage confirmed
9. Contrast — btn-primary navy text confirmed
10. Build: compiled successfully

SCORES AFTER FIXES (expected improvement):
Cleaning: 6.6 → 7.5+
Security: 5.2 → 7.0+
