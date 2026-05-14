---
name: figma-plus
description: "Reusable Figma-only workflow companion for Codex. Use only when the user explicitly needs Figma work: creating, updating, organizing, or QAing Figma files; building reusable Figma baselines, component pages, variables, design systems, prototypes, handoff frames, or reference boards; maintaining long-lived Figma files across iterations; or improving reliability of Figma tool usage with concrete planning, file structure, component maintenance, screenshot review, and layout QA. Do not use for code implementation, code review, repository changes, or deciding how to modify application code unless the user also asks to reflect the result in Figma."
---

# Figma Plus

Use this skill to make Figma work repeatable and durable. It is only for work that creates, edits, organizes, or checks Figma artifacts. It does not replace the official Figma skills; it orchestrates them, sets file hygiene standards, and defines the quality gates before reporting Figma work as done.

## Core Rule

Always load the relevant official Figma skill before calling its tool:

- Load `figma:figma-use` before every `use_figma` call.
- Use `figma:figma-generate-design` when creating a full Figma page, screen, or layout from a detailed brief or visual reference.
- Use `figma-file-governance` when the task is about whole-file structure, page taxonomy, naming, archives, notes, indexes, or whether a Figma file needs cleanup.
- Use `figma-component-governance` when the task is about component asset strategy, component boundaries, component pages, long-term component maintenance, or deciding which component subskill should handle the work.
- Use `figma-component-integrity` when the task is about fake components, source-instance linkage, detached design-page copies, separately drawn states, component set variants, or whether component source changes will affect actual design pages.
- Use `figma-component-resize-contracts` when the task is about fixed/stretch behavior, component resizing, instance size drift, child constraints, text/icon/badge alignment after resizing, or variant geometry jumps.
- Use `figma-layout-qa` after meaningful Figma writes, component updates, or visual fixes.
- Use `lynn-ui-collaboration` when the task is about UI direction, product surface judgment, or preserving Lynn's design preferences.

## Operating Loop

1. Classify the Figma task.
   - `Explore`: compare directions, structure an ambiguous idea, or define the surface before editing.
   - `Create`: make a new file, page, screen, component library, or design-system foundation.
   - `Update`: edit an existing Figma artifact while preserving conventions.
   - `Organize`: repair or establish page structure, notes, components, variables, and references.
   - `QA`: inspect structure, visual quality, component integrity, and handoff readiness.

2. Establish the target and contract.
   - Identify the file, page, node, viewport, audience, primary workflow, expected fidelity, and whether this is a disposable draft or a maintained source of truth.
   - If a URL is provided, extract `fileKey` and `nodeId`. If no node is provided, inspect metadata before editing.
   - If the task affects a long-lived Figma file, define the maintenance contract: pages, baseline frames, component pages, variables, notes, and review expectations.

3. Choose the Figma lane.
   - Use `Structure` when the file/page/component organization is unclear or drifting.
   - Use `Design` when layout hierarchy, component states, responsive behavior, information architecture, or visual direction needs work in Figma.
   - Use `Systemize` when repeated elements should become components, variants, styles, or variables.
   - Use `Review` when the user needs judgment, cleanup, or QA on existing Figma work.

4. Execute incrementally.
   - Inspect existing pages, styles, variables, and components before creating new structures.
   - Prefer importing or reusing design-system assets through `search_design_system` when available.
   - Make bounded edits to named target frames/components. Avoid scattering detached objects at page root.
   - For generated screens, create a reusable baseline and enough component/state structure to support the next iteration.

5. Validate before finalizing.
   - Run structural checks through `figma-layout-qa` after writes.
   - Use screenshots for meaningful visual review; metadata alone is not enough for layout quality.
   - Verify component sets and variants when components are involved.
   - Confirm the original user request was solved, not just that the script ran successfully.

6. Include a lightweight runtime self-check when reporting meaningful Figma work.
   - Keep it short; do not turn normal work into a verbose eval report.
   - Include Trigger, Route, Stage when relevant, Evidence, and Closure.
   - If the run exposes a new failure mode, routing confusion, QA miss, or user correction, record it later through `figma-skill-evals`.

## Page Model

For maintained Figma files, use `figma-file-governance` as the source of truth for page structure. The default model is:

- `00 Overview`: purpose, page map, component map, current source, review notes, open decisions, and changelog-level guidance.
- `01 Editable Baseline`: canonical full-size product screens or states.
- `02 Components`: reusable components, variants, foundations, and usage examples.
- `03 Snapshots`: imported screenshots, visual captures, or frozen references.
- `90 Exploration`: draft directions, experiments, and option comparisons.
- `99 Archive`: old work retained for context but not current.

Keep only the default model here for routing context. Load `figma-file-governance` for page taxonomy, cleanup plans, archive decisions, and componentization stage.

## Component Standards

Use `figma-component-governance` as the source of truth for component decisions. Route specific component work instead of duplicating rules here:

- Use `figma-component-integrity` for source-instance linkage and semantic variant structure.
- Use `figma-component-resize-contracts` for fixed/stretch behavior, instance size drift, child constraints, and variant geometry.
- Use `figma-layout-qa` after component fixes to check the source and at least one representative instance.

## Documentation Standards

Use the user's working language for Figma labels and notes unless the file convention says otherwise. For Lynn's maintained files, prefer Chinese documentation with stable English only for product names, framework terms, or unavoidable abbreviations.

Every maintained Figma pass should leave behind enough context for the next pass:

- What the screen/component is for.
- What changed in this pass.
- Which component/state/source should be edited next time.
- What QA evidence was checked.
 
For detailed documentation expectations, load the relevant governance subskill instead of expanding them here.

## Runtime Self-Check

For meaningful Figma tasks, include a concise self-check in the final report:

```text
运行自检：
- Trigger: Figma-only task / explicitly requested Figma work
- Route: figma-plus → relevant subskill(s)
- Stage: 想法探索期 / 方向收敛期 / 正式基准期 / 长期维护期, if relevant
- Evidence: metadata / inventory script / component audit / resize audit / screenshot
- Closure: QA completed / pending confirmation / not applicable
```

Only write an eval note when the run creates reusable learning, such as a missed issue, false positive, route mistake, new edge case, or user correction.

## Reference Files

Load these only when relevant:

- `references/workflow-router.md`: choosing Figma structure, design, systemization, or QA-only paths.
- `references/file-structure.md`: lightweight page-structure routing context; defer detailed governance to `figma-file-governance`.
- `references/component-maintenance.md`: legacy lightweight component context; defer detailed component governance to component subskills.
- `references/qa-gates.md`: final checks before reporting a Figma task as complete.
