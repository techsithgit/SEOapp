# 🤖 CODEX PROMPT TEMPLATE — PHASE 4 (Integrations & Moat)

You are continuing development of the web app **SnippetLab**.

You MUST follow these documents as the single source of truth:
1) MASTER_PRD.md
2) UI_UX_SPEC.md
3) IMPLEMENTATION_CHECKLIST.md
4) ROADMAP.md

This session is restricted to **Phase 4: Integrations & Retention** only.

---

## Phase Scope (Strict)

You are allowed to implement ONLY the following Phase 4 features from ROADMAP.md:

### Integrations
- Google Search Console (GSC) integration (read-only)
- CTR opportunity finder:
  - Identify pages with high impressions and low CTR
  - Identify pages ranking near page 1 (positions 4–12)
- CMS integrations:
  - WordPress plugin
  - Shopify app
- Public API (read-only initially)

---

## Explicitly Forbidden (Non-Negotiable)

The following features MUST NOT be implemented:

- Keyword research
- Rank tracking
- Backlink analysis
- Full site crawling
- Technical SEO audits
- Competitive SERP scraping
- Paid search data
- Any feature that replaces full SEO platforms

If a feature is not explicitly listed under **Phase Scope**, DO NOT implement it.

---

## Integration Rules

### Google Search Console
- Read-only access only
- No data modification
- Pull only:
  - Page URL
  - Impressions
  - Clicks
  - CTR
  - Average position
- Data refresh must be manual or scheduled (no real-time polling)

---

### CTR Opportunity Finder

Rules:
- Clearly explain why a page is an opportunity
- Rank opportunities by:
  - High impressions
  - Low CTR
  - Position proximity to top results
- One-click action:
  - “Open in Snippet Editor”

This feature must feel like **guided optimization**, not analytics overload.

---

### CMS Integrations (WordPress / Shopify)

Rules:
- Integration must:
  - Edit title & meta description
  - Show live SnippetLab preview
  - Push updates back to CMS
- Do NOT add:
  - Keyword research
  - Content writing tools
- CMS UI must mirror SnippetLab editor as closely as possible.

---

### Public API

Rules:
- Read-only initially
- Support:
  - Preview generation
  - Truncation validation
  - Rewrite risk scoring
- Clear rate limits
- No bulk scraping use cases

---

## UI / UX Rules

- Integration features must not clutter core editor
- GSC & Opportunities appear as separate sections
- Maintain calm, focused UX
- No dashboards full of charts

---

## Working Style

- Implement one integration at a time
- After each integration, report:
  1) What was implemented
  2) Which PRD requirements are now satisfied
  3) Any known limitations

- Any assumptions must be documented explicitly

---

## Deliverables

At the end of the session, provide:
1) Integration Summary
2) Feature-to-PRD mapping
3) Known risks or limitations (Phase 4 only)

---

## First Task

Start with:
- Google Search Console read-only integration
- Basic CTR opportunity list
- One-click open in snippet editor

Remember:
SnippetLab exists to improve **snippets and clicks**, not to become a full SEO analytics platform.
