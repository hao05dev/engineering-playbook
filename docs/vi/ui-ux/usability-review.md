# Đánh giá Khả dụng & 10 Nguyên lý Heuristic của Jakob Nielsen

Đánh giá Heuristic (Heuristic Evaluation) là phương pháp thẩm định khả dụng (usability inspection) nhanh gọn và hiệu quả, trong đó các chuyên gia xem xét giao diện dựa trên các nguyên lý tâm lý học và thiết kế đã được chứng minh.

---

## 1. 10 Nguyên lý Khả dụng của Jakob Nielsen (10 Usability Heuristics)

```
┌─────────────────────────────────────────────────────────────────┐
│              10 USABILITY HEURISTICS (JAKOB NIELSEN)            │
├─────────────────────────────────────────────────────────────────┤
│ 01. Hiển thị Trạng thái Hệ thống (Visibility of System Status)  │
│     Luôn cung cấp phản hồi kịp thời (thanh tiến trình, toasts). │
│                                                                 │
│ 02. Tương đồng giữa Hệ thống & Thực tế (Match System & Real)    │
│     Dùng ngôn ngữ tự nhiên, thuật ngữ quen thuộc với nghiệp vụ. │
│                                                                 │
│ 03. Quyền Kiểm soát & Tự do của Người dùng (Control & Freedom)  │
│     Cung cấp lối thoát hiểm khẩn cấp (Undo, Hủy, Quay lại).     │
│                                                                 │
│ 04. Nhất quán & Tuân thủ Tiêu chuẩn (Consistency & Standards)   │
│     Tuân theo quy ước nền tảng (Định luật Jakob: người dùng     │
│     dành phần lớn thời gian trên các trang web khác).           │
│                                                                 │
│ 05. Ngăn ngừa Sai sót (Error Prevention)                        │
│     Loại bỏ điều kiện dễ gây lỗi hoặc xác nhận trước khi làm.   │
│                                                                 │
│ 06. Nhận biết thay vì Nhớ lại (Recognition Rather Than Recall)  │
│     Làm nổi bật các tùy chọn; giảm thiểu tải ghi nhớ của não bộ.│
│                                                                 │
│ 07. Linh hoạt & Hiệu quả Sử dụng (Flexibility & Efficiency)     │
│     Hỗ trợ phím tắt, thao tác hàng loạt cho người dùng lâu năm. │
│                                                                 │
│ 08. Thiết kế Tối giản & Thẩm mỹ (Aesthetic & Minimalist Design) │
│     Lược bỏ thông tin thừa; tối ưu tỷ lệ tín hiệu / nhiễu.      │
│                                                                 │
│ 09. Hỗ trợ Nhận biết, Chẩn đoán & Khắc phục Lỗi (Help Recover) │
│     Thông báo lỗi bằng ngôn ngữ dễ hiểu và đưa giải pháp xử lý. │
│                                                                 │
│ 10. Trợ giúp & Tài liệu Hướng dẫn (Help and Documentation)      │
│     Cung cấp tooltip ngữ cảnh, FAQ, và tài liệu tra cứu nhanh.  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Thang đo Mức độ Nghiêm trọng Khả dụng (NN/g Standard)

| Mức độ | Tên gọi | Mô tả chi tiết | Hành động yêu cầu |
|---|---|---|---|
| **0** | Không thành vấn đề | Không cản trở tiến trình người dùng | Không cần xử lý |
| **1** | Lỗi mỹ quan | Lệch viền nhẹ hoặc chi tiết trang trí phụ | Sửa nếu còn thời gian |
| **2** | Lỗi nhỏ (Minor) | Gây chậm hoặc bối rối nhẹ; có cách khắc phục dễ | Ưu tiên thấp |
| **3** | Lỗi nghiêm trọng (Major) | Cản trở đáng kể quá trình hoàn thành tác vụ | Ưu tiên cao trước khi phát hành |
| **4** | Thảm họa Khả dụng (Catastrophe) | Chặn đứng tác vụ; có nguy cơ mất dữ liệu | Blocker — phải sửa ngay lập tức |

---

## 3. Ví dụ Thực tế: Bảng Đánh giá Khả dụng Luồng Nộp Đơn Ứng Tuyển

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            USABILITY AUDIT LOG                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ Mã lỗi: USA-01                                                              │
│ Nguyên lý Vi phạm: #05 Ngăn ngừa Sai sót & #03 Quyền Kiểm soát              │
│ Mức độ nghiêm trọng: 4 (Thảm họa)                                           │
│ Mô tả: Khi bấm "Rút đơn ứng tuyển", hệ thống xóa ngay lập tức hồ sơ         │
│ mà không có hộp thoại xác nhận hay cơ chế hoàn tác (Undo) trong 30 ngày.    │
│ Đề xuất: Thêm modal xác nhận hành động nguy hiểm yêu cầu nhập chữ "RUT DON" │
│ hoặc cung cấp thanh snackbar "Hoàn tác" trong 10 giây đầu.                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ Mã lỗi: USA-02                                                              │
│ Nguyên lý Vi phạm: #01 Hiển thị Trạng thái Hệ thống                         │
│ Mức độ nghiêm trọng: 3 (Nghiêm trọng)                                       │
│ Mô tả: Khi tải lên CV dung lượng lớn (>5MB), không có thanh phần trăm hay   │
│ vòng xoay hiển thị; nút bấm bị đơ cứng suốt 4 giây.                         │
│ Đề xuất: Bổ sung thanh tiến trình tải file và vô hiệu hóa nút bấm kèm       │
│ spinner xoay đang xử lý.                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Đánh giá Khả dụng 10 Nguyên lý Heuristic</div>

```markdown
# TASK: Thực hiện Đánh giá Khả dụng (Usability Review) theo 10 Heuristics
Bạn là một Principal Usability Specialist và UX Auditor từ Nielsen Norman Group.

## Screen / Flow Context:
[DÁN WIREFRAME MÀN HÌNH, LUỒNG TƯƠNG TÁC HOẶC CODE FRONTEND TẠI ĐÂY]

## Instructions:
1. Đánh giá một cách hệ thống giao diện trên dựa trên 10 Nguyên lý Khả dụng của Nielsen.
2. Với mỗi lỗi phát hiện:
   - Trích dẫn chính xác nguyên lý bị vi phạm (#01 - #10).
   - Gán Mức độ Nghiêm trọng (Severity Rating từ 0 đến 4).
   - Đưa ra giải pháp khắc phục cụ thể, khả thi (bố cục, nội dung, tương tác).
3. Kết luận bằng Bảng tổng kết Điểm khả dụng và Top 3 việc cần khắc phục ngay.
```
</div>

---

## 5. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Mọi hành động của người dùng đều nhận được phản hồi trực quan trong vòng 100ms chưa?
- [ ] Các tác vụ mang tính xóa/hủy có được bảo vệ bằng modal xác nhận hoặc cơ chế Undo không?
- [ ] Mã lỗi kỹ thuật khô khan có được thay thế bằng hướng dẫn khắc phục thân thiện không?
- [ ] Giao diện có thể điều hướng hoàn toàn bằng bàn phím mà không bị kẹt focus không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Nielsen, Jakob (1994). <em>10 Usability Heuristics for User Interface Design</em>. Nielsen Norman Group.</li>
    <li>Nielsen, Jakob (1995). <em>Severity Ratings for Usability Problems</em>. Nielsen Norman Group.</li>
  </ul>
</div>
