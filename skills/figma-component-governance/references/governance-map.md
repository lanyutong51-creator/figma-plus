# Component Governance Map

This reference preserves the larger component governance framework while implementation proceeds one subskill at a time.

## Four Questions

1. Component boundary: should this asset exist as a component?
2. Component identity: is the current source clear and documented?
3. Component structure: are variants, states, and resize behavior maintainable?
4. Component usage: are design pages actually using the component source through instances?

## Page Stage Gate

Use file/page governance to decide how much component maintenance is appropriate:

- `想法探索期 / Exploration`: preserve design freedom. Mark candidates; avoid full component sets and broad instance replacement.
- `方向收敛期 / Candidate`: extract only obvious repeated or stateful UI. Keep variants minimal.
- `正式基准期 / Baseline`: create real source components and connect design pages with instances.
- `长期维护期 / Mature`: require semantic variants, resize contracts, usage examples, and integrity checks.

The same UI can be a bad componentization target in exploration and a required component in baseline. Stage comes before strictness.

## Implemented First

`figma-component-integrity` covers the highest-risk real-world issues first:

- Source components not linked to design-page instances.
- States drawn separately but not connected through component sets and variants.

`figma-component-resize-contracts` covers the second implemented area:

- Components whose fixed/stretch behavior is unclear.
- Instances that drift from source size without a contract.
- Child constraints that break when components resize.
- Variants whose dimensions jump without a size dimension.

## Later Expansion

Add future subskills only when the repeated workflow is clear. Avoid folding every component rule into one heavy skill.
