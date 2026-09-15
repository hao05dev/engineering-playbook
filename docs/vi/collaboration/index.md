# Tổng quan Giao thức Hợp tác AI (AI Collaboration Protocol)

Khi các mô hình AI phát triển từ công cụ gợi ý code đơn thuần thành các tác nhân lập trình tự chủ (autonomous coding agents), rủi ro kỹ thuật lớn nhất không còn nằm ở *khả năng sinh cú pháp* mà chuyển sang *sai lệch kiến trúc và các giả định ngầm không được kiểm chứng*.

**Giao thức Hợp tác AI (AI Collaboration Protocol)** thiết lập các hướng dẫn và rào chắn có cấu trúc nhằm đảm bảo trợ lý AI và kỹ sư phần mềm con người phối hợp với độ chính xác cao nhất, tính minh bạch tuyệt đối và không có sự mơ hồ.

---

## 1. Mô hình Cốt lõi: Kỹ thuật Có cấu trúc vs. Vibe Coding

```
┌─────────────────────────────────────────────────────────────────┐
│               AI COLLABORATION PARADIGM SPECTRUM                │
├─────────────────────────────────────────────────────────────────┤
│ "Vibe Coding" (Mong manh & Mờ mịt):                             │
│  Người dùng: "Tạo app thực tập" ──> AI sinh ngay 500 dòng code  │
│  chưa kiểm thử, chứa đầy giả định ngầm, query không index, và   │
│  bỏ sót hoàn toàn các trường hợp biên (edge cases).             │
│                                                                 │
│ "Kỹ thuật Theo Giao thức" (Bền vững & Xác định):                │
│  Khám phá ➔ Phân tích ➔ Đề xuất ➔ Xác nhận ➔ Tài liệu ➔ Thi công│
│  Mọi giả định đều gắn thẻ `[ASSUMPTION]`, mọi thay đổi được     │
│  theo dõi qua ma trận truy vết, và code chỉ được viết sau khi   │
│  đã đồng thuận về mặt kiến trúc.                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Các Trụ cột Cốt lõi của Giao thức Hợp tác

1. **Phân loại Thông tin Minh bạch**: Mọi phát biểu do AI hay kỹ sư đưa ra đều được gắn nhãn `[CONFIRMED]`, `[ASSUMPTION]`, `[PROPOSAL]`, hoặc `[QUESTION]`.
2. **Quy trình 6 Giai đoạn Xác định**: Công việc tiến triển qua từng cổng kiểm soát hệ thống; AI không bao giờ nhảy cóc thẳng vào viết code khi yêu cầu còn mập mờ.
3. **Giao thức Phản biện Mang tính Xây dựng (AI Challenge)**: AI có nghĩa vụ chỉ ra các nút thắt cổ chai về khả năng mở rộng, lỗ hổng bảo mật và anti-patterns thay vì đồng ý một cách mù quáng với các chỉ thị dưới chuẩn.
4. **Tính Truy vết Toàn diện (End-to-End Traceability)**: Mỗi dòng code sinh ra đều kết nối trực tiếp ngược về mã yêu cầu IEEE 29148 và bộ kiểm thử tự động.

---

## 3. Lộ trình Nội dung

- [Giao thức Hợp tác 6 Giai đoạn](./six-stage-protocol.md) — Quy trình chuẩn từ khám phá ban đầu đến nghiệm thu triển khai.
- [Hệ thống Phân loại Thông tin](./information-classification.md) — 4 nhãn phân loại (`[CONFIRMED]`, `[ASSUMPTION]`, `[PROPOSAL]`, `[QUESTION]`).
- [Vòng lặp Khám phá & Đặt câu hỏi Sâu](./discovery-questioning-loop.md) — Giao thức 10 câu hỏi đào sâu khi yêu cầu mơ hồ.
- [Ma trận Truy vết & Phân tích Tác động Thay đổi](./traceability-change-impact.md) — Quản lý thay đổi yêu cầu và phân tích ảnh hưởng lan truyền.
- [Quy tắc Phản biện AI & Đội ngũ Reviewer Chuyên biệt](./ai-challenge-reviewer-checklists.md) — Danh mục kiểm thử dành riêng cho AI Reviewer về Yêu cầu, UML, Kiến trúc, CSDL, API và UI/UX.
