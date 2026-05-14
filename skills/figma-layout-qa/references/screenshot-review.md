# Screenshot Review Checklist

Use this after `get_screenshot` on the audited Figma target.

## Must Check

- No text is clipped at top, bottom, left, or right edges.
- Multi-line text shows the intended final line.
- Text does not overlap icons, controls, cards, or neighboring text.
- Buttons and compact controls have stable width/height and readable labels.
- Frames with `clipsContent` do not accidentally hide child content.
- Empty states, placeholder labels, and default strings are not visible unless intended.
- Layout rhythm is coherent: spacing, padding, and alignment look deliberate.
- Mobile/compact variants, if present, do not compress text into illegibility.

## Visual Smells

- Text baseline looks too high or low in a button.
- A card or frame appears blank even though metadata contains children.
- Children touch frame edges without intentional padding.
- A label wraps unexpectedly in a chip, tab, or button.
- One repeated item has a different height from its siblings.
- The screenshot shows a large empty gap caused by an accidental fixed size.

## Reporting

Report only actionable issues. Prefer node names and visible symptoms over vague taste language.
