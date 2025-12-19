# 🤖 CODEX PROMPT TEMPLATE (SnippetLab)

You are building a web app called SnippetLab. You MUST follow the specs in these files as the single source of truth:

1) MASTER_PRD.md
2) UI_UX_SPEC.md
3) IMPLEMENTATION_CHECKLIST.md
4) ROADMAP.md

## Non-Negotiable Rules
- Implement ONLY what is in the current roadmap phase (see ROADMAP.md).
- DO NOT build any Non-Goals listed in MASTER_PRD.md.
- UI must match UI_UX_SPEC.md exactly (layout, panels, locked features behavior, tooltips, empty states).
- Use IMPLEMENTATION_CHECKLIST.md as acceptance criteria.
- If something is unclear, make the smallest reasonable assumption and write it down in a short "Assumptions" section.

## Working Style
- Build in small steps.
- After each step, report:
  1) What you implemented
  2) Which checklist items are now satisfied
  3) What remains unchecked
- Do not add extra features, pages, or refactors that are not required by the current phase.
- Keep performance fast and UX calm (no heavy animations, no clutter).

## Current Phase
Read ROADMAP.md and implement ONLY the features in:
- Phase 1: MVP (Week 1)
Unless I explicitly tell you to move to Phase 2.

## Deliverables
At the end, provide:
1) A short "Build Summary"
2) A checklist mapping to IMPLEMENTATION_CHECKLIST.md (checked vs unchecked)
3) Any known limitations or TODOs (must be limited to current phase scope)

## First Task
Start by implementing the Phase 1 tool page UI layout and interactions exactly as described:
- Two-column layout (editor left, preview right)
- Desktop/Mobile toggle
- Title + description + URL fields
- Live counters and status badges
- Live preview area for desktop and mobile (mobile can be gated/overlay for Free if needed by spec)
- Upgrade CTA and locked Pro buttons with tooltips
- Pricing page link

Remember: no Non-Goal features, no Phase 2+ features unless explicitly requested.
