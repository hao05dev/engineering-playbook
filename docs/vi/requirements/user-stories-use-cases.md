# User Stories & Đặc tả Use Case (Use Case Specification)

Phát triển phần mềm kết nối giữa mong muốn của các bên liên quan và mã nguồn thực tế thông qua hai công cụ bổ trợ nhau: **User Stories** (kèm Tiêu chí chấp nhận Given-When-Then) phục vụ lập kế hoạch linh hoạt (Agile), và **Đặc tả Use Case chi tiết** phục vụ kỹ nghệ hệ thống.

---

## 1. So sánh: User Story vs. Use Case

```
┌─────────────────────────────────────────────────────────────┐
│                 CẶP ĐẶC TẢ HÀNH VI HỆ THỐNG                 │
├─────────────────────────────────────────────────────────────┤
│ • User Story: "Ai cần cái gì và vì sao?" (Góc nhìn Agile)   │
│   └── Đi kèm Tiêu chí Chấp nhận (Given-When-Then)           │
│                                                             │
│ • Use Case: "Từng bước tương tác chi tiết giữa Actor và     │
│   hệ thống diễn ra như thế nào, gồm cả các nhánh lỗi?"      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Chuẩn mực User Story & Tiêu chí Chấp nhận

### Cấu trúc Connextra Chuẩn
```
Là [Vai trò Người dùng Cụ thể],
Tôi muốn [Thực hiện Hành động / Sử dụng Tính năng],
Để [Đạt được Giá trị Kinh doanh Cụ thể].
```

### Tiêu chí Chấp nhận Given-When-Then (Định dạng Gherkin)
```gherkin
Kịch bản: Sinh viên nộp hồ sơ hợp lệ đủ điều kiện
  Given (Giả sử) Sinh viên đã đăng nhập và có điểm GPA tích lũy 3.4
  And (Và) Sinh viên đã chọn một Tin tuyển dụng đang mở và còn chỉ tiêu
  When (Khi) Sinh viên đính kèm file CV định dạng PDF 2MB và bấm "Nộp đơn"
  Then (Thì) Hệ thống chuyển trạng thái đơn ứng tuyển sang "SUBMITTED"
  And (Và) Hệ thống hiển thị thông báo "Hồ sơ đã được gửi cho Giảng viên duyệt"
  And (Và) Hệ thống gửi email thông báo tới Giảng viên hướng dẫn được phân công
```

---

## 3. Mẫu Đặc tả Use Case Chi tiết (Chuẩn Alistair Cockburn)

```markdown
# ĐẶC TẢ USE CASE: UC-04 Nộp Đơn Ứng Tuyển Thực Tập

- **Actor Chính (Primary Actor)**: Sinh viên
- **Actor Phụ (Supporting Actors)**: Cổng Email, Giảng viên Hướng dẫn
- **Điều kiện Tiên quyết (Preconditions)**:
  1. Sinh viên đã đăng nhập và tài khoản ở trạng thái hoạt động.
  2. Tin tuyển dụng đang ở trạng thái `OPEN`.
- **Đảm bảo Thành công (Postconditions)**:
  1. Bản ghi đơn ứng tuyển được tạo với trạng thái `SUBMITTED`.
  2. Chỉ tiêu còn lại của vị trí được tạm giữ.
- **Luồng Sự kiện Chính (Main Success Flow)**:
  1. Sinh viên chọn vị trí thực tập và bấm nút "Ứng tuyển".
  2. Hệ thống hiển thị form ứng tuyển có điền sẵn thông tin học thuật của sinh viên.
  3. Sinh viên đính kèm file PDF CV và thư xin việc (tùy chọn).
  4. Sinh viên xác nhận nộp hồ sơ.
  5. Hệ thống kiểm tra điều kiện tiên quyết (GPA, số tín chỉ, định dạng file).
  6. Hệ thống lưu hồ sơ và ghi log kiểm toán.
  7. Hệ thống hiển thị thông báo nộp đơn thành công.
- **Các Luồng Rẽ Nhánh & Ngoại lệ (Extensions / Exception Flows)**:
  - *5a. Điểm GPA của sinh viên không đạt yêu cầu*:
    1. Hệ thống từ chối nhận hồ sơ.
    2. Hệ thống hiển thị thông báo "Điểm GPA chưa đạt yêu cầu tối thiểu (2.50)".
    3. Use case kết thúc.
  - *5b. Sinh viên đã nộp đơn vào vị trí này trước đó*:
    1. Hệ thống phát hiện hồ sơ trùng lặp.
    2. Hệ thống báo lỗi "Bạn đã có hồ sơ đang xử lý cho vị trí này".
    3. Use case kết thúc.
```

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Soạn thảo User Story & Đặc tả Use Case</div>

```markdown
# TASK: Soạn thảo User Stories & Đặc tả Use Case Chuẩn Cockburn
Bạn là Chuyên gia Phân tích Nghiệp vụ và Product Owner.

## Tính năng Đầu vào:
[MÔ TẢ TÍNH NĂNG HOẶC NĂNG LỰC CỦA HỆ THỐNG]

## Yêu cầu Thực hiện:
1. Viết 2-3 User Stories chuẩn ("Là... Tôi muốn... Để...") có giải trình giá trị kinh doanh rõ ràng.
2. Với mỗi User Story, viết ít nhất 2 kịch bản Acceptance Criteria định dạng Given-When-Then (1 kịch bản thành công, 1 kịch bản ca biên/lỗi).
3. Soạn thảo một bản Đặc tả Use Case chi tiết chuẩn Alistair Cockburn (Actor chính, Actor phụ, Tiền điều kiện, Hậu điều kiện, Luồng chính, Luồng nhánh và Ngoại lệ).
4. Áp dụng nhãn: [CONFIRMED], [ASSUMPTION], [PROPOSAL], [QUESTION].
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Mỗi User Story đều có lý do nghiệp vụ "Để..." rõ ràng, tránh viết chung chung?
- [ ] Mọi Use Case đều liệt kê đầy đủ các luồng ngoại lệ và ca biên thất bại?
- [ ] Tiền điều kiện (Preconditions) và Hậu điều kiện (Postconditions) có thể kiểm chứng bằng test tự động?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Cockburn, Alistair (2000). <em>Writing Effective Use Cases</em>. Addison-Wesley.</li>
    <li>Cohn, Mike (2004). <em>User Stories Applied: For Agile Software Development</em>. Addison-Wesley.</li>
  </ul>
</div>
