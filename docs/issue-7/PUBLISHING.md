<!-- SPDX-License-Identifier: Apache-2.0 -->

# Issue #7 — HOLD boundary and future publication

**Current remote acceptance: FAIL. Website v1 publication: BLOCKED.**
No deployment or remote configuration change was made in this session.

Read-only Pages API returned `legacy`, source branch `main`, path `/`, status `built`.
The root `.nojekyll` is tracked. Branch-root publication can therefore include the retained
blog/legacy files; hiding a nav item or adding robots exclusions does not prevent direct access.

At **2026-11-10T19:45:37.635Z** (2026-11-11 in Asia/Bangkok), the read-only GET probes found:

| Target group | `.html` | Extensionless | Trailing slash |
| --- | --- | --- | --- |
| `blog` | 200, held title present — FAIL | 200, held title present — FAIL | 404 — PASS |
| All eight article paths below | 200, held title present — FAIL for all 8 | 200, held title present — FAIL for all 8 | 404 — PASS for all 8 |

Paths retained in source:

```text
articles/api-va-giao-dich-khong-ro-ket-qua.html
articles/danh-tinh-va-quyen-truy-cap.html
articles/doc-bang-chung-ma-nguon-mo.html
articles/facility-va-bai-kiem-tra-tai-su-dung.html
articles/helpdesk-tu-yeu-cau-den-xac-nhan.html
articles/khao-sat-truoc-khi-viet-code.html
articles/tu-mock-den-live.html
articles/workflow-va-ung-dung.html
```

27 responses: 18 FAIL, 9 PASS, no probe BLOCKED in that run. Raw local record:
`.local/deployed-check.json`. This record describes the old remote deployment, not the local revision.
The same 27 local-artifact probes must all return 404, with no held article content.

## Local foundation allowlist

- `index.html`
- `404.html`
- `robots.txt`
- `.nojekyll`
- `LICENSE`
- `NOTICE`
- `assets/style.css`
- `assets/config.js`
- `assets/landing.js`

Only the isolated artifact is for local review. All eight HOLD articles remain in source/history. Never publish repository root; remote acceptance is BLOCKED.
