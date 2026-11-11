<!-- SPDX-License-Identifier: Apache-2.0 -->

# PoF 2026 — evidence review hiện hành

Đối chiếu 2026-11-11. **Không tự chấm điểm hoặc tuyên bố 50/50.**
Nguồn thể lệ: [VFOSSA, mục I](https://vfossa.vn/tin-tuc/the-le-olp-phan-mem-nguon-mo-nam-2026-760.html).
Các nhãn/max dưới đây theo bảng chính thức. PASS chỉ áp dụng phép kiểm cụ thể đã thực hiện;
việc đạt toàn bộ tiêu chí thuộc review sản phẩm và BTC, không phải website test.

P = `832c75fc3164cf170eed3bb8f1e380d24dd65aba`.
[Hồ sơ source](../SOURCE_EVIDENCE.md); metadata chạy thực lưu `.local/qa/remote-evidence.json`.

| Tiêu chí | Max | Evidence đã kiểm | Phán quyết có giới hạn / thiếu hụt |
| --- | ---: | --- | --- |
| Repository | 5 | [repo](https://github.com/tricore-opentrix/opentrix), API private:false, [commit P](https://github.com/tricore-opentrix/opentrix/commit/832c75fc3164cf170eed3bb8f1e380d24dd65aba) và source đã đọc | PASS truy cập/source. PENDING đánh giá sử dụng VCS toàn kỳ; không suy chất lượng từ commit count |
| Giấy phép | 10 | [LICENSE P](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/LICENSE), NOTICE, REUSE.toml, [OSI Apache](https://opensource.org/license/apache-2.0); website LICENSE so đúng text Apache sau chuẩn hóa newline | PASS kiểm tra văn bản. **BLOCKED** quyền/phạm vi/compatibility; [#138](https://github.com/tricore-opentrix/opentrix/issues/138) vẫn open. SPDX không chứng minh ownership |
| Release | 5 | [v0.1.0](https://github.com/tricore-opentrix/opentrix/releases/tag/v0.1.0) public non-draft pre-release, 2026-11-04T10:07:29Z; tar.gz local 563495 bytes, hash trùng digest API | PASS existence/version/hash. PENDING trước thời điểm nộp bài, scope/quyền artifact và khả năng chạy; không coi v0.2.0 dự kiến là release |
| Build/cài đặt | 10 | [README P](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/README.md#getting-started), [hosted CI đúng P](https://github.com/tricore-opentrix/opentrix/actions/runs/42866668592) API completed/success | PASS existence tài liệu và metadata CI. **BLOCKED** independent fresh-source build/config/run ngoài source; phiên này không build/test sản phẩm |
| Phụ thuộc | 10 | [THIRD-PARTY-NOTICES P](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/THIRD-PARTY-NOTICES.md), [R24](https://github.com/tricore-opentrix/opentrix/blob/832c75fc3164cf170eed3bb8f1e380d24dd65aba/docs/06-deployment/r24-release.md), lockfile QA website và allowlist | PASS tồn tại inventory. **BLOCKED** shipped-vs-build-only, giấy phép/text/source/relink/image obligations ở exact release; inventory chưa là clearance |
| Tài liệu | 10 | README, CHANGELOG, CONTRIBUTING, SECURITY và Issues công khai, các blob SHA trong SOURCE_EVIDENCE | PASS đọc/tồn tại tài liệu. PENDING instructions chạy thực, liên kết docs cũ đã dịch chuyển, đồng bộ proposal/README/release và reviewer sign-off |
| Tổng tối đa | **50** | Không cộng PASS của phép kiểm thành điểm thi | **BLOCKED/PENDING đánh giá 50/50; không có điểm tự cấp** |

Archive SHA-256 thực tính lại:
`32d8ae81c57ce312906791eca1f7f2e7d4c8e7eb59c42b5fa3212618da5be710`.
Archive có sẵn từ baseline phiên trước; lần này hash lại và so metadata release hiện tại,
không giả nhận đã tải hoặc build lại archive. Release khác P; không gộp commit nguồn.
API `target_commitish: main` không xác định immutable release SHA; phải resolve tag/evidence
khi lập hồ sơ nộp bài. Full E2E/Keycloak vẫn cần acceptance riêng.

Luồng bắt buộc: Website data-claim → M-code → README/docs/source đúng SHA → commit/test/PR
đúng phạm vi → kết quả thực và reviewer. Source/design, hosted CI, local website test và
LIVE runtime là bốn loại bằng chứng riêng. Không chuyển kết quả fixture thành kết quả sản phẩm.

Yến: ownership, license exceptions, contributor attestations, third-party obligations và
independent clearance. Bảo: release identity, fresh build/run, topology/runtime, export API.
Người dùng/BTC: xác nhận thời điểm nộp, scope artifact và đánh giá theo thể lệ. Chưa đủ các
gate đó thì không đủ cơ sở tính điểm thiếu cụ thể hoặc khẳng định đạt 50/50.

Hồ sơ PoF draft trước phiên này từng có ước lượng điểm; bản hiện hành thay ước lượng bằng
trạng thái evidence. Snapshot cũ được giữ local để truy vết, không đưa điểm lên website.
