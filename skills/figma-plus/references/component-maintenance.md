# Component Maintenance

Use this reference when creating, updating, replacing, or QAing Figma components.

## Extraction Heuristics

Extract a component when an element is repeated, stateful, semantically important, or likely to recur:

- Navigation items, tabs, toolbar controls, filters, badges, chips.
- Cards, rows, panels, HUD groups, input shells, empty states.
- Domain objects such as game pieces, tokens, item cells, avatars, thumbnails.
- Buttons and compact CTAs with variants.

Do not extract everything. Single-use layout scaffolding can remain local if componentizing it would slow iteration without future value.

## Variant Properties

Variant properties should describe the actual state matrix:

- Use dimensions like `入口`, `状态`, `尺寸`, `密度`, `主题`, or domain-specific state names.
- Avoid creating variants that only differ by arbitrary labels.
- Inspect `variantGroupProperties` and child `variantProperties` after creating a component set.

Examples:

- Navigation item: `入口=首页/编辑器/设置`, `状态=默认/选中/禁用`.
- Button: `样式=主按钮/次按钮/危险`, `状态=默认/悬停/按下/禁用`, `尺寸=小/中/大`.
- Game token: `阵营=红/蓝`, `状态=默认/选中/可行动/受击`.

## Resize Contracts

Assign one resize contract per component:

- `fixed-size`: icons, marks, semantic pieces, cells, precise controls.
- `fixed-aspect`: thumbnails, avatars, media previews, tokens whose proportion matters.
- `horizontal`: rows, tabs, buttons, inputs, labels, toolbars.
- `vertical`: lists, logs, text panels with fixed width.
- `full`: cards, panels, containers, empty states.

For stretchable components, set child constraints so labels, badges, dividers, status dots, and icons remain anchored after resizing.

## Replacement Rules

When replacing detached artwork with component instances:

1. Update the source component first.
2. Replace one representative instance.
3. Resize it according to its contract.
4. Screenshot the affected baseline frame.
5. Check for clipped text, stretched symbols, misplaced status dots, changed radius, and broken alignment.
6. Then replace the remaining copies.

Successful instance count is not enough. Visual and structural QA must both pass.
