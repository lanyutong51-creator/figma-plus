# Page Taxonomy

Use this reference to classify Figma pages during governance audits.

## Categories

- `overview`: file purpose, rules, page map, component map, current source, review status, archive notes, and open decisions.
- `baseline`: canonical editable product screens, main states, maintained source frames.
- `components`: source components, component sets, foundations, variables usage examples.
- `snapshots`: screenshots, imported captures, frozen visual references.
- `references`: inspiration, external UI references, moodboards, competitive samples.
- `exploration`: drafts, direction tests, alternatives, messy iteration boards.
- `archive`: old work intentionally retained but no longer current.
- `index`: screen maps, component maps, navigation/index pages. Prefer merging this into `overview` unless the file is complex.
- `mixed`: page combines multiple categories in a way that affects maintainability.
- `unknown`: purpose cannot be inferred from name or structure.

## Naming Expectations

Prefer this default order for maintained interface files:

- `00 Overview`
- `01 Editable Baseline`
- `02 Components`
- `03 Snapshots`
- `90 Exploration`
- `99 Archive`

`00 Overview` is the default combined notes/index page. It should contain file purpose, maintenance rules, page map, component map, current editable source, review status, archive boundaries, and open questions.

Split `00 Workflow Notes` and `04 UI Index` only when the file is large enough that one overview page becomes hard to scan, such as files with many product states, a large component library, multi-person collaboration, or long-term cross-version maintenance.

For small files, use only the pages needed. Common reductions:

- Lightweight design file: `00 Overview`, `01 Design`, `02 Components`.
- Reference library: `00 Overview`, `01 References`, `99 Archive`.
- Draft-only exploration: `00 Overview`, `90 Exploration`.

Do not force this model onto a file that already has a clear, consistent convention. In that case, report the existing convention and judge whether it is sufficient.

## Classification Hints

- Pages with many `COMPONENT` or `COMPONENT_SET` nodes are usually `components`.
- Pages with image-heavy frames and few editable UI layers are often `snapshots` or `references`.
- Pages with many similarly named alternatives are often `exploration`.
- Pages with old dates, old prefixes, or "archive/history/old/归档/历史" naming are usually `archive`.
- Pages with mixed components, screenshots, final screens, and notes should be marked `mixed` unless the structure is clearly sectioned.
- Pages named overview, notes, index, workflow, 说明, 目录, or 索引 are often `overview` unless they only contain one narrow map.

## Componentization Stage

Use this stage to inform `figma-component-governance`.

- `想法探索期 / Exploration`: page is mostly drafts, alternatives, loose trials, or rapidly changing direction. Componentization should stay light.
- `方向收敛期 / Candidate`: one direction is emerging but page/state details may still change. Extract only obvious repeated or stateful UI.
- `正式基准期 / Baseline`: page is the current editable source or main state. Repeated and stateful UI should become real source components connected by instances.
- `长期维护期 / Mature`: file has cross-page reuse, stable patterns, or long-term maintenance needs. Components should have semantic variants, resize contracts, usage examples, and integrity checks.

When unsure, choose the less strict stage and explain what evidence would justify moving to a stricter componentization level.
