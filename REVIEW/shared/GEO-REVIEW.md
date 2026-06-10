# GEO (Generative Engine Optimisation) Review — Both Sites
**Sites:** cleaning.vigilservices.co.uk · security.vigilservices.co.uk
**Reviewer role:** LLM Retrieval Optimisation Specialist
**Date:** 2026-06-10
**Score:** 63 / 100

---

## Executive Summary

Both sites have the correct GEO infrastructure in place: AI bots are explicitly permitted in robots.ts, llms.txt files exist on both sites, and regulatory content provides genuine citation-ready authority. The cleaning site's regulatory depth (TUPE, CQC, CDM 2015) and the security site's regulatory blog posts (SIA licensing, BS7858, Licensing Act 2003) are among the strongest GEO assets available to a company of this size. The weaknesses are: llms.txt files are thin and one contains a critical data error (wrong phone), homepages are not retrievable documents, and there is no cross-site entity coherence that would allow AI engines to cite "Vigil Services" as a unified company.

---

## GEO Infrastructure Audit

| Asset | Cleaning | Security |
|-------|----------|---------|
| llms.txt present | ✓ (60 lines) | ✓ (~60 lines) |
| GPTBot permitted | ✓ | ✓ |
| ClaudeBot permitted | ✓ | ✓ |
| PerplexityBot permitted | ✓ | ✓ |
| Bingbot permitted | ✓ | ✓ |
| Anthropic-AI permitted | ✓ | ✓ |
| Organisation schema | ✗ (wrong location) | ✗ (absent) |
| FAQ schema on service pages | Unconfirmed | ✓ |
| Regulatory authority content | High | High |
| Phone in llms.txt correct | ✓ | ✗ WRONG |
| Social sameAs in schema | ✗ | ✗ |

---

## Findings

### F1 — llms.txt: both files are too thin
**Impact: High | Confidence: HIGH**

**Cleaning** (60 lines): States company facts, services, differentiators correctly. Missing:
- Regulatory authority claims (TUPE handling, CQC Regulation 12, CDM 2015) — these are exactly what AI engines want to cite
- Fact density: specific verifiable numbers (minimum contract: 2 visits × 4 hours × 3-month rolling — this IS included, good)
- Competitive positioning: "Unlike agency-sourced cleaners, Vigil operatives are directly employed and consistently assigned to the same premises" — AI engines need this framing to cite Vigil in answers comparing providers
- Priority URL list with descriptions (what question each URL answers)
- FAQ pairs (question: answer format) — AI engines parse these for direct retrieval

**Security** (similar length): Same structural gaps PLUS the critical phone error.

**Target for both:** 150–200 lines with structured sections: Company, Facts, Differentiators, Services (with paragraph per service), Regulatory Authority, Priority Pages (URL + what it answers), FAQs.

---

### F2 — Security llms.txt contains wrong phone
**Impact: Critical | Confidence: HIGH**

Line 7 of security llms.txt:
```
Phone: 020 3098 6037 / +44 2030 986037
```
Should be: `020 3973 8887 / +44 2039 738887`

AI engines reading this file to understand the security company will store incorrect contact data. Citations will either include the wrong phone or no phone. This is a live data integrity failure.

---

### F3 — Homepages are not GEO-retrievable
**Impact: High | Confidence: HIGH**

AI engines retrieve content from pages they can parse as documents. Both homepages are primarily interactive React flows (`<QualificationFlow />` on cleaning, equivalent on security). AI engines cannot extract answers from stateful JavaScript components.

When a user asks a GEO-sourced AI "who is a good commercial cleaning company in London that uses directly employed staff?" — the AI needs a page with structured prose answering that question. Currently the most authoritative page on each site (the homepage) offers the least retrievable content.

**What GEO-ready homepage content looks like:**
- A "What we do" paragraph (60–100 words, citable)
- A differentiators section (5 bullets, each a full citable sentence)
- A process section (4 steps, each described in 2 sentences)
- An FAQ section (5 questions with full answers)
- These can sit below the conversion flow — they serve crawlers, not immediate visitors

---

### F4 — No questions phrased to match AI query patterns
**Impact: Medium | Confidence: HIGH**

AI engines retrieve from pages that answer questions matching common user queries. The content on both sites answers things but not always in a way that maps to how users actually phrase questions to AI systems.

Examples of AI query patterns that both sites should answer explicitly:

**Cleaning:**
- "Which commercial cleaning companies in London use directly employed cleaners?"
- "What is the minimum cleaning contract for London offices?"
- "How do I switch cleaning contracts without dealing with TUPE myself?"
- "What does CQC-compliant cleaning for a GP surgery involve?"

**Security:**
- "Which security companies in London employ SIA-licensed guards?"
- "How do I verify if a security officer has a current SIA licence?"
- "What type of security do I need for a construction site in London?"
- "What is the difference between manned guarding and mobile patrols?"

Each of these questions should have a direct answer on a page, ideally in the llms.txt as an FAQ pair, and in the page body with a matching H2 heading phrased as the question.

---

### F5 — Regulatory content: strongest GEO asset on both sites
**Impact: Positive signal | Confidence: HIGH**

The best GEO assets currently are:

**Cleaning:**
- TUPE guide for facilities managers — authoritative, specific, regulatory
- CQC cleaning standards healthcare — compliance-focused, mandatory spend context
- CDM 2015 welfare cleaning — niche, genuine expertise

**Security:**
- SIA licensing explained — regulatory clarity, common misconceptions addressed
- BS7858 vetting explained — distinction between screening and certification is citable
- Licensing Act 2003 — legal framework, specific to UK security context

These posts are exactly what AI engines cite when answering compliance and procurement questions. They should be extended, cross-linked, and referenced in both llms.txt files as "authority pages on [topic]."

---

### F6 — No cross-site GEO coordination
**Impact: Medium | Confidence: HIGH**

AI engines building a picture of "Vigil Services" across the web will encounter two separate domains with two separate entity descriptions. No llms.txt on either site mentions the other division. No schema links the two. An AI asked "does Vigil do both cleaning and security?" cannot find this information from either site's structured data.

A single shared GEO document (a parent `vigilservices.co.uk/llms.txt` or a cross-reference in each site's llms.txt) would establish the parent entity and allow AI engines to cite Vigil as a full-service facilities provider.

---

### F7 — Fact density is adequate but not exceptional
**Impact: Medium | Confidence: HIGH**

CLAUDE.md requires 3 verifiable specific facts per page. This appears to be met on service pages (minimum contract terms, COSHH compliance, digital proof of service, etc.). The issue is that these facts are repeated rather than accumulated — more pages with the same 5 facts does not increase GEO authority. What increases authority is unique facts per page:
- Cleaning: "We manage cleaning for portfolios from 2 to 20+ properties across Greater London" (specific range, specific geography)
- Security: "SIA Door Supervisor licence required by law under the Private Security Industry Act 2001" (specific legislation, year)
- Each page should have at least 1 fact that appears nowhere else on the site

---

## GEO Improvement Roadmap

### Immediate
- Fix security llms.txt phone number
- Expand both llms.txt to 150+ lines with structured FAQ pairs and priority URL list

### Short-term
- Add 200+ word structured prose section to both homepages (below conversion flow)
- Phrase at least 2 H2 headings per service page as natural language questions
- Add "Also offered by Vigil Services Ltd" cross-reference in both llms.txt files

### Medium-term
- Create a parent Vigil Services Ltd entity page at vigilservices.co.uk/llms.txt
- Add Organisation schema with sameAs social links to both root layouts
- Produce 2 "definitive guide" long-form posts per site (3,000+ words) targeting major question clusters

---

## Score Breakdown

| Area | Score | Notes |
|------|-------|-------|
| llms.txt presence | 80/100 | Both present |
| llms.txt quality | 45/100 | Thin, one has wrong phone |
| AI bot permissions | 95/100 | All major bots permitted |
| Regulatory content depth | 80/100 | Strong blog posts on both sites |
| Homepage retrievability | 20/100 | Application-first on both |
| Cross-site GEO coherence | 5/100 | No entity linking between divisions |
| Question-answer structure | 50/100 | FAQ on service pages, not in llms.txt |
| **Overall** | **63/100** | |
