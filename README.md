# opentrix — website giới thiệu DX-OS Open-Core

Website tĩnh của TriCore, tích hợp Landing Hero 2 và Documentation R10. opentrix là thương hiệu website; DX-OS Open-Core là nền tảng và tên repository mã nguồn.

Các đường dẫn chính trên GitHub Pages: `/trakzor-site/`, `/trakzor-site/docs/`, `/trakzor-site/blog/`, `/trakzor-site/docs/api/`. Tất cả URL `.html` cũ vẫn được giữ. Blog giữ tìm kiếm, bộ lọc và 8 bài viết hiện có.

API Reference giới hạn ở 9 route Helpdesk Backend đã đọc từ controller, service, security và error handlers tại `0e789cffa11447f3acef25d0e582bf25ed46c7b4`. Manifest nguồn nằm ở `docs/api/source-manifest.json`; đây không phải OpenAPI hoặc bằng chứng chạy API/LIVE. Giữ LIVE BLOCKED.

## Xem trước local

Yêu cầu Node.js 18 trở lên; website không cần build hoặc cài dependency.

```powershell
Set-Location 'D:\olp\trakzor-site'
node scripts/preview.mjs
```

Mở http://localhost:4173/trakzor-site/ (mô phỏng project path GitHub Pages) hoặc http://localhost:4173/. Dừng bằng Ctrl+C.

## Kiểm tra liên kết

```powershell
node scripts/check-links.mjs
node scripts/check-links.mjs --external
```

Kiểm tra tất cả trang HTML, asset nội bộ, anchor, tiêu đề và metadata thương hiệu. Tuỳ chọn --external gửi HEAD tới các liên kết công khai; có thể bị dịch vụ ngoài giới hạn truy cập.

Header, footer, metadata và theme được sinh thành HTML tĩnh từ `scripts/site-shell.mjs`. Khi sửa shell, chạy `node scripts/sync-shell.mjs`, rồi kiểm tra link và JavaScript. Website không cần JavaScript để đọc trang hoặc dùng menu chính. Documentation có tìm kiếm, phím `/`, Escape, sao chép code và vùng cuộn chỉ vào Tab khi cần.

R10 dùng các token thiết kế trong `assets/tokens.css`, style Landing trong `assets/landing.css` và style Documentation trong `docs/docs.css`. Shell và điều chỉnh tích hợp nằm trong `assets/unified.css` / `assets/unified.js`. Font Be Vietnam Pro được tự phục vụ từ asset sẵn có; giữ `assets/FONT-LICENSE.txt`, không tải Google Fonts.

Repo không có cấu hình lint. Các file JavaScript có thể kiểm tra bằng `node --check <file>`. Không coi kết quả kiểm tra website là nghiệm thu DX-OS, API, thiết bị thật hoặc trình đọc màn hình.

## Cấu trúc và xuất bản

Giữ nguyên các trang .html, thư mục articles/, solutions/, assets/ và .nojekyll. Dùng đường dẫn tương đối để phục vụ tại /trakzor-site/ trên GitHub Pages. Chạy trực tiếp từ thư mục gốc, không cần framework hoặc rewrite.

Metadata chia sẻ dùng ảnh assets/share.png và URL dự kiến https://lexuanbao258-collab.github.io/trakzor-site/assets/share.png. Nếu đổi host hoặc tên repository, cập nhật og:image và twitter:image trên các trang. Nền tảng và các URL GitHub vẫn giữ tên dxos-open-core.

Thay đổi tích hợp nằm trên nhánh local `feature/trakzor-unified-site`, chưa commit, push hoặc deploy. Một số trang R10 giữ `noindex,nofollow` trong giai đoạn chờ duyệt; chủ repo cần duyệt nội dung/trạng thái và quyết định chính sách index trước khi xuất bản. Không merge main hoặc deploy công khai khi chưa được duyệt.

Nguồn nội dung ban đầu: bản TRAKZOR_DEPLOY_READY_20261031.zip đã rà soát, loại bỏ số liệu khảo sát chưa xác minh. Các mốc trạng thái nền tảng trong website được giữ theo ngày đối chiếu 29/10/2026.
