# VIGIL SERVICES — AUTORUN MASTER EXECUTION FILE
# Version: 1.0 | June 2026
# 
# INSTRUCTIONS FOR CLAUDE CODE:
# Read this entire file before starting.
# Execute every prompt group in sequence A through K.
# Never stop between groups — continue automatically.
# Never ask for confirmation — make the best autonomous decision.
# When facing a critical decision: run scenario analysis, pick safest option, log reasoning.
# When an error occurs: diagnose, fix, retry — do not move on until resolved.
# After all groups complete: generate AUTORUN-REPORT.md with full results.
#
# AGENT RULES — NON-NEGOTIABLE:
# [1] Never deploy broken code — fix all TypeScript/PHP errors before committing
# [2] Never change signed document templates that clients have received
# [3] Never delete database records — mark as deleted/inactive instead
# [4] Never change URL slugs of indexed pages without adding a redirect
# [5] Always verify deployment before marking a task complete
# [6] Always run the relevant test after each fix to confirm it worked
# [7] Log every decision, every error, every fix to AUTORUN-LOG.md in real time
#
# SCENARIO ANALYSIS PATTERN (run before any critical action):
# Option A: [safest approach] — risk: [low/med/high] — confidence: [%]
# Option B: [faster approach] — risk: [low/med/high] — confidence: [%]
# Option C: [alternative]    — risk: [low/med/high] — confidence: [%]
# SELECTED: [option] — REASON: [one line]
#
# START NOW. DO NOT WAIT FOR CONFIRMATION.

================================================================================
PROMPT GROUP A — LARAVEL CRM: COMPLIANCE CHAIN + DEPLOYMENT WEBHOOK
================================================================================
REPO: netyvee/app
VERIFY: cd C:\laragon\www\app && git remote -v | findstr "app"
STOP IF WRONG REPO.

LOG_ENTRY: "Starting Group A — Compliance chain + deployment webhook"

--- A1: FIX COMPLIANCE CHAIN ---

CONTEXT:
The compliance chain has 4 broken links carrying CQC/SIA regulatory risk.
canBeScheduled() method exists but is never called at scheduling.
ComplianceScoreService exists but is not triggered by document uploads.
Fix all 4 links. Do not move to A2 until all 4 are verified working.

FIX A1.1 — Registration auto-creates compliance checklist:
Read app/Http/Controllers/EmployeeController.php (or wherever /apply/{division} is handled).
Find the store() method that creates an employee record.
After employee creation, add:
  ComplianceService::createChecklistForEmployee($employee);
  OR call the existing method that creates division-specific compliance items.
Verify: create a test employee registration and confirm compliance checklist appears.
If no ComplianceService::createChecklist exists — create it.
Log: "A1.1 — [PASS/FAIL] — [what was found and done]"

FIX A1.2 — Document uploads propagate to compliance records:
Find the document upload handler (likely in EmployeeController or DocumentController).
After a document is stored, find the matching compliance item and update its status.
Pattern:
  $complianceItem = EmployeeComplianceRecord::where('employee_id', $employee->id)
    ->where('item_type', $documentType)
    ->first();
  if ($complianceItem) {
    $complianceItem->update([
      'status' => 'submitted',
      'document_path' => $path,
      'submitted_at' => now(),
    ]);
  }
Verify: upload a test document and confirm compliance record updates.
Log: "A1.2 — [PASS/FAIL] — [what was found and done]"

FIX A1.3 — Hard scheduling gate in JobManagementController:
Find where shifts/jobs are assigned to employees.
Before assignment is saved, call canBeScheduled():
  $check = ComplianceScoreService::canBeScheduled($employee);
  if (!$check['can_schedule']) {
    // Do not throw exception — log the block and choose next available cleared employee
    // OR assign with a warning flag on the job record
    // SCENARIO ANALYSIS:
    // Option A: Block assignment, log warning, skip to next employee — SAFE
    // Option B: Allow with warning flag — RISKY in regulatory context
    // SELECTED: Option A — regulatory safety takes priority
    Log::warning("Scheduling blocked: {$employee->name} — {$check['reason']}");
    // Add blocked_reason to job record if column exists
    // Continue execution — do not throw, do not stop
  }
Verify: attempt to schedule an uncompliant employee — confirm block is logged.
Log: "A1.3 — [PASS/FAIL] — [what was found and done]"

FIX A1.4 — Automated clearance status system:
Create or update a ClearanceService that:
  - Runs after every compliance record update
  - Checks if all critical items for the division are verified
  - Sets employee status to 'cleared' if all critical items pass
  - Sets employee status to 'compliance_hold' if any critical item fails/expires
  - Sends notification to coordinator when status changes
Critical items per division:
  Care: Enhanced DBS + Safeguarding Adults + Safeguarding Children + Medication
  Security: SIA Licence (valid) + SIA Licence Type Match
  Staffing: Enhanced DBS + Safeguarding Adults + Safeguarding Children
  Cleaning: Basic DBS + COSHH awareness
Verify: mark all critical items as verified for a test employee —
  confirm status changes to 'cleared' automatically.
Log: "A1.4 — [PASS/FAIL] — [what was found and done]"

FIX A1.5 — Compliance verification queue:
Add route: GET /admin/compliance/verify-queue
Controller method that shows all documents with status = 'submitted'
  grouped by employee, with verify/reject buttons.
Add sidebar link with badge showing count of pending verifications.
Verify: submit a test document — confirm it appears in verify queue.
Log: "A1.5 — [PASS/FAIL] — [what was found and done]"

COMMIT A1:
git add .
git commit -m "fix: compliance chain — all 4 broken links resolved, clearance automation, verify queue"
git push origin main
Wait for pipeline: check GitHub Actions status.
If pipeline fails: read error, fix it, push again. Do not proceed until GREEN.
Log: "A1 committed — pipeline [GREEN/RED] — [error if red]"

--- A2: FIX PRODUCTION DEPLOYMENT WEBHOOK ---

DIAGNOSIS FIRST:
! type .github/workflows/deploy.yml 2>nul || type .github/workflows/cd.yml 2>nul
! type public/deploy.php 2>nul
Check what the webhook step does and why it fails.

SCENARIO ANALYSIS based on findings:
Scenario A: deploy.php missing — create it
Scenario B: DEPLOY_TOKEN secret not set — document where to add it, use placeholder
Scenario C: cPanel URL wrong — fix the URL in deploy.yml
Scenario D: PHP not executing — check file permissions
Select best scenario, fix it, log reasoning.

If deploy.php missing — create it:
<?php
$token = $_SERVER['HTTP_X_DEPLOY_TOKEN'] ?? '';
if (!hash_equals(getenv('DEPLOY_TOKEN'), $token)) {
    http_response_code(403);
    die('Forbidden');
}
$output = shell_exec('cd /home/vigile2h/app.vigilservices.co.uk && git pull origin main 2>&1');
echo json_encode(['status' => 'ok', 'output' => $output]);

Fix deploy.yml webhook step to use correct URL and token header.
Test: curl -X POST https://app.vigilservices.co.uk/deploy.php
  -H "X-Deploy-Token: test" — expect 403 (token mismatch = file is reachable)
Log: "A2 — [PASS/FAIL] — [what was found and fixed]"

COMMIT A2:
git add .
git commit -m "fix: production deployment webhook — auto-deploy restored"
git push origin main
Log: "Group A complete — [timestamp]"

================================================================================
PROMPT GROUP B — NEXT.JS SITES: AUTH + BOOKING CTAs
================================================================================
REPO: netyvee/vigil-cleaning THEN netyvee/security
VERIFY EACH BEFORE SWITCHING REPO.

LOG_ENTRY: "Starting Group B — Admin auth + booking CTAs"

--- B1: CLEANING SITE ADMIN LOGIN + AUTH ---

cd C:\laragon\www\vigil-cleaning && git remote -v
STOP IF WRONG REPO.

DIAGNOSIS:
! type middleware.ts
! type app\api\admin\auth\route.ts
Find why login is broken — read the auth logic carefully.

SCENARIO ANALYSIS:
Scenario A: ADMIN_PASSWORD env var not set in Vercel — fix reading logic
Scenario B: Cookie comparison failing — fix sameSite or secure settings
Scenario C: OTP disabled but login page still shows OTP step — fix login page
Scenario D: Middleware blocking all /admin routes — fix public paths list
Select scenario with highest confidence, fix it, log.

Fix auth so:
- Password login works with ADMIN_PASSWORD env var
- No OTP required (OTP remains disabled as set earlier)
- Session cookie: maxAge 7200, httpOnly, secure in production
- /admin routes protected
- /api/health-check and /api/admin/setup-check remain public

Test:
! curl -s -o /dev/null -w "%{http_code}" https://cleaning.vigilservices.co.uk/admin/login
Must return 200.
Attempt login in browser logic simulation.
Log: "B1 auth — [PASS/FAIL] — [root cause found]"

--- B2: CLEANING SITE BOOKING CTAs ---

Add booking CTAs throughout cleaning site (teal #4ecdc4):

COMPONENT 1 — Sticky header CTA:
In the site header component, add a button:
"Get a free quote" → links to NEXT_PUBLIC_BOOKING_URL env var
Style: teal background, navy text, rounded, visible on all screen sizes

COMPONENT 2 — Homepage hero CTA:
Below or alongside the qualification flow headline:
Primary button: "Book a discovery call"
Secondary button: "View our services"
Both above the fold.

COMPONENT 3 — Service page inline CTA:
After the first content section on every service page:
A highlighted box: "Ready to get started? Book a free discovery call."
Button: teal, links to booking URL

COMPONENT 4 — Footer CTA:
Above the footer links:
"Start your cleaning contract today"
Button: "Book a call" — teal

COMPONENT 5 — Mobile floating button:
On mobile only: fixed bottom button "Book a call"
Disappears when scrolled to footer.

env var: NEXT_PUBLIC_BOOKING_URL must exist in Vercel.
If not set: use /cleaning-company-contact-details as fallback.

Build, verify 0 TypeScript errors.
git add . && git commit -m "feat: booking CTAs throughout cleaning site"
git push origin main
Wait for Vercel deployment.
! curl -s -o /dev/null -w "%{http_code}" https://cleaning.vigilservices.co.uk
Must return 200.
Log: "B2 CTAs — [PASS/FAIL]"

--- B3: SECURITY SITE AUTH + CTAs ---

cd C:\laragon\www\security && git remote -v
STOP IF WRONG REPO.

Re-enable auth with password only (OTP was disabled):
Same pattern as B1.
Update ADMIN_PASSWORD to match what is in Vercel.
Session: 2 hours, no OTP.

Add booking CTAs (orange #EA580C):
Same 5 components as B2.
Replace teal with orange #EA580C throughout.
NEXT_PUBLIC_BOOKING_URL or fallback to contact page.

Build, verify 0 TypeScript errors.
git add . && git commit -m "feat: auth restored + booking CTAs throughout security site"
git push origin main
! curl -s -o /dev/null -w "%{http_code}" https://security.vigilservices.co.uk
Must return 200.
Log: "B3 — [PASS/FAIL]"
Log: "Group B complete — [timestamp]"

================================================================================
PROMPT GROUP C — CLIENT DOCUMENT TEMPLATES
================================================================================
REPO: netyvee/app
VERIFY: git remote -v | findstr "app"

LOG_ENTRY: "Starting Group C — Client document templates"

Add 5 client document templates to DocumentTemplateSeeder.
Use the existing DocumentGenerationService placeholder system.
Do not modify existing worker templates.

TEMPLATE C1 — Terms of Business (Cleaning):
Placeholders: {{CLIENT_COMPANY}}, {{CLIENT_ADDRESS}}, {{START_DATE}},
{{PAYMENT_TERMS}}, {{CONTRACT_LENGTH}}, {{NOTICE_PERIOD}},
{{SERVICE_FREQUENCY}}, {{LIABILITY_CAP}}, {{AUTHORISED_SIGNATORY}}
Content sections:
- Parties (Vigil Services Ltd + client company)
- Services to be provided
- Service standards and quality requirements
- Payment terms (14 days net from invoice date)
- Liability (£10M public liability insurance)
- COSHH compliance (Vigil responsibility)
- Termination (30 days written notice after initial term)
- TUPE obligations if applicable
- Governing law: England and Wales
- Dispute resolution

TEMPLATE C2 — Terms of Business (Security):
Same structure as C1 plus:
- SIA licence requirements (Vigil responsibility to maintain)
- SIA Act 2001 compliance statement
- Use of force policy reference
- Incident reporting obligations
- CCTV and data protection provisions

TEMPLATE C3 — Scope of Works:
Placeholders: {{CLIENT_COMPANY}}, {{SITE_ADDRESS}}, {{SITE_NAME}},
{{SERVICE_DIVISION}}, {{SERVICE_DESCRIPTION}}, {{SERVICE_FREQUENCY}},
{{SERVICE_HOURS}}, {{AREAS_COVERED}}, {{EXCLUDED_AREAS}},
{{QUALITY_STANDARDS}}, {{KPIs}}, {{REVIEW_FREQUENCY}}, {{START_DATE}}
Content: specific services, locations, frequencies, standards, KPIs.
Division-specific appendix using {{SERVICE_DIVISION}} conditional.

TEMPLATE C4 — Rate Card:
Placeholders: {{CLIENT_COMPANY}}, {{EFFECTIVE_DATE}},
{{RATE_TABLE}} (JSON array of shift_type, hourly_rate, flat_rate),
{{OVERTIME_MULTIPLIER}}, {{BANK_HOLIDAY_MULTIPLIER}},
{{INVOICE_FREQUENCY}}, {{PAYMENT_TERMS}}
Renders as a clean table of all agreed rates.
Statement: rates confirmed and agreed by client signature.

TEMPLATE C5 — Client Privacy Notice (GDPR Article 13):
Placeholders: {{CLIENT_COMPANY}}, {{DATE}}
Content:
- Data controller: Vigil Services Ltd
- What data we collect (company name, contacts, billing, site access)
- Legal basis (contract performance, legitimate interests)
- Retention periods (7 years post-contract for financial records)
- Third parties (payroll provider, accountants, HMRC)
- Data subject rights (access, rectification, erasure, portability)
- Right to complain to ICO (ico.org.uk, 0303 123 1113)
- No automated decision-making
- No third country transfers

TEMPLATE C6 — Terms for Supply of Temporary Workers (Staffing + Care):
Placeholders: {{CLIENT_COMPANY}}, {{HIRER_TYPE}},
{{CONDUCT_REGULATIONS_CONSENT}}, {{AWR_WEEK_12_DATE}}
Content:
- AWR 2010 compliance obligations on the hirer
- Equal treatment after 12 weeks (Regulation 5)
- Information provision obligations (Regulation 13)
- Pay between assignments if applicable
- Conduct Regulations 2003 — hirer acknowledgement
- Right to terminate individual worker assignments
- Vigil obligations as the employment business

Load all templates via seeder:
php artisan db:seed --class=ClientDocumentTemplateSeeder

Verify: visit /admin/documents/templates — all 6 client templates visible.
Test generation: generate Terms of Business for a test client.
Confirm PDF renders without errors.
Log: "Group C — [PASS/FAIL] — [N] templates created"
git add . && git commit -m "feat: client document templates — ToB, Scope, Rate Card, Privacy, AWR terms"
git push origin main

================================================================================
PROMPT GROUP D — CLIENT ONBOARDING TRIGGER + SIGNING PORTAL
================================================================================
REPO: netyvee/app
VERIFY: git remote -v | findstr "app"

LOG_ENTRY: "Starting Group D — Client onboarding trigger + signing portal"

--- D1: LEAD TO CLIENT ONBOARDING TRIGGER ---

When a lead is converted to a client, automatically:
1. Detect division from lead record
2. Generate correct document bundle:
   Cleaning/Security: C1 (ToB) + C3 (Scope) + C4 (Rate Card) + C5 (Privacy)
   Staffing/Care: C1 + C3 + C4 + C5 + C6 (AWR Terms)
3. Create generated_document records for each
4. Send tokenised email to client billing contact:
   Subject: "Welcome to Vigil Services — please review and sign your documents"
   Body: professional email with link to signing portal
5. Update client status: 'awaiting_documents'
6. Log event to client History tab

Find LeadController@convert or ClientController@store.
Add the trigger after client record is created.
If no billing contact email on client — use lead email.

Test: convert a test lead → confirm emails sent, documents generated,
      client status updated.
Log: "D1 — [PASS/FAIL]"

--- D2: CLIENT SIGNING PORTAL ---

Route: GET /client/sign/{token}
Adapt the existing worker signing portal (/sign/{token}).
Key differences from worker portal:
- Client-branded header (no staff-specific language)
- Sequential document display (each must be opened before next appears)
- Per-document: opened_at timestamp + acknowledgement checkbox
- Final document: digital signature field required
- On completion:
  - All documents marked signed with IP + timestamp
  - Signed PDFs emailed to client billing address
  - Client status updated: 'active'
  - Coordinator notified: "[Client] has signed all documents"

Status flow visible on client list:
Awaiting Documents → Documents Sent → Documents Signed → Active

Test:
Generate a signing token for test client.
Visit /client/sign/{token}.
Complete all document steps.
Verify client status = 'active'.
Verify signed copies emailed.
Log: "D2 — [PASS/FAIL]"

COMMIT D:
git add .
git commit -m "feat: client onboarding — lead trigger, document bundle, signing portal, status flow"
git push origin main
Wait for pipeline GREEN.
Log: "Group D complete — [timestamp]"

================================================================================
PROMPT GROUP E — STAFF PORTAL END-TO-END + EMPLOYEE HANDBOOK
================================================================================
REPO: netyvee/app

LOG_ENTRY: "Starting Group E — Staff portal verification + handbook"

--- E1: STAFF PORTAL BROWSER TEST ---

Create a test employee if one does not exist:
php artisan tinker --execute="
\$emp = App\Models\Employee::firstOrCreate(
  ['email' => 'test.worker@vigil.test'],
  ['first_name' => 'Test', 'last_name' => 'Worker',
   'division' => 'cleaning', 'status' => 'active']
);
\$emp->update(['portal_password' => bcrypt('Staff1234!')]);
echo 'Test worker: ' . \$emp->email . PHP_EOL;
"

Test every staff portal route via HTTP:
Routes to test: /staff/login, /staff, /staff/shifts, /staff/timesheets,
                /staff/payslips, /staff/compliance, /staff/profile
Expected: 200 or 302 (redirect to login for protected routes)
php artisan tinker --execute="
\$routes = ['/staff/login', '/staff', '/staff/shifts',
           '/staff/timesheets', '/staff/payslips',
           '/staff/compliance', '/staff/profile'];
foreach (\$routes as \$route) {
  \$req = Illuminate\Http\Request::create(\$route, 'GET');
  \$res = app()->handle(\$req);
  \$s = \$res->getStatusCode();
  echo str_pad(\$route, 30) . \$s . (\$s >= 200 && \$s < 400 ? ' ✓' : ' ✗') . PHP_EOL;
}
"

Fix any route that returns 500 or 404.
Log each route result.

--- E2: EMPLOYEE HANDBOOK ---

Check if employee handbook template exists:
php artisan tinker --execute="
\$t = App\Models\DocumentTemplate::where('name', 'like', '%handbook%')->first();
echo \$t ? 'EXISTS: ' . \$t->name : 'MISSING';
"

If missing — create full UK-compliant Employee Handbook template covering:
Equal opportunities, disciplinary procedure, grievance procedure,
health and safety at work, data protection (UK GDPR),
social media policy, confidentiality, TUPE rights,
working time regulations, whistleblowing policy,
anti-bribery policy, modern slavery statement reference.

If exists — verify it has real content (not placeholder text).
If placeholder — replace with real content.

Log: "E2 — handbook [EXISTS/CREATED/UPDATED]"

COMMIT E:
git add .
git commit -m "fix: staff portal verified, employee handbook complete"
git push origin main
Log: "Group E complete — [timestamp]"

================================================================================
PROMPT GROUP F — CLEANING SITE CRITICAL SEO FIXES
================================================================================
REPO: netyvee/vigil-cleaning
VERIFY: git remote -v | findstr "vigil-cleaning"

LOG_ENTRY: "Starting Group F — Cleaning site critical SEO fixes"

STEP 1 — CODEBASE GREP (discovery before any changes):
! findstr /r /s /i "98%%\|97%%\|500+\|NHS-approved\|guaranteed\|your home\|residential" app\ components\ 2>nul
! findstr /r /s /i "0203973\|0203 973" app\ components\ 2>nul
! findstr /r /s /i "\[your " app\ components\ 2>nul
Log all findings before touching any file.

FIX F1 — Remove forbidden claims:
For each file containing forbidden terms:
  Read the file
  Scenario analysis: which replacement is most appropriate in context
  "98%" → "consistently high client satisfaction"
  "97%" → "strong retention across our client portfolio"
  "500+" → "serving businesses across 32 London boroughs"
  "NHS-approved" → "COSHH-compliant, commercially approved"
  "guaranteed" → "committed to"
  Replace only the specific line — never global replace
  Verify the replacement reads naturally in context
Log: "F1 — [N] claims removed from [files]"

FIX F2 — Add H1 to pages missing it:
For each page file in app/ that lacks an h1 element:
  Read the file
  Find the return statement first JSX element
  Derive focus keyword from URL slug
  Add: <h1 className="sr-only">{focus_keyword}</h1> as first element
  Verify className="sr-only" exists in globals.css
  If not — add: .sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); }
Log: "F2 — H1 added to [N] pages"

FIX F3 — Fix wrong phone number:
Find all instances of "0203973 8887" or "020 3973 8887" or "0203 973"
Replace with "020 3098 6037"
Check: app/faq/page.tsx, components/ footer, contact page
Log: "F3 — phone fixed on [N] files"

FIX F4 — Fix placeholder text:
Find "[your service locations" and any other bracket placeholders
Replace FAQ placeholder with:
"London and all 32 surrounding boroughs including Westminster, Camden,
Islington, Hackney, Tower Hamlets, Southwark, Lambeth, Wandsworth,
Hammersmith, Kensington, and the City of London."
Log: "F4 — placeholders replaced in [N] files"

FIX F5 — Fix broken images:
For each img src that returns 404:
  Scenario A: Remove the img tag entirely — safest if no replacement available
  Scenario B: Replace with a Cloudinary placeholder image
  Scenario C: Replace with a relevant Next.js Image from public folder
  If Cloudinary images exist in codebase — use them
  If not — remove the broken img tags
Log: "F5 — [N] broken images fixed"

FIX F6 — Add homepage to sitemap:
Find app/sitemap.ts or similar
Add homepage entry:
  { url: 'https://cleaning.vigilservices.co.uk', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 }
Log: "F6 — homepage added to sitemap"

BUILD AND VERIFY:
! npm run build
Fix every TypeScript error before committing.
! git add .
! git commit -m "fix: SEO critical issues — forbidden claims, H1 tags, phone, placeholders, images, sitemap"
! git push origin main
! timeout /t 120 /nobreak
! curl -s -o /dev/null -w "%%{http_code}" https://cleaning.vigilservices.co.uk
Must return 200.

Run audit to verify improvement:
! curl -s "https://cleaning.vigilservices.co.uk/api/health-check" | findstr "score\|errors\|warnings"
Log: "Group F complete — score before: 38, score after: [N]"

================================================================================
PROMPT GROUP G — SECURITY SITE V8 UPGRADE + FIXES
================================================================================
REPO: netyvee/security
VERIFY: git remote -v | findstr "security"

LOG_ENTRY: "Starting Group G — Security site V8 upgrade + fixes"

STEP 1 — Read current health check version:
! type app\api\health-check\route.ts | findstr "version\|tool\|BASE_URL"

STEP 2 — Copy V8 auditor from cleaning:
Read the full V8 health-check from C:\laragon\www\vigil-cleaning\app\api\health-check\route.ts
Adapt for security:
  BASE_URL = 'https://security.vigilservices.co.uk'
  tool name = 'Vigil Advanced SEO Auditor v8.0'
  Priority pages = security site URLs
  Brand colour references = orange #EA580C
  Schema type = SecurityService not CleaningService

STEP 3 — Fix critical security site issues:
Same pattern as Group F.
Grep first, then fix:
- Add H1 to all service pages
- Fix broken images
- Fix HTML entities (&amp; → &)
- Add serviceType to JSON-LD structured data
  "serviceType": "Security Services"
- Trim meta descriptions to 155 chars

BUILD AND VERIFY:
! npm run build
Fix all errors.
! git add .
! git commit -m "feat: V8 auditor + critical SEO fixes on security site"
! git push origin main
! curl -s -o /dev/null -w "%%{http_code}" https://security.vigilservices.co.uk
Must return 200.
Log: "Group G complete — [timestamp]"

================================================================================
PROMPT GROUP H — GOOGLE CREDENTIALS (BOTH SITES)
================================================================================
REPOS: netyvee/vigil-cleaning + netyvee/security
NOTE: This group configures env vars — no code changes needed.

LOG_ENTRY: "Starting Group H — Google credentials"

STEP 1 — Verify what is already set:
Check Vercel env vars for both projects via setup-check endpoint:
! curl -s "https://cleaning.vigilservices.co.uk/api/admin/setup-check"
! curl -s "https://security.vigilservices.co.uk/api/admin/setup-check"
Log which credentials are missing vs configured.

STEP 2 — For each missing credential:
Log exactly what needs to be added and where.
Format: "ACTION REQUIRED: Add [VAR_NAME] to Vercel project [project-name]"
  PAGESPEED_API_KEY — same value for both sites
    Get from: console.cloud.google.com/apis/credentials?project=elegant-hope-453720-r1
  GOOGLE_SERVICE_ACCOUNT_JSON — same JSON for both sites
    Get from: same Google Cloud project, service account vigil-seo-auditor@...
  GSC_CLIENT_ID, GSC_CLIENT_SECRET — same for both sites
    Get from: OAuth client "Vigil GSC Access" in elegant-hope project
  GSC_SITE_URL — different per site
    Cleaning: https://cleaning.vigilservices.co.uk
    Security: https://security.vigilservices.co.uk
  GSC_REDIRECT_URI — different per site
    Cleaning: https://cleaning.vigilservices.co.uk/api/admin/gsc-callback
    Security: https://security.vigilservices.co.uk/api/admin/gsc-callback
  GSC_REFRESH_TOKEN — unique per site
    Obtain by visiting /api/admin/gsc-auth on each site after other vars are set

STEP 3 — Add redirect URI to Google OAuth client:
Log: "ACTION REQUIRED: Add to Google Cloud OAuth client 'Vigil GSC Access':
  https://cleaning.vigilservices.co.uk/api/admin/gsc-callback"

STEP 4 — If PAGESPEED_API_KEY is available in any existing env var:
Copy it to the setup-check verification.
Do not hardcode API keys in source code.

Log: "Group H complete — [N] credentials configured, [N] require manual action"

================================================================================
PROMPT GROUP I — FIX MANAGER BUILD
================================================================================
REPO: netyvee/vigil-cleaning
PREREQUISITE CHECK: Admin auth must be working.
  ! curl -s -o /dev/null -w "%%{http_code}" https://cleaning.vigilservices.co.uk/admin/login
  If not 200 — Fix auth first (Group B must be complete). Log and skip this group.

LOG_ENTRY: "Starting Group I — Fix Manager"

BUILD THE AUTONOMOUS FIX MANAGER:

I1 — Fix API route: app/api/admin/fix/route.ts
Accepts: { fix_id, operation_type, file_path, old_content, new_content, page_url, issue_type }
Operations: OP-1 StringReplace, OP-2 MetadataUpdate, OP-3 FileCreate
Before any commit:
  - Fetch current file content from GitHub API (store as rollback_content)
  - Apply the change in memory
  - Run post-fix validation (operation-specific rules)
  - If validation fails: do not commit, return { success: false, reason }
  - If validation passes: commit via GitHub API PUT
  - Poll Vercel deployment by commit SHA until state=READY
  - Run verification via /api/health-check targeted check
  - If verification fails: restore rollback_content via GitHub API PUT
  - Return full result log

I2 — Verification API: app/api/admin/verify-fix/route.ts
Accepts: { page_url, issue_type, expected_value }
Fetches the specific page
Checks for the specific issue type
Returns: { verified: true/false, current_value, expected_value }

I3 — Fix Manager UI: add tab to app/admin/page.tsx
Shows: issue queue from last audit, confidence scores per fix,
  dry run preview, progress tracker, before/after report
Reads: audit data from localStorage
Writes: fix results to fixHistory[] in state

CONFIDENCE SCORING (7 factors, weighted):
target_certainty: 25%  — how certain we are which file/line to change
reversibility: 20%     — can it be rolled back cleanly
blast_radius: 19%      — how many pages/files affected
business_risk: 17%     — does it affect leads/bookings/legal
validation_certainty: 10% — can we verify it worked
precedent: 5%          — has this fix type worked before
context_completeness: 4%  — do we have full information

AUTO if confidence >= 85%
QUEUE if confidence 60-84% (agent self-selects best scenario)
SKIP if confidence < 60% (log as requires_review, continue to next)
Never stop — never wait for human.

Build with 0 TypeScript errors.
git add . && git commit -m "feat: Fix Manager — autonomous fix API, verification, UI, confidence scoring"
git push origin main
Log: "Group I complete — [timestamp]"

================================================================================
PROMPT GROUP J — CLIENT PORTAL
================================================================================
REPO: netyvee/app

LOG_ENTRY: "Starting Group J — Client portal"

Build client self-service portal at /client:

Routes:
GET  /client/login          — email magic link login
GET  /client               — dashboard
GET  /client/contracts     — active agreements and documents
GET  /client/shifts        — upcoming and past shifts
POST /client/shifts/approve — approve timesheet
GET  /client/invoices      — invoice list and download
POST /client/shifts/request — new shift request
GET  /client/messages      — messages to coordinator

Authentication:
Magic link only — no password
Token expires 24 hours
Client identified by billing_email on client record

Dashboard shows:
- Active contract summary
- Upcoming shifts (next 7 days)
- Outstanding invoices count
- Unread messages count
- Quick action: "Request a shift" button

Shifts view:
List of all shifts for this client
Status: Confirmed / Completed / Awaiting Timesheet Approval
Timesheet approval: shows hours worked, approve or query button

Invoices:
List by month, download as PDF
Outstanding amount highlighted

Test with a test client record.
git add . && git commit -m "feat: client self-service portal — dashboard, shifts, invoices, messages"
git push origin main
Log: "Group J complete — [timestamp]"

================================================================================
PROMPT GROUP K — CENTRALISED SEO DASHBOARD IN CRM
================================================================================
REPO: netyvee/app

LOG_ENTRY: "Starting Group K — Centralised SEO dashboard"

Build central SEO dashboard at /admin/seo:

K1 — Dashboard view:
Calls /api/health-check on each live site simultaneously:
  https://cleaning.vigilservices.co.uk/api/health-check
  https://security.vigilservices.co.uk/api/health-check
Displays side-by-side:
  Site name | Score | Grade | Errors | Warnings | Last run
Clicking a site opens the full audit detail

K2 — Audit history storage:
Table: seo_audit_snapshots (site, score, errors, warnings, issues_json, crawled_at)
Store every audit result
Show score trend chart (last 8 weeks)

K3 — Alert engine:
Schedule: every Tuesday 09:00 (via Laravel scheduler)
Compare latest vs previous audit
If score dropped >= 5 points: email coordinator immediately
If new critical error appeared: email immediately
Otherwise: weekly digest email Sunday evening

K4 — Cross-site issue view:
Issues appearing on multiple sites listed once
"Affects: Cleaning + Security"

php artisan make:migration create_seo_audit_snapshots_table
php artisan migrate
git add . && git commit -m "feat: centralised SEO dashboard in CRM — all sites, history, alerts"
git push origin main
Log: "Group K complete — [timestamp]"

================================================================================
FINAL STEP — GENERATE AUTORUN REPORT
================================================================================

After all groups A through K are complete (or attempted):

Generate AUTORUN-REPORT.md with this exact structure:

---
# VIGIL AUTORUN REPORT
Generated: [datetime]
Total duration: [elapsed time]
Groups completed: [N] of 11

## SUMMARY TABLE
| Group | Name | Status | Duration | Key result |
|-------|------|--------|----------|------------|
| A | Compliance + Webhook | [✅/❌/⚠️] | [time] | [one line] |
| B | Auth + CTAs | [✅/❌/⚠️] | [time] | [one line] |
| C | Client documents | [✅/❌/⚠️] | [time] | [one line] |
| D | Onboarding trigger | [✅/❌/⚠️] | [time] | [one line] |
| E | Staff portal | [✅/❌/⚠️] | [time] | [one line] |
| F | Cleaning SEO fixes | [✅/❌/⚠️] | [time] | [one line] |
| G | Security V8 | [✅/❌/⚠️] | [time] | [one line] |
| H | Google credentials | [✅/❌/⚠️] | [time] | [one line] |
| I | Fix Manager | [✅/❌/⚠️] | [time] | [one line] |
| J | Client portal | [✅/❌/⚠️] | [time] | [one line] |
| K | Centralised dashboard | [✅/❌/⚠️] | [time] | [one line] |

## WHAT TO TEST (in this order)
1. CRM compliance chain
   URL: https://app.vigilservices.co.uk/admin/compliance/verify-queue
   Test: Register a test employee → verify checklist auto-created
   Test: Upload a document → verify compliance record updates
   Test: Mark all critical items verified → verify status becomes 'cleared'
   Test: Try to schedule an uncompliant employee → verify it is blocked

2. Client onboarding pathway
   URL: https://app.vigilservices.co.uk/admin/leads
   Test: Create a lead → convert to client → verify document bundle sent
   Test: Visit signing link → complete all documents → verify client = Active
   Test: Check coordinator notification received

3. Booking CTAs
   URL: https://cleaning.vigilservices.co.uk
   Test: CTA visible in header on desktop
   Test: CTA visible in homepage hero
   Test: CTA visible on service pages
   URL: https://security.vigilservices.co.uk
   Test: Same checks

4. Staff portal
   URL: https://app.vigilservices.co.uk/staff/login
   Test: Magic link login works
   Test: Shifts visible
   Test: Timesheet submission works

5. SEO scores
   URL: https://cleaning.vigilservices.co.uk/api/health-check
   Test: Score improved from 38
   Test: Forbidden claims count = 0
   Test: H1 missing count reduced
   URL: https://security.vigilservices.co.uk/api/health-check
   Test: Version shows v8.0.0

6. Admin dashboards
   URL: https://cleaning.vigilservices.co.uk/admin
   Test: Login works
   Test: Run audit → results display
   URL: https://app.vigilservices.co.uk/admin/seo
   Test: Both site scores visible

## DECISIONS MADE (autonomous)
[List every scenario analysis decision with reasoning]

## ERRORS ENCOUNTERED AND FIXED
[List every error with: what it was, what caused it, how it was fixed]

## ACTIONS REQUIRING MANUAL FOLLOW-UP
[List only items that genuinely could not be automated:
 e.g. Vercel env vars that need credentials only you have,
 GSC OAuth that needs browser login]

## COMMITS MADE
[List all git commits with hash, message, repo, timestamp]
---

Save AUTORUN-REPORT.md to repo root.
git add AUTORUN-REPORT.md AUTORUN-LOG.md
git commit -m "docs: autorun complete — report and log"
git push origin main (to app repo)

AUTORUN COMPLETE.
