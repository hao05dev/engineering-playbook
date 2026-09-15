# Thuật ngữ Domain, Quản lý Giả định & Bắt lỗi Mơ hồ (Ambiguity Detection)

Sự mơ hồ (Ambiguity) là nguyên nhân lớn nhất dẫn đến các khiếm khuyết phần mềm và sự lãng phí công sức làm lại (rework). Tài liệu này thiết lập phương pháp xây dựng **Bảng Thuật ngữ Nghiệp vụ (Ubiquitous Language)**, kiểm soát các **Giả định ngầm** và trang bị cho AI kỹ thuật **chủ động chất vấn các yêu cầu mơ hồ**.

---

## 1. Bảng Thuật ngữ Nghiệp vụ (Domain Glossary / Ubiquitous Language)

Bảng thuật ngữ cung cấp định nghĩa duy nhất, chuẩn xác cho các khái niệm cốt lõi, được chia sẻ đồng nhất giữa khách hàng, kỹ sư, database schema và prompt của AI.

```
┌─────────────────────────────────────────────────────────────┐
│                 MẪU THUẬT NGỮ NGHIỆP VỤ                     │
├─────────────────────────────────────────────────────────────┤
│ Thuật ngữ: Vị trí Tiếp nhận Thực tập (Placement)            │
│ Định nghĩa: Thỏa thuận ràng buộc khi sinh viên đã duyệt được│
│ phân bổ chính thức vào một công ty trong một học kỳ.        │
│ Tránh dùng các từ gây hiểu lầm: "Job", "Work", "Hợp đồng"   │
│ Thực thể liên quan: Student, Company, FacultyAdvisor        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Quản trị các Giả định Chưa Kiểm chứng (Assumptions)

Khi phân tích yêu cầu cùng AI, các giả định ngầm chưa được kiểm chứng rất dễ bị hòa trộn vào tài liệu đặc tả.

### Quy tắc Bất biến về Giả định
> [!CAUTION]
> **Tuyệt đối Không Tự Ý Chuyển Giả định thành Quy tắc Đã Chốt**
> Khi lập trình viên nói: *"Sinh viên có thể xác nhận thực tập."*
> AI KHÔNG ĐƯỢC tự suy diễn: *"Chỉ được phép có duy nhất 1 vị trí thực tập hoạt động."*
> AI bắt buộc phải gắn nhãn: `<span class="badge-assumption">[ASSUMPTION]</span> Giả định rằng mỗi sinh viên chỉ được phép có 1 vị trí thực tập chính thức tại một thời điểm.` và hỏi: `<span class="badge-question">[QUESTION]</span> Sinh viên có thể cùng lúc thực tập bán thời gian tại 2 doanh nghiệp khác nhau không?`

---

## 3. Phát hiện Bẫy Ngôn từ Gây Mơ hồ (Linguistic Ambiguity)

AI Agent cần quét toàn bộ các câu phát biểu yêu cầu để phát hiện các bẫy ngôn ngữ phổ biến:

| Bẫy Mơ hồ | Ví dụ Phát biểu | Câu Hỏi Chất Vấn của AI |
| :--- | :--- | :--- |
| **Tính từ mơ hồ** | *"Hệ thống tìm kiếm phải chạy nhanh."* | *"Ngưỡng thời gian phản hồi P95 cụ thể là bao nhiêu mili-giây trên tập dữ liệu bao nhiêu bản ghi?"* |
| **Đại từ lửng lơ** | *"Họ sẽ thực hiện phê duyệt."* | *"Actor cụ thể nào (Giảng viên hay Ban chủ nhiệm) giữ thẩm quyền bấm duyệt?"* |
| **Câu bị động** | *"Thông báo sẽ được gửi đi."* | *"Thành phần nào kích hoạt gửi thông báo và qua kênh nào (Email, SMS hay Push Notification)?"* |
| **Thiếu ranh giới** | *"Người dùng có thể tải file lên."* | *"Định dạng MIME nào được cho phép, dung lượng tối đa là bao nhiêu và có quét mã độc không?"* |

---

## 4. Bộ Câu hỏi Chất vấn 10 Điểm của AI

Khi lập trình viên đưa ra một yêu cầu quá ngắn gọn hoặc chưa đầy đủ, AI sẽ kích hoạt **Bộ Câu hỏi 10 Điểm**:

1. **Ai (Who)** là người khởi tạo tác vụ?
2. **Ai (Who)** là người duyệt hoặc từ chối tác vụ đó?
3. **Điều kiện gì (What conditions)** phải được thỏa mãn trước khi bắt đầu?
4. **Điều gì sẽ xảy ra (What happens)** với các đơn khác khi thao tác này thành công?
5. **Điều gì sẽ xảy ra** nếu bên thứ ba không phản hồi hoặc timeout?
6. **Hạn chót (Deadline)** chính xác là khi nào và hết hạn thì xử lý ra sao?
7. **Trạng thái thực thể (State transition)** chuyển dịch chính xác như thế nào?
8. **Log kiểm toán (Audit log)** và thông báo nào cần được phát ra?
9. **Dữ liệu nào** được lưu trữ vĩnh viễn và dữ liệu nào được xóa mềm (soft-delete)?
10. **Quyền hạn bảo mật (Authorization)** nào bắt buộc phải kiểm tra?

---

## 5. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Kiểm toán Độ Mơ hồ & Đặt Câu hỏi Làm rõ</div>

```markdown
# TASK: Bắt Lỗi Mơ hồ & Đặt Câu hỏi Phản biện Yêu cầu
Bạn là Chuyên gia Phân tích Hệ thống theo chuẩn IEEE 29148.

## Yêu cầu Đầu vào:
[NHẬP YÊU CẦU SƠ BỘ HOẶC TÍNH NĂNG CỦA LẬP TRÌNH VIÊN TẠI ĐÂY]

## Yêu cầu Thực hiện:
1. Trích xuất các thuật ngữ nghiệp vụ cốt lõi vào Bảng Thuật ngữ (Domain Glossary).
2. Phát hiện toàn bộ các điểm mơ hồ, tính từ chung chung, câu bị động và thiếu ranh giới.
3. Đặt ra danh sách 5-10 câu hỏi chất vấn sâu sắc để làm rõ bài toán.
4. Định dạng báo cáo phân tích theo chuẩn:
   - [CONFIRMED] Những gì đã được người dùng khẳng định rõ.
   - [ASSUMPTION] Các giả định ngầm cần xác nhận lại.
   - [PROPOSAL] Các phương án giải pháp kiến trúc bạn đề xuất.
   - [QUESTION] Các câu hỏi chặn (blocking) bắt buộc phải trả lời trước khi viết spec.
```
</div>

---

## 6. Checklist Kiểm duyệt (Review Checklist)

- [ ] Mọi thuật ngữ trong hệ thống có đúng 1 tên gọi và định nghĩa chuẩn không?
- [ ] Toàn bộ các từ ngữ định tính ("nhanh", "dễ dùng", "phù hợp") đã được chuyển thành chỉ số đo lường chưa?
- [ ] Mọi giả định đều đã được lập danh sách và trình lập trình viên phê duyệt chưa?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>IEEE 29148:2018 — Tiêu chí Yêu cầu Phần mềm Chuẩn mực (Rõ ràng, Đầy đủ, Kiểm chứng được).</li>
    <li>Evans, Eric (2003). <em>Domain-Driven Design: Ubiquitous Language</em>.</li>
  </ul>
</div>
