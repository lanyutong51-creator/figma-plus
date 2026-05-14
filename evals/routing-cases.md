# Routing Cases

Use these cases to check whether `figma-plus` routes Figma requests to the right subskill.

| User request pattern | Expected route | Notes |
| --- | --- | --- |
| "看看这个 Figma 文件有多少页面，分类乱不乱" | `figma-plus` -> `figma-file-governance` | Whole-file/page taxonomy. |
| "这个文件需不需要整理成 Overview / Baseline / Components" | `figma-plus` -> `figma-file-governance` | Structure governance. |
| "现在适不适合组件化，应该维护到什么程度" | `figma-plus` -> `figma-component-governance` | Needs page stage and componentization depth. |
| "组件页改了但 design 页没变" | `figma-plus` -> `figma-component-governance` -> `figma-component-integrity` | Fake component/source-instance linkage. |
| "状态都画了，但不能切 variants" | `figma-plus` -> `figma-component-governance` -> `figma-component-integrity` | Semantic variant structure. |
| "按钮拉宽后 icon 和文字错位" | `figma-plus` -> `figma-component-governance` -> `figma-component-resize-contracts` -> `figma-layout-qa` | Resize contract then visual QA. |
| "这个组件应该 fixed 还是 stretch" | `figma-plus` -> `figma-component-governance` -> `figma-component-resize-contracts` | Resize contract decision. |
| "这个 frame 有没有裁切、溢出、遮挡风险" | `figma-plus` -> `figma-layout-qa` | Layout/visual QA. |
| "生成一个新的 Figma 页面" | `figma-plus` -> `figma:figma-generate-design` -> `figma-layout-qa` | Generation followed by QA. |
| "修 React/CSS/PR" | no `figma-plus` | Not a Figma-only task. |
