---
name: figma-component-resize-contracts
description: "Audit and maintain Figma component resize contracts. Use when the user needs to check whether components can resize safely, decide fixed-size versus stretch behavior, inspect instance scaling drift, verify child constraints for text/icons/badges/status dots/dividers, compare variant dimensions, or prevent components from breaking when resized. This is a focused subskill under figma-component-governance."
---

# Figma Component Resize Contracts

Use this skill to decide and audit how Figma components are allowed to resize. It answers whether a component can be safely stretched, should stay fixed, needs size variants, or has child constraints that will break real instances.

## Boundaries

- Use `figma-component-governance` for the larger component governance framework and page-stage decision.
- Use `figma-component-integrity` first when the component source is not connected to design-page instances or variants are not real component sets.
- Own geometry and sizing here: fixed/stretch contracts, instance size drift, child constraints, and variant dimension jumps. Leave semantic variant naming/state structure to `figma-component-integrity`.
- Use this skill when source components and/or representative instances exist, and the risk is resize behavior.
- Use `figma-layout-qa` after fixing resize contracts, constraints, or representative instances.
- Load `figma:figma-use` before any `use_figma` call.

Default to audit and recommendation first. Do not resize source components, normalize variants, or alter instance dimensions broadly until the user confirms the plan.

## Stage Sensitivity

- `想法探索期 / Exploration`: do not enforce resize contracts. Report likely risks only.
- `方向收敛期 / Candidate`: recommend resize intent for obvious repeated components, but avoid heavy constraint work unless resizing is already blocking review.
- `正式基准期 / Baseline`: repeated components should have a basic resize contract and representative instances should follow it.
- `长期维护期 / Mature`: require explicit resize contracts, compatible child constraints, size variants where needed, and representative QA.

## Resize Contract Types

- `fixed-size`: icons, marks, semantic pieces, small controls, game tokens, cells, symbols, and objects whose size carries meaning.
- `fixed-aspect`: thumbnails, avatars, media previews, image cards, and objects whose proportions carry meaning.
- `horizontal`: buttons, tabs, inputs, toolbar rows, nav items, labels, chips with text growth, and list rows.
- `vertical`: logs, text panels, stacked lists, comments, and fixed-width content regions that grow downward.
- `full`: cards, panels, containers, empty states, content shells, and large responsive regions.

If the intended contract is unclear, choose the least permissive contract and ask what should happen when the component is resized.

## Workflow

1. Define scope.
   - Identify `fileKey`.
   - Identify component source(s), component set(s), and representative instance(s) if supplied.
   - Identify page stage from `figma-component-governance` or `figma-file-governance` when available.

2. Inventory resize behavior.
   - Run `scripts/figma_component_resize_audit.js` with `use_figma`.
   - Capture source component dimensions, component set variant sizes, instance dimensions, child constraints, text auto-resize modes, layout sizing, and suspicious stretch patterns.

3. Infer or confirm resize contract.
   - Use `references/resize-contract-types.md`.
   - Infer likely contracts from component role, name, dimensions, child structure, and real instance usage.
   - Treat inference as a recommendation, not proof. Ask for confirmation when contract choice changes how components can be used.

4. Diagnose resize findings.
   - Use `references/resize-findings.md`.
   - Look for semantic objects scaled arbitrarily, stretchable components with fixed internal labels, badges/status dots that will drift, state variants with inconsistent dimensions, and instances outside the source contract.

5. Recommend repair plan.
   - Define the contract for each affected component.
   - Recommend child constraint/layout fixes before broad instance resizing.
   - Recommend size variants for fixed-size/fixed-aspect objects that need multiple production sizes.

6. Execute only after confirmation.
   - Fix the source component first.
   - Test one representative instance at the expected size.
   - Run `figma-layout-qa` on the source and representative instance.
   - Apply the same pattern to the remaining instances only after the representative check passes.

## Priority Model

- `P1`: on 正式基准期 / Baseline or 长期维护期 / Mature pages, a reused component visibly breaks or semantically distorts when resized.
- `P2`: resize contract is unclear, variants jump unexpectedly, child constraints are likely wrong, or instances use sizes that conflict with the intended contract.
- `P3`: resize contract is not documented, naming is unclear, or usage examples do not show expected resizing.

## Output Shape

```text
Resize 合同概览：
- fixed-size:
- fixed-aspect:
- horizontal:
- vertical:
- full:
- unclear:

页面阶段与严格度：
- 想法探索期 / 方向收敛期 / 正式基准期 / 长期维护期

主要问题：
- P1/P2/P3 with component names, evidence, and affected instances

建议修复：
- Contract to assign
- Source component fixes
- Child constraint/layout fixes
- Size variants or instance cleanup

需要确认：
- Intended resize behavior
- Which instance sizes are legitimate
- Whether multiple size variants are needed
```

Use concise Chinese for user-facing summaries when working with Lynn unless the file convention is clearly English.

## Reference Files

- `references/resize-contract-types.md`: contract definitions and inference guidance.
- `references/resize-findings.md`: common resize failures and severity guidance.
