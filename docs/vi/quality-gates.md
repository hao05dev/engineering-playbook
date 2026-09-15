# Cổng Kiểm soát Chất lượng (Quality Gates)

**Quality Gates (Cổng Chất lượng)** là tập hợp các tiêu chí kiểm định bắt buộc phải được thỏa mãn trước khi chuyển giao sản phẩm/mã nguồn từ giai đoạn này sang giai đoạn tiếp theo trong AI-SDLC. Chúng ngăn chặn các giả định sai lầm và mã nguồn có lỗi lan truyền xuống các bước sau.

---

## 6 Cổng Chất lượng trong AI-SDLC

```
  [PRD & Phạm vi bài toán]
              │
     [ GATE 1: Độ rõ ràng của Yêu cầu ]
              ▼
  [Thiết kế Kỹ thuật (Technical Design)]
              │
     [ GATE 2: Khóa Kiến trúc & Hợp đồng API ]
              ▼
  [Kế hoạch Thực thi (Implementation Plan)]
              │
     [ GATE 3: Phê duyệt Tính khả thi của Kế hoạch ]
              ▼
  [Sinh Mã nguồn (AI Code Gen)]
              │
     [ GATE 4: Xác thực Tự động (Tests & Linters) ]
              ▼
  [Review bởi Kỹ sư (Human Review)]
              │
     [ GATE 5: Kiểm toán Bảo mật & Logic ]
              ▼
  [CI/CD & Merge]
              │
     [ GATE 6: Triển khai & Kiểm thử Hồi quy ]
```

---

## Gate 1: Cổng Độ rõ ràng của Yêu cầu (Requirements Clarity)
*Chuyển tiếp: Khám phá Domain ➔ Đặc tả Yêu cầu Sản phẩm (PRD)*

- [ ] Bài toán và đối tượng người dùng (User Persona) được định nghĩa rõ ràng.
- [ ] User Story có đầy đủ **Tiêu chí Chấp nhận (Acceptance Criteria dạng Given-When-Then)**.
- [ ] Phạm vi ngoài (Out-of-Scope) được chỉ định rõ để tránh lan man tính năng.
- [ ] Các tình huống biên (concurrency, mất mạng, trạng thái không hợp lệ) được liệt kê.

---

## Gate 2: Cổng Khóa Kiến trúc & Hợp đồng (Architecture & Contract Lock)
*Chuyển tiếp: Thiết kế Kỹ thuật ➔ Phân rã Task*

- [ ] Database Schema, quan hệ giữa các bảng và Index được chốt hoàn chỉnh.
- [ ] Danh sách API endpoint có đầy đủ Request/Response schema, mã lỗi và HTTP status.
- [ ] Cơ chế xác thực (Authentication), phân quyền (Authorization) và cô lập dữ liệu (Multi-tenancy) được tài liệu hóa.
- [ ] Stack công nghệ và các thư viện bên thứ ba được kiểm duyệt, không xung đột phiên bản.

---

## Gate 3: Cổng Phê duyệt Tính khả thi của Kế hoạch (Plan Feasibility)
*Chuyển tiếp: Lập Kế hoạch ➔ Sinh Mã nguồn*

- [ ] Danh sách cụ thể các file cần tạo mới, sửa đổi hoặc xóa bỏ được xác định.
- [ ] Thứ tự phụ thuộc giữa các task được sắp xếp hợp lý (ví dụ: migration ➔ entity ➔ service ➔ controller).
- [ ] Chiến lược kiểm thử được vạch rõ (viết unit/integration test nào để kiểm chứng).
- [ ] Kỹ sư con người xem xét và bấm phê duyệt (approve) kế hoạch.

---

## Gate 4: Cổng Xác thực Tự động (Automated Verification)
*Chuyển tiếp: Sinh Mã nguồn ➔ Human Review*

- [ ] **Biên dịch (Compilation)**: Code biên dịch thành công 100%, không có lỗi cú pháp hoặc sai kiểu dữ liệu (type error).
- [ ] **Linters**: Không vi phạm quy chuẩn định dạng và phân tích tĩnh (ESLint, Prettier, Checkstyle, SonarQube).
- [ ] **Tests**: 100% unit tests mới và cũ đều pass, không có test nào bị disable/skip.
- [ ] **Coverage**: Đạt ngưỡng độ phủ kiểm thử tối thiểu đối với logic nghiệp vụ mới.

---

## Gate 5: Cổng Kiểm toán Bảo mật & Logic (Security & Logic Audit)
*Chuyển tiếp: Human Review ➔ Commit & Pull Request*

- [ ] **Zero-Trust Review**: Kỹ sư con người trực tiếp kiểm tra tính đúng đắn của logic nghiệp vụ.
- [ ] **Checklist Bảo mật**:
  - Không có lỗ hổng SQL Injection, Command Injection hoặc XSS.
  - Kiểm tra phân quyền trên từng endpoint nhạy cảm.
  - Tuyệt đối không hardcode API key, mật khẩu hoặc secret trong code.
- [ ] **Quản lý Tài nguyên**: Đảm bảo đóng kết nối cơ sở dữ liệu, file handle và luồng dữ liệu đúng cách.

---

## Gate 6: Cổng CI/CD & Triển khai (CI/CD & Deployment)
*Chuyển tiếp: Pull Request ➔ Nhánh Main / Staging*

- [ ] Pipeline CI tự động hoàn thành xuất sắc (build, test, lint, đóng gói container).
- [ ] Integration tests chạy thành công trên môi trường Staging/Testcontainers.
- [ ] Cập nhật tài liệu API và các biến môi trường cấu hình mới.
- [ ] PR nhận được ít nhất một lượt approve từ kỹ sư cùng đội ngũ.

> [!CAUTION]
> **Tuyệt đối Không Bỏ qua Quality Gates**
> Việc đốt cháy giai đoạn để kịp tiến độ sẽ tạo ra nợ kỹ thuật tích lũy. Nếu AI Agent không vượt qua được Gate 4 (Automated Tests), không được chuyển sang Gate 5; hãy từ chối code và yêu cầu Agent tự chẩn đoán và khắc phục lỗi.
