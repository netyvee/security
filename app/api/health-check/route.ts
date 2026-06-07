import { NextResponse } from 'next/server';
import indexabilityRules from '@/config/indexability-rules.json';

const BASE_URL = 'https://security.vigilservices.co.uk';
const MAX_PAGES = 200;
const MAX_DEPTH = 8;
const AUDIT_TIMEOUT = 90000;
const PER_PAGE_TIMEOUT = 8000;

const UK_SPELLING_MAP: Record<string, string> = {
  'organize': 'organise',
  'organized': 'organised',
  'organizing': 'organising',
  'organization': 'organisation',
  'organizations': 'organisations',
  'recognize': 'recognise',
  'recognized': 'recognised',
  'recognizing': 'recognising',
  'analyze': 'analyse',
  'analyzed': 'analysed',
  'analyzing': 'analysing',
  'optimize': 'optimise',
  'optimized': 'optimised',
  'optimizing': 'optimising',
  'optimization': 'optimisation',
  'maximize': 'maximise',
  'maximized': 'maximised',
  'minimize': 'minimise',
  'minimized': 'minimised',
  'customize': 'customise',
  'customized': 'customised',
  'standardize': 'standardise',
  'standardized': 'standardised',
  'prioritize': 'prioritise',
  'prioritized': 'prioritised',
  'specialize': 'specialise',
  'specialized': 'specialised',
  'utilize': 'utilise',
  'utilized': 'utilised',
  'color': 'colour',
  'colors': 'colours',
  'colored': 'coloured',
  'labor': 'labour',
  'neighbor': 'neighbour',
  'neighbors': 'neighbours',
  'center': 'centre',
  'centers': 'centres',
  'defense': 'defence',
  'offense': 'offence',
  'license': 'licence',
  'licenses': 'licences',
  'fulfill': 'fulfil',
  'traveling': 'travelling',
  'traveled': 'travelled',
  'canceled': 'cancelled',
  'canceling': 'cancelling',
  'modeled': 'modelled',
  'modeling': 'modelling',
  'program': 'programme',
  'programs': 'programmes',
  'behavior': 'behaviour',
  'behaviors': 'behaviours',
  'behavioral': 'behavioural',
  'endeavor': 'endeavour',
  'humor': 'humour',
  'rumor': 'rumour',
  'armor': 'armour',
};

const UK_VOCABULARY_MAP: Record<string, string> = {
  'garbage': 'waste',
  'trash': 'rubbish',
  'apartment': 'flat',
  'apartments': 'flats',
  'elevator': 'lift',
  'elevators': 'lifts',
  'gotten': 'got',
  'sidewalk': 'pavement',
  'zip code': 'postcode',
  'downtown': 'city centre',
  'real estate': 'property',
  'cell phone': 'mobile phone',
  'attorney': 'solicitor',
  'vacation': 'holiday',
  'math': 'maths',
  'fall semester': 'autumn semester',
};

const FORBIDDEN_DOMESTIC_TERMS = [
  'for your home',
  'your home',
  'residential cleaning',
  'domestic cleaning',
  'house cleaning',
  'home cleaning',
  'homeowner',
  'homeowners',
];

const PLACEHOLDER_PATTERNS = [
  /\[your [^\]]+\]/gi,
  /\[insert [^\]]+\]/gi,
  /\[add [^\]]+\]/gi,
  /lorem ipsum/gi,
  /placeholder text/gi,
  /\[TBD\]/gi,
  /\[TODO\]/gi,
  /example\.com/gi,
  /yourdomain\.com/gi,
];

const BRAND_VARIATIONS = [
  'Vigil Cleaning',
  'vigil cleaning',
  'Vigil Services Ltd Cleaning',
  'VIGIL CLEANING',
];

const CORRECT_BRAND_NAME = 'Vigil Cleaning Services';

interface AuditIssue {
  url: string;
  type: 'error' | 'warning' | 'notice';
  category: string;
  message: string;
  impact: number;
  fix?: string;
}

interface PageResult {
  url: string;
  status: number;
  canonical_ok: boolean;
  canonical_redirect: boolean;
  indexable: boolean;
  in_sitemap: boolean;
  has_h1: boolean;
  word_count: number;
  issue_count: number;
  title_length?: number;
  meta_desc_length?: number;
  has_og_tags?: boolean;
  schema_types?: string[];
  crawl_depth?: number;
  internal_links_count?: number;
  external_links_count?: number;
  page_size_kb?: number;
  cwv_lcp?: number;
  cwv_fid?: number;
  cwv_cls?: number;
  mobile_score?: number;
  desktop_score?: number;
  gsc_impressions?: number;
  gsc_clicks?: number;
  gsc_ctr?: number;
  gsc_position?: number;
  estimated_pagerank?: number;
}

async function getServiceAccountToken(): Promise<string | null> {
  try {
    const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!saJson) return null;

    const sa = JSON.parse(saJson);
    const now = Math.floor(Date.now() / 1000);
    const expiry = now + 3600;

    const header = Buffer.from(
      JSON.stringify({ alg: 'RS256', typ: 'JWT' })
    ).toString('base64url');

    const payload = Buffer.from(
      JSON.stringify({
        iss: sa.client_email,
        scope: 'https://www.googleapis.com/auth/indexing',
        aud: 'https://oauth2.googleapis.com/token',
        exp: expiry,
        iat: now,
      })
    ).toString('base64url');

    const crypto = await import('crypto');
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(`${header}.${payload}`);
    const signature = sign
      .sign(sa.private_key, 'base64url');

    const jwt = `${header}.${payload}.${signature}`;

    const tokenRes = await fetch(
      'https://oauth2.googleapis.com/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type:
            'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: jwt,
        }),
      }
    );

    const tokenData = await tokenRes.json();
    return tokenData.access_token || null;
  } catch {
    return null;
  }
}

async function fetchPage(
  url: string,
  timeout = 10000
): Promise<{ status: number; html: string; headers: Headers; fetchStartTime: number; fetchEndTime: number }> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const fetchStartTime = Date.now();
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'VigilAuditor/8.0' },
      redirect: 'follow',
    });
    clearTimeout(id);
    const fetchEndTime = Date.now();
    const html = await res.text();
    await new Promise(r => setTimeout(r, 100));
    return { status: res.status, html, headers: res.headers, fetchStartTime, fetchEndTime };
  } catch {
    clearTimeout(id);
    const fetchEndTime = Date.now();
    return { status: 0, html: '', headers: new Headers(), fetchStartTime, fetchEndTime };
  }
}

async function fetchNoRedirect(url: string): Promise<number> {
  try {
    const res = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': 'VigilAuditor/8.0' },
      signal: AbortSignal.timeout(8000),
    });
    return res.status;
  } catch {
    return 0;
  }
}

function extractCanonical(html: string): string | null {
  const match = html.match(
    /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i
  );
  return match ? match[1] : null;
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  return match ? match[1].trim() : null;
}

function extractMetaDesc(html: string): string | null {
  const match = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i
  );
  return match ? match[1].trim() : null;
}

function extractH1(html: string): string[] {
  const matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
  return matches.map(m =>
    m.replace(/<\/?h1[^>]*>/gi, '').trim()
  );
}

function isNoIndex(html: string): boolean {
  return /name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(
    html
  );
}

function countWords(html: string): number {
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

async function checkUKEnglish(
  html: string,
  pageUrl: string
): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const textLower = text.toLowerCase();

  const spellingErrors: string[] = [];
  for (const [usSpelling, ukSpelling] of Object.entries(UK_SPELLING_MAP)) {
    const regex = new RegExp(`\\b${usSpelling}\\b`, 'gi');
    if (regex.test(textLower)) {
      spellingErrors.push(`"${usSpelling}" → "${ukSpelling}"`);
    }
  }

  if (spellingErrors.length > 0) {
    issues.push({
      type: 'error',
      category: 'UK English',
      message: `US spelling found (${spellingErrors.length}): ${spellingErrors.slice(0, 5).join(', ')}`,
      impact: 5,
      url: pageUrl,
      fix: `Replace US spellings with UK equivalents: ${spellingErrors.slice(0, 3).join('; ')}`,
    });
  }

  const vocabErrors: string[] = [];
  for (const [usTerm, ukTerm] of Object.entries(UK_VOCABULARY_MAP)) {
    const regex = new RegExp(`\\b${usTerm.replace(/\s+/g, '\\s+')}\\b`, 'gi');
    if (regex.test(textLower)) {
      vocabErrors.push(`"${usTerm}" → "${ukTerm}"`);
    }
  }

  if (vocabErrors.length > 0) {
    issues.push({
      type: 'warning',
      category: 'UK English',
      message: `Non-UK vocabulary: ${vocabErrors.join(', ')}`,
      impact: 3,
      url: pageUrl,
      fix: `Replace with UK equivalents: ${vocabErrors.join('; ')}`,
    });
  }

  for (const term of FORBIDDEN_DOMESTIC_TERMS) {
    if (textLower.includes(term.toLowerCase())) {
      issues.push({
        type: 'error',
        category: 'B2B Positioning',
        message: `Domestic language on B2B site: "${term}"`,
        impact: 6,
        url: pageUrl,
        fix: `Remove "${term}" — replace with B2B equivalent such as "your business premises"`,
      });
    }
  }

  for (const pattern of PLACEHOLDER_PATTERNS) {
    pattern.lastIndex = 0;
    const match = pattern.exec(text);
    if (match) {
      issues.push({
        type: 'error',
        category: 'Content Quality',
        message: `Placeholder text found: "${match[0]}"`,
        impact: 8,
        url: pageUrl,
        fix: `Replace placeholder "${match[0]}" with actual content`,
      });
    }
  }

  return issues;
}

async function checkBrandConsistency(
  html: string,
  pageUrl: string
): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  for (const variant of BRAND_VARIATIONS) {
    const regex = new RegExp(
      variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      'g'
    );
    const matches = text.match(regex);
    if (matches && matches.length > 0) {
      issues.push({
        type: 'warning',
        category: 'Brand Consistency',
        message: `Brand name variant "${variant}" found ${matches.length}x — use "${CORRECT_BRAND_NAME}"`,
        impact: 2,
        url: pageUrl,
        fix: `Replace all instances of "${variant}" with "${CORRECT_BRAND_NAME}"`,
      });
    }
  }

  return issues;
}

async function checkLanguageTool(
  html: string,
  pageUrl: string
): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 1500);

  if (text.length < 100) return issues;

  try {
    const res = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text,
        language: 'en-GB',
        enabledOnly: 'false',
        disabledRules:
          'WHITESPACE_RULE,EN_QUOTES,COMMA_PARENTHESIS_WHITESPACE',
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return issues;

    interface LanguageToolMatch {
      message: string;
      replacements?: Array<{ value: string }>;
      context?: { text: string; offset: number; length: number };
      rule?: { category?: { id: string }; id?: string };
      type?: { typeName: string };
    }

    const data = await res.json();
    const matches = (data.matches || [])
      .filter(
        (m: LanguageToolMatch) =>
          m.replacements?.length && m.replacements.length > 0 &&
          m.rule?.category?.id !== 'TYPOS' &&
          m.type?.typeName !== 'UnknownWord'
      )
      .slice(0, 5);

    for (const match of matches as LanguageToolMatch[]) {
      const suggestion = match.replacements?.[0]?.value || '';
      const contextText = match.context?.text || '';
      const offset = match.context?.offset || 0;
      const length = match.context?.length || 0;
      const excerpt = contextText.slice(
        Math.max(0, offset - 15),
        offset + length + 15
      );

      issues.push({
        type: 'warning',
        category: 'Grammar',
        message: `${match.message}: "...${excerpt}..."`,
        impact: 2,
        url: pageUrl,
        fix: suggestion ? `Suggested: "${suggestion}"` : match.message,
      });
    }
  } catch {
    // LanguageTool unavailable — skip gracefully
  }

  return issues;
}

function checkForbiddenClaims(
  html: string,
  url: string
): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const forbidden = indexabilityRules.forbidden_claims || [];

  for (const claim of forbidden) {
    const regex = new RegExp(claim, 'i');
    if (regex.test(html)) {
      issues.push({
        url,
        type: 'error',
        category: 'Claims Compliance',
        message: `Forbidden claim found: "${claim}"`,
        impact: 10,
        fix: `Remove or replace unverifiable claim "${claim}"`,
      });
    }
  }

  return issues;
}

function checkNAP(html: string, url: string): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const nap = indexabilityRules.nap;

  if (!html.includes(nap.phone)) {
    issues.push({
      url,
      type: 'warning',
      category: 'NAP Consistency',
      message: 'Phone number missing or inconsistent',
      impact: 4,
    });
  }

  if (
    !html.includes(nap.email) &&
    !url.includes('/privacy') &&
    !url.includes('/cookie')
  ) {
    issues.push({
      url,
      type: 'notice',
      category: 'NAP Consistency',
      message: 'Email address missing',
      impact: 2,
    });
  }

  return issues;
}

function checkHtmlEntities(
  html: string,
  url: string
): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const visibleText = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  const rawEntities = visibleText.match(/&[a-z]+;/gi) || [];
  if (rawEntities.length > 0) {
    const unique = Array.from(new Set(rawEntities));
    issues.push({
      url,
      type: 'warning',
      category: 'Content',
      message: `Raw HTML entities found in content: ${unique.join(', ')}`,
      impact: 3,
      fix: 'Use React {String.fromCharCode(...)} or plain characters',
    });
  }

  return issues;
}

function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };

  let decoded = text;
  for (const [entity, char] of Object.entries(entities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }

  return decoded;
}

async function getSitemapUrls(): Promise<string[]> {
  try {
    const { html } = await fetchPage(`${BASE_URL}/sitemap.xml`);
    const matches = html.match(/<loc>(.*?)<\/loc>/g) || [];
    return matches.map(m =>
      m.replace(/<\/?loc>/g, '').trim()
    );
  } catch {
    return [];
  }
}

async function auditPage(
  url: string,
  sitemapUrls: string[],
  allAuditedUrls: Set<string>
): Promise<{ result: PageResult; issues: AuditIssue[]; headers: Headers; fetchStartTime: number; fetchEndTime: number; html: string }> {
  const issues: AuditIssue[] = [];
  const { status, html, headers, fetchStartTime, fetchEndTime } = await fetchPage(url);

  const result: PageResult = {
    url,
    status,
    canonical_ok: false,
    canonical_redirect: false,
    indexable: true,
    in_sitemap: sitemapUrls.includes(url),
    has_h1: false,
    word_count: 0,
    issue_count: 0,
  };

  if (status === 0) {
    issues.push({
      url,
      type: 'error',
      category: 'Connectivity',
      message: 'Page unreachable',
      impact: 10,
      fix: 'Check deployment status and URL configuration',
    });
    result.issue_count = issues.length;
    return { result, issues, headers, fetchStartTime, fetchEndTime, html };
  }

  if (status >= 400) {
    issues.push({
      url,
      type: 'error',
      category: 'HTTP Status',
      message: `HTTP ${status}`,
      impact: 10,
      fix: status === 404 ? 'Create page or remove from sitemap' : 'Fix server error',
    });
    result.issue_count = issues.length;
    return { result, issues, headers, fetchStartTime, fetchEndTime, html };
  }

  const canonical = extractCanonical(html);
  if (!canonical) {
    issues.push({
      url,
      type: 'error',
      category: 'Indexability',
      message: 'Missing canonical tag',
      impact: 8,
      fix: 'Add canonical: <link rel="canonical" href="..." />',
    });
  } else {
    const urlNorm = url.replace(/\/$/, '');
    const canonNorm = canonical.replace(/\/$/, '');
    result.canonical_ok = urlNorm === canonNorm;

    if (!result.canonical_ok) {
      const canonStatus = await fetchNoRedirect(canonical);
      result.canonical_redirect =
        canonStatus >= 300 && canonStatus < 400;

      issues.push({
        url,
        type: result.canonical_redirect ? 'error' : 'warning',
        category: 'Canonical',
        message: result.canonical_redirect
          ? `Canonical ${canonical} redirects (HTTP ${canonStatus})`
          : `Canonical mismatch: points to ${canonical}`,
        impact: result.canonical_redirect ? 9 : 5,
        fix: result.canonical_redirect
          ? 'Fix canonical to point to final destination'
          : 'Ensure canonical matches page URL',
      });
    }
  }

  const title = extractTitle(html);
  if (!title) {
    issues.push({
      url,
      type: 'error',
      category: 'SEO',
      message: 'Missing title tag',
      impact: 9,
      fix: 'Add title tag with focus keyword + benefit + brand suffix',
    });
  } else {
    result.title_length = title.length;
    if (title.length < 30) {
      issues.push({
        url,
        type: 'warning',
        category: 'SEO',
        message: `Title too short: ${title.length} chars (min 55)`,
        impact: 5,
        fix: 'Expand title to 55-63 characters with benefit statement',
      });
    } else if (title.length > 70) {
      issues.push({
        url,
        type: 'warning',
        category: 'SEO',
        message: `Title too long: ${title.length} chars (max 63)`,
        impact: 4,
        fix: 'Shorten to under 63 characters — keep focus keyword at start',
      });
    }

    const decodedTitle = decodeHtmlEntities(title);
    const vigils = (decodedTitle.match(/vigil/gi) || []).length;
    if (vigils > 1) {
      issues.push({
        url,
        type: 'warning',
        category: 'SEO',
        message: `Title repeats brand ${vigils} times`,
        impact: 4,
        fix: 'Remove duplicate "Vigil" — template adds | Vigil',
      });
    }
  }

  const metaDesc = extractMetaDesc(html);
  if (!metaDesc) {
    issues.push({
      url,
      type: 'error',
      category: 'SEO',
      message: 'Missing meta description',
      impact: 7,
      fix: 'Add 145-155 character meta description with focus keyword and CTA',
    });
  } else {
    result.meta_desc_length = metaDesc.length;
    if (metaDesc.length < 120) {
      issues.push({
        url,
        type: 'warning',
        category: 'SEO',
        message: `Meta description too short: ${metaDesc.length} chars (min 145)`,
        impact: 5,
        fix: 'Expand to 145-155 characters with benefit statement and CTA',
      });
    } else if (metaDesc.length > 160) {
      issues.push({
        url,
        type: 'warning',
        category: 'SEO',
        message: `Meta description too long: ${metaDesc.length} chars (max 155)`,
        impact: 4,
        fix: 'Shorten to under 155 characters — remove supplementary clauses',
      });
    }
  }

  const h1s = extractH1(html);
  result.has_h1 = h1s.length > 0;

  if (h1s.length === 0) {
    issues.push({
      url,
      type: 'error',
      category: 'SEO',
      message: 'No H1 found',
      impact: 8,
      fix: 'Add <h1 className="sr-only">{focus_keyword}</h1> as first element in page component before the main content',
    });
  } else if (h1s.length > 1) {
    issues.push({
      url,
      type: 'warning',
      category: 'SEO',
      message: `Multiple H1s: ${h1s.length} found`,
      impact: 5,
      fix: 'Use only one H1 per page',
    });
  }

  result.word_count = countWords(html);
  const path = url.replace(BASE_URL, '') || '/';

  let pageType = 'service_page';
  for (const [pattern, type] of Object.entries(
    indexabilityRules.page_types
  )) {
    if (pattern.includes('*')) {
      const regex = new RegExp(
        '^' + pattern.replace(/\*/g, '.*') + '$'
      );
      if (regex.test(path)) {
        pageType = type;
        break;
      }
    } else if (pattern === path) {
      pageType = type;
      break;
    }
  }

  const thresholds: Record<string, number> =
    indexabilityRules.content_thresholds;
  const minWords = thresholds[pageType] || 500;

  if (result.word_count < minWords) {
    issues.push({
      url,
      type: 'error',
      category: 'Content',
      message: `Thin content: ${result.word_count} words found, ${minWords} required for ${pageType}`,
      impact: 8,
      fix: `Add visible introductory content. Target minimum ${minWords} words. Add a section describing the service, location, and key benefits above or below the qualification flow.`,
    });
  }

  result.indexable = !isNoIndex(html);
  const mustIndex = indexabilityRules.must_index.some(p =>
    path === p
  );
  const mustNoindex = indexabilityRules.must_noindex.some(p =>
    p.endsWith('*')
      ? path.startsWith(p.replace('*', ''))
      : path === p
  );

  if (mustIndex && !result.indexable) {
    issues.push({
      url,
      type: 'error',
      category: 'Indexability',
      message: 'Priority page has noindex',
      impact: 10,
      fix: 'Remove noindex directive',
    });
  }

  if (!mustIndex && !mustNoindex && !result.in_sitemap) {
    issues.push({
      url,
      type: 'warning',
      category: 'Sitemap',
      message: 'Not in sitemap',
      impact: 4,
      fix: 'Add page to app/sitemap.ts or update priority_pages array',
    });
  }

  issues.push(...checkForbiddenClaims(html, url));
  issues.push(...checkNAP(html, url));
  issues.push(...checkHtmlEntities(html, url));

  const brokenLinkIssues = await checkBrokenOutboundLinks(html, url, allAuditedUrls);
  issues.push(...brokenLinkIssues);

  const httpsIssues = await checkHTTPS(html, url, headers);
  issues.push(...httpsIssues);

  const perfIssues = await checkPerformance(html, url, headers, fetchStartTime, fetchEndTime);
  issues.push(...perfIssues);

  const aiIssues = await checkAISearchReadiness(html, url);
  issues.push(...aiIssues);

  result.issue_count = issues.length;
  return { result, issues, headers, fetchStartTime, fetchEndTime, html };
}

async function validateStructuredData(
  url: string
): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];
  const { html } = await fetchPage(url);

  const schemaMatches =
    html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) ||
    [];

  if (schemaMatches.length === 0) {
    issues.push({
      url,
      type: 'warning',
      category: 'Structured Data',
      message: 'No JSON-LD schema found',
      impact: 6,
      fix: 'Add Organization, LocalBusiness, or Service schema',
    });
    return issues;
  }

  const types: string[] = [];

  for (const match of schemaMatches) {
    const jsonText = match
      .replace(/<script[^>]*>/i, '')
      .replace(/<\/script>/i, '')
      .trim();

    try {
      const schema = JSON.parse(jsonText);
      const type = Array.isArray(schema)
        ? schema.map(s => s['@type']).filter(Boolean)
        : [schema['@type']];

      types.push(...type.filter(Boolean));
    } catch {
      issues.push({
        url,
        type: 'error',
        category: 'Structured Data',
        message: 'Invalid JSON-LD syntax',
        impact: 7,
        fix: 'Fix JSON-LD parsing errors',
      });
    }
  }

  if (!types.includes('Organization')) {
    issues.push({
      url,
      type: 'notice',
      category: 'Structured Data',
      message: 'Organization schema missing',
      impact: 3,
      fix: 'Add Organization schema to root layout',
    });
  }

  return issues;
}

async function checkSitemapHealth(): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];
  const { status, html } = await fetchPage(
    `${BASE_URL}/sitemap.xml`
  );

  if (status !== 200) {
    issues.push({
      url: `${BASE_URL}/sitemap.xml`,
      type: 'error',
      category: 'Sitemap',
      message: `Sitemap returns HTTP ${status}`,
      impact: 9,
    });
    return issues;
  }

  const urls = html.match(/<loc>(.*?)<\/loc>/g) || [];
  if (urls.length === 0) {
    issues.push({
      url: `${BASE_URL}/sitemap.xml`,
      type: 'error',
      category: 'Sitemap',
      message: 'Sitemap contains no URLs',
      impact: 10,
    });
  }

  return issues;
}

async function auditImages(url: string): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];
  const { html } = await fetchPage(url);

  const imgTags = html.match(/<img[^>]+>/gi) || [];
  let missingAlt = 0;
  let brokenImages = 0;
  let nonWebP = 0;

  for (const img of imgTags) {
    if (!/alt=["'][^"']*["']/i.test(img)) {
      missingAlt++;
    }

    const srcMatch = img.match(/src=["']([^"']+)["']/i);
    if (!srcMatch) continue;

    let imageSrc = srcMatch[1];
    const reportSrc = imageSrc;

    if (imageSrc.includes('/_next/image')) {
      try {
        const imgUrl = new URL(imageSrc, BASE_URL);
        const urlParam = imgUrl.searchParams.get('url');
        if (urlParam) {
          imageSrc = decodeURIComponent(urlParam);
        }
      } catch {
        // Invalid URL — skip decoding
      }
    }

    if (imageSrc.startsWith('/')) {
      imageSrc = BASE_URL + imageSrc;
    }

    if (!imageSrc.startsWith('http')) continue;

    try {
      const headRes = await fetch(imageSrc, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000),
      });

      if (!headRes.ok) {
        brokenImages++;
        continue;
      }

      const contentLength = headRes.headers.get('content-length');
      const contentType = headRes.headers.get('content-type') || '';

      if (contentLength) {
        const sizeBytes = parseInt(contentLength, 10);
        if (sizeBytes > 500000) {
          issues.push({
            url,
            type: 'error',
            category: 'Images',
            message: `Image too large: ${Math.round(sizeBytes / 1024)}KB at ${reportSrc}`,
            impact: 7,
            fix: 'Compress image to under 200KB or use WebP format',
          });
        }
      }

      if (
        !contentType.includes('webp') &&
        !contentType.includes('avif') &&
        (contentType.includes('jpeg') ||
          contentType.includes('jpg') ||
          contentType.includes('png'))
      ) {
        nonWebP++;
      }
    } catch {
      // HEAD request failed — skip size check
    }
  }

  if (missingAlt > 0) {
    issues.push({
      url,
      type: 'warning',
      category: 'Accessibility',
      message: `${missingAlt} images missing alt text`,
      impact: 5,
      fix: 'Add descriptive alt text to all images',
    });
  }

  if (brokenImages > 0) {
    issues.push({
      url,
      type: 'error',
      category: 'Images',
      message: `${brokenImages} broken images (404 or unreachable)`,
      impact: 8,
      fix: 'Fix or remove broken image references',
    });
  }

  if (nonWebP > 2) {
    issues.push({
      url,
      type: 'warning',
      category: 'Images',
      message: `${nonWebP} images not served as WebP/AVIF`,
      impact: 4,
      fix: 'Convert JPEG/PNG to WebP for better performance',
    });
  }

  return issues;
}

async function checkOpenGraph(url: string): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];
  const { html } = await fetchPage(url);

  const ogTitle = /property=["']og:title["']/i.test(html);
  const ogDesc = /property=["']og:description["']/i.test(html);
  const ogImage = /property=["']og:image["']/i.test(html);

  if (!ogTitle || !ogDesc || !ogImage) {
    issues.push({
      url,
      type: 'warning',
      category: 'Open Graph',
      message: 'Incomplete OG tags',
      impact: 4,
      fix: 'Add og:title, og:description, og:image',
    });
  }

  return issues;
}

async function checkOutgoingLinks(
  url: string
): Promise<{ internal: number; external: number; issues: AuditIssue[] }> {
  const issues: AuditIssue[] = [];
  const { html } = await fetchPage(url);

  const links = html.match(/<a[^>]+href=["']([^"']+)["']/gi) || [];
  let internal = 0;
  let external = 0;

  for (const link of links) {
    const hrefMatch = link.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1];

    if (href.startsWith('/') || href.includes(BASE_URL)) {
      internal++;
    } else if (href.startsWith('http')) {
      external++;
    }
  }

  if (external === 0 && !url.includes('/privacy') && !url.includes('/cookie')) {
    issues.push({
      url,
      type: 'notice',
      category: 'SEO',
      message: 'No external authority links',
      impact: 3,
      fix: 'Add 2-3 links to HSE, CQC, or BICSc',
    });
  }

  return { internal, external, issues };
}

async function checkDuplicates(
  pages: PageResult[]
): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];
  const titles = new Map<string, string[]>();
  const metas = new Map<string, string[]>();

  for (const page of pages) {
    const { html } = await fetchPage(page.url);
    const pageTitle = extractTitle(html);
    const pageMeta = extractMetaDesc(html);

    if (pageTitle) {
      if (!titles.has(pageTitle)) titles.set(pageTitle, []);
      titles.get(pageTitle)!.push(page.url);
    }

    if (pageMeta) {
      if (!metas.has(pageMeta)) metas.set(pageMeta, []);
      metas.get(pageMeta)!.push(page.url);
    }
  }

  for (const [, urls] of Array.from(titles.entries())) {
    if (urls.length > 1) {
      issues.push({
        url: urls[0],
        type: 'error',
        category: 'Duplicates',
        message: `Duplicate title on ${urls.length} pages`,
        impact: 9,
        fix: `Make titles unique. Found on: ${urls.join(', ')}`,
      });
    }
  }

  for (const [, urls] of Array.from(metas.entries())) {
    if (urls.length > 1) {
      issues.push({
        url: urls[0],
        type: 'error',
        category: 'Duplicates',
        message: `Duplicate meta description on ${urls.length} pages`,
        impact: 8,
        fix: `Make meta descriptions unique. Found on: ${urls.join(', ')}`,
      });
    }
  }

  return issues;
}

async function checkHeaders(url: string): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];
  const { headers } = await fetchPage(url);

  const csp = headers.get('content-security-policy');
  const hsts = headers.get('strict-transport-security');
  const xFrame = headers.get('x-frame-options');

  if (!csp) {
    issues.push({
      url,
      type: 'notice',
      category: 'Security',
      message: 'CSP header missing',
      impact: 2,
    });
  }

  if (!hsts) {
    issues.push({
      url,
      type: 'warning',
      category: 'Security',
      message: 'HSTS header missing',
      impact: 3,
    });
  }

  if (!xFrame) {
    issues.push({
      url,
      type: 'notice',
      category: 'Security',
      message: 'X-Frame-Options missing',
      impact: 2,
    });
  }

  return issues;
}

function checkURLStructure(url: string): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const path = url.replace(BASE_URL, '');

  if (path.includes('_')) {
    issues.push({
      url,
      type: 'warning',
      category: 'URL Structure',
      message: 'Underscores in URL (use hyphens)',
      impact: 3,
    });
  }

  if (path.length > 100) {
    issues.push({
      url,
      type: 'warning',
      category: 'URL Structure',
      message: `URL too long: ${path.length} chars`,
      impact: 4,
    });
  }

  if (/[A-Z]/.test(path)) {
    issues.push({
      url,
      type: 'warning',
      category: 'URL Structure',
      message: 'URL contains uppercase letters',
      impact: 5,
      fix: 'Use lowercase URLs only',
    });
  }

  return issues;
}

async function validateRobotsTxt(): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];
  const { status, html } = await fetchPage(`${BASE_URL}/robots.txt`);

  if (status !== 200) {
    issues.push({
      url: `${BASE_URL}/robots.txt`,
      type: 'error',
      category: 'Robots',
      message: 'robots.txt not found',
      impact: 7,
    });
    return issues;
  }

  const hasUserAgent = /User-agent:/i.test(html);
  const hasSitemap = /Sitemap:/i.test(html);

  if (!hasUserAgent) {
    issues.push({
      url: `${BASE_URL}/robots.txt`,
      type: 'error',
      category: 'Robots',
      message: 'robots.txt missing User-agent',
      impact: 6,
    });
  }

  if (!hasSitemap) {
    issues.push({
      url: `${BASE_URL}/robots.txt`,
      type: 'warning',
      category: 'Robots',
      message: 'robots.txt missing Sitemap directive',
      impact: 4,
    });
  }

  const aiCrawlers = [
    { name: 'GPTBot', agent: 'GPTBot' },
    { name: 'ClaudeBot', agent: 'ClaudeBot' },
    { name: 'PerplexityBot', agent: 'PerplexityBot' },
    { name: 'Googlebot-Extended', agent: 'Google-Extended' },
    { name: 'CCBot', agent: 'CCBot' },
  ];

  for (const crawler of aiCrawlers) {
    const isBlocked =
      html.includes(`User-agent: ${crawler.agent}`) && html.includes('Disallow: /');

    if (isBlocked) {
      issues.push({
        type: 'error',
        category: 'AI Search',
        message: `${crawler.name} is blocked in robots.txt — site will not appear in ${
          crawler.name === 'GPTBot'
            ? 'ChatGPT'
            : crawler.name === 'ClaudeBot'
            ? 'Claude'
            : crawler.name === 'PerplexityBot'
            ? 'Perplexity'
            : 'AI search'
        }`,
        impact: 5,
        url: `${BASE_URL}/robots.txt`,
        fix: `Remove or modify the ${crawler.agent} block in robots.txt to allow AI crawlers access`,
      });
    }
  }

  return issues;
}

async function checkExternalLinks(url: string): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];
  const { html } = await fetchPage(url);

  const links = html.match(/<a[^>]+href=["']([^"']+)["']/gi) || [];
  const external: string[] = [];

  for (const link of links) {
    const hrefMatch = link.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1];

    if (
      href.startsWith('http') &&
      !href.includes('vigilservices.co.uk')
    ) {
      external.push(href);
    }
  }

  const authorities = [
    'hse.gov.uk',
    'cqc.org.uk',
    'gov.uk',
    'bics.org.uk',
  ];

  const hasAuthority = external.some(link =>
    authorities.some(auth => link.includes(auth))
  );

  if (!hasAuthority && !url.includes('/privacy') && !url.includes('/cookie')) {
    issues.push({
      url,
      type: 'notice',
      category: 'EEAT',
      message: 'No authoritative external links',
      impact: 3,
      fix: 'Add 2-3 links to HSE, CQC, or GOV.UK',
    });
  }

  return issues;
}

async function checkBrokenOutboundLinks(
  html: string,
  pageUrl: string,
  allAuditedUrls: Set<string>
): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];

  const hrefMatches = html.match(/href=["']([^"'#?]+)["']/gi) || [];

  const internalLinks = hrefMatches
    .map(h => {
      const match = h.match(/href=["']([^"'#?]+)["']/i);
      return match ? match[1] : null;
    })
    .filter(Boolean)
    .map(href => {
      if (href!.startsWith('http')) return href!;
      if (href!.startsWith('/')) return `${BASE_URL}${href}`;
      return null;
    })
    .filter(Boolean)
    .filter(url => url!.includes(new URL(BASE_URL).hostname)) as string[];

  const uniqueLinks = Array.from(new Set(internalLinks))
    .filter(url => !allAuditedUrls.has(url))
    .slice(0, 20);

  const results = await Promise.allSettled(
    uniqueLinks.map(async (url) => {
      try {
        const res = await fetch(url, {
          method: 'HEAD',
          signal: AbortSignal.timeout(5000),
          redirect: 'follow',
          headers: {
            'User-Agent': 'VigilAuditor/8.0',
          },
        });
        return { url, status: res.status };
      } catch {
        return { url, status: 0 };
      }
    })
  );

  for (const result of results) {
    if (result.status === 'fulfilled') {
      const { url, status } = result.value;
      if (status === 404 || status === 410) {
        issues.push({
          type: 'error',
          category: 'Broken Links',
          message: `Page links to broken destination (${status}): ${url}`,
          impact: 10,
          url: pageUrl,
          fix: `Remove or update the link to "${url}" — destination returns ${status}. Add a Next.js redirect if this was a valid page.`,
        });
      } else if (status >= 400) {
        issues.push({
          type: 'warning',
          category: 'Broken Links',
          message: `Page links to erroring destination (${status}): ${url}`,
          impact: 5,
          url: pageUrl,
          fix: `Check and update link to "${url}" — returns ${status}`,
        });
      }
    }
  }

  return issues;
}

async function checkRedirectChains(url: string): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];
  const chain: string[] = [url];
  let currentUrl = url;
  let hops = 0;
  const maxHops = 8;

  try {
    while (hops < maxHops) {
      const res = await fetch(currentUrl, {
        method: 'HEAD',
        redirect: 'manual',
        signal: AbortSignal.timeout(5000),
        headers: {
          'User-Agent': 'VigilAuditor/8.0',
        },
      });

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get('location');
        if (!location) break;

        const nextUrl = location.startsWith('http')
          ? location
          : `${BASE_URL}${location}`;

        chain.push(nextUrl);
        currentUrl = nextUrl;
        hops++;
      } else {
        break;
      }
    }

    if (chain.length > 2) {
      issues.push({
        type: 'error',
        category: 'Redirect Chains',
        message: `Redirect chain detected (${chain.length - 1} hops): ${chain.join(' → ')}`,
        impact: 8,
        url,
        fix: `Update redirect to point directly from ${url} to ${chain[chain.length - 1]} — skip intermediate redirects`,
      });
    } else if (chain.length === 2) {
      issues.push({
        type: 'warning',
        category: 'Redirect Chains',
        message: `Single redirect: ${url} → ${chain[1]}`,
        impact: 2,
        url,
        fix: `Update all internal links to point directly to ${chain[1]} to avoid redirect overhead`,
      });
    }

    if (hops >= maxHops) {
      issues.push({
        type: 'error',
        category: 'Redirect Chains',
        message: `Redirect loop or excessive chain detected (${hops}+ hops) starting at: ${url}`,
        impact: 15,
        url,
        fix: `Investigate redirect configuration — ${url} redirects more than ${maxHops} times which indicates a loop`,
      });
    }
  } catch {
    // Skip on timeout
  }

  return issues;
}

async function checkHTTPS(
  html: string,
  pageUrl: string,
  responseHeaders: Headers
): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];

  if (pageUrl.startsWith('http://')) {
    issues.push({
      type: 'error',
      category: 'HTTPS',
      message: `Page served over HTTP not HTTPS: ${pageUrl}`,
      impact: 20,
      url: pageUrl,
      fix: 'Redirect all HTTP traffic to HTTPS. Check Vercel configuration and ensure HSTS headers are set.',
    });
  }

  const httpScripts = html.match(/src=["']http:\/\/[^"']+\.(js)[^"']*["']/gi) || [];
  const httpStyles = html.match(/href=["']http:\/\/[^"']+\.(css)[^"']*["']/gi) || [];
  const httpImages = html.match(/src=["']http:\/\/[^"']+\.(jpg|jpeg|png|gif|webp|svg)[^"']*["']/gi) || [];
  const httpIframes = (html.match(/src=["']http:\/\/[^"']+["']/gi) || []).filter(s => s.includes('iframe'));

  const allMixed = [...httpScripts, ...httpStyles, ...httpImages, ...httpIframes];

  if (allMixed.length > 0) {
    issues.push({
      type: 'error',
      category: 'HTTPS',
      message: `Mixed content: ${allMixed.length} HTTP resource(s) on HTTPS page`,
      impact: 8,
      url: pageUrl,
      fix: `Replace HTTP resource URLs with HTTPS equivalents. Found in: ${httpScripts.length} scripts, ${httpStyles.length} stylesheets, ${httpImages.length} images`,
    });
  }

  const internalHttpLinks = (html.match(/href=["']http:\/\/[^"']+["']/gi) || []).filter(h =>
    h.includes(new URL(BASE_URL).hostname.replace('https://', ''))
  );

  if (internalHttpLinks.length > 0) {
    issues.push({
      type: 'warning',
      category: 'HTTPS',
      message: `${internalHttpLinks.length} internal link(s) use HTTP instead of HTTPS`,
      impact: 3,
      url: pageUrl,
      fix: 'Update internal links to use HTTPS. Search codebase for http:// references to your own domain and replace with https://',
    });
  }

  const hsts = responseHeaders.get('strict-transport-security');
  if (!hsts) {
    issues.push({
      type: 'warning',
      category: 'HTTPS',
      message: 'Missing HSTS header (Strict-Transport-Security)',
      impact: 3,
      url: pageUrl,
      fix: 'Add Strict-Transport-Security header in next.config.mjs headers configuration: max-age=31536000; includeSubDomains',
    });
  }

  return issues;
}

async function checkPerformance(
  html: string,
  pageUrl: string,
  responseHeaders: Headers,
  fetchStartTime: number,
  fetchEndTime: number
): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];

  const ttfb = fetchEndTime - fetchStartTime;

  if (ttfb > 2000) {
    issues.push({
      type: 'error',
      category: 'Performance',
      message: `Very slow server response: ${ttfb}ms TTFB (max 2000ms)`,
      impact: 8,
      url: pageUrl,
      fix: 'Investigate server performance. Check Vercel function cold start times. Consider enabling Vercel Edge Network for this route.',
    });
  } else if (ttfb > 600) {
    issues.push({
      type: 'warning',
      category: 'Performance',
      message: `Slow server response: ${ttfb}ms TTFB (recommended max 600ms)`,
      impact: 3,
      url: pageUrl,
      fix: `Server response time is ${ttfb}ms. Target under 600ms. Check for heavy server-side data fetching on this page.`,
    });
  }

  const contentEncoding = responseHeaders.get('content-encoding');
  if (!contentEncoding || (!contentEncoding.includes('gzip') && !contentEncoding.includes('br'))) {
    issues.push({
      type: 'warning',
      category: 'Performance',
      message: 'Page not served with compression (gzip/Brotli)',
      impact: 3,
      url: pageUrl,
      fix: 'Enable gzip or Brotli compression. In next.config.mjs add: compress: true. Vercel enables this automatically for most routes.',
    });
  }

  const cacheControl = responseHeaders.get('cache-control');
  if (!cacheControl || cacheControl.includes('no-store')) {
    issues.push({
      type: 'warning',
      category: 'Performance',
      message: 'Missing or disabled cache-control headers',
      impact: 2,
      url: pageUrl,
      fix: 'Add cache-control headers. For static pages: Cache-Control: public, max-age=3600, stale-while-revalidate=86400',
    });
  }

  const unminifiedJs = (html.match(/src=["'][^"']*\.js["']/gi) || []).filter(
    s => !s.includes('.min.js') && !s.includes('_next/static')
  );

  if (unminifiedJs.length > 0) {
    issues.push({
      type: 'warning',
      category: 'Performance',
      message: `${unminifiedJs.length} potentially unminified JS file(s) detected`,
      impact: 2,
      url: pageUrl,
      fix: 'Ensure all custom JavaScript files are minified. Next.js minifies automatically in production — check if any external scripts are unminified.',
    });
  }

  const renderBlocking = (html.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || []).filter(
    l => !l.includes('media=')
  );

  if (renderBlocking.length > 2) {
    issues.push({
      type: 'warning',
      category: 'Performance',
      message: `${renderBlocking.length} render-blocking stylesheets in page head`,
      impact: 3,
      url: pageUrl,
      fix: 'Reduce render-blocking CSS. Consider adding media attributes or loading non-critical CSS asynchronously.',
    });
  }

  return issues;
}

async function checkSSL(baseUrl: string): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];

  try {
    const res = await fetch(baseUrl, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });

    if (res.url.startsWith('http://')) {
      issues.push({
        type: 'error',
        category: 'HTTPS',
        message: 'Site is not redirecting HTTP to HTTPS',
        impact: 20,
        url: baseUrl,
        fix: 'Configure HTTP to HTTPS redirect in Vercel project settings or next.config.mjs',
      });
    }
  } catch (e) {
    if (e instanceof Error && e.message?.includes('certificate')) {
      issues.push({
        type: 'error',
        category: 'HTTPS',
        message: 'SSL certificate error detected',
        impact: 20,
        url: baseUrl,
        fix: 'Check SSL certificate validity in Vercel dashboard. Renew if expired.',
      });
    }
  }

  return issues;
}

async function checkAISearchReadiness(html: string, pageUrl: string): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];

  const hasLLMtxt = await fetch(`${BASE_URL}/llm.txt`, {
    method: 'HEAD',
    signal: AbortSignal.timeout(3000),
  })
    .then(r => r.ok)
    .catch(() => false);

  if (pageUrl === BASE_URL && !hasLLMtxt) {
    issues.push({
      type: 'warning',
      category: 'AI Search',
      message: 'No LLM.txt file found — AI crawlers cannot discover content permissions',
      impact: 3,
      url: pageUrl,
      fix: 'Create /public/llm.txt file. Content: "# Vigil Cleaning Services\\nUser-agent: *\\nAllow: /\\n\\nSitemap: https://cleaning.vigilservices.co.uk/sitemap.xml"',
    });
  }

  const authorSchema = html.includes('"@type":"Person"') || html.includes('"@type": "Person"');
  if (!authorSchema) {
    issues.push({
      type: 'warning',
      category: 'AI Search',
      message: 'No author entity (Person schema) found — reduces AI citation eligibility',
      impact: 2,
      url: pageUrl,
      fix: 'Add Person schema to about page with name, jobTitle, knowsAbout, sameAs (LinkedIn URL). This signals E-E-A-T to AI tools.',
    });
  }

  const hasFAQSchema = html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"');

  if (pageUrl.includes('/faq') && !hasFAQSchema) {
    issues.push({
      type: 'error',
      category: 'AI Search',
      message: 'FAQ page missing FAQPage schema — AI tools cannot extract Q&A pairs',
      impact: 5,
      url: pageUrl,
      fix: 'Add FAQPage JSON-LD schema to the FAQ page with all question/answer pairs. This enables AI tools to cite your answers directly.',
    });
  }

  return issues;
}

function calculateCrawlDepth(url: string): number {
  const path = url.replace(BASE_URL, '');
  if (path === '' || path === '/') return 0;
  return path.split('/').filter(Boolean).length;
}

function checkNearDuplicates(
  pages: PageResult[]
): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const paths = pages.map(p =>
    p.url.replace(BASE_URL, '')
  );

  for (let i = 0; i < paths.length; i++) {
    for (let j = i + 1; j < paths.length; j++) {
      const a = paths[i];
      const b = paths[j];

      if (a.replace(/-/g, '') === b.replace(/-/g, '')) {
        issues.push({
          url: pages[i].url,
          type: 'warning',
          category: 'URL Structure',
          message: `Near-duplicate URL: ${a} vs ${b}`,
          impact: 6,
        });
      }
    }
  }

  return issues;
}

async function checkPageSize(url: string): Promise<{
  size_kb: number;
  issues: AuditIssue[];
}> {
  const issues: AuditIssue[] = [];
  const { html } = await fetchPage(url);
  const size_kb = Math.round(
    new Blob([html]).size / 1024
  );

  if (size_kb > 500) {
    issues.push({
      url,
      type: 'warning',
      category: 'Performance',
      message: `Large page size: ${size_kb}KB`,
      impact: 5,
      fix: 'Optimize images and defer non-critical JS',
    });
  }

  return { size_kb, issues };
}

async function getPageSpeedData(
  url: string
): Promise<{
  mobile_score?: number;
  desktop_score?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  issues: AuditIssue[];
}> {
  const issues: AuditIssue[] = [];
  const apiKey = process.env.PAGESPEED_API_KEY;

  if (!apiKey) {
    return { issues };
  }

  try {
    const mobileRes = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile&category=PERFORMANCE`,
      { signal: AbortSignal.timeout(30000) }
    );

    const mobileData = await mobileRes.json();

    if (mobileData.error) {
      return { issues };
    }

    const lighthouse =
      mobileData.lighthouseResult || {};
    const categories = lighthouse.categories || {};
    const audits = lighthouse.audits || {};

    const mobile_score = categories.performance?.score
      ? Math.round(categories.performance.score * 100)
      : undefined;

    const lcp = audits['largest-contentful-paint']
      ?.numericValue
      ? Math.round(
          audits['largest-contentful-paint'].numericValue
        )
      : undefined;

    const cls = audits['cumulative-layout-shift']
      ?.numericValue;

    if (mobile_score && mobile_score < 50) {
      issues.push({
        url,
        type: 'error',
        category: 'Core Web Vitals',
        message: `Mobile performance: ${mobile_score}/100 (poor)`,
        impact: 8,
        fix: 'Optimize images, defer JS, reduce layout shift',
      });
    } else if (mobile_score && mobile_score < 90) {
      issues.push({
        url,
        type: 'warning',
        category: 'Core Web Vitals',
        message: `Mobile performance: ${mobile_score}/100 (needs improvement)`,
        impact: 5,
      });
    }

    return { mobile_score, lcp, cls, issues };
  } catch {
    return { issues };
  }
}

async function getGSCData(
  url: string
): Promise<{
  impressions?: number;
  clicks?: number;
  ctr?: number;
  position?: number;
}> {
  try {
    const { TOKEN_STORE } = await import('@/lib/gsc-token-store');
    const refreshToken = TOKEN_STORE.refresh_token || process.env.GSC_REFRESH_TOKEN;

    if (!refreshToken) {
      return {};
    }

    if (Date.now() > TOKEN_STORE.expires_at - 60000) {
      const clientId = process.env.GSC_CLIENT_ID;
      const clientSecret = process.env.GSC_CLIENT_SECRET;

      const refreshRes = await fetch(
        'https://oauth2.googleapis.com/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: clientId || '',
            client_secret: clientSecret || '',
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
          }),
        }
      );

      const refreshed = await refreshRes.json();
      if (refreshed.access_token) {
        TOKEN_STORE.access_token = refreshed.access_token;
        TOKEN_STORE.expires_at = Date.now() + (refreshed.expires_in * 1000);
      }
    }

    const gscSiteUrl = process.env.GSC_SITE_URL ||
      'https://security.vigilservices.co.uk';

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const gscRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(gscSiteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKEN_STORE.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ['page'],
          dimensionFilterGroups: [
            {
              filters: [
                {
                  dimension: 'page',
                  expression: url,
                  operator: 'equals',
                },
              ],
            },
          ],
        }),
        signal: AbortSignal.timeout(15000),
      }
    );

    const gscData = await gscRes.json();

    if (gscData.rows && gscData.rows.length > 0) {
      const row = gscData.rows[0];
      return {
        impressions: row.impressions,
        clicks: row.clicks,
        ctr: row.ctr ? Math.round(row.ctr * 10000) / 100 : undefined,
        position: row.position ? Math.round(row.position * 10) / 10 : undefined,
      };
    }

    return {};
  } catch {
    return {};
  }
}

async function recursiveCrawl(
  startUrl: string,
  maxDepth: number,
  visited: Set<string> = new Set(),
  auditStartTime: number = Date.now()
): Promise<string[]> {
  if (maxDepth === 0 || visited.has(startUrl) || Date.now() - auditStartTime > AUDIT_TIMEOUT) {
    return [];
  }

  visited.add(startUrl);
  const discovered: string[] = [startUrl];

  const { html } = await fetchPage(startUrl, PER_PAGE_TIMEOUT);
  const links = extractInternalLinks(html, BASE_URL);

  for (const link of links) {
    if (!visited.has(link) && visited.size < MAX_PAGES) {
      const children = await recursiveCrawl(link, maxDepth - 1, visited, auditStartTime);
      discovered.push(...children);
    }
  }

  return discovered;
}

function extractInternalLinks(
  html: string,
  baseUrl: string
): string[] {
  const links: string[] = [];
  const matches =
    html.match(/<a[^>]+href=["']([^"']+)["']/gi) || [];

  for (const match of matches) {
    const hrefMatch = match.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1];

    let fullUrl = '';
    if (href.startsWith('/')) {
      fullUrl = baseUrl + href;
    } else if (href.startsWith(baseUrl)) {
      fullUrl = href;
    }

    if (
      fullUrl &&
      !fullUrl.includes('#') &&
      !fullUrl.includes('?') &&
      !links.includes(fullUrl)
    ) {
      links.push(fullUrl);
    }
  }

  return links;
}

function estimatePageRank(
  url: string,
  allPages: Map<string, PageResult>
): number {
  let inlinks = 0;

  for (const [pageUrl, page] of Array.from(allPages.entries())) {
    if (pageUrl === url) continue;
    if (page.internal_links_count && page.internal_links_count > 0) {
      inlinks++;
    }
  }

  const crawlDepth = calculateCrawlDepth(url);
  const depthPenalty = Math.max(0, 1 - crawlDepth * 0.15);

  return Math.round((inlinks * 10 + 10) * depthPenalty) / 10;
}

function checkInternalLinkingHealth(
  linkGraph: Map<string, Set<string>>,
  pages: string[]
): AuditIssue[] {
  const issues: AuditIssue[] = [];

  const inlinkCount = new Map<string, number>();

  for (const page of pages) {
    inlinkCount.set(page, 0);
  }

  for (const [, targets] of Array.from(linkGraph.entries())) {
    for (const target of Array.from(targets)) {
      inlinkCount.set(target, (inlinkCount.get(target) || 0) + 1);
    }
  }

  for (const [page, count] of Array.from(inlinkCount.entries())) {
    if (count === 0 && page !== BASE_URL) {
      issues.push({
        type: 'error',
        category: 'Internal Linking',
        message: `Orphan page — no internal links pointing to: ${page.replace(BASE_URL, '')}`,
        impact: 8,
        url: page,
        fix: `Add at least 2-3 internal links to ${page.replace(
          BASE_URL,
          ''
        )} from relevant service or borough pages`,
      });
    } else if (count === 1 && page !== BASE_URL) {
      issues.push({
        type: 'warning',
        category: 'Internal Linking',
        message: `Page has only 1 internal inlink: ${page.replace(BASE_URL, '')}`,
        impact: 4,
        url: page,
        fix: `Add 2-3 more internal links to ${page.replace(
          BASE_URL,
          ''
        )} to distribute PageRank. Link from related service pages.`,
      });
    }
  }

  return issues;
}

function calculateScore(
  allIssues: AuditIssue[],
  pageResults: PageResult[],
  totalChecks: number
): {
  semrush_score: number;
  calibrated_score: number;
  raw_score: number;
  by_category: Record<string, number>;
} {
  const errors = allIssues.filter(i => i.type === 'error').length;
  const warnings = allIssues.filter(i => i.type === 'warning').length;
  const notices = allIssues.filter(i => i.type === 'notice').length;

  const failurePoints = errors * 1.0 + warnings * 0.5 + notices * 0.1;

  const totalPossibleChecks = Math.max(totalChecks, pageResults.length * 15);

  const semrushScore = Math.round(
    Math.max(0, ((totalPossibleChecks - failurePoints) / totalPossibleChecks) * 100)
  );

  const categoryWeights: Record<string, number> = {
    'Broken Links': 20,
    'HTTPS': 20,
    'Redirect Chains': 15,
    'HTTP': 15,
    'Canonical': 12,
    'Indexability': 10,
    'Structured Data': 8,
    'AI Search': 5,
    'Performance': 5,
    'Internal Linking': 5,
    'Content': 5,
    'Meta': 4,
    'Images': 4,
    'UK English': 3,
    'Grammar': 2,
    'Brand Consistency': 2,
    'B2B Positioning': 3,
    'Content Quality': 4,
    'Social Tags': 2,
    'Sitemap': 3,
    'Robots.txt': 2,
    'Claims Compliance': 5,
    'EEAT': 3,
    'SEO': 4,
    'Accessibility': 4,
    'Open Graph': 2,
    'Security': 2,
    'Core Web Vitals': 3,
    'URL Structure': 2,
    'Duplicates': 6,
    'Connectivity': 10,
    'HTTP Status': 10,
    'NAP Consistency': 3,
    'Robots': 2,
  };

  const by_category: Record<string, number> = {};
  const byCategory = allIssues.reduce((acc: Record<string, AuditIssue[]>, issue) => {
    const cat = issue.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(issue);
    return acc;
  }, {});

  let totalDeduction = 0;
  for (const [cat, issues] of Object.entries(byCategory)) {
    const weight = categoryWeights[cat] || 1;
    const affected = new Set((issues as AuditIssue[]).map(i => i.url)).size;
    const total = pageResults.length || 1;
    const ratio = Math.min(1, affected / total);
    const catErrors = (issues as AuditIssue[]).filter(i => i.type === 'error').length;
    const catWarnings = (issues as AuditIssue[]).filter(i => i.type === 'warning').length;
    const deduction = Math.min(weight, (catErrors + catWarnings * 0.5) * ratio * (weight / 10));
    by_category[cat] = Math.round(deduction * 10) / 10;
    totalDeduction += deduction;
  }

  const rawScore = Math.max(0, Math.round(100 - totalDeduction));

  return {
    semrush_score: semrushScore,
    calibrated_score: rawScore,
    raw_score: semrushScore,
    by_category,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') || 'full';
  const startTime = Date.now();

  const priorityPages = [
    `${BASE_URL}`,
    `${BASE_URL}/manned-guarding-london`,
    `${BASE_URL}/event-security-london`,
    `${BASE_URL}/mobile-patrols-london`,
    `${BASE_URL}/key-holding-alarm-response-london`,
    `${BASE_URL}/retail-security-london`,
    `${BASE_URL}/construction-site-security-london`,
    `${BASE_URL}/door-supervisors-london`,
    `${BASE_URL}/about-vigil-security-services`,
    `${BASE_URL}/contact`,
  ];

  const sitemapUrls = await getSitemapUrls();
  const allPages = new Map<string, PageResult>();
  const allIssues: AuditIssue[] = [];
  const allAuditedUrls = new Set<string>();
  const linkGraph = new Map<string, Set<string>>();

  const sslIssues = await checkSSL(BASE_URL);
  allIssues.push(...sslIssues);

  let pagesToAudit = priorityPages;

  if (mode === 'recursive') {
    const crawled = await recursiveCrawl(BASE_URL, MAX_DEPTH, new Set(), startTime);
    pagesToAudit = Array.from(new Set([...priorityPages, ...crawled]));
  } else if (mode === 'sitemap') {
    pagesToAudit = Array.from(new Set([...priorityPages, ...sitemapUrls]));
  }

  for (let pageIndex = 0; pageIndex < pagesToAudit.length; pageIndex++) {
    if (Date.now() - startTime > AUDIT_TIMEOUT) {
      break;
    }

    const url = pagesToAudit[pageIndex];
    allAuditedUrls.add(url);
    const { result, issues, html } = await auditPage(url, sitemapUrls, allAuditedUrls);

    allPages.set(url, result);
    allIssues.push(...issues);

    const { internal, external, issues: linkIssues } =
      await checkOutgoingLinks(url);
    result.internal_links_count = internal;
    result.external_links_count = external;
    allIssues.push(...linkIssues);

    const { size_kb, issues: sizeIssues } = await checkPageSize(
      url
    );
    result.page_size_kb = size_kb;
    allIssues.push(...sizeIssues);

    result.crawl_depth = calculateCrawlDepth(url);

    allIssues.push(...checkURLStructure(url));
    allIssues.push(...(await auditImages(url)));
    allIssues.push(...(await checkOpenGraph(url)));
    allIssues.push(...(await validateStructuredData(url)));
    allIssues.push(...(await checkHeaders(url)));
    allIssues.push(...(await checkExternalLinks(url)));

    const ukIssues = await checkUKEnglish(html, url);
    allIssues.push(...ukIssues);

    const brandIssues = await checkBrandConsistency(html, url);
    allIssues.push(...brandIssues);

    if (pageIndex < 8) {
      await new Promise(r => setTimeout(r, 300));
      const grammarIssues = await checkLanguageTool(html, url);
      allIssues.push(...grammarIssues);
    }

    const internalLinks = extractInternalLinks(html, BASE_URL);
    if (!linkGraph.has(url)) {
      linkGraph.set(url, new Set());
    }
    for (const link of internalLinks) {
      linkGraph.get(url)!.add(link);
    }
  }

  for (const priorityPage of pagesToAudit.slice(0, 10)) {
    const chainIssues = await checkRedirectChains(priorityPage);
    allIssues.push(...chainIssues);
  }

  const internalLinkIssues = checkInternalLinkingHealth(
    linkGraph,
    Array.from(allAuditedUrls)
  );
  allIssues.push(...internalLinkIssues);

  for (const [url, result] of Array.from(allPages.entries())) {
    result.estimated_pagerank = estimatePageRank(url, allPages);
  }

  if (mode === 'full') {
    for (const url of pagesToAudit.slice(0, 5)) {
      const cwv = await getPageSpeedData(url);
      const page = allPages.get(url);
      if (page) {
        page.mobile_score = cwv.mobile_score;
        page.cwv_lcp = cwv.lcp;
        page.cwv_cls = cwv.cls;
      }
      allIssues.push(...cwv.issues);

      const gsc = await getGSCData(url);
      if (page && gsc.impressions) {
        page.gsc_impressions = gsc.impressions;
        page.gsc_clicks = gsc.clicks;
        page.gsc_ctr = gsc.ctr;
        page.gsc_position = gsc.position;
      }
    }
  }

  allIssues.push(...(await checkSitemapHealth()));
  allIssues.push(...(await validateRobotsTxt()));
  allIssues.push(...checkNearDuplicates(Array.from(allPages.values())));
  allIssues.push(...(await checkDuplicates(Array.from(allPages.values()))));

  const errors = allIssues.filter(i => i.type === 'error');
  const warnings = allIssues.filter(i => i.type === 'warning');
  const notices = allIssues.filter(i => i.type === 'notice');

  const criticalIssues = allIssues
    .filter(i => i.impact >= 7)
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 10);

  const byCategory: Record<string, number> = {};
  for (const issue of allIssues) {
    byCategory[issue.category] = (byCategory[issue.category] || 0) + 1;
  }

  const totalChecks = allPages.size * 15;
  const scoreData = calculateScore(allIssues, Array.from(allPages.values()), totalChecks);

  const quickWins = Object.entries(
    allIssues.reduce((acc: Record<string, AuditIssue[]>, issue) => {
      if (issue.type !== 'error' && issue.type !== 'warning') return acc;
      const key = (issue.message || '')
        .split(':')[0]
        .split('(')[0]
        .trim()
        .slice(0, 40);
      if (!acc[key]) acc[key] = [];
      acc[key].push(issue);
      return acc;
    }, {})
  )
    .map(([issue, issues]) => ({
      issue,
      pages_affected: new Set((issues as AuditIssue[]).map(i => i.url)).size,
      fix: (issues as AuditIssue[])[0]?.fix || 'See issue details',
      score_improvement: Math.min(
        15,
        Math.round(
          (issues as AuditIssue[]).reduce((s, i) => s + (i.impact || 0), 0) / 8
        )
      ),
    }))
    .filter(w => w.score_improvement > 0)
    .sort((a, b) => b.score_improvement - a.score_improvement)
    .slice(0, 10);

  const grade =
    scoreData.calibrated_score >= 90
      ? 'A'
      : scoreData.calibrated_score >= 75
      ? 'B'
      : scoreData.calibrated_score >= 60
      ? 'C'
      : scoreData.calibrated_score >= 40
      ? 'D'
      : 'F';

  const duration = Date.now() - startTime;

  const contentQualityScore = Math.max(
    0,
    100 -
      allIssues
        .filter(i =>
          [
            'UK English',
            'Grammar',
            'Brand Consistency',
            'B2B Positioning',
            'Content Quality',
            'Claims Compliance',
          ].includes(i.category)
        )
        .reduce((s, i) => s + (i.impact || 0), 0)
  );

  const ttfbValues = allIssues
    .filter(i => i.category === 'Performance' && i.message.includes('TTFB'))
    .map(i => {
      const match = i.message.match(/(\d+)ms TTFB/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter(v => v > 0);

  const avgTTFB = ttfbValues.length > 0
    ? Math.round(ttfbValues.reduce((a, b) => a + b, 0) / ttfbValues.length)
    : 0;

  return NextResponse.json({
    tool: 'Vigil Advanced SEO Auditor v8.0',
    version: '8.0.0',
    site: 'security.vigilservices.co.uk',
    mode,
    score: scoreData.calibrated_score,
    semrush_score: scoreData.semrush_score,
    grade,
    score_breakdown: {
      semrush_methodology: scoreData.semrush_score,
      calibrated: scoreData.calibrated_score,
      by_category: scoreData.by_category,
      scoring_note:
        'semrush_methodology uses (healthy_checks/total_checks)×100. calibrated uses category-weighted deductions.',
    },
    summary: {
      total_issues: allIssues.length,
      errors: errors.length,
      warnings: warnings.length,
      notices: notices.length,
      pages_audited: allPages.size,
      pages_crawled: mode === 'recursive' ? allPages.size : priorityPages.length,
      sitemap_urls_found: sitemapUrls.length,
      content_quality_score: Math.round(contentQualityScore),
      uk_english_issues: allIssues.filter(i => i.category === 'UK English').length,
      grammar_issues: allIssues.filter(i => i.category === 'Grammar').length,
      brand_issues: allIssues.filter(i => i.category === 'Brand Consistency').length,
      placeholder_issues: allIssues.filter(i => i.category === 'Content Quality').length,
      broken_outbound_links: allIssues.filter(i => i.category === 'Broken Links').length,
      redirect_chains: allIssues.filter(i => i.category === 'Redirect Chains').length,
      https_issues: allIssues.filter(i => i.category === 'HTTPS').length,
      performance_issues: allIssues.filter(i => i.category === 'Performance').length,
      ai_search_issues: allIssues.filter(i => i.category === 'AI Search').length,
      internal_linking_issues: allIssues.filter(i => i.category === 'Internal Linking')
        .length,
      orphan_pages: allIssues.filter(
        i => i.category === 'Internal Linking' && i.message.includes('Orphan')
      ).length,
    },
    quick_wins: quickWins,
    module_results: {
      uk_english: {
        spelling_errors: allIssues.filter(
          i => i.category === 'UK English' && i.type === 'error'
        ).length,
        vocabulary_errors: allIssues.filter(
          i => i.category === 'UK English' && i.type === 'warning'
        ).length,
        b2b_positioning: allIssues.filter(
          i => i.category === 'B2B Positioning'
        ).length,
        placeholder_found: allIssues.filter(
          i => i.category === 'Content Quality'
        ).length,
        pages_checked: pagesToAudit.length,
      },
      grammar: {
        issues_found: allIssues.filter(i => i.category === 'Grammar').length,
        languagetool_available: true,
        pages_checked: Math.min(8, pagesToAudit.length),
      },
      brand_consistency: {
        inconsistencies: allIssues.filter(
          i => i.category === 'Brand Consistency'
        ).length,
        correct_name: CORRECT_BRAND_NAME,
      },
      images: {
        broken: allIssues.filter(
          i => i.category === 'Images' && i.message.includes('broken')
        ).length,
        too_large: allIssues.filter(
          i => i.category === 'Images' && i.message.includes('too large')
        ).length,
        non_webp: allIssues.filter(
          i => i.category === 'Images' && i.message.includes('not served as WebP')
        ).length,
      },
      broken_links: {
        total: allIssues.filter(i => i.category === 'Broken Links').length,
        broken_destinations: Array.from(
          new Set(
            allIssues
              .filter(i => i.category === 'Broken Links')
              .map(i => (i as AuditIssue & { broken_destination?: string }).broken_destination)
              .filter(Boolean)
          )
        ),
      },
      redirect_chains: {
        total: allIssues.filter(i => i.category === 'Redirect Chains').length,
        max_hops: Math.max(
          0,
          ...allIssues
            .filter(i => i.category === 'Redirect Chains')
            .map(i => (i as AuditIssue & { hops?: number }).hops || 0)
        ),
      },
      https: {
        mixed_content_pages: allIssues.filter(
          i => i.category === 'HTTPS' && i.message.includes('Mixed content')
        ).length,
        http_internal_links: allIssues.filter(
          i => i.category === 'HTTPS' && i.message.includes('internal link')
        ).length,
        hsts_missing: allIssues.filter(i => i.message.includes('HSTS')).length,
      },
      performance: {
        slow_pages: allIssues.filter(
          i => i.category === 'Performance' && i.message.includes('TTFB')
        ).length,
        uncompressed_pages: allIssues.filter(i => i.message.includes('compression')).length,
        avg_ttfb_ms: avgTTFB,
      },
      ai_search: {
        llm_txt_present: !allIssues.some(i => i.message.includes('LLM.txt')),
        ai_crawlers_blocked: allIssues.filter(
          i => i.category === 'AI Search' && i.message.includes('blocked')
        ).length,
        faq_schema_missing: allIssues.filter(i => i.message.includes('FAQPage schema')).length,
        author_entity_missing: allIssues.filter(i => i.message.includes('Person schema')).length,
      },
      internal_linking: {
        orphan_pages: allIssues.filter(i => i.message.includes('Orphan page')).length,
        single_inlink_pages: allIssues.filter(i => i.message.includes('only 1 internal inlink'))
          .length,
      },
    },
    ahrefs_comparison: {
      our_version: 'V8.0',
      checks_we_now_perform: [
        'HTTP status codes',
        'Canonical tags and redirect chains',
        'Broken outbound internal links',
        'Mixed content detection',
        'Internal HTTP links',
        'HTTPS/SSL verification',
        'HSTS headers',
        'Server response time (TTFB)',
        'Page compression',
        'Cache-control headers',
        'Render-blocking resources',
        'Recursive crawl up to 200 pages',
        'Crawl depth up to 8 levels',
        'Internal PageRank estimation',
        'Single-inlink page detection',
        'Orphan page detection',
        'Structured data validation',
        'Open Graph tags',
        'Meta description length',
        'Title length',
        'H1 presence',
        'Word count thresholds',
        'Robots.txt validation',
        'AI crawler accessibility',
        'LLM.txt presence',
        'FAQPage schema',
        'Author entity schema',
        'UK English spell checking',
        'Grammar validation (en-GB)',
        'Brand name consistency',
        'Forbidden claims detection',
        'B2B language enforcement',
        'Placeholder text detection',
        'NAP consistency',
        'Image alt text',
        'Broken images',
        'Image file size',
        'PageSpeed/CWV integration',
        'GSC integration',
        'Sitemap health',
      ],
      checks_ahrefs_does_we_still_miss: [
        'Log file analysis',
        'JavaScript rendering (headless)',
        'Backlink profile analysis',
        'Domain authority scoring',
        'Historical backlink changes',
        'Competitor backlink gaps',
      ],
      our_advantage_over_all_platforms: [
        'Forbidden claims compliance (98%, 97%, 500+)',
        'B2B language enforcement',
        'UK English (en-GB) spell checking',
        'Grammar validation via LanguageTool',
        'Brand name consistency checking',
        'Placeholder text detection',
        'NAP phone/email consistency',
        'Division-specific content thresholds',
        'WordPress migration URL tracking',
        'Business-specific forbidden terms',
        'AI search readiness scoring',
        'LLM.txt checking',
        'Direct GSC query-level data (V9)',
        'Site-specific content rules',
      ],
    },
    by_category: byCategory,
    critical_issues: criticalIssues,
    warnings: warnings.slice(0, 20),
    page_results: Array.from(allPages.values()),
    duration_ms: duration,
    checked_at: new Date().toISOString(),
  });
}
