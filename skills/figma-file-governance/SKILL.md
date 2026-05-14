---
name: figma-file-governance
description: "Audit and govern whole Figma file structure. Use when the user asks to inspect, classify, organize, standardize, or clean up a Figma file's pages, sections, top-level frames, components, component pages, snapshots, references, archives, notes, indexes, naming, or long-term maintainability. Use for questions like how many pages exist, whether pages are categorized, whether drafts and sources are mixed, what should be renamed/merged/archived, or whether a Figma file needs structural cleanup. Do not use for code work or single-frame layout QA."
---

# Figma File Governance

Use this skill to assess and improve the structure of an entire Figma file. It is about file governance, not screen design or single-frame layout correctness.

## Boundaries

- Use `figma-plus` as the overall Figma workflow coordinator when the task includes design, components, QA, or multiple Figma work modes.
- Use this skill when the question is about file structure, page taxonomy, naming, cleanup, archives, notes, indexes, or long-term maintainability.
- This skill may identify the componentization stage for a page/file, but it does not decide detailed component repairs. Route component strategy and fixes to `figma-component-governance` and its subskills.
- Use `figma-layout-qa` for visual/layout health of a specific frame or component.
- Load `figma:figma-use` before any `use_figma` call.

Default to audit and recommendation first. Do not rename, delete, archive, or move large sets of Figma nodes until the user confirms the governance plan.

## Workflow

1. Define scope.
   - Identify `fileKey`.
   - Identify whether the user wants the whole file, selected pages, or a specific governance concern.
   - If a URL includes `nodeId`, use it as a focus area, but still inspect the surrounding page/file when relevant.

2. Inventory the file.
   - Run `scripts/figma_file_inventory.js` with `use_figma`.
   - Capture pages, top-level node counts, sections, components, component sets, styles, variables, loose root nodes, and naming signals.
   - If script execution is unavailable, use Figma metadata and clearly state the weaker evidence.

3. Classify pages.
   - Use `references/page-taxonomy.md`.
   - Classify pages as overview, baseline/source, components, snapshots, references, exploration, archive, mixed, or unknown.
   - Respect an existing clean convention before proposing a new one.
   - When no clean convention exists, prefer the default maintained file model: `00 Overview`, `01 Editable Baseline`, `02 Components`, `03 Snapshots`, `90 Exploration`, `99 Archive`.
   - Also identify the design maturity stage for component governance: 想法探索期 / Exploration, 方向收敛期 / Candidate, 正式基准期 / Baseline, or 长期维护期 / Mature.

4. Diagnose governance findings.
   - Use `references/governance-findings.md`.
   - Look for mixed source/draft pages, missing notes/index, unclear page names, stale component pages, root-level clutter, duplicate purpose pages, unmanaged snapshots, and unclear archive boundaries.
   - Rank issues by severity and impact on future Figma work.

5. Recommend a cleanup plan.
   - Use `references/reorganization-playbook.md`.
   - Propose pages to keep, rename, merge, archive, split, or create.
   - Default to a combined `00 Overview` page for file purpose, rules, page map, component map, current source, review status, and open questions.
   - Split `00 Workflow Notes` and `04 UI Index` only when the file is large enough that one overview page would become hard to scan.
   - Separate safe changes from changes needing user confirmation.
   - Do not imply visual quality has been reviewed unless screenshots or layout QA were actually used.
   - If recommending component maintenance, include the page stage and avoid heavy componentization for exploration pages.

6. Execute only after confirmation.
   - For small safe changes, explain the intended edits before writing.
   - For broad restructuring, ask for confirmation of the plan first.
   - After restructuring, rerun inventory and summarize before/after.

## Output Shape

Use this structure for an audit:

```text
当前结构：
- Pages: count and notable categories
- Components: count and component page status
- References/snapshots/archive: status
- Unknown or mixed areas: status
- Componentization stage: 想法探索期 / 方向收敛期 / 正式基准期 / 长期维护期

主要问题：
- P1/P2/P3 findings with page names and evidence

建议整理：
- Keep / rename / merge / archive / create actions

需要确认：
- Decisions that affect deletion, archival, meaning, or current-source status
```

Use concise Chinese for user-facing summaries when working with Lynn unless the file convention is clearly English.

## Reference Files

- `references/page-taxonomy.md`: page categories and naming expectations.
- `references/governance-findings.md`: finding types and severity guidance.
- `references/reorganization-playbook.md`: safe cleanup and restructuring patterns.
