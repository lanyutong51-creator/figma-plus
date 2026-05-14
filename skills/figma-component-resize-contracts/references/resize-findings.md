# Resize Findings

Use this reference when auditing resize contract issues.

## P1 Findings

### Visible Break After Resize

A component instance is stretched or scaled and visible children break: clipped text, drifting badges, distorted symbols, misplaced icons, or broken alignment.

Recommended fix:

1. Fix source component layout/constraints.
2. Test one representative instance.
3. Run layout QA.
4. Apply to remaining instances.

### Semantic Object Arbitrarily Scaled

An icon, token, game piece, cell, or precise semantic object is scaled to unrelated sizes.

Recommended fix:

- Restore fixed-size behavior or create explicit size variants.

## P2 Findings

### Unclear Contract

Component has multiple instance sizes or ambiguous structure but no clear fixed/stretch expectation.

Recommended fix:

- Assign and document one contract before broad reuse.

### Stretchable Parent With Fixed Children

Parent appears stretchable, but children use constraints or sizing that will drift or clip when resized.

Examples:

- Text box fixed width inside a horizontal button.
- Badge pinned by absolute position inside a resizable card.
- Divider not stretching with parent.

Recommended fix:

- Fix child constraints, layout sizing, or auto-layout behavior.

### Variant Geometry Jump

Variants in a component set have different dimensions but no explicit size property.

Recommended fix:

- Normalize dimensions or add a `尺寸` / size variant dimension.

### Instance Outside Contract

Instance dimensions differ from source in a way that conflicts with the inferred contract.

Recommended fix:

- Resize instance back to source contract, or create a proper size variant.

## P3 Findings

### Contract Not Documented

Component appears usable, but the expected resize behavior is not documented in name, description, nearby note, or usage example.

Recommended fix:

- Add concise usage note or example.
