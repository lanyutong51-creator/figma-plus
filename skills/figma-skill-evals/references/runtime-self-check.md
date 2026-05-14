# Runtime Self-Check

Use this reference to evaluate the lightweight self-check that `figma-plus` should include after meaningful Figma work.

## Required Fields

- `Trigger`: why Figma work was appropriate.
- `Route`: which skill path was used.
- `Stage`: page/component stage when relevant.
- `Evidence`: what the judgment relied on, such as metadata, inventory script, component audit, resize audit, layout audit, or screenshot.
- `Closure`: whether QA completed, user confirmation is pending, or QA was not applicable.

## Good Example

```text
运行自检：
- Trigger: 用户要求整理 Figma 文件结构
- Route: figma-plus → figma-file-governance
- Stage: 方向收敛期
- Evidence: file inventory + page taxonomy review
- Closure: 仅输出整理建议，等待确认后再移动页面
```

## Bad Patterns

- Omits route after using multiple subskills.
- Claims QA passed without screenshot or layout audit evidence.
- Treats exploration work as mature component maintenance.
- Writes a long eval report into every normal final answer.
