# Khám phá Domain & Phát biểu Bài toán (Domain Discovery)

**Khám phá Domain (Domain Discovery)** là quá trình khảo sát có phương pháp về môi trường kinh doanh nhằm xác định đúng bài toán gốc rễ, ranh giới phạm vi và mục tiêu trước khi đề xuất bất kỳ giải pháp phần mềm nào.

---

## 1. Định nghĩa & Mục đích

- **Định nghĩa**: Quá trình hợp tác giữa kỹ sư, chuyên viên phân tích và AI Agent để đào sâu thực tế kinh doanh, bóc tách vấn đề cốt lõi.
- **Mục đích**: Tránh việc xây dựng phần mềm giải quyết sai bài toán. Đội ngũ kỹ thuật hiểu sâu về nghiệp vụ sẽ tự đưa ra các quyết định kiến trúc chính xác và tối ưu nhất.

---

## 2. Khi nào Sử dụng & Ai là Người Thực hiện?

- **Thời điểm**: Bắt đầu dự án mới, phát triển tính năng lớn, hoặc khi tái cấu trúc (refactor) một hệ thống cũ.
- **Đối tượng**: Product Owner, Kiến trúc sư Hệ thống, Tech Lead và AI Agent phân tích.

---

## 3. Quy trình 5 Bước Khám phá Nghiệp vụ

```
┌─────────────────────────────────────────────────────────────┐
│                 QUY TRÌNH KHÁM PHÁ 5 BƯỚC                   │
├─────────────────────────────────────────────────────────────┤
│ Bước 1: Tiếp nhận ý tưởng & mục tiêu ban đầu                │
│ Bước 2: Đào sâu nguyên nhân gốc rễ (Kỹ thuật 5 Whys)        │
│ Bước 3: Phân định ranh giới Bounded Context                 │
│ Bước 4: Thiết lập chỉ số đo lường thành công (Success KPI)  │
│ Bước 5: Phân loại thông tin ([CONFIRMED], [QUESTION], v.v.) │
└─────────────────────────────────────────────────────────────┘
```

### Kỹ thuật Đào sâu 5 Whys
Khi khách hàng yêu cầu: *"Chúng tôi cần hệ thống tự động sinh file PDF CV cho sinh viên."*
1. *Tại sao?* Vì giảng viên hướng dẫn mất quá nhiều thời gian duyệt các file Word lộn xộn.
2. *Tại sao?* Vì sinh viên nộp hồ sơ không theo chuẩn, thường xuyên thiếu điểm GPA và môn tiên quyết.
3. *Tại sao?* Vì nhà trường chưa có cổng nộp đơn trực tuyến có validation dữ liệu đầu vào.
4. *Bài toán gốc rễ*: Vấn đề thực sự là **thiếu cổng xác thực điều kiện ứng tuyển có cấu trúc**, chứ không phải là tính năng sinh PDF.

---

## 4. Ví dụ Thực tế: Quản lý Thực tập Đại học

### Mẫu Phát biểu Bài toán Chuẩn hóa
- **Hiện trạng**: 1.200 sinh viên ngành CNTT nộp đơn thực tập vào 150 doanh nghiệp đối tác thủ công qua email và Google Sheet.
- **Nỗi đau chính**: 35% hồ sơ thực tập bị chậm tiến độ qua kỳ học do giảng viên không thể theo dõi trạng thái phê duyệt theo thời gian thực.
- **Kết quả mong đợi**: Cổng thông tin tập trung quản lý quy trình nộp đơn với các cổng duyệt rõ ràng và cảnh báo SLA tự động.

---

## 5. Các Sai lầm Thường gặp (Anti-Patterns)

| Sai lầm phổ biến | Hậu quả | Thực hành đúng |
| :--- | :--- | :--- |
| **Vội vàng đưa ra giải pháp kỹ thuật** | Nhảy ngay vào "Hãy dựng microservice dùng Kafka" | Phát biểu bài toán độc lập với mọi công nghệ |
| **Chấp nhận mục tiêu mơ hồ** | "Làm cho hệ thống chạy nhanh và hiện đại hơn" | Định lượng: "Rút ngắn thời gian duyệt hồ sơ từ 7 ngày xuống dưới 24 giờ" |
| **Bỏ qua ranh giới tổ chức** | Gộp chung tính toán học phí, chấm điểm và tuyển dụng vào 1 module | Phân định rõ ràng các Bounded Context từ đầu |

---

## 6. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Khám phá Nghiệp vụ & Phân tích Gốc rễ</div>

```markdown
# TASK: Khám phá Domain & Phát biểu Bài toán
Bạn là Chuyên gia Phân tích Hệ thống (System Analyst) và Kiến trúc sư Domain-Driven Design (DDD).

## Bối cảnh Đầu vào:
Tôi muốn phát triển tính năng / hệ thống về: [MÔ TẢ Ý TƯỞNG HOẶC TÍNH NĂNG Ở ĐÂY].

## Yêu cầu Thực hiện:
1. Áp dụng kỹ thuật "5-Whys" để bóc tách nỗi đau nghiệp vụ gốc rễ.
2. Lập bản Phát biểu Bài toán chuẩn hóa (Hiện trạng, Nỗi đau chính, Kết quả mong đợi, Chỉ số đo lường).
3. Phân chia các Bounded Context đề xuất (Core Domain, Supporting Subdomain, Generic Subdomain).
4. Định dạng kết quả theo chuẩn Phân loại Thông tin:
   - [CONFIRMED] cho các dữ kiện đã nêu rõ trong đầu vào.
   - [ASSUMPTION] cho các suy diễn logic cần người kiểm chứng.
   - [QUESTION] cho các điểm chưa rõ bắt buộc phải trả lời trước khi thiết kế.
```
</div>

---

## 7. Checklist Kiểm duyệt (Review Checklist)

- [ ] Bài toán nghiệp vụ có được phát biểu độc lập với ngôn ngữ lập trình và framework không?
- [ ] Tiêu chí thành công có được lượng hóa bằng số liệu cụ thể không?
- [ ] Các Bounded Context đã tách biệt miền lõi (core domain) với hạ tầng dùng chung chưa?
- [ ] Mọi giả định đều đã được gắn nhãn `[ASSUMPTION]` tường minh chưa?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Evans, Eric (2003). <em>Domain-Driven Design: Tackling Complexity in the Heart of Software</em>. Addison-Wesley.</li>
    <li>IEEE 29148:2018 — Quy trình Kỹ nghệ Yêu cầu trong Vòng đời Phần mềm.</li>
  </ul>
</div>
