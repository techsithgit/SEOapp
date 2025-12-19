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
- [ ] Nav is visible on all pages
- [ ] Logo + product name appear on left
- [ ] Pricing link exists and is clickable
- [ ] Login link exists (can be placeholder in Phase 1)
- [ ] Upgrade CTA is a shadcn **Button** and visually primary
- [ ] Nav is sticky (remains visible on scroll)

---

# 2) Tool Page Structure

## Two-Column Layout (Custom)
- [ ] Desktop: Editor on left (~40%), Preview on right (~60%)
- [ ] Column gap is visually comfortable (no cramped layout)
- [ ] Preview is visible without scrolling on typical laptop screens

## Mobile Layout (Custom)
- [ ] Single-column layout
- [ ] Preview appears before warnings/suggestions
- [ ] Desktop/Mobile toggle is accessible without scrolling

---

# 3) Editor Panel (Left)

## Snippet Inputs Card (shadcn Card, Input, Textarea, Label)
- [ ] Inputs are inside a shadcn **Card**
- [ ] Labels use shadcn **Label**
- [ ] Title uses shadcn **Input**
- [ ] Meta description uses shadcn **Textarea**
- [ ] URL/slug uses shadcn **Input** (domain can be read-only/muted)

## Live Counters & Status (Custom + shadcn Badge)
- [ ] Title shows character count
- [ ] Title shows pixel count (if implemented in Phase 1)
- [ ] Meta description shows character count
- [ ] Status badge uses shadcn **Badge**
- [ ] Badge changes based on length state:
  - Good
  - Too long
  - Too short

## Counter Explanations (shadcn Tooltip)
- [ ] Pixel counter has an info tooltip explaining pixel-based truncation
- [ ] Tooltip appears on hover/focus and does not block typing

---

# 4) Quick Actions Row (Pro-Locked)

## Locked Buttons (shadcn Button + Tooltip)
- [ ] Quick actions exist:
  - Generate alternatives
  - Improve CTR
  - Shorten title
  - Add keyword
- [ ] Buttons appear disabled/locked in Phase 1
- [ ] Each locked button shows a shadcn **Tooltip** on hover:
  “Available on Pro. Upgrade to unlock.”

---

# 5) Warnings & Suggestions Panel

## Warnings UI (shadcn Accordion recommended)
- [ ] Warnings panel is present
- [ ] Uses shadcn **Accordion** (or Collapsible if chosen)
- [ ] At least basic warnings appear when appropriate:
  - Title too long
  - Title too short (optional)
  - Description too long/short (optional)
- [ ] Warning items expand/collapse smoothly
- [ ] Expanded warning includes:
  - Short explanation text
  - Suggested fix text

## Apply Fix (Pro-Locked)
- [ ] “Apply fix” button exists (even if non-functional in Phase 1)
- [ ] “Apply fix” is locked/disabled
- [ ] Hover shows tooltip explaining Pro unlock

---

# 6) Preview Panel (Right)

## Preview Container (shadcn Card + Tabs)
- [ ] Preview area is inside a shadcn **Card**
- [ ] Preview uses shadcn **Tabs**:
  - Desktop
  - Mobile

## Desktop Preview (Custom SERP block)
- [ ] Preview updates instantly when typing
- [ ] Shows:
  - Site name / favicon placeholder
  - URL/breadcrumb line
  - Blue title line
  - Meta description line(s)
- [ ] Truncation visually shows ellipsis when over limit (if implemented)
- [ ] Desktop preview looks “Google-like” and calm

## Mobile Preview (Custom SERP block + locked overlay)
- [ ] Mobile preview tab exists
- [ ] For Free users, mobile preview is gated with a clear overlay:
  “Mobile preview is a Pro feature”
- [ ] Overlay includes Upgrade button (shadcn Button)
- [ ] Desktop preview remains fully usable in Free

---

# 7) Empty States & Skeletons (Optional but recommended)

## First Load (shadcn Skeleton optional)
- [ ] When fields are empty, preview shows a helpful empty state message OR skeleton
- [ ] Empty state prompts user to start typing
- [ ] No broken/blank UI blocks

---

# 8) Monetization Hooks

## Upgrade CTA Placement
- [ ] Upgrade CTA visible in top nav
- [ ] Upgrade CTA appears near locked areas (mobile preview overlay and/or Pro buttons)
- [ ] Free users are not blocked from the core value (desktop preview)

## Pricing Page Access
- [ ] Pricing page exists (basic layout is OK Phase 1)
- [ ] Pricing page accessible from nav

---

# 9) Visual Polish & UX

## General
- [ ] No layout shift when switching Desktop/Mobile tabs
- [ ] No overlapping tooltips
- [ ] Spacing feels consistent between cards and sections
- [ ] Buttons, badges, and cards look consistent (shadcn styling)

## Responsiveness
- [ ] Works on narrow widths without horizontal scrolling
- [ ] Inputs remain usable on mobile

---

# Phase 1 “Done” Definition
Phase 1 UI is done when:
- [ ] All sections above are checked
- [ ] Core tool page matches UI_UX_SPEC.md
- [ ] Locked Pro features are visible but non-blocking
- [ ] Tool is usable without login
