# Tài liệu Yêu cầu & Kiến trúc Hệ thống (Requirements & Architecture Docs)

Phần mềm chất lượng cao bắt đầu từ các bản đặc tả kỹ thuật nghiêm ngặt. Việc soạn thảo tài liệu yêu cầu và kiến trúc giúp kết nối khoảng cách giao tiếp giữa các nhà tài trợ nghiệp vụ, Product Manager, Software Architect và các trợ lý AI phát triển phần mềm.

---

## 1. Phân cấp Tài liệu Yêu cầu (BRD vs. PRD vs. SRS)

```
┌─────────────────────────────────────────────────────────────────┐
│               REQUIREMENTS SPECIFICATION TAXONOMY               │
├─────────────────────────────────────────────────────────────────┤
│ 1. Business Requirements Document (BRD)                         │
│    - Đối tượng: Ban lãnh đạo, Nhà tài trợ dự án, Product Lead.  │
│    - Trọng tâm: Vấn đề Nghiệp vụ, Lợi tức Đầu tư (ROI), KPIs.   │
│                                                                 │
│ 2. Product Requirements Document (PRD)                          │
│    - Đối tượng: Product Manager, UX Designer, Tech Lead.        │
│    - Trọng tâm: Chân dung người dùng (Personas), Flow, UX Scope.│
│                                                                 │
│ 3. Software Requirements Specification (SRS - IEEE 29148)       │
│    - Đối tượng: Kỹ sư Phần mềm, QA Lead, Trợ lý AI Coder.       │
│    - Trọng tâm: Yêu cầu Chức năng chi tiết, Phi chức năng, CSDL,│
│      Giao diện API, Xử lý lỗi và các trường hợp biên.           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Cấu trúc Biểu mẫu PRD Tiêu chuẩn

```markdown
# [PRD] Tính năng: Hệ thống Tự động Phân bổ Thực tập sinh

## 1. Bối cảnh & Giá trị Nghiệp vụ (Context & Business Value)
- **Mô tả bài toán**: Phân bổ thủ công hơn 500 sinh viên vào 80 doanh nghiệp tiếp nhận mất 3 tuần và có tỷ lệ sai sót 15%.
- **Chỉ số thành công / KPI**: Giảm thời gian phân bổ từ 21 ngày xuống < 2 giờ với 0 lỗi vi phạm ràng buộc.

## 2. Chân dung Người dùng & Kịch bản (Personas & Scenarios)
- **Sinh viên**: Chọn danh sách nguyện vọng ưu tiên và tải lên CV đã qua kiểm duyệt.
- **Điều phối viên Khoa**: Thiết lập ràng buộc phân bổ (trọng số GPA, chỉ tiêu doanh nghiệp) và bấm kích hoạt thuật toán chạy lô (batch solver).

## 3. Yêu cầu Chức năng (Functional Requirements)
| Req ID | Mô tả tính năng | Mức ưu tiên | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| FR-01 | Thuật toán phân bổ áp dụng mô hình Gale-Shapley | P0 (Bắt buộc) | Không còn sinh viên đủ điều kiện nào bị bỏ sót nếu còn chỉ tiêu |
| FR-02 | Gửi email thông báo khi kết quả phân bổ được phê duyệt | P1 (Nên có) | Phát email trong vòng 60 giây sau khi Trưởng khoa duyệt |

## 4. Yêu cầu Phi chức năng (Non-Functional Requirements - NFRs)
- **Hiệu năng**: Quá trình giải thuật toán phân bổ hoàn thành dưới 30 giây cho 1.000 sinh viên.
- **Bảo mật**: Dữ liệu GPA của sinh viên được mã hóa khi lưu trữ (AES-256) và ẩn thông tin trong audit logs.
```

---

## 3. Bộ Tài liệu Kiến trúc Hệ thống (arc42 & C4 Model)

Các đội ngũ kỹ thuật sử dụng **khung kiến trúc arc42** để cấu trúc tài liệu kiến trúc toàn diện:

```
┌─────────────────────────────────────────────────────────────────┐
│                    arc42 CORE SECTION OVERVIEW                  │
├─────────────────────────────────────────────────────────────────┤
│ 01. Giới thiệu & Mục tiêu (Bối cảnh Nghiệp vụ & Chất lượng hàng đầu)│
│ 02. Ràng buộc Kiến trúc (Giới hạn Kỹ thuật & Tổ chức)          │
│ 03. Phạm vi & Bối cảnh (C4 Level 1: System Context Diagram)     │
│ 04. Chiến lược Giải pháp (Công nghệ then chốt & Pattern cốt lõi)│
│ 05. Khối Xây dựng (C4 Level 2 Container & Level 3 Component)   │
│ 06. Góc nhìn Runtime (Sơ đồ UML Sequence cho luồng giao dịch)   │
│ 07. Góc nhìn Triển khai (C4 Level 4: Hạ tầng Cloud & Cụm máy chủ)│
│ 08. Khái niệm Xuyên suốt (Bảo mật, Logging, Khả năng chịu lỗi)  │
│ 09. Quyết định Kiến trúc (Nhật ký ADR / MADR)                   │
│ 10. Yêu cầu Chất lượng (Cây Chất lượng theo ISO 25010)          │
│ 11. Rủi ro & Nợ Kỹ thuật (Các lỗ hổng đã nhận diện)             │
│ 12. Bảng chú giải Thuật ngữ (Ngôn ngữ Nghiệp vụ Chung)          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Biên soạn IEEE 29148 SRS & Tài liệu Kiến trúc arc42</div>

```markdown
# TASK: Tạo Bản Đặc tả Yêu cầu SRS & Tài liệu Kiến trúc arc42 Toàn diện
Bạn là một Principal Software Architect và Kỹ sư Phân tích Yêu cầu (Requirements Engineer).

## Project Scope & Business Goals:
[DÁN BẢN MÔ TẢ DỰ ÁN, TÍNH NĂNG HOẶC USER STORIES TẠI ĐÂY]

## Instructions:
1. Xây dựng Bản Đặc tả Yêu cầu Phần mềm (SRS) chuẩn IEEE 29148:
   - Phạm vi, Tổng quan Hệ thống, và Các nhóm Người dùng.
   - Bảng Yêu cầu Chức năng chuẩn hóa (ID, Tiêu đề, Mô tả, Mức ưu tiên, Tiêu chí nghiệm thu).
   - Yêu cầu Phi chức năng đo lường được (ISO 25010: Độ trễ, Thông lượng, Bảo mật, Tính sẵn sàng).
2. Xây dựng Tài liệu Kiến trúc Hệ thống theo chuẩn arc42:
   - Sơ đồ Bối cảnh Hệ thống (C4 Level 1 bằng cú pháp Mermaid).
   - Sơ đồ Container (C4 Level 2 bằng cú pháp Mermaid).
   - Sơ đồ Sequence Diagram cho luồng giao dịch nghiệp vụ cốt lõi.
   - Các giải pháp xuyên suốt (Cross-cutting concerns) và Kiến trúc Bảo mật.
```
</div>

---

## 5. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Mục tiêu nghiệp vụ có gắn liền trực tiếp với các chỉ số KPI đo lường được không?
- [ ] Mỗi yêu cầu chức năng có tiêu chí nghiệm thu (Acceptance Criteria) rõ ràng, không mơ hồ không?
- [ ] Các yêu cầu phi chức năng có được định lượng bằng chỉ số đo lường cụ thể (VD: p99 latency < 200ms)?
- [ ] Sơ đồ kiến trúc có được dựng bằng cú pháp Mermaid hợp lệ với ranh giới hệ thống rõ ràng không?
- [ ] Các đánh đổi kỹ thuật quan trọng có được ghi chép lại thành Architecture Decision Records (ADRs) không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>ISO/IEC/IEEE 29148:2018 — <em>Systems and Software Engineering — Life Cycle Processes — Requirements Engineering</em>.</li>
    <li>Starke, Gernot & Hruschka, Peter (2023). <em>arc42 in Practice</em>. Leanpub.</li>
    <li>Brown, Simon (2020). <em>The C4 Model for Visualising Software Architecture</em>.</li>
  </ul>
</div>
