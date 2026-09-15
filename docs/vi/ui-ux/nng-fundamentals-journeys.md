# Mục tiêu Người dùng, Hành trình & User Flows (Journeys & Flows)

Trước khi bắt tay vào vẽ các nút bấm hay viết mã CSS, kỹ sư UX phải mô hình hóa hành trình nhận thức của con người. Dựa trên các nghiên cứu của **Nielsen Norman Group (NN/g)**, hướng dẫn này chuẩn hóa phương pháp xây dựng **Mục tiêu Người dùng (User Goals)**, **Hành trình Người dùng (User Journeys)** và **Sơ đồ Luồng Thao tác (User Flows)**.

---

## 1. Phân biệt: Mục tiêu Người dùng vs. Tác vụ Thao tác

```
┌─────────────────────────────────────────────────────────────┐
│                 MỤC TIÊU (GOAL) VS. TÁC VỤ (TASK)           │
├─────────────────────────────────────────────────────────────┤
│ • Mục tiêu Người dùng (User Goal): Kết quả mong đợi (Tại sao)│
│   (Ví dụ: "Tìm được một vị trí thực tập tốt trước khi hết kỳ")│
│                                                             │
│ • Tác vụ Thao tác (User Task): Các bước cụ thể để đạt mục tiêu│
│   (Ví dụ: "Lọc tin Java", "Tải file PDF", "Bấm gửi form")   │
└─────────────────────────────────────────────────────────────┘
```

Một thiết kế UX xuất sắc là thiết kế giảm thiểu tối đa số lượng tác vụ cơ học mà người dùng phải thực hiện để đạt được mục tiêu của họ.

---

## 2. Bản đồ Hành trình Người dùng (Customer / User Journey Map)

Hành trình Người dùng mô hình hóa các giai đoạn cảm xúc và thao tác thực tế:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                 HÀNH TRÌNH NỘP HỒ SƠ THỰC TẬP CỦA SINH VIÊN             │
├─────────────────────────────────────────────────────────────────────────┤
│ Giai đoạn:   1. Tìm kiếm        2. Đánh giá        3. Nộp hồ sơ         │
│ Thao tác:    Lọc tin theo tag   Xem mức lương & yc Tải CV PDF & bấm nộp │
│ Cảm xúc:     🤔 Tò mò           🧐 Cân nhắc        😰 Hồi hộp / Lo lắng │
│ Nỗi đau:     Quá nhiều tin cũ   Yêu cầu GPA mơ hồ  Không rõ nộp đc chưa │
│ Giải pháp:   Ẩn tin hết hạn     Gắn badge rõ ràng  Hiện biên lai tức thì│
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Sơ đồ Luồng Thao tác Rẽ nhánh (User Flow Diagram)

Sơ đồ User Flow thể hiện toàn bộ các quyết định và đường đi của người dùng qua các màn hình:

```
   [ Trang Chủ ]
          │
          ▼
   [ Tìm kiếm & Lọc ] ──► (Có vị trí nào khớp không?)
                                  │
                   ┌──────────────┴──────────────┐
             [Không]│                             │ [Có]
                   ▼                             ▼
       [ Màn hình Gợi ý Trống ]         [ Danh sách Tin Tuyển Dụng ]
                                                 │
                                                 ▼
                                        [ Chọn 1 Tin Cụ Thể ]
                                                 │
                                                 ▼
                                        [ Mở Form Ứng Tuyển ]
                                                 │
                                                 ▼
                                      ( GPA >= 2.0 & File Hợp lệ? )
                                                 │
                                ┌────────────────┴────────────────┐
                           [Sai]│                                 │ [Đúng]
                                ▼                                 ▼
                     [ Báo lỗi Validation ]            [ Hiện Màn hình Thành Công & ]
                                                       [ Chuyển Trạng Thái Đơn     ]
```

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Xây dựng Hành trình Người dùng & Sơ đồ User Flow</div>

```markdown
# TASK: Xây dựng Bản đồ Hành trình Người dùng (User Journey) & Sơ đồ User Flow
Bạn là Chuyên gia Nghiên cứu Trải nghiệm Người dùng (Principal UX Researcher) chuẩn NN/g.

## Chân dung Persona & Tính năng Đầu vào:
Chân dung Người dùng: [MÔ TẢ PERSONA, ĐỘNG CƠ VÀ NỖI ĐAU CHÍNH]
Phạm vi Tính năng: [MÔ TẢ NGHIỆP VỤ]

## Yêu cầu Thực hiện:
1. Xác định Mục tiêu Cốt lõi (User Goal) của người dùng.
2. Xây dựng Bản đồ Hành trình Người dùng 4 giai đoạn (Thao tác, Suy nghĩ, Cảm xúc, Nỗi đau và Cơ hội cải tiến UX).
3. Vẽ Sơ đồ Luồng Thao tác (User Flow) hoàn chỉnh gồm các điểm rẽ nhánh quyết định, luồng thành công và luồng xử lý/phục hồi khi gặp lỗi.
4. Trình bày bằng cú pháp ASCII / Mermaid sạch sẽ và trực quan.
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Sơ đồ User Flow có được vẽ dưới góc nhìn của người dùng thay vì luồng xử lý database không?
- [ ] Các nhánh xử lý lỗi và phục hồi dữ liệu có được mô hình hóa đầy đủ không?
- [ ] Mọi bước trong luồng thao tác đều trực tiếp phục vụ cho việc đạt được Mục tiêu Người dùng?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Gibbons, Sarah (2018). <em>Journey Mapping 101</em>. Nielsen Norman Group.</li>
    <li>Nielsen Norman Group — Phương pháp Luận Nghiên cứu UX: <a href="https://www.nngroup.com/articles/" target="_blank" rel="noopener">https://www.nngroup.com/articles/</a></li>
  </ul>
</div>
