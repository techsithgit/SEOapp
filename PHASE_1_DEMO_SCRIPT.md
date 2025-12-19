# 🎬 Phase 1 Demo Script (2-Minute Sanity Check)

## Goal
Verify that the Phase 1 MVP:
- Delivers core value instantly
- Matches the PRD and UI spec
- Has no obvious UX or monetization gaps

Run this script **before every commit or deploy**.

---

## Step 1: First Impression (15 seconds)

- [ ] Load the tool page in a fresh browser tab (logged out)
- [ ] Page loads quickly (< 1 second on broadband)
- [ ] Tool is visible immediately (not hidden behind a hero section)
- [ ] Preview area is visible without scrolling on desktop
- [ ] Nothing looks broken or empty

If this fails, stop and fix.

---

## Step 2: Core Value Test (30 seconds)

1. Click into the **Page Title** input  
2. Type a realistic title (60–70 characters)

Verify:
- [ ] Preview updates live as you type
- [ ] Title text appears blue and Google-like
- [ ] Character counter updates instantly
- [ ] Status badge changes to “Too long” when appropriate
- [ ] Ellipsis appears in preview when truncated (if implemented)

---

## Step 3: Description Test (20 seconds)

1. Type a meta description (~160 characters)

Verify:
- [ ] Preview description updates live
- [ ] Character counter updates
- [ ] Status badge changes correctly
- [ ] Description looks visually separate from title

---

## Step 4: Desktop / Mobile Toggle (15 seconds)

1. Click **Mobile** tab

Verify:
- [ ] Mobile preview tab exists
- [ ] Layout visibly changes to mobile format
- [ ] If gated: overlay explains Pro feature clearly
- [ ] Upgrade button is visible
- [ ] Switching back to Desktop is instant

---

## Step 5: Locked Pro Feature Check (15 seconds)

1. Hover over a Pro-locked button (e.g., “Improve CTR”)

Verify:
- [ ] Button shows disabled/locked state
- [ ] Tooltip appears explaining Pro unlock
- [ ] Tooltip does not block typing or preview

---

## Step 6: Warnings & Suggestions (15 seconds)

1. Enter an obviously too-long title
2. Scroll to warnings panel

Verify:
- [ ] Warning appears (e.g., “Title too long”)
- [ ] Warning uses severity icon
- [ ] Accordion expands/collapses smoothly
- [ ] “Apply fix” button is present but locked

---

## Step 7: Monetization Visibility (10 seconds)

- [ ] Upgrade CTA visible in top navigation
- [ ] Upgrade CTA visible near locked areas
- [ ] Free usage still feels complete (desktop preview works)

---

## Step 8: Pricing Page Smoke Test (10 seconds)

1. Click **Pricing** link

Verify:
- [ ] Pricing page loads
- [ ] Free / Pro / Agency tiers visible (simple is OK)
- [ ] No broken links

---

## Step 9: Mobile Responsive Check (20 seconds)

1. Resize browser or use device emulator

Verify:
- [ ] Layout switches to single column
- [ ] Preview appears before warnings
- [ ] Inputs remain usable
- [ ] No horizontal scrollin
