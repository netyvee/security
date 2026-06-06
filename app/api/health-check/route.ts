import { NextResponse } from 'next/server';

const BASE_URL = 'https://security.vigilservices.co.uk';

interface AuditIssue {
  type: string;
  category: string;
  message: string;
  impact: number;
  url?: string;
}

// SECURITY MEASURES
const ALLOWED_DOMAINS = [
  'security.vigilservices.co.uk',
];

const ALLOWED_WRITE_URLS =
  (process.env.INDEXABILITY_MUST_INDEX || '')
  .split(',')
  .filter(Boolean);

function assertUrlSafe(url: string): void {
  const allowed = ALLOWED_DOMAINS.some(d => url.includes(d));
  if (!allowed) {
    throw new Error(`SECURITY: URL not in allowed domains: ${url}`);
  }
}

function assertNotRemoval(operation: string): void {
  if (operation.toLowerCase().includes('remov') ||
      operation.toLowerCase().includes('delet') ||
      operation.toLowerCase().includes('drop')) {
    throw new Error(`SECURITY: Removal operations are permanently disabled`);
  }
}

const MAX_INDEXING_REQUESTS_PER_RUN = 10;
let indexingRequestsThisRun = 0;

function assertIndexingQuota(): void {
  if (indexingRequestsThisRun >= MAX_INDEXING_REQUESTS_PER_RUN) {
    throw new Error(`SECURITY: Indexing quota exceeded (max ${MAX_INDEXING_REQUESTS_PER_RUN} per run)`);
  }
  indexingRequestsThisRun++;
}

const writeOperationLog: Array<{
  timestamp: string;
  operation: string;
  url: string;
  result: string;
  dryRun: boolean;
}> = [];

function logWriteOperation(
  operation: string,
  url: string,
  result: string,
  dryRun: boolean
): void {
  writeOperationLog.push({
    timestamp: new Date().toISOString(),
    operation,
    url,
    result,
    dryRun,
  });
  console.log(`[WRITE LOG] ${dryRun ? 'DRY RUN' : 'LIVE'} | ${operation} | ${url} | ${result}`);
}

// MODULE 15 — GOOGLE SERVICE ACCOUNT AUTH HELPER
async function getServiceAccountToken(
  scopes: string[]
): Promise<string | null> {
  try {
    const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!saJson) return null;

    const sa = JSON.parse(saJson);
    const now = Math.floor(Date.now() / 1000);

    const header = Buffer.from(JSON.stringify({
      alg: 'RS256',
      typ: 'JWT',
    })).toString('base64url');

    const payload = Buffer.from(JSON.stringify({
      iss: sa.client_email,
      scope: scopes.join(' '),
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    })).toString('base64url');

    const unsignedToken = `${header}.${payload}`;

    const privateKey = sa.private_key
      .replace(/\\n/g, '\n');

    const keyData = privateKey
      .replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '')
      .replace(/\s/g, '');

    const binaryKey = Uint8Array.from(
      Buffer.from(keyData, 'base64')
    );

    const cryptoKey = await crypto.subtle.importKey(
      'pkcs8',
      binaryKey,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const encoder = new TextEncoder();
    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      encoder.encode(unsignedToken)
    );

    const signatureB64 = Buffer.from(signature).toString('base64url');
    const jwt = `${unsignedToken}.${signatureB64}`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    const tokenData = await tokenRes.json();
    return tokenData.access_token || null;
  } catch (e) {
    console.error('Service account auth failed:', e);
    return null;
  }
}

// MODULE 12: Historical change tracking storage
const auditHistory = new Map<string, {
  title: string | null;
  h1: string | null;
  wordCount: number;
  canonical: string | null;
  checkedAt: string;
}>();

// MODULE 16 — EXTRACT INTERNAL LINKS HELPER
function extractInternalLinks(html: string, base: string): string[] {
  const matches = html.match(/href=["']([^"'#?]+)["']/g) || [];
  return matches
    .map(m => m.replace(/href=["']|["']/g, ''))
    .filter(l => l.startsWith('/') || l.startsWith(base))
    .map(l => l.startsWith('/') ? `${base}${l}` : l)
    .map(l => l.replace(/\/$/, ''))
    .filter(l =>
      l.startsWith(base) &&
      !l.includes('/_next/') &&
      !l.includes('/static/') &&
      !l.includes('/api/') &&
      !l.includes('/admin') &&
      !l.endsWith('.css') &&
      !l.endsWith('.js') &&
      !l.endsWith('.jpg') &&
      !l.endsWith('.jpeg') &&
      !l.endsWith('.png') &&
      !l.endsWith('.svg') &&
      !l.endsWith('.ico') &&
      !l.endsWith('.woff') &&
      !l.endsWith('.ttf') &&
      !l.endsWith('.xml') &&
      !l.endsWith('.txt')
    );
}

// MODULE 16 — FULL RECURSIVE SITE CRAWLER
async function recursiveCrawl(
  startUrl: string,
  maxPages: number = 60
): Promise<{ pages: string[]; linkGraph: Map<string, string[]> }> {
  const visited = new Set<string>();
  const queue: string[] = [startUrl];
  const discovered: string[] = [];
  const linkGraph = new Map<string, string[]>();

  while (queue.length > 0 && discovered.length < maxPages) {
    const batch = queue.splice(0, 5);

    const results = await Promise.allSettled(
      batch.map(async url => {
        if (visited.has(url)) return [];
        visited.add(url);

        try {
          const result = await Promise.race([
            fetchPage(url),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('timeout')), 4000)
            )
          ]);

          const { html } = result as any;
          if (!html) return [];

          discovered.push(url);
          console.log(`[CRAWLER] Found page ${discovered.length}/${maxPages}: ${url.replace(BASE_URL, '')}`);

          const links = extractInternalLinks(html, BASE_URL);
          linkGraph.set(url, links);

          return links.filter(l => !visited.has(l));
        } catch {
          return [];
        }
      })
    );

    results.forEach(r => {
      if (r.status === 'fulfilled') {
        queue.push(...r.value);
      }
    });
  }

  return { pages: discovered, linkGraph };
}

// MODULE 17 — INTERNAL PAGERANK ESTIMATOR
function estimatePageRank(
  pages: string[],
  linkGraph: Map<string, string[]>
): Map<string, number> {
  const DAMPING = 0.85;
  const ITERATIONS = 20;
  const N = pages.length;

  if (N === 0) return new Map();

  const ranks = new Map<string, number>();
  pages.forEach(p => ranks.set(p, 1 / N));

  const inlinks = new Map<string, string[]>();
  pages.forEach(p => inlinks.set(p, []));
  linkGraph.forEach((outlinks, page) => {
    outlinks.forEach(target => {
      if (inlinks.has(target)) {
        inlinks.get(target)!.push(page);
      }
    });
  });

  for (let i = 0; i < ITERATIONS; i++) {
    const newRanks = new Map<string, number>();
    pages.forEach(page => {
      const inlinkPages = inlinks.get(page) || [];
      let rank = (1 - DAMPING) / N;
      inlinkPages.forEach(inlinker => {
        const outCount = (linkGraph.get(inlinker) || []).length;
        if (outCount > 0) {
          rank += DAMPING * (ranks.get(inlinker) || 0) / outCount;
        }
      });
      newRanks.set(page, rank);
    });
    newRanks.forEach((v, k) => ranks.set(k, v));
  }

  const maxRank = Math.max(...ranks.values());
  if (maxRank > 0) {
    ranks.forEach((v, k) => {
      ranks.set(k, Math.round((v / maxRank) * 100));
    });
  }

  return ranks;
}

// MODULE 18 — CORE WEB VITALS VIA PAGESPEED API
async function getPageSpeedData(
  url: string,
  apiKey: string
): Promise<any> {
  try {
    const fields = 'lighthouseResult.categories,lighthouseResult.audits.largest-contentful-paint,lighthouseResult.audits.cumulative-layout-shift,lighthouseResult.audits.total-blocking-time,lighthouseResult.audits.interactive,lighthouseResult.audits.first-contentful-paint';

    const [mobileRes, desktopRes] = await Promise.allSettled([
      Promise.race([
        fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile&fields=${fields}`),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000))
      ]),
      Promise.race([
        fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=desktop&fields=${fields}`),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000))
      ])
    ]);

    const mobile = mobileRes.status === 'fulfilled' ? await (mobileRes.value as Response).json() : null;
    const desktop = desktopRes.status === 'fulfilled' ? await (desktopRes.value as Response).json() : null;

    const result: any = { url };

    if (mobile?.lighthouseResult) {
      const lr = mobile.lighthouseResult;
      result.mobile = {
        performance_score: Math.round((lr.categories?.performance?.score || 0) * 100),
        lcp: lr.audits['largest-contentful-paint']?.numericValue ? (lr.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2) : null,
        cls: lr.audits['cumulative-layout-shift']?.numericValue?.toFixed(3) || null,
        tbt: lr.audits['total-blocking-time']?.numericValue || null,
        fcp: lr.audits['first-contentful-paint']?.numericValue ? (lr.audits['first-contentful-paint'].numericValue / 1000).toFixed(2) : null,
        tti: lr.audits['interactive']?.numericValue ? (lr.audits['interactive'].numericValue / 1000).toFixed(2) : null,
      };
    }

    if (desktop?.lighthouseResult) {
      const lr = desktop.lighthouseResult;
      result.desktop = {
        performance_score: Math.round((lr.categories?.performance?.score || 0) * 100),
        lcp: lr.audits['largest-contentful-paint']?.numericValue ? (lr.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2) : null,
        cls: lr.audits['cumulative-layout-shift']?.numericValue?.toFixed(3) || null,
        tbt: lr.audits['total-blocking-time']?.numericValue || null,
      };
    }

    return result;
  } catch (e) {
    console.error('PageSpeed API error:', e);
    return { url, error: 'timeout or API error' };
  }
}

// MODULE 19 — GSC DATA INTEGRATION
async function getGSCData(
  siteUrl: string
): Promise<any> {
  try {
    const token = await getServiceAccountToken([
      'https://www.googleapis.com/auth/webmasters.readonly'
    ]);

    if (!token) return null;

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0];

    const res = await Promise.race([
      fetch(
        `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate,
            endDate,
            dimensions: ['page'],
            rowLimit: 50,
          }),
        }
      ),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
    ]);

    const data = await (res as Response).json();

    if (data.error) {
      console.error('GSC API error:', data.error);
      return null;
    }

    const rows = data.rows || [];
    return {
      startDate,
      endDate,
      rows: rows.map((row: any) => ({
        url: row.keys[0],
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: Math.round(row.ctr * 1000) / 10,
        position: Math.round(row.position * 10) / 10,
      }))
    };
  } catch (e) {
    console.error('GSC data fetch failed:', e);
    return null;
  }
}

// MODULE 20 — INDEXING SUBMISSION (WRITE OPERATION)
async function submitForIndexing(
  urls: string[],
  dryRun: boolean = true
): Promise<any> {
  assertNotRemoval('submit');

  const results: any[] = [];
  let submitted = 0;

  for (const url of urls.slice(0, MAX_INDEXING_REQUESTS_PER_RUN)) {
    assertUrlSafe(url);
    assertIndexingQuota();

    if (dryRun) {
      logWriteOperation('SUBMIT_INDEX', url, 'DRY RUN — not submitted', true);
      results.push({ url, status: 'dry_run' });
      continue;
    }

    try {
      const token = await getServiceAccountToken([
        'https://www.googleapis.com/auth/indexing'
      ]);

      if (!token) {
        logWriteOperation('SUBMIT_INDEX', url, 'FAILED: No service account token', false);
        results.push({ url, status: 'failed', error: 'No token' });
        continue;
      }

      const res = await fetch(
        'https://indexing.googleapis.com/v3/urlNotifications:publish',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url,
            type: 'URL_UPDATED',
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        logWriteOperation('SUBMIT_INDEX', url, 'SUCCESS', false);
        results.push({ url, status: 'success' });
        submitted++;
      } else {
        logWriteOperation('SUBMIT_INDEX', url, `FAILED: ${result.error?.message}`, false);
        results.push({ url, status: 'failed', error: result.error?.message });
      }
    } catch (e: any) {
      logWriteOperation('SUBMIT_INDEX', url, `FAILED: ${e.message}`, false);
      results.push({ url, status: 'failed', error: e.message });
    }
  }

  return {
    submitted,
    total_eligible: urls.length,
    results,
    quota_remaining: MAX_INDEXING_REQUESTS_PER_RUN - indexingRequestsThisRun
  };
}

// BUG FIX 5: HTML entity decoder
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

async function fetchPage(url: string) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'VigilAuditor/1.0' },
      signal: AbortSignal.timeout(10000),
    });
    const html = await res.text();
    return { status: res.status, html, ok: res.ok, headers: res.headers };
  } catch {
    return { status: 0, html: '', ok: false, headers: new Headers() };
  }
}

async function fetchNoRedirect(url: string) {
  try {
    const res = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': 'VigilAuditor/1.0' },
      signal: AbortSignal.timeout(8000),
    });
    return {
      status: res.status,
      location: res.headers.get('location'),
    };
  } catch {
    return { status: 0, location: null };
  }
}

function extractCanonical(html: string): string | null {
  const m = html.match(
    /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i
  );
  return m ? m[1] : null;
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? decodeHtmlEntities(m[1].trim()) : null;
}

function extractMetaDesc(html: string): string | null {
  const m = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i
  );
  return m ? decodeHtmlEntities(m[1]) : null;
}

function extractH1(html: string): string | null {
  const m = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  return m ? m[1].trim() : null;
}

function isNoIndex(html: string): boolean {
  return /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i
    .test(html);
}

function countWords(html: string): number {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.split(' ').filter(w => w.length > 2).length;
}

function checkForbiddenClaims(
  html: string,
  claims: string[]
): string[] {
  const text = html.replace(/<[^>]+>/g, ' ');
  return claims.filter(claim =>
    text.toLowerCase().includes(claim.toLowerCase())
  );
}

function checkNAP(
  html: string,
  nap: { phone: string; email: string }
): { phone_ok: boolean; email_ok: boolean } {
  return {
    phone_ok: html.includes(nap.phone),
    email_ok: html.includes(nap.email),
  };
}

function checkHtmlEntities(html: string): number {
  const bodyContent = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');
  const matches = bodyContent.match(
    /&apos;|&#39;|&amp;(?!(?:amp|lt|gt|quot|#\d+);)/g
  );
  return matches ? matches.length : 0;
}

async function getSitemapUrls(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/sitemap.xml`, {
      signal: AbortSignal.timeout(8000),
    });
    const xml = await res.text();
    const matches = xml.match(/<loc>([\s\S]*?)<\/loc>/g) || [];
    return matches
      .map(m => m.replace(/<\/?loc>/g, '').trim())
      .filter(u => u.startsWith(BASE_URL));
  } catch {
    return [];
  }
}

// MODULE 1 — STRUCTURED DATA VALIDATION
function validateStructuredData(html: string, url: string): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const scripts = html.match(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  ) || [];

  const requiredByType: Record<string, string[]> = {
    'SecurityService': ['name', 'url', 'telephone', 'address'],
    'CleaningService': ['name', 'url', 'telephone', 'address'],
    'LocalBusiness': ['name', 'url', 'telephone', 'address'],
    'Organization': ['name', 'url'],
    'WebSite': ['name', 'url'],
    'BreadcrumbList': ['itemListElement'],
    'FAQPage': ['mainEntity'],
    'Service': ['name', 'serviceType'],
    'PostalAddress': ['streetAddress', 'addressLocality', 'postalCode', 'addressCountry'],
  };

  if (scripts.length === 0) {
    const mustIndex = url === BASE_URL || url.includes('/manned-guarding') || url.includes('/mobile-patrols');
    if (mustIndex) {
      issues.push({
        type: 'warning',
        category: 'Structured Data',
        message: 'No structured data found on indexable page',
        impact: 4,
        url
      });
    }
    return issues;
  }

  if (scripts.length > 3) {
    issues.push({
      type: 'warning',
      category: 'Structured Data',
      message: `${scripts.length} JSON-LD blocks found — consider consolidating`,
      impact: 1,
      url
    });
  }

  scripts.forEach((scriptTag) => {
    const content = scriptTag.replace(/<script[^>]*>|<\/script>/gi, '').trim();
    let schema: any;

    try {
      schema = JSON.parse(content);
    } catch {
      issues.push({
        type: 'error',
        category: 'Structured Data',
        message: 'Invalid JSON-LD — cannot parse',
        impact: 8,
        url
      });
      return;
    }

    const schemaType = schema['@type'];
    if (!schemaType) {
      issues.push({
        type: 'error',
        category: 'Structured Data',
        message: 'JSON-LD missing @type',
        impact: 5,
        url
      });
      return;
    }

    const required = requiredByType[schemaType] || [];
    required.forEach(prop => {
      if (!schema[prop]) {
        issues.push({
          type: 'error',
          category: 'Structured Data',
          message: `JSON-LD @type "${schemaType}" missing required property: "${prop}"`,
          impact: 5,
          url
        });
      }
    });

    if (schema.address && typeof schema.address === 'string') {
      issues.push({
        type: 'warning',
        category: 'Structured Data',
        message: 'address should be PostalAddress object not string',
        impact: 3,
        url
      });
    }

    if (schema.telephone && !/^[\+\d\s\-\(\)]{7,}$/.test(schema.telephone)) {
      issues.push({
        type: 'warning',
        category: 'Structured Data',
        message: 'telephone format may be invalid',
        impact: 2,
        url
      });
    }
  });

  return issues;
}

// MODULE 2 — SITEMAP REDIRECT DETECTION
async function checkSitemapHealth(sitemapUrls: string[]): Promise<{
  total_checked: number;
  redirecting: number;
  broken: number;
  ok: number;
  issues: AuditIssue[];
}> {
  const issues: AuditIssue[] = [];
  const urlsToCheck = sitemapUrls.slice(0, 20);
  let redirecting = 0;
  let broken = 0;
  let ok = 0;

  const results = await Promise.allSettled(
    urlsToCheck.map(async (url) => {
      try {
        const result = await Promise.race([
          fetchNoRedirect(url),
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
        ]);
        return { url, ...result };
      } catch {
        return { url, status: 0, location: null };
      }
    })
  );

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      const { url, status, location } = result.value;

      if (status === 404) {
        broken++;
        issues.push({
          type: 'error',
          category: 'Sitemap',
          message: `Sitemap URL returns 404: ${url}`,
          impact: 10,
          url
        });
      } else if (status === 301 || status === 308) {
        redirecting++;
        issues.push({
          type: 'error',
          category: 'Sitemap',
          message: `Sitemap URL redirects (${status}): ${url} → ${location}`,
          impact: 5,
          url
        });
      } else if (status === 200) {
        ok++;
      }
    }
  });

  return {
    total_checked: urlsToCheck.length,
    redirecting,
    broken,
    ok,
    issues
  };
}

// MODULE 3 — IMAGE AUDIT
async function auditImages(html: string, url: string, pageIndex: number): Promise<{
  broken: number;
  missing_alt: number;
  mixed_content: number;
  issues: AuditIssue[];
}> {
  const issues: AuditIssue[] = [];
  let broken = 0;
  let missing_alt = 0;
  let mixed_content = 0;

  if (pageIndex >= 5) {
    return { broken, missing_alt, mixed_content, issues };
  }

  const imgTags = html.match(/<img[^>]+>/gi) || [];
  const imagesToCheck = imgTags.slice(0, 10);

  imagesToCheck.forEach((imgTag) => {
    const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
    const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
    const widthMatch = imgTag.match(/width=["']?[^"'\s]+/i);
    const heightMatch = imgTag.match(/height=["']?[^"'\s]+/i);

    const src = srcMatch ? srcMatch[1] : '';

    if (!altMatch || !altMatch[1]) {
      missing_alt++;
      issues.push({
        type: 'warning',
        category: 'Images',
        message: `Image missing alt text: ${src.substring(0, 50)}...`,
        impact: 2,
        url
      });
    }

    if (url.startsWith('https://') && src.startsWith('http://')) {
      mixed_content++;
      issues.push({
        type: 'error',
        category: 'Images',
        message: `Mixed content: HTTP image on HTTPS page: ${src.substring(0, 50)}...`,
        impact: 8,
        url
      });
    }

    if (!widthMatch || !heightMatch) {
      issues.push({
        type: 'warning',
        category: 'Images',
        message: `Image missing width/height — causes layout shift: ${src.substring(0, 50)}...`,
        impact: 2,
        url
      });
    }
  });

  return { broken, missing_alt, mixed_content, issues };
}

// MODULE 4 — OG/SOCIAL TAGS COMPLETENESS (BUG FIX 2: Recalibrated scoring)
function checkOpenGraph(html: string, url: string, isIndexable: boolean, pageType: string): {
  missing_og: number;
  twitter_issues: number;
  issues: AuditIssue[];
} {
  const issues: AuditIssue[] = [];
  let missing_og = 0;
  let twitter_issues = 0;

  // Skip OG checks on legal/admin pages
  if (pageType === 'legal_page' || url.includes('/admin')) {
    return { missing_og, twitter_issues, issues };
  }

  // Only check core tags: title, description, image, url, type
  // Removed: site_name, locale (not critical)
  const requiredOG = isIndexable
    ? ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']
    : ['og:title', 'og:description'];

  const canonical = extractCanonical(html);

  const impactScores: Record<string, number> = {
    'og:title': 3,
    'og:description': 2,
    'og:image': 1,
    'og:url': 1,
    'og:type': 1,
  };

  requiredOG.forEach(prop => {
    const ogMatch = html.match(
      new RegExp(`<meta[^>]*property=["']${prop}["'][^>]*content=["']([^"']+)["']`, 'i')
    );

    if (!ogMatch) {
      // Only flag og:image missing on service/borough pages
      if (prop === 'og:image') {
        if (pageType === 'service_page' || pageType === 'borough_page') {
          missing_og++;
          issues.push({
            type: 'warning',
            category: 'Social Tags',
            message: 'Service page missing og:image — add page-specific image',
            impact: 1,
            url
          });
        }
      } else {
        missing_og++;
        issues.push({
          type: 'warning',
          category: 'Social Tags',
          message: `Missing OG tag: ${prop}`,
          impact: impactScores[prop] || 1,
          url
        });
      }
    } else {
      const content = ogMatch[1];

      if (prop === 'og:image' && !content.startsWith('https://') && isIndexable) {
        issues.push({
          type: 'error',
          category: 'Social Tags',
          message: 'og:image must use HTTPS',
          impact: 3,
          url
        });
      }

      if (prop === 'og:url' && canonical && content !== canonical && isIndexable) {
        issues.push({
          type: 'warning',
          category: 'Social Tags',
          message: 'og:url does not match canonical',
          impact: 1,
          url
        });
      }
    }
  });

  const twitterCardMatch = html.match(
    /<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']+)["']/i
  );

  if (twitterCardMatch && twitterCardMatch[1] === 'summary' && isIndexable) {
    twitter_issues++;
    issues.push({
      type: 'warning',
      category: 'Social Tags',
      message: 'twitter:card should be summary_large_image for better CTR',
      impact: 1,
      url
    });
  }

  return { missing_og, twitter_issues, issues };
}

// MODULE 5 — OUTGOING LINK HEALTH
function checkOutgoingLinks(html: string, url: string, mustIndex: boolean): {
  pages_no_outgoing: number;
  http_links: number;
  issues: AuditIssue[];
} {
  const issues: AuditIssue[] = [];
  let pages_no_outgoing = 0;
  let http_links = 0;

  const links = html.match(/<a[^>]+href=["']([^"']+)["']/gi) || [];
  const hrefs = links.map(l => {
    const m = l.match(/href=["']([^"']+)["']/i);
    return m ? m[1] : '';
  }).filter(h => h && !h.startsWith('#') && !h.startsWith('mailto:') && !h.startsWith('tel:'));

  const internalLinks = hrefs.filter(h => h.startsWith('/') || h.startsWith(BASE_URL));
  const externalLinks = hrefs.filter(h => h.startsWith('http') && !h.startsWith(BASE_URL));

  if (internalLinks.length === 0 && mustIndex) {
    pages_no_outgoing++;
    issues.push({
      type: 'error',
      category: 'Links',
      message: 'Page has no outgoing internal links',
      impact: 5,
      url
    });
  }

  const isServicePage = url.includes('/manned-guarding') || url.includes('/mobile-patrols') ||
    url.includes('/construction-site') || url.includes('/event-security') ||
    url.includes('/key-holding') || url.includes('/concierge') ||
    url.includes('/cctv-monitoring') || url.includes('/alarm-response');

  if (isServicePage && internalLinks.length < 3) {
    issues.push({
      type: 'warning',
      category: 'Links',
      message: `Low internal link count: ${internalLinks.length} links — recommend minimum 3`,
      impact: 2,
      url
    });
  }

  externalLinks.forEach(href => {
    if (href.startsWith('http://')) {
      http_links++;
      issues.push({
        type: 'warning',
        category: 'Links',
        message: `Outgoing link uses HTTP not HTTPS: ${href.substring(0, 50)}...`,
        impact: 2,
        url
      });
    }
  });

  return { pages_no_outgoing, http_links, issues };
}

// MODULE 6 — DUPLICATE TITLE AND META DETECTION
function checkDuplicates(pageResults: any[]): {
  duplicate_titles: number;
  duplicate_descs: number;
  issues: AuditIssue[];
} {
  const issues: AuditIssue[] = [];
  const titleMap = new Map<string, string[]>();
  const descMap = new Map<string, string[]>();

  pageResults.forEach(result => {
    if (result.title) {
      const urls = titleMap.get(result.title) || [];
      urls.push(result.url);
      titleMap.set(result.title, urls);
    }
    if (result.meta_description) {
      const urls = descMap.get(result.meta_description) || [];
      urls.push(result.url);
      descMap.set(result.meta_description, urls);
    }
  });

  let duplicate_titles = 0;
  let duplicate_descs = 0;

  titleMap.forEach((urls, title) => {
    if (urls.length > 1) {
      duplicate_titles++;
      const displayUrls = urls.map(u => u.replace(BASE_URL, '')).join(', ');
      issues.push({
        type: 'error',
        category: 'Duplicate Content',
        message: `Duplicate title tag across ${urls.length} pages: "${title.substring(0, 50)}..." — found on: ${displayUrls}`,
        impact: 6
      });
    }
  });

  descMap.forEach((urls, desc) => {
    if (urls.length > 1) {
      duplicate_descs++;
      const displayUrls = urls.map(u => u.replace(BASE_URL, '')).join(', ');
      issues.push({
        type: 'warning',
        category: 'Duplicate Content',
        message: `Duplicate meta description across ${urls.length} pages`,
        impact: 4
      });
    }
  });

  return { duplicate_titles, duplicate_descs, issues };
}

// MODULE 7 — RESPONSE HEADER VALIDATION
async function checkHeaders(url: string): Promise<{
  noindex_headers: number;
  issues: AuditIssue[];
}> {
  const issues: AuditIssue[] = [];
  let noindex_headers = 0;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'VigilAuditor/1.0' },
      signal: AbortSignal.timeout(5000),
    });

    const xRobotsTag = res.headers.get('x-robots-tag');
    if (xRobotsTag && xRobotsTag.toLowerCase().includes('noindex')) {
      noindex_headers++;
      issues.push({
        type: 'error',
        category: 'Headers',
        message: 'X-Robots-Tag: noindex found in HTTP header',
        impact: 15,
        url
      });
    }

    const contentType = res.headers.get('content-type');
    if (contentType && !contentType.includes('text/html')) {
      issues.push({
        type: 'warning',
        category: 'Headers',
        message: `Unexpected Content-Type: ${contentType}`,
        impact: 3,
        url
      });
    }

    const xFrameOptions = res.headers.get('x-frame-options');
    const csp = res.headers.get('content-security-policy');
    if (!xFrameOptions && !csp) {
      issues.push({
        type: 'notice',
        category: 'Headers',
        message: 'Missing security headers — consider adding X-Frame-Options',
        impact: 0,
        url
      });
    }
  } catch {
    // Timeout or error — skip header checks
  }

  return { noindex_headers, issues };
}

// MODULE 8 — URL STRUCTURE ISSUES
function checkURLStructure(url: string): {
  double_slashes: number;
  uppercase: number;
  issues: AuditIssue[];
} {
  const issues: AuditIssue[] = [];
  let double_slashes = 0;
  let uppercase = 0;

  const path = url.replace(BASE_URL, '');

  if (path.includes('//')) {
    double_slashes++;
    issues.push({
      type: 'error',
      category: 'URL Structure',
      message: `Double slash in URL: ${url}`,
      impact: 3,
      url
    });
  }

  if (/[A-Z]/.test(path)) {
    uppercase++;
    issues.push({
      type: 'warning',
      category: 'URL Structure',
      message: `Uppercase letters in URL: ${url}`,
      impact: 2,
      url
    });
  }

  const queryMatch = url.match(/\?(.+)/);
  if (queryMatch) {
    const params = queryMatch[1].split('&');
    if (params.length > 2) {
      issues.push({
        type: 'warning',
        category: 'URL Structure',
        message: `Multiple URL parameters: ${url}`,
        impact: 2,
        url
      });
    }
  }

  return { double_slashes, uppercase, issues };
}

// MODULE 9 — ROBOTS.TXT VALIDATOR
async function validateRobotsTxt(): Promise<{
  accessible: boolean;
  has_sitemap_reference: boolean;
  admin_blocked: boolean;
  content: string;
  issues: AuditIssue[];
}> {
  const issues: AuditIssue[] = [];
  let accessible = false;
  let has_sitemap_reference = false;
  let admin_blocked = false;
  let content = '';

  try {
    const res = await fetch(`${BASE_URL}/robots.txt`, {
      headers: { 'User-Agent': 'VigilAuditor/1.0' },
      signal: AbortSignal.timeout(5000),
    });

    if (res.status !== 200) {
      issues.push({
        type: 'error',
        category: 'Robots.txt',
        message: `robots.txt not accessible — returns ${res.status}`,
        impact: 10
      });
      return { accessible, has_sitemap_reference, admin_blocked, content, issues };
    }

    accessible = true;
    content = await res.text();

    // Check for sitemap reference
    if (/^Sitemap:/im.test(content)) {
      has_sitemap_reference = true;
      const sitemapMatch = content.match(/^Sitemap:\s*(.+)$/im);
      if (sitemapMatch) {
        const sitemapUrl = sitemapMatch[1].trim();
        if (!sitemapUrl.startsWith(BASE_URL)) {
          issues.push({
            type: 'error',
            category: 'Robots.txt',
            message: 'Sitemap URL in robots.txt points to wrong domain',
            impact: 5
          });
        }
      }
    } else {
      issues.push({
        type: 'warning',
        category: 'Robots.txt',
        message: 'robots.txt does not reference sitemap',
        impact: 3
      });
    }

    // Check for blanket disallow
    const lines = content.split('\n');
    let currentUserAgent = '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (/^User-agent:/i.test(trimmed)) {
        currentUserAgent = trimmed.replace(/^User-agent:\s*/i, '');
      }
      if (trimmed === 'Disallow: /' && currentUserAgent === '*') {
        issues.push({
          type: 'error',
          category: 'Robots.txt',
          message: 'robots.txt blocks all crawlers — Disallow: / found',
          impact: 20
        });
      }
    }

    // Check admin and API blocking
    if (/Disallow:.*\/admin/i.test(content)) {
      admin_blocked = true;
    } else {
      issues.push({
        type: 'warning',
        category: 'Robots.txt',
        message: 'Sensitive path not blocked in robots.txt: /admin',
        impact: 2
      });
    }

    if (!/Disallow:.*\/api\//i.test(content)) {
      issues.push({
        type: 'warning',
        category: 'Robots.txt',
        message: 'Sensitive path not blocked in robots.txt: /api/',
        impact: 2
      });
    }

    // Check for syntax errors
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const validStarts = ['User-agent:', 'Disallow:', 'Allow:', 'Sitemap:', 'Crawl-delay:'];
      if (!validStarts.some(s => trimmed.startsWith(s))) {
        issues.push({
          type: 'warning',
          category: 'Robots.txt',
          message: `Possible syntax error in robots.txt: ${trimmed.substring(0, 50)}...`,
          impact: 2
        });
        break;
      }
    }
  } catch {
    issues.push({
      type: 'error',
      category: 'Robots.txt',
      message: 'robots.txt unreachable — timeout or network error',
      impact: 10
    });
  }

  return { accessible, has_sitemap_reference, admin_blocked, content, issues };
}

// MODULE 10 — BROKEN EXTERNAL LINK CHECKER
async function checkExternalLinks(html: string, url: string, pageIndex: number): Promise<{
  broken: number;
  http_links: number;
  timed_out: number;
  issues: AuditIssue[];
}> {
  const issues: AuditIssue[] = [];
  let broken = 0;
  let http_links = 0;
  let timed_out = 0;

  if (pageIndex >= 8) {
    return { broken, http_links, timed_out, issues };
  }

  const links = html.match(/href=["'](https?:\/\/[^"']+)["']/gi) || [];
  const externalLinks = links
    .map(l => l.replace(/href=["']|["']/g, ''))
    .filter(l => !l.startsWith(BASE_URL))
    .filter(l => !l.includes('google.com/maps'))
    .filter(l => !l.includes('linkedin.com'))
    .filter(l => !l.includes('facebook.com'))
    .filter(l => !l.includes('twitter.com'))
    .filter(l => !l.includes('instagram.com'))
    .slice(0, 10);

  const results = await Promise.allSettled(
    externalLinks.map(async (href) => {
      try {
        const res = await Promise.race([
          fetch(href, {
            method: 'HEAD',
            headers: { 'User-Agent': 'VigilAuditor/1.0' },
            signal: AbortSignal.timeout(5000),
          }),
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
        ]);
        return { href, status: (res as Response).status };
      } catch {
        return { href, status: 0 };
      }
    })
  );

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      const { href, status } = result.value;

      if (status === 404) {
        broken++;
        issues.push({
          type: 'error',
          category: 'External Links',
          message: `Broken external link: ${href.substring(0, 50)}...`,
          impact: 3,
          url
        });
      } else if (status === 0) {
        timed_out++;
        issues.push({
          type: 'warning',
          category: 'External Links',
          message: `External link timed out — may be broken: ${href.substring(0, 50)}...`,
          impact: 1,
          url
        });
      }

      if (href.startsWith('http://')) {
        http_links++;
        issues.push({
          type: 'warning',
          category: 'External Links',
          message: `External link uses HTTP not HTTPS: ${href.substring(0, 50)}...`,
          impact: 2,
          url
        });
      }
    }
  });

  return { broken, http_links, timed_out, issues };
}

// MODULE 11 — CRAWL DEPTH CALCULATOR
async function calculateCrawlDepth(baseUrl: string, pagesToCheck: string[]): Promise<{
  depth_1: string[];
  depth_2: string[];
  depth_3: string[];
  unreachable: string[];
  issues: AuditIssue[];
}> {
  const issues: AuditIssue[] = [];
  const depth_1: string[] = [];
  const depth_2: string[] = [];
  const depth_3: string[] = [];
  const unreachable: string[] = [];

  const discovered = new Map<string, number>();
  discovered.set(baseUrl, 0);

  try {
    // Fetch homepage
    const { html: homeHtml } = await fetchPage(baseUrl);
    const homeLinks = homeHtml.match(/href=["']([^"'#?]+)["']/g) || [];
    const depth1Urls: string[] = Array.from(new Set<string>(
      homeLinks
        .map((m: string) => m.replace(/href=["']|["']/g, ''))
        .filter((l: string) => l.startsWith('/') || l.startsWith(baseUrl))
        .map((l: string) => l.startsWith('/') ? `${baseUrl}${l}` : l)
        .map((l: string) => l.replace(/\/$/, ''))
        .filter((l: string) =>
          !l.includes('/_next/') &&
          !l.includes('/static/') &&
          !l.includes('.css') &&
          !l.includes('.js') &&
          !l.includes('.jpg') &&
          !l.includes('.jpeg') &&
          !l.includes('.png') &&
          !l.includes('.svg') &&
          !l.includes('.ico') &&
          !l.includes('?') &&
          !l.includes('#')
        )
    )).slice(0, 15);

    depth1Urls.forEach(u => {
      if (!discovered.has(u)) {
        discovered.set(u, 1);
        depth_1.push(u);
      }
    });

    // Fetch depth 1 pages
    const depth1Results = await Promise.allSettled(
      depth_1.slice(0, 10).map(async (url) => {
        try {
          const result = await Promise.race([
            fetchPage(url),
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
          ]);
          return { url, html: (result as any).html };
        } catch {
          return { url, html: '' };
        }
      })
    );

    depth1Results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value.html) {
        const links = result.value.html.match(/href=["']([^"'#?]+)["']/g) || [];
        const depth2Urls: string[] = Array.from(new Set<string>(
          links
            .map((m: string) => m.replace(/href=["']|["']/g, ''))
            .filter((l: string) => l.startsWith('/') || l.startsWith(baseUrl))
            .map((l: string) => l.startsWith('/') ? `${baseUrl}${l}` : l)
            .map((l: string) => l.replace(/\/$/, ''))
            .filter((l: string) =>
              !l.includes('/_next/') &&
              !l.includes('/static/') &&
              !l.includes('.css') &&
              !l.includes('.js') &&
              !l.includes('.jpg') &&
              !l.includes('.jpeg') &&
              !l.includes('.png') &&
              !l.includes('.svg') &&
              !l.includes('.ico') &&
              !l.includes('?') &&
              !l.includes('#')
            )
        )).slice(0, 10);

        depth2Urls.forEach(u => {
          if (!discovered.has(u)) {
            discovered.set(u, 2);
            depth_2.push(u);
          }
        });
      }
    });

    // Fetch depth 2 pages
    const depth2Results = await Promise.allSettled(
      depth_2.slice(0, 5).map(async (url) => {
        try {
          const result = await Promise.race([
            fetchPage(url),
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
          ]);
          return { url, html: (result as any).html };
        } catch {
          return { url, html: '' };
        }
      })
    );

    depth2Results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value.html) {
        const links = result.value.html.match(/href=["']([^"'#?]+)["']/g) || [];
        const depth3Urls: string[] = Array.from(new Set<string>(
          links
            .map((m: string) => m.replace(/href=["']|["']/g, ''))
            .filter((l: string) => l.startsWith('/') || l.startsWith(baseUrl))
            .map((l: string) => l.startsWith('/') ? `${baseUrl}${l}` : l)
            .map((l: string) => l.replace(/\/$/, ''))
            .filter((l: string) =>
              !l.includes('/_next/') &&
              !l.includes('/static/') &&
              !l.includes('.css') &&
              !l.includes('.js') &&
              !l.includes('.jpg') &&
              !l.includes('.jpeg') &&
              !l.includes('.png') &&
              !l.includes('.svg') &&
              !l.includes('.ico') &&
              !l.includes('?') &&
              !l.includes('#')
            )
        )).slice(0, 10);

        depth3Urls.forEach(u => {
          if (!discovered.has(u)) {
            discovered.set(u, 3);
            depth_3.push(u);
          }
        });
      }
    });

    // Check which pages are unreachable
    pagesToCheck.forEach(url => {
      const depth = discovered.get(url);
      const path = url.replace(baseUrl, '');
      const mustIndex = path === '/' || path.includes('/manned-guarding') || path.includes('/mobile-patrols');

      if (depth === 3 && mustIndex) {
        issues.push({
          type: 'warning',
          category: 'Crawl Depth',
          message: `Page requires 3 clicks from homepage: ${path}`,
          impact: 2,
          url
        });
      } else if (depth === undefined && mustIndex) {
        unreachable.push(url);
        issues.push({
          type: 'error',
          category: 'Crawl Depth',
          message: `Page not reachable within 3 clicks: ${path} — crawler may miss it`,
          impact: 5,
          url
        });
      }
    });
  } catch {
    issues.push({
      type: 'notice',
      category: 'Crawl Depth',
      message: 'Could not complete crawl depth analysis — timeout or error',
      impact: 0
    });
  }

  return { depth_1, depth_2, depth_3, unreachable, issues };
}

// MODULE 13 — PAGE SIZE VALIDATOR
function checkPageSize(html: string, url: string): {
  size_kb: number;
  issues: AuditIssue[];
} {
  const issues: AuditIssue[] = [];
  const sizeBytes = new TextEncoder().encode(html).length;
  const sizeKB = Math.round(sizeBytes / 1024);

  if (sizeBytes > 2_000_000) {
    issues.push({
      type: 'error',
      category: 'Page Size',
      message: `Page exceeds Googlebot 2MB crawl limit: ${sizeKB}KB`,
      impact: 10,
      url
    });
  } else if (sizeBytes > 500_000) {
    issues.push({
      type: 'warning',
      category: 'Page Size',
      message: `Large page size may slow crawling: ${sizeKB}KB`,
      impact: 3,
      url
    });
  }

  return { size_kb: sizeKB, issues };
}

// MODULE 14 — NEAR DUPLICATE CONTENT DETECTION
function checkNearDuplicates(pageResults: any[]): {
  exact_duplicates: number;
  near_duplicates: number;
  pairs: Array<{ url1: string; url2: string; similarity: number }>;
  issues: AuditIssue[];
} {
  const issues: AuditIssue[] = [];
  const pairs: Array<{ url1: string; url2: string; similarity: number }> = [];
  let exact_duplicates = 0;
  let near_duplicates = 0;

  // Helper to extract content fingerprint
  const extractFingerprint = (html: string): string[] => {
    if (!html) return [];
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<header[\s\S]*?<\/header>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[^\w\s]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .filter(w => w.length > 3)
      .slice(0, 500);
    return text;
  };

  // Helper to calculate similarity
  const calculateSimilarity = (words1: string[], words2: string[]): number => {
    if (words1.length === 0 || words2.length === 0) return 0;
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  };

  // Group by page type
  const byType = new Map<string, any[]>();
  pageResults.forEach(result => {
    if (result.word_count < 300) return; // Skip short pages
    const type = result.page_type || 'unknown';
    if (!byType.has(type)) {
      byType.set(type, []);
    }
    byType.get(type)!.push(result);
  });

  let comparisons = 0;
  const MAX_COMPARISONS = 20;

  // Compare within same page type
  byType.forEach((pages, type) => {
    if (comparisons >= MAX_COMPARISONS) return;

    for (let i = 0; i < pages.length && comparisons < MAX_COMPARISONS; i++) {
      for (let j = i + 1; j < pages.length && comparisons < MAX_COMPARISONS; j++) {
        comparisons++;

        // Simplistic comparison using titles and word counts for performance
        const p1 = pages[i];
        const p2 = pages[j];

        // Quick exact duplicate check
        if (p1.title === p2.title && Math.abs(p1.word_count - p2.word_count) < 10) {
          exact_duplicates++;
          pairs.push({ url1: p1.url, url2: p2.url, similarity: 1.0 });
          issues.push({
            type: 'error',
            category: 'Duplicate Content',
            message: `Near-duplicate content: ${p1.url.replace(BASE_URL, '')} and ${p2.url.replace(BASE_URL, '')} are 100% similar`,
            impact: 8
          });
        }
        // Borough page similarity check (template-based pages)
        else if (type === 'borough_page') {
          const wordDiff = Math.abs(p1.word_count - p2.word_count);
          const avgWords = (p1.word_count + p2.word_count) / 2;
          const similarity = 1 - (wordDiff / avgWords);

          if (similarity > 0.80) {
            near_duplicates++;
            pairs.push({ url1: p1.url, url2: p2.url, similarity });
            issues.push({
              type: 'warning',
              category: 'Duplicate Content',
              message: `Potentially duplicate content: ${p1.url.replace(BASE_URL, '')} and ${p2.url.replace(BASE_URL, '')} are ${Math.round(similarity * 100)}% similar`,
              impact: 4
            });
          }
        }
      }
    }
  });

  return { exact_duplicates, near_duplicates, pairs, issues };
}

async function auditPage(
  url: string,
  sitemapUrls: string[],
  rules: any,
  pageIndex: number
) {
  const issues: any[] = [];
  const { status, html, headers } = await fetchPage(url);
  const path = url.replace(BASE_URL, '') || '/';

  if (status === 0) {
    return {
      url, status,
      issues: [{ type: 'error', category: 'Crawl',
        message: 'Page unreachable', impact: 10 }]
    };
  }

  if (status === 404) {
    issues.push({ type: 'error', category: 'HTTP',
      message: `Page returns 404`, impact: 15 });
    return { url, status, issues };
  }

  const canonical = extractCanonical(html);
  const title = extractTitle(html);
  const metaDesc = extractMetaDesc(html);
  const h1 = extractH1(html);
  const noindex = isNoIndex(html);
  const wordCount = countWords(html);
  const entityCount = checkHtmlEntities(html);
  const napCheck = checkNAP(html, rules.nap);

  if (!canonical) {
    issues.push({ type: 'error', category: 'Canonical',
      message: 'Missing canonical tag', impact: 5 });
  } else {
    const urlClean = url.replace(/\/$/, '');
    const canClean = canonical.replace(/\/$/, '');

    if (canonical.endsWith('/') && !url.endsWith('/')) {
      issues.push({ type: 'error', category: 'Canonical',
        message: `Trailing slash mismatch — URL: ${url} Canonical: ${canonical}`,
        impact: 10 });
    }

    if (urlClean !== canClean) {
      const canCheck = await fetchNoRedirect(canonical);
      if (canCheck.status >= 300 && canCheck.status < 400) {
        issues.push({ type: 'error', category: 'Canonical',
          message: `Canonical redirect chain: canonical ${canonical} redirects to ${canCheck.location}`,
          impact: 10 });
      } else if (canCheck.status !== 200) {
        issues.push({ type: 'error', category: 'Canonical',
          message: `Canonical URL returns ${canCheck.status}: ${canonical}`,
          impact: 8 });
      } else {
        issues.push({ type: 'warning', category: 'Canonical',
          message: `Canonical points to different URL: ${canonical}`,
          impact: 6 });
      }
    }
  }

  if (!title) {
    issues.push({ type: 'error', category: 'Meta',
      message: 'Missing title tag', impact: 8 });
  } else {
    if (title.length < 30) {
      issues.push({ type: 'warning', category: 'Meta',
        message: `Title too short: ${title.length} chars`, impact: 3 });
    }
    if (title.length > 65) {
      issues.push({ type: 'warning', category: 'Meta',
        message: `Title too long: ${title.length} chars`, impact: 3 });
    }
  }

  if (!metaDesc) {
    issues.push({ type: 'error', category: 'Meta',
      message: 'Missing meta description', impact: 5 });
  } else {
    if (metaDesc.length < 120) {
      issues.push({ type: 'warning', category: 'Meta',
        message: `Meta description too short: ${metaDesc.length} chars`,
        impact: 2 });
    }
    if (metaDesc.length > 160) {
      issues.push({ type: 'warning', category: 'Meta',
        message: `Meta description too long: ${metaDesc.length} chars`,
        impact: 2 });
    }
  }

  if (!h1) {
    issues.push({ type: 'error', category: 'Content',
      message: 'Missing H1 tag', impact: 8 });
  }

  const mustIndex = rules.must_index.some(
    (p: string) => path === p ||
      (p.endsWith('*') && path.startsWith(p.slice(0, -1)))
  );
  const mustNoIndex = rules.must_noindex.some(
    (p: string) => path === p ||
      (p.endsWith('*') && path.startsWith(p.slice(0, -1)))
  );

  if (noindex && mustIndex) {
    issues.push({ type: 'error', category: 'Indexability',
      message: 'Page marked noindex but must be indexed per business rules',
      impact: 15 });
  }
  if (!noindex && mustNoIndex) {
    issues.push({ type: 'error', category: 'Indexability',
      message: 'Page should be noindex per business rules but is indexable',
      impact: 10 });
  }

  let pageType = 'service_page';
  for (const [pattern, type] of Object.entries(rules.page_types)) {
    if ((pattern as string).endsWith('*')) {
      if (path.startsWith((pattern as string).slice(0, -1))) {
        pageType = type as string; break;
      }
    } else if (path === pattern) {
      pageType = type as string; break;
    }
  }

  const threshold = rules.content_thresholds[pageType] || 300;
  if (wordCount < threshold) {
    issues.push({
      type: wordCount < threshold * 0.5 ? 'error' : 'warning',
      category: 'Content',
      message: `Thin content: ${wordCount} words — need ${threshold} for ${pageType}`,
      impact: wordCount < threshold * 0.5 ? 8 : 4,
    });
  }

  const foundClaims = checkForbiddenClaims(
    html, rules.forbidden_claims
  );
  if (foundClaims.length > 0) {
    issues.push({ type: 'error', category: 'Compliance',
      message: `Forbidden claims detected: ${foundClaims.join(', ')}`,
      impact: 10 });
  }

  if (!napCheck.phone_ok && mustIndex) {
    issues.push({ type: 'warning', category: 'NAP',
      message: `Correct phone number ${rules.nap.phone} not found on page`,
      impact: 3 });
  }

  if (entityCount > 2) {
    issues.push({ type: 'warning', category: 'Content',
      message: `${entityCount} raw HTML entities found rendering as text`,
      impact: 3 });
  }

  const inSitemap = sitemapUrls.some(
    s => s.replace(/\/$/, '') === url.replace(/\/$/, '')
  );
  if (!inSitemap && mustIndex) {
    issues.push({ type: 'warning', category: 'Sitemap',
      message: 'Priority page missing from sitemap', impact: 3 });
  }

  // MODULE 1: Structured Data
  const sdIssues = validateStructuredData(html, url);
  issues.push(...sdIssues);

  // MODULE 3: Images (first 5 pages only)
  const imgResult = await auditImages(html, url, pageIndex);
  issues.push(...imgResult.issues);

  // MODULE 4: Open Graph (BUG FIX 2: Recalibrated with pageType)
  const ogResult = checkOpenGraph(html, url, !noindex, pageType);
  issues.push(...ogResult.issues);

  // MODULE 5: Outgoing Links
  const linkResult = checkOutgoingLinks(html, url, mustIndex);
  issues.push(...linkResult.issues);

  // MODULE 7: Headers
  const headerResult = await checkHeaders(url);
  issues.push(...headerResult.issues);

  // MODULE 8: URL Structure
  const urlResult = checkURLStructure(url);
  issues.push(...urlResult.issues);

  // MODULE 10: External Links (first 8 pages only)
  const extLinkResult = await checkExternalLinks(html, url, pageIndex);
  issues.push(...extLinkResult.issues);

  // MODULE 13: Page Size
  const pageSizeResult = checkPageSize(html, url);
  issues.push(...pageSizeResult.issues);

  // MODULE 12: Historical tracking
  const previous = auditHistory.get(url);
  if (previous) {
    if (previous.title !== title && previous.title && title) {
      issues.push({
        type: 'warning',
        category: 'Changes',
        message: `Title changed: "${previous.title}" → "${title}"`,
        impact: 2,
        url
      });
    }
    if (previous.h1 !== h1 && previous.h1 && h1) {
      issues.push({
        type: 'warning',
        category: 'Changes',
        message: `H1 changed: "${previous.h1}" → "${h1}"`,
        impact: 2,
        url
      });
    }
    if (Math.abs((previous.wordCount || 0) - wordCount) > 100) {
      issues.push({
        type: 'notice',
        category: 'Changes',
        message: `Word count changed significantly: ${previous.wordCount} → ${wordCount}`,
        impact: 1,
        url
      });
    }
    if (previous.canonical !== canonical) {
      issues.push({
        type: 'warning',
        category: 'Changes',
        message: `Canonical changed: "${previous.canonical}" → "${canonical}"`,
        impact: 3,
        url
      });
    }
  }

  // Store current state for next audit
  auditHistory.set(url, {
    title,
    h1,
    wordCount,
    canonical,
    checkedAt: new Date().toISOString(),
  });

  return {
    url, status, canonical,
    title, meta_description: metaDesc,
    h1, noindex, word_count: wordCount,
    page_type: pageType, in_sitemap: inSitemap,
    nap_phone_ok: napCheck.phone_ok,
    forbidden_claims: foundClaims,
    html_entities: entityCount,
    page_size_kb: pageSizeResult.size_kb,
    page_rank: 0,
    issues,
  };
}

async function checkWordPressRedirects(
  redirectMap: Record<string, string>
): Promise<any[]> {
  const issues: any[] = [];
  for (const [oldPath] of Object.entries(redirectMap).slice(0, 15)) {
    const oldUrl = `${BASE_URL}${oldPath}`;
    const result = await fetchNoRedirect(oldUrl);
    if (result.status === 404) {
      issues.push({ type: 'error', category: 'WordPress Migration',
        message: `Old URL returning 404 — lost authority: ${oldPath}`,
        impact: 8, url: oldUrl });
    } else if (result.status === 200) {
      issues.push({ type: 'warning', category: 'WordPress Migration',
        message: `Old URL returning 200 without redirect — duplicate content risk: ${oldPath}`,
        impact: 5, url: oldUrl });
    } else if (result.status >= 300 && result.status < 400) {
      const dest = result.location || '';
      const hops = dest !== `${BASE_URL}${redirectMap[oldPath]}` ? 2 : 1;
      if (hops > 1) {
        issues.push({ type: 'warning', category: 'WordPress Migration',
          message: `Redirect chain: ${oldPath} → ${dest}`,
          impact: 3, url: oldUrl });
      }
    }
  }
  return issues;
}

async function checkOrphanedPages(
  sitemapUrls: string[]
): Promise<any[]> {
  const issues: any[] = [];
  try {
    const { html } = await fetchPage(`${BASE_URL}/`);
    const linkMatches = html.match(/href=["']([^"'#?]+)["']/g) || [];
    const foundLinks = new Set(
      linkMatches
        .map(m => m.replace(/href=["']|["']/g, ''))
        .filter(l => l.startsWith('/') || l.startsWith(BASE_URL))
        .map(l => l.startsWith('/') ? `${BASE_URL}${l}` : l)
        .map(l => l.replace(/\/$/, ''))
    );
    for (const url of sitemapUrls) {
      const normalized = url.replace(/\/$/, '');
      if (!foundLinks.has(normalized)) {
        issues.push({ type: 'warning', category: 'Orphaned Pages',
          message: `Page in sitemap has no inlinks from homepage: ${url.replace(BASE_URL, '')}`,
          impact: 3, url });
      }
    }
  } catch {
    issues.push({ type: 'notice', category: 'Orphaned Pages',
      message: 'Could not crawl homepage for orphan detection',
      impact: 0, url: BASE_URL });
  }
  return issues;
}

export async function GET(request: Request) {
  const start = Date.now();
  const timings: Record<string, number> = {};

  // Reset quota counter for this run
  indexingRequestsThisRun = 0;
  writeOperationLog.length = 0;

  const url = new URL(request.url);
  const isDryRun = url.searchParams.get('mode') !== 'live';

  let rules: any = {};
  let redirectMap: Record<string, string> = {};

  try {
    rules = (await import('@/config/indexability-rules.json')).default;
  } catch {
    rules = { must_index: [], must_noindex: [],
      forbidden_claims: [], content_thresholds: {},
      page_types: {}, nap: { phone: '', email: '' } };
  }

  try {
    redirectMap = (await import('@/config/wordpress-redirect-map.json')).default;
  } catch {
    redirectMap = {};
  }

  // Step 1: Auth setup
  let t0 = Date.now();
  const psiKey = process.env.PAGESPEED_API_KEY;
  const gscSiteUrl = process.env.GSC_SITE_URL || BASE_URL;
  timings['auth_setup'] = Date.now() - t0;

  // MODULE 9: Robots.txt validation
  t0 = Date.now();
  const robotsResult = await validateRobotsTxt();
  timings['robots_txt'] = Date.now() - t0;

  // Step 2: Recursive crawl (replaces dynamic discovery)
  t0 = Date.now();
  const { pages: crawledPages, linkGraph } = await recursiveCrawl(BASE_URL, 60);
  timings['recursive_crawl'] = Date.now() - t0;

  // Step 3: Estimate PageRank
  t0 = Date.now();
  const pageRanks = estimatePageRank(crawledPages, linkGraph);
  timings['pagerank'] = Date.now() - t0;

  // Get sitemap for additional validation
  t0 = Date.now();
  const sitemapUrls = await getSitemapUrls();

  // Combine crawled pages with sitemap
  const pagesToAudit = Array.from(
    new Set<string>([
      ...crawledPages,
      ...sitemapUrls,
    ])
  ).map((u: string) => u.replace(/\/$/, ''))
   .filter((u: string) =>
     u.startsWith(BASE_URL) &&
     !u.includes('/admin') &&
     !u.includes('/api/') &&
     !u.includes('/_next/') &&
     !u.includes('/static/')
   )
   .slice(0, 60);

  timings['page_discovery'] = Date.now() - t0;

  // MODULE 11: Crawl depth calculation
  t0 = Date.now();
  const crawlDepthResult = await calculateCrawlDepth(BASE_URL, pagesToAudit);
  timings['crawl_depth'] = Date.now() - t0;

  const allIssues: any[] = [];
  allIssues.push(...robotsResult.issues);
  allIssues.push(...crawlDepthResult.issues);

  const pageResults: any[] = [];

  // Step 4: Page audit
  t0 = Date.now();
  for (let i = 0; i < pagesToAudit.length; i++) {
    const url = pagesToAudit[i];
    const result = await auditPage(url, sitemapUrls, rules, i);

    // Add PageRank score
    const pageRank = pageRanks.get(url) || 0;
    result.page_rank = pageRank;

    // Flag low PageRank pages
    const path = url.replace(BASE_URL, '');
    const mustIndex = rules.must_index.some(
      (p: string) => path === p || (p.endsWith('*') && path.startsWith(p.slice(0, -1)))
    );

    if (mustIndex && pageRank < 20) {
      result.issues.push({
        type: 'warning',
        category: 'PageRank',
        message: `Low internal authority: ${path} has PageRank score ${pageRank}/100 — add more internal links`,
        impact: 3,
        url
      });
    }

    if (mustIndex && pageRank < 5) {
      result.issues.push({
        type: 'error',
        category: 'PageRank',
        message: `Critical: ${path} has almost no internal authority (${pageRank}/100) — severely under-linked`,
        impact: 5,
        url
      });
    }

    pageResults.push(result);
    if (result.issues) allIssues.push(...result.issues);
  }
  timings['page_audit'] = Date.now() - t0;

  // Step 5: PageSpeed (priority pages only)
  t0 = Date.now();
  const psiResults: any[] = [];
  if (psiKey) {
    const psiPages = [
      BASE_URL,
      `${BASE_URL}/manned-guarding-london`,
      `${BASE_URL}/mobile-patrols-london`,
      `${BASE_URL}/security-services-city-of-london`,
      `${BASE_URL}/security-services-canary-wharf`,
    ].filter(u => pagesToAudit.includes(u)).slice(0, 5);

    const psiPromises = await Promise.allSettled(
      psiPages.map(u => getPageSpeedData(u, psiKey))
    );

    psiPromises.forEach((r) => {
      if (r.status === 'fulfilled' && !r.value.error) {
        psiResults.push(r.value);

        const m = r.value.mobile;
        if (m) {
          if (m.lcp && parseFloat(m.lcp) >= 4) {
            allIssues.push({
              type: 'error',
              category: 'Core Web Vitals',
              message: `Poor LCP on mobile: ${m.lcp}s (threshold: 2.5s)`,
              impact: 8,
              url: r.value.url
            });
          } else if (m.lcp && parseFloat(m.lcp) >= 2.5) {
            allIssues.push({
              type: 'warning',
              category: 'Core Web Vitals',
              message: `LCP needs improvement on mobile: ${m.lcp}s`,
              impact: 4,
              url: r.value.url
            });
          }

          if (m.cls && parseFloat(m.cls) >= 0.25) {
            allIssues.push({
              type: 'error',
              category: 'Core Web Vitals',
              message: `Poor CLS: ${m.cls} (threshold: 0.1)`,
              impact: 8,
              url: r.value.url
            });
          } else if (m.cls && parseFloat(m.cls) >= 0.1) {
            allIssues.push({
              type: 'warning',
              category: 'Core Web Vitals',
              message: `CLS needs improvement: ${m.cls}`,
              impact: 4,
              url: r.value.url
            });
          }

          if (m.tbt && m.tbt >= 600) {
            allIssues.push({
              type: 'error',
              category: 'Core Web Vitals',
              message: `Poor TBT on mobile: ${m.tbt}ms — JavaScript blocking render`,
              impact: 6,
              url: r.value.url
            });
          }
        }
      }
    });
  }
  timings['pagespeed'] = Date.now() - t0;

  // Step 6: GSC data
  t0 = Date.now();
  const gscData = await getGSCData(gscSiteUrl);
  if (gscData) {
    gscData.rows.forEach((row: any) => {
      const pageResult = pageResults.find(p => p.url === row.url);
      const path = row.url.replace(BASE_URL, '');
      const mustIndex = rules.must_index.some(
        (p: string) => path === p || (p.endsWith('*') && path.startsWith(p.slice(0, -1)))
      );

      if (mustIndex && row.impressions === 0) {
        allIssues.push({
          type: 'warning',
          category: 'GSC',
          message: `Priority page has zero impressions in 28 days: ${path}`,
          impact: 3,
          url: row.url
        });
      }

      if (mustIndex && row.ctr < 1 && row.impressions > 0) {
        allIssues.push({
          type: 'warning',
          category: 'GSC',
          message: `Low CTR: ${path} — ${row.ctr}% CTR from ${row.impressions} impressions`,
          impact: 2,
          url: row.url
        });
      }

      if (mustIndex && row.position > 50) {
        allIssues.push({
          type: 'warning',
          category: 'GSC',
          message: `Page ranking poorly: ${path} — average position ${row.position}`,
          impact: 2,
          url: row.url
        });
      }
    });

    // Check for pages not in GSC data
    pageResults.forEach(p => {
      const path = p.url.replace(BASE_URL, '');
      const mustIndex = rules.must_index.some(
        (rule: string) => path === rule || (rule.endsWith('*') && path.startsWith(rule.slice(0, -1)))
      );

      if (mustIndex && !gscData.rows.find((r: any) => r.url === p.url)) {
        allIssues.push({
          type: 'error',
          category: 'GSC',
          message: `Priority page not ranking for any keyword: ${path}`,
          impact: 4,
          url: p.url
        });
      }
    });
  }
  timings['gsc_data'] = Date.now() - t0;

  // Step 7: Indexing submissions
  t0 = Date.now();
  const indexingCandidates: string[] = [];

  pageResults.forEach(p => {
    const path = p.url.replace(BASE_URL, '');
    const mustIndex = rules.must_index.some(
      (rule: string) => path === rule || (rule.endsWith('*') && path.startsWith(rule.slice(0, -1)))
    );

    if (mustIndex && p.status === 200 && !p.noindex && p.canonical === p.url) {
      const gscRow = gscData?.rows.find((r: any) => r.url === p.url);
      if (!gscRow || gscRow.impressions === 0) {
        indexingCandidates.push(p.url);
      }
    }
  });

  const indexingResult = await submitForIndexing(indexingCandidates, isDryRun);
  timings['indexing'] = Date.now() - t0;

  const wpIssues = await checkWordPressRedirects(redirectMap);
  allIssues.push(...wpIssues);

  const orphanIssues = await checkOrphanedPages(sitemapUrls);
  allIssues.push(...orphanIssues);

  // MODULE 6: Duplicate detection
  t0 = Date.now();
  const duplicateResult = checkDuplicates(pageResults);
  allIssues.push(...duplicateResult.issues);
  timings['duplicates'] = Date.now() - t0;

  // MODULE 14: Near-duplicate detection
  t0 = Date.now();
  const nearDuplicateResult = checkNearDuplicates(pageResults);
  allIssues.push(...nearDuplicateResult.issues);
  timings['near_duplicates'] = Date.now() - t0;

  // MODULE 2: Sitemap health
  t0 = Date.now();
  const sitemapHealth = await checkSitemapHealth(sitemapUrls);
  allIssues.push(...sitemapHealth.issues);
  timings['sitemap_health'] = Date.now() - t0;

  // Calculate raw score
  let rawScore = 100;
  for (const issue of allIssues) {
    rawScore -= issue.impact || 0;
  }
  rawScore = Math.max(0, Math.min(100, rawScore));

  // Calculate calibrated score (remove false positives from non-indexable pages)
  const falsePositives = allIssues.filter(i =>
    i.category === 'Social Tags' &&
    i.url &&
    pageResults.find((p: any) => p.url === i.url && p.noindex)
  ).reduce((sum, i) => sum + (i.impact || 0), 0);

  const calibratedScore = Math.max(0, Math.min(100, rawScore + falsePositives));
  const score = calibratedScore;
  const improvementFromV4 = score - 0; // v4 score was 0

  const errors = allIssues.filter(i => i.type === 'error');
  const warnings = allIssues.filter(i => i.type === 'warning');
  const notices = allIssues.filter(i => i.type === 'notice');

  const byCategory = allIssues.reduce((acc: any, i: any) => {
    acc[i.category] = (acc[i.category] || 0) + 1;
    return acc;
  }, {});

  // Calculate module-specific metrics
  const structuredDataErrors = allIssues.filter(i => i.category === 'Structured Data' && i.type === 'error').length;
  const brokenImages = allIssues.filter(i => i.category === 'Images' && i.message.includes('Broken')).length;
  const ogIssues = allIssues.filter(i => i.category === 'Social Tags').length;

  // Calculate PageRank module results
  const pageRankArray = Array.from(pageRanks.entries()).map(([url, score]) => ({ url, score }));
  const top5PageRank = pageRankArray.sort((a, b) => b.score - a.score).slice(0, 5);
  const bottom5PageRank = pageRankArray.sort((a, b) => a.score - b.score).slice(0, 5);
  const avgPageRank = pageRankArray.reduce((sum, p) => sum + p.score, 0) / pageRankArray.length;
  const underLinkedPages = pageRankArray.filter(p => p.score < 20).length;

  // Calculate Core Web Vitals module results
  const avgMobileScore = psiResults.length > 0
    ? Math.round(psiResults.reduce((sum, r) => sum + (r.mobile?.performance_score || 0), 0) / psiResults.length)
    : 0;
  const avgDesktopScore = psiResults.length > 0
    ? Math.round(psiResults.reduce((sum, r) => sum + (r.desktop?.performance_score || 0), 0) / psiResults.length)
    : 0;

  // Calculate GSC module results
  const gscConnected = !!gscData;
  const totalClicks28d = gscData ? gscData.rows.reduce((sum: number, r: any) => sum + r.clicks, 0) : 0;
  const totalImpressions28d = gscData ? gscData.rows.reduce((sum: number, r: any) => sum + r.impressions, 0) : 0;
  const avgCTR = gscData && gscData.rows.length > 0
    ? Math.round(gscData.rows.reduce((sum: number, r: any) => sum + r.ctr, 0) / gscData.rows.length * 10) / 10
    : 0;
  const avgPosition = gscData && gscData.rows.length > 0
    ? Math.round(gscData.rows.reduce((sum: number, r: any) => sum + r.position, 0) / gscData.rows.length * 10) / 10
    : 0;

  return NextResponse.json({
    tool: 'Vigil Advanced SEO Auditor v6.0',
    site: 'security.vigilservices.co.uk',
    mode: isDryRun ? 'dry_run' : 'live',
    score,
    grade: score >= 90 ? 'A' : score >= 70 ? 'B' :
           score >= 50 ? 'C' : 'D',
    score_breakdown: {
      raw_score: rawScore,
      false_positives_removed: falsePositives,
      calibrated_score: calibratedScore,
      improvement_from_v4: improvementFromV4,
    },
    ahrefs_comparison: {
      checks_we_now_perform: [
        'HTTP status codes',
        'Canonical tag presence and validity',
        'Canonical trailing slash mismatch',
        'Canonical redirect chain detection',
        'Title tag presence and length',
        'Meta description presence and length',
        'H1 tag presence',
        'Noindex detection with business rules',
        'Word count with page-type thresholds',
        'Forbidden claims compliance check',
        'NAP consistency (phone/email)',
        'Raw HTML entity detection',
        'Sitemap coverage',
        'WordPress URL redirect health',
        'Orphaned page detection',
        'JSON-LD structured data validation',
        'Sitemap redirect and 404 detection',
        'Image alt text and mixed content audit',
        'Open Graph and Twitter Card validation',
        'Outgoing link health and HTTPS check',
        'Duplicate title and meta description detection',
        'HTTP response header validation',
        'URL structure issues (uppercase, double slashes)',
        'Robots.txt syntax and configuration validation',
        'Broken external link detection',
        'Crawl depth analysis (3-level BFS from homepage)',
        'Dynamic page discovery from sitemap + crawl',
        'Indexability-aware OG tag scoring',
        'Historical change detection (title, H1, canonical, word count)',
        'Page size validation against Googlebot 2MB limit',
        'Near-duplicate content detection across same page types',
        'HTML entity decoding for accurate text analysis',
        'Asset file filtering from page audit scope',
        'Full recursive site crawl (BFS)',
        'Internal PageRank estimation',
        'Core Web Vitals (LCP, CLS, TBT) via PageSpeed API',
        'GSC search performance data (clicks, impressions, CTR, position)',
        'Automated indexing submission for zero-impression pages',
        'Write operation audit log',
      ],
      checks_ahrefs_does_we_still_miss: [
        'JavaScript rendering (requires headless browser)',
        'Real CrUX Core Web Vitals from real users',
        'Backlink profile analysis',
        'Keyword ranking tracking beyond GSC',
        'Competitor gap analysis',
      ],
      our_advantage_over_ahrefs: [
        'Business-specific forbidden claims detection',
        'NAP consistency enforcement per our specific details',
        'Page-type aware content thresholds',
        'WordPress migration URL tracking',
        'Division-specific indexability rules',
        'Pre-deployment validation capability',
        'Structured data schema validation per business type',
        'Real-time sitemap health monitoring',
        'Robots.txt configuration validation',
        'Crawl depth measurement and optimization',
        'Internal PageRank calculation without third party',
        'Direct GSC data integration in single dashboard',
        'Automated indexing submission for unranked pages',
        'Full recursive crawl without URL cap restrictions',
        'Write operation security log',
      ],
    },
    summary: {
      total_issues: allIssues.length,
      errors: errors.length,
      warnings: warnings.length,
      notices: notices.length,
      pages_audited: pageResults.length,
      pages_crawled_recursively: crawledPages.length,
      sitemap_urls_found: sitemapUrls.length,
      wordpress_urls_checked: Object.keys(redirectMap).length,
      gsc_connected: gscConnected,
      pagespeed_tested: psiResults.length,
      indexing_candidates: indexingCandidates.length,
    },
    module_results: {
      structured_data: {
        errors: structuredDataErrors,
        warnings: allIssues.filter(i => i.category === 'Structured Data' && i.type === 'warning').length,
      },
      sitemap_health: {
        total_checked: sitemapHealth.total_checked,
        redirecting: sitemapHealth.redirecting,
        broken: sitemapHealth.broken,
        ok: sitemapHealth.ok,
      },
      images: {
        broken: brokenImages,
        missing_alt: allIssues.filter(i => i.category === 'Images' && i.message.includes('missing alt')).length,
        mixed_content: allIssues.filter(i => i.category === 'Images' && i.message.includes('Mixed content')).length,
      },
      social_tags: {
        missing_og: allIssues.filter(i => i.category === 'Social Tags' && i.message.includes('Missing OG')).length,
        twitter_issues: allIssues.filter(i => i.category === 'Social Tags' && i.message.includes('twitter')).length,
      },
      links: {
        pages_no_outgoing: allIssues.filter(i => i.category === 'Links' && i.message.includes('no outgoing')).length,
        http_links: allIssues.filter(i => i.category === 'Links' && i.message.includes('HTTP not HTTPS')).length,
      },
      duplicates: {
        duplicate_titles: duplicateResult.duplicate_titles,
        duplicate_descs: duplicateResult.duplicate_descs,
      },
      headers: {
        noindex_headers: allIssues.filter(i => i.category === 'Headers' && i.message.includes('noindex')).length,
      },
      url_structure: {
        double_slashes: allIssues.filter(i => i.category === 'URL Structure' && i.message.includes('Double slash')).length,
        uppercase: allIssues.filter(i => i.category === 'URL Structure' && i.message.includes('Uppercase')).length,
      },
      robots_txt: {
        accessible: robotsResult.accessible,
        has_sitemap_reference: robotsResult.has_sitemap_reference,
        admin_blocked: robotsResult.admin_blocked,
        issues: robotsResult.issues.length,
      },
      external_links: {
        broken: allIssues.filter(i => i.category === 'External Links' && i.message.includes('Broken')).length,
        http_links: allIssues.filter(i => i.category === 'External Links' && i.message.includes('HTTP not HTTPS')).length,
        timed_out: allIssues.filter(i => i.category === 'External Links' && i.message.includes('timed out')).length,
      },
      crawl_depth: {
        depth_1_pages: crawlDepthResult.depth_1.length,
        depth_2_pages: crawlDepthResult.depth_2.length,
        depth_3_pages: crawlDepthResult.depth_3.length,
        unreachable_pages: crawlDepthResult.unreachable.length,
        depth_map: {
          depth_1: crawlDepthResult.depth_1.map(u => u.replace(BASE_URL, '')),
          depth_2: crawlDepthResult.depth_2.map(u => u.replace(BASE_URL, '')),
          depth_3: crawlDepthResult.depth_3.map(u => u.replace(BASE_URL, '')),
          unreachable: crawlDepthResult.unreachable.map(u => u.replace(BASE_URL, '')),
        },
      },
      changes: {
        title_changes: allIssues.filter(i => i.category === 'Changes' && i.message.includes('Title changed')).length,
        h1_changes: allIssues.filter(i => i.category === 'Changes' && i.message.includes('H1 changed')).length,
        word_count_changes: allIssues.filter(i => i.category === 'Changes' && i.message.includes('Word count changed')).length,
        canonical_changes: allIssues.filter(i => i.category === 'Changes' && i.message.includes('Canonical changed')).length,
        first_run: auditHistory.size === pageResults.length,
      },
      page_size: {
        oversized_pages: allIssues.filter(i => i.category === 'Page Size' && i.message.includes('exceeds')).length,
        large_pages: allIssues.filter(i => i.category === 'Page Size' && i.message.includes('Large page')).length,
        average_size_kb: Math.round(pageResults.reduce((sum: number, r: any) => sum + (r.page_size_kb || 0), 0) / pageResults.length),
      },
      near_duplicates: {
        exact_duplicates: nearDuplicateResult.exact_duplicates,
        near_duplicates: nearDuplicateResult.near_duplicates,
        pairs: nearDuplicateResult.pairs.map(p => ({
          url1: p.url1.replace(BASE_URL, ''),
          url2: p.url2.replace(BASE_URL, ''),
          similarity: Math.round(p.similarity * 100) / 100,
        })),
      },
      pagerank: {
        top_5_pages: top5PageRank.map(p => ({ url: p.url.replace(BASE_URL, ''), score: p.score })),
        bottom_5_pages: bottom5PageRank.map(p => ({ url: p.url.replace(BASE_URL, ''), score: p.score })),
        average_score: Math.round(avgPageRank),
        under_linked_pages: underLinkedPages,
      },
      core_web_vitals: {
        pages_tested: psiResults.length,
        average_mobile_score: avgMobileScore,
        average_desktop_score: avgDesktopScore,
        poor_lcp_pages: allIssues.filter(i => i.category === 'Core Web Vitals' && i.message.includes('Poor LCP')).length,
        poor_cls_pages: allIssues.filter(i => i.category === 'Core Web Vitals' && i.message.includes('Poor CLS')).length,
        poor_tbt_pages: allIssues.filter(i => i.category === 'Core Web Vitals' && i.message.includes('Poor TBT')).length,
        results: psiResults.map(r => ({
          url: r.url.replace(BASE_URL, ''),
          mobile_score: r.mobile?.performance_score || 0,
          desktop_score: r.desktop?.performance_score || 0,
          lcp: r.mobile?.lcp || null,
          cls: r.mobile?.cls || null,
          tbt: r.mobile?.tbt || null,
          grade: r.mobile?.lcp && parseFloat(r.mobile.lcp) < 2.5 && r.mobile?.cls && parseFloat(r.mobile.cls) < 0.1
            ? 'good'
            : r.mobile?.lcp && parseFloat(r.mobile.lcp) < 4 && r.mobile?.cls && parseFloat(r.mobile.cls) < 0.25
            ? 'needs-improvement'
            : 'poor'
        })),
      },
      gsc_data: gscData ? {
        connected: true,
        date_range: `${gscData.startDate} to ${gscData.endDate}`,
        total_clicks_28d: totalClicks28d,
        total_impressions_28d: totalImpressions28d,
        average_ctr: avgCTR,
        average_position: avgPosition,
        pages_with_data: gscData.rows.length,
        pages_zero_impressions: gscData.rows.filter((r: any) => r.impressions === 0).length,
        top_5_pages: gscData.rows.sort((a: any, b: any) => b.clicks - a.clicks).slice(0, 5).map((r: any) => ({
          url: r.url.replace(BASE_URL, ''),
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          position: r.position,
        })),
        bottom_5_pages: gscData.rows.sort((a: any, b: any) => a.impressions - b.impressions).slice(0, 5).map((r: any) => ({
          url: r.url.replace(BASE_URL, ''),
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          position: r.position,
        })),
        all_pages: gscData.rows.map((r: any) => ({
          url: r.url.replace(BASE_URL, ''),
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          position: r.position,
        })),
      } : {
        connected: false,
        date_range: null,
        total_clicks_28d: 0,
        total_impressions_28d: 0,
        average_ctr: 0,
        average_position: 0,
        pages_with_data: 0,
        pages_zero_impressions: 0,
        top_5_pages: [],
        bottom_5_pages: [],
        all_pages: [],
      },
      indexing_submissions: {
        dry_run: isDryRun,
        urls_submitted: indexingResult.submitted,
        urls_eligible: indexingResult.total_eligible,
        results: indexingResult.results,
        quota_remaining: indexingResult.quota_remaining,
      },
    },
    write_operation_log: writeOperationLog,
    module_timings_ms: timings,
    by_category: byCategory,
    critical_issues: errors.slice(0, 20),
    warnings: warnings.slice(0, 20),
    page_results: pageResults.map(r => ({
      url: r.url,
      status: r.status,
      title: r.title,
      canonical_ok: r.canonical === r.url?.replace(/\/$/, ''),
      noindex: r.noindex,
      word_count: r.word_count,
      page_type: r.page_type,
      in_sitemap: r.in_sitemap,
      has_h1: !!r.h1,
      forbidden_claims: r.forbidden_claims,
      nap_phone_ok: r.nap_phone_ok,
      page_rank: r.page_rank || 0,
      issue_count: r.issues?.length || 0,
    })),
    duration_ms: Date.now() - start,
    checked_at: new Date().toISOString(),
  });
}
