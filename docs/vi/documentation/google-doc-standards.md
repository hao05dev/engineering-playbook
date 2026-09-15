# Tiêu chuẩn Kỹ thuật Tài liệu theo Google (Google Doc Standards)

Tài liệu kỹ thuật rõ ràng, ngắn gọn và có cấu trúc mạch lạc là yếu tố sống còn cho tốc độ phát triển phần mềm (engineering velocity). Việc tuân thủ **Google Developer Documentation Style Guide** và triết lý viết kỹ thuật của Google giúp tài liệu luôn mang tính thực thi cao, dễ tiếp cận và thuận tiện bảo trì bởi cả kỹ sư lẫn trợ lý AI.

---

## 1. Các Nguyên lý Cốt lõi của Viết Kỹ thuật theo Google

```
┌─────────────────────────────────────────────────────────────────┐
│              GOOGLE TECHNICAL WRITING PRINCIPLES                │
├─────────────────────────────────────────────────────────────────┤
│ 1. Tập trung vào Độc giả (Focus on Audience)                    │
│    Viết về những gì người đọc cần hoàn thành, không phải những  │
│    gì tác giả biết. Nêu rõ các điều kiện tiên quyết từ đầu.     │
│                                                                 │
│ 2. Sử dụng Thể Chủ động & Ngôn ngữ Trực diện (Active Voice)     │
│    ✓ "Auth Gateway xác thực mã JWT token."                      │
│    ✗ "Mã JWT token được xác thực bởi Auth Gateway."             │
│                                                                 │
│ 3. Tối ưu hóa Khả năng Đọc lướt (Scannability)                  │
│    Dùng tiêu đề H2/H3 mô tả rõ nghĩa, danh sách gạch đầu dòng,  │
│    bảng so sánh và sơ đồ thay vì các khối văn xuôi dày đặc.     │
│                                                                 │
│ 4. Thuật ngữ Chính xác & Nhất quán                              │
│    Định nghĩa từ viết tắt ở lần xuất hiện đầu. Tránh các đại từ │
│    mơ hồ ("điều này", "cái đó") và từ sáo rỗng ("chỉ cần", dễ). │
│                                                                 │
│ 5. Đoạn mã Hoàn chỉnh & Tự giải thích (Code Samples)            │
│    Cung cấp ví dụ code tối giản, chạy được, kèm comment làm rõ  │
│    thay vì các đoạn mã rời rạc trừu tượng.                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Quản lý Vòng đời Tài liệu (Document Lifecycle)

Mỗi tài liệu thiết kế kỹ thuật (Design Doc), RFC hoặc bản đặc tả đều phải có trường metadata xác định rõ trạng thái vòng đời:

```markdown
---
title: Thiết kế Công cụ Phân bổ Vị trí Thực tập (Placement Engine)
document_id: ENG-DES-042
status: active # draft | in-review | active | superseded | deprecated
author: Alex Chen <alex@company.com>
approvers: [Tech Lead, Principal Architect, Security Lead]
last_reviewed: 2026-03-15
supersedes: ENG-DES-018
---
```

```
┌─────────────────────────────────────────────────────────────────┐
│                   DOCUMENT LIFECYCLE PIPELINE                   │
├─────────────────────────────────────────────────────────────────┤
│ [Draft] ──> [In-Review / RFC] ──> [Active] ──> [Superseded]    │
│   │                 │                 │               │         │
│ Soạn thảo       Thu thập ý kiến   Nguồn chân lý   Được thay thế │
│ ý tưởng ban     đóng góp từ các   chính thức cho  bởi tài liệu  │
│ đầu & đề xuất   bên liên quan     đội ngũ dev     mới hơn       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Quy tắc Định dạng & Phong cách Trình bày

### A. Định dạng Danh sách (List Formatting)
- Bắt đầu mỗi gạch đầu dòng bằng chữ viết hoa.
- Sử dụng cấu trúc ngữ pháp song hành (tất cả đều bắt đầu bằng động từ hành động hoặc danh từ).
- Chỉ dùng danh sách đánh số khi thứ tự thực hiện các bước là bắt buộc.

### B. Sử dụng Bảng cho Thông tin So sánh
Thay vì viết các đoạn văn dài so sánh công nghệ message queue, hãy trình bày bằng bảng quyết định:

| Công nghệ | Thông lượng (Throughput) | Lưu trữ bền vững | Độ phức tạp vận hành | Đề xuất |
|---|---|---|---|---|
| **RabbitMQ** | 50k msg/s | Disk & RAM | Trung bình (Erlang) | Ưu tiên cho định tuyến phức tạp |
| **Apache Kafka** | 1M+ msg/s | Distributed Log | Cao (ZooKeeper / KRaft) | Quá tải cho Giai đoạn 1 |
| **Redis Streams** | 200k msg/s | In-memory + AOF | Thấp (Tận dụng hạ tầng sẵn có) | Lựa chọn cho MVP events |

---

## 4. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Chuẩn hóa & Tinh chỉnh Tài liệu theo Chuẩn Google</div>

```markdown
# TASK: Tái cấu trúc & Chuẩn hóa Tài liệu Kỹ thuật theo Google Doc Standards
Bạn là một Principal Technical Writer tuân thủ nghiêm ngặt Google Developer Documentation Style Guide.

## Input Document Draft:
[DÁN BẢN NHÁP HOẶC GHI CHÚ KỸ THUẬT TẠI ĐÂY]

## Instructions:
1. Viết lại tài liệu sử dụng thể chủ động (active voice), thì hiện tại và mệnh lệnh thức phù hợp.
2. Cấu trúc nội dung với các tiêu đề Markdown rõ ràng, mang tính mô tả (H1 -> H2 -> H3).
3. Chuyển các đoạn văn xuôi dài dòng thành bảng so sánh dễ đọc lướt, gạch đầu dòng hoặc sơ đồ ASCII flow.
4. Loại bỏ hoàn toàn các từ thừa hạ thấp tính chuyên nghiệp ("dễ dàng", "hiển nhiên", "chỉ cần", "đơn giản").
5. Thêm khối metadata frontmatter tiêu chuẩn (Document ID, Status, Author, Approvers, Date).
```
</div>

---

## 5. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Tài liệu có được viết ở thể chủ động với mối quan hệ rõ ràng giữa chủ thể và hành động không?
- [ ] Tất cả các từ viết tắt có được giải nghĩa ở lần đầu xuất hiện không (VD: *Role-Based Access Control (RBAC)*)?
- [ ] Các đoạn mã code có tối giản, đúng cú pháp và có khai báo ngôn ngữ không?
- [ ] Tài liệu có khối metadata frontmatter với trạng thái vòng đời hợp lệ không?
- [ ] Các từ như "chỉ cần", "đơn giản", "hiển nhiên" đã được loại bỏ chưa?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Google (2024). <em>Google Developer Documentation Style Guide</em>. Google Open Source.</li>
    <li>Google (2023). <em>Technical Writing One & Two Courses</em>. Google Developers.</li>
  </ul>
</div>
