import { NextResponse } from 'next/server';

const BASE_URL = 'https://security.vigilservices.co.uk';

async function fetchPage(url: string) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'VigilAuditor/1.0' },
      signal: AbortSignal.timeout(10000),
    });
    const html = await res.text();
    return { status: res.status, html, ok: res.ok };
  } catch {
    return { status: 0, html: '', ok: false };
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
  return m ? m[1].trim() : null;
}

function extractMetaDesc(html: string): string | null {
  const m = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i
  );
  return m ? m[1] : null;
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

async function auditPage(
  url: string,
  sitemapUrls: string[],
  rules: any
) {
  const issues: any[] = [];
  const { status, html } = await fetchPage(url);
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

  return {
    url, status, canonical,
    title, meta_description: metaDesc,
    h1, noindex, word_count: wordCount,
    page_type: pageType, in_sitemap: inSitemap,
    nap_phone_ok: napCheck.phone_ok,
    forbidden_claims: foundClaims,
    html_entities: entityCount,
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

export async function GET() {
  const start = Date.now();

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

  const sitemapUrls = await getSitemapUrls();

  const pagesToAudit = [
    `${BASE_URL}`,
    `${BASE_URL}/manned-guarding-london`,
    `${BASE_URL}/mobile-patrols-london`,
    `${BASE_URL}/construction-site-security-london`,
    `${BASE_URL}/event-security-london`,
    `${BASE_URL}/key-holding-london`,
    `${BASE_URL}/concierge-security-london`,
    `${BASE_URL}/cctv-monitoring-london`,
    `${BASE_URL}/alarm-response-london`,
    `${BASE_URL}/security-services-city-of-london`,
    `${BASE_URL}/security-services-canary-wharf`,
    `${BASE_URL}/security-services-westminster`,
    `${BASE_URL}/security-services-camden`,
    `${BASE_URL}/security-services-islington`,
    `${BASE_URL}/about-vigil-security-services`,
    `${BASE_URL}/faq`,
  ];

  const allIssues: any[] = [];
  const pageResults: any[] = [];

  for (const url of pagesToAudit) {
    const result = await auditPage(url, sitemapUrls, rules);
    pageResults.push(result);
    if (result.issues) allIssues.push(...result.issues);
  }

  const wpIssues = await checkWordPressRedirects(redirectMap);
  allIssues.push(...wpIssues);

  const orphanIssues = await checkOrphanedPages(sitemapUrls);
  allIssues.push(...orphanIssues);

  let score = 100;
  for (const issue of allIssues) {
    score -= issue.impact || 0;
  }
  score = Math.max(0, Math.min(100, score));

  const errors = allIssues.filter(i => i.type === 'error');
  const warnings = allIssues.filter(i => i.type === 'warning');
  const notices = allIssues.filter(i => i.type === 'notice');

  const byCategory = allIssues.reduce((acc: any, i: any) => {
    acc[i.category] = (acc[i.category] || 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({
    tool: 'Vigil Advanced SEO Auditor v2.0',
    site: 'security.vigilservices.co.uk',
    score,
    grade: score >= 90 ? 'A' : score >= 70 ? 'B' :
           score >= 50 ? 'C' : 'D',
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
      ],
      checks_ahrefs_does_we_still_miss: [
        'JavaScript rendering (requires headless browser)',
        'Core Web Vitals from real user data',
        'Backlink profile analysis',
        'Keyword ranking tracking',
        'Competitor gap analysis',
        'Historical index comparison',
        'Full recursive site crawl',
        'Image file size and format audit',
      ],
      our_advantage_over_ahrefs: [
        'Business-specific forbidden claims detection',
        'NAP consistency enforcement per our specific details',
        'Page-type aware content thresholds',
        'WordPress migration URL tracking',
        'Division-specific indexability rules',
        'Pre-deployment validation capability',
      ],
    },
    summary: {
      total_issues: allIssues.length,
      errors: errors.length,
      warnings: warnings.length,
      notices: notices.length,
      pages_audited: pageResults.length,
      sitemap_urls_found: sitemapUrls.length,
      wordpress_urls_checked: Object.keys(redirectMap).length,
    },
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
      issue_count: r.issues?.length || 0,
    })),
    duration_ms: Date.now() - start,
    checked_at: new Date().toISOString(),
  });
}
