<!-- SPDX-License-Identifier: Apache-2.0 -->

# Issue #10 — source snapshot

Source: https://github.com/tricore-opentrix/tricore-opentrix.github.io/issues/10
Read: 2026-11-11. Upstream updated: 2026-11-10T11:01:03Z. Original author: phanyen06ym-ien.
This is a read-only requirements record, not a completion or approval.

## Description

Final quality gate before the site is announced publicly, like OpenVie's "Add Tests, CI/CD and Deploy" step. Run this only after #4–#9 are merged.

## Tasks

- [ ] Run `node scripts/check-links.mjs` in CI on every PR, plus external-link verification.
- [ ] Add `sitemap.xml`, `robots.txt`, and a title, description and `og:image` for each page; check the Facebook/Zalo preview.
- [ ] Deploy to GitHub Pages at https://tricore-opentrix.github.io/.
- [ ] Attach 1440 px, 390 px and dark-mode screenshots of the home, team, docs and 404 pages to this issue.
- [ ] Check keyboard accessibility and remove any leftover TRAKZOR, LIVE-without-evidence or "being updated" text.
- [ ] Set the Homepage field and README link of `tricore-opentrix/opentrix` to the site.

## Acceptance Criteria

- CI passes on the PR's HEAD commit.
- Yến and Bảo confirm acceptance with a comment on this issue.

---
**Assignee:** @ngang02012007-crypto · **Review:** @phanyen06ym-ien and @lexuanbao258-collab · Close via PR with `Closes #10`.
**Depends on:** #4, #5, #6, #7, #8, #9.
Reference: https://github.com/OpenVie/OpenVie_Marketing_Documentation
_The previous S7 text is kept in this issue's edit history._
