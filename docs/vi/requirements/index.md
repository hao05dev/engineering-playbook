# 03 — Kỹ nghệ Yêu cầu (Requirements Engineering — IEEE 29148)

**Kỹ nghệ Yêu cầu (Requirements Engineering)** là quy trình kỹ thuật có kỷ luật bao gồm việc thu thập, phân tích, đặc tả, thẩm định và quản lý các yêu cầu phần mềm xuyên suốt vòng đời. Trong phương pháp luận AI-SDLC, tài liệu yêu cầu đóng vai trò là bản hợp đồng tiền định giữa kỹ sư phần mềm và AI Agent.

---

## Vai trò của Tiêu chuẩn Quốc tế IEEE 29148

Tiêu chuẩn quốc tế **ISO/IEC/IEEE 29148:2018** (Quy trình Kỹ nghệ Yêu cầu trong Vòng đời Phần mềm và Hệ thống) là nền tảng tham chiếu cốt lõi cho phần này. Tiêu chuẩn này thiết lập các tiêu chí khắt khe về chất lượng của câu phát biểu yêu cầu, cấu trúc tài liệu đặc tả và quy trình xác minh.

```
┌─────────────────────────────────────────────────────────────┐
│                 CHUỖI GIÁ TRỊ KỸ NGHỆ YÊU CẦU               │
├─────────────────────────────────────────────────────────────┤
│ 1. Yêu cầu Doanh nghiệp (BRD) ──► Mục tiêu Kinh doanh       │
│ 2. Yêu cầu Sản phẩm (PRD) ──► Trải nghiệm & Phạm vi Tính năng│
│ 3. Đặc tả Phần mềm (SRS) ──► Hợp đồng Kỹ thuật Chi tiết     │
│ 4. Thẩm định & Kiểm tra (V&V) ──► Kiểm toán Chất lượng      │
│ 5. Ma trận Truy vết (Traceability) ──► Liên kết Mục tiêu-Code│
└─────────────────────────────────────────────────────────────┘
```

---

## Các Mô-đun Trọng tâm trong Phần này

1. [Nền tảng Chuẩn IEEE 29148](./ieee-29148): 9 đặc tính chất lượng của câu yêu cầu chuẩn mực.
2. [Phân tầng Tài liệu: BRD vs. PRD vs. SRS](./brd-prd-srs): Phân biệt 3 tầng tài liệu yêu cầu.
3. [Yêu cầu Chức năng vs. Phi Chức năng](./functional-nfr): Năng lực hành vi vs thuộc tính chất lượng (ISO 25010).
4. [User Stories & Đặc tả Use Case](./user-stories-use-cases): Tiêu chí chấp nhận Given-When-Then và Use Case chuẩn.
5. [Thẩm định, Kiểm tra & Ma trận Truy vết](./validation-traceability): Kiểm toán yêu cầu và duy trì ma trận truy vết hai chiều.

---

## 9 Đặc tính của Câu Yêu cầu Chuẩn mực (IEEE 29148)

Mọi yêu cầu do AI Agent sinh ra hoặc thẩm định bắt buộc phải thỏa mãn 9 tiêu chí của IEEE 29148:
- **Không mơ hồ (Unambiguous)**: Chỉ có duy nhất một cách hiểu logic.
- **Đầy đủ (Complete)**: Bao quát toàn bộ bối cảnh, điều kiện biên và xử lý lỗi.
- **Kiểm chứng được (Verifiable/Testable)**: Có thể viết test tự động hoặc manual để nghiệm thu.
- **Nhất quán (Consistent)**: Không mâu thuẫn với các yêu cầu khác trong hệ thống.
- **Khả thi (Feasible)**: Hiện thực hóa được trong giới hạn công nghệ và tài nguyên hiện có.
- **Truy vết được (Traceable)**: Liên kết hai chiều tới mục tiêu kinh doanh, test case và code.
- **Có thể chỉnh sửa (Modifiable)**: Cấu trúc module hóa, không sao chép lặp lại rải rác.
- **Đơn nhất (Singular)**: Mỗi câu phát biểu chỉ mô tả một năng lực duy nhất.
- **Cần thiết (Necessary)**: Đóng góp trực tiếp vào mục tiêu của các bên liên quan.

<div class="ref-box">
  <strong>Chuẩn Tham chiếu Chính thức:</strong>
  <ul>
    <li><a href="https://standards.ieee.org/ieee/29148/12262/" target="_blank" rel="noopener">ISO/IEC/IEEE 29148:2018 Standard for Requirements Engineering</a></li>
    <li>ISO/IEC 25010:2023 — Đánh giá Thuộc tính Chất lượng Phần mềm (SQuaRE)</li>
  </ul>
</div>
