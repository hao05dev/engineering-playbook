# Trạng thái, Ràng buộc & Ngoại lệ Nghiệp vụ (State & Exceptions)

Các hệ thống phần mềm phức tạp thường xuyên bị lỗi tại các điểm chuyển đổi ranh giới trạng thái và luồng xử lý ngoại lệ. Việc mô hình hóa **Trạng thái Nghiệp vụ, Ràng buộc và Ngoại lệ (Business Exceptions)** ngay từ đầu giúp đảm bảo AI Agent thiết kế hệ thống có tính phòng thủ cao và khả năng phục hồi tốt thay vì chỉ xây dựng theo luồng chạy hoàn hảo (happy-path).

---

## 1. Mô hình hóa Vòng đời Thực thể (Finite State Machine - FSM)

Mỗi thực thể nghiệp vụ trọng tâm đều có một vòng đời xác định. Một máy trạng thái bao gồm:
- **Trạng thái Hợp lệ (Valid States)**: Các mốc cụ thể trong vòng đời thực thể.
- **Chuyển dịch Hợp lệ (Valid Transitions)**: Các đường đi cho phép từ trạng thái này sang trạng thái khác.
- **Điều kiện Bảo vệ (Transition Guards)**: Quy tắc nghiệp vụ bắt buộc phải thỏa mãn trước khi chuyển trạng thái.
- **Trạng thái Kết thúc (Terminal States)**: Điểm dừng của vòng đời, không cho phép chuyển dịch tiếp.

```
┌─────────────────────────────────────────────────────────────┐
│             MÁY TRẠNG THÁI ĐƠN THỰC TẬP (FSM)               │
├─────────────────────────────────────────────────────────────┤
│ [BẢN NHÁP] ──(nộp)──► [ĐÃ NỘP] ──(giảng viên duyệt)──►      │
│ [GIẢNG VIÊN DUYỆT] ──(công ty nhận)──► [TRÚNG TUYỂN]        │
│                                                             │
│ Các Chuyển dịch BỊ CẤM:                                     │
│ • [TỪ CHỐI] ──► [TRÚNG TUYỂN] (TUYỆT ĐỐI CẤM)               │
│ • [BẢN NHÁP] ──► [GIẢNG VIÊN DUYỆT] (TUYỆT ĐỐI CẤM)         │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Phân biệt Ràng buộc Nghiệp vụ vs. Ràng buộc Kỹ thuật

| Loại Ràng buộc | Định nghĩa | Ví dụ Thực tế |
| :--- | :--- | :--- |
| **Ràng buộc Nghiệp vụ** | Do chính sách, pháp lý hoặc mô hình kinh doanh quy định | "Sinh viên không được ứng tuyển quá 5 doanh nghiệp cùng lúc." |
| **Ràng buộc Kỹ thuật** | Do giới hạn phần cứng, mạng hoặc dung lượng lưu trữ | "File CV tải lên không được vượt quá dung lượng 10 MB." |
| **Ràng buộc Thời gian** | Do hạn chót hoặc lịch biểu quy định | "Báo cáo thực tập giữa kỳ bắt buộc nộp trong tuần thứ 6 đến tuần thứ 8." |

---

## 3. Ngoại lệ Nghiệp vụ (Business Exceptions) vs. Lỗi Hệ thống

Phần mềm cần phân tách rạch ròi giữa việc vi phạm quy tắc nghiệp vụ và lỗi hạ tầng:

```
┌─────────────────────────────────────────────────────────────┐
│                 PHÂN LOẠI NGOẠI LỆ HỆ THỐNG                 │
├─────────────────────────────────────────────────────────────┤
│ 1. Ngoại lệ Nghiệp vụ (Mã HTTP 4xx): Lỗi nghiệp vụ dự kiến  │
│    - DuplicateApplicationException (Nộp đơn trùng lặp)      │
│    - PrerequisiteNotMetException (Chưa đủ điều kiện tiên quyết)│
│    - ApplicationExpiredException (Hồ sơ đã hết hạn)         │
│ 2. Lỗi Hệ thống / Hạ tầng (Mã HTTP 5xx): Sự cố ngoài ý muốn │
│    - DatabaseConnectionTimeoutException (Hết timeout DB)    │
│    - StorageDiskFullException (Ổ cứng lưu trữ bị đầy)       │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Bảng Ma trận Chuyển đổi Trạng thái Chuẩn

```
┌──────────────────┬──────────────────┬─────────────────────────────┬──────────────────────────┐
│ Trạng thái Gốc   │ Trạng thái Đích  │ Sự kiện Kích hoạt           │ Điều kiện Bảo vệ (Guard) │
├──────────────────┼──────────────────┼─────────────────────────────┼──────────────────────────┤
│ BẢN NHÁP         │ ĐÃ NỘP           │ Sinh viên bấm Nộp           │ GPA >= 2.0 & Đã đính kèm CV│
│ ĐÃ NỘP           │ GIẢNG VIÊN DUYỆT │ Giảng viên bấm Duyệt        │ Thuộc khoa quản lý       │
│ ĐÃ NỘP           │ TỪ CHỐI          │ Giảng viên bấm Từ chối      │ Có nhập lý do từ chối    │
│ GIẢNG VIÊN DUYỆT │ TRÚNG TUYỂN      │ Doanh nghiệp gửi Offer      │ Doanh nghiệp còn chỉ tiêu│
└──────────────────┴──────────────────┴─────────────────────────────┴──────────────────────────┘
```

---

## 5. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Mô hình hóa State Machine & Xử lý Ngoại lệ</div>

```markdown
# TASK: Mô hình hóa Máy Trạng thái (FSM) & Ngoại lệ Nghiệp vụ
Bạn là Chuyên gia Phân tích Hệ thống và Kỹ sư Thiết kế Phòng thủ.

## Bối cảnh Đầu vào:
Thực thể mục tiêu: [TÊN THỰC THỂ, ví dụ: InternshipApplication, Order, AuctionBid]
Mô tả vòng đời: [MÔ TẢ CÁC BƯỚC VẬN HÀNH]

## Yêu cầu Thực hiện:
1. Xây dựng Ma trận Chuyển đổi Trạng thái (State Transition Matrix) gồm Trạng thái Gốc, Trạng thái Đích, Sự kiện Kích hoạt và Điều kiện Guard.
2. Liệt kê rõ các chuyển dịch BỊ CẤM (Forbidden Transitions) bắt buộc phải ném Domain Exception.
3. Lập danh mục Ngoại lệ Nghiệp vụ (Business Exceptions) kèm Mã lỗi (Error Code) và thông điệp giải thích thân thiện cho người dùng.
4. Phân biệt rõ ràng giữa Ràng buộc Nghiệp vụ và Ràng buộc Kỹ thuật.
5. Định dạng đầu ra với các nhãn: [CONFIRMED], [ASSUMPTION], [PROPOSAL], [QUESTION].
```
</div>

---

## 6. Checklist Kiểm duyệt (Review Checklist)

- [ ] Toàn bộ các trạng thái và trạng thái kết thúc (terminal states) đã được liệt kê đầy đủ chưa?
- [ ] Các chuyển dịch bất hợp lệ đã được chặn bằng Guard và ném Custom Exception chưa?
- [ ] Ngoại lệ nghiệp vụ (4xx) đã được tách rời hoàn toàn khỏi lỗi hạ tầng kỹ thuật (5xx) chưa?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>OMG UML v2.5.1 — Sơ đồ Máy Trạng thái (State Machine Diagrams).</li>
    <li>Fowler, Martin (2010). <em>Domain-Specific Languages: State Machine Patterns</em>. Addison-Wesley.</li>
  </ul>
</div>
