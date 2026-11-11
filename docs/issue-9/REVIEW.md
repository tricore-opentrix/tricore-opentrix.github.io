<!-- SPDX-License-Identifier: Apache-2.0 -->
# #9 — API Reference and MOCK

[#9](../source-issues/issue-9.md). Build từ parser #4; mỗi method/path một section, navigation theo nhiều tag, JSON parameters/request/responses/security/components, copy fallback, download phân biệt TEST/chính thức.

Default /docs/ BLOCKED, không endpoint TEST. Flag --test-api tạo artifact riêng, noindex và banner TEST. Không upload artifact TEST.

Playground offline sau tải asset; không fetch/XHR/WebSocket/sendBeacon, không nhập URL/token. Seed 7, delay 180ms, cùng seed/schema/operation cho cùng JSON. 204 có null body. Sampler hỗ trợ subset primitives/object/array/enum/const/local refs không đệ quy và một số bounds/format; unsupported trả thông báo MOCK rõ ràng. Không phải full JSON Schema validator hoặc response thật.

Official route/schema acceptance BLOCKED #4; fixture chỉ chứng minh pipeline/UI. Yến/Bảo duyệt exact spec/provenance rồi chạy lại tất cả endpoint; không cần sửa HTML.
