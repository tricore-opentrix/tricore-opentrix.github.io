# B2-05D — AI-Assisted Asset Provenance and Publication Register

**Repository:** tricore-opentrix/tricore-opentrix.github.io  
**Website P6 baseline reviewed:** `site/p6-release@5afa47e12ff6d66d2d85b56ab1b590fcbee2ecc6`  
**Evidence type:** Team-level declaration supplied by a TRICORE member on 2026-11-08; repository source audit (B2-05C).  
**Status:** PARTIAL — NOT CLEARED FOR REDISTRIBUTION

## Team declaration

TRICORE reports using **ChatGPT, Codex, Claude, and Claude Code** in developing the OPENTRIX website and its content. This is a declaration about the team's toolset, **not proof that any specific tool created any specific asset**.

The team has agreed to disclose member names. The team is **TRICORE**, affiliated with **CMC University** as its members' university; this does not assert university sponsorship or official endorsement. Reported contributions are: **Phan Hải Yến — initial foundation; Nguyễn Ngọc Ánh — code development; Lê Xuân Bảo — review and coding assistance**. The exact public biographies/role labels remain subject to review. **Participation in OLP 2026 has not been confirmed**, and no specific competition date should be presented as officially verified.

## Asset provenance matrix

| ID | Public asset | Known provenance | Tool-to-asset mapping | Third-party components and sources | Publication / redistribution clearance |
|---|---|---|---|---|---|
| A1 | `assets/share.png` (social preview) | Team-level AI-assisted development declared | UNKNOWN | UNKNOWN | PENDING VERIFICATION |
| A2 | `assets/favicon.svg` (site icon) | Team-level AI-assisted development declared | UNKNOWN | UNKNOWN | PENDING VERIFICATION |
| A3 | Inline architecture SVG in `projects/dx-os.html` | Team-level AI-assisted development declared | UNKNOWN | UNKNOWN | PENDING VERIFICATION |

No individual creator, precise generator, prompt, external template, reference URL, or license is established for A1–A3. AI-tool usage alone does not establish authorship, ownership, permission to publish, or redistribution rights. **UNKNOWN does not mean prohibited**; it means evidence is insufficient for clearance.

## Evidence required before clearing A1–A3

1. Obtain a per-asset declaration from the actual creator or the person who integrated it, naming their role and the exact asset.
2. Identify whether each asset was drawn or coded independently, generated or revised using AI, or adapted from third-party materials.
3. For any identifiable external materials, record source URLs, licenses, attribution obligations, and modification history.
4. Record the intended permissions separately for (a) public website display and (b) redistribution with the public source repository.
5. Have an authorized independent reviewer check the evidence and record an explicit decision: CLEARED, DEFER, or UNKNOWN.

## Publication boundaries

- Keep the eight unapproved blog articles under their existing publication HOLD.
- Keep the unapproved Google Forms collection CTA under its existing survey HOLD.
- Do not describe OLP 2026 participation or an unverified competition date as confirmed.
- Do not conflate website publication permission with product-code licensing or R24/#138 redistribution clearance.
- The existence of a repository commit, a generated image, a team-level AI declaration, or a green CI check is not a license grant.

## Status and next action

**A1–A3: PENDING VERIFICATION / NOT CLEARED.** Obtain precise asset-level provenance and approval, or defer public distribution of the respective asset and its references before release. This document is an evidence register, not a copyright ownership determination.

**P6 PR #2 remains Draft and must not be merged solely on the basis of this declaration.**

## B2-05E-02 - Current-tree asset distribution HOLD

Baseline: `site/p6-release@d489903f9784dcaac64c667a424a5dfbfdcf82bf`.

| Original path | Bytes | SHA-256 | Git blob identifier at baseline |
|---|---:|---|---|
| `assets/share.png` | 41522 | `25fc52e2822867506c0b40c4561275b87cbb10deb72ebcc4429dbfbc51abb9a1` | `5f1bef543b2b2112b73e5c3bfa1a2c62c1d4fae6` |
| `assets/favicon.svg` | 339 | `282682c5517d519d1130dfaa91dd14827012fa82e33a7f4724e3358ab91312bc` | `22fbe11f3bcaf3368e572351204668bc733433fc` |

The custodian externally confirmed private preservation: both copies passed SHA-256 verification, a restore test passed, the unexpected read permission was removed, and seven relevant paths passed ACL verification. This confirmation was supplied for this task; the implementation did not access the private preservation location or independently repeat its checks. No private location is disclosed here.

Both original assets have been removed from the current P6 working tree. Public HTML and generated metadata no longer reference them. The inline architecture SVG is deferred from the public project page; the existing technical explanation is retained as text. A read-only asset-distribution HOLD guard checks paths, known byte-identical copies, public references and generator literals, and runs before the existing publication checks in Site checks.

Rights for A1-A3 remain **UNKNOWN / NOT CLEARED**. Preservation, file removal and passing CI do not establish authorship, licensing or redistribution permission. Restoring any asset to public distribution requires explicit asset-level clearance and independent review.

**Historical Git distribution remains unresolved.** Current-tree removal does not erase earlier commits, blobs, other branches/tags, archives, clones, forks, deployments or caches. No Git history was rewritten. Historical rights review and any later withdrawal decision remain separate from this current-tree HOLD; this register does not claim complete removal from public distribution.
