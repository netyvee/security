"""
Security Service Page Converter v1
Extracts faqs and SEO meta from existing security service pages.
"""
import re, os, sys

JS_STRING = r"(?:[^'\\]|\\.)*"

def extract_array_block(content, var_name):
    m = re.search(rf'const\s+{var_name}\s*=\s*\[', content)
    if not m:
        return None
    pos = content.find('[', m.start())
    depth = 0
    for i in range(pos, len(content)):
        if content[i] == '[': depth += 1
        elif content[i] == ']':
            depth -= 1
            if depth == 0:
                return content[pos:i+1]
    return None

def extract_eeat_items(content):
    for var_name in ('included', 'features', 'services', 'whyCards', 'responseTypes'):
        block = extract_array_block(content, var_name)
        if block:
            items = re.findall(
                rf'\{{\s*(?:n:\s*[\'"][^\'"]+[\'"],\s*)?title:\s*\'({JS_STRING})\',\s*(?:body|desc):\s*\'({JS_STRING})\'',
                block, re.DOTALL
            )
            if items:
                return [(t.strip(), d.strip()) for t, d in items[:6]]
    return []

def extract_seo(content, slug):
    # Extract JS const variables (focusKeyword, serviceTitle, etc.)
    vars_ = {}
    for m in re.finditer(r"const\s+(\w+)\s*=\s*['\"`]([^'\"`\n]+)['\"`]", content):
        vars_[m.group(1)] = m.group(2)

    def resolve(s):
        """Replace ${varName} template expressions with extracted values."""
        def repl(m):
            return vars_.get(m.group(1), '')
        return re.sub(r'\$\{(\w+)\}', repl, s).strip(' |').strip()

    # Match backtick template strings first, then single/double quoted
    title_m_bt = re.search(r"title:\s*`([^`]+)`", content)
    title_m_sq = re.search(r"title:\s*['\"]([^'\"]+)['\"]", content)
    title_raw  = title_m_bt.group(1) if title_m_bt else (title_m_sq.group(1) if title_m_sq else '')
    title      = resolve(title_raw)

    desc_m_bt  = re.search(r"description:\s*\n?\s*`([^`]+)`", content)
    desc_m_sq  = re.search(rf"description:\s*\n?\s*'({JS_STRING})'", content)
    desc_raw   = desc_m_bt.group(1) if desc_m_bt else (desc_m_sq.group(1) if desc_m_sq else '')
    desc       = resolve(desc_raw)

    canon_m = re.search(r"canonical:\s*['\"]([^'\"]+)['\"]", content)
    canon   = canon_m.group(1).strip() if canon_m else ''

    canon = canon_m.group(1).strip() if canon_m else ''

    base = 'https://security.vigilservices.co.uk'
    if canon and not canon.startswith('http'):
        canon = base + '/' + canon.strip('/') + '/'
    elif not canon:
        canon = f'{base}/{slug}/'

    return title, desc, canon

def extract_h1(content):
    m = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    if not m: return ''
    raw = re.sub(r'\{[^}]+\}', ' ', m.group(1))
    raw = re.sub(r'<[^>]+>', ' ', raw)
    return re.sub(r'\s+', ' ', raw).strip()

def choose_eeat_icon(title):
    tl = title.lower()
    if 'sia' in tl or 'licens' in tl: return '🪪'
    if 'dbs' in tl or 'vet' in tl: return '🔒'
    if 'response' in tl or '15' in tl or 'speed' in tl: return '⚡'
    if 'digital' in tl or 'report' in tl or 'record' in tl: return '📋'
    if 'cctv' in tl or 'monitor' in tl: return '📹'
    if 'employ' in tl or 'direct' in tl or 'agency' in tl: return '✓'
    if 'insur' in tl: return '🛡️'
    if 'patrol' in tl or 'mobile' in tl: return '🚗'
    if 'patrol' in tl: return '🚗'
    if 'access' in tl: return '🚪'
    if 'bs7858' in tl: return '🔍'
    return '✓'

def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

def convert(page_file):
    with open(page_file, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    if 'components/templates/ServicePage' in content:
        print(f'SKIP (already converted): {page_file}')
        return False

    slug = os.path.basename(os.path.dirname(page_file))

    title, desc, canon = extract_seo(content, slug)
    h1    = extract_h1(content)
    eeat_items = extract_eeat_items(content)

    faqs_block = extract_array_block(content, 'faqs') or '[]'

    # Build h1 fallback from slug
    if not h1:
        h1 = ' '.join(w.capitalize() for w in slug.replace('-', ' ').split())

    # Build title fallback
    if not title:
        title = f'{h1} | SIA-Licensed Security | Vigil Security Services'

    if not desc:
        desc = f'{h1} — SIA-licensed officers, directly employed, DBS checked. 15-minute response across Greater London.'

    kw = h1.lower() if h1 else slug.replace('-', ' ')

    # EEAT points
    eeat_lines = ['[\n']
    for title_e, desc_e in eeat_items:
        icon = choose_eeat_icon(title_e)
        eeat_lines.append(f"    {{ icon: '{icon}', title: '{esc(title_e)}', description: '{esc(desc_e)}' }},\n")
    if not eeat_items:
        eeat_lines += [
            "    { icon: '🪪', title: 'SIA-licensed officers', description: 'Every officer holds a current SIA licence in the appropriate category — Security Guarding or Door Supervision.' },\n",
            "    { icon: '🔒', title: 'BS7858 vetted', description: 'Full 5-year employment history check and ID verification before deployment.' },\n",
            "    { icon: '⚡', title: '15-minute response', description: 'Every client query answered within 15 minutes — throughout the contract.' },\n",
            "    { icon: '📋', title: 'Digital shift reports', description: 'Timestamped shift logs and incident reports after every deployment.' },\n",
        ]
    eeat_lines.append('  ]')
    eeat_str = ''.join(eeat_lines)

    new_file = f'''/**
 * SERVICE PAGE — {h1 or slug}
 * Template: ServicePage v1.0 — June 2026
 * Images: assign via app.vigilservices.co.uk/admin/pages
 */

import {{ Metadata }}  from 'next'
import ServicePage    from '@/components/templates/ServicePage'
import {{ generateServicePageSchema }} from '@/lib/schema/service-page-schema'
import type {{ ServicePageData, FAQ }} from '@/types/page-templates'

const images: ServicePageData['images'] = {{
  hero:  {{ src: '/placeholder-image.svg',
            alt: '{esc(h1 or slug)} London',
            width: 1200, height: 630, priority: true }},
  intro: {{ src: '/placeholder-image.svg',
            alt: '{esc(h1 or slug)} officers Greater London',
            width: 600, height: 400 }},
  step1: {{ src: '/placeholder-image.svg',
            alt: 'Vigil security consultation Greater London',
            width: 400, height: 300 }},
  step2: {{ src: '/placeholder-image.svg',
            alt: 'Vigil security site assessment Greater London',
            width: 400, height: 300 }},
  step3: {{ src: '/placeholder-image.svg',
            alt: 'Vigil security officers deployed Greater London',
            width: 400, height: 300 }},
  trust: {{ src: '/placeholder-image.svg',
            alt: 'Vigil Security Services team Greater London',
            width: 500, height: 500 }},
  og:    {{ src: '/placeholder-image.svg',
            alt: '{esc(h1 or slug)} Vigil Security Services',
            width: 1200, height: 630 }},
}}

const faqs: FAQ[] = {faqs_block}

const pageData: ServicePageData = {{
  seo: {{
    title:        '{esc(title)}',
    description:  '{esc(desc)}',
    canonical:    '{canon}',
    focusKeyword: '{esc(kw)}',
  }},
  h1:          '{esc(h1)}',
  subheadline: 'SIA licensed. BS7858 vetted. 15-minute response. Greater London.',
  quickAnswer: 'Vigil Security Services provides {esc(h1.lower() if h1 else "security services")} exclusively to businesses across Greater London. Every officer is directly employed — never agency supplied.',
  intro:       '<p>Vigil Security Services works exclusively with businesses across Greater London. Every officer is directly employed by Vigil Services Ltd — SIA-licensed, BS7858 vetted, and consistently assigned to your contract.</p>',
  services:    [],
  processSteps: [
    {{ number: 1, title: 'Contact Vigil',
       description: 'Call or complete the enquiry form. We respond within 15 minutes.',
       timeframe: 'Within 15 minutes' }},
    {{ number: 2, title: 'Site risk assessment',
       description: 'We visit your premises, assess your security requirements, and produce a written specification.',
       timeframe: 'Within 48 hours' }},
    {{ number: 3, title: 'Officers deployed',
       description: 'Your directly employed, SIA-licensed team begins on your agreed start date.',
       timeframe: 'As agreed' }},
  ],
  eeatPoints:    {eeat_str},
  complianceTags: ['SIA Licensed', 'BS7858 Vetted', 'DBS Enhanced', 'Directly Employed',
                   '£10M Insured', 'PSIA 2001', 'Company Reg. 11756806'],
  boroughLinks:  [],
  faqs,
  cta: {{
    primaryLabel: 'Get a security quote',
    primaryUrl:   'https://app.vigilservices.co.uk/enquire/security',
    phone:        '020 3973 8892',
    phoneLabel:   'Call 020 3973 8892',
  }},
  images,
}}

export const metadata: Metadata = {{
  title:       pageData.seo.title,
  description: pageData.seo.description,
  alternates:  {{ canonical: pageData.seo.canonical }},
  openGraph: {{
    title:       pageData.seo.title,
    description: pageData.seo.description,
    url:         pageData.seo.canonical,
    locale:      'en_GB',
    images: [{{ url: images.og.src, width: 1200,
               height: 630, alt: images.og.alt }}],
  }},
}}

export default function Page() {{
  const schema = generateServicePageSchema(pageData, 'security')
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(schema) }}}}
      />
      <ServicePage data={{pageData}} />
    </>
  )
}}
'''

    with open(page_file, 'w', encoding='utf-8') as f:
        f.write(new_file)
    print(f'CONVERTED: {page_file}')
    return True

if __name__ == '__main__':
    page_file = sys.argv[1]
    convert(page_file)
