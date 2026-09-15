# 09 — Review & Phê duyệt bởi Kỹ sư (Human Review)

Bước **Review & Phê duyệt bởi Kỹ sư (Human Review & Confirm)** là chốt chặn tối cao trước khi mã nguồn được đưa vào hệ thống quản lý phiên bản (Git). Trong khi AI đảm nhiệm việc viết code cơ học và chạy kiểm thử tự động, kỹ sư con người là người có thẩm quyền duy nhất quyết định tính đúng đắn về mặt nghiệp vụ, bảo mật và khả năng bảo trì lâu dài.

---

## Triết lý Review Theo Cơ chế Zero-Trust

```
┌─────────────────────────────────────────────────────────────┐
│                 QUY TRÌNH REVIEW ZERO-TRUST                 │
├─────────────────────────────────────────────────────────────┤
│ 1. Không bao giờ giả định test xanh = logic đúng 100%       │
│ 2. Soi xét kỹ ranh giới, phân quyền và transaction          │
│ 3. Tìm kiếm các ca biên bị bỏ sót hoặc code phức tạp quá mức│
│ 4. Đưa ra lệnh Approve hoặc gửi phản hồi từ chối rõ ràng    │
└─────────────────────────────────────────────────────────────┘
```

---

## Checklist Review 4 Chiều của Kỹ sư

### 1. Logic Nghiệp vụ & Các Bất biến (Business Invariants)
- Đoạn code có khớp chính xác với Tiêu chí Chấp nhận trong PRD không?
- Các điều kiện biên (0 phần tử, số âm, năm nhuận) đã được xử lý đúng chưa?
- Ranh giới transaction (`@Transactional`) có chuẩn xác để rollback khi có sự cố không?

### 2. Bảo mật & Cô lập Dữ liệu (Security & Isolation)
- Xác thực người dùng và phân quyền vai trò có được áp dụng chặt chẽ ở tầng endpoint/service không?
- Dữ liệu đầu vào có được lọc sạch để chống SQL Injection, NoSQL Injection và XSS không?
- Thông tin nhạy cảm (mật khẩu, token, PII) có bị in thẳng vào log không?

### 3. Hiệu năng & Khả năng Mở rộng (Performance)
- Có xuất hiện vấn đề truy vấn N+1 trong tầng ORM/JPA không?
- Các trường dùng để filter trong database đã được đánh index đầy đủ chưa?
- Các cuộc gọi API ra bên ngoài có thiết lập timeout phòng thủ không?

### 4. Chất lượng Mã nguồn & Kiến trúc Sạch (Clean Code)
- Code có tuân thủ đúng quy ước đặt tên và cấu trúc thư mục của dự án không?
- Các hàm có ngắn gọn, thuần khiết (pure) và đảm nhiệm đúng một trách nhiệm đơn lẻ không?
- Thông báo lỗi trả về cho client có rõ ràng nhưng không để lộ cấu trúc nội bộ của hệ thống không?

---

## Vòng lặp Phản hồi Tái hiện khi Từ chối (Constructive Feedback Loop)

Nếu quá trình review phát hiện lỗi, KHÔNG nên tự sửa thủ công nếu phần sửa đổi đòi hỏi viết lại nhiều. Thay vào đó, hãy gửi một prompt phản hồi có cấu trúc cho AI Agent:

```markdown
# PHẢN HỒI REVIEW CỦA KỸ SƯ: ApplicationWorkflowService

Lý do Từ chối: Thiếu kiểm tra phân quyền & Nguy cơ dính lỗi truy vấn N+1.

Vui lòng áp dụng các chỉnh sửa sau:
1. Trong `ApplicationWorkflowService.java`: Đảm bảo chỉ có Giảng viên phụ trách được gán hoặc Admin mới có quyền thực hiện chuyển đổi `FACULTY_APPROVED`.
2. Trong `InternshipApplicationRepository.java`: Bổ sung `@EntityGraph` hoặc `JOIN FETCH` để nạp sẵn (eager load) quan hệ với `Student`, tránh lỗi N+1 khi lấy danh sách.
3. Cập nhật `ApplicationWorkflowServiceTest.java` với test case kiểm tra giảng viên không có quyền sẽ bị ném `AccessDeniedException`.
```

> [!IMPORTANT]
> **Sự Xác nhận của Con người là Bắt buộc**
> Tuyệt đối không bỏ qua bước review của kỹ sư. Việc vượt qua automated tests là điều kiện cần, nhưng chỉ có phán đoán của con người mới đảm bảo mã nguồn sẵn sàng phục vụ thực tế trên production.
