---
name: figma-component-integrity
description: "Audit Figma component integrity. Use when the user needs to check whether component-page sources are truly connected to design-page instances, whether Figma design pages are using real instances instead of detached copies, whether separately drawn states are organized into component sets, or whether component set variant properties express real states. Focuses on fake components, broken source-instance linkage, disconnected state drawings, weak variants, and maintainability of component relationships."
---

# Figma Component Integrity

Use this skill to catch the two highest-risk component failures:

1. Fake components: the component page has source components, but design pages use copied frames or detached structures instead of real instances.
2. Broken variants: states were drawn, but they are not organized into component sets with meaningful variant properties.

## Boundaries

- Use `figma-component-governance` for the larger component governance framework.
- Use this skill for source-instance linkage and variant integrity.
- Own semantic variant structure here: state/style/size/theme/domain properties, switchable states, and whether separately drawn states should become variants. Leave variant geometry and resize behavior to `figma-component-resize-contracts`.
- Use or inherit `figma-file-governance` page-stage judgment before treating fake components or broken variants as must-fix issues.
- Use `figma-layout-qa` after fixing component sources, variants, or representative instances.
- Load `figma:figma-use` before any `use_figma` call.

Default to audit and recommendation first. Do not replace design-page UI with instances or reorganize component sets until the user confirms the plan.

## Stage Sensitivity

- `想法探索期 / Exploration`: do not force real instance linkage or complete component sets. Report candidate components and risks only.
- `方向收敛期 / Candidate`: recommend provisional sources for obvious repeated/stateful UI, but keep repair plans small.
- `正式基准期 / Baseline`: fake components and disconnected states are P1/P2 maintainability issues.
- `长期维护期 / Mature`: enforce source-instance linkage, semantic variants, resize contracts, and representative QA.

## Workflow

1. Define scope.
   - Identify `fileKey`.
   - Identify component page(s), baseline/design page(s), or target node(s) if supplied.
   - If scope is unclear, inspect the whole file and report assumptions.
   - Identify page stage from file governance signals when available: 想法探索期 / Exploration, 方向收敛期 / Candidate, 正式基准期 / Baseline, or 长期维护期 / Mature.

2. Inventory components and instances.
   - Run `scripts/figma_component_integrity_audit.js` with `use_figma`.
   - Capture components, component sets, variant properties, instances, pages with sources, pages with instances, and repeated non-instance candidates.

3. Diagnose fake component risks.
   - Use `references/linkage-findings.md`.
   - Compare component source pages with design/baseline pages.
   - Identify component-like repeated UI on design pages that is not an instance.
   - Identify instances that point to sources outside the expected current component area when that can be inferred.

4. Diagnose variant integrity.
   - Use `references/variant-findings.md`.
   - Inspect `variantGroupProperties` and child `variantProperties`.
   - Flag meaningless variant dimensions, missing state dimensions, singleton state components that should be variants, and inconsistent dimensions across states.

5. Recommend a repair plan.
   - Separate P1 integrity failures from P2/P3 cleanup.
   - Recommend confirming the current source component before replacement.
   - Recommend combining state components into component sets only after the intended state matrix is clear.

6. Execute only after confirmation.
   - Replace representative detached copies with instances before broad replacement.
   - Combine or repair component sets in small batches.
   - Run `figma-layout-qa` on the source component and at least one affected design-page instance after fixes.

## Priority Model

- `P1`: on 正式基准期 / Baseline or 长期维护期 / Mature pages, source component is not used by design pages, or states exist but cannot be switched as variants.
- `P2`: component set exists but variant properties are unclear, incomplete, or dimensionally mixed.
- `P3`: naming, usage example, or component page explanation is weak but does not break linkage.

## Output Shape

```text
组件完整性概览：
- Source components:
- Component sets:
- Instances on design pages:
- Suspected detached/repeated candidates:
- 页面阶段与检查严格度:

P1 问题：
- Evidence and affected pages/components

P2/P3 问题：
- Variant/property/naming/use-example issues

建议修复：
- Confirm source
- Replace detached copies with instances
- Combine states into component set
- Rename variant properties

需要确认：
- Which source is current
- Which states belong in the matrix
- Whether old copies can be archived or replaced
```

Use concise Chinese for user-facing summaries when working with Lynn unless the file convention is clearly English.

## Reference Files

- `references/linkage-findings.md`: fake component and source-instance linkage findings.
- `references/variant-findings.md`: component set and variant integrity findings.
