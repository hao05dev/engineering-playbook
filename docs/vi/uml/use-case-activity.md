# Sơ đồ Use Case & Sơ đồ Hoạt động (Activity Diagrams)

Sơ đồ Use Case và Sơ đồ Hoạt động (Activity Diagram) là hai biểu diễn hành vi chủ đạo được sử dụng để nắm bắt mục tiêu của người dùng và quy trình vận hành trong giai đoạn phân tích hệ thống.

---

## 1. Nguyên tắc Xây dựng Sơ đồ Use Case (OMG UML)

Sơ đồ Use Case trực quan hóa sự tương tác giữa các tác nhân bên ngoài (Actors) và các năng lực của hệ thống bên trong một ranh giới (System Boundary) xác định.

```
┌─────────────────────────────────────────────────────────────┐
│                 KÝ HIỆU SƠ ĐỒ USE CASE CHUẨN                │
├─────────────────────────────────────────────────────────────┤
│ • Actor: Người que hoặc hộp «actor» (Vai trò tác nhân ngoài)│
│ • System Boundary: Khung chữ nhật bao quanh các Use Case    │
│ • Use Case: Hình elip chứa mục tiêu Động từ - Danh từ       │
│ • «include»: Quan hệ bắt buộc (Case gốc không thể thiếu nó) │
│ • «extend»: Quan hệ mở rộng tùy chọn tại Extension Point    │
│ • Generalization: Quan hệ kế thừa giữa các Actor / Use Case │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ Thực tế: Hệ thống Thực tập Đại học

```
  ┌─────────────────────────────────────────────────────────┐
  │                 Ranh giới Cổng Quản lý Thực tập         │
  │                                                         │
  │   [Sinh viên] ───► ( (Nộp Đơn Ứng Tuyển) )              │
  │                            │                            │
  │                            ├──«include»──► ( (Xác thực Điều kiện GPA) )
  │                            │                            │
  │                            └──«extend»───► ( (Yêu cầu Thư Giới thiệu) )
  │                                                         │
  │   [Giảng viên] ──► ( (Duyệt Đơn Ứng Tuyển) )            │
  │                            │                            │
  │                            └──«include»──► ( (Lưu Lý do & Quyết định) )
  └─────────────────────────────────────────────────────────┘
```

---

## 2. Sơ đồ Hoạt động Phân làn (Activity Diagram with Swimlanes)

Sơ đồ hoạt động mô hình hóa các luồng xử lý tính toán và quy trình nghiệp vụ, bao gồm các hành động tuần tự, rẽ nhánh điều kiện và đồng thời (concurrency).

### Các Phần tử Cốt lõi:
- **Nút Bắt đầu (Initial Node)**: Hình tròn đặc (`●`) đánh dấu khởi đầu luồng.
- **Nút Hành động (Action State)**: Hình chữ nhật bo góc mô tả thao tác thực hiện.
- **Nút Quyết định (Decision Node)**: Hình thoi (`◇`) cho các rẽ nhánh điều kiện có Guard.
- **Thanh Phân nhánh & Đồng bộ (Fork / Join)**: Thanh ngang/dọc cho các tiến trình song song.
- **Nút Kết thúc (Activity Final Node)**: Hình tròn hồng tâm (`◉`) đánh dấu kết thúc luồng.
- **Phân làn (Swimlanes / Partitions)**: Các cột dọc gom nhóm hành động theo từng Actor phụ trách.

```
   Sinh viên                   Hệ thống                   Giảng viên
      │                           │                          │
      ● (Bắt đầu)                 │                          │
      ▼                           │                          │
[ Điền Form Ứng tuyển ] ─────────►│                          │
                                  ▼                          │
                        [ Kiểm tra Điểm GPA ]                │
                                  │                          │
                                 ◇ (GPA >= 2.0?)             │
                                ╱ ╲                          │
                       [Không] ╱   ╲ [Hợp lệ]                │
                              ▼     ▼                        │
                        [Từ chối]  [ Gửi Thông Báo ] ───────►│
                                                             ▼
                                                    [ Thẩm định Hồ sơ ]
                                                             │
                                                             ▼
                                                    ( Duyệt / Từ chối )
```

---

## 3. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Sinh Sơ đồ Use Case & Activity Diagram</div>

```markdown
# TASK: Sinh Sơ đồ Use Case & Activity Diagram Chuẩn OMG UML
Bạn là Kiến trúc sư Mô hình hóa Hệ thống (UML Architect).

## Bối cảnh Đầu vào:
Nghiệp vụ / Tính năng: [MÔ TẢ NGHIỆP VỤ HOẶC TÍNH NĂNG TẠI ĐÂY]

## Yêu cầu Thực hiện:
1. Nhận diện toàn bộ Primary và Secondary Actors.
2. Vẽ Sơ đồ Use Case hoàn chỉnh gồm System Boundary, quan hệ «include» và «extend» (kèm Extension Point).
3. Vẽ Sơ đồ Hoạt động Phân làn (Activity Diagram with Swimlanes) thể hiện luồng tuần tự, rẽ nhánh điều kiện và luồng song song giữa các Actor.
4. Trình bày bằng cú pháp ASCII / Mermaid sạch sẽ và chuẩn hóa.
5. Giải thích ngữ nghĩa cho từng quan hệ include/extend được sử dụng.
```
</div>

---

## 4. Checklist Kiểm duyệt (Review Checklist)

- [ ] Tên các Use Case có được đặt theo cấu trúc Động từ + Danh từ (ví dụ: `Nộp Đơn`, `Duyệt Hồ Sơ`) không?
- [ ] Quan hệ `<<include>>` có được dùng đúng cho luồng bắt buộc và `<<extend>>` cho luồng tùy chọn không?
- [ ] Mọi nút rẽ nhánh hình thoi trong sơ đồ hoạt động đều có điều kiện bảo vệ (Guard Condition) rõ ràng không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>OMG UML v2.5.1 — Section 18: Use Cases, Section 15: Activities.</li>
  </ul>
</div>
