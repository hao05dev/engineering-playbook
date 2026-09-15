# Phong cách & Mẫu Kiến trúc (Architecture Styles)

Lựa chọn phong cách kiến trúc phù hợp là quyết định kỹ thuật mang tính sống còn đối với mọi dự án phần mềm. Tài liệu này so sánh toàn diện giữa **Kiến trúc Phân tầng (Layered)**, **Modular Monolith**, **Microservices**, và **Kiến trúc Hướng sự kiện (EDA)**, cung cấp bộ tiêu chí ra quyết định cho kỹ sư và AI Agent.

---

## 1. 4 Phong cách Kiến trúc Phổ biến

```
┌─────────────────────────────────────────────────────────────┐
│                 CÁC PHONG CÁCH KIẾN TRÚC                    │
├─────────────────────────────────────────────────────────────┤
│ 1. Kiến trúc Phân tầng (Layered/N-Tier): Tách lớp cổ điển   │
│ 2. Modular Monolith: Tách module nghiệp vụ trong 1 deploy   │
│ 3. Microservices: Chia nhỏ thành các service độc lập phân tán│
│ 4. Kiến trúc Hướng sự kiện (EDA): Giao tiếp bất đồng bộ qua bus│
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Bảng Ma trận Đánh đổi Toàn diện

| Tiêu chí | Monolith Cổ điển | Modular Monolith | Microservices | Event-Driven (EDA) |
| :--- | :--- | :--- | :--- | :--- |
| **Đơn vị Deploy** | 1 file thực thi duy nhất | 1 file thực thi duy nhất | Nhiều container / pod | Nhiều services + Broker |
| **Lưu trữ Dữ liệu** | 1 Database chung | 1 DB / Cô lập Schema | Database riêng cho từng service| Event Store phân tán |
| **Giao tiếp** | Gọi hàm trong bộ nhớ (RAM)| Gọi interface trong RAM | Mạng (REST / gRPC) | Sự kiện bất đồng bộ (Kafka)|
| **Độ phức tạp Vận hành**| Rất thấp | Thấp | Rất cao (K8s, mesh, tracing) | Cao (Thứ tự sự kiện, bù lỗi)|
| **Mô hình Giao dịch** | Giao dịch ACID chuẩn | Giao dịch ACID chuẩn | 2PC / Saga (Nhất quán sau) | Saga / Nhất quán sau |
| **Khuyến nghị cho** | Ứng dụng CRUD nhỏ | **90% Dự án SaaS & Doanh nghiệp**| Đội ngũ rất lớn (>50 devs) | Xử lý luồng dữ liệu thời gian thực|

---

## 3. Điểm Cân bằng Hoàn hảo: Kiến trúc Modular Monolith

Đối với đại đa số ứng dụng, **Modular Monolith** mang lại tính cô lập nghiệp vụ tuyệt vời mà không phải gánh chịu sự phức tạp của hệ thống phân tán:

```
┌─────────────────────────────────────────────────────────────────┐
│                 RANH GIỚI MODULAR MONOLITH                      │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐         ┌─────────────────────────┐ │
│ │  Module: Thực tập       │         │  Module: Thông báo      │ │
│ │  - Logic Nghiệp vụ      │         │  - Gửi Email / SMS      │ │
│ │  - Package Private Repo │         │  - Quản lý Mẫu Mail     │ │
│ └────────────┬────────────┘         └────────────▲────────────┘ │
│              │ Sự kiện trong bộ nhớ (In-Memory)  │              │
│              └───────────────────────────────────┘              │
│                                                                 │
│ 1 Ứng dụng Spring Boot / Node.js duy nhất                       │
│ 1 Cơ sở dữ liệu PostgreSQL với Schema phân tách                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Quy tắc AI Phản biện Đề xuất Microservices

> [!WARNING]
> **AI Bắt buộc phải Phản biện khi Thấy Đề xuất Microservices Sớm**
> Nếu lập trình viên nói: *"Dự án này có 3 người làm, hãy dựng theo microservices dùng Kafka."*
> AI BẮT BUỘC phải phản biện:
> *"Vấn đề tiềm ẩn: Microservices gây ra độ trễ mạng, độ phức tạp giao dịch phân tán (Saga) và chi phí vận hành DevOps rất lớn. Với đội ngũ 3 người, Modular Monolith mang lại ranh giới nghiệp vụ tương đương nhưng tốc độ phát triển nhanh hơn gấp 5 lần. Khuyến nghị: Chọn Phương án 2 (Modular Monolith)."*

---

## 5. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Đánh giá Phong cách Kiến trúc & Phân tích Đánh đổi</div>

```markdown
# TASK: Đánh giá Phong cách Kiến trúc & Phân tích Đánh đổi (Trade-offs)
Bạn là Kiến trúc sư Phần mềm Cấp cao (Principal Architect).

## Bối cảnh Đầu vào:
Dự án & Yêu cầu: [MÔ TẢ DỰ ÁN, QUY MÔ ĐỘI NGŨ, LƯỢNG TRUY CẬP DỰ KIẾN]
Phong cách Đề xuất: [NHẬP PHONG CÁCH KIẾN TRÚC MUỐN ĐÁNH GIÁ]

## Yêu cầu Thực hiện:
1. Đánh giá kiến trúc đề xuất dựa trên: Độ phức tạp vận hành, Độ trễ mạng, Tính nhất quán dữ liệu và Áp lực nhận thức của đội ngũ (Cognitive Load).
2. Nếu kiến trúc bị thiết kế quá mức (over-engineered), hãy phản biện và đưa ra 3 phương án kiến trúc thay thế kèm bảng so sánh ưu/nhược điểm.
3. Đưa ra khuyến nghị giải pháp kiến trúc tối ưu nhất kèm giải trình lý do.
4. Gắn nhãn phân loại: [CONFIRMED], [ASSUMPTION], [PROPOSAL], [QUESTION].
```
</div>

---

## 6. Checklist Kiểm duyệt (Review Checklist)

- [ ] Phong cách kiến trúc có phù hợp với quy mô đội ngũ và năng lực vận hành hiện tại không?
- [ ] Ranh giới giữa các module có được bảo vệ bằng rào chắn package hoặc interface nội bộ không?
- [ ] Đã tính toán phương án xử lý giao dịch phân tán (Saga / Outbox Pattern) nếu chọn Microservices chưa?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Fowler, Martin (2015). <em>MonolithFirst</em>. martinfowler.com.</li>
    <li>Newman, Sam (2021). <em>Building Microservices (2nd Edition)</em>. O'Reilly Media.</li>
    <li>Richards, Mark & Ford, Neal (2020). <em>Fundamentals of Software Architecture</em>. O'Reilly Media.</li>
  </ul>
</div>
