# Quy trình, Quy tắc & Sự kiện Nghiệp vụ (Processes, Rules & Events)

Phần mềm về bản chất là một cỗ máy tự động hóa thực thi các quy trình nghiệp vụ (processes), bảo đảm các quy tắc kinh doanh (rules) và phát ra các sự kiện thực tế (events). Việc phân biệt rạch ròi 3 khái niệm này là nền tảng của một kiến trúc hệ thống sạch và chuẩn mực.

---

## 1. Phân biệt: Quy trình vs. Quy tắc vs. Sự kiện

```
┌─────────────────────────────────────────────────────────────┐
│                       MÔ HÌNH TAM GIÁC                      │
├─────────────────────────────────────────────────────────────┤
│ • Quy trình (Process): Trình tự các bước để đạt mục tiêu    │
│ • Quy tắc (Rule): Các điều kiện & bất biến kiểm soát bước đó│
│ • Sự kiện (Event): Một sự thật nghiệp vụ vừa mới xảy ra     │
└─────────────────────────────────────────────────────────────┘
```

| Tiêu chí | Quy trình Nghiệp vụ (Process) | Quy tắc Nghiệp vụ (Rule) | Sự kiện Nghiệp vụ (Event) |
| :--- | :--- | :--- | :--- |
| **Câu hỏi cốt lõi** | *Công việc diễn ra như thế nào?* | *Điều gì được phép hoặc bị cấm?* | *Điều gì vừa mới diễn ra?* |
| **Cách mô tả** | Sơ đồ BPMN / Activity Diagram | Mệnh đề điều kiện (Nếu/Thì) | Sự thật thì quá khứ (`OrderPlaced`)|
| **Độ biến động** | Trung bình (Tối ưu theo thời gian) | Cao (Chính sách kinh doanh đổi liên tục) | Thấp (Sự thật lịch sử là bất biến) |
| **Ánh xạ vào Code**| Service Orchestration / Sagas | Domain Invariants / Validation | Event Bus / Kafka Topics |

---

## 2. Phân loại Quy tắc Nghiệp vụ (Business Rules)

Quy tắc nghiệp vụ không bao giờ được phép giấu kín trong code UI hay trigger database mà phải được lập danh mục tài liệu tường minh.

### 1. Quy tắc Bất biến (Structural Invariants)
- *BR-01*: "Sinh viên không được nộp hồ sơ thực tập nếu điểm trung bình tích lũy (GPA) dưới 2.0."
- *BR-02*: "Tin tuyển dụng thực tập bắt buộc phải có mức lương không âm và số lượng chỉ tiêu tối đa."

### 2. Quy tắc Vận hành / Hành vi (Behavioral Rules)
- *BR-03*: "Nếu giảng viên không duyệt hồ sơ sau 7 ngày làm việc, hệ thống tự động leo thang (escalate) thông báo lên Trưởng khoa."
- *BR-04*: "Khi sinh viên xác nhận đồng ý nhận một vị trí thực tập, toàn bộ các đơn ứng tuyển khác đang chờ xử lý của sinh viên đó phải tự động chuyển sang trạng thái `WITHDRAWN` (Đã rút)."

---

## 3. Sự kiện Domain (Domain Events trong Event Storming)

Sự kiện Domain đại diện cho các mốc nghiệp vụ quan trọng đã diễn ra, luôn được viết ở thì quá khứ:

```
[StudentRegistered] ──► [ApplicationSubmitted] ──► [AdvisorApproved] ──► [OfferAccepted]
                                │
                                ▼
                        [AdvisorRejected]
```

---

## 4. Ví dụ Thực tế: Bảng Danh mục Quy tắc Nghiệp vụ

```
┌─────────┬────────────────────────────┬─────────────────────────────┬───────────────────────┐
│ Mã Quy tắc│ Tên Quy tắc                │ Biểu thức Logic             │ Hành động khi Vi phạm │
├─────────┼────────────────────────────┼─────────────────────────────┼───────────────────────┤
│ BR-INT01│ Giới hạn Đơn Ứng tuyển     │ Count(ActiveApps) <= 5      │ Chặn nộp đơn (HTTP 400)│
│ BR-INT02│ Số Tín chỉ Tiên quyết      │ EarnedCredits >= 60         │ Chặn nộp đơn (HTTP 400)│
│ BR-INT03│ Hạn Chót Ứng tuyển         │ Now() <= PostDeadline       │ Báo hết hạn (HTTP 410)│
│ BR-INT04│ SLA Phê duyệt Giảng viên   │ TimeSinceSubmit <= 7 Days   │ Bắn thông báo leo thang│
└─────────┴────────────────────────────┴─────────────────────────────┴───────────────────────┘
```

---

## 5. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Trích xuất Quy trình, Quy tắc & Sự kiện</div>

```markdown
# TASK: Trích xuất Quy trình, Quy tắc & Sự kiện Domain
Bạn là Chuyên gia Phân tích Nghiệp vụ và Kiến trúc sư Event-Driven.

## Bối cảnh Đầu vào:
Quy trình / Luồng nghiệp vụ: [MÔ TẢ LUỒNG CẦN PHÂN TÍCH]

## Yêu cầu Thực hiện:
1. Mô hình hóa Quy trình Nghiệp vụ (Business Process) thành các bước tuần tự rõ ràng.
2. Trích xuất toàn bộ Quy tắc Nghiệp vụ Bất biến và Vận hành vào Bảng Quy tắc (Mã, Tên, Biểu thức, Xử lý Vi phạm).
3. Xác định toàn bộ các Sự kiện Domain (Domain Events) phát ra ở mỗi bước (đặt tên ở thì quá khứ).
4. Đánh dấu các ca biên bị bỏ sót bằng các nhãn [QUESTION] và [PROPOSAL].
```
</div>

---

## 6. Checklist Kiểm duyệt (Review Checklist)

- [ ] Quy tắc nghiệp vụ có được phát biểu mang tính khai báo (declarative) độc lập với code không?
- [ ] Mọi quy tắc nghiệp vụ đều có quy định hành động xử lý khi vi phạm chưa?
- [ ] Tên các Domain Event có phản ánh sự thật nghiệp vụ ở thì quá khứ không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Business Rules Group (BRG) — Defining Business Rules ~ What Are They Really?</li>
    <li>Brandolini, Alberto (2019). <em>Introducing EventStorming</em>. Leanpub.</li>
  </ul>
</div>
