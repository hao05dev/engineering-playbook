# Checklist Review ADR & Mẫu Prompt AI (ADR Review)

Để đảm bảo các quyết định kiến trúc luôn chặt chẽ và có tính thực thi cao, mỗi bản ADR cần trải qua quá trình review kỹ lưỡng. Hướng dẫn này cung cấp **Bộ Checklist Kiểm duyệt ADR** và các **Mẫu Prompt AI** chuyên dụng để phản biện và duy trì sổ nhật ký quyết định kiến trúc.

---

## 1. Bộ Checklist Kiểm duyệt ADR (ADR Review Checklist)

Trước khi chuyển trạng thái một bản ADR sang `accepted`, hãy đối chiếu qua các tiêu chí sau:

- [ ] **1. Tính Cụ thể của Bối cảnh**: Phần bối cảnh có mô tả đúng vấn đề thực tế mà không áp đặt sẵn kết quả không?
- [ ] **2. Trọng lực Quyết định (Decision Drivers)**: Có ít nhất 2 trọng lực kiến trúc đo lường được (độ trễ, chi phí, tốc độ dev) không?
- [ ] **3. Các Phương án Thực tế**: Các phương án thay thế có phải là giải pháp thực tế hay chỉ là phương án "bù nhìn" dựng lên cho có?
- [ ] **4. Minh bạch Hệ quả Tiêu cực**: Các đánh đổi, gánh nặng vận hành và rủi ro có được nêu rõ ràng, trung thực không?
- [ ] **5. Khả năng Đảo ngược (Reversibility)**: Có rõ ràng mức độ khó khăn nếu sau này cần đảo ngược hoặc thay thế quyết định này không?
- [ ] **6. Không Xung đột**: Quyết định mới có mâu thuẫn với các bản ADR đã được chấp thuận trước đó không?

---

## 2. Tổ chức Thư mục Quyết định Kiến trúc trong Git

Lưu trữ các bản ADR trong thư mục chuyên biệt của repository:

```
your-project/
└── docs/
    └── decisions/
        ├── 0001-adopt-modular-monolith.md
        ├── 0002-use-postgresql-for-persistence.md
        ├── 0003-jwt-stateless-authentication.md
        └── README.md  (Bảng mục lục tổng hợp trạng thái các bản ADR)
```

---

## 3. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Phản biện & Kiểm duyệt Bản ghi ADR</div>

```markdown
# TASK: Phản biện Kỹ thuật & Kiểm toán Bản ghi Quyết định Kiến trúc (ADR)
Bạn là Chuyên gia Đánh giá Kiến trúc Cấp cao (Principal Architecture Reviewer).

## Bản ADR Dự thảo Đầu vào:
[DÁN NỘI DUNG DỰ THẢO BẢN ADR TẠI ĐÂY]

## Yêu cầu Thực hiện:
1. Kiểm toán bản ADR dựa trên Bộ Checklist 6 Điểm Kiểm duyệt ADR.
2. Tập trung phản biện xem các "Phương án Cân nhắc" có được đánh giá công bằng không và các hệ quả tiêu cực có bị nói giảm nói tránh không.
3. Tìm kiếm các chi phí ngầm (gánh nặng bảo trì, độ phức tạp viết test, nguy cơ vendor lock-in).
4. Đưa ra Kết luận Kiểm duyệt chính thức:
   - ACCEPT: Quyết định hoàn toàn xác đáng và lập luận chặt chẽ.
   - REVISE: Cần bổ sung giải trình về các đánh đổi hoặc phương án còn thiếu.
   - REJECT: Quyết định gây ra nợ kiến trúc không thể chấp nhận được.
```
</div>

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li><a href="https://adr.github.io/" target="_blank" rel="noopener">Công cụ và Quy chuẩn Thư mục ADR của Tổ chức ADR GitHub</a></li>
  </ul>
</div>
