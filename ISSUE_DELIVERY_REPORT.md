<!-- SPDX-License-Identifier: Apache-2.0 -->

# OPENTRIX — bàn giao 7 Website Issues tại local

Ngày: **2026-11-11**, múi giờ Asia/Bangkok. Kết luận: đã thực hiện phần local có thể làm
của cả 7 Issue theo thứ tự **#7 → #8 → #6 → #5 → #4 → #9 → #10**.
**Chưa đủ điều kiện phát hành hoặc đóng toàn bộ Issue.** Không commit, push, tạo/sửa PR,
bình luận/đóng Issue, deploy hoặc đổi GitHub Pages. Repository sản phẩm chỉ đọc.

## 1. Git và phạm vi

Website: `https://github.com/tricore-opentrix/tricore-opentrix.github.io`.
Working tree: `D:\OPEN TRIX`; nhánh giữ nguyên `docs/marketing-guide-landing`;
HEAD giữ nguyên `fbbc6d9a0490b14dcbed7bcc62b1f2873d7f3838`.
Remote origin fetch/push đều đúng website repository. Không tìm thấy AGENTS.md áp dụng
ở root/cha hoặc trong cây đã kiểm (loại `.git`, `.local`, node_modules).

Trước sửa đã có `AM MARKETING_GUIDE.md` và nhiều thay đổi #7 hợp lệ. Snapshot status,
diff, staged diff và các file liên quan lưu `.local/delivery-baseline/`. Giữ nguyên index
đã stage sẵn; so byte của `git diff --cached` với snapshot PASS. Không stage thêm file.
Tám bài `articles/*.html` giữ nguyên byte so với HEAD. Không reformat toàn bộ landing
HTML; giữ cấu trúc/minified hiện có, chỉ thay hunk cần thiết. About/technology cần thay
nội dung legacy chưa duyệt, dùng lại shell/CSS; lịch sử vẫn ở Git.

Product P: `832c75fc3164cf170eed3bb8f1e380d24dd65aba`. README tự ghi baseline candidate
`4428346`; system-architecture có baseline nội bộ `e06fa429`. Không gộp các SHA đó thành
runtime hiện tại. Chi tiết blob/source: [SOURCE_EVIDENCE](docs/SOURCE_EVIDENCE.md).

## 2. Kết quả từng Issue

| Issue | Phần đã làm tại local | Kiểm chứng | Acceptance còn thiếu |
| --- | --- | --- | --- |
| **#7 Marketing** | Giữ/hoàn thiện guide S0–S12, M01–M25; bổ sung M26–M35 theo Issue; bốn chip; nhãn MOCK/local/integration/LIVE; allowlist và rights register | **PASS local**: sections, M-code mapping, status, links, JS, HOLD bytes, browser; mọi claim ở main được kiểm ancestor data-claim | **PENDING** approval đúng revision và quyền còn thiếu; không công bố số liệu khảo sát/blog |
| **#8 Team** | Trang cùng giao diện; chỉ TRICORE/initials TC. Dữ liệu được phép công bố tập trung config; members/affiliation rỗng, không nhúng dữ liệu HOLD vào JS ship; renderer dùng textContent, initials accessible | **PASS local** config/privacy/render/responsive/light-dark, không placeholder “being updated” | **BLOCKED** ba thành viên, CMC University và role/bio: Yến phải duyệt exact wording/consent. Không suy approval từ README/Issue |
| **#6 Roadmap** | Bốn mốc M27–M30 có source, chip, không cam kết ngày; cùng nội dung S10 và roadmap; S7 có Not yet cho browser E2E | **PASS local** consistency và UI | **PENDING** permalink checklist riêng/thứ tự ưu tiên của nhóm. Checklist hiện dùng bảng acceptance trong README, không tự bịa roadmap hoàn thành |
| **#5 Architecture** | SVG ba tầng mới, title/desc, tokens light/dark, trạng thái từng component, nét đứt thiếu implementation/acceptance, giới hạn H/P; Workflow API Not yet vì controller chưa đăng ký | **PASS local** cấu trúc SVG, label bounds, 390/1440 light/dark và xem ảnh | **BLOCKED** reconcile hai service/APISIX với monolith; SeaweedFS với MinIO; phạm vi H/P; sign-off tác giả/quyền bản vẽ và nghiệm thu kiến trúc theo đề |
| **#4 OpenAPI** | Tìm source ở cây P, đọc Gradle/config/R31; parser OAS 3.0/3.1, tag/slug/ref/params, provenance gate; hướng dẫn Updating API docs; TEST fixture riêng | **PASS local** parser/validation/TEST gate tests | **BLOCKED** thiếu bundle api-docs.json chính thức, hai export runtime và provenance/approval. Không tạo schema giả hoặc lấy PR Swagger chưa merge làm API thật |
| **#9 API Reference** | /docs/ mặc định BLOCKED; pipeline render đầy đủ model; JSON parameters/request/responses/security/schema, copy/fallback/download; TEST artifact riêng; sampler seeded/delay/offline MOCK | **PASS local TEST** 3 operations fixture, seed lặp/đổi, download byte-match, copy/fallback, 0 request từ MOCK, 390px/light-dark | **BLOCKED #4** coverage API sản phẩm và JSON download chính thức. Sampler chỉ subset JSON Schema, unsupported báo rõ; không có claim API phát hành |
| **#10 QA/SEO/preparation** | Internal/external/hygiene/browser scripts, test-only CI, lockfile QA, sitemap/robots/canonical/OG PNG, inactive deploy template, báo cáo và file map | **PASS local** các lệnh ở mục 4 | **FAIL gate public HOLD hiện tại**; **PENDING** CI PR HEAD, URL bản mới, Facebook/Zalo preview và Yến/Bảo acceptance. Không sửa Homepage/README sản phẩm |

Yêu cầu gốc được lưu nguyên văn cùng tác giả và thời điểm upstream trong
`docs/source-issues/issue-{7,8,6,5,4,9,10}.md`. Đây là snapshot yêu cầu, không phải approval.

## 3. Những file đã chỉnh sửa và phạm vi từng PR

[FILE_CHANGES](docs/FILE_CHANGES.md) liệt kê từng đường dẫn thực từ Git status, gồm sửa đổi
có sẵn và bổ sung phiên này. [CHANGELOG-LOCAL](docs/CHANGELOG-LOCAL.md) ghi từng Issue.
Không đưa `.local/`, backup, `.idea/`, node_modules, credential/token vào đề xuất commit.

| Issue / thứ tự | File hoặc hunk thuộc PR riêng |
| --- | --- |
| #7 | `.gitignore`, `LICENSE`, `NOTICE` phần foundation; `MARKETING_GUIDE.md` S0–S12/M01–M25; `index.html` skeleton #7; `assets/landing.js`, hunk #7 `assets/config.js`/`assets/style.css`; `404.html` phần foundation; `scripts/build-site.mjs`, `check-site.mjs`, `serve-site.mjs`, `test-browser.mjs`, `check-external.mjs`, `check-deployed.mjs` phiên bản foundation; `docs/issue-7/*`, snapshot #7 |
| #8 | `about.html`, `assets/team.js`, `assets/config.js` teamProfile; `assets/pages.css` phần layout chung; M26; `docs/issue-8/*`, snapshot #8 |
| #6 | `roadmap.html`, hunks S7/S10 `index.html`, M27–M30; `docs/issue-6/*`, snapshot #6 |
| #5 | `technology.html`, `assets/dxos-architecture.svg`, `assets/tokens.css`, link S5, M31–M33; `docs/issue-5/*`, snapshot #5 |
| #4 | `scripts/openapi.mjs`, `tests/openapi.test.mjs`, `tests/fixtures/test-openapi.json` và `.license`, README Updating API docs; `docs/issue-4/*`, snapshot #4; M34 phần dependency/source |
| #9 | `docs/index.html`, `scripts/render-api.mjs`, `assets/api-reference.mjs`, `assets/mock-engine.mjs`, `tests/mock.test.mjs`, `assets/pages.css` phần API, M34–M35; `docs/issue-9/*`, snapshot #9 |
| #10 | `.github/workflows/website-qa.yml`, `tools/qa/package*.json` và sidecars; `sitemap.xml`, `robots.txt`, metadata/canonical/OG trên sáu trang; `assets/og-image.png` và `.license`, `scripts/render-social.mjs`, `check-links.mjs`, `check-hygiene.mjs`, `test-full-browser.mjs`, `run-local-qa.mjs`; hunk mở rộng build/check-site/serve/external/test-browser; `docs/issue-10/*`, snapshot #10, `docs/SOURCE_EVIDENCE.md`, `docs/FILE_CHANGES.md`, nhật ký, báo cáo, README/NOTICE/rights amendment |

**File dùng chung cần tách hunk, không stage cả file vào PR trước:** guide, index, README,
NOTICE, config/CSS, builder/checker/server. Code hiện tại là trạng thái tích hợp một working
tree; bảng trên là cách tách trách nhiệm, không bảo đảm chỉ chọn tên file là đã tạo PR độc lập.
Dùng baseline local và `git diff` để tái lập các checkpoint; mỗi PR phải build/test lại sau tách.
Phần foundation đã stage sẵn khác working tree hiện tại; phải kiểm index trước commit.

## 4. Bằng chứng và kết quả test thực chạy

Node **v24.19.0**, Playwright **1.65.0**, html-validate **11.21.0**, Chrome headless
**157.0.8103.50**, executable `C:/Program Files/Google/Chrome/Application/chrome.exe`.
Đây là Chrome cài sẵn qua Playwright; chưa chứng minh mọi engine, thiết bị thật hoặc full WCAG.
Python không có trong PATH; dùng bộ Playwright Node đã có và khóa công cụ dev.

| Phép kiểm/lệnh | Kết quả thực | Evidence và giới hạn |
| --- | --- | --- |
| `git status --short --branch`, remote, HEAD, diff/cached diff | **PASS** kiểm đúng website, giữ branch/HEAD/index | baseline `.local/delivery-baseline/`; không git write |
| `npm ci --prefix tools/qa --ignore-scripts --offline --cache .local/npm-cache` | **PASS** 15 packages cài từ cache, npm báo 0 vulnerabilities trong output đó | Không thay kiểm tra toàn bộ chuỗi cung ứng; không ship dependencies |
| `node --test tests/*.test.mjs` | **PASS 7/7**, 0 fail/skip | Local parser/mock/render/escaping/recursive/ref/provenance fixture; không product tests |
| `node scripts/build-site.mjs`, `check-links.mjs`, `check-site.mjs` | **PASS LOCAL_REVIEW: 23 file, 33 M-code, 85 links** | Exact allowlist/manifest, metadata, UTF-8, S0–S12, roadmap, MOCK, syntax và tám HOLD articles byte-identical |
| TEST build + `check-site.mjs <testArtifact>` | **PASS TEST: 24 file, 33 M-code, 91 links** | 3 fixture operations; noindex/banner TEST, filename download TEST; default không chứa schema TEST |
| html-validate sáu source HTML và docs TEST được generate | **PASS**, 0 lỗi sau sửa type cho seed input | Command/exit lưu trong local-checks; không gọi đó là full accessibility audit |
| `node scripts/test-browser.mjs` | **PASS** 360/390/768/1440, theme/persistence/menu/keyboard/no-JS, 27 URL HOLD local | `.local/browser-check.json`; không request third-party hoặc lỗi browser trong phạm vi test |
| `node scripts/test-full-browser.mjs` | **PASS 26 cases** | `.local/qa/browser-check.json`; 24 screenshots trang × width/theme và 2 TEST screenshots, 5 no-JS pages, SVG bounds, offline MOCK/copy/fallback/download |
| `node scripts/check-external.mjs` | **PASS 15/15 URL** HTTP 200, fragments và repo đích | `.local/qa/external-check.json`; GET, không xác nhận bản quyền hoặc consent |
| `node scripts/check-hygiene.mjs` | **PASS** chữ ký secret phổ biến/đường dẫn/JSON/SPDX và index byte check | `.local/qa/hygiene-check.json`; scanner giới hạn, không certification không có mọi secret |
| `git diff --check` | **PASS** | Có cảnh báo LF→CRLF của Git, không lỗi whitespace; source HTML không bị bulk reformat |
| License Apache chính thức | **PASS** normalized exact match | `.local/qa/remote-evidence.json`; newline/outer whitespace chuẩn hóa, không license clearance |
| Khảo sát GET | HTTP **200**, đúng tiêu đề IT Support; **HOLD quyền/consent** | Không submit, không công bố kết quả. Web reader không truy cập được nhưng GET độc lập có kết quả |
| Product CI/run và release | **PASS metadata/hash trong phạm vi đọc** | Exact-P run 42866668592 success; archive local khớp API digest release; không chạy lại build/runtime sản phẩm |
| Public HOLD probe `check-deployed.mjs` | **FAIL**: 18/27 URL còn nội dung HOLD, 9/27 trả 404 | `.local/deployed-check.json`, 2026-11-11T14:55:58.759Z; Pages legacy main-root. Không có deployment mới trong phiên |
| GitHub CI cho thay đổi mới / preview scraper / LIVE | **PENDING/BLOCKED** | Không commit/PR/deploy nên chưa có CI HEAD mới; không suy từ local PASS |

Lệnh tổng hợp `node scripts/run-local-qa.mjs` thực chạy 11 bước, ghi command, timestamp,
exit và output trong `.local/qa/local-checks.json`. External/remote probes lưu riêng.
Ảnh local ở `.local/qa/screenshots/`: `home`, `team`, `roadmap`, `architecture`, `docs`,
`404` × `390/1440` × `light/dark`, cùng `docs-TEST-390-{light,dark}.png`.
Đã xem trực tiếp ảnh architecture mobile/light, team mobile/dark, docs TEST/mobile,
home desktop/light, docs mặc định mobile/dark và social PNG;
automation kiểm mọi kích thước/theme. Screenshot không tự là chứng nhận WCAG hoặc runtime.

Các lỗi gặp và đã sửa: browser bundled chưa cài → dùng Chrome có sẵn; PowerShell stdin
ASCII làm mất dấu trong file mới → tái tạo UTF-8 và thêm regression check; cổng 4190 bị
Fetch chặn → đổi 4188/4189; thiếu claim của heading nguồn và thiếu input type → sửa rồi
chạy lại. Sandbox chặn external GET → phép đọc đã được cấp quyền và chạy lại PASS.
Không báo những lần thất bại ban đầu thành PASS; bảng trên là kết quả chạy lại sau sửa.

## 5. Yến cần xác nhận

1. Exact public names/initials, roles/bios, affiliation CMC University và consent từng người trên #8; không coi dữ liệu công khai trong repo là phê duyệt website.
2. Câu chữ/claims S0–S12, roadmap/checklist và một approval đúng revision cho các Issue theo yêu cầu.
3. Source-origin/license scope, attribution, quyền layout cũ và bản SVG/social mới; contributor attestations theo product #138, independent reviewer; không giả ownership từ Git author.
4. Survey controller, mục đích/trường dữ liệu, lưu giữ/truy cập/consent và quyền dùng từng metric/quote; HTTP 200 chưa đủ. Blog vẫn HOLD đến khi duyệt từng bài/quyền.
5. Export API chính thức, quyền phân phối, reviewer attestation, và phối hợp Bảo resolve hai service/storage/H-P-D-I.
6. Acceptance #10 cùng Bảo sau CI/public URL/scraper checks; xác nhận rubric/đề áp dụng và mọi quy định bổ sung từ BTC nếu có.

## 6. Bảo cần xác nhận

1. Hai process core-service/helpdesk-service sau APISIX đã triển khai hay chỉ target; SHA, cấu hình/log/test an toàn để truy vết. Không sửa product trong website task.
2. SeaweedFS hay MinIO, Node-RED, Workflow API exposure và mức H/P thực tế; không quảng cáo toàn bộ H/P khi chỉ Helpdesk demo.
3. Hai `/v3/api-docs` export, bundle chính thức có refs nội bộ, hashes, product SHA, môi trường/lệnh/ngày, exact runtime comparison, approval URL theo OPENAPI_SOURCE.
4. Fresh-source build/config/run ngoài source, release immutable identity và submission timing; v0.1.0 là pre-release đã tồn tại, không đổi thành release mới.
5. Kế hoạch chuyển Pages sang allowlist sau review, kiểm 27 URL HOLD sau đó; tự xử lý Homepage/README link của product nếu muốn. Phiên này không thực hiện thay đổi remote đó.

## 7. Quyền sử dụng và tính mở

[RIGHTS](docs/issue-7/RIGHTS.md), [NOTICE](NOTICE), [LICENSE](LICENSE) giữ nguyên credit hợp lệ
và tách phạm vi original work khỏi third-party. Logo/icon SVG cũ, hai font WOFF2/quyền binary,
tám bài blog, ảnh/biography/account/email thành viên, survey metrics/quotes tiếp tục HOLD.
Không gán Apache cho tài sản bên thứ ba chưa rõ. Font license text vẫn nguyên trong source,
không ship font. Bản social là chữ gốc render PNG, không copy logo; bản SVG mới không sao
chép hình OpenVie/VFOSSA. Xác nhận quyền/tác giả bản mới vẫn cần owner review.

QA dev lock có 15 dependency entries với metadata MIT/Apache-2.0/BSD-3-Clause/ISC;
chúng không có trong artifact tĩnh. Không suy inventory thành hoàn thành nghĩa vụ redistribution.
Product THIRD-PARTY-NOTICES/REUSE là evidence về metadata, không giải quyết source-origin
hoặc R24 packaging. #138 vẫn open khi đọc lại. Không sửa migration hoặc file sản phẩm.

Origin của source mới có hỗ trợ sinh mã được ghi trung thực trong rights register theo phạm
vi review #138; không gán tên tác giả giả, watermark, quảng cáo hoặc credit công cụ trên site.
Không thấy quy tắc khai báo AI riêng trong hai trang VFOSSA thực đọc; không suy rằng mọi
quy định khác đều không tồn tại. Yến/BTC xác nhận nếu có tài liệu bổ sung áp dụng.

## 8. Maintainer review và khoảng thiếu so với PoF 50/50

**Disposition: LOCAL REVIEW READY; RELEASE HOLD.** Đây là phán quyết review kỹ thuật,
không approval độc lập, điểm thi hoặc legal clearance. Không tự cấp số điểm khi các gate quyền,
build và artifact còn thiếu. Bảng sáu tiêu chí/max và evidence: [POF](docs/issue-7/POF.md), theo
[thể lệ VFOSSA chính thức](https://vfossa.vn/tin-tuc/the-le-olp-phan-mem-nguon-mo-nam-2026-760.html).

| Mức | Thiếu hụt còn lại | Tác động |
| --- | --- | --- |
| P0 | #138/source-origin và third-party/distribution chưa clearance | Chưa đủ cơ sở kết luận điều kiện mở/cấp phép toàn bộ |
| P0 | Pages hiện công khai bài HOLD | Chưa đạt gate publish dù artifact local loại được bài |
| P1 | Topology/SeaweedFS khác source monolith/MinIO | Không đủ acceptance architecture hiện hành |
| P1 | Không có official OpenAPI export/runtime attestation | #4/#9 chỉ hoàn thiện pipeline TEST, API thật BLOCKED |
| P1 | Independent product build/run/release submission evidence thiếu | Hosted CI không chứng minh toàn bộ yêu cầu PoF build/release |
| P1 | Thành viên/affiliation/ảnh/consent và approvals thiếu | #8 chưa được phép mở thông tin cá nhân |
| P1 | CI đúng HEAD, public draft URL và approvals #10 chưa có | Chưa thể xác nhận nghiệm thu cuối |

Luồng đã thiết lập: website `data-claim` → M-code → permalink README/docs/source → SHA và
test/PR đúng phạm vi → verdict/giới hạn. Source có sẵn, source được build, integration-local
và LIVE không bị đánh đồng. **PoF 50/50: BLOCKED/PENDING đánh giá**, không có tổng điểm
tự chấm hoặc bảo đảm mức tối thiểu. Điểm review maintainer chưa quy đổi số; các phát hiện
P0/P1 phải được disposition trước phát hành.

## 9. Lệnh commit/push/PR đề xuất — KHÔNG thực thi

Thực hiện thủ công **mỗi Issue một lần trên branch chứa đúng phạm vi đã tách**, theo bảng
mục 3. Không chạy hàng loạt trên working tree tích hợp hiện tại. Không dùng `git add -A`,
`reset --hard`, `clean -fd`, force push hoặc `--author`. Giữ danh tính Git thật của người commit.
Trước tách cần xử lý có chủ ý index đã stage sẵn; các lệnh dưới không tự xử lý index đó.

| Issue | Nhánh đề xuất | Commit/PR title |
| --- | --- | --- |
| #7 | docs/marketing-guide-landing | docs(marketing): trace OpenTrix landing claims |
| #8 | feat/team-verified | feat(team): gate public team information |
| #6 | feat/roadmap-evidence | feat(roadmap): show source-scoped milestones |
| #5 | docs/dxos-three-layers | docs(architecture): distinguish target topology and runtime |
| #4 | feat/openapi-source | feat(api): validate exported OpenAPI provenance |
| #9 | feat/api-reference-mock | feat(docs): render API reference with offline MOCK |
| #10 | chore/website-qa | chore(web): prepare QA SEO and release gates |

Ví dụ **sau khi đã tách đúng branch/file/hunk và kiểm thử lại**:

```powershell
# Thay 7/branch/title bằng hàng tương ứng; không chạy nguyên mẫu cho mọi Issue.
$issueNo = 7
$branchName = 'docs/marketing-guide-landing'
$commitTitle = 'docs(marketing): trace OpenTrix landing claims'
git status --short --branch
git diff
git diff --cached
# Stage tương tác chỉ các hunk thuộc Issue; untracked dùng git add -- <từng file đã review>.
git add -p -- MARKETING_GUIDE.md index.html
git diff --cached --name-only
git diff --cached --check
# Dừng nếu staged list còn file/hunk Issue khác hoặc nội dung HOLD không được phép.
git commit -m $commitTitle
git push -u origin $branchName
gh pr create --repo tricore-opentrix/tricore-opentrix.github.io --base main --head $branchName --draft --title $commitTitle --body-file "docs/issue-$issueNo/PR_BODY.md"
```

Mỗi Issue có `docs/issue-N/PR_BODY.md` riêng, dùng Refs khi acceptance còn BLOCKED.
Chỉ đổi Closes sau đủ acceptance. #7/#8/#6/#5/#4/#9 cần một approval Yến hoặc Bảo;
#8 exact wording cần Yến; #10 cần cả hai. Không tự upload screenshot/comment Issue trong phiên.

## 10. Cách xem và điểm dừng

```powershell
node scripts/build-site.mjs
node scripts/serve-site.mjs
# Mở http://127.0.0.1:4177/; Ctrl+C kết thúc.
# Chạy QA với Chrome sẵn có:
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
node scripts/run-local-qa.mjs
```

Build mặc định ghi `.local/latest-build.txt`; TEST riêng ghi `.local/latest-test-build.txt`.
Manifest ghi LOCAL_REVIEW/TEST và releaseApproval PENDING. Không dùng root repository
hoặc TEST artifact làm document root công khai. Deploy template ngoài workflows và cố ý
fail release gate, không tự deploy. Sitemap/canonical/OG URL là cấu hình đích dự kiến,
không là xác nhận bản local đã có trên Internet.

Hash từng file source thay đổi, artifact và log được lưu local tại
`.local/qa/evidence-hashes.json` để gắn kết bản chưa commit với bằng chứng. File hash không
thay approval, chữ ký tác giả hoặc commit mới. Inventory cuối: 76 đường dẫn cần review;
không có file bị xóa, source sản phẩm không thay đổi, index đã stage từ đầu được giữ nguyên.

**Điểm dừng đã giữ: công việc local và báo cáo; quyền review/commit/upload thuộc người dùng.**
