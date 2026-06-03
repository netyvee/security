import { NextResponse } from 'next/server';

export async function POST() {
  const sitemapUrl = 'https://security.vigilservices.co.uk/sitemap.xml';

  const sitemapCheck = await fetch(sitemapUrl);
  if (!sitemapCheck.ok) {
    return NextResponse.json({
      error: 'Sitemap not found',
      sitemap: sitemapUrl,
    }, { status: 404 });
  }

  const [googleRes, bingRes] = await Promise.allSettled([
    fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`),
    fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`),
  ]);

  return NextResponse.json({
    sitemap: sitemapUrl,
    google: googleRes.status === 'fulfilled' ? googleRes.value.status : 'error',
    bing: bingRes.status === 'fulfilled' ? bingRes.value.status : 'error',
    note: 'Search engines queue sitemap updates asynchronously',
    timestamp: new Date().toISOString(),
  });
}
