---
name: figma-layout-qa
description: Audit and harden Figma layouts after Codex creates or edits frames, screens, components, design systems, or translated UI. Use when working in Figma and needing to catch clipped text, too-small text boxes, frame overflow, invisible or zero-size nodes, suspicious auto-layout settings, screenshot-review gaps, or layout QA issues before reporting success to the user.
---

# Figma Layout QA

Use this skill as a companion to the official Figma skills. It does not replace `figma-use`; it adds a mandatory QA pass after Figma writes and before user-facing completion.

## Required Pairing

Before any `use_figma` call, load the `figma:figma-use` skill. Use this skill after a write operation, after a visual fix, or when the user asks whether a Figma result is actually correct.

## QA Workflow

1. Identify the frame/component/page node that should be audited. If the user gave a URL, extract `fileKey` and `nodeId`.
2. Run the audit script in `scripts/figma_layout_audit.js` through `use_figma`, replacing `__ROOT_NODE_ID__` with the target node id.
3. Treat `blocker` and `major` findings as unfinished work. Fix them with `use_figma`, then rerun the audit.
4. Call `get_screenshot` for the target after structural issues are fixed. Inspect the screenshot for text clipping, overlaps, missing content, placeholder text, bad hierarchy, and awkward spacing.
5. Report the QA evidence checked. If anything could not be verified, say exactly what is missing.

## Issue Priorities

- `blocker`: visible content is clipped, hidden, zero-size, or outside a clipping parent.
- `major`: likely layout break, such as fixed text boxes that need more space, children overflowing a non-clipping frame, or obvious auto-layout mismatch.
- `minor`: polish risk, naming/structure suspicion, or non-blocking layout smell.

Do not tell the user a Figma change is done while blocker or major issues from the target remain unresolved unless the user explicitly asks to stop.

## Fix Heuristics

- For text content, prefer `textAutoResize = "HEIGHT"` for fixed-width labels/body copy, and `textAutoResize = "WIDTH_AND_HEIGHT"` for badges, chips, short labels, and standalone headings.
- When a text node is inside auto-layout, prefer fixing parent sizing, padding, and child layout sizing before manually expanding arbitrary heights.
- For clipped frames, either disable `clipsContent` when the design should reveal content, or resize/reposition children so they fit intentionally.
- For groups of repeated items, convert fragile absolute positioning into auto-layout when the surrounding design implies rows, columns, lists, cards, toolbars, or tables.
- After every fix, rerun the audit on the same root node. One pass often reveals the next issue.

## Screenshot Review

The audit script catches structural problems, but it cannot replace visual review. Always use `get_screenshot` before finalizing a meaningful Figma update. Use the checklist in `references/screenshot-review.md` for the visual pass.

## Output Shape

When reporting QA results, keep it concrete:

```text
Figma QA checked:
- Structural audit: 0 blockers, 1 major, 2 minor
- Screenshot review: checked target frame after fixes

Fixed:
- Expanded body text node from fixed height to height auto-resize
- Adjusted parent card padding so the final line is visible

Remaining:
- Minor: toolbar icons are 1px off baseline, visually acceptable unless you want stricter polish
```
