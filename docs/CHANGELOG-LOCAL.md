<!-- SPDX-License-Identifier: Apache-2.0 -->
# Nhật ký bàn giao local — 2026-11-11

Không commit/push/PR/Issue mutation/deploy. P 832c75fc3164cf170eed3bb8f1e380d24dd65aba chỉ đọc; website HEAD fbbc6d9a0490b14dcbed7bcc62b1f2873d7f3838. Snapshot working tree trước sửa ở .local/delivery-baseline (không commit). Giữ index staged sẵn, không stage thêm.

## #7 — foundation

Giữ S0–S12, M01–M25, bốn chip và giao diện/CSS/allowlist đã có. Lưu yêu cầu gốc docs/source-issues. Kiểm thử nền tảng thực chạy PASS trước #8; tám bài HOLD nguyên byte. Survey và quyền chưa rõ tiếp tục HOLD.

## #8 — team

about.html, config.js, team.js, pages.css, M26, review #8. Không có dữ liệu cá nhân HOLD trong config ship; chỉ TRICORE/TC. Cá nhân/affiliation pending consent.

## #6 — roadmap

roadmap.html, hunks S7/S10 index.html, M27–M30, review #6. Bốn mốc đồng bộ, không cam kết ngày, source/runbook khác runtime acceptance.

## #5 — architecture

technology.html, dxos-architecture.svg, tokens.css, S5 link, M31–M33, review #5. Hai service/SeaweedFS khác source monolith/MinIO giữ PENDING. Workflow adapter chưa đăng ký nên Not yet.

## #4 — OpenAPI

openapi.mjs, tests parser, fixture TEST + license, OPENAPI_SOURCE, README cập nhật. Không tạo api-docs.json giả; official export BLOCKED.

## #9 — reference

docs/index.html, render-api.mjs, api-reference.mjs, mock-engine.mjs, mock.test.mjs, M34–M35 và review #9. TEST build riêng; default BLOCKED.

## #10 — QA/SEO/preparation

Build/allowlist/manifest, links checker, external checker, browser QA, SEO/social, sitemap/robots, CI chỉ kiểm thử, deploy template inactive và báo cáo. PowerShell stdin từng làm mất dấu trong file mới; đã tái tạo bằng script UTF-8 và thêm encoding regression check trước bàn giao. Không sửa articles hoặc source sản phẩm.

File dùng chung: MARKETING_GUIDE, index, README, builder và CSS cần tách hunk theo Issue; xem ISSUE_DELIVERY_REPORT. Thứ tự #7 → #8 → #6 → #5 → #4 → #9 → #10; không gộp mọi thứ vào một PR.
