# Workflow Router

Use this reference when choosing how to approach a Figma-only task. If the user is asking for code implementation or repository work without a Figma artifact, do not use `figma-plus`.

## Structure

Choose structure work when the request is about:

- Creating a new Figma file or organizing an existing one.
- Establishing pages, notes, component areas, indexes, or reference sections.
- Cleaning root-level fragments, stale boards, unclear naming, or mixed draft/source material.
- Making a file easier to maintain across future Figma iterations.

Typical flow:

1. Inspect pages and target nodes.
2. Identify whether this is a draft, maintained source, component library, or reference board.
3. Create or repair the page model.
4. Move or rename content without changing design intent unless requested.
5. Run layout QA on touched frames and screenshot any important review boards.

## Design

Choose design work when the request changes any of these Figma concerns:

- Layout hierarchy or major region relationships.
- Page density, navigation, sidebars, panels, dashboards, boards, or editors.
- Responsive behavior or viewport contract.
- Component shape, state matrix, or reusable design patterns.
- Visual direction where Lynn needs to judge alternatives.

Typical flow:

1. Inspect existing Figma file or create a bounded draft target.
2. Establish viewport and page structure.
3. Build or update baseline frame.
4. Extract or update components and states.
5. Run QA and screenshot review.
6. Document the design state, open questions, and next Figma pass.

## Systemize

Choose systemization when the user wants reusable Figma materials:

- Component extraction.
- Component sets and variants.
- Variables, styles, tokens, or foundations inside Figma.
- Usage examples and index pages.
- Reusable patterns for future Figma work.

Typical flow:

1. Identify repeated or stateful Figma elements.
2. Define component names, variant dimensions, and resize contracts.
3. Build or update sources on the component page.
4. Replace representative detached copies with instances where practical.
5. QA the source component and a real usage frame.
6. Update notes/index with how to reuse the component.

## QA-Only

Choose QA-only when Lynn asks whether a Figma result is correct, messy, clipped, stale, maintainable, or reusable.

Typical flow:

1. Inspect metadata for target scope.
2. Run structural audit with `figma-layout-qa`.
3. Review screenshot of the actual target.
4. Inspect components/variants if component maintenance is in scope.
5. Report findings first, then propose or make fixes.
