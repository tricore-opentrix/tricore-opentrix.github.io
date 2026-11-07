# opentrix · TRICORE

## Tạm hoãn thu thập phản hồi khảo sát

Việc thu thập phản hồi qua khảo sát đang tạm dừng. Trang `/survey.html` chỉ giới thiệu mục đích nghiên cứu về cách tiếp nhận, phân công và theo dõi yêu cầu nội bộ; website không phải ứng dụng IT Helpdesk vận hành. Giữ liên kết nội bộ đến trang thông tin, không thêm CTA, iframe, form action hoặc chuyển hướng đến biểu mẫu ngoài chưa được duyệt.

Chỉ mở lại thu thập sau khi được phê duyệt: đơn vị/người vận hành khảo sát; thiết lập thực tế của biểu mẫu (đăng nhập, thu email, trường bắt buộc, tải file); mục đích và đối tượng; các loại dữ liệu; trách nhiệm truy cập câu trả lời; thời hạn lưu và phương án xóa; kênh liên hệ công khai; cùng nội dung công bố cách xử lý dữ liệu. Các điều kiện này chưa được xác nhận là đã đáp ứng. Không suy diễn hoặc tự bổ sung chính sách thay cho phê duyệt.

Chạy `node scripts/check-survey-publication.mjs` trước khi đề xuất merge. Guard chỉ đọc, không dùng mạng, chặn biểu mẫu chưa duyệt và binding khảo sát ngoài; không chặn liên kết nội bộ `survey.html`. Việc mở lại phải qua review riêng, cập nhật guard và nội dung công khai theo phê duyệt. Không công bố số liệu hoặc kết quả nghiên cứu chưa được xác minh.

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

## Chính sách publication-HOLD

Tám bài blog tại baseline bảo tồn `2bc9824` đang HOLD / NOT CLEARED và không được phân phối công khai. Trang `/blog/` là canonical; `/blog.html` tiếp tục truy cập được. Không chép nội dung HOLD vào file công khai, nhánh, archive hoặc thư mục export. Không phục hồi từ lịch sử Git chỉ vì nội dung vẫn tồn tại ở baseline.

Chỉ phục hồi từng bài sau khi có phê duyệt quyền xuất bản rõ ràng cho chính bài đó, xác minh quyền tác giả/quyền sử dụng và phạm vi cấp phép, hoàn tất review nội dung và được người có thẩm quyền duyệt. Khi đó cập nhật danh sách HOLD và fingerprint tương ứng qua PR riêng, rồi mới khôi phục file, metadata, liên kết và sitemap cho bài đã được duyệt; các bài còn lại tiếp tục HOLD. Không suy diễn rằng phê duyệt một bài áp dụng cho các bài khác.

Chạy `node scripts/check-publication-hold.mjs` cùng kiểm tra liên kết trước khi đề xuất merge. Guard chỉ đọc, kiểm tra cây hiện tại (kể cả export/handoff), chặn tám đường dẫn/slug và bản sao tiêu đề, trích đoạn qua fingerprint một chiều của metadata công khai cũ; không chứa nội dung bài hoặc manifest bảo tồn riêng tư. Guard không thay thế review quyền và không nhận diện được mọi bản viết lại, ảnh chụp hay dữ liệu mã hóa. Generator chỉ đồng bộ các HTML hiện có, không có nguồn tái tạo bài HOLD.
