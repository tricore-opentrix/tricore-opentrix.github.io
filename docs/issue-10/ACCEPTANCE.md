<!-- SPDX-License-Identifier: Apache-2.0 -->

# #10 — Local acceptance and deployment boundary

[Issue #10](../source-issues/issue-10.md) yêu cầu kiểm tra cuối sau #4–#9 và approvals
Yến/Bảo. Phiên này chỉ chuẩn bị local, không giả định các Issue đã merge.

Workflow `.github/workflows/website-qa.yml` chỉ test PR/manual, permissions contents:read,
actions ghim SHA đã đối chiếu `action.yml` chính chủ. Không job deploy hoặc Issue comment.
`tools/qa/package-lock.json` ghim công cụ dev; npm ci offline đã thực chạy local.
Workflow GitHub thực tế chưa chạy: PENDING, không có PR HEAD mới vì không commit.
Template Pages ở `pages-workflow.yml.example` không hoạt động và cố ý dừng ở release gate.
Không thay Pages legacy/main-root từ xa. Chỉ build artifact allowlist, không upload repo root.

Sitemap chỉ 5 URL dự kiến, không ngày lastmod bịa hoặc blog/HOLD. 404 noindex.
Từng trang có title/description/OG/canonical; social PNG 1200×630 tạo từ chữ gốc bằng
`render-social.mjs`, không logo/font/image chưa duyệt. Facebook/Zalo scraper preview
PENDING sau khi người dùng tự triển khai bản được duyệt.

Đã kiểm local: keyboard skip/main, theme/menu/Escape, 390/1440 light/dark trên home,
team, roadmap, architecture, docs, 404; no-JS đọc nội dung; SVG label bounds; screenshots.
Playground TEST: offline, seed, copy/fallback/download. Không coi đó là full WCAG audit,
screen-reader certification hoặc API runtime acceptance.

Ràng buộc phát hành: approval nội dung/quyền, architecture reconciliation, source API chính
thức, CI đúng HEAD, public HOLD URL 404/410, acceptance của Yến và Bảo. Product Homepage
field/README link không sửa vì product repository chỉ đọc; người dùng/maintainer xử lý sau.

Xem `ISSUE_DELIVERY_REPORT.md` ở root cho kết quả lệnh thực chạy và file tách từng PR.
