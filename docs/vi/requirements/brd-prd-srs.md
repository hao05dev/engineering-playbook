# Phân tầng Tài liệu: BRD vs. PRD vs. SRS

Một nguồn cơn phổ biến dẫn đến hiểu lầm trong các dự án phần mềm là việc nhầm lẫn giữa mục tiêu kinh doanh, hành vi sản phẩm và hợp đồng kỹ thuật. Hướng dẫn này chuẩn hóa **Mô hình Phân tầng 3 Cấp Tài liệu**: **BRD**, **PRD**, và **SRS**.

---

## 1. Mô hình Phân tầng 3 Cấp Tài liệu Yêu cầu

```
┌─────────────────────────────────────────────────────────────┐
│                 MÔ HÌNH YÊU CẦU 3 CẤP ĐỘ                    │
├─────────────────────────────────────────────────────────────┤
│ Cấp 1: Tài liệu Yêu cầu Doanh nghiệp (BRD)                  │
│ └── Đối tượng: Ban Giám đốc, Nhà đầu tư (Giá trị & ROI)     │
│                                                             │
│ Cấp 2: Tài liệu Yêu cầu Sản phẩm (PRD)                      │
│ └── Đối tượng: Product Manager, UX Designer (Phạm vi & UX)  │
│                                                             │
│ Cấp 3: Bản Đặc tả Yêu cầu Phần mềm (SRS)                    │
│ └── Đối tượng: Kỹ sư, Kiến trúc sư, QA (Hợp đồng Kỹ thuật)  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Bảng So sánh Đối chiếu Toàn diện

| Tiêu chí | BRD (Business) | PRD (Product) | SRS (Software) |
| :--- | :--- | :--- | :--- |
| **Câu hỏi then chốt**| *Tại sao chúng ta làm cái này?* | *Người dùng trải nghiệm những gì?*| *Phần mềm bắt buộc hành xử ra sao?* |
| **Độc giả chính** | C-Level, Nhà tài trợ, Tài chính | Product Manager, UX Designer | Kỹ sư Phần mềm, Architect, Tester |
| **Chuẩn tham chiếu** | BABOK Guide | Lean Product Playbook | ISO/IEC/IEEE 29148 / IEEE 830 |
| **Nội dung chính** | Mục tiêu kinh doanh, ROI, Thị trường| User Stories, Wireframes, Personas| Đặc tả hàm, Mô hình dữ liệu, APIs |
| **Độ sâu Kỹ thuật** | Hoàn toàn không có kỹ thuật | Trung bình (Tương tác màn hình) | Sâu (Kiểu dữ liệu, Thuật toán, SLA)|

---

## 3. Cấu trúc Tài liệu SRS Chuẩn Quốc tế (IEEE 29148)

SRS là văn bản đặc tả kỹ thuật chính thức được AI Agent sử dụng để hiện thực hóa mã nguồn:

```markdown
1. Giới thiệu (Introduction)
   1.1 Mục đích tài liệu (Purpose)
   1.2 Phạm vi hệ thống (Scope)
   1.3 Thuật ngữ & Từ viết tắt (Definitions & Acronyms)
   1.4 Tài liệu tham khảo (References)
2. Mô tả Tổng quan (Overall Description)
   2.1 Bối cảnh sản phẩm & Giao diện tích hợp (System Interfaces)
   2.2 Đặc điểm người dùng & Personas
   2.3 Môi trường vận hành & Ràng buộc (Constraints)
   2.4 Giả định và Sự phụ thuộc (Assumptions & Dependencies)
3. Yêu cầu Chi tiết (Specific Requirements)
   3.1 Giao diện bên ngoài (External Interfaces - API, UI, Hardware)
   3.2 Tính năng & Yêu cầu Chức năng (FR-01, FR-02...)
   3.3 Yêu cầu Phi Chức năng (Hiệu năng, Bảo mật, Độ tin cậy)
   3.4 Yêu cầu Cơ sở Dữ liệu & Lưu trữ
4. Ma trận Xác thực & Nghiệm thu (Verification Matrix)
```

---

## 4. Ví dụ Thực tế: Chuyển dịch từ BRD ➔ PRD ➔ SRS

- **Mục tiêu BRD**: *"Tăng 20% tỷ lệ giữ chân các doanh nghiệp đối tác thông qua việc xóa bỏ chậm trễ giấy tờ thủ công."*
- **User Story trong PRD**: *"Là Nhà tuyển dụng, tôi muốn duyệt danh sách sinh viên đã qua sơ tuyển trên Dashboard để có thể lên lịch phỏng vấn trong vòng 48 giờ."*
- **Yêu cầu Kỹ thuật trong SRS (FR-REC-01)**: *"Khi Nhà tuyển dụng bấm 'Lên lịch phỏng vấn', Hệ thống **bắt buộc (shall)** truy vấn lịch trống của Sinh viên qua Google Calendar OAuth2 trong vòng 500ms, hiển thị các slot 30 phút khả dụng và phát ra sự kiện `InterviewScheduledEvent` khi xác nhận thành công."*

---

## 5. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Sinh Bản Đặc tả Kỹ thuật SRS Chuẩn IEEE 29148</div>

```markdown
# TASK: Sinh Tài liệu Đặc tả Yêu cầu Phần mềm (SRS) Chuẩn ISO/IEC/IEEE 29148
Bạn là Kiến trúc sư Yêu cầu Phần mềm Cấp cao (Principal Requirements Architect).

## Nguồn Dữ liệu Đầu vào:
Tài liệu PRD / Danh mục Yêu cầu đã duyệt: [DÁN NỘI DUNG PRD TẠI ĐÂY]

## Nguyên tắc Bất biến:
Chỉ sinh SRS dựa trên các quy tắc nghiệp vụ ĐÃ CHỐT [CONFIRMED]. Nếu thiếu thông tin kỹ thuật, hãy chèn nhãn [QUESTION] thay vì tự ý suy diễn.

## Cấu trúc Đầu ra Yêu cầu:
1. Phần 1: Phạm vi và Giao diện Tích hợp.
2. Phần 2: Chân dung Người dùng và Ràng buộc Vận hành.
3. Phần 3: Yêu cầu Chức năng Chuẩn IEEE 29148 (Mã ID, Câu phát biểu dùng SHALL, Dữ liệu Vào/Ra, Xử lý Lỗi).
4. Phần 4: Yêu cầu Phi Chức năng (Chỉ số đo lường theo ISO 25010).
5. Phần 5: Ma trận Nghiệm thu & Kiểm chứng.
```
</div>

---

## 6. Checklist Kiểm duyệt (Review Checklist)

- [ ] Bản SRS có loại bỏ hoàn toàn các khẩu hiệu kinh doanh chung chung để tập trung vào hành vi kỹ thuật không?
- [ ] Mọi yêu cầu chức năng trong SRS đều truy vết ngược được về User Story trong PRD và mục tiêu trong BRD không?
- [ ] Bản SRS có tuân thủ đúng cấu trúc các mục chuẩn mực của IEEE 29148 không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>ISO/IEC/IEEE 29148:2018 — Section 9: Cấu trúc Tài liệu Đặc tả Yêu cầu Phần mềm (SRS).</li>
    <li>IEEE Std 830-1998 — Thực hành Khuyến nghị của IEEE cho SRS.</li>
  </ul>
</div>
