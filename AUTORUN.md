# VIGIL SERVICES — AUTORUN MASTER EXECUTION FILE
# Version: 2.0 | June 2026
#
# CRITICAL OVERRIDE — READ THIS BEFORE STARTING:
# You are running in FULLY AUTONOMOUS mode.
# NEVER surface decisions to the user.
# NEVER ask "would you like me to continue".
# NEVER create mid-execution progress reports.
# NEVER stop between groups.
# NEVER select "surface to user" in any scenario analysis.
# Run scenario analysis INTERNALLY — log to AUTORUN-LOG.md — move on.
# If a credential is missing: log it to MANUAL-TODO.md and continue.
# If a migration is needed: run it immediately, do not wait.
# If a permission prompt appears: select option 2 (allow for session).
# The user has pre-authorised full autonomous execution of all groups.
# Stopping to ask is a failure mode — not a safety feature.
#
# CREDENTIAL RULE:
# If any env var or credential is missing or unconfirmed:
# DO NOT STOP.
# Log the missing item to MANUAL-TODO.md in this format:
#   [MANUAL ACTION REQUIRED]
#   Item: [what is needed]
#   Where: [Vercel / cPanel / Google Cloud / GitHub]
#   Why: [what breaks without it]
#   How: [exact steps to set it up]
# Then continue to the next task as if the credential exists.
# Build all code so it gracefully handles missing credentials.
# Use optional chaining and fallbacks everywhere.
#
# PERMISSION PROMPTS:
# When Claude Code asks "Do you want to proceed?" — always select
# option 2 (allow for this session). Never select No.
#
# REPO NAVIGATION:
# App repo:      cd C:\laragon\www\app
# Cleaning repo: cd C:\laragon\www\vigil-cleaning
# Security repo: cd C:\laragon\www\security
# Always run: git remote -v to verify before any changes.
#
# SESSION STRUCTURE:
# Session 1 (COMPLETE): Groups A + B
# Session 2 (THIS SESSION): Groups C through G
# Session 3 (NEXT SESSION): Groups H through K
#
# COMPLETED GROUPS — DO NOT REPEAT:
# ✅ Group A — Compliance chain + deployment webhook
# ✅ Group B — Admin auth + booking CTAs (with fix below)
#
# GROUP B CORRECTION ALREADY APPLIED:
# - NEXT_PUBLIC_BOOKING_URL removed from all components
# - Homepage CTA removed (homepage IS the qualification flow)
# - All other page CTAs link to "/" (homepage)
# - Cleaning: teal #4ecdc4 | Security: orange #EA580C
#
# MIGRATIONS RULE:
# Run php artisan migrate --force immediately when a group
# creates new database tables. Do not wait for user.
# Always run on local first, then push — Vercel handles Next.js,
# cPanel handles Laravel (deferred — see MANUAL-TODO.md).
#
# START WITH GROUP C NOW.
# DO NOT REPEAT GROUPS A OR B.
# GO.

================================================================================
GROUP C — CLIENT DOCUMENT TEMPLATES
================================================================================
REPO: netyvee/app
VERIFY: cd C:\laragon\www\app && git remote -v | findstr "app"
STOP IF WRONG REPO.

LOG: "Starting Group C — Client document templates"

Check if ClientDocumentTemplateSeeder exists:
! php artisan tinker --execute="echo App\Models\DocumentTemplate::where('category','client')->count();"

Create app/Database/Seeders/ClientDocumentTemplateSeeder.php with 6 templates:

TEMPLATE C1 — Terms of Business (Cleaning)
name: "Terms of Business — Cleaning"
category: "client"
division: "cleaning"
placeholders: CLIENT_COMPANY, CLIENT_ADDRESS, CLIENT_CONTACT,
  START_DATE, CONTRACT_LENGTH, PAYMENT_TERMS, NOTICE_PERIOD,
  SERVICE_FREQUENCY, LIABILITY_CAP, AUTHORISED_SIGNATORY,
  VIGIL_SIGNATORY, DATE
content: Full UK commercial contract covering:
  - Parties (Vigil Services Ltd company no. 11756806 + client)
  - Services description and scope reference
  - Service standards and quality commitments
  - Pricing and payment (14 days net from invoice date)
  - Late payment (8% above Bank of England base rate per Late
    Payment of Commercial Debts Act 1998)
  - Liability cap (£10M public liability insurance)
  - COSHH compliance (Vigil responsibility — all products
    COSHH-assessed and REACH compliant)
  - TUPE (Vigil acknowledges obligations if taking over
    existing cleaning workforce)
  - Termination (30 days written notice after initial term
    of {{CONTRACT_LENGTH}})
  - Confidentiality (both parties)
  - Governing law: England and Wales
  - Dispute resolution: good faith negotiation then mediation
  - Entire agreement clause
  - Signature block with date

TEMPLATE C2 — Terms of Business (Security)
name: "Terms of Business — Security"
category: "client"
division: "security"
Same structure as C1 plus:
  - SIA licensing (Vigil warrants all officers hold valid SIA
    licence of correct type — SIA Act 2001 compliance)
  - Use of Force (Vigil officers trained to lawful minimum
    force only — client indemnifies for instructions exceeding
    this)
  - Incident reporting (Vigil reports all incidents within
    24 hours in writing)
  - CCTV and data protection (client responsible for CCTV
    signage and ICO registration where applicable)
  - Conduct Regulations 2003 compliance statement

TEMPLATE C3 — Scope of Works
name: "Scope of Works"
category: "client"
division: "all"
placeholders: CLIENT_COMPANY, SITE_NAME, SITE_ADDRESS,
  SERVICE_DIVISION, SERVICE_DESCRIPTION, SERVICE_FREQUENCY,
  SERVICE_DAYS, SERVICE_HOURS, AREAS_COVERED, EXCLUDED_AREAS,
  SPECIAL_REQUIREMENTS, QUALITY_STANDARDS, KPI_RESPONSE_TIME,
  KPI_QUALITY_SCORE, REVIEW_FREQUENCY, START_DATE,
  VIGIL_CONTACT, CLIENT_CONTACT
content:
  - Site details and access arrangements
  - Services to be provided (detailed)
  - Frequency and schedule
  - Areas in scope and excluded areas
  - Special requirements and site-specific instructions
  - Quality standards and KPIs
  - Review meetings schedule
  - Amendment process (14 days written notice)
  - Appendix A: site floor plan reference
  - Signature block

TEMPLATE C4 — Rate Card
name: "Rate Card"
category: "client"
division: "all"
placeholders: CLIENT_COMPANY, EFFECTIVE_DATE, RATE_ROWS,
  OVERTIME_MULTIPLIER, BANK_HOLIDAY_MULTIPLIER,
  MINIMUM_HOURS, INVOICE_FREQUENCY, PAYMENT_TERMS,
  REVIEW_DATE, AUTHORISED_SIGNATORY
content:
  - Header: agreed rates between Vigil and {{CLIENT_COMPANY}}
  - Effective from {{EFFECTIVE_DATE}}
  - Rate table: shift type | hours | hourly rate | total
  - Overtime: {{OVERTIME_MULTIPLIER}}x after agreed hours
  - Bank holidays: {{BANK_HOLIDAY_MULTIPLIER}}x standard rate
  - Minimum call-out: {{MINIMUM_HOURS}} hours
  - Rates valid until {{REVIEW_DATE}} then subject to review
  - Rates exclude VAT (Vigil VAT registration number shown)
  - Signature: client confirms rates agreed and understood

TEMPLATE C5 — Client Privacy Notice (GDPR Article 13)
name: "Client Privacy Notice"
category: "client"
division: "all"
placeholders: CLIENT_COMPANY, DATE
content (UK GDPR Article 13 compliant):
  - Data controller: Vigil Services Ltd
    DPO contact: info@vigilservices.co.uk
  - Data collected: company name, contact names, emails,
    phone numbers, site addresses, billing information,
    access codes/instructions, CCTV footage references
  - Purpose and legal basis:
    Contract performance (Art 6(1)(b)) — service delivery
    Legitimate interests (Art 6(1)(f)) — fraud prevention,
    business development
    Legal obligation (Art 6(1)(c)) — tax, employment law
  - Retention: financial records 7 years (HMRC requirement)
    Operational records 3 years post-contract
  - Recipients: payroll provider, accountants, HMRC,
    insurers — all under data processing agreements
  - No third country transfers
  - No automated decision-making or profiling
  - Data subject rights: access, rectification, erasure,
    restriction, portability, objection
  - Right to complain: ICO — ico.org.uk — 0303 123 1113
  - Changes: 30 days notice of material changes

TEMPLATE C6 — Terms for Supply of Temporary Workers
name: "Terms for Supply of Temporary Workers"
category: "client"
division: "staffing,care"
placeholders: CLIENT_COMPANY, HIRER_TYPE, DATE,
  VIGIL_CONTACT, AUTHORISED_SIGNATORY
content (AWR 2010 + Conduct Regulations 2003 compliant):
  - Definitions (employment business, hirer, worker, AWR)
  - Vigil's status as employment business (not agency)
  - Worker employment: workers employed by Vigil
    on PAYE — not self-employed
  - AWR Week 12 equal treatment obligations on hirer:
    Hirer must provide Vigil with pay and conditions
    information to enable equal treatment after 12 weeks
    (Regulation 5 AWR 2010)
  - Regulation 13 information: hirer must notify Vigil
    of any collective agreements affecting pay
  - Swedish derogation: not applicable (Vigil does not
    use pay between assignments contracts)
  - Conduct Regulations 2003:
    Hirer acknowledges Conduct Regulations apply
    Hirer confirms it is not a strike-breaking situation
    Right to request work-seeker information (Reg 27)
  - Transfer fees: if hirer wishes to engage worker directly
    — 12 weeks introduction fee applies (Conduct Regs Reg 10)
  - Termination of individual assignments: either party
    48 hours notice — does not terminate this agreement
  - Governing law: England and Wales

Run seeder:
php artisan db:seed --class=ClientDocumentTemplateSeeder

Verify:
php artisan tinker --execute="
  \$count = App\Models\DocumentTemplate::where('category','client')->count();
  echo 'Client templates: ' . \$count . PHP_EOL;
  App\Models\DocumentTemplate::where('category','client')
    ->get(['name','division'])->each(function(\$t) {
      echo '  - ' . \$t->name . ' (' . \$t->division . ')' . PHP_EOL;
    });
"
Must show 6 client templates.

Test generation with dummy client:
php artisan tinker --execute="
  \$client = App\Models\Client::first();
  if (\$client) {
    \$template = App\Models\DocumentTemplate::where('name','Terms of Business — Cleaning')->first();
    if (\$template) {
      echo 'Template found — generation test would work' . PHP_EOL;
    }
  } else {
    echo 'No test client — skipping generation test' . PHP_EOL;
  }
"

If any template fails to seed — fix the error and retry.
Do not proceed until all 6 templates exist.

git add .
git commit -m "feat: client document templates — ToB Cleaning, ToB Security, Scope, Rate Card, Privacy Notice, AWR Terms"
git push origin master
LOG: "Group C complete — 6 templates created"

================================================================================
GROUP D — CLIENT ONBOARDING TRIGGER + SIGNING PORTAL
================================================================================
REPO: netyvee/app
VERIFY: git remote -v | findstr "app"

LOG: "Starting Group D — Client onboarding trigger + signing portal"

--- D1: LEAD TO CLIENT ONBOARDING TRIGGER ---

Find where lead converts to client:
! grep -rn "Client::create\|client()->create\|convertToClient\|store.*client" app/Http/Controllers/ --include="*.php" | head -20

Read the conversion method fully.
After client record is created add this flow:

private function sendClientOnboardingDocuments(Client $client): void
{
    // Determine which templates to use based on division
    $divisions = ['cleaning', 'security'] ;
    $staffingDivisions = ['staffing', 'care'];
    $division = strtolower($client->division ?? 'cleaning');

    $templateNames = [
        'Terms of Business — ' . ucfirst($division),
        'Scope of Works',
        'Rate Card',
        'Client Privacy Notice',
    ];

    // Add AWR terms for staffing and care
    if (in_array($division, $staffingDivisions)) {
        $templateNames[] = 'Terms for Supply of Temporary Workers';
    }

    $templates = DocumentTemplate::whereIn('name', $templateNames)
        ->where('category', 'client')
        ->get();

    if ($templates->isEmpty()) {
        Log::warning("No client templates found for division: {$division}");
        return;
    }

    // Generate documents for each template
    $generatedDocs = [];
    foreach ($templates as $template) {
        $placeholders = [
            'CLIENT_COMPANY' => $client->company_name ?? $client->name,
            'CLIENT_ADDRESS' => $client->address ?? '',
            'CLIENT_CONTACT' => $client->contact_name ?? '',
            'START_DATE' => now()->addDays(14)->format('d F Y'),
            'CONTRACT_LENGTH' => '3 months',
            'PAYMENT_TERMS' => '14 days net',
            'NOTICE_PERIOD' => '30 days',
            'LIABILITY_CAP' => '£10,000,000',
            'AUTHORISED_SIGNATORY' => $client->contact_name ?? '',
            'VIGIL_SIGNATORY' => 'Vigil Services Ltd',
            'DATE' => now()->format('d F Y'),
            'EFFECTIVE_DATE' => now()->format('d F Y'),
            'REVIEW_DATE' => now()->addYear()->format('d F Y'),
        ];

        $doc = app(DocumentGenerationService::class)
            ->generate($template, $client, $placeholders);
        $generatedDocs[] = $doc;
    }

    // Update client status
    $client->update(['status' => 'awaiting_documents']);

    // Send onboarding email with signing link
    $signingToken = Str::uuid();
    $client->update(['signing_token' => $signingToken]);

    // Send email to client billing contact
    $email = $client->billing_email ?? $client->email;
    if ($email) {
        Mail::to($email)->send(new ClientOnboardingMail($client, $signingToken, $generatedDocs));
    }

    // Log to client history
    activity()
        ->performedOn($client)
        ->log('Onboarding documents generated and sent');
}

If activity() log does not exist — use Log::info() instead.
If Mail class does not exist — create a basic ClientOnboardingMail mailable.
If signing_token column missing from clients table — create migration:
  php artisan make:migration add_signing_token_to_clients_table
  Add: $table->string('signing_token')->nullable();
  php artisan migrate

Update client status flow — add these statuses if not present:
  'awaiting_documents', 'documents_sent', 'documents_signed', 'active'

LOG: "D1 complete — onboarding trigger wired"

--- D2: CLIENT ONBOARDING EMAIL ---

Create app/Mail/ClientOnboardingMail.php:
Professional email from Vigil Services Ltd.
Subject: "Action required — please review and sign your service documents"
Body:
  - Welcome to Vigil Services Ltd
  - Documents ready to review and sign
  - Prominent button: "Review and sign documents"
    linking to: https://app.vigilservices.co.uk/client/sign/{token}
  - List of documents enclosed
  - Contact details for questions
  - Professional sign-off

LOG: "D2 complete — onboarding email created"

--- D3: CLIENT SIGNING PORTAL ---

Route: GET /client/sign/{token}
Find existing worker signing portal at /sign/{token}.
Read it fully then create a client version.

Create routes/web.php entries:
  Route::get('/client/sign/{token}', [ClientSigningController::class, 'show']);
  Route::post('/client/sign/{token}', [ClientSigningController::class, 'sign']);
  Route::post('/client/sign/{token}/open', [ClientSigningController::class, 'markOpened']);

Create ClientSigningController:
  show() — find client by signing_token, show document list
  markOpened() — timestamp when each document is opened
  sign() — record digital signature with IP + timestamp
    On final document signed:
      - Update all generated_documents to signed status
      - Update client status to 'active'
      - Email signed copies to client billing address
      - Notify coordinator by email

Create views/client/sign/:
  index.blade.php — document list with progress indicator
  document.blade.php — document viewer with acknowledge checkbox
  signature.blade.php — digital signature capture
  complete.blade.php — confirmation page

Status flow on client record:
  awaiting_documents → documents_sent → documents_signed → active

Verify signing portal accessible:
php artisan tinker --execute="
  \$client = App\Models\Client::first();
  if (\$client && \$client->signing_token) {
    echo 'Signing URL: https://app.vigilservices.co.uk/client/sign/' . \$client->signing_token . PHP_EOL;
  } else {
    echo 'No signing token — generate one to test' . PHP_EOL;
  }
"

LOG: "D3 complete — client signing portal built"

Run all migrations:
php artisan migrate

git add .
git commit -m "feat: client onboarding — trigger, email, signing portal, status flow"
git push origin master
LOG: "Group D complete"

================================================================================
GROUP E — STAFF PORTAL END-TO-END + EMPLOYEE HANDBOOK
================================================================================
REPO: netyvee/app
VERIFY: git remote -v | findstr "app"

LOG: "Starting Group E — Staff portal + handbook"

--- E1: CREATE TEST EMPLOYEE ---
php artisan tinker --execute="
\$emp = App\Models\Employee::firstOrCreate(
  ['email' => 'test.worker@vigil.test'],
  [
    'first_name' => 'Test',
    'last_name' => 'Worker',
    'division' => 'cleaning',
    'status' => 'active',
    'phone' => '07700000000',
  ]
);
\$emp->update(['portal_password' => bcrypt('Staff1234!')]);
echo 'Test worker: ' . \$emp->email . PHP_EOL;
echo 'Password: Staff1234!' . PHP_EOL;
"

--- E2: TEST ALL STAFF PORTAL ROUTES ---
php artisan tinker --execute="
\$routes = [
  '/staff/login',
  '/staff',
  '/staff/shifts',
  '/staff/timesheets',
  '/staff/payslips',
  '/staff/compliance',
  '/staff/profile',
];
foreach (\$routes as \$route) {
  \$req = Illuminate\Http\Request::create(\$route, 'GET');
  \$res = app()->handle(\$req);
  \$s = \$res->getStatusCode();
  \$ok = (\$s >= 200 && \$s < 500);
  echo str_pad(\$route, 30) . \$s . (\$ok ? ' ✓' : ' ✗') . PHP_EOL;
}
"

For any route returning 500 or 404:
  Read the controller and view for that route
  Run scenario analysis on the error
  Fix the most likely cause
  Retry until all routes return 200 or 302

--- E3: EMPLOYEE HANDBOOK ---
php artisan tinker --execute="
\$t = App\Models\DocumentTemplate::where('name','like','%handbook%')
  ->orWhere('name','like','%Handbook%')->first();
echo \$t ? 'EXISTS: ' . \$t->name : 'MISSING — will create';
"

If missing — create full Employee Handbook template with:
  Equal opportunities policy
  Disciplinary procedure (3-stage: verbal, written, final)
  Grievance procedure
  Health and safety at work (HASAWA 1974)
  Data protection (UK GDPR — employee data)
  Social media policy
  Confidentiality and non-disclosure
  TUPE rights information
  Working Time Regulations (rest breaks, opt-out reference)
  Whistleblowing policy (PIDA 1998)
  Anti-bribery policy (Bribery Act 2010)
  Modern slavery statement reference
  Equal pay statement
  Flexible working policy

If exists — check content length:
php artisan tinker --execute="
\$t = App\Models\DocumentTemplate::where('name','like','%handbook%')->first();
echo 'Content length: ' . strlen(\$t->content ?? '') . ' chars';
"
If under 5000 chars — content is placeholder — replace with full content.

git add .
git commit -m "fix: staff portal verified, employee handbook complete"
git push origin master
LOG: "Group E complete"

================================================================================
GROUP F — CLEANING SITE CRITICAL SEO FIXES
================================================================================
REPO: netyvee/vigil-cleaning
VERIFY: cd C:\laragon\www\vigil-cleaning && git remote -v | findstr "vigil-cleaning"

LOG: "Starting Group F — Cleaning site critical SEO fixes"

STEP 1 — DISCOVERY GREP (read only, no changes yet):
! findstr /r /s /i "98%%" app\ components\ 2>nul
! findstr /r /s /i "97%%" app\ components\ 2>nul
! findstr /r /s /i "500+" app\ components\ 2>nul
! findstr /r /s /i "NHS" app\ components\ 2>nul
! findstr /r /s /i "0203973\|0203 973" app\ components\ 2>nul
! findstr /r /s /i "\[your " app\ components\ 2>nul
! findstr /r /s /i "residential\|your home\|house cleaning" app\ components\ 2>nul

Log all findings to AUTORUN-LOG.md before touching any file.

STEP 2 — FIX FORBIDDEN CLAIMS:
For each file containing forbidden terms:
  SCENARIO ANALYSIS per occurrence:
    What is the context? (stat, testimonial, hero section)
    Option A: Replace with approved alternative
    Option B: Remove the stat entirely (if no good replacement)
  Approved replacements:
    "98%" → "consistently high client satisfaction"
    "97%" → "strong retention across our client portfolio"
    "500+" → "serving businesses across 32 London boroughs"
    "NHS-approved" → "COSHH-compliant, commercially approved"
    "guaranteed" → "committed to"
    "residential" → "commercial"
    "your home" → "your premises"
    "house cleaning" → "commercial cleaning"
  Use line-aware replacement — not global string replace.
  Read 5 lines of context around each match before replacing.

STEP 3 — ADD H1 TAGS:
For each page file missing an h1 element:
  Check rendered HTML first:
  Derive focus keyword from URL slug:
    /commercial-cleaning-london → "Commercial Cleaning London"
    /services/office-cleaning-london → "Office Cleaning London"
    /after-builders-cleaning-london → "After Builders Cleaning London"
    /commercial-cleaning-westminster → "Commercial Cleaning Westminster"
    (apply same pattern to all borough pages)
  Check if sr-only class exists in globals.css:
    ! findstr /r "sr-only" app\globals.css styles\globals.css 2>nul
  If missing add to globals.css:
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  Add H1 as first element in page return:
    <h1 className="sr-only">{focus_keyword} — Vigil Cleaning Services</h1>

STEP 4 — FIX PHONE NUMBER:
! findstr /r /s "0203973\|0203 973\|020 3973" app\ components\ 2>nul
Replace all instances with: 020 3098 6037
Check: faq page, footer component, contact page, any shared components.

STEP 5 — FIX PLACEHOLDER TEXT:
Find: "[your service locations" and any other [bracket] patterns
Replace FAQ placeholder with:
"London and all 32 surrounding boroughs including Westminster,
Camden, Islington, Hackney, Tower Hamlets, Southwark, Lambeth,
Wandsworth, Hammersmith and Fulham, Kensington and Chelsea,
and the City of London."

STEP 6 — FIX BROKEN IMAGES:
! findstr /r /s "src=" app\ components\ --include="*.tsx" 2>nul | findstr "wordpress\|wp-content\|\.wordpress\."
For each WordPress image URL found:
  SCENARIO ANALYSIS:
    Option A: Replace with a placeholder from /public folder if exists
    Option B: Remove the img tag entirely — safest if no replacement
    Option C: Replace with next/image from Cloudinary if URL pattern exists
  Check public folder for any images:
  ! dir public\ /b /s 2>nul | findstr ".jpg\|.png\|.webp"
  Use best available option. Log reasoning.

STEP 7 — ADD HOMEPAGE TO SITEMAP:
! type app\sitemap.ts 2>nul || type app\sitemap.xml.ts 2>nul
Find the sitemap file.
Add homepage entry as first item:
  {
    url: 'https://cleaning.vigilservices.co.uk',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }

BUILD AND VERIFY:
! npm run build
Fix every TypeScript error before committing.
Do not proceed until 0 errors, 0 warnings blocking build.

! git add .
! git commit -m "fix: forbidden claims, H1 tags, phone number, placeholder text, broken images, sitemap"
! git push origin main
! timeout /t 120 /nobreak
! curl -s -o /dev/null -w "%%{http_code}" https://cleaning.vigilservices.co.uk
Must return 200.

Run audit check:
! curl -s "https://cleaning.vigilservices.co.uk/api/health-check" | findstr "score\|errors\|warnings\|pages_audited"
LOG: "Group F complete — score before: 38, score after: [N from audit]"

================================================================================
GROUP G — SECURITY SITE V8 UPGRADE + FIXES
================================================================================
REPO: netyvee/security
VERIFY: cd C:\laragon\www\security && git remote -v | findstr "security"

LOG: "Starting Group G — Security site V8 upgrade + fixes"

STEP 1 — CHECK CURRENT VERSION:
! type app\api\health-check\route.ts | findstr "version\|tool\|BASE_URL"

STEP 2 — READ V8 FROM CLEANING SITE:
! type C:\laragon\www\vigil-cleaning\app\api\health-check\route.ts

Copy the full V8 implementation to security site.
Make these adaptations only:
  BASE_URL = 'https://security.vigilservices.co.uk'
  tool = 'Vigil Advanced SEO Auditor v8.0'
  site = 'security.vigilservices.co.uk'
  Priority pages = security site URLs:
    BASE_URL + /
    BASE_URL + /manned-guarding-london
    BASE_URL + /event-security-london
    BASE_URL + /mobile-patrols-london
    BASE_URL + /key-holding-alarm-response-london
    BASE_URL + /retail-security-london
    BASE_URL + /construction-site-security-london
    BASE_URL + /door-supervisors-london
    (add any other pages found in the security sitemap)
  Schema type: SecurityService not CleaningService
  NAP phone: 020 3973 8887 (security number)
  NAP email: vigsecs@gmail.com
  GSC_SITE_URL default: https://security.vigilservices.co.uk

If credential env vars missing (PAGESPEED_API_KEY, GSC tokens):
  Log to MANUAL-TODO.md and continue.
  Build the modules so they gracefully return null when unconfigured.

STEP 3 — FIX CRITICAL SECURITY SITE ISSUES:
Discovery grep first:
! findstr /r /s /i "98%%\|97%%\|500+\|guaranteed" app\ components\ 2>nul
! findstr /r /s /i "0203098\|020 3098" app\ components\ 2>nul

Fixes to apply (same pattern as Group F):
  Add H1 to all service pages missing it
    Focus keywords from URL slugs
  Fix broken images (remove or replace WordPress URLs)
  Fix HTML entities (&amp; → & in JSX)
  Add serviceType to JSON-LD:
    "serviceType": "Security Services"
  Trim meta descriptions to under 155 chars:
    Read each meta description
    If over 155 chars: trim to 150 chars keeping focus keyword
    Add "..." only if cutting mid-sentence

STEP 4 — COPY SETUP-CHECK AND GSC ROUTES:
If /api/admin/setup-check does not exist on security:
  Copy from cleaning site: app\api\admin\setup-check\route.ts
  Update BASE_URL reference to security domain

BUILD AND VERIFY:
! npm run build
Fix all TypeScript errors.
! git add .
! git commit -m "feat: V8 auditor on security site + critical SEO fixes"
! git push origin main
! timeout /t 120 /nobreak
! curl -s -o /dev/null -w "%%{http_code}" https://security.vigilservices.co.uk
Must return 200.
! curl -s "https://security.vigilservices.co.uk/api/health-check" | findstr "version\|score"
Must show version: 8.0.0
LOG: "Group G complete"

================================================================================
GROUP H — GOOGLE CREDENTIALS SETUP
================================================================================
NOTE: This group configures env vars.
If credentials are not available in the environment:
  Log all required actions to MANUAL-TODO.md.
  Build all code to handle missing credentials gracefully.
  Do not stop.

LOG: "Starting Group H — Google credentials"

STEP 1 — CHECK WHAT IS ALREADY SET:
! curl -s "https://cleaning.vigilservices.co.uk/api/admin/setup-check"
! curl -s "https://security.vigilservices.co.uk/api/admin/setup-check"
Log which credentials are confirmed vs missing.

STEP 2 — FOR EACH MISSING CREDENTIAL:
Add to MANUAL-TODO.md:

[MANUAL ACTION — GOOGLE CREDENTIALS]
Add these to Vercel environment variables:

CLEANING SITE (vigil-s-projects1/vigil-cleaning):
  PAGESPEED_API_KEY
    Get from: console.cloud.google.com/apis/credentials
    Project: elegant-hope-453720-r1
    Type: API key
  GOOGLE_SERVICE_ACCOUNT_JSON
    Get from: same project, service account:
    vigil-seo-auditor@elegant-hope-453720-r1.iam.gserviceaccount.com
    Download JSON key file, paste full contents
  GSC_CLIENT_ID
    Get from: OAuth client "Vigil GSC Access" in same project
  GSC_CLIENT_SECRET
    Same OAuth client
  GSC_SITE_URL = https://cleaning.vigilservices.co.uk
  GSC_REDIRECT_URI = https://cleaning.vigilservices.co.uk/api/admin/gsc-callback
  GSC_REFRESH_TOKEN
    Obtain AFTER setting above vars:
    Visit: https://cleaning.vigilservices.co.uk/api/admin/gsc-auth
    Complete Google OAuth in browser
    Copy refresh token shown on success page
    Add to Vercel as GSC_REFRESH_TOKEN

SECURITY SITE (vigil-s-projects1/security):
  Same PAGESPEED_API_KEY (shared)
  Same GOOGLE_SERVICE_ACCOUNT_JSON (shared)
  Same GSC_CLIENT_ID (shared)
  Same GSC_CLIENT_SECRET (shared)
  GSC_SITE_URL = https://security.vigilservices.co.uk
  GSC_REDIRECT_URI = https://security.vigilservices.co.uk/api/admin/gsc-callback
  GSC_REFRESH_TOKEN (unique — complete OAuth on security site)

Also add to Google Cloud Console:
  console.cloud.google.com/apis/credentials?project=elegant-hope-453720-r1
  Click: Vigil GSC Access → Edit
  Add Authorised redirect URIs:
    https://cleaning.vigilservices.co.uk/api/admin/gsc-callback
    https://security.vigilservices.co.uk/api/admin/gsc-callback

STEP 3 — VERIFY WHAT IS ALREADY WORKING:
If PAGESPEED_API_KEY is already set and returning data:
  Log: "PageSpeed API connected on [site]"
If GSC returning data:
  Log: "GSC connected on [site]"

LOG: "Group H complete — [N] credentials confirmed, [N] added to MANUAL-TODO.md"

================================================================================
GROUP I — FIX MANAGER BUILD
================================================================================
REPO: netyvee/vigil-cleaning
VERIFY: cd C:\laragon\www\vigil-cleaning && git remote -v | findstr "vigil-cleaning"

PREREQUISITE: Verify admin auth working:
! curl -s -o /dev/null -w "%%{http_code}" https://cleaning.vigilservices.co.uk/admin/login
If not 200: fix auth before continuing (read middleware.ts, fix it, deploy).
Do not skip this group — fix the prerequisite and continue.

LOG: "Starting Group I — Fix Manager"

--- I1: FIX API ROUTE ---
Create app/api/admin/fix/route.ts

The fix API:
- Accepts POST: { fix_id, operation_type, file_path, target_string,
    replacement_string, page_url, issue_type, issue_category }
- Validates: file_path must be in allowed paths list
  ALLOWED: app/**/*.tsx, components/**/*.tsx, public/*, app/sitemap.ts
  BLOCKED: next.config.mjs, middleware.ts, package.json, .env*
- Before any commit: fetch current file via GitHub API, store as rollback
- Applies change based on operation_type:
  OP-1 StringReplace: find target_string at specific context, replace once
  OP-2 MetadataUpdate: find metadata export, update specific field
  OP-3 FileCreate: create new file at path with content
- Runs post-fix validation (operation-specific rules)
- If validation fails: return { success: false, reason } — do not commit
- Commits via GitHub API PUT /repos/netyvee/vigil-cleaning/contents/{path}
  commit message: "fix({issue_category}): {issue_type} on {page_url}"
- Polls Vercel deployment API by commit SHA until state=READY (max 3 min)
- Runs targeted verification via health-check
- If verification fails: restore rollback content via GitHub API PUT
- Returns: { success, commit_sha, deployment_time, verified, rollback_triggered }

If GITHUB_TOKEN not in env:
  Log to MANUAL-TODO.md:
  [MANUAL ACTION — GITHUB TOKEN]
  Generate at: github.com/settings/tokens
  Type: Fine-grained personal access token
  Repository: netyvee/vigil-cleaning
  Permission: Contents — Read and Write
  Add to Vercel: GITHUB_TOKEN
  
  Build the fix API anyway — it will return { error: 'GITHUB_TOKEN not configured' }
  when called without the token. This allows the UI to be built and tested.

If VERCEL_TOKEN not in env:
  Log to MANUAL-TODO.md similarly.
  Build deployment polling to return { status: 'token_missing' } gracefully.

--- I2: VERIFICATION API ---
Create app/api/admin/verify-fix/route.ts
Accepts: { page_url, issue_type, check_value }
Fetches the page via health-check targeted check
Returns: { verified: boolean, current_value, expected_value }

--- I3: FIX MANAGER UI TAB ---
Add to app/admin/page.tsx — new tab "Fix Manager"

Tab shows:
  Section A — Issue queue from last audit
    Reads audit data from localStorage
    Groups issues by category
    Shows confidence score per fix (calculated from 7 factors)
    Color: green (AUTO 85%+), amber (QUEUE 60-84%), grey (SKIP <60%)

  Section B — Fix execution panel
    When a fix is selected:
      Shows dry run preview (file, line, before, after)
      Shows confidence score breakdown
      Shows blast radius
      Shows post-fix validation rules
    Execute button (only if GITHUB_TOKEN configured)
    If no token: shows "Configure GITHUB_TOKEN to enable fixes"

  Section C — Progress tracker
    Fix queue progress bar
    Each fix: status (pending/running/done/failed/skipped)
    Live log output during execution

  Section D — Before/after report
    Generated after all fixes complete
    Score before vs after
    Issues resolved vs remaining
    All commits made

CONFIDENCE SCORING (7 factors):
const calculateConfidence = (fix) => {
  const factors = {
    target_certainty: 0,    // weight: 25%
    reversibility: 0,       // weight: 20%
    blast_radius: 0,        // weight: 19%
    business_risk: 0,       // weight: 17%
    validation_certainty: 0,// weight: 10%
    precedent: 0,           // weight: 5%
    context_completeness: 0 // weight: 4%
  };
  // Score each 0-10 based on fix properties
  // Return weighted average
};

Build with 0 TypeScript errors.
git add .
git commit -m "feat: Fix Manager — fix API, verification, UI with confidence scoring"
git push origin main
LOG: "Group I complete"

================================================================================
GROUP J — CLIENT PORTAL
================================================================================
REPO: netyvee/app
VERIFY: cd C:\laragon\www\app && git remote -v | findstr "app"

LOG: "Starting Group J — Client portal"

Create client self-service portal at /client:

ROUTES (add to routes/web.php):
Route::prefix('client')->group(function() {
    Route::get('/login', [ClientPortalController::class, 'showLogin']);
    Route::post('/login', [ClientPortalController::class, 'sendMagicLink']);
    Route::get('/auth/{token}', [ClientPortalController::class, 'authenticate']);
    Route::middleware('client.auth')->group(function() {
        Route::get('/', [ClientPortalController::class, 'dashboard']);
        Route::get('/contracts', [ClientPortalController::class, 'contracts']);
        Route::get('/shifts', [ClientPortalController::class, 'shifts']);
        Route::post('/shifts/{id}/approve', [ClientPortalController::class, 'approveTimesheet']);
        Route::get('/invoices', [ClientPortalController::class, 'invoices']);
        Route::get('/invoices/{id}/download', [ClientPortalController::class, 'downloadInvoice']);
        Route::get('/messages', [ClientPortalController::class, 'messages']);
        Route::post('/messages', [ClientPortalController::class, 'sendMessage']);
        Route::post('/logout', [ClientPortalController::class, 'logout']);
    });
});

MIDDLEWARE: Create app/Http/Middleware/ClientAuth.php
  Checks for client_session cookie
  Redirects to /client/login if not authenticated

CONTROLLER: Create app/Http/Controllers/ClientPortalController.php
  showLogin() — simple email form
  sendMagicLink() — generate token, email magic link, expires 24hrs
  authenticate() — verify token, set cookie, redirect to dashboard
  dashboard() — upcoming shifts (7 days), outstanding invoices count,
                active contract summary, unread messages
  contracts() — list all agreements and generated documents
  shifts() — all shifts for this client, status, timesheet approval
  approveTimesheet() — mark timesheet approved, trigger invoice generation
  invoices() — list invoices, download PDF
  messages() — thread between client and coordinator

VIEWS (create resources/views/client/):
  login.blade.php — clean email form, Vigil branding
  dashboard.blade.php — summary cards layout
  contracts.blade.php — document list with download links
  shifts.blade.php — shift table with approve buttons
  invoices.blade.php — invoice list with download
  messages.blade.php — simple message thread

MAGIC LINK EMAIL:
  Subject: "Your Vigil client portal login link"
  Body: "Click here to access your portal — link expires in 24 hours"
  Button: teal, links to /client/auth/{token}

Run migrations if new columns needed:
php artisan migrate

Test:
php artisan tinker --execute="
  \$client = App\Models\Client::first();
  if (\$client) {
    echo 'Test client: ' . \$client->company_name . PHP_EOL;
    echo 'Portal URL: https://app.vigilservices.co.uk/client/login' . PHP_EOL;
  }
"

git add .
git commit -m "feat: client self-service portal — dashboard, shifts, invoices, messages, magic link"
git push origin master
LOG: "Group J complete"

================================================================================
GROUP K — CENTRALISED SEO DASHBOARD IN CRM
================================================================================
REPO: netyvee/app
VERIFY: git remote -v | findstr "app"

LOG: "Starting Group K — Centralised SEO dashboard"

--- K1: DATABASE MIGRATION ---
php artisan make:migration create_seo_audit_snapshots_table
Schema:
  id, site (string), score (integer), semrush_score (integer),
  grade (string), errors (integer), warnings (integer),
  notices (integer), pages_audited (integer),
  issues_json (longText), module_results_json (longText),
  crawled_at (timestamp), created_at, updated_at
php artisan migrate

--- K2: SEO DASHBOARD CONTROLLER ---
Create app/Http/Controllers/Admin/SeoController.php

index() method:
  Call each site health check in parallel:
    https://cleaning.vigilservices.co.uk/api/health-check
    https://security.vigilservices.co.uk/api/health-check
  Use Http::pool() for parallel requests
  Store results in seo_audit_snapshots table
  Pass to view

history() method:
  Return last 8 snapshots per site for trend chart

--- K3: SEO DASHBOARD VIEW ---
Route: GET /admin/seo
Create resources/views/admin/seo/index.blade.php

Layout:
  Header: "SEO Command Centre — All Sites"
  Last updated timestamp + Refresh button

  Section A — Site scorecards (side by side)
    For each site:
      Site name | Score | Grade | Errors | Warnings
      Score trend chart (last 8 weeks)
      "View full audit" button → opens site admin dashboard

  Section B — Cross-site issues
    Issues found on multiple sites grouped together
    "Affects: Cleaning + Security" label

  Section C — Score history chart
    Line chart: cleaning score vs security score over time
    Using Chart.js or inline SVG

--- K4: ALERT ENGINE ---
Create app/Console/Commands/SeoAuditAlert.php
Schedule in app/Console/Kernel.php:
  $schedule->command('seo:audit-alert')->weeklyOn(2, '09:00');
  (Tuesday 9am)

Command logic:
  Fetch health check from all live sites
  Store in seo_audit_snapshots
  Compare vs previous snapshot
  If score dropped >= 5: email coordinator immediately
    Subject: "⚠️ SEO alert — [site] score dropped [N] points"
  If new critical error: email immediately
  Else: queue for Sunday weekly digest

--- K5: ADD SIDEBAR LINK ---
In the admin sidebar add:
  "SEO Dashboard" link → /admin/seo
  Badge showing combined issue count across all sites

git add .
git commit -m "feat: centralised SEO dashboard in CRM — all sites, history, trend, alerts"
git push origin master
LOG: "Group K complete"

================================================================================
FINAL STEP — GENERATE AUTORUN REPORT
================================================================================

After all groups C through K are complete:

Read AUTORUN-LOG.md for all logged results.
Read MANUAL-TODO.md for all deferred manual actions.

Generate AUTORUN-REPORT.md:

---
# VIGIL AUTORUN REPORT — SESSION 2
Generated: [datetime]
Session: Groups C through K
Duration: [elapsed]

## SUMMARY TABLE
| Group | Name | Status | Key result |
|-------|------|--------|------------|
| A | Compliance + Webhook | ✅ DONE (Session 1) | 4 links fixed |
| B | Auth + CTAs | ✅ DONE (Session 1) | Both sites live |
| C | Client documents | [✅/❌/⚠️] | [result] |
| D | Onboarding trigger | [✅/❌/⚠️] | [result] |
| E | Staff portal | [✅/❌/⚠️] | [result] |
| F | Cleaning SEO fixes | [✅/❌/⚠️] | Score: [N] |
| G | Security V8 | [✅/❌/⚠️] | [result] |
| H | Google credentials | [✅/❌/⚠️] | [N] configured |
| I | Fix Manager | [✅/❌/⚠️] | [result] |
| J | Client portal | [✅/❌/⚠️] | [result] |
| K | SEO dashboard | [✅/❌/⚠️] | [result] |

## WHAT TO TEST (in priority order)

### 1. Client onboarding pathway (most critical)
- CRM: app.vigilservices.co.uk/admin/leads
  → Create a test lead
  → Convert to client
  → Verify onboarding email sent
  → Click signing link in email
  → Sign all documents
  → Verify client status = Active

### 2. Compliance chain (regulatory)
- CRM: Register test employee → compliance checklist auto-created?
- Upload a document → compliance record updates?
- Mark all critical items verified → status = cleared?
- Try to schedule uncompliant employee → blocked?

### 3. Booking CTAs (revenue)
- cleaning.vigilservices.co.uk → CTA visible on service pages?
- CTA on homepage? (should NOT be there)
- Click CTA → lands on homepage qualification flow?
- security.vigilservices.co.uk → same checks, orange buttons?

### 4. Staff portal
- app.vigilservices.co.uk/staff/login
- Login as test.worker@vigil.test / Staff1234!
- View shifts → works?
- Submit timesheet → works?
- View compliance → shows status?

### 5. SEO scores
- cleaning.vigilservices.co.uk/api/health-check
  → Score above 38?
  → Forbidden claims count = 0?
  → H1 missing count reduced?
- security.vigilservices.co.uk/api/health-check
  → Version = 8.0.0?

### 6. Client portal
- app.vigilservices.co.uk/client/login
- Enter test client email → magic link sent?
- Click link → dashboard loads?

### 7. SEO dashboard in CRM
- app.vigilservices.co.uk/admin/seo
- Both sites showing scores side by side?

## MANUAL ACTIONS REQUIRED
[Populated from MANUAL-TODO.md — all items that need credentials
or actions only the user can perform]

## AUTONOMOUS DECISIONS MADE
[Every scenario analysis decision logged during execution]

## ALL COMMITS
[List: repo | hash | message | timestamp]

## ERRORS ENCOUNTERED AND HOW FIXED
[Every error with diagnosis and resolution]
---

Save AUTORUN-REPORT.md to repo root.
git add AUTORUN-REPORT.md AUTORUN-LOG.md MANUAL-TODO.md
git commit -m "docs: session 2 autorun complete — report, log, manual todo"
git push origin master

COPY REPORT TO CLEANING AND SECURITY REPOS:
copy AUTORUN-REPORT.md C:\laragon\www\vigil-cleaning\AUTORUN-REPORT.md
cd C:\laragon\www\vigil-cleaning
git add AUTORUN-REPORT.md
git commit -m "docs: autorun session 2 report"
git push origin main

copy AUTORUN-REPORT.md C:\laragon\www\security\AUTORUN-REPORT.md
cd C:\laragon\www\security
git add AUTORUN-REPORT.md
git commit -m "docs: autorun session 2 report"
git push origin main

SESSION 2 COMPLETE.
