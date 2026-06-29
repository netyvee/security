/**
 * Markdown blog loader — Vigil Security Services
 * Version: 1.0 — June 2026
 *
 * Renders CRM-generated markdown posts (committed by the CRM BlogChannelAdapter
 * to content/blog/{slug}.md) as live blog posts, mapping the front matter onto the
 * existing BlogPostData contract consumed by @/components/templates/BlogPost.
 *
 * Producer contract (FIXED — see AUDIT/BLOG-WEBSITE-LOADER-SPEC.md in netyvee/app):
 *   front matter keys: title, date, division, service_type, borough,
 *   focus_keyword, author, image, image_alt, seo_score, gbp_score
 *   body: approved article HTML after the closing `---` fence.
 *
 * This module RENDERS; it does not author. It runs only at build time / on the
 * server (Node fs) — never import it into a Client Component.
 */

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

import type { BlogPostData } from '@/types/page-templates'

type Division = 'cleaning' | 'security'

/**
 * Site-scoped config. This loader is per-repo and renders only THIS division's
 * posts, so it references only this site's NAP — never another division's phone
 * (a foreign number here would hard-block the SEO NAP gate).
 */
const SITE = {
  division: 'security' as Division,
  host: 'https://security.vigilservices.co.uk',
  name: 'Vigil Security Services',
  enquiryUrl: 'https://app.vigilservices.co.uk/enquire/security',
  phone: '020 3973 8892',
  ctaLabel: 'Get a security quote',
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

/** A loaded post plus the division needed by BlogPost / generateBlogPostSchema. */
export interface LoadedMarkdownPost {
  data: BlogPostData
  division: Division
}

/** Index-grid summary — shape matches the blogPosts[] entries in app/blog/page.tsx. */
export interface BlogSummary {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
}

// ───────────────────────────── helpers ────────────────────────────────────

/** Strip HTML tags and decode the handful of entities that affect plain-text
 *  derivations (description, word count). */
function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;|&rsquo;|&lsquo;/gi, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/gi, '"')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** First <p>…</p> block of an HTML body, or null. */
function firstParagraph(html: string): string | null {
  const m = html.match(/<p\b[^>]*>[\s\S]*?<\/p>/i)
  return m ? m[0] : null
}

/** Derive a 50–160 char meta description from plain body text. */
function deriveDescription(text: string): string {
  if (text.length <= 160) return text
  const cut = text.slice(0, 160)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 50 ? cut.slice(0, lastSpace) : cut).trim() + '…'
}

/** Humanise a slug-like token, e.g. "manned-guarding" → "Manned guarding". */
function humanise(token: string): string {
  const s = token.replace(/[-_]+/g, ' ').trim()
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s
}

function readMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.toLowerCase().endsWith('.md'))
}

// ───────────────────────────── public API ─────────────────────────────────

/** Slugs of every committed markdown post (filename without .md). */
export function getMarkdownSlugs(): string[] {
  return readMarkdownFiles().map((f) => f.replace(/\.md$/i, ''))
}

/** Read + parse one post into BlogPostData, or null if it does not exist. */
export function getMarkdownPost(slug: string): LoadedMarkdownPost | null {
  const file = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null

  const raw = fs.readFileSync(file, 'utf8')
  const { data: fm, content } = matter(raw)

  const division = SITE.division
  const host = SITE.host
  const title = String(fm.title ?? humanise(slug))

  const bodyHtml = content.trim()
  const intro = firstParagraph(bodyHtml)
  // If the first paragraph becomes the intro box, drop it from the body so it
  // does not render twice.
  const body = intro ? bodyHtml.replace(intro, '').trim() : bodyHtml
  const plain = stripTags(bodyHtml)
  const wordCount = plain ? plain.split(/\s+/).length : 0
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  const introHtml = intro ?? (plain ? `<p>${deriveDescription(plain)}</p>` : '<p></p>')
  const description = deriveDescription(plain || title)

  const tags = [fm.service_type, fm.borough]
    .map((t) => (t == null ? '' : String(t).trim()))
    .filter(Boolean)

  // Related: other markdown posts in this repo (single division — never
  // cross-divisional), newest first, up to 3.
  const relatedPosts = getMarkdownPostSummaries()
    .filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({ title: s.title, href: `/blog/${s.slug}/`, date: s.date }))

  const imageSrc = fm.image ? String(fm.image) : '/placeholder-image.svg'
  const imageAlt = fm.image_alt ? String(fm.image_alt) : `${title} — ${SITE.name}`

  const data: BlogPostData = {
    seo: {
      title: `${title} | ${SITE.name}`,
      description,
      canonical: `${host}/blog/${slug}`,
      focusKeyword: fm.focus_keyword ? String(fm.focus_keyword) : '',
    },
    h1: title,
    published: String(fm.date ?? ''),
    author: fm.author ? String(fm.author) : `${SITE.name} team`,
    readTime,
    intro: introHtml,
    body,
    conclusion: '',
    relatedPosts,
    cta: {
      primaryLabel: SITE.ctaLabel,
      primaryUrl: SITE.enquiryUrl,
      phone: SITE.phone,
      phoneLabel: `Call ${SITE.phone}`,
    },
    images: {
      header: { src: imageSrc, alt: imageAlt, width: 1200, height: 628, priority: true },
      og: { src: imageSrc, alt: imageAlt, width: 1200, height: 628 },
    },
    tags,
  }

  return { data, division }
}

/** Summaries for the index grid (newest first). */
export function getMarkdownPostSummaries(): BlogSummary[] {
  return getMarkdownSlugs()
    .map(buildSummary)
    .filter((s): s is BlogSummary => s !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

function buildSummary(slug: string): BlogSummary | null {
  const file = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data: fm, content } = matter(fs.readFileSync(file, 'utf8'))

  const title = String(fm.title ?? humanise(slug))
  const plain = stripTags(content)
  const category =
    (fm.service_type && humanise(String(fm.service_type))) ||
    (fm.borough && humanise(String(fm.borough))) ||
    'Insights'

  return {
    slug,
    title,
    excerpt: deriveDescription(plain || title),
    date: String(fm.date ?? ''),
    category,
    image: fm.image ? String(fm.image) : '/placeholder-image.svg',
  }
}
