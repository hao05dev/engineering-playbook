# 04 — Phân tích Hệ thống & UML (OMG UML)

**Phân tích Hệ thống (System Analysis)** đóng vai trò làm cầu nối giữa các yêu cầu nghiệp vụ và kiến trúc phần mềm thông qua các ngôn ngữ mô hình hóa trực quan, chuẩn hóa. Tiêu chuẩn **OMG Unified Modeling Language (OMG UML v2.5.1)** cung cấp hệ thống ký hiệu đồ họa chính thức được các kỹ sư và AI Agent sử dụng để thiết kế, phân tích và giao tiếp kỹ thuật.

---

## Vai trò của OMG UML trong Kỷ nguyên AI

Nếu không có sơ đồ UML chuẩn hóa, AI Agent sẽ diễn đạt hệ thống bằng văn bản dễ gây hiểu lầm. UML hoạt động như một bản vẽ kỹ thuật trực quan:

```
┌─────────────────────────────────────────────────────────────┐
│                    2 NHÓM SƠ ĐỒ CHÍNH TRONG UML             │
├─────────────────────────────────────────────────────────────┤
│ 1. Sơ đồ Cấu trúc (Structural - Giải phẫu tĩnh)             │
│    └── Sơ đồ Lớp (Class), Domain Model, Component, Deployment│
│                                                             │
│ 2. Sơ đồ Hành vi (Behavioral - Tương tác động)              │
│    └── Sơ đồ Use Case, Hoạt động (Activity), Tuần tự, State │
└─────────────────────────────────────────────────────────────┘
```

---

## Các Mô-đun Trọng tâm trong Phần này

1. [Sơ đồ Use Case & Sơ đồ Hoạt động](./use-case-activity): Ranh giới chức năng, tương tác Actor và luồng hoạt động.
2. [Sơ đồ Tuần tự & Sơ đồ Trạng thái](./sequence-state): Thời gian trao đổi thông điệp, vòng đời bất đồng bộ và chuyển dịch trạng thái.
3. [Sơ đồ Lớp & Mô hình Domain](./class-domain-model): Cấu trúc hướng đối tượng, quan hệ kết tập và Domain Model.
4. [Sơ đồ Thành phần & Triển khai](./component-deployment): Ranh giới module, môi trường runtime và cấu trúc mạng.
5. [Quy tắc Quan hệ UML & Checklist Review](./relationship-rules-review): Bản chất ngữ nghĩa (`<<include>>` vs `<<extend>>`, generalization) và checklist kiểm duyệt.

---

## Các Quy tắc Ký hiệu Chuẩn của OMG UML

Khi sinh sơ đồ, AI Agent bắt buộc phải tuân thủ nghiêm ngặt chuẩn ngữ nghĩa OMG UML 2.5.1:
- **Actor (Tác nhân)**: Đại diện cho vai trò, không phải cá nhân cụ thể (ví dụ: `Sinh viên`, không phải `Nguyễn Văn A`).
- **Use Case**: Hình elip đại diện cho mục tiêu hoàn chỉnh của người dùng, đặt tên theo cụm Động từ - Danh từ (ví dụ: `Nộp Hồ Sơ`).
- **Quan hệ Include (`<<include>>`)**: Nhánh con bắt buộc phải thực thi vô điều kiện.
- **Quan hệ Extend (`<<extend>>`)**: Nhánh mở rộng tùy chọn chỉ thực thi khi thỏa mãn điều kiện tại Extension Point.

<div class="ref-box">
  <strong>Chuẩn Tham chiếu Chính thức:</strong>
  <ul>
    <li><a href="https://www.omg.org/uml/" target="_blank" rel="noopener">Đặc tả Kỹ thuật Chuẩn OMG Unified Modeling Language (UML) v2.5.1</a></li>
    <li>Fowler, Martin (2003). <em>UML Distilled: Hướng dẫn Ngắn gọn về Ngôn ngữ Mô hình hóa Đối tượng</em>. Addison-Wesley.</li>
  </ul>
</div>
