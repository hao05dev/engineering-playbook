# Tài liệu Database, API, UI/UX & Kiểm thử (DB, API, UI & Test Docs)

Đặc tả kỹ thuật chuyển hóa kiến trúc mức cao thành bản thiết kế thi công chi tiết cho các kỹ sư cơ sở dữ liệu, lập trình viên backend, frontend designer và kỹ sư kiểm thử chất lượng (QA).

---

## 1. Tài liệu Database Schema & Từ điển Dữ liệu (Data Dictionary)

Mọi bảng trong cơ sở dữ liệu quan hệ đều phải có mục ghi chú trong Từ điển Dữ liệu giải thích ý nghĩa nghiệp vụ và lý do đánh index:

### Bảng: `internship_applications`
- **Mô tả**: Lưu trữ hồ sơ ứng tuyển của sinh viên gửi tới các vị trí thực tập doanh nghiệp.
- **Mô hình truy cập (Access Pattern)**: Tần suất ghi lớn trong đợt mở cổng đăng ký (50 req/giây); truy vấn lọc theo `student_id` và `posting_id`.

| Cột (Column) | Kiểu dữ liệu | Ràng buộc (Constraints) | Mô tả nghiệp vụ |
|---|---|---|---|
| `id` | `UUID` | `PK, DEFAULT gen_random_uuid()` | Khóa chính duy nhất bất biến của đơn |
| `student_id` | `UUID` | `NOT NULL, FK -> students(id)` | Tham chiếu sinh viên nộp đơn |
| `posting_id` | `UUID` | `NOT NULL, FK -> job_postings(id)` | Vị trí thực tập tiếp nhận |
| `status` | `VARCHAR(32)` | `NOT NULL, DEFAULT 'SUBMITTED'` | Trạng thái: `SUBMITTED`, `UNDER_REVIEW`, `ACCEPTED`, `REJECTED` |
| `submitted_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT NOW()` | Dấu thời gian nộp đơn theo giờ UTC |

---

## 2. Đặc tả Tham chiếu API & Danh mục Mã lỗi (Error Catalog)

Các API endpoint cần được mô tả rõ ràng schema payload gửi lên, mã trạng thái HTTP trả về, và danh mục mã lỗi chuẩn:

### Endpoint: `POST /api/v1/applications`
- **Xác thực**: `Bearer <JWT>` (Phạm vi: `student:apply`)
- **Tính bất biến (Idempotency)**: Hỗ trợ header `Idempotency-Key` (UUID v4)

#### Bảng Mã trạng thái HTTP:
- `201 Created`: Nộp đơn ứng tuyển thành công.
- `400 Bad Request`: Payload không đúng định dạng (`INVALID_PAYLOAD`).
- `409 Conflict`: Sinh viên đã nộp đơn cho vị trí này rồi (`DUPLICATE_APPLICATION`).
- `422 Unprocessable Entity`: Điểm GPA sinh viên chưa đạt yêu cầu của bài đăng (`GPA_BELOW_THRESHOLD`).

---

## 3. Design Tokens & Đặc tả Component UI/UX

Các component giao diện được tài liệu hóa thông qua các biến thiết kế (design tokens) và định nghĩa trạng thái:

```
┌─────────────────────────────────────────────────────────────────┐
│                    DESIGN SYSTEM TOKENS                         │
├─────────────────────────────────────────────────────────────────┤
│ Màu sắc (Colors):                                               │
│   --color-primary-600: #2563eb (Nút hành động chính CTA)        │
│   --color-danger-600:  #dc2626 (Hành động xóa & Báo lỗi)        │
│   --color-surface-card: #ffffff (Nền thẻ chế độ sáng)           │
│                                                                 │
│ Typography:                                                     │
│   --font-sans: 'Inter', system-ui, -apple-system, sans-serif    │
│   --text-base: 1.000rem (16px, Chiều cao dòng: 1.5)             │
│                                                                 │
│ Khoảng cách & Hiệu ứng nổi (Spacing & Elevation):               │
│   --space-4: 1.0rem (16px) | --radius-md: 0.375rem (6px)        │
│   --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Kế hoạch Kiểm thử Tổng thể & Ma trận Truy vết (Test Matrix)

Tài liệu kiểm thử đảm bảo mọi yêu cầu chức năng và phi chức năng đều được bảo vệ qua các tầng unit, integration và E2E:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MASTER TEST PLAN MATRIX                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ Req ID: FR-01 (Thuật toán Phân bổ Hàng loạt)                                │
│ ├── Unit Test: `test_gale_shapley_matching_stability()` [Độ phủ: 100%]       │
│ ├── Integration Test: `test_batch_allocation_with_database_lock()`           │
│ └── Performance Test: `k6 run load_batch_alloc.js` (1.000 users < 30s)       │
├─────────────────────────────────────────────────────────────────────────────┤
│ Req ID: FR-02 (Nộp đơn & Chống trùng lặp)                                   │
│ ├── Unit Test: `test_application_schema_validation()`                        │
│ ├── Integration Test: `test_concurrent_submissions_trigger_idempotency()`   │
│ └── E2E Test: Playwright `student_applies_and_views_dashboard.spec.ts`      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Tạo Đặc tả Kỹ thuật Toàn diện</div>

```markdown
# TASK: Tạo Bản Đặc tả Kỹ thuật Thi công & Kiểm thử
Bạn là một Staff Systems Engineer & Kiến trúc sư Tự động hóa Kiểm thử (QA Architect).

## Feature / Architecture Scope:
[DÁN ĐẶC TẢ YÊU CẦU HOẶC THIẾT KẾ KIẾN TRÚC TẠI ĐÂY]

## Instructions:
1. Tạo Từ điển Dữ liệu CSDL (Bảng, kiểu dữ liệu, ràng buộc, lý do đánh index).
2. Tạo Đặc tả Endpoint OpenAPI 3.1 kèm danh mục mã lỗi và cơ chế Idempotency.
3. Định nghĩa Design Tokens UI và Hợp đồng trạng thái Component.
4. Xây dựng Kế hoạch Kiểm thử Tổng thể (Master Test Plan) và Ma trận Kiểm thử Unit, Integration, E2E.
```
</div>

---

## 6. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Mọi bảng CSDL đều có giải thích kiểu dữ liệu, tính nullable và khóa ngoại FK chưa?
- [ ] Các phản hồi lỗi API có được quy chuẩn với mã lỗi máy đọc được (machine-readable) không?
- [ ] Mọi biến thiết kế UI tokens có giá trị dự phòng (fallback) hợp lệ không?
- [ ] Mỗi yêu cầu phần mềm có ánh xạ trực tiếp tới ít nhất một bộ test tự động không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>OpenAPI Initiative (2021). <em>OpenAPI Specification v3.1.0</em>.</li>
    <li>ISTQB (2023). <em>Certified Tester Foundation Level Syllabus & Test Documentation Standard</em>.</li>
  </ul>
</div>
