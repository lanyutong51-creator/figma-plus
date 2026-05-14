# Resize Contract Types

Use this reference to infer and explain component resize contracts.

## Contract Types

### fixed-size

Use when size carries semantic meaning or visual precision.

Examples:

- Icons, marks, symbols.
- Game pieces, tokens, board cells.
- Status dots, small badges, precise controls.

Maintenance rule:

- Do not arbitrarily scale instances.
- Create size variants when a second production size is required.

### fixed-aspect

Use when proportions carry meaning.

Examples:

- Avatars, thumbnails, media previews.
- Product images, cards dominated by imagery.

Maintenance rule:

- Preserve aspect ratio.
- Avoid independent width/height stretch.

### horizontal

Use when text/content width changes but height should stay stable.

Examples:

- Buttons, tabs, chips, nav items.
- Inputs, search fields, toolbar rows, list rows.

Maintenance rule:

- Icons remain anchored.
- Text uses appropriate auto-resize or fill behavior.
- Badges/status dots stay aligned.

### vertical

Use when width is stable and content grows downward.

Examples:

- Logs, comments, text panels, stacked lists.

Maintenance rule:

- Text areas and list containers grow vertically.
- Headers/actions stay anchored.

### full

Use when the component is a container or responsive shell.

Examples:

- Cards, panels, empty states, dashboards, content shells.

Maintenance rule:

- Children need explicit constraints or auto-layout behavior.
- Internal controls should not drift when width/height changes.

## Inference Rules

- Choose the least permissive contract when unsure.
- A component with multiple real instance sizes is not automatically stretchable; it may need size variants.
- A stretchable-looking container is unfinished if child constraints are not verified.
- If variants differ in dimensions but there is no size property, treat this as a resize risk.
