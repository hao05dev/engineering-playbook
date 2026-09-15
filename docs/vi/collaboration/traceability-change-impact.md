# Ma trận Truy vết & Phân tích Tác động Thay đổi (Traceability & Change Impact)

Trong các hệ thống phần mềm vận hành lâu dài, yêu cầu nghiệp vụ liên tục biến đổi. Nếu thiếu khả năng truy vết hai chiều (bidirectional traceability), mọi thay đổi nhỏ đều có thể gây lỗi hồi quy tiềm ẩn (silent regressions), mã nguồn thừa mồ côi và làm hỏng hàng loạt bộ kiểm thử.

---

## 1. Chuỗi Truy vết Hai chiều (Bidirectional Traceability Chain)

Truy vết hai chiều kết nối xuyên suốt từ mục tiêu kinh doanh đến từng ký hiệu mã nguồn (code symbols) và ca kiểm thử (test cases):

```
┌─────────────────────────────────────────────────────────────────┐
│                 BIDIRECTIONAL TRACEABILITY CHAIN                │
├─────────────────────────────────────────────────────────────────┤
│ Nhu cầu Nghiệp vụ ──> BRD-04: Tự động Ghép cặp Phân bổ          │
│       │                                                         │
│ User Story        ──> US-12: Là cố vấn, tôi muốn tự động ghép...│
│       │                                                         │
│ Yêu cầu IEEE 29148──> FR-01: Thuật toán Phân bổ Hôn nhân Bền vững│
│       │                                                         │
│ Thành phần Kiến trúc──> C4 Comp: `PlacementSolverService`       │
│       │                                                         │
│ Mã nguồn (Source) ──> `src/services/placement_solver.ts:L45`    │
│       │                                                         │
│ Bộ Kiểm thử (Test)──> `tests/unit/placement_solver.spec.ts:L12` │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Ma trận Truy vết Yêu cầu (Requirements Traceability Matrix - RTM)

| Req ID | Mô tả yêu cầu | Thành phần Kiến trúc | Bảng CSDL ảnh hưởng | Endpoint API | Bộ Test nghiệm thu |
|---|---|---|---|---|---|
| **FR-01** | Ghép cặp Gale-Shapley | `PlacementSolverService` | `placements`, `match_runs` | `POST /api/v1/placements/solve` | `placement_solver.spec.ts` |
| **FR-02** | Nộp đơn ứng tuyển | `ApplicationController` | `applications` | `POST /api/v1/applications` | `application_e2e.spec.ts` |
| **FR-03** | Giảng viên chấm báo cáo | `ReportReviewDrawer` | `internship_reports` | `PATCH /api/v1/reports/{id}` | `report_review.spec.ts` |

---

## 3. Quy trình Phân tích Tác động Thay đổi (5 Bước Lan truyền)

Khi một yêu cầu nghiệp vụ hoặc cấu trúc CSDL thay đổi, thực hiện phân tích tác động 5 bước:

```
┌─────────────────────────────────────────────────────────────────┐
│                 CHANGE IMPACT CASCADE PROTOCOL                  │
├─────────────────────────────────────────────────────────────────┤
│ Bước 1: Định vị Gốc rễ Thay đổi                                 │
│         Xác định chính xác mã yêu cầu, cột CSDL hoặc API đổi.   │
│                                                                 │
│ Bước 2: Quét Phụ thuộc Hạ nguồn (Downstream Traversal)          │
│         Grep toàn bộ vị trí tham chiếu trong kiến trúc, code, DB│
│                                                                 │
│ Bước 3: Phân loại Mức độ Nghiêm trọng                           │
│         - Breaking: Đổi schema API, xóa/đổi tên cột CSDL        │
│         - Non-Breaking: Thêm cột mới nullable, thêm endpoint    │
│                                                                 │
│ Bước 4: Đồng bộ Tài liệu & Ngữ cảnh                             │
│         Cập nhật SRS, OpenAPI spec và `ARCHITECTURE.md`.        │
│                                                                 │
│ Bước 5: Tái cấu trúc Code & Bộ Kiểm thử                         │
│         Cập nhật unit tests, script migration và code frontend. │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Ví dụ Thực tế: Phân tích Tác động khi Đổi Cấu trúc CSDL

**Thay đổi:** Cột chỉ tiêu tiếp nhận trong bảng `job_postings` đổi từ `max_slots INT` thành `slots_breakdown JSONB` để hỗ trợ phân bổ theo từng chuyên ngành.

```markdown
### Đánh giá Tác động Thay đổi (Change Impact Assessment):

1. **Gốc rễ Thay đổi**: Cột `job_postings.max_slots` bị deprecated; thay thế bằng `job_postings.slots_by_dept`.
2. **Các Thành phần bị ảnh hưởng**:
   - `Tầng CSDL`: Cần viết migration script `V4__split_slots_by_department.sql`.
   - `Backend Service`: `PlacementSolverService.ts` phải parse JSONB thay vì kiểu int.
   - `Hợp đồng API`: Schema `JobPostingResponse` trong OpenAPI bị đổi (Breaking Change).
   - `Giao diện UI`: Form quản trị `SCR-08` cần thêm trường nhập phân bổ chuyên ngành.
   - `Bộ Test`: 4 unit tests và 1 Playwright E2E test cần cập nhật fixture mock.
3. **Chiến lược Triển khai**: Chạy migration CSDL với DB view tương thích ngược trước khi deploy solver v2.
```

---

## 5. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Phân tích Tác động Thay đổi & Lan truyền Ảnh hưởng</div>

```markdown
# TASK: Phân tích Tác động Thay đổi cho Yêu cầu / Schema bị sửa đổi
Bạn là một Principal Software Architect và Kỹ sư Thẩm định Hệ thống (Systems Auditor).

## Proposed Change Description:
[DÁN YÊU CẦU THAY ĐỔI, BIẾN ĐỔI SCHEMA HOẶC TÁI CẤU TRÚC API TẠI ĐÂY]

## Instructions:
1. Xác định điểm gốc rễ biến đổi và phân loại mức độ (Breaking vs. Non-Breaking).
2. Lập vết toàn bộ các phụ thuộc hạ nguồn qua:
   - Bảng CSDL, Views, và Ràng buộc Khóa ngoại.
   - Domain Services, DTOs, và Bất biến Nghiệp vụ.
   - Endpoints API Công khai, Hợp đồng Request/Response, và Webhooks.
   - Màn hình UI, Form nhập liệu và State Store phía client.
   - Toàn bộ bộ kiểm thử Unit, Integration, và E2E Test Suites.
3. Cung cấp kế hoạch triển khai phân kỳ giảm thiểu tối đa downtime và lỗi hồi quy.
```
</div>

---

## 6. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Mọi yêu cầu bị thay đổi có được truy vết ngược về mã IEEE 29148 tương ứng không?
- [ ] Toàn bộ thành phần API và UI liên quan đã được định vị trước khi sửa code chưa?
- [ ] Các migration CSDL có nguy cơ breaking change đã có kế hoạch tương thích ngược / rollback chưa?
- [ ] Toàn bộ các bộ test bị ảnh hưởng đã được cập nhật và chạy xanh (pass) chưa?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>ISO/IEC/IEEE 29148:2018 — Quản lý Truy vết và Biến động Yêu cầu Phần mềm.</li>
    <li>Leffingwell, Dean & Widrig, Don (2003). <em>Managing Software Requirements: A Use Case Approach</em>. Addison-Wesley.</li>
  </ul>
</div>
