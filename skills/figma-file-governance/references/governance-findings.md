# Governance Findings

Use this reference to rank file-structure issues.

## Severity

- `P1`: Current source of truth is unclear, or the file structure creates a high risk of editing the wrong artifact.
- `P2`: Structure is usable but slows iteration, hides reusable assets, or mixes categories that should be separated.
- `P3`: Naming, ordering, or documentation polish issue that does not block continued work.

## Common Findings

### Source Ambiguity

Current editable baseline cannot be identified, multiple pages look current, or snapshots are mixed with source frames.

Default severity: `P1`

### Missing Governance Pages

No workflow notes, index, component source page, or archive boundary exists in a maintained file.

Default severity: `P2`

### Mixed Page Categories

Components, final screens, screenshots, references, and exploratory drafts are mixed on one page without clear sections.

Default severity: `P2`, or `P1` when it obscures current source.

### Component Source Drift

Component source page contains old variants, experiments, detached copies, or unclear current sources.

Default severity: `P2`

### Root-Level Clutter

Loose rectangles, text, images, groups, or fragments sit at page root without section/frame ownership.

Default severity: `P2`

### Duplicate Purpose Pages

Multiple pages appear to serve the same purpose, such as several component pages or several final baseline pages.

Default severity: `P2`

### Unmanaged Archives

Old work exists but is not clearly archived or separated from current source.

Default severity: `P2`

### Naming Ambiguity

Page names do not communicate purpose, version, or current/stale status.

Default severity: `P3`, or `P2` when there are many pages.
