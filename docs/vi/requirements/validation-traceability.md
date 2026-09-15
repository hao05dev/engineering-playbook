# Thẩm định, Kiểm tra & Ma trận Truy vết (Traceability)

Một hệ thống phần mềm có độ tin cậy cao khi mọi dòng code, cột cơ sở dữ liệu và đường dẫn API đều có thể truy vết ngược trực tiếp về một yêu cầu nghiệp vụ đã được phê duyệt. **Tính Truy vết Yêu cầu (Requirements Traceability)** đảm bảo hệ thống không phát triển tính năng thừa (gold plating) cũng như không bỏ sót các yêu cầu sống còn.

---

## 1. Chuỗi Truy vết Hai Chiều Toàn Diện (End-to-End Traceability)

```
[ Mục tiêu Kinh doanh (Goal) ]
              │
              ▼
[ Yêu cầu Doanh nghiệp (BRD) ]
              │
              ▼
[ Yêu cầu Chức năng (SRS) ] ◄── [ Đặc tả Use Case ]
              │                           │
              ▼                           ▼
[ Thành phần Kiến trúc ] ────────► [ Giao diện Màn hình UI ]
              │
              ▼
[ Endpoint API ] ──► [ Bảng Cơ sở Dữ liệu ] ──► [ Bài Kiểm thử Tự động ]
```

---

## 2. Ma trận Truy vết Yêu cầu (Requirements Traceability Matrix - RTM)

RTM là bảng ma trận đối chiếu liên kết mỗi yêu cầu với các thành phần thiết kế, cài đặt và kiểm thử:

| Mã Yêu cầu | Mục tiêu Kinh doanh | Use Case | Thành phần Code | Endpoint API | Bảng CSDL | Test Case ID | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-INT-01** | BG-02 (Tự động Nộp đơn) | UC-04 (Nộp đơn) | `ApplicationService` | `POST /api/v1/applications` | `internship_applications` | `TC-INT-001` | **ĐÃ KIỂM CHỨNG** |
| **FR-INT-02** | BG-02 (Giảng viên Duyệt) | UC-05 (Duyệt) | `WorkflowEngine` | `PATCH /api/v1/applications/{id}` | `internship_applications` | `TC-INT-002` | **ĐÃ KIỂM CHỨNG** |
| **FR-INT-03** | BG-04 (Xuất Báo cáo) | UC-09 (Xuất file)| `ReportGenerator` | `GET /api/v1/reports/placements` | N/A (View truy vấn) | `TC-INT-003` | **ĐANG TRIỂN KHAI** |

---

## 3. Phân tích Tác động khi Yêu cầu Thay đổi (Change Impact Analysis)

Khi một quy tắc nghiệp vụ đã chốt có sự thay đổi (ví dụ: *"Sinh viên được phép nộp tối đa 10 đơn thay vì 5 đơn"*), AI Agent sẽ lập tức kích hoạt quy trình **Kiểm toán Tác động**:

```
┌─────────────────────────────────────────────────────────────┐
│                 QUY TRÌNH PHÂN TÍCH TÁC ĐỘNG                │
├─────────────────────────────────────────────────────────────┤
│ 1. Rà soát SRS / Quy tắc: Cập nhật BR-INT01 (5 -> 10)       │
│ 2. Rà soát Use Case: Cập nhật nhánh lỗi 5b trong UC-04      │
│ 3. Rà soát Đặc tả API: Cập nhật ràng buộc validate DTO      │
│ 4. Rà soát CSDL: Cập nhật check constraint trong migration  │
│ 5. Rà soát UI: Sửa thông điệp hướng dẫn và validation form  │
│ 6. Rà soát Test Suite: Cập nhật assertion trong TC-INT-001  │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Ma trận Truy vết & Phân tích Tác động Thay đổi</div>

```markdown
# TASK: Xây dựng Ma trận Truy vết & Phân tích Tác động Thay đổi Yêu cầu
Bạn là Kiến trúc sư Quản lý Cấu hình và Đảm bảo Chất lượng Phần mềm (QA Architect).

## Bối cảnh Đầu vào:
Tài liệu Yêu cầu / SRS: [DÁN DANH MỤC YÊU CẦU HOẶC SRS TẠI ĐÂY]
Yêu cầu Thay đổi Đề xuất: [MÔ TẢ THAY ĐỔI ĐỀ XUẤT NẾU CÓ]

## Yêu cầu Thực hiện:
1. Xây dựng Ma trận Truy vết Hai chiều (RTM) liên kết: Mã Yêu cầu, Use Case, Component Code, Endpoint API, Bảng CSDL và Test Case ID.
2. Thực hiện Phân tích Tác động Thay đổi (Change Impact Analysis) liệt kê toàn bộ các tài liệu, API, schema CSDL, màn hình UI và bài test bị ảnh hưởng.
3. Xuất Báo cáo Tác động (Impact Report) ước tính rủi ro và phạm vi kiểm thử hồi quy cần chạy lại.
4. Gắn nhãn: [CONFIRMED], [ASSUMPTION], [PROPOSAL], [QUESTION].
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Mọi yêu cầu chức năng trong ma trận đều có ít nhất một test case tự động kiểm chứng?
- [ ] Không có bảng dữ liệu hay component code "mồ côi" (không gắn với bất kỳ yêu cầu nào)?
- [ ] Mọi đề xuất thay đổi đều có báo cáo phân tích tác động trước khi bắt tay vào sửa code?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>ISO/IEC/IEEE 29148:2018 — Section 6.5: Quy trình Quản lý Tính Truy vết Yêu cầu.</li>
    <li>Gotel, Orlena & Finkelstein, Anthony (1994). <em>An Analysis of the Requirements Traceability Problem</em>. IEEE.</li>
  </ul>
</div>
