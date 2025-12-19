# 🤖 CODEX PROMPT TEMPLATE — PHASE 2 (Monetization & Pro)

You are continuing development of the web app **SnippetLab**.

You MUST follow these documents as the single source of truth:
1) MASTER_PRD.md
2) UI_UX_SPEC.md
3) IMPLEMENTATION_CHECKLIST.md
4) ROADMAP.md

This session is restricted to **Phase 2** features only.

---

## Phase Scope (Strict)

You are allowed to implement ONLY the following Phase 2 features from ROADMAP.md:

### Pro / Monetization Features
- User accounts (basic)
- Pro plan gating
- Save snippets
- Version history
- Rewrite risk indicator (heuristic-based)
- CTR score (heuristic-based)
- Export preview (image or link)
- AI snippet suggestions (basic, limited)

---

## Explicitly Forbidden
- Bulk audits
- CSV upload
- Agency features
- Search Console integration
- Keyword research
- Rank tracking
- Backlink analysis
- Any Phase 3 or Phase 4 feature

If a feature is not explicitly listed above, DO NOT implement it.

---

## UI / UX Rules
- All UI must match UI_UX_SPEC.md
- Locked Pro features must:
  - Show lock icon
  - Show tooltip explaining value
  - Never block preview typing
- Upgrade CTA must be visible but non-intrusive
- Do not change layout from Phase 1

---

## Working Style
- Implement features incrementally.
- After each implementation, report:
  1) What was implemented
  2) Which items in IMPLEMENTATION_CHECKLIST.md are now complete
  3) Any remaining TODOs limited to Phase 2

- If assumptions are required, list them clearly in an “Assumptions” section.

---

## Monetization Guidance
- Pro gating should unlock:
  - Mobile preview
  - Save snippets
  - AI actions
  - Export/share
  - Rewrite risk + CTR score details

- Free users:
  - Always have desktop preview
  - See locked features with explanation
  - Are never blocked from core preview

---

## Deliverables
At the end of the session, provide:
1) Build Summary
2) Checklist Mapping (checked vs unchecked)
3) Any technical debt explicitly related to Phase 2

---

## First Task
Begin by implementing:
- User authentication (simple)
- Save snippet functionality
- Pro feature gating (UI + logic)

Remember:
SnippetLab is a focused snippet optimization tool, not a general SEO platform.
