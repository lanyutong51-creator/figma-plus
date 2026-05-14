---
name: figma-skill-evals
description: "Evaluate and maintain the Figma skill system. Use after creating or modifying Figma-related skills, before publishing or committing the skill repository, when routing feels wrong, when QA misses an issue, when user feedback reveals a skill failure, or when recording known failures and regression cases. Not for normal Figma design work; use to check skill health, routing expectations, runtime self-check quality, validation status, script syntax, repo/runtime sync, and lightweight eval notes."
---

# Figma Skill Evals

Use this skill to keep the Figma skill system healthy. It is a maintenance and regression-checking skill, not part of ordinary Figma design execution.

## When To Use

Use this skill when:

- A project-owned skill was added or edited.
- `figma-plus` routing seems confused.
- A QA miss, false positive, or user correction reveals a new failure mode.
- The repo is about to be published or committed.
- Known failures or routing cases need to be updated.

Do not use this skill for normal Figma creation, editing, governance, component repair, or layout QA.

## Health Check

Run these checks for repository health:

1. Validate every project-owned skill with `quick_validate.py`.
2. Run `node --check` on every JavaScript script under `skills/**/scripts/`.
3. Compare runtime and repo mirror directories with `diff -qr`.
4. Check `SKILLS.md` includes every project-owned skill.
5. Review `evals/routing-cases.md` after routing changes.
6. Review `evals/known-failures.md` after fixing or adding failure patterns.

## Runtime Self-Check Review

Use `references/runtime-self-check.md` to judge whether a normal Figma run explained:

- Trigger
- Route
- Stage, when relevant
- Evidence
- Closure

The self-check should be concise. It should make routing visible without overwhelming the final answer.

## Recording Policy

Do not record every run. Record only runs that produce reusable learning:

- New missed issue.
- False positive.
- Route mistake.
- Stage misclassification.
- QA gap.
- User correction that should change future behavior.
- Complex successful run worth preserving as a reference.

Use:

- `evals/known-failures.md` for durable failure patterns.
- `evals/routing-cases.md` for routing expectations.
- `evals/run-notes/` for important one-off runs.

## Output Shape

```text
Skill health:
- Validation:
- Script syntax:
- Runtime/repo sync:
- Registry:

Routing eval:
- Cases reviewed:
- Mismatches:

Known failures:
- New:
- Resolved:

Recommended updates:
- Skill/doc changes, if any
```

Keep eval reports short unless the user asks for a detailed review.
