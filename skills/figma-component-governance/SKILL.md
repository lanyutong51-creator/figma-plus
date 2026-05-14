---
name: figma-component-governance
description: "Figma component asset governance framework. Use when the user wants to organize, maintain, audit, evolve, or plan a Figma component system: component boundaries, source components, component pages, variants, state matrices, resize contracts, instance usage, deprecated components, usage examples, and long-term component maintainability. This is the umbrella skill; route focused checks to subskills such as figma-component-integrity."
---

# Figma Component Governance

Use this skill as the umbrella framework for Figma component asset governance. It should keep the full component-maintenance map visible while allowing focused subskills to implement one capability at a time.

## Boundaries

- Use `figma-plus` as the overall Figma workflow coordinator.
- Use `figma-file-governance` for whole-file page taxonomy and file structure. It supplies page/file stage; this skill decides component strategy and repair depth from that stage.
- Use `figma-component-integrity` for the first implemented sub-capability: real component source/instance linkage and component set variant integrity.
- Use `figma-component-resize-contracts` for the second implemented sub-capability: fixed/stretch resize contracts, instance size drift, child constraints, and variant geometry safety.
- Use `figma-layout-qa` for visual/layout health of a specific frame, component, or instance.
- Load `figma:figma-use` before any `use_figma` call.

## Page Stage Gate

Component governance must follow the current page/file stage. Do not force stable components onto unstable exploration work.

- `想法探索期 / Exploration`: ideas are still moving. Avoid hard componentization. Use loose groups, candidate labels, or lightweight local components only when repetition blocks thinking. Do not require full variants or broad instance replacement.
- `方向收敛期 / Candidate`: direction is narrowing, but details may still change. Extract obvious repeated controls and stateful objects as provisional components. Keep variants minimal and document open questions.
- `正式基准期 / Baseline`: a screen or flow is becoming the current editable source. Create real source components for repeated/stateful UI, connect design pages through instances, and define essential state variants.
- `长期维护期 / Mature`: the component is reused across pages or expected to support long-term iteration. Require clear component sets, semantic variant properties, resize contracts, usage examples, and integrity audits.

If the stage is unclear, call or apply `figma-file-governance` first to classify the relevant pages. Report the chosen componentization depth before proposing repairs.

## Governance Map

Component governance answers whether Figma components are:

1. Worth existing.
   - Identify repeated or stateful UI that should become components.
   - Avoid over-componentizing one-off layout scaffolding.
   - Detect stale or unused component assets that should be deprecated or archived.

2. Clear assets.
   - Identify current source, candidate, deprecated, archive, and usage examples.
   - Keep component pages organized by role and domain.
   - Make component naming and ownership understandable.

3. Structurally reusable.
   - Define meaningful component sets and variant properties.
   - Keep state, size, type, theme, and domain dimensions distinct.
   - Define resize contracts and internal constraints.

4. Actually used.
   - Ensure design pages use instances, not disconnected copies.
   - Detect detached or repeated UI that bypasses source components.
   - Verify source components and real usage remain connected.

## Variant Responsibility Split

- `figma-component-integrity` owns semantic variant structure: whether states are real variants, whether variant properties express state/style/size/theme/domain dimensions, and whether state drawings are switchable.
- `figma-component-resize-contracts` owns variant geometry: whether variant dimensions jump unexpectedly, whether size should be an explicit variant dimension, and whether resizing behavior is safe.

## Current Implemented Subskill

Use `figma-component-integrity` when the user mentions or implies:

- Components page and design page are not linked.
- "Fake components", detached copies, or copied frames are used instead of instances.
- Updating the component source does not update design pages.
- States were drawn separately but are not combined into a component set.
- Variants exist but properties are unclear, such as `Variant=1/2/3`.
- Component states cannot be switched cleanly in Figma.

Before using `figma-component-integrity`, decide whether the page is ready for integrity enforcement:

- In `想法探索期 / Exploration`, report risks and candidate components, but avoid broad replacement.
- In `方向收敛期 / Candidate`, audit likely component candidates, but recommend provisional linkage and small-batch repairs instead of broad replacement.
- In `正式基准期 / Baseline` or `长期维护期 / Mature`, treat fake components and broken variants as maintainability problems to fix.

Use `figma-component-resize-contracts` when the user mentions or implies:

- Components break, distort, drift, or clip when resized.
- A component should be fixed-size, fixed-aspect, horizontally stretchable, vertically stretchable, or fully stretchable.
- Instances have inconsistent sizes and it is unclear whether that is allowed.
- Text, icons, badges, status dots, dividers, or children do not follow the parent after resizing.
- State variants jump size unexpectedly, or size should become an explicit variant dimension.

## Future Subskills

Keep these as planned capabilities, not implemented requirements:

- `component-boundary`: decide what should or should not become a component.
- `component-library-structure`: organize component pages, sections, usage examples, and archive areas.
- `component-deprecation`: manage old components and migration notes.

## Output Shape

When used as the umbrella skill, keep the response strategic:

```text
组件治理范围：
- Which part of the component system is being addressed

当前应调用：
- Subskill name and reason

治理风险：
- The component-maintenance risk this addresses

页面阶段：
- 想法探索期 / 方向收敛期 / 正式基准期 / 长期维护期 and why

组件化深度：
- 只标记候选 / 轻量候选组件 / 真实组件链接 / 完整组件系统

下一步：
- Audit / recommendation / confirmed cleanup
```
