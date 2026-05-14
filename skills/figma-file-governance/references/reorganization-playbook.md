# Reorganization Playbook

Use this reference when proposing or executing Figma file cleanup.

## Safe Without Confirmation

These are usually safe if the user asked for cleanup and the target scope is clear:

- Create an overview page.
- Add documentation frames that summarize existing structure.
- Add section labels around existing content without moving content far.
- Rename obviously temporary duplicated notes created during the current session.

Still explain intended edits before writing.

## Needs Confirmation

Ask before these changes:

- Renaming many pages.
- Moving large groups of frames between pages.
- Archiving pages.
- Merging pages.
- Deleting anything.
- Changing which page/frame is considered current source.
- Detaching or replacing component sources.

## Cleanup Patterns

### Establish Maintained Page Model

Create or align to:

- `00 Overview`
- `01 Editable Baseline`
- `02 Components`
- `03 Snapshots`
- `90 Exploration`
- `99 Archive`

Use only the pages that the file actually needs.

`00 Overview` is the default combined governance page. Put file purpose, maintenance rules, page map, component map, current source, review status, archive explanation, and open questions there.

Split overview into `00 Workflow Notes` and `04 UI Index` only when page maps or component maps are too large for one readable overview page.

### Separate Source From Evidence

- Put editable screens in baseline/source pages.
- Put reusable current components and variants in components.
- Put imported screenshots and frozen captures in snapshots.
- Put external examples in references.
- Put design trials in exploration.

### Clean Component Pages

- Keep current source components and compact usage examples.
- Move old visual trials to exploration or archive.
- Ensure component sets use meaningful variant dimensions.
- Keep notes about component usage near the source or in the index.

### Archive Without Losing Context

- Prefer moving stale pages under an archive naming convention over deletion.
- Add a short archive note explaining why the content is stale when possible.
- Do not archive ambiguous pages until the user confirms they are not current.

## Before/After Report

After executing cleanup, report:

- Page count before and after.
- Pages created, renamed, moved, or archived.
- Current baseline/source page.
- Component page status.
- Remaining decisions or risks.
