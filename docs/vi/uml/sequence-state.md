# Sơ đồ Tuần tự & Sơ đồ Trạng thái (Sequence & State Diagrams)

Trong khi các sơ đồ cấu trúc mô tả hình thể tĩnh của hệ thống, **Sơ đồ Tuần tự (Sequence Diagram)** và **Sơ đồ Trạng thái (State Machine Diagram)** mô hình hóa chính xác các tương tác theo thời gian và vòng đời thực thể của phần mềm.

---

## 1. Sơ đồ Tuần tự (Sequence Diagrams)

Sơ đồ Tuần tự mô hình hóa các tương tác trao đổi thông điệp giữa các đối tượng được sắp xếp theo trình tự thời gian dọc theo các đường sinh mệnh (Lifelines).

```
┌─────────────────────────────────────────────────────────────┐
│                 KÝ HIỆU SƠ ĐỒ TUẦN TỰ CHUẨN                 │
├─────────────────────────────────────────────────────────────┤
│ • Đường sinh mệnh (Lifeline): Đường đứt nét dọc thể hiện obj│
│ • Thanh kích hoạt (Activation): Hộp chữ nhật hẹp khi xử lý  │
│ • Gọi đồng bộ (Sync): Mũi tên liền nét đặc (──►)            │
│ • Gọi bất đồng bộ (Async): Mũi tên mở (──>)                 │
│ • Trả về (Return): Đường đứt nét có mũi tên mở (< - -)      │
│ • Khung kết hợp (Fragments): alt (if/else), opt, loop       │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ Thực tế: Luồng Xử lý Nộp Hồ sơ Thực tập

```
Sinh viên            Controller              Service               Repository
   │                      │                      │                      │
   │── POST /apply ──────►│                      │                      │
   │                      │── submitApp() ──────►│                      │
   │                      │                      │── findById() ───────►│
   │                      │                      │◄- - trả về entity - -│
   │                      │                      │                      │
   │                      │   [ alt: GPA < 2.0 ] │                      │
   │                      │── ném lỗi 400 ──────►│                      │
   │                      │                      │                      │
   │                      │   [ else: Hợp lệ ]   │                      │
   │                      │                      │── save(SUBMITTED) ──►│
   │                      │                      │◄- - entity đã lưu - -│
   │                      │◄- - 201 Created - - -│                      │
   │◄- - JSON Thành công -│                      │                      │
```

---

## 2. Sơ đồ Trạng thái (State Machine Diagrams)

Sơ đồ trạng thái mô hình hóa các trạng thái rời rạc mà một thực thể trải qua để đáp ứng lại các sự kiện kích hoạt trong suốt vòng đời của nó.

### Các Phần tử Cốt lõi:
- **Trạng thái (State)**: Hộp bo góc chứa Tên Trạng thái, các hành động `entry /`, `do /`, `exit /`.
- **Chuyển dịch (Transition)**: Mũi tên có cú pháp chuẩn: `Sự kiện [Điều kiện Guard] / Hành động`.
- **Trạng thái Phức hợp (Composite States)**: Gom nhóm các trạng thái con bên trong.

```
┌─────────────────────────────────────────────────────────────┐
│             MÁY TRẠNG THÁI ĐƠN ỨNG TUYỂN (FSM)              │
├─────────────────────────────────────────────────────────────┤
│   ● (Bắt đầu)                                               │
│   │                                                         │
│   ▼                                                         │
│ ┌──────────┐   nộp đơn [dữ liệu hợp lệ]   ┌───────────────┐ │
│ │ BẢN NHÁP ├─────────────────────────────►│    ĐÃ NỘP     │ │
│ └──────────┘                              └───────┬───────┘ │
│                                                   │         │
│                        giảng viên duyệt           │ từ chối │
│                        [gpa >= 2.0]               │ [có lý do]
│                             │                     │         │
│                             ▼                     ▼         │
│                     ┌───────────────┐       ┌───────────┐   │
│                     │ĐÃ DUYỆT (KHOA)│       │ TỪ CHỐI   │   │
│                     └───────┬───────┘       └───────────┘   │
│                             │                               │
│                      doanh nghiệp nhận                      │
│                             ▼                               │
│                     ┌───────────────┐                       │
│                     │  TRÚNG TUYỂN  │ ──► ◉ (Kết thúc)      │
│                     └───────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Sinh Sơ đồ Tuần tự & Sơ đồ Trạng thái</div>

```markdown
# TASK: Sinh Sơ đồ Tuần tự (Sequence) & Sơ đồ Trạng thái (State Machine)
Bạn là Kiến trúc sư Hệ thống Phân tán (Distributed Systems Architect).

## Bối cảnh Đầu vào:
Kịch bản Tương tác / Thực thể: [MÔ TẢ KỊCH BẢN TƯƠNG TÁC HOẶC VÒNG ĐỜI THỰC THỂ]

## Yêu cầu Thực hiện:
1. Xây dựng Sơ đồ Tuần tự chi tiết qua các tầng Controller, Service, Database và External API.
2. Sử dụng đúng các khung kết hợp UML (`alt`, `opt`, `loop`) để mô hình hóa các nhánh lỗi và điều kiện biên.
3. Xây dựng Sơ đồ Trạng thái thể hiện rõ Trạng thái, Sự kiện Kích hoạt, Điều kiện Guard và Hành động.
4. Trình bày bằng cú pháp ASCII / Mermaid kèm giải thích chi tiết.
```
</div>

---

## 4. Checklist Kiểm duyệt (Review Checklist)

- [ ] Lệnh gọi đồng bộ và lệnh phát thông điệp bất đồng bộ có được phân biệt bằng đúng kiểu mũi tên không?
- [ ] Các khung kết hợp `alt` có bao quát đầy đủ các nhánh lỗi và trả về mã lỗi tương ứng chưa?
- [ ] Mọi chuyển dịch trạng thái có điều kiện bảo vệ (Guard) để ngăn chặn chuyển đổi trái phép không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>OMG UML v2.5.1 — Section 17: Tương tác (Sequence Diagrams), Section 14: Máy Trạng thái.</li>
  </ul>
</div>
