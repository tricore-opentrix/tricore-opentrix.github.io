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

## Historical #7 foundation boundary

Before #8–#10, the builder created the following nine-file foundation artifact:

```text
index.html
404.html
robots.txt
.nojekyll
LICENSE
NOTICE
assets/style.css
assets/config.js
assets/landing.js
```

That list is historical; the current manifest and the amendment below supersede it.
No recursive source copy, wildcard upload or cleanup. Other paths were excluded by default,
including `articles/`, `blog.html`, unreviewed team/survey/solution/technology pages, old JS,
SVG/fonts, Markdown reports, Git metadata, editor config, backups and local test artifacts.
`scripts/check-site.mjs` rejects an extra file, a held link or changed article source.
`scripts/serve-site.mjs` binds loopback and only serves the allowlist from `.local`, returning
404 for all other paths; it rejects using repository root as its document root.

## Future actions for authorized maintainers only

1. Resolve reviewer/content/rights gates and review exact diff and artifact. Keep source/history.
2. Migrate Pages away from branch-root publishing to a reviewed Actions deployment that uploads
   **only the checked artifact** (or another explicitly reviewed isolated publication source).
   Never upload `.` or the repository root. This session supplies no automatic deployment workflow.
3. Confirm the old publication is replaced and CDN/cache does not expose held content.
4. Run `node scripts/check-deployed.mjs https://tricore-opentrix.github.io/` against the actual new
   deployment. Also inspect DevTools/network and a sample GET manually, including query-string/cache
   variants and unknown routes. Require 404/410 and absence of old content, not just a hidden menu.
5. Record deployment SHA, artifact digest, Pages source, timestamp, HTTP results and independent
   Yến/Bảo verdict. If inaccessible, record BLOCKED; if held content remains, FAIL.

The script catches `.html`, extensionless and slash aliases. It does not certify every CDN,
custom-domain, cache or rewrite variant. Recheck any custom domain when one is configured.
No PASS for the future deployed revision can be inferred from this local preview.

## Current #8–#10 amendment — 2026-11-11

The current default artifact is LOCAL_REVIEW, with 23 explicitly listed files; it is not an approval to publish. Selected replacement team/architecture pages, roadmap and blocked API reference now enter the allowlist. Unapproved personal fields are absent. Legacy articles/blog/fonts/icons remain excluded. Current files:

```text
index.html
404.html
robots.txt
.nojekyll
LICENSE
NOTICE
assets/style.css
assets/config.js
assets/landing.js
about.html
roadmap.html
technology.html
docs/index.html
sitemap.xml
assets/pages.css
assets/tokens.css
assets/team.js
assets/dxos-architecture.svg
assets/og-image.png
assets/og-image.png.license
assets/api-reference.mjs
assets/mock-engine.mjs
website-manifest.json
```

The TEST artifact has a separate pointer, TEST/noindex banners and docs/test-api-docs.json. Never upload it. The current read-only public probe at 2026-11-11T14:55:58.759Z again returned 18 FAIL and 9 PASS. .local/deployed-check.json now holds this newer run, superseding the old raw snapshot referred to above; the older timestamp/table remains historical context. No remote change occurred. Inactive deployment preparation: docs/issue-10/pages-workflow.yml.example; live GitHub CI/deployment remains PENDING.
