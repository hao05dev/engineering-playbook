# 05 — Kế hoạch Thực thi (Implementation Planning)

Trước khi thực hiện bất kỳ chỉnh sửa nào trên file mã nguồn, AI Agent bắt buộc phải lập một **Kế hoạch Thực thi (Implementation Plan)** chi tiết đến từng tệp tin. Bước này loại bỏ thói quen sinh code mù quáng và trao cho kỹ sư cơ hội phát hiện sai sót kiến trúc trước khi code được viết ra.

---

## Quy trình Lập Kế hoạch Thực thi

```
┌─────────────────────────────────────────────────────────────┐
│                 CÁC BƯỚC LẬP IMPLEMENTATION PLAN            │
├─────────────────────────────────────────────────────────────┤
│ 1. Xác định Danh sách File (Tạo mới, Sửa đổi, Xóa bỏ)       │
│ 2. Phác thảo Interface, Class, Function và Kiểu dữ liệu     │
│ 3. Thiết lập Chiến lược Kiểm thử và Xác thực                │
│ 4. Chờ Kỹ sư Con người Phê duyệt (Quality Gate 3)           │
└─────────────────────────────────────────────────────────────┘
```

---

## Cấu trúc Một Tài liệu Kế hoạch Thực thi Chuẩn mực

Khi lập kế hoạch, AI Agent cần xuất ra định dạng tài liệu có cấu trúc như sau:

```markdown
# Kế hoạch Thực thi: Máy Trạng thái Đơn Thực tập (Application State Machine)

## Danh mục Tệp tin & Thay đổi Đề xuất

### [MODIFY] `src/main/java/com/app/model/ApplicationStatus.java`
- Thêm các giá trị Enum mới: `FACULTY_APPROVED`, `REJECTED`, `PLACED`.

### [NEW] `src/main/java/com/app/service/ApplicationWorkflowService.java`
- Cài đặt phương thức: `transitionStatus(UUID applicationId, ApplicationStatus targetStatus)`
- Kiểm tra tính hợp lệ của việc chuyển đổi trạng thái theo ma trận FSM.
- Bắn sự kiện kiểm toán `ApplicationStatusChangedEvent`.

### [NEW] `src/test/java/com/app/service/ApplicationWorkflowServiceTest.java`
- Kiểm thử chuyển đổi hợp lệ: `SUBMITTED` -> `FACULTY_APPROVED`.
- Kiểm thử chuyển đổi bất hợp lệ: `REJECTED` -> `PLACED` (phải ném `IllegalStateTransitionException`).

## Kế hoạch Xác thực (Verification Plan)
1. Chạy lệnh unit test: `./mvnw test -Dtest=ApplicationWorkflowServiceTest`
2. Kiểm tra định dạng: `./mvnw spotless:check`
```

---

## Tiêu chí Review Kế hoạch của Kỹ sư

Là kỹ sư chịu trách nhiệm, bạn hãy đánh giá bản kế hoạch qua các câu hỏi sau:
- *Agent có đặt file mới vào đúng thư mục và tầng kiến trúc quy định không?*
- *Có tệp tin nào bị sửa đổi không cần thiết dễ gây xung đột merge không?*
- *Kế hoạch kiểm thử đề xuất có đủ độ sâu để bắt được các ca biên không?*

> [!IMPORTANT]
> **Không Code khi Chưa Duyệt Kế hoạch**
> Tuyệt đối không cho phép AI Agent sửa đổi nhiều file cùng lúc khi chưa trình bày bản kế hoạch cụ thể và được bạn bấm duyệt (approve).
