# 02 — Định nghĩa Yêu cầu Sản phẩm (PRD)

Tài liệu **Đặc tả Yêu cầu Sản phẩm (Product Requirement Definition - PRD)** chuyển hóa các hiểu biết nghiệp vụ thành các thông số kỹ thuật rõ ràng, không nhập nhằng và có thể kiểm thử được. Trong quy trình AI-SDLC, PRD là nguồn tham chiếu chuẩn mực (Single Source of Truth) để nghiệm thu tính năng.

---

## Cấu trúc PRD Chuẩn mực trong AI-SDLC

Một bản PRD chất lượng cần bao gồm 4 phần cốt lõi:

```
┌─────────────────────────────────────────────────────────────┐
│                       CẤU TRÚC BẢN PRD                      │
├─────────────────────────────────────────────────────────────┤
│ 1. Phát biểu Bài toán & Chân dung Người dùng (Personas)     │
│ 2. User Stories kèm Tiêu chí Chấp nhận (Given-When-Then)    │
│ 3. Ranh giới Ngoài Phạm vi (Explicit Out-of-Scope)          │
│ 4. Yêu cầu Phi chức năng (Non-Functional Requirements)     │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Viết Tiêu chí Chấp nhận Có thể Kiểm thử (Acceptance Criteria)

Tránh các câu mô tả chung chung như *"Hệ thống phải chạy nhanh và cho phép sinh viên lọc việc làm dễ dàng."* Hãy chuẩn hóa bằng định dạng **Given-When-Then**:

```gherkin
Tính năng: Lọc tin tuyển dụng thực tập theo thẻ công nghệ

  Kịch bản: Sinh viên lọc danh sách tin tuyển dụng theo tag 'Java'
    Given (Giả sử) sinh viên đã đăng nhập vào cổng thông tin
    And (Và) hệ thống có 15 tin tuyển dụng đang mở, trong đó 4 tin gắn tag "Java"
    When (Khi) sinh viên chọn bộ lọc tag "Java"
    Then (Thì) hệ thống hiển thị chính xác 4 tin tuyển dụng
    And (Và) mỗi tin hiển thị đều có gắn badge "Java"
    And (Và) nhãn tổng số hiển thị "Tìm thấy 4 vị trí"
```

---

## 2. Yêu cầu Phi chức năng (NFRs)

Chỉ định rõ các giới hạn kỹ thuật để AI Agent tuân thủ:
- **Hiệu năng (Performance)**: Thời gian phản hồi P95 dưới 200ms cho các truy vấn đọc trên tập dữ liệu 10.000 bản ghi.
- **Bảo mật (Security)**: Áp dụng Phân quyền Dựa trên Vai trò (RBAC) trên mọi API ghi; ghi log kiểm toán (Audit log) khi thay đổi trạng thái đơn thực tập.
- **Lưu trữ Dữ liệu**: Áp dụng cơ chế xóa mềm (Soft-delete) để bảo toàn lịch sử đánh giá của sinh viên.

---

## 3. Rào chắn Ngoài Phạm vi (Out-of-Scope)

Xác định những gì KHÔNG làm quan trọng không kém gì những gì CẦN làm:

```markdown
### Ngoài phạm vi của phiên bản v1.0:
- Chưa hỗ trợ tính năng chat trực tiếp giữa sinh viên và mentor doanh nghiệp (để dành sang v2.0).
- Không tự động tạo CV từ form (sinh viên tự upload file PDF sẵn có).
- Chưa tích hợp thanh toán phí đăng tin cho doanh nghiệp qua cổng thanh toán.
```

---

## Checklist Cổng Chất lượng: Nghiệm thu PRD

- [ ] Mọi User Story đều có ít nhất một kịch bản chấp nhận tích cực và tiêu cực cụ thể.
- [ ] Các tình huống biên (nộp đơn trùng, token hết hạn) đã được bao quát.
- [ ] Đã xác định rõ các API phụ thuộc và điều kiện tiên quyết.
- [ ] Phần Out-of-scope đã chốt để ngăn chặn phình to phạm vi (scope creep).
