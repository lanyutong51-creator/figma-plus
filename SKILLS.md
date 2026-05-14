# Skill Registry

This repository keeps a project-level record of every Codex skill used for Figma workflow work. When a project-owned skill changes in `~/.codex/skills`, update the mirrored copy in this repo in the same pass so the Git version stays publishable.

## Sync Rule

- Project-owned skills live under `skills/<skill-name>/` in this repo.
- Installed runtime copies live under `~/.codex/skills/<skill-name>/`.
- When editing a project-owned skill, update both locations before committing.
- External plugin/system skills are listed here for dependency clarity, but their source is not copied into this repo.
- If a new skill becomes part of the workflow, add it to this registry with owner, purpose, source, and sync expectation.

## Project-Owned Skills

| Skill | Runtime Path | Repo Mirror | Purpose | Sync |
| --- | --- | --- | --- | --- |
| `figma-plus` | `~/.codex/skills/figma-plus` | `skills/figma-plus` | Reusable Figma-only workflow orchestration: task routing, file structure, component maintenance, Figma handoff frames, reference boards, and QA gates. | Keep runtime and repo mirror identical when modified. |
| `figma-file-governance` | `~/.codex/skills/figma-file-governance` | `skills/figma-file-governance` | Whole-file Figma governance: page inventory, taxonomy, naming, notes/index/archive boundaries, structure findings, and cleanup plans. | Keep runtime and repo mirror identical when modified. |
| `figma-component-governance` | `~/.codex/skills/figma-component-governance` | `skills/figma-component-governance` | Umbrella framework for Figma component asset governance: boundaries, identity, structure, usage, and routing to component subskills. | Keep runtime and repo mirror identical when modified. |
| `figma-component-integrity` | `~/.codex/skills/figma-component-integrity` | `skills/figma-component-integrity` | Focused component integrity audit: fake components, source-instance linkage, detached copies, broken component sets, and weak variant properties. | Keep runtime and repo mirror identical when modified. |
| `figma-component-resize-contracts` | `~/.codex/skills/figma-component-resize-contracts` | `skills/figma-component-resize-contracts` | Focused component resize audit: fixed/stretch contracts, instance size drift, child constraints, variant geometry, and safe resizing. | Keep runtime and repo mirror identical when modified. |
| `figma-layout-qa` | `~/.codex/skills/figma-layout-qa` | `skills/figma-layout-qa` | Figma layout audit companion: structural checks, blocker/major/minor issue ranking, screenshot review, and fix heuristics after Figma writes. | Keep runtime and repo mirror identical when modified. |
| `figma-skill-evals` | `~/.codex/skills/figma-skill-evals` | `skills/figma-skill-evals` | Maintenance eval skill for routing checks, runtime self-check quality, known failures, validation, script syntax, and repo/runtime sync. | Keep runtime and repo mirror identical when modified. |

## Referenced Local Skills

| Skill | Path | Purpose | Sync |
| --- | --- | --- | --- |
| `lynn-ui-collaboration` | `~/.codex/skills/lynn-ui-collaboration` | Lynn-specific UI collaboration workflow, design judgment, fidelity lane selection, and Figma work coordination. | Referenced dependency only. |
| `skill-creator` | `~/.codex/skills/.system/skill-creator` | System skill used to create and validate Codex skills. | System dependency only. |

## Referenced Plugin Skills

| Skill | Source | Purpose |
| --- | --- | --- |
| `figma:figma-use` | Figma plugin | Mandatory prerequisite before `use_figma` calls and direct Figma Plugin API operations. |
| `figma:figma-generate-design` | Figma plugin | Generate full Figma pages, screens, or layouts from detailed briefs or visual references. |

## Current Snapshot

- Created: 2026-05-14
- Primary project-owned skills: `figma-plus`, `figma-file-governance`, `figma-component-governance`, `figma-component-integrity`, `figma-component-resize-contracts`, `figma-layout-qa`, `figma-skill-evals`
- Validation status: all project-owned skills passed `quick_validate.py` after mirroring.

## Eval Artifacts

| Path | Purpose |
| --- | --- |
| `evals/routing-cases.md` | Expected routing examples for `figma-plus` and subskills. |
| `evals/output-checklist.md` | Runtime self-check and final-output review checklist. |
| `evals/known-failures.md` | Durable failure patterns and regression notes. |
| `evals/run-notes/` | Important one-off run notes only; not a normal log folder. |
