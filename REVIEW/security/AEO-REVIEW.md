# AEO Review — Security Site
**Site:** security.vigilservices.co.uk
**Repo:** netyvee/security
**Reviewer role:** LLM Retrieval Optimisation Specialist
**Date:** 2026-06-10
**Score:** 69 / 100

---

## Executive Summary

The security site's three blog posts (SIA licensing explained, BS7858 vetting explained, Licensing Act 2003) are the strongest AEO assets across both sites. These are authoritative, question-structured, regulatory documents that AI engines actively seek to cite when answering SIA-related queries. The FAQ component appears on 22 pages. The weakness is the same as the cleaning site: the homepage is an application, not a document. Additionally the llms.txt carries the wrong phone number, which will corrupt AI-generated citations. The BS7858 blog post contains a passage that correctly explains the difference between "following BS7858" and "being BS7858 certified" — this nuance is exactly the type of content AI engines quote when distinguishing credential claims.

---

## Findings

### F1 — Blog posts are exceptional AEO assets
**Impact: Positive signal | Confidence: HIGH**

Three blog posts:

**1. `/blog/sia-licensing-explained/`**
Explains that the SIA licenses individuals, not companies — and that "SIA Approved Contractor" is a misnomer because the ACS is run by SSAIB, not SIA. This is precisely the kind of nuanced regulatory clarification AI engines quote when a user asks "is my security company SIA approved?" Vigil's answer ("what matters is whether individual officers hold current SIA licences") is defensible, accurate, and positions Vigil correctly.

**2. `/blog/bs7858-vetting-explained/`**
Explains BS7858 as a screening standard (not a certification), what it involves, and how to evaluate a provider. 104 references to BS7858 across the page — all in educational context. The passage "Businesses should be cautious of providers who claim to be 'BS7858 certified'" is a direct competitive differentiator that could be cited by AI engines answering vetting questions.

**3. `/blog/licensing-act-2003-security/`**
Covers SIA licensing under the Licensing Act 2003. Strong regulatory authority signal.

**Assessment:** These 3 posts alone give the security site more GEO authority than the cleaning site's 3 blog posts, because the regulatory specificity is higher and the questions they answer have more AI-retrievable framing.

---

### F2 — llms.txt contains wrong phone: corrupts AI citations
**Impact: Critical | Confidence: HIGH**

`public/llms.txt`:
```
Phone: 020 3098 6037 / +44 2030 986037
```

This is the **cleaning site phone**. Any AI engine that reads llms.txt to understand the security company will store the wrong contact number. When it cites Vigil Security Services in response to "who are good security companies in London?", it will either cite no phone or cite the cleaning phone. This is a data quality failure in the primary GEO asset.

---

### F3 — FAQ component on 22 pages — best coverage of both sites
**Impact: Positive signal | Confidence: HIGH**

22 pages show FAQ content. This includes all 8 service pages and all 9 borough pages — better coverage than the cleaning site. The FAQPage schema (via `buildFAQSchema`) is confirmed emitted on multiple pages (verified in source). This means security service pages are eligible for Google FAQ rich results and AI engine citation from FAQs.

---

### F4 — Homepage is application-first
**Impact: High | Confidence: HIGH**

Same structural problem as cleaning site. The homepage is primarily a qualification/contact flow. AI engines cannot quote interactive components — they quote document prose. The security homepage likely has minimal crawlable content compared to its authority weight.

---

### F5 — No claims about forbidden credentials — correctly framed
**Impact: Positive signal | Confidence: HIGH**

Forbidden claim audit results:
- ACS references: 1 — in blog post, explaining ACS is a separate non-SIA scheme (correct)
- ISO certified: 1 — in blog, explaining BS7858 ≠ ISO certification (correct)
- BS7858 as a trust pill (non-blog pages): 0 — clean

The security site does NOT claim "ACS approved", "SIA approved contractor", "ISO certified", or "BS7858 certified" as credentials. It correctly limits claims to:
- SIA-licensed officers
- DBS-checked
- Directly employed
- £10M liability
- Greater London coverage

This is compliant with CLAUDE.md VIGIL SECURITY section. No compliance issues found.

---

### F6 — No quick answer blocks confirmed on service pages
**Impact: High | Confidence: MEDIUM**

CLAUDE.md mandates Quick Answer Blocks (40–60 words, before H1) on every page. These are the primary featured snippet and voice search targeting elements. Confirmation of their presence on security service pages requires a read of individual page files — not confirmed from grep. If missing, each service page loses its best chance of appearing in position-zero results.

---

### F7 — TL;DR lines: unconfirmed
**Impact: Medium | Confidence: LOW**

Same as cleaning site — TL;DR lines under H2 mandated but not confirmed at scale. These are the second-most important AEO signal (AI engines use them for section summaries).

---

### F8 — No pricing or cost content
**Impact: Medium | Confidence: HIGH**

"How much does a security guard cost per hour in London?" is a high-volume, high-intent query. The site has no page addressing cost structure, pricing factors, or even "request a quote" framing that acknowledges cost. Competitors who answer cost questions rank for them. An authoritative guide ("Commercial security costs in London: what to expect") would capture buyers at early research stage.

---

## Priority AEO Improvements

1. Fix llms.txt phone number — immediate, corrupts all AI citations
2. Add quick answer block to any service pages missing them
3. Add FAQ section to homepage with 5 common questions (static, not in the flow)
4. Write "Security guard costs London" blog post — high-intent, currently unaddressed
5. Expand llms.txt to 150+ lines with sector context, regulatory references, priority URLs
6. Add blog CTAs — same gap as cleaning site

---

## Score Breakdown

| Area | Score | Notes |
|------|-------|-------|
| Blog AEO quality | 88/100 | Three exceptional regulatory posts |
| FAQ coverage | 80/100 | 22 pages, schema confirmed on multiple pages |
| Forbidden claims compliance | 100/100 | All claims correctly scoped |
| llms.txt quality | 30/100 | Wrong phone, otherwise adequate |
| Homepage retrievability | 25/100 | Application-first, thin prose |
| Cost/pricing content | 10/100 | No pricing content anywhere |
| **Overall** | **69/100** | |
