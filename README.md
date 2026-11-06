# opentrix · TRICORE

Website giới thiệu đội sinh viên **TRICORE**: thành viên, dự án, blog, cộng đồng và liên hệ. DX-OS Open-Core là dự án tiêu biểu dự thi OLP Phần mềm nguồn mở 2026; tài liệu kỹ thuật chính thức thuộc repo sản phẩm.

- Website: https://tricore-opentrix.github.io/
- GitHub đội: https://github.com/tricore-opentrix
- Mã nguồn sản phẩm: https://github.com/tricore-opentrix/opentrix

## Xem trước

Website tĩnh, không framework, không build và không cần cài dependency. Cần Node.js LTS:

```sh
node scripts/preview.mjs
```

Mở http://localhost:4173/. Dừng bằng Ctrl+C. Các trang dùng đường dẫn tương đối và được phục vụ từ gốc domain.

## Chỉnh sửa và kiểm tra

Thông tin đội, liên kết và metadata riêng từng trang nằm trong `assets/config.js`. Header, footer và metadata sinh từ `scripts/site-shell.mjs`; HTML sinh ra đọc được khi tắt JavaScript.

```sh
node scripts/sync-shell.mjs
node scripts/check-links.mjs
```

Kiểm tra cú pháp từng file bằng `node --check`. Trên Bash:

```sh
for file in assets/*.js docs/*.js scripts/*.mjs; do node --check "$file" || exit 1; done
```

Workflow `.github/workflows/site-check.yml` chạy trên Pull request và push vào main, chỉ kiểm tra, không deploy. Kiểm tra mặc định xác minh URL nội bộ, fragment, asset và metadata; `--external` kiểm tra HTTP liên kết ngoài.

## Tài liệu sản phẩm

Giữ `docs/` hoạt động đến khi nhóm merge PR chuyển tài liệu bên repo DX-OS Open-Core. Công cụ tùy chọn `python scripts/export-docs.py` (Python 3, chỉ thư viện chuẩn) xuất 8 bản Markdown vào `export/dxos-docs/` để review. `export/` bị Git bỏ qua, không có trong sitemap và không được preview phục vụ. Các bản xuất không được commit lên Pages.

## Thiết kế và khả năng truy cập

`assets/tokens.css` chứa màu, chữ và khoảng cách; `assets/landing.css` chứa component “Vết”; `assets/unified.css` và `assets/unified.js` chứa shell và tương tác dùng chung. `docs/docs.css` giữ bố cục riêng của tài liệu, dùng token chung. Font Be Vietnam Pro tự host; không CDN, Google Fonts hay tracking. Giữ `assets/FONT-LICENSE.txt`.

## Giấy phép

- Mã website: Apache-2.0, toàn văn tại `LICENSE`.
- Font: OFL-1.1, tại `assets/FONT-LICENSE.txt`.
- Nội dung bài viết: <span data-todo="Nhóm xác nhận giấy phép và quyền sử dụng nội dung bài viết">giấy phép đang được nhóm xác nhận</span>.
- Ảnh đội, chân dung và Portal chỉ được thêm sau khi nhóm xác nhận quyền công khai.

## Quy trình Pull request

Tạo nhánh từ nhánh làm việc phù hợp, sửa đúng phạm vi, đồng bộ shell và chạy kiểm tra. Dùng Conventional Commits; mở PR vào main, cần **ít nhất 1 approve** và các kiểm tra xanh trước khi merge. Không push trực tiếp main. CODEOWNERS xác định reviewer mặc định; quản trị viên cần bật branch protection trên GitHub để thực thi quy tắc 1 approve (không thể bật chỉ bằng file repo).

Các thông tin còn thiếu được đánh dấu `data-todo`. Hoàn thiện chúng và kiểm tra giao diện trước khi bật GitHub Pages.
