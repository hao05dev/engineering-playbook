# Vòng lặp Khám phá & Đặt câu hỏi Sâu (Discovery & Questioning Loop)

Khi người dùng đưa ra các yêu cầu ngắn gọn hoặc mơ hồ (ví dụ: *"Thêm chức năng chấm điểm báo cáo"* hoặc *"Cho phép giáo viên quản lý thực tập"*), các trợ lý AI thông thường thường tự ý suy diễn hành vi ngầm, dẫn đến xung đột nghiêm trọng với yêu cầu nghiệp vụ thực tế.

**Giao thức 10 Câu hỏi Đào sâu (10-Point Probing Question Protocol)** giúp bóc tách một cách hệ thống các yêu cầu cốt lõi trước khi đưa ra bất kỳ quyết định kiến trúc hoặc viết code nào.

---

## 1. Khung 10 Câu hỏi Đào sâu Yêu cầu

```
┌─────────────────────────────────────────────────────────────────┐
│              10-POINT PROBING QUESTION PROTOCOL                 │
├─────────────────────────────────────────────────────────────────┤
│ 01. Mục tiêu Nghiệp vụ: Giải quyết bài toán đo lường được nào?  │
│ 02. Tác nhân & Phân quyền: Ai thực hiện, quyền RBAC là gì?     │
│ 03. Điều kiện Tiên quyết: Hệ thống cần ở trạng thái nào trước?  │
│ 04. Kích hoạt & Dữ liệu vào: Sự kiện/payload nào khởi chạy?     │
│ 05. Luồng Lý tưởng: Các bước tiến triển tuần tự chính xác là gì?│
│ 06. Biến đổi Trạng thái: Các thực thể chuyển trạng thái (A ➔ B)?│
│ 07. Luồng Rẽ nhánh Phụ: Có những trường hợp biến thể nào?       │
│ 08. Xử lý Lỗi & Phục hồi: Xử lý thế nào khi mạng/DB/API lỗi?   │
│ 09. Dữ liệu & Riêng tư: Những trường nào cần mã hóa bảo mật?   │
│ 10. Chỉ số Phi chức năng: Yêu cầu về độ trễ, RPS và tải cao?    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Rào chắn Ngăn ngừa Ảo tưởng Tự suy diễn

| Tình huống Rủi ro | Hành vi AI Ngây thơ (Xấu) | Hành vi AI Theo Giao thức (Tốt) |
|---|---|---|
| **Xác thực Mơ hồ** | Tự ý hardcode xác thực JWT Bearer | Hỏi: *"Endpoint này xác thực qua Session Cookie hay OAuth2 Bearer Token?"* |
| **Thiếu Quy tắc Validate** | Tự cho rằng email không bắt buộc | Hỏi: *"Trường email có bắt buộc không và quy tắc unique theo từng tenant ra sao?"* |
| **Chưa rõ Trường hợp Biên** | Xóa bản ghi cha để lại dữ liệu rác mồ côi | Đề xuất: *"[PROPOSAL] Soft-delete bản ghi cha có cờ cascade hay chặn xóa nếu còn con?"* |

---

## 3. Ví dụ Thực tế: Đào sâu một Yêu cầu Mơ hồ

**Yêu cầu của Người dùng:** *"Thêm API cho giảng viên chấm điểm báo cáo thực tập của sinh viên."*

```markdown
### Phản hồi Đào sâu của AI:

Để đảm bảo hệ thống chấm điểm đáp ứng chính xác nghiệp vụ của bạn, vui lòng xác nhận các điểm sau:

1. **[Tác nhân & RBAC]**: Quyền chấm điểm chỉ dành cho `FacultyAdvisor` được phân công, hay `DepartmentAdmin` cũng có quyền can thiệp/ghi đè điểm?
2. **[Thang điểm]**: Điểm số được tính theo số thực thập phân (`0.0 - 10.0`), chữ cái (`A-F`), hay bảng tiêu chí rubric tổng hợp?
3. **[Chuyển đổi Trạng thái]**: Khi giảng viên nộp điểm, trạng thái của `InternshipReport` chuyển từ `SUBMITTED` sang `COMPLETED` ngay, hay sinh viên cần thêm bước xác nhận đã đọc phản hồi?
4. **[Nộp muộn]**: Giảng viên có được chấm các báo cáo nộp quá hạn không, và hệ thống có cần tự động trừ điểm phạt theo số ngày trễ không?
```

---

## 4. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Bóc tách Yêu cầu với 10 Câu hỏi Đào sâu</div>

```markdown
# TASK: Thực thi Giao thức 10 Câu hỏi Đào sâu trên Yêu cầu Mơ hồ
Bạn là một Staff Requirements Engineer và Chuyên viên Phân tích Nghiệp vụ (Domain Analyst).

## Input Requirement:
[DÁN YÊU CẦU MƠ HỒ CỦA NGƯỜI DÙNG TẠI ĐÂY]

## Instructions:
1. Xác định toàn bộ điểm mơ hồ, quy tắc nghiệp vụ còn thiếu và trường hợp biên trong đề bài.
2. Soạn từ 3 đến 5 câu hỏi đào sâu có trọng lượng cao dựa trên Khung 10 câu hỏi:
   - Tác nhân & Quyền hạn RBAC
   - Cơ chế biến đổi trạng thái chính xác
   - Xử lý lỗi & kỳ vọng khôi phục giao dịch (rollback)
   - Ràng buộc dữ liệu & ranh giới validate
3. Cung cấp kèm phương án đề xuất mặc định có nhãn `[PROPOSAL]` cạnh mỗi câu hỏi để giảm tải suy nghĩ cho người dùng.
```
</div>

---

## 5. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Các yêu cầu mơ hồ có được đào sâu làm rõ trước khi lên kế hoạch kỹ thuật không?
- [ ] Câu hỏi có tập trung vào bất biến nghiệp vụ thay vì các tùy chọn phong cách vụn vặt không?
- [ ] AI có cung cấp kèm phương án đề xuất hợp lý song song với câu hỏi không?
- [ ] Ranh giới phân quyền của các tác nhân đã được xác nhận đầy đủ chưa?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Wiegers, Karl & Beatty, Joy (2013). <em>Software Requirements (3rd Edition)</em>. Microsoft Press.</li>
    <li>IEEE 29148:2018 — Kỹ thuật Khơi gợi Yêu cầu Phần mềm.</li>
  </ul>
</div>
