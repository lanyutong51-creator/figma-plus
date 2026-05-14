# Linkage Findings

Use this reference when auditing whether component-page sources are actually used on design pages.

## P1 Findings

### Fake Component Source

Component source exists on a component page, but matching UI on baseline/design pages is made of frames, groups, or detached copies instead of instances.

Evidence:

- Source component name and page.
- Design page with repeated non-instance structures.
- Count of repeated candidates.

Recommended fix:

1. Confirm the source component is current.
2. Replace one representative detached copy with an instance.
3. Verify sizing and visual match.
4. Replace the remaining copies after confirmation.

### Disconnected Design Usage

Design page appears to use instances, but they reference a stale or unexpected source when a current component source is known.

Recommended fix:

1. Confirm current source.
2. Swap instances to the current source where safe.
3. QA representative frames.

## P2 Findings

### Component Page Exists But Usage Is Sparse

Component sources exist, but very few instances appear in design/baseline pages.

Recommended fix:

- Identify which components should become real sources.
- Replace repeated UI incrementally.

### Repeated UI Without Source

Design page has repeated structures that may deserve components, but no matching source component is obvious.

Recommended fix:

- Propose extraction only if repeated, stateful, or semantically important.

## Evidence Limits

Automated matching of detached copies is heuristic. Treat repeated dimensions, names, and node structure as a signal, not proof. Confirm visually before replacing.
