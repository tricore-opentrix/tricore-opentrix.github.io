<!-- SPDX-License-Identifier: Apache-2.0 -->

# #4 — OpenAPI source: BLOCKED official export

Đọc [Issue #4](../source-issues/issue-4.md) ngày 2026-11-11.
P = `832c75fc3164cf170eed3bb8f1e380d24dd65aba`.
Cây file GitHub tại P không có `api-docs.json` hay file tên openapi; đây là kết luận
theo tên file trong cây P, không chứng minh không tồn tại export ngoài repository.
`backend/build.gradle` không khai báo springdoc; `application.yml` không cấu hình Swagger.
[R31 crosswalk](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/docs/verification/r31/r31-helpdesk-api-crosswalk.md)
nói rõ chưa export OpenAPI; #79/#45 đóng chưa merge, #61 còn Draft theo bản ghi R31.
Không lấy schema của PR lịch sử hoặc tự chuyển controller thành spec chính thức.

## Phần đã triển khai local

`scripts/openapi.mjs`: parser JSON OpenAPI 3.0.x/3.1.x, nhóm tag, stable slug kèm hash,
merge parameters với override operation, giữ request/response/security và components schemas.
Chỉ chấp nhận local JSON `$ref`; refs thiếu/ngoài file bị từ chối, schema đệ quy giữ nguyên.
Không fetch spec hoặc gọi backend. Đây là reader có kiểm tra cấu trúc tối thiểu, chưa phải
validator toàn bộ OAS/JSON Schema. Nguồn quy cách:
[OAS 3.1](https://spec.openapis.org/oas/v3.1.0.html),
[OAS 3.0](https://spec.openapis.org/oas/v3.0.3.html).

Fixture `tests/fixtures/test-openapi.json` chỉ có `/test/*`, tiêu đề và extension TEST.
Không phải schema Helpdesk và không có trong build publish mặc định. File `.license`
đi kèm giữ JSON hợp lệ; không chèn comment vào JSON. Default docs chỉ thông báo BLOCKED.

## Updating API docs

1. Yến/Bảo cung cấp export runtime **của cả core-service và helpdesk-service** từ
   `/v3/api-docs`, product SHA, ngày/lệnh/môi trường export, hash từng file và log đã làm sạch.
   Không bật Swagger hay thay đổi sản phẩm trong website task. Nếu sản phẩm vẫn monolith,
   reviewer cần xác nhận thay đổi yêu cầu hai service trên #4/#5 trước khi cập nhật gate.
2. Reviewer sản phẩm đối chiếu chính xác method/path, route flags, principal/authorization,
   parameters, request/response schemas, null/optional, status/errors, giới hạn runtime.
   Dùng R31 làm checklist, không dùng assertions thay kết quả test. Cung cấp evidence URL.
3. Chủ sản phẩm cung cấp một bundle JSON chính thức có local refs, giữ provenance của hai export.
   Việc bundle/đổi tên components để tránh trùng phải do reviewer duyệt, không suy schema.
4. Đặt bundle ở root `api-docs.json`. Thêm `api-docs.provenance.json` với các khóa:
   `sha256` (hash bundle), `productCommit` (40 hex), `runtimeCompared: true`, `approvedBy`,
   `approvalUrl` (permalink review GitHub chính thức), `exports` gồm mỗi service với
   `service`, `sourcePath: "/v3/api-docs"`, `exportedAt`, `sha256`, `comparisonEvidence`.
   Đây là attestation do reviewer chịu trách nhiệm; parser kiểm tra dữ liệu không tự chứng minh runtime.
5. Chạy `node --test tests/*.test.mjs`, `node scripts/build-site.mjs`, `node scripts/check-links.mjs`,
   `node scripts/check-site.mjs`, browser QA. Thay JSON rồi rebuild cập nhật docs mà không sửa HTML.
   Spec/metadata thiếu hoặc sai thì build từ chối; không lùi về schema giả.

Không tạo file `api-docs.json` placeholder. Hai file trên chưa được cung cấp nên official API
acceptance **BLOCKED**. Yến xác nhận quyền phân phối schema/terms; Bảo xác nhận route/runtime.
Không thêm yêu cầu đổi code sản phẩm hoặc PR vào phạm vi được phép.

## Legacy

Không có hand-written API HTML cũ dưới `docs/` trong website HEAD; `docs/` hiện là hồ sơ
review local. Không xóa evidence/history để đáp ứng yêu cầu gỡ trang API cũ.
Các link repo cũ ở trang HOLD vẫn phục vụ truy vết và không được publish. Active artifact
chỉ dùng repository chính thức; kiểm tra #10 áp dụng trên allowlist, không sửa cơ học PR cũ.
