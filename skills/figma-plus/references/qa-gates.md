# QA Gates

Use this reference before reporting a Figma task as complete.

## Mandatory Evidence

For meaningful Figma writes:

- Structural audit via `figma-layout-qa`.
- Screenshot of the target frame/component after fixes.
- Manual visual review for clipping, overlap, hierarchy, spacing, and missing content.

For component work:

- Inspect component set properties and child variant properties.
- Verify resize behavior on at least one real instance if the component is stretchable.
- Screenshot both the component source and one affected baseline frame when replacement occurred.

## Blockers

Do not call the work done while any of these remain:

- Visible text is clipped or illegible.
- Important content sits outside a clipping parent.
- A frame is empty, zero-size, invisible, or at the wrong product size.
- Detached UI copies conflict with maintained components.
- Component variants do not represent the real state matrix.
- Screenshot review contradicts metadata results.
- The result solves a script target but not Lynn's actual request.

## Final Response Shape

Keep the closeout concrete:

```text
已完成：
- Created/updated the target frame or component.
- Organized pages/components/notes if applicable.

已检查：
- Structural audit: result.
- Screenshot review: target checked.
- Component/state QA: result if applicable.

剩余：
- Only mention real risks, open decisions, or next passes.
```

If QA could not be completed, say exactly which evidence is missing and why.
