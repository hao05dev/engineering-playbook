# 11 — Commit & Đẩy Mã nguồn (Push)

Bước cuối cùng của chu trình AI-SDLC là **Commit & Đẩy Mã nguồn (Commit & Push)**. Tại bước này, các thay đổi đã được kiểm chứng sẽ được đóng gói thành các commit nguyên tử (atomic commits) tuân thủ quy chuẩn quốc tế, đẩy lên remote repository và tạo Pull Request (PR) để kích hoạt pipeline CI/CD.

---

## 1. Chuẩn mực Thông điệp Commit (Conventional Commits)

Mọi commit bắt buộc phải tuân theo đặc tả Conventional Commits để duy trì lịch sử Git rõ ràng và tự động sinh changelog.

```
<type>(<scope>): <mô tả ngắn gọn thì hiện tại>

[phần thân giải thích 'tại sao', bối cảnh và các đánh đổi kỹ thuật nếu có]

[phần footer tham chiếu tới số Issue hoặc PRD liên quan]
```

### Các Loại Commit (Commit Types) Được Chấp nhận:
- `feat`: Tính năng mới dành cho người dùng.
- `fix`: Bản vá lỗi cho tính năng hiện có.
- `refactor`: Tái cấu trúc mã nguồn mà không sửa bug hay thêm tính năng.
- `test`: Thêm mới hoặc hiệu chỉnh các bài test.
- `docs`: Chỉnh sửa tài liệu hướng dẫn.
- `chore`: Nâng cấp công cụ build, dependency hoặc cấu hình CI.

---

## Ví dụ Commit Chuẩn mực

```
feat(internship): implement application state machine transitions

- Cài đặt hàm transitionStatus trong ApplicationWorkflowService
- Áp dụng ma trận kiểm tra chuyển đổi trạng thái và ghi log kiểm toán
- Bổ sung bộ unit test bao quát các trường hợp hợp lệ và bị từ chối

Closes #142
```

---

## 2. Mẫu Mô tả Pull Request (PR Template) Tự động Tạo cùng AI

Tận dụng AI để tổng hợp các thay đổi thành bản mô tả Pull Request chuyên nghiệp:

```markdown
## Tóm tắt Thay đổi (Summary)
- Cài đặt `ApplicationWorkflowService` để quản lý trạng thái hồ sơ thực tập.
- Thêm ràng buộc cơ sở dữ liệu và xác thực chuyển đổi trạng thái hợp lệ.
- Thêm bộ unit test bao phủ 100% các nhánh điều kiện.

## Bằng chứng Xác thực (Verification)
- [x] `./mvnw clean test` chạy thành công (28 tests pass, 0 lỗi).
- [x] `./mvnw spotless:check` pass kiểm tra định dạng.
- [x] Kiểm tra thành công luồng: SUBMITTED -> FACULTY_APPROVED.
- [x] Đã chặn thành công các chuyển đổi bất hợp lệ.

## Tài liệu Liên quan
- PRD: [Đặc tả Đơn Thực tập](/vi/product-requirements)
- Thiết kế Kỹ thuật: [Kiến trúc Thực tập](/vi/technical-design)
```

---

## 3. Quy trình CI/CD & Merge vào Nhánh Chính

Sau khi push lên Git:
1. **GitHub Actions / CI**: Tự động kích hoạt build, chạy linter, unit test và quét bảo mật.
2. **Peer Review**: Nhận ít nhất một lượt approve từ kỹ sư đồng nghiệp.
3. **Squash and Merge**: Gộp các commit nhỏ thành một commit gọn gàng vào nhánh `main`.
