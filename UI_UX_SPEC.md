# 🎨 UI / UX SPECIFICATION

## Purpose
This document defines the exact user interface and experience requirements for SnippetLab.
It ensures consistent layout, behavior, and interaction across all builds.

This document must be followed exactly by implementation.

---

## 1. Global Layout

### Desktop
- Max content width: 1200px
- Two-column layout:
  - Left: Editor & guidance (≈40%)
  - Right: SERP preview (≈60%)
- Sticky top navigation

### Mobile
- Single-column layout
- SERP preview shown before warnings
- Desktop / Mobile toggle accessible without scrolling

---

## 2. Top Navigation

- Logo + product name (left)
- Pricing link
- Login link
- Primary CTA: Upgrade

Navigation must be visible on all pages.

---

## 3. Core Tool Page Layout

### Page Header
- Title: “Google SERP Preview”
- Subtitle explaining purpose
- Desktop / Mobile toggle
- (Future) Locale selector

---

## 4. Editor Panel (Left Column)

### Snippet Inputs Card
#### Page Title
- Single-line input (expandable to 2 lines)
- Pixel counter (primary)
- Character counter (secondary)
- Status badge:
  - Good
  - Too long
  - Too short

#### Meta Description
- Multiline textarea
- Character counter
- Mobile safe-zone indicator
- Status badge

#### URL / Slug
- Domain shown (read-only)
- Slug editable
- Helper text explaining breadcrumbs

---

### Quick Actions Row
Buttons:
- Generate alternatives (Pro)
- Improve CTR (Pro)
- Shorten title (Pro)
- Add keyword (Pro)

Locked buttons show a lock icon and tooltip.

---

### Keyword & Intent (Collapsible)
- Target keyword input
- Intent dropdown
- Include brand toggle (Pro)

---

### Warnings & Suggestions Panel
- List of issues with severity icons
- Expandable items with:
  - Explanation
  - Suggested fix
  - “Apply fix” (Pro)

---

## 5. SERP Preview Panel (Right Column)

### Tabs
- Desktop
- Mobile
- Social (future)

---

### Desktop Preview
- Google-style snippet:
  - Favicon + site name
  - URL / breadcrumb
  - Title (pixel-truncated)
  - Meta description
- Ellipsis when truncated
- Optional cutoff indicator

---

### Mobile Preview
- Narrow layout
- More aggressive truncation
- Locked overlay for Free users

---

## 6. Optimization Summary

### CTR Score
- Displayed as gauge or score
- Locked for Free users

### Rewrite Risk
- Chip: Low / Medium / High
- Free: label only
- Pro: expandable reasons

---

## 7. Actions (Pro+)
- Save snippet
- Create variant
- Export image
- Share link

---

## 8. UX Rules (Non-Negotiable)
- Preview updates instantly while typing
- Free users always get a usable preview
- Locked features explain value, not just restriction
- Visual preview always prioritized over text
