<!-- SPDX-License-Identifier: Apache-2.0 -->

# Issue #5 — source snapshot

Source: https://github.com/tricore-opentrix/tricore-opentrix.github.io/issues/5
Read: 2026-11-11. Upstream updated: 2026-11-10T10:54:59Z. Original author: phanyen06ym-ien.
This is a read-only requirements record, not a completion or approval.

## Description

The architecture diagram must match section 3 of the competition brief and the current OpenTrix architecture: a headless core-service and a helpdesk-service as two services behind APISIX. Core services belong to Layer 1; H-P-D-I belongs to Layer 2.

## Tasks

- [ ] Layer 1 — headless core: Keycloak (SSO), APISIX (API gateway), Workflow API, PostgreSQL 17, SeaweedFS, Node-RED.
- [ ] Layer 2 — H-P-D-I: [H] and [P] solid (including the IT Helpdesk portal); [D] and [I] planned.
- [ ] Layer 3 — business application: IT Helpdesk.
- [ ] Draw components that are not built yet with dashed outlines, and give each component a status chip from #7.
- [ ] Make the SVG include `<title>` and `<desc>`, use light/dark colors from `tokens.css`, and avoid label/edge overlap.

## Acceptance Criteria

- Matches section 3 of the competition brief.
- Renders cleanly at 390 px.
- Diagram authorship and sources are stated in the PR (the old diagram's rights were UNKNOWN).

---
**Assignee:** @ngang02012007-crypto · **Review:** @phanyen06ym-ien or @lexuanbao258-collab (1 approval) · Close via PR with `Closes #5`.
Reference: https://github.com/OpenVie/OpenVie_Marketing_Documentation
_The previous S2 text is kept in this issue's edit history._
