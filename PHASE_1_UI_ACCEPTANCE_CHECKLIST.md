# ✅ Phase 1 UI Acceptance Checklist (Mapped to shadcn/ui)

## Goal
Verify that the Phase 1 UI matches:
- MASTER_PRD.md (Phase 1 scope)
- UI_UX_SPEC.md (layout + behavior)
- shadcn/ui component inventory

Nothing is “done” until checked.

---

# 1) Global Layout & Navigation

## Top Navigation (Custom + shadcn Button)
- [x] Nav is visible on all pages
- [x] Logo + product name appear on left
- [x] Pricing link exists and is clickable
- [x] Login link exists (can be placeholder in Phase 1)
- [x] Upgrade CTA is a shadcn **Button** and visually primary
- [x] Nav is sticky (remains visible on scroll)

---

# 2) Tool Page Structure

## Two-Column Layout (Custom)
- [x] Desktop: Editor on left (~40%), Preview on right (~60%)
- [x] Column gap is visually comfortable (no cramped layout)
- [x] Preview is visible without scrolling on typical laptop screens

## Mobile Layout (Custom)
- [x] Single-column layout
- [x] Preview appears before warnings/suggestions
- [x] Desktop/Mobile toggle is accessible without scrolling

---

# 3) Editor Panel (Left)

## Snippet Inputs Card (shadcn Card, Input, Textarea, Label)
- [x] Inputs are inside a shadcn **Card**
- [x] Labels use shadcn **Label**
- [x] Title uses shadcn **Input**
- [x] Meta description uses shadcn **Textarea**
- [x] URL/slug uses shadcn **Input** (domain can be read-only/muted)

## Live Counters & Status (Custom + shadcn Badge)
- [x] Title shows character count
- [x] Title shows pixel count (if implemented in Phase 1)
- [x] Meta description shows character count
- [x] Status badge uses shadcn **Badge**
- [x] Badge changes based on length state:
  - Good
  - Too long
  - Too short

## Counter Explanations (shadcn Tooltip)
- [x] Pixel counter has an info tooltip explaining pixel-based truncation
- [x] Tooltip appears on hover/focus and does not block typing

---

# 4) Quick Actions Row (Pro-Locked)

## Locked Buttons (shadcn Button + Tooltip)
- [x] Quick actions exist:
  - Generate alternatives
  - Improve CTR
  - Shorten title
  - Add keyword
- [x] Buttons appear disabled/locked in Phase 1
- [x] Each locked button shows a shadcn **Tooltip** on hover:
  “Available on Pro. Upgrade to unlock.”

---

# 5) Warnings & Suggestions Panel

## Warnings UI (shadcn Accordion recommended)
- [x] Warnings panel is present
- [x] Uses shadcn **Accordion** (or Collapsible if chosen)
- [x] At least basic warnings appear when appropriate:
  - Title too long
  - Title too short (optional)
  - Description too long/short (optional)
- [x] Warning items expand/collapse smoothly
- [x] Expanded warning includes:
  - Short explanation text
  - Suggested fix text

## Apply Fix (Pro-Locked)
- [x] “Apply fix” button exists (even if non-functional in Phase 1)
- [x] “Apply fix” is locked/disabled
- [x] Hover shows tooltip explaining Pro unlock

---

# 6) Preview Panel (Right)

## Preview Container (shadcn Card + Tabs)
- [x] Preview area is inside a shadcn **Card**
- [x] Preview uses shadcn **Tabs**:
  - Desktop
  - Mobile

## Desktop Preview (Custom SERP block)
- [x] Preview updates instantly when typing
- [x] Shows:
  - Site name / favicon placeholder
  - URL/breadcrumb line
  - Blue title line
  - Meta description line(s)
- [x] Truncation visually shows ellipsis when over limit (if implemented)
- [x] Desktop preview looks “Google-like” and calm

## Mobile Preview (Custom SERP block + locked overlay)
- [x] Mobile preview tab exists
- [x] For Free users, mobile preview is gated with a clear overlay:
  “Mobile preview is a Pro feature”
- [x] Overlay includes Upgrade button (shadcn Button)
- [x] Desktop preview remains fully usable in Free

---

# 7) Empty States & Skeletons (Optional but recommended)

## First Load (shadcn Skeleton optional)
- [x] When fields are empty, preview shows a helpful empty state message OR skeleton
- [x] Empty state prompts user to start typing
- [x] No broken/blank UI blocks

---

# 8) Monetization Hooks

## Upgrade CTA Placement
- [x] Upgrade CTA visible in top nav
- [x] Upgrade CTA appears near locked areas (mobile preview overlay and/or Pro buttons)
- [x] Free users are not blocked from the core value (desktop preview)

## Pricing Page Access
- [x] Pricing page exists (basic layout is OK Phase 1)
- [x] Pricing page accessible from nav

---

# 9) Visual Polish & UX

## General
- [x] No layout shift when switching Desktop/Mobile tabs
- [x] No overlapping tooltips
- [x] Spacing feels consistent between cards and sections
- [x] Buttons, badges, and cards look consistent (shadcn styling)

## Responsiveness
- [x] Works on narrow widths without horizontal scrolling
- [x] Inputs remain usable on mobile

---

# Phase 1 “Done” Definition
Phase 1 UI is done when:
- [x] All sections above are checked
- [x] Core tool page matches UI_UX_SPEC.md
- [x] Locked Pro features are visible but non-blocking
- [x] Tool is usable without login
