# 🤖 CODEX PROMPT TEMPLATE — PHASE 3 (Agency & Scale)

You are continuing development of the web app **SnippetLab**.

You MUST follow these documents as the single source of truth:
1) MASTER_PRD.md
2) UI_UX_SPEC.md
3) IMPLEMENTATION_CHECKLIST.md
4) ROADMAP.md

This session is restricted to **Phase 3: Agency Features** only.

---

## Phase Scope (Strict)

You are allowed to implement ONLY the following Phase 3 features from ROADMAP.md:

### Agency / Scale Features
- Bulk SERP preview (CSV upload or URL list)
- Bulk metadata audit:
  - Missing titles
  - Missing meta descriptions
  - Duplicate titles
  - Duplicate descriptions
- Projects grouped by domain or client
- Shareable approval links
- Team access (basic roles)
- White-label exports

---

## Explicitly Forbidden (Non-Negotiable)

The following features MUST NOT be implemented:

- Keyword research
- Rank tracking
- Backlink analysis
- Site crawling
- Technical SEO audits
- Search Console integration
- AI beyond Phase 2 capabilities
- Any Phase 4 feature

If a feature is not listed under **Phase Scope**, DO NOT implement it.

---

## UI / UX Rules

- All UI must conform to UI_UX_SPEC.md
- Do not change:
  - Core editor layout
  - Preview rendering behavior
  - Free vs Pro behavior
- Agency features must appear as:
  - A separate “Bulk / Agency” section
  - Or clearly gated behind Agency plan UI

- Approval links:
  - View-only by default
  - No editing unless user is logged in
  - Clear indication of read-only state

---

## Bulk Workflow Requirements

### Input
- CSV upload OR
- Paste list of URLs

### Output (Table View)
Each row must include:
- URL
- Title status (OK / Too long / Missing)
- Description status (OK / Too long / Missing)
- Duplicate indicator
- Rewrite risk (summary only)
- CTR score (summary only)

Clicking a row must open the standard editor with that page loaded.

---

## Collaboration Rules

### Projects
- Group snippets by:
  - Client
  - Domain
- Projects must not affect single-snippet workflow.

### Team Access
- Basic roles only:
  - Owner
  - Member
- No complex permissions.

---

## Working Style

- Implement in small, testable steps.
- After each step, report:
  1) What was implemented
  2) Which items in IMPLEMENTATION_CHECKLIST.md are now complete
  3) Any remaining TODOs limited strictly to Phase 3

- Any assumptions must be documented explicitly.

---

## Deliverables

At the end of the session, provide:
1) Build Summary
2) Agency Feature Checklist Mapping
3) Known limitations (Phase 3 only)

---

## First Task

Start by implementing:
- Bulk input UI (CSV + URL list)
- Bulk preview results table
- Row click → single-snippet editor loading

Remember:
SnippetLab is a **snippet optimization and workflow tool**, not a full SEO platform.
