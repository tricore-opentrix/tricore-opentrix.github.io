<!-- SPDX-License-Identifier: Apache-2.0 -->
# #5 — Architecture review

Đọc nguyên văn [#5](../source-issues/issue-5.md), README, system architecture, core/application boundary và deployment topology tại P. Đề VFOSSA §2–3 yêu cầu headless và giao diện H-P-D-I; SeaweedFS, Node-RED, hai service là lựa chọn của Issue, không suy thành mọi công nghệ bắt buộc của đề.

SVG mới assets/dxos-architecture.svg có title/desc, viewBox 360px; page nhúng để kế thừa tokens.css. Không chép hình VFOSSA/OpenVie hoặc icon cũ. Mọi component có chip. H/P và Helpdesk nét liền chỉ source/demo. WorkflowController cố ý không đăng ký Spring component, production registration blocked theo JavaDoc: Workflow API dùng Not yet/nét đứt, không quảng cáo route đã mở.

Nguồn bản vẽ: tạo mới bằng mã trong phiên chỉnh sửa local này theo yêu cầu người dùng; không gán tác giả cá nhân chưa xác nhận. Người ký xác nhận tác giả/quyền cấp phép: PENDING Yến/Bảo. Không tái sử dụng sơ đồ cũ quyền UNKNOWN. SPDX cho bản vẽ là đề xuất phạm vi original work, không thay clearance.

Bảo xác nhận hai service/APISIX hay monolith, cung cấp SHA/runtime/tests; phạm vi H/P/Workflow API. Yến xác nhận SeaweedFS/MinIO và quyền hình. Match-current-runtime, diagram authorship sign-off và final brief acceptance BLOCKED; visual QA riêng tại báo cáo.
