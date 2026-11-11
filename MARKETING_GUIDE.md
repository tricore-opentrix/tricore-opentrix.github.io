<!-- SPDX-License-Identifier: Apache-2.0 -->

# OpenTrix — Marketing Guide

Issue: [website #7](https://github.com/tricore-opentrix/tricore-opentrix.github.io/issues/7).
Phạm vi: Website v1; đây là nguồn nội dung chuẩn cho landing. Ngày đối chiếu: 2026-11-11.
Trạng thái: **local draft; BLOCKED phát hành**. Không chứng minh nghiệm thu LIVE hay đạt toàn bộ tiêu chí OLP PMNM.

## Nguồn và loại bằng chứng

Sản phẩm được đọc tại commit **832c75fc3164cf170eed3bb8f1e380d24dd65aba** (P).
README ở P tự mô tả baseline v0.1.0 candidate `4428346`; không gộp hai mốc.
Không mang số liệu test lịch sử sang landing như số liệu hiện tại.

- [P/README](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md): mục tiêu, thiết kế, phạm vi source và giới hạn.
- [P/docs](https://github.com/tricore-opentrix/opentrix/tree/832c75fc3164cf170eed3bb8f1e380d24dd65aba/docs): tài liệu, không phải bằng chứng runtime.
- [PR #103](https://github.com/tricore-opentrix/opentrix/pull/103): đã merged, squash `44283466f1747d55ed39e782d0600e8d09a28427`; không thay nghiệm thu R12.
- [#38](https://github.com/tricore-opentrix/opentrix/issues/38) đã đóng phần triển khai compliance; [#138](https://github.com/tricore-opentrix/opentrix/issues/138) vẫn mở về quyền và nguồn gốc. Không suy ra legal clearance.
- Checklist người dùng trong phiên Issue #7: tên OpenTrix; website có chủ trương Apache-2.0 và quyền cấp phép nội dung gốc; thành viên chưa duyệt; quyền ảnh/nội dung chưa rõ; không có bằng chứng LIVE mới; chủ trương khảo sát đã duyệt nhưng URL/phạm vi dữ liệu cần kiểm tra. Đây là xác nhận phiên, **chưa có permalink approval độc lập**; reviewer cần ghi nhận lại trước phát hành. Không gán tên/ngày xác nhận cũ thiếu bằng chứng.

| Loại | Ý nghĩa | Giới hạn |
| --- | --- | --- |
| implementation | Mã cụ thể hoặc test/log gắn commit | Source tồn tại không chứng minh đã chạy thành công trong phiên này |
| design | README, contract hoặc sơ đồ trách nhiệm | Không chứng minh triển khai |
| pending | Thiếu kết quả hoặc phê duyệt | Chỉ công bố giới hạn đã có nguồn |
| HOLD | Nội dung/quyền/riêng tư chưa duyệt | Không đưa vào artifact Website v1 |
| policy | Quy tắc #7 và checklist xác nhận | Không phải tính năng sản phẩm |

Mọi claim kỹ thuật PASS/Available cần M-code, SHA, file/test, môi trường, lệnh, kết quả,
ngày, người xác nhận và giới hạn. Đối chiếu tài liệu không thay kiểm thử runtime.
Phiên này kiểm thử website, không chạy lại test sản phẩm.

## Quy tắc xuất bản

- Mỗi câu mang thông tin, heading có hàm ý chức năng, CTA, caption và SEO metadata phải có `data-claim="Mxx"`; phần tử con có thể kế thừa từ khối nhỏ gần nhất. Mã S không thay M. Điều hướng trung tính chỉ cần đúng đích.
- Sửa ma trận trước khi đổi câu. Nguồn sâu, loại bằng chứng, giới hạn và quyết định phải đi cùng claim. Không dùng Issue kế hoạch làm bằng chứng hoàn thành.
- Không công bố số liệu khảo sát/lời phỏng vấn nếu thiếu nguồn, quyền và approval cho nội dung cụ thể. Duyệt biểu mẫu không đồng nghĩa duyệt kết quả.
- Demo/screenshot tổng hợp luôn có nhãn **MOCK** ngay tại hình và caption; không gọi là LIVE. Không dùng dữ liệu cá nhân, mật khẩu/token thật.
- Chỉ đưa link ngoài đã kiểm tra đích, truy cập và sự phù hợp. HTTP 200 chưa chứng minh quyền công bố hay thu thập dữ liệu. Không tự gửi biểu mẫu khảo sát.
- Không xuất bản ảnh/SVG/icon/font không rõ nguồn gốc/quyền. Không sao chép câu chữ/hình OpenVie: chỉ tham khảo cách tổ chức; kiểm tra giấy phép nếu tái sử dụng.
- Chỉ nêu TRICORE. Tên, vai trò, tiểu sử, ảnh và tài khoản cá nhân giữ HOLD đến khi Yến duyệt đúng nội dung. Không suy diễn bảo trợ của trường.
- Không hứa lịch phát hành, an toàn tuyệt đối, production readiness, điểm OLP hay tuân thủ toàn bộ khi thiếu hồ sơ tương ứng.
- Bảo toàn PR lịch sử. Điều hướng repo dùng `tricore-opentrix/opentrix`; link PR cũ ở trang HOLD giữ nguyên, không thay cơ học. Nếu dùng lại phải xác minh từng PR và ghi lý do.
- PENDING/HOLD là trạng thái review, không dùng như quảng cáo. Bốn chip dưới đây độc lập với loại bằng chứng.

## Bốn status chip

| Chuỗi chính xác | Ý nghĩa | Điều kiện |
| --- | --- | --- |
| Available | Có mã và bằng chứng kiểm chứng đúng phạm vi nêu | Nêu source/demo/local nào, không tự suy thành LIVE |
| Optional — off by default | Tùy chọn, mặc định tắt | Cần nguồn mặc định/cách bật; v1 chỉ hiển thị ở glossary, chưa gán cho tính năng cụ thể |
| Self-configured | Người triển khai tự cấp/cấu hình phụ thuộc | Nêu prerequisite và dịch vụ/secret tự cấp; không ngụ ý đã chạy thành công |
| Not yet | Chưa có hoặc thiếu bằng chứng hoàn thành | Nêu thiếu implementation hay acceptance; không hứa lịch |

MOCK là nhãn dữ liệu/demo, **không phải chip thứ năm**. Local là môi trường;
integration-local là chế độ build. LIVE cần bằng chứng runtime, không đồng nghĩa build thành công.

## Khung S0–S12

Issue #7 yêu cầu S0–S12 nhưng không ấn định tiêu đề từng S; ánh xạ dưới đây là lựa chọn
biên tập của draft, chờ Yến hoặc Bảo review. ID trang khớp `s0`–`s12`.

| Khối | Nội dung / đích | M-code |
| --- | --- | --- |
| S0 | Header OpenTrix, anchor nội bộ, repo chính | M01, M02 |
| S1 | Hero DX-OS Open-Core, preview MOCK, metadata | M01, M03, M12–M14 |
| S2 | Yêu cầu dịch vụ phân tán; không thống kê khảo sát | M04 |
| S3 | Core mechanism / application business rules | M05 |
| S4 | Identity, Gateway, Workflow, Data và giới hạn | M05–M08 |
| S5 | Modular monolith, sơ đồ trách nhiệm bằng chữ | M05, M09, M10 |
| S6 | MOCK Available ở mức source/demo; local Self-configured; LIVE Not yet | M11–M13, M15 |
| S7 | Luồng đích đến CONFIRMED, chưa browser acceptance | M14 |
| S8 | README/CONTRIBUTING; không dựng API Reference chưa nghiệm thu | M15, M16 |
| S9 | LICENSE/NOTICE, SECURITY, quyền còn chờ; không tự nhận toàn bộ OLP | M17–M19, M24 |
| S10 | Giới hạn hiện tại, bốn chip, không cam kết lịch | M20, M21 |
| S11 | Chỉ TRICORE, chi tiết thành viên HOLD | M22 |
| S12 | Footer, nguồn cố định, license/anchor, không blog/khảo sát chưa duyệt đích | M01–M03, M12, M13, M15, M16, M24, M25 |

## Claim matrix

Mỗi hàng bao phủ nhóm câu tương ứng trong `data-claim`. Nguồn P là permalink đã đọc.
`publish limited` chỉ cho phép câu giới hạn dưới đây, không cho claim thành tích mạnh hơn.

| M-code | Nội dung được phép | Nguồn cụ thể | Loại / quyết định / giới hạn |
| --- | --- | --- | --- |
| M01 | OpenTrix, DX-OS Open-Core của TRICORE | [P mở đầu](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md) + checklist phiên | design + tên xác nhận; publish |
| M02 | Repo sản phẩm tricore-opentrix/opentrix | [repo đã đọc](https://github.com/tricore-opentrix/opentrix) | implementation về đích repository; publish |
| M03 | Nền tảng thử nghiệm cơ chế chung cho ứng dụng dịch vụ nội bộ, DX-OS là khái niệm chuyển đổi số | [P mở đầu](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md) | design; không phải OS máy tính; publish |
| M04 | Kênh phân tán, cần ownership, tiến độ, lịch sử | [P Overview](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#overview) | design/bối cảnh, không khảo sát; publish limited |
| M05 | Core cơ chế, ứng dụng quy tắc; bốn năng lực, tái sử dụng Facility còn cần nghiệm thu | [P Why DX-OS](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#why-dx-os) | design; publish limited |
| M06 | Identity/OIDC, Gateway boundary; ba danh tính/browser và APISIX runtime chưa nghiệm thu | [P Capabilities](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#core-capabilities) | design + README source status; pending runtime; publish limited |
| M07 | Workflow definition/instance/transition/version/history, state machine nội bộ | [P Capabilities](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#core-capabilities) | design + source status; không tự nhận test lại; publish limited |
| M08 | PostgreSQL 17 Helpdesk/Workflow, MinIO chưa hoàn thành v0.1.0 | [P Capabilities](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#core-capabilities) | README source/test report, không chạy lại; publish limited |
| M09 | Java 21, Spring Boot 3.5.16, modular monolith | [P Architecture](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#architecture-overview) | design/stack baseline; publish |
| M10 | Sơ đồ Client → Gateway → Application → Workflow → Data → PostgreSQL, Identity contracts | [P Architecture](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#architecture-overview) | design, không runtime; publish limited; sơ đồ mới website #5 còn pending |
| M11 | README ghi chín HTTP route Helpdesk; không suy thành LIVE | [P Status](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#implementation-status) | README report baseline 4428346, không test phiên này; publish limited |
| M12 | MOCK mặc định, in-memory, reload đặt lại; preview minh họa | [P Option A](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#option-a--mock-portal-quick-ui-demonstration), [MockRequestService](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/frontend/src/services/MockRequestService.ts) | implementation + runbook; Available chỉ source/demo đã mô tả, website không chạy Portal; publish limited |
| M13 | Local/integration-local tự cấu hình stack, build không start server, R12/browser acceptance còn thiếu | [P Option C](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#option-c--integration-local-portal-configured-local-stack), [limitations](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#known-limitations) | design/runbook + pending acceptance; Self-configured/LIVE Not yet; publish limited |
| M14 | Tạo → rà soát → phân công → xử lý → giải quyết → xác nhận CONFIRMED | [P Demonstration](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#demonstration-and-reuse) | design/đích, không /close route ở workflow này; publish limited |
| M15 | Có tài liệu build/test/demo với prerequisite riêng | [P Getting Started](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#getting-started), [Run](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#run-v010) | implementation về tài liệu, không đảm bảo mọi máy; publish |
| M16 | Có CONTRIBUTING công khai | [P CONTRIBUTING](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/CONTRIBUTING.md) | implementation về văn bản; publish |
| M17 | Apache-2.0 chỉ cho nội dung gốc thuộc LICENSE sản phẩm | [P LICENSE](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/LICENSE), [NOTICE](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/NOTICE) | policy/license text, không toàn bộ quyền; publish limited |
| M18 | Chính sách báo lỗ hổng riêng tư, không đăng chi tiết công khai | [P SECURITY](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/SECURITY.md) | policy, không chứng nhận an toàn; publish |
| M19 | Quyền/provenance còn chờ, chưa kết luận toàn bộ compliance/OLP | [#138](https://github.com/tricore-opentrix/opentrix/issues/138), [P License](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#license-and-third-party-notices) | pending, issue động đọc 2026-11-11; publish giới hạn, không chấm OLP |
| M20 | Facility E2E, APISIX, MinIO, production chưa là v0.1.0 hoàn thành | [P limitations](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#known-limitations) | pending; publish giới hạn |
| M21 | Bốn chip, không hứa lịch chưa duyệt | [website #7](https://github.com/tricore-opentrix/tricore-opentrix.github.io/issues/7), mục Bốn status chip | policy, glossary không chứng minh tính năng; publish |
| M22 | TRICORE phát triển, chi tiết thành viên chưa duyệt cho v1 | [P mở đầu](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md) + checklist phiên | publish tên nhóm; HOLD tên/vai trò/tiểu sử/ảnh/tài khoản |
| M23 | Chủ trương khảo sát duyệt, URL/phạm vi dữ liệu cần kiểm tra | Checklist phiên, URL cũ ở source survey.html/config trước sửa | pending; **không publish CTA/link/form/kết quả** |
| M24 | Website Apache-2.0 trong phạm vi LICENSE, ngoại lệ/RIGHTS_PENDING riêng | Checklist phiên, [LICENSE](LICENSE), [NOTICE](NOTICE), [RIGHTS](docs/issue-7/RIGHTS.md) | policy; publish có giới hạn; không gán Apache cho font/logo chưa rõ |
| M25 | Nguồn sản phẩm P, đọc 11/11/2026 | [commit P](https://github.com/tricore-opentrix/opentrix/commit/832c75fc3164cf170eed3bb8f1e380d24dd65aba) + hồ sơ phiên | implementation về nguồn đã đọc; không là ngày nghiệm thu; publish |

## HOLD và xuất bản

Tám HTML trong `articles/` giữ nguyên byte và history. `blog.html`, trang legacy chưa duyệt,
SVG/font/site.js cũ và hồ sơ review không có trong allowlist `scripts/build-site.mjs`.
Không chỉ ẩn menu: artifact không được có file HOLD hoặc link dẫn tới chúng.

Cấu hình Pages đã đọc bằng `gh api repos/tricore-opentrix/tricore-opentrix.github.io/pages`:
`build_type: legacy`, `source: main /`, `status: built`. Đường này có nguy cơ gồm trực tiếp
bài HOLD; root `.nojekyll` làm exclude Jekyll không đủ. Không đổi remote trong phiên.
Chỉ phục vụ artifact allowlist sau review, không dùng root repo làm document root công khai.
Xem [PUBLISHING](docs/issue-7/PUBLISHING.md). Kiểm tra URL deploy phải có 404/410 và response
không chứa bài cũ, gồm cả alias extensionless/slash. Không kiểm chứng được thì **BLOCKED**.

## Điều kiện nghiệm thu và hồ sơ review

| Gate | Bằng chứng cần có | Nếu chưa đủ |
| --- | --- | --- |
| CONTENT | S0–S12, M-code, đúng câu nguồn, bốn chip | Sửa trước review |
| DEMO | Nhãn MOCK, tách local/integration/live, không claim R12 | Bỏ claim mạnh hơn |
| RIGHTS | Register quyền/nguồn, license/NOTICE, approval nội dung | HOLD asset, không phân phối |
| BLOG | Không trong artifact và URL deploy 404/410 | BLOCKED phát hành |
| PRIVACY | URL, mục đích, đơn vị thu thập, trường dữ liệu, lưu giữ/tiếp cận, consent được duyệt | HOLD khảo sát |
| TECHNICAL | HTML, links, JS, menu, desktop/mobile, diff check thực chạy | Ghi FAIL/BLOCKED đúng thực tế |
| OPENNESS / OLP | Source, license đúng phạm vi, commit, reviewer; rubric có nguồn | Không tự nhận toàn bộ tiêu chí đạt |
| REVIEW | Một approval Yến hoặc Bảo trên đúng nội dung/commit | Chưa merge/phát hành |

Kết quả thực chạy: [VALIDATION](docs/issue-7/VALIDATION.md). Quyền: [RIGHTS](docs/issue-7/RIGHTS.md).
Đối chiếu sáu tiêu chí theo bằng chứng: [POF](docs/issue-7/POF.md); không tự chấm điểm hoặc đưa điểm lên landing.
Release v0.1.0 ghi nhận R12 M1 nhưng vẫn thiếu real Keycloak/full LIVE browser E2E; README ở P còn wording baseline cũ. Giữ riêng phạm vi/ngày nguồn, không phủ nhận mọi checkpoint R12 hoặc tự nâng thành full acceptance.
PR local: [PR_DRAFT](docs/issue-7/PR_DRAFT.md), dùng `Refs #7` khi còn gate; chỉ đề xuất `Closes #7` sau acceptance, có reviewer, nguồn, files, tests,
HOLD và limitations. Không đóng #7 chỉ vì có draft/build/source evidence.
Không tự commit/push/tạo PR/deploy; người dùng quyết định thời điểm upload.

## Bổ sung #8 — Team

| M-code | Nội dung được phép | Nguồn cụ thể | Loại / quyết định / giới hạn |
| --- | --- | --- | --- |
| M26 | Ba tên và CMC University chỉ là dữ liệu đề nghị duyệt | [#8](https://github.com/tricore-opentrix/tricore-opentrix.github.io/issues/8), [P Team](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#team) | HOLD; config publish không chứa cá nhân/affiliation; Yến xác nhận từng trường và permalink trước khi mở. |

## Bổ sung #6 — Roadmap

Checklist: P/README Demonstration and Reuse (startup, security, workflow, data, reuse, traceability). Chưa có checklist riêng đã duyệt; Yến/Bảo xác nhận thứ tự ưu tiên.

| M-code | Nội dung được phép | Nguồn cụ thể | Loại / quyết định / giới hạn |
| --- | --- | --- | --- |
| M27 | MOCK Portal: Available. Source và hướng dẫn demo in-memory; không chứng minh backend hoặc SSO. | [P README](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#option-a--mock-portal-quick-ui-demonstration) | source/runbook; không chạy lại sản phẩm; publish limited |
| M28 | Stack integration-local: Self-configured. Tự cấp Keycloak, PostgreSQL 17, Backend, BFF và HTTPS. Build chưa chứng minh tích hợp chạy. | [P README](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#option-c--integration-local-portal-configured-local-stack) | source/runbook; không chạy lại sản phẩm; publish limited |
| M29 | Browser E2E và tái sử dụng Facility: Not yet. Checklist yêu cầu identity, quyền, workflow, dữ liệu và hai ứng dụng; chưa có nghiệm thu đầy đủ ở nguồn đối chiếu. | [P README](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#demonstration-and-reuse) | source/runbook; không chạy lại sản phẩm; publish limited |
| M30 | APISIX, object storage và production: Not yet. README chọn APISIX và MinIO, chưa nhận là năng lực hoàn thành. Không ấn định lịch phát hành. | [P README](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#known-limitations) | source/runbook; không chạy lại sản phẩm; publish limited |
