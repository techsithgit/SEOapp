# 📘 MASTER PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Product Name (Working)
**SnippetLab**

---

## 1. Product Vision

SnippetLab helps creators, founders, and SEO professionals preview and optimize Google search snippets so they get more clicks and avoid Google rewriting their titles.

This product is **not a full SEO suite**.  
It is a **focused SERP snippet optimization tool** centered on:
- Preview accuracy
- Click-through rate (CTR)
- Workflow efficiency

---

## 2. Problem Statement

### User Problems
1. Google truncates titles unpredictably (pixel-based, not character-based)
2. Google frequently rewrites titles and descriptions
3. Users publish meta tags without knowing how they will look on desktop and mobile
4. Existing tools are bundled in large SEO suites, slow, cluttered, or inaccurate

### Why This Matters
- Small CTR improvements can lead to large traffic gains
- SEO users already care deeply about snippet optimization
- There is strong search demand for SERP preview tools

---

## 3. Target Users

### Primary Users
- Bloggers and niche site owners
- Indie founders and SaaS marketers
- SEO freelancers

### Secondary Users
- Small SEO agencies
- Content teams
- E-commerce managers (Shopify / WordPress)

---

## 4. Core Value Proposition

**Know exactly how your Google result will look — and fix issues before you publish.**

Differentiators:
- Pixel-accurate previews
- Desktop and mobile simulation
- Rewrite-risk awareness
- CTR-focused optimization
- Lightweight and fast UX

---

## 5. Core Use Cases

1. User types a title and description → sees live Google preview
2. User fixes truncation and warning issues
3. User compares multiple snippet variants
4. User saves or exports the final version
5. Agencies audit many pages at once (later phase)

---

## 6. MVP Feature Requirements (Phase 1)

### 6.1 SERP Preview Engine
- Google desktop preview
- Google mobile preview
- Pixel-based title truncation
- Character and pixel counters
- Ellipsis rendering
- URL / breadcrumb display

### 6.2 Snippet Editor
- Title input
- Meta description input
- URL / slug input
- Real-time preview updates
- Status badges:
  - Good
  - Too long
  - Too short

### 6.3 UX Requirements
- Two-column desktop layout (editor left, preview right)
- Single-column responsive layout on mobile
- No login required for basic usage
- Instant feedback while typing
- Clear visual hierarchy

### 6.4 Monetization Hooks
- Visible “Upgrade” CTA
- Locked Pro features with tooltips
- Pricing page linked
- Free users always receive full preview value

---

## 7. Pro Features (Phase 2)

### Optimization
- Rewrite risk indicator (Low / Medium / High)
- CTR score (heuristic-based)
- Keyword usage warnings
- Emoji and symbol compatibility checks

### AI Actions (Pro Only)
- Generate alternative titles/descriptions
- Improve for CTR
- Shorten without losing intent
- Brand-safe rewrites

### Workflow
- User accounts
- Save snippets
- Version history
- Variant comparison
- Export preview as image or shareable link

---

## 8. Agency Features (Phase 3)

### Bulk Operations
- CSV upload or URL list
- Bulk preview generation
- Duplicate title/description detection
- Missing meta detection

### Collaboration
- Projects by domain/client
- Shareable approval links
- Team access
- White-label exports

---

## 9. Integrations (Phase 4)

- Google Search Console integration
- CTR opportunity finder (high impressions, low CTR)
- WordPress integration
- Shopify integration
- Public API access

---

## 10. Non-Goals (Explicitly Out of Scope)

The following must NOT be built in early phases:

- Keyword research
- Rank tracking
- Backlink analysis
- Full site crawls
- Technical SEO audits
- Competitor backlink data

---

## 11. Pricing Strategy

### Free
- Unlimited previews
- Desktop preview only
- No saving
- No AI
- No bulk features

### Pro ($9–$15/month)
- Desktop and mobile previews
- Save snippets
- AI optimization credits
- Rewrite risk and CTR score
- Social previews
- Export and share

### Agency ($29–$49/month)
- Bulk previews
- Projects and clients
- Approval links
- White-label exports
- Team access

---

## 12. Success Metrics

### MVP Success
- Users complete previews without confusion
- Organic traffic grows from SERP-related keywords
- Users click Upgrade from the tool page

### Revenue Success
- 2–5% Free → Pro conversion
- Agencies onboard within 60 days
- Low churn from repeat usage

---

## 13. UX Principles (Non-Negotiable)

- Preview is always more important than text explanations
- Show value before asking for payment
- Never block typing or preview behind a paywall
- Locked features explain why they are useful
- UI should feel calm, focused, and fast

---

## 14. Launch Strategy

- Launch MVP even if Pro features are minimal
- Use free tool as SEO traffic magnet
- Iterate only on features users explicitly request
- Expand deliberately and slowly

---

## 15. Decision Rule (Founder Guardrail)

If a feature does not improve preview accuracy, CTR, or workflow speed — do not build it.
