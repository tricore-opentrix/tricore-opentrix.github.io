<!-- SPDX-License-Identifier: Apache-2.0 -->

# Issue #4 — source snapshot

Source: https://github.com/tricore-opentrix/tricore-opentrix.github.io/issues/4
Read: 2026-11-11. Upstream updated: 2026-11-10T10:53:24Z. Original author: phanyen06ym-ien.
This is a read-only requirements record, not a completion or approval.

## Description

Replaces the old S1. Like OpenVie, API docs come from one `api-docs.json` exported from the backend Swagger, not hand-written pages. The site reads this file at build time; no route calls a server at runtime.

## Tasks

- [ ] Add `api-docs.json` exported from `/v3/api-docs` of core-service and helpdesk-service in `tricore-opentrix/opentrix` (ask Yến/Bảo for the export).
- [ ] Write a parser that groups endpoints by tag and builds anchors/slugs.
- [ ] Remove the old hand-written `docs/` pages and their `sitemap.xml` entries.
- [ ] Add a README section "Updating API docs": export new JSON → replace `api-docs.json` → rebuild.
- [ ] Replace remaining `lexuanbao258-collab/...` links with `tricore-opentrix/...`.

## Acceptance Criteria

- Replacing `api-docs.json` updates the docs with no other edits.
- No links to old repositories remain.

---
**Assignee:** @ngang02012007-crypto · **Review:** @phanyen06ym-ien or @lexuanbao258-collab (1 approval) · Close via PR with `Closes #4`.
**Next:** #9 builds the API Reference page on top of this.
Reference: https://github.com/OpenVie/OpenVie_Marketing_Documentation
_The previous S1 text is kept in this issue's edit history._
