# Variant Findings

Use this reference when auditing component sets and state organization.

## P1 Findings

### State Components Not Combined

States such as default, hover, selected, active, disabled, error, or pressed are drawn as separate components or frames, but not combined into a component set.

Recommended fix:

1. Confirm the intended state matrix.
2. Combine matching components as variants.
3. Set variant property names to real dimensions such as `状态`, `尺寸`, `样式`, `主题`, or domain terms.
4. Verify all variants keep consistent dimensions unless size is an intentional property.

### Missing Switchable State

Design depends on a state, but the component set does not expose that state as a variant.

Recommended fix:

- Add the missing state variant or clarify that the state is not part of the reusable component contract.

## P2 Findings

### Weak Variant Properties

Variant group uses generic names such as `Property 1`, `Variant`, `Type=1`, or visually descriptive values that mix multiple dimensions.

Recommended fix:

- Rename properties to semantic dimensions.
- Split mixed values into separate dimensions.

### Mixed Variant Dimensions

State, size, style, theme, and semantic type are mixed into one property.

Example bad shape:

```text
Variant = blue / gray / disabled / large
```

Better shape:

```text
样式 = primary / secondary
状态 = default / disabled
尺寸 = sm / md / lg
```

### Inconsistent Variant Geometry

Variants in the same state-only set have unexpected width/height differences, causing switching jumps.

Recommended fix:

- Normalize dimensions unless `尺寸` is an explicit variant property.

## P3 Findings

### Weak State Naming

State names are understandable but inconsistent across component families.

Recommended fix:

- Normalize common names such as 默认, 悬停, 按下, 选中, 禁用, 错误, 加载.
