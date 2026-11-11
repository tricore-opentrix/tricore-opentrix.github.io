<!-- SPDX-License-Identifier: Apache-2.0 -->

# Issue #9 — source snapshot

Source: https://github.com/tricore-opentrix/tricore-opentrix.github.io/issues/9
Read: 2026-11-11. Upstream updated: 2026-11-10T10:59:50Z. Original author: phanyen06ym-ien.
This is a read-only requirements record, not a completion or approval.

## Description

Developer-facing API docs like OpenVie's `/docs`: an API Reference page built from the `api-docs.json` of #4, plus a "Try it out" playground that always returns static mock data with no network calls.

## Tasks

- [ ] Build `/docs` from #4: endpoints grouped by tag, parameters and schemas shown as JSON blocks with a copy button.
- [ ] Add a "Try it out" playground that generates deterministic (seeded) mock responses from the schema, with simulated latency and no network requests.
- [ ] Offer the raw `api-docs.json` as a download for Postman/codegen.
- [ ] Support light/dark theme and phone width.

## Acceptance Criteria

- Every endpoint in `api-docs.json` appears on the page.
- The playground works offline and its responses are clearly labeled as MOCK.
- The page renders cleanly at 390 px.

---
**Assignee:** @ngang02012007-crypto · **Review:** @phanyen06ym-ien or @lexuanbao258-collab (1 approval) · Close via PR with `Closes #9`.
**Depends on:** #4.
Note: survey metrics, interview quotes and portal screenshots from the old S6 stay HOLD until rights are approved; see the rules in #7.
Reference: https://github.com/OpenVie/OpenVie_Marketing_Documentation
_The previous S6 text is kept in this issue's edit history._
