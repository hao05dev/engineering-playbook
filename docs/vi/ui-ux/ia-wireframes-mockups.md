# Kiến trúc Thông tin, Wireframes & Mockups (Information Architecture, Wireframes & Mockups)

Trước khi viết frontend components trong Vue hoặc React, các nhóm kỹ thuật phần mềm cần cấu trúc nội dung thông qua **Kiến trúc Thông tin (Information Architecture - IA)** và chuyển hóa user flows thành **Screen Inventories**, **Low-Fidelity Wireframes**, và **High-Fidelity Mockups**.

---

## 1. Information Architecture (IA) & Screen Inventory

Kiến trúc Thông tin (IA) xác định cách thức nội dung và tính năng được phân loại, đặt nhãn và điều hướng:

```
┌─────────────────────────────────────────────────────────────────┐
│                    SCREEN INVENTORY TAXONOMY                    │
├─────────────────────────────────────────────────────────────────┤
│ 1. Public Portal                                                │
│    ├── SCR-01: Landing Page / Hero Search                       │
│    ├── SCR-02: Postings Browse & Filter View                    │
│    └── SCR-03: Single Posting Detail View                       │
│                                                                 │
│ 2. Student Workspace (Authenticated)                            │
│    ├── SCR-04: Student Dashboard & Placement Status             │
│    ├── SCR-05: Application Submission Modal                     │
│    └── SCR-06: Student Profile & Prerequisite Transcripts       │
│                                                                 │
│ 3. Faculty Advisor Portal (RBAC Protected)                      │
│    ├── SCR-07: Pending Application Review Queue                 │
│    └── SCR-08: Application Decision & Feedback Drawer           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Low-Fidelity Wireframes vs. High-Fidelity Mockups

```
┌─────────────────────────────────────────────────────────────┐
│                 FIDELITY PROGRESSION SPECTRUM               │
├─────────────────────────────────────────────────────────────┤
│ 1. Wireframe (Low-Fidelity): Bố cục, khối nội dung, IA      │
│    - Không màu mè trang trí, không phông chữ đồ họa.        │
│    - Nhanh chóng lặp lại và phản biện cùng lập trình viên.  │
│                                                             │
│ 2. Mockup (High-Fidelity): Typography, màu sắc thương hiệu  │
│    - Assets hình ảnh và style component chuẩn xác từng px.  │
│                                                             │
│ 3. Prototype (Interactive): Hiệu ứng chuyển động & trạng thái│
│    - Xác thực tương tác thực tế của người dùng trước khi code│
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Ví dụ thực tế: Application Submission Modal (Wireframe)

```
┌─────────────────────────────────────────────────────────────────┐
│ Modal: Nộp đơn ứng tuyển Backend Engineering Internship        │
├─────────────────────────────────────────────────────────────────┤
│ Company: Acme Cloud Corp   | Location: Remote  | Salary: $1,200 │
│                                                                 │
│ Thông tin sinh viên (Tự động điền từ Hồ sơ cá nhân):            │
│ Họ tên: Nguyen Van A      | Mã sinh viên: STD-8821              │
│ GPA tích lũy: 3.42 / 4.00  [✓ Đạt yêu cầu tối thiểu 2.50]       │
│                                                                 │
│ Tải lên Resume (Bắt buộc):                                      │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  [📄 my_resume_v2.pdf] (1.8 MB)             [ Thay đổi ]    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Thư giới thiệu / Cover Letter (Không bắt buộc):                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Trình bày lý do bạn mong muốn tham gia đội ngũ này...       │ │
│ │                                                  [ 142/2000]│ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [ Hủy ]                                           [ Nộp đơn ]   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Tạo Screen Inventory & Wireframe Bố cục</div>

```markdown
# TASK: Tạo Danh mục Màn hình (Screen Inventory) & Bản vẽ Wireframe dạng Text
Bạn là một Principal Information Architect & UI Designer.

## Input Feature Context:
[DÁN USER STORIES, USER FLOW, HOẶC ĐẶC TẢ TÍNH NĂNG TẠI ĐÂY]

## Instructions:
1. Xây dựng một Screen Inventory toàn diện phân loại màn hình theo Vai trò Người dùng (User Role) và Quyền hạn truy cập.
2. Với mỗi màn hình chính, dựng một Low-Fidelity ASCII Wireframe có cấu trúc rõ ràng.
3. Chú thích rõ ràng Phân cấp thị giác (Visual Hierarchy), nút kêu gọi hành động chính (Primary CTA), các hành động phụ (Secondary actions), và gom nhóm thông tin logic.
4. Nêu bật cách bố cục tuân thủ theo luồng đọc F-pattern và các điểm ngắt thích ứng (responsive breakpoints).
```
</div>

---

## 5. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Mỗi màn hình có Screen ID duy nhất và vai trò truy cập được định nghĩa rõ trong inventory chưa?
- [ ] Có duy nhất một nút CTA chính với phân cấp thị giác nổi bật không?
- [ ] Các trường nhập liệu có được sắp xếp theo cột đơn với tiến trình hợp lý không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Rosenfeld, Louis & Morville, Peter (2015). <em>Information Architecture: For the Web and Beyond</em>. O'Reilly Media.</li>
    <li>Nielsen Norman Group — Hướng dẫn Wireframing & Prototyping.</li>
  </ul>
</div>
