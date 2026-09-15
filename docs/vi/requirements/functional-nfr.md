# Yêu cầu Chức năng vs. Phi Chức năng (Functional & NFR)

Yêu cầu phần mềm được chia thành hai nhóm cơ bản: **Yêu cầu Chức năng (Functional Requirements - FR)** mô tả hệ thống *làm được những gì*, và **Yêu cầu Phi Chức năng (Non-Functional Requirements - NFR)** xác định hệ thống *vận hành tốt như thế nào* dưới các ràng buộc.

---

## 1. Phân loại Yêu cầu Chức năng và Phi Chức năng

```
┌─────────────────────────────────────────────────────────────┐
│                 PHÂN LOẠI YÊU CẦU HỆ THỐNG                  │
├─────────────────────────────────────────────────────────────┤
│ • Yêu cầu Chức năng (FR): Hành vi hệ thống, dữ liệu vào,    │
│   dữ liệu ra, biến đổi trạng thái, logic nghiệp vụ.         │
│                                                             │
│ • Yêu cầu Phi Chức năng (NFR): Thuộc tính chất lượng,       │
│   ngưỡng hiệu năng, bảo mật, độ sẵn sàng, khả năng mở rộng. │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Mô hình Chất lượng Phần mềm Quốc tế ISO/IEC 25010

Để tránh bỏ sót các thuộc tính vận hành sống còn, kỹ sư phân loại NFR dựa trên chuẩn **ISO/IEC 25010**:

| Thuộc tính Chất lượng | Định nghĩa Chuẩn | Ví dụ Yêu cầu Cụ thể |
| :--- | :--- | :--- |
| **Hiệu năng (Performance)** | Thời gian phản hồi, thông lượng, tiêu thụ tài nguyên | *NFR-PERF-01*: Thời gian phản hồi P95 của API tìm kiếm **shall** dưới 150ms tại mức tải 1.000 QPS. |
| **Bảo mật (Security)** | Bảo mật thông tin, tính toàn vẹn, xác thực & phân quyền | *NFR-SEC-01*: Toàn bộ mật khẩu **shall** được băm bằng Argon2id với tham số m=65536, t=3, p=4. |
| **Độ tin cậy & Sẵn sàng** | Thời gian uptime, khả năng chịu lỗi, phục hồi sau sự cố | *NFR-REL-01*: Mức độ sẵn sàng của hệ thống **shall** đạt tối thiểu 99.9% uptime mỗi tháng. |
| **Khả năng Bảo trì** | Tính module hóa, độ dễ đọc, khả năng kiểm thử | *NFR-MNT-01*: Độ phủ kiểm thử tự động (Unit Test Coverage) của tầng Service **shall** đạt tối thiểu 85%. |
| **Khả dụng & Trợ năng** | Độ dễ học, khả năng tiếp cận người khuyết tật (WCAG) | *NFR-ACC-01*: Toàn bộ giao diện UI **shall** tuân thủ chuẩn tương phản màu sắc WCAG 2.1 Cấp AA. |
| **Tương thích (Compatibility)**| Khả năng liên thông với các hệ thống và giao thức ngoài | *NFR-CMP-01*: Hệ thống **shall** xuất lịch phỏng vấn theo định dạng chuẩn iCalendar (RFC 5545). |

---

## 3. Định lượng Hóa NFR (Xóa bỏ Câu từ Cảm tính)

Một NFR không thể đo lường được là một NFR vô giá trị. Tuyệt đối không chấp nhận các câu như *"Hệ thống phải an toàn và chạy nhanh."*

```
┌─────────────────────────────────────────────────────────────┐
│                 MẪU ĐỊNH LƯỢNG HÓA NFR                      │
├─────────────────────────────────────────────────────────────┤
│ Đơn vị đo (Scale): Mili-giây, phần trăm, số truy vấn/giây   │
│ Hiện trạng (Baseline): Thời gian phản hồi cũ là 1.2 giây    │
│ Ngưỡng bắt buộc (Target): Thời gian phản hồi < 250ms        │
│ Điều kiện tải (Condition): Dưới tải 5.000 người dùng đồng thời│
│ Công cụ kiểm chứng (Tool): Chạy k6 / Gatling tự động trong CI│
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Bóc tách & Định lượng Yêu cầu Phi Chức năng</div>

```markdown
# TASK: Đặc tả Yêu cầu Chức năng (FR) và Phi Chức năng (NFR)
Bạn là Kiến trúc sư Chất lượng Phần mềm (Quality Architect).

## Bối cảnh Đầu vào:
Tính năng / Hệ thống: [MÔ TẢ TÍNH NĂNG HOẶC HỆ THỐNG]

## Yêu cầu Thực hiện:
1. Bóc tách tính năng thành danh sách Yêu cầu Chức năng (FR) rõ ràng.
2. Với mỗi nhóm chất lượng trong ISO/IEC 25010 (Hiệu năng, Bảo mật, Tin cậy, Bảo trì, Khả dụng), định nghĩa ít nhất một NFR đã được lượng hóa.
3. Đối với mỗi NFR, chỉ định rõ: Đơn vị đo, Ngưỡng mục tiêu (Target), Ngưỡng xấu nhất chấp nhận được (Worst Case) và Công cụ kiểm chứng tự động (k6, SonarQube, OWASP ZAP).
4. Gắn nhãn: [CONFIRMED], [ASSUMPTION], [PROPOSAL], [QUESTION].
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Mọi NFR đều có chỉ số đo lường bằng số cụ thể có thể chạy test tự động trong CI/CD không?
- [ ] Các yêu cầu bảo mật có tham chiếu đến tiêu chuẩn an toàn (OWASP, NIST) không?
- [ ] Tiêu chí hiệu năng có gắn liền với điều kiện tải (số người dùng, dung lượng dữ liệu) không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>ISO/IEC 25010:2023 — Đánh giá Thuộc tính Chất lượng Phần mềm (SQuaRE).</li>
    <li>Gilb, Tom (2005). <em>Competitive Engineering: A Handbook For Systems Engineering</em>. Elsevier.</li>
  </ul>
</div>
