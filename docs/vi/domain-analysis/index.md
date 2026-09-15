# 02 — Phân tích Nghiệp vụ & Khám phá Domain

Trước khi viết tài liệu đặc tả, tạo bảng dữ liệu hay thiết kế endpoint API, đội ngũ kỹ sư và AI Agent bắt buộc phải hiểu sâu sắc bối cảnh nghiệp vụ. Phân khúc **Phân tích Nghiệp vụ & Domain** trang bị cho AI Agent năng lực tư duy về bài toán kinh doanh thực tế, phân tích động cơ của các bên liên quan, phát hiện giả định ngầm và chất vấn các điểm mơ hồ.

---

## Tại sao Phân tích Domain lại Sống còn đối với AI?

Nếu thiếu phân tích domain bài bản, AI Agent sẽ vội vàng sinh code dựa trên suy đoán chủ quan. Hậu quả là:
- Xây dựng phần mềm giải quyết sai bài toán thực tế của người dùng.
- Thuật ngữ nghiệp vụ xung đột nhau giữa Database, API và UI.
- Bỏ sót các ca ngoại lệ và rủi ro vận hành chỉ phát hiện được khi lên production.

```
┌─────────────────────────────────────────────────────────────┐
│                 QUY TRÌNH PHÂN TÍCH DOMAIN                  │
├─────────────────────────────────────────────────────────────┤
│ 1. Phát biểu Bài toán ──► Thấu hiểu nỗi đau thực sự         │
│ 2. Phân tích Stakeholder ──► Xác định Actor và mục tiêu     │
│ 3. Quy trình & Quy tắc ──► Vẽ luồng sự kiện và bất biến     │
│ 4. Trạng thái & Ngoại lệ ──► Mô hình hóa các tình huống lỗi │
│ 5. Bắt lỗi Mơ hồ & Giả định ──► Phản biện các suy diễn      │
└─────────────────────────────────────────────────────────────┘
```

---

## Các Mô-đun Trọng tâm trong Phần này

1. [Khám phá Domain & Phát biểu Bài toán](./discovery): Chuyển hóa ý tưởng sơ khai thành phát biểu bài toán rõ ràng.
2. [Phân tích Stakeholder & Actor](./stakeholders): Phân biệt Actor chính, Actor phụ và các xung đột lợi ích.
3. [Quy trình, Quy tắc & Sự kiện Nghiệp vụ](./processes-rules): Mô hình hóa quy trình vận hành, quy tắc bất biến và Domain Event.
4. [Trạng thái, Ràng buộc & Ngoại lệ](./state-exceptions): Vòng đời thực thể, ràng buộc nghiệp vụ và thiết kế xử lý lỗi phòng thủ.
5. [Thuật ngữ, Giả định & Bắt lỗi Mơ hồ](./glossary-ambiguity): Xây dựng Ngôn ngữ Chung (Ubiquitous Language) và rà soát giả định.

---

## Tư duy của AI trong vai trò Chuyên viên Phân tích

Trong phần này, AI đóng vai trò là **Lead Business Analyst**. Khi nhận được ý tưởng từ lập trình viên, AI sẽ:
- **Chất vấn các giả định** trước khi chấp nhận.
- **Phát hiện quy tắc nghiệp vụ còn thiếu** thay vì tự ý bổ sung ngầm.
- **Phân tích mâu thuẫn** giữa các yêu cầu được đưa ra và ràng buộc thực tế.

<div class="ref-box">
  <strong>Chuẩn Tham chiếu Chính thức:</strong>
  <ul>
    <li>Domain-Driven Design (Eric Evans) — Bounded Contexts & Ubiquitous Language</li>
    <li>BABOK Guide (Business Analysis Body of Knowledge v3.0) — Chuẩn mực Phân tích Nghiệp vụ Quốc tế</li>
  </ul>
</div>
