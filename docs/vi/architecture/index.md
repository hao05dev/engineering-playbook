# 05 — Kiến trúc Phần mềm (Software Architecture — C4 & arc42)

**Kiến trúc Phần mềm (Software Architecture)** là cấu trúc nền tảng của một hệ thống, được hiện thực hóa qua các thành phần phần mềm, mối quan hệ giữa chúng, các thuộc tính vận hành và các nguyên lý thiết kế. Kiến trúc thiết lập các ranh giới cấp cao và các quyết định đánh đổi định hình khả năng bảo trì, mở rộng và bảo mật dài hạn.

---

## Tại sao Khung Kiến trúc Lại Sống còn đối với AI Agent?

Nếu không có các khung kiến trúc chuẩn hóa, AI Agent sẽ thiết kế hệ thống tùy tiện với các ranh giới phân tầng lộn xộn. Việc áp dụng các chuẩn quốc tế như **C4 Model** và **arc42** đảm bảo:
- Kỹ sư và AI Agent có chung một mô hình tư duy trực quan qua các cấp độ trừu tượng.
- Thiết kế hệ thống minh bạch, dễ dàng review và được tài liệu hóa theo cấu trúc chuẩn.
- Các đánh đổi về thuộc tính chất lượng (độ trễ vs tính nhất quán, tính module vs độ phức tạp triển khai) được cân nhắc thấu đáo.

```
┌─────────────────────────────────────────────────────────────┐
│                 NỀN TẢNG KIẾN TRÚC PHẦN MỀM                 │
├─────────────────────────────────────────────────────────────┤
│ 1. Phong cách Kiến trúc ──► Monolith, Modular, Microservices│
│ 2. Trực quan hóa Kiến trúc ──► Mô hình C4 (Context đến Code)│
│ 3. Tài liệu Kiến trúc Chuẩn ──► Khung arc42 (12 Phần mục)   │
│ 4. Thuộc tính Chất lượng ──► ISO 25010 & Phân tích Đánh đổi │
└─────────────────────────────────────────────────────────────┘
```

---

## Các Mô-đun Trọng tâm trong Phần này

1. [Phong cách & Mẫu Kiến trúc](./styles-patterns): Phân tầng (Layered), Modular Monolith, Microservices và Kiến trúc Hướng sự kiện (EDA).
2. [Mô hình C4 Model](./c4-model): Trực quan hóa kiến trúc đa tầng (System Context, Container, Component, Code).
3. [Khung Tài liệu Kiến trúc arc42](./arc42-framework): Bộ khung tài liệu kiến trúc 12 phần chuẩn quốc tế.
4. [Thuộc tính Chất lượng & Phân tích Đánh đổi](./quality-attributes-tradeoffs): Cân bằng giữa khả năng mở rộng, độ sẵn sàng, hiệu năng và bảo mật.

---

## 4 Quy tắc Vàng trong Kiến trúc Phần mềm

1. **Kiến trúc Đi trước Mã nguồn**: Khóa chặt ranh giới domain, mô hình dữ liệu và trách nhiệm component trước khi bắt tay sinh code.
2. **Ưu tiên Sự Đơn giản Trước**: Luôn mặc định bắt đầu với một Modular Monolith sạch sẽ trước khi nhảy vào độ phức tạp của Microservices phân tán.
3. **Mọi Quyết định Kiến trúc đều là Đánh đổi**: Không có kiến trúc nào "hoàn hảo toàn diện". Luôn phải chỉ rõ cái giá phải trả cho mỗi lựa chọn công nghệ.
4. **Tài liệu hóa Chuẩn hóa**: Trình bày bản vẽ kiến trúc bằng Mô hình C4 và cấu trúc arc42.

<div class="ref-box">
  <strong>Chuẩn Tham chiếu Chính thức:</strong>
  <ul>
    <li><a href="https://c4model.com/" target="_blank" rel="noopener">Mô hình Trực quan hóa Kiến trúc Phần mềm C4 Model (Simon Brown)</a></li>
    <li><a href="https://arc42.org/" target="_blank" rel="noopener">arc42 — Khung Tài liệu Kiến trúc Phần mềm Chuẩn mực (Dr. Gernot Starke & Dr. Peter Hruschka)</a></li>
    <li>Bass, Len; Clements, Paul; Kazman, Rick (2021). <em>Software Architecture in Practice (4th Edition)</em>. Addison-Wesley.</li>
  </ul>
</div>
