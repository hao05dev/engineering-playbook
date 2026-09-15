# Thuộc tính Chất lượng & Đánh đổi Kiến trúc (Trade-offs)

Kiến trúc phần mềm là nghệ thuật và khoa học của việc cân bằng các sự đánh đổi (trade-offs). Bạn không thể tối đa hóa mọi thuộc tính chất lượng cùng một lúc. Việc tăng cường **Bảo mật** thường làm tăng **Độ trễ**; việc gia tăng **Độ sẵn sàng** trên các node phân tán thường buộc phải đánh đổi với **Tính nhất quán tức thời**.

---

## 1. 4 Trọng lực Cốt lõi của Kiến trúc

```
┌─────────────────────────────────────────────────────────────┐
│                 4 TRỌNG LỰC KIẾN TRÚC                       │
├─────────────────────────────────────────────────────────────┤
│ 1. Hiệu năng (Performance): Độ trễ, Thông lượng, Tài nguyên │
│ 2. Khả năng Mở rộng (Scalability): Năng lực xử lý tải tăng  │
│ 3. Độ sẵn sàng & Tin cậy: Uptime, Tự phục hồi, MTTR         │
│ 4. Bảo mật & Tuân thủ: Bí mật, Toàn vẹn, Phân quyền, Audit  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Các Định lý Phân tán: Định lý CAP và PACELC

### Định lý CAP (Eric Brewer, 2000)
Khi xảy ra sự cố phân mảnh mạng ($P$), một hệ thống phân tán bắt buộc phải chọn giữa **Tính Nhất quán ($C$)** và **Độ Sẵn sàng ($A$)**:
- **Hệ thống CP** (ví dụ: PostgreSQL Primary-Replica đồng bộ, Raft): Từ chối lệnh ghi khi mạng phân mảnh để ngăn ngừa dữ liệu bị xé đôi (Split-Brain).
- **Hệ thống AP** (ví dụ: Cassandra, DynamoDB): Vẫn chấp nhận lệnh ghi khi phân mảnh, đánh đổi bằng sự sai lệch dữ liệu tạm thời.

### Định lý PACELC (Daniel Abadi, 2012)
Nếu có **P**artition (phân mảnh), đánh đổi giữa **A**vailability và **C**onsistency; **E**lse (bình thường), đánh đổi giữa **L**atency và **C**onsistency:

```
                  ┌───────── Phân mảnh mạng? ────────┐
                  ▼                                  ▼
                 CÓ                                KHÔNG
         ┌────────┴────────┐                ┌────────┴────────┐
         ▼                 ▼                ▼                 ▼
  Độ Sẵn sàng (A)  Tính Nhất quán (C)   Độ trễ thấp (L)  Tính Nhất quán (C)
```

---

## 3. Phương pháp Phân tích Đánh đổi Kiến trúc (ATAM)

Phương pháp ATAM do Viện Kỹ nghệ Phần mềm (SEI) phát triển giúp nhận diện:
- **Điểm Nhạy cảm (Sensitivity Points)**: Thông số kiến trúc tác động mạnh tới 1 thuộc tính (ví dụ: *Đánh index giúp tăng tốc độ đọc*).
- **Điểm Đánh đổi (Trade-off Points)**: Quyết định giúp tăng thuộc tính này nhưng làm giảm thuộc tính khác (ví dụ: *Đánh 5 index giúp đọc nhanh nhưng làm chậm ghi và tốn RAM*).
- **Điểm Rủi ro (Risk Points)**: Quyết định có nguy cơ gây sập hệ thống khi quy mô mở rộng.

---

## 4. Ví dụ Thực tế: Đặt Giữ Chỉ tiêu Thực tập (Quota Booking)

| Phương án Lựa chọn | Tác động Tích cực (+) | Đánh đổi Tiêu cực (-) | Áp dụng cho |
| :--- | :--- | :--- | :--- |
| **Option A: Khóa Dòng Bi quan (`SELECT FOR UPDATE`)** | Đảm bảo 100% không bao giờ bị vượt chỉ tiêu | Tăng nguy cơ nghẽn DB; tăng độ trễ ghi P99 | Hệ thống Tài chính & Phân bổ Chỉ tiêu |
| **Option B: Khóa Lạc quan với Cột Version** | Thông lượng ghi cao; không khóa tài nguyên | Thất bại khi nhiều người ghi cùng lúc (Retry) | Cập nhật hồ sơ ít tranh chấp |
| **Option C: Xếp hàng Hàng đợi Bất đồng bộ** | Độ trễ API cực thấp, phản hồi ngay | Nhất quán sau; người dùng phải chờ xử lý | Bán vé sự kiện flash-sale |

---

## 5. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Đánh giá Đánh đổi Kiến trúc Theo Phương pháp ATAM</div>

```markdown
# TASK: Phân tích Đánh đổi Kiến trúc & Đánh giá ATAM
Bạn là Kiến trúc sư Phần mềm Cấp cao (Principal Software Architect).

## Quyết định Kiến trúc Đầu vào:
[MÔ TẢ QUYẾT ĐỊNH KIẾN TRÚC HOẶC THIẾT KẾ PHÂN TÁN]

## Yêu cầu Thực hiện:
1. Phân tích quyết định bằng định lý PACELC và mô hình chất lượng ISO 25010.
2. Nhận diện toàn bộ các Điểm Nhạy cảm (Sensitivity Points), Điểm Đánh đổi (Trade-off Points) và Điểm Rủi ro (Risk Points).
3. Lập Bảng Ma trận Đánh đổi so sánh phương án đề xuất với ít nhất 2 phương án thay thế qua các tiêu chí: Độ trễ, Nhất quán, Độ sẵn sàng, Độ phức tạp và Chi phí.
4. Đưa ra Khuyến nghị Kiến trúc dứt khoát kèm phương án giảm thiểu rủi ro.
```
</div>

---

## 6. Checklist Kiểm duyệt (Review Checklist)

- [ ] Kiến trúc có tuyên bố rõ ràng lập trường đánh đổi CAP/PACELC (CP hay AP) không?
- [ ] Các đánh đổi kỹ thuật có được ghi nhận trung thực, không có tuyên bố "không có nhược điểm"?
- [ ] Chiến lược khóa dữ liệu và xử lý đồng thời có khớp với yêu cầu nghiệp vụ về tính nhất quán không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Kazman, Rick et al. (2000). <em>ATAM: Method for Architecture Evaluation</em>. Software Engineering Institute (SEI), CMU.</li>
    <li>Abadi, Daniel (2012). <em>Consistency Tradeoffs in Modern Distributed Database System Design (PACELC Theorem)</em>. IEEE Computer.</li>
  </ul>
</div>
