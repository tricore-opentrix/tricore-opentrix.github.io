<!-- SPDX-License-Identifier: Apache-2.0 -->

# Issue #7 — License, provenance and rights register

Review date: 2026-11-11. This is a technical inventory, not legal clearance.
The user confirms authorization to license original website work under Apache-2.0.
That confirmation does not establish ownership of external or unidentified assets.
No individual identity, biography or role is approved for the public landing.

## Website scope

| Material | Evidence / applicable terms | Disposition | Required handoff |
| --- | --- | --- | --- |
| Original landing text, original interaction JS, scripts and Issue #7 docs | User's session authorization; new source SPDX Apache-2.0; LICENSE and modification notices | Included within original-work scope | Reviewer records approval on the exact revision before release; no fabricated copyright attestation |
| Existing HTML/CSS layout | Website commit `fbbc6d9` and owner's confirmation for original website code | Existing layout retained; CSS published without remote/font imports | Owner/reviewer resolves any copied/adapted fragments; Git authorship alone is not ownership evidence |
| LICENSE | Full Apache text copied from product P/LICENSE; compared with official Apache text over HTTP, equal after line-ending/outer-whitespace normalization | Included in artifact; text not rewritten | Preserve full terms and applicable notices |
| NOTICE | Original website scope, modification notice and explicit third-party exclusions | Included in artifact | Does not relicense exceptions or assert full compliance |
| `assets/favicon.svg` and old inline SVG/icon paths in legacy HTML/site.js | No upstream author/license/origin record verified; favicon SHA-256 `165ba5262823af6494b08d76d4b14b33433df77715b31c757e1639c1706ffe1c` | **RIGHTS_PENDING / HOLD**, excluded | Obtain origin, permitted uses and attribution, then independent review |
| `assets/vietnam-latin.woff2` | Accompanying FONT-LICENSE claims Be Vietnam Pro, OFL-1.1; binary hash `03d1b589cff172e1a670b3573e731d3380bc326f80cf83b0d3504e3188e2e074` | **RIGHTS_PENDING / HOLD**, excluded | Verify upstream download/version, binary identity and any subset/modification obligations |
| `assets/vietnam-vietnamese.woff2` | Same accompanying license; hash `dc085e2fba3414e5c5bf1e6172f921a9f81c5859946a4ed3d63c1e470d96a9e2` | **RIGHTS_PENDING / HOLD**, excluded | Same upstream verification; never label font Apache-2.0 |
| `assets/FONT-LICENSE.txt` | Existing OFL/copyright text retained byte-for-byte; SHA-256 `9d1b98e6548d01ba998732993adbfcc7a589bab0110cedb5b4825e0b88ba03ec` | Source preserved; excluded because v1 does not ship fonts | If fonts return, distribute correct complete upstream license/notice alongside them |
| Google Fonts Inter import | External stylesheet previously loaded from fonts.googleapis.com; version and delivered bytes not pinned/reviewed | Removed from active CSS; system font stack used | Verify exact font/license before reintroduction; no font binary bundled now |
| New preview | Original HTML/text/CSS, visibly MOCK; no screenshot, real request, logo or SVG image | Included | Do not relabel as LIVE or use private data |
| Eight `articles/*.html`, blog, other legacy pages | Publication approval and content rights not established | **HOLD**, source/history retained; excluded | Yến approves exact content and rights before any future publication |
| Team names, photos, accounts, roles and biographies | Explicit user HOLD | Excluded from landing/artifact | Yến approves exact public content; product README is not website approval |
| Survey form and results | Principle approved; URL could not be inspected by web reader; controller/purpose/fields/retention/consent not verified | **HOLD**, config URL empty, no public CTA | Verify URL and data scope without submitting a response; separately approve metrics/quotes |

The foundation artifact has no image/font dependency. `data:,` is an empty favicon, not a replacement logo.
Existing excluded assets are preserved, not deleted. No blanket Apache header is applied to them.

## Product repository — read-only review

Pinned P: `832c75fc3164cf170eed3bb8f1e380d24dd65aba`.
No product checkout, migration, dependency or code was changed or executed.

| Source | Observed evidence | Boundary / unresolved work |
| --- | --- | --- |
| [LICENSE](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/LICENSE) / [NOTICE](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/NOTICE) | Apache-2.0 full text and original-work attribution exist | Not evidence that every contributor/third-party right is cleared |
| [CONTRIBUTING](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/CONTRIBUTING.md) | Public workflow and review rules exist | Does not prove individual contributor permission |
| [SECURITY](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/SECURITY.md) | Private reporting policy and limitations exist | Policy is not runtime security certification |
| [REUSE.toml](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/REUSE.toml) | External metadata for checksum-sensitive SQL, wrapper and selected files | Never insert headers into immutable Flyway V1–V4 just for PoF; obtain organizer interpretation if per-file external metadata is questioned |
| [THIRD-PARTY-NOTICES](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/THIRD-PARTY-NOTICES.md) | Generated dependency inventory, including Apache/MIT/BSD/CC0 and explicit logback EPL choices | Inventory is not the complete upstream LICENSE/NOTICE text collection; JAR/POM/image/shipped asset scopes must be reconciled |
| [R23 plan](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/docs/06-deployment/r23-plan.md) | Runtime CycloneDX/policy and negative canaries described | Machine policy approval is not redistribution clearance |
| [Exact-P CI](https://github.com/tricore-opentrix/opentrix/actions/runs/42866668592) | API shows five successful jobs, including r23-compliance and REUSE in repo-hygiene | Hosted metadata inspected; full artifacts/logs and all distribution obligations were not audited in this session |
| [R24 guide](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/docs/06-deployment/r24-release.md) | Fail-closed packaging distinguishes candidates/source-only/binary publication | Actual upstream text/source/relink/image/NOTICE duties require exact-artifact review |
| [#138](https://github.com/tricore-opentrix/opentrix/issues/138) | Open: contributor origin, permission and attribution unresolved | Yến accountable; Bảo and Ánh supply scoped attestations, independent review required |

Relevant exception examples in the dependency inventory require actual license choices and
texts for the shipped artifact, including logback's EPL choice, jakarta annotation licensing,
and CC0/BSD alternatives. No GPL/AGPL, patent, linking or compatibility conclusion is inferred
from package names or API boundaries alone. Handoff stays in product #138/R24; no new issue
or remote comment was created. Detailed PoF consequences: [POF](POF.md).

Official reference checked: [Apache license text](https://www.apache.org/licenses/LICENSE-2.0.txt)
and [OSI Apache entry](https://opensource.org/license/apache-2.0). Retain license/attribution,
mark modifications and resolve upstream obligations; inclusion of LICENSE alone is insufficient.
