# Maintained Figma File Structure

Use this reference when creating, reorganizing, or repairing a Figma file intended for ongoing work.

## Default Pages

- `00 Overview`: the operational page. Include purpose, viewport, page map, component map, current Figma source of truth, review status, component rules, and open decisions.
- `01 Editable Baseline`: canonical editable screens at true product size. Keep frames named by screen and state.
- `02 Components`: foundations, reusable components, component sets, states, and compact usage examples.
- `03 Snapshots`: screenshots, imported visual captures, or frozen references. These are evidence, not the editable source.
- `90 Exploration`: drafts, alternate directions, and option comparisons.
- `99 Archive`: old work retained for context but not current.

Split `00 Overview` into `00 Workflow Notes` and `04 UI Index` only when page maps or component maps are too large for one readable overview page.

Respect existing page names when a file already has a clean convention. Repair drift instead of renaming everything.

## Baseline Frames

Baseline frames should:

- Match the target viewport size before design work begins.
- Use stable names such as `Home / Default`, `Editor / Empty`, `Editor / Active Selection`.
- Keep page-level notes outside the product-sized screen frame.
- Avoid detached repeated UI when a reusable component exists.

For prototype review boards, use one product-sized screen plus a notes panel instead of scattering many unrelated fragments.

## Notes Panels

A useful overview or notes panel includes:

- Page or screen purpose.
- Version judgment, such as draft, candidate, approved, or stale.
- Components used or newly introduced.
- Interaction states shown.
- Componentization stage, such as exploration, candidate, baseline, or mature.
- Open questions or known risks.
- QA evidence checked.

## Cleaning Drift

Treat these as file hygiene issues:

- UI fragments sitting at page root.
- Old exploratory variants mixed into the authoritative component page.
- Baseline frames using detached copies while components are stale.
- Snapshots mistaken for editable source.
- Documentation pages containing product UI fragments.

Fix the file structure before doing high-stakes Figma design, component maintenance, or handoff review.
