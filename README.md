# Figma Plus

Figma Plus is a collection of Codex skills for making Figma work more reliable, maintainable, and reviewable.

It focuses on governance work that often gets lost between design exploration and implementation: file structure, component integrity, resize behavior, layout QA, and repeatable review standards.

## Why This Exists

AI-assisted Figma work can move fast, but fast edits are only useful when the file remains understandable after the first pass. This repository turns repeated Figma maintenance habits into reusable Codex skills:

- keep long-lived Figma files organized instead of letting drafts, screenshots, and source frames blur together
- audit whether design pages use real component instances instead of detached copies
- check whether component variants and resize behavior can survive future edits
- run layout QA after Figma writes so clipped text, overflow, and weak auto-layout are caught before handoff
- preserve useful routing, evaluation, and failure notes as the workflow evolves

## How It Works

Figma Plus is organized as a small skill system rather than a single large prompt. The main `figma-plus` skill acts as the router: it classifies the Figma task, chooses the right governance or QA subskill, and defines what evidence should be checked before the work is reported as done.

The implementation follows a repeatable loop:

1. Classify the task as structure, design, systemization, component governance, or QA.
2. Inspect the Figma file, page, node, component set, or screenshot evidence before changing anything.
3. Route focused work to a smaller skill, such as file governance, component integrity, resize contracts, or layout QA.
4. Use scripts in `skills/*/scripts/` for structured audits when the Figma Plugin API can provide stronger evidence than manual inspection.
5. Record durable routing cases, output checks, and known failures in `evals/` so the workflow improves over time.

This keeps the system easier to maintain: broad workflow decisions live in `figma-plus`, while specialized rules and audit scripts stay close to the skill that owns them.

## What Is Included

| Skill | Purpose |
| --- | --- |
| `figma-plus` | Main workflow companion for routing Figma tasks, choosing the right skill, and enforcing QA gates. |
| `figma-file-governance` | Audits whole-file structure: pages, archives, snapshots, naming, overview pages, and cleanup plans. |
| `figma-component-governance` | Umbrella framework for component asset strategy, maintenance boundaries, and subskill routing. |
| `figma-component-integrity` | Checks source-instance linkage, fake components, detached copies, component sets, and variant quality. |
| `figma-component-resize-contracts` | Reviews fixed/stretch behavior, instance size drift, child constraints, and variant geometry. |
| `figma-layout-qa` | Runs structural and screenshot-based QA after Figma edits. |
| `figma-skill-evals` | Maintains routing evals, runtime self-checks, known failures, and regression notes. |

## Repository Structure

```text
.
|-- SKILLS.md
|-- evals/
|   |-- known-failures.md
|   |-- output-checklist.md
|   |-- routing-cases.md
|   `-- run-notes/
`-- skills/
    |-- figma-plus/
    |-- figma-file-governance/
    |-- figma-component-governance/
    |-- figma-component-integrity/
    |-- figma-component-resize-contracts/
    |-- figma-layout-qa/
    `-- figma-skill-evals/
```

`SKILLS.md` is the registry for project-owned skills, referenced local skills, plugin dependencies, and sync expectations.

## How To Use

Clone the repository:

```bash
git clone https://github.com/lanyutong51-creator/figma-plus.git
cd figma-plus
```

Copy the skills you want into your Codex skills directory:

```bash
cp -R skills/figma-plus ~/.codex/skills/
cp -R skills/figma-file-governance ~/.codex/skills/
cp -R skills/figma-component-governance ~/.codex/skills/
cp -R skills/figma-component-integrity ~/.codex/skills/
cp -R skills/figma-component-resize-contracts ~/.codex/skills/
cp -R skills/figma-layout-qa ~/.codex/skills/
cp -R skills/figma-skill-evals ~/.codex/skills/
```

Then ask Codex to use the relevant skill when working on Figma files. For example:

```text
Use figma-file-governance to audit this Figma file structure.
```

```text
Use figma-layout-qa after updating this Figma screen.
```

```text
Use figma-component-integrity to check whether these design pages use real component instances.
```

## Maintenance Model

Project-owned skills are mirrored between this repository and the local Codex runtime:

- repo mirror: `skills/<skill-name>/`
- local runtime copy: `~/.codex/skills/<skill-name>/`

When a skill changes, update both copies in the same pass so the repository remains publishable and the runtime behavior stays current.

Evaluation notes live in `evals/`:

- `routing-cases.md` records expected skill routing examples
- `output-checklist.md` records final-output and runtime self-check expectations
- `known-failures.md` records durable failure patterns
- `run-notes/` is reserved for important one-off eval notes, not normal logs

## Good First Contributions

Useful contributions include:

- clearer routing examples for ambiguous Figma tasks
- new component governance findings and severity rules
- layout QA edge cases with before/after evidence
- better install documentation for different Codex setups
- regression cases for skill routing or Figma audit scripts

## Project Status

This is an early public version. The skills are already usable, but the governance rules will keep evolving as more Figma workflows, failure modes, and evaluation cases are collected.

## Disclaimer

This project is an independent Codex skill collection. It is not an official Figma or OpenAI project.
