<!-- SPDX-License-Identifier: Apache-2.0 -->

# OpenTrix — Website v1

Website tĩnh của TRICORE. Nhánh làm việc Issue #7: `docs/marketing-guide-landing`.
Nội dung chuẩn: [MARKETING_GUIDE](MARKETING_GUIDE.md), gồm S0–S12, M01–M25 và bốn status chip.
Sản phẩm: [tricore-opentrix/opentrix](https://github.com/tricore-opentrix/opentrix).

**BLOCKED phát hành:** Pages hiện tại phục vụ từ `main /`; kiểm tra 2026-11-11 cho thấy
tám bài HOLD vẫn truy cập trực tiếp được. Không dùng root repository làm document root.
Source các trang legacy/blog được giữ nguyên để review; không nằm trong Website v1.

## Build và kiểm tra local

Yêu cầu Node.js 22+; không có framework/build dependency cho bộ xuất bản:

```powershell
node scripts/build-site.mjs
node scripts/check-site.mjs
node scripts/serve-site.mjs
```

Build tạo thư mục mới `.local/website-v1-*`, không xóa/ghi đè artifact cũ.
Preview bind `127.0.0.1:4177`, chỉ phục vụ artifact trong `.local`, không phục vụ source.
`Ctrl+C` kết thúc preview. `robots.txt` chỉ hướng dẫn crawler, không phải kiểm soát truy cập.

Kiểm thử HTML/trình duyệt tùy chọn, công cụ chỉ cài vào thư mục bị ignore:

```powershell
npm.cmd install --prefix .local/tools --cache .local/npm-cache --no-save playwright@1.65.0 html-validate@11.21.0
.local/tools/node_modules/.bin/html-validate.cmd index.html 404.html
node .local/tools/node_modules/playwright/cli.js install chromium
node scripts/test-browser.mjs
git diff --check
```

Có thể đặt `PLAYWRIGHT_CHROMIUM_EXECUTABLE` tới Chromium sẵn có thay vì tải browser;
ghi phiên bản/đường dẫn thực chạy trong hồ sơ kiểm thử. Test tự mở/đóng server loopback riêng.
Không dùng server root để test HOLD. Công cụ kiểm tra deploy chỉ gửi GET:

```powershell
node scripts/check-deployed.mjs https://tricore-opentrix.github.io/
```

Lệnh này thất bại nếu còn URL HOLD trả nội dung hoặc HTTP khác 404/410; lỗi truy cập là BLOCKED.
Không có lệnh nào ở trên deploy website.

## Hồ sơ Issue #7

- [VALIDATION](docs/issue-7/VALIDATION.md): kết quả thực chạy, PASS/FAIL/BLOCKED và giới hạn.
- [POF](docs/issue-7/POF.md): sáu tiêu chí OLP 2026, bằng chứng sản phẩm và việc bàn giao; không tự chấm đạt 50/50.
- [RIGHTS](docs/issue-7/RIGHTS.md): giấy phép đúng phạm vi, assets còn chờ và kiểm tra sản phẩm chỉ đọc.
- [PUBLISHING](docs/issue-7/PUBLISHING.md): allowlist và điều kiện chuyển đường publish, chỉ để người dùng/reviewer thực hiện sau này.
- [PR_DRAFT](docs/issue-7/PR_DRAFT.md): đề xuất commit/PR và lệnh upload thủ công. Phiên này không commit/push/tạo PR.

Nội dung gốc được chủ dự án xác nhận cấp phép theo [Apache-2.0](LICENSE), với phạm vi
và ngoại lệ trong [NOTICE](NOTICE). Font, tài sản bên thứ ba và nội dung chưa rõ quyền
không được tự gán giấy phép đó. Không công bố tên/vai trò/ảnh thành viên chưa được Yến duyệt.
