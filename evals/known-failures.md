# Known Failures

Record reusable failure patterns here. Do not use this as a run log.

## Template

```text
Date:
Context:
Observed failure:
Expected behavior:
Affected skill(s):
Fix or follow-up:
Regression case added:
```

## Current Patterns

- Overlap/occlusion can be missed by structural layout audits because bounding-box overlap is not always a layout error. Future QA should combine overlap-risk signals with screenshot review.
