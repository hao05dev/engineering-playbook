# Hệ thống Phân loại Thông tin (Information Classification System)

Để ngăn chặn các "đồng thuận ảo tưởng" (hallucinated consensus) và đảm bảo tính minh bạch tuyệt đối, toàn bộ thông tin trao đổi giữa trợ lý AI và lập trình viên phải được gắn nhãn theo **Hệ thống Phân loại Thông tin 4 Cấp bậc**.

---

## 1. 4 Nhãn Phân loại Thông tin (The Four Classification Badges)

```
┌─────────────────────────────────────────────────────────────────┐
│              INFORMATION CLASSIFICATION TAXONOMY                │
├─────────────────────────────────────────────────────────────────┤
│ [CONFIRMED]   Sự thật đã được xác minh qua codebase, DB schema  │
│               hoặc sự xác nhận trực tiếp của người dùng.        │
│                                                                 │
│ [ASSUMPTION]  Giả định ngầm do AI suy luận; bắt buộc phải có    │
│               sự kiểm chứng của người dùng trước khi thi công.  │
│                                                                 │
│ [PROPOSAL]    Đề xuất giải pháp kiến trúc hoặc thiết kế kèm theo│
│               phân tích đánh đổi (trade-offs) và phương án phụ. │
│                                                                 │
│ [QUESTION]    Điểm mơ hồ mang tính chặn đứng (blocker) hoặc     │
│               yêu cầu còn thiếu làm dừng tiến trình xử lý.      │
└─────────────────────────────────────────────────────────────────┘
```

### Hiển thị Trực quan

- <span class="badge-confirmed">[CONFIRMED]</span> — Chân lý ổn định. Không cần tranh luận thêm.
- <span class="badge-assumption">[ASSUMPTION]</span> — Giả định mong manh. Phải kiểm chứng.
- <span class="badge-proposal">[PROPOSAL]</span> — Đề xuất thiết kế. Đang chờ đánh giá đánh đổi.
- <span class="badge-question">[QUESTION]</span> — Điểm nghẽn cần làm rõ. Yêu cầu phản hồi từ con người.

---

## 2. Quy tắc Phân loại dành cho Phản hồi của AI

1. **Không bao giờ đánh đồng `[CONFIRMED]` với `[ASSUMPTION]`**: Nếu người dùng chưa nêu rõ yêu cầu và tài liệu repo không ghi nhận, AI BẮT BUỘC phải gắn nhãn `[ASSUMPTION]`.
2. **Mỗi `[ASSUMPTION]` phải có hướng xử lý rõ ràng**: AI phải trình bày điều gì xảy ra nếu giả định là đúng so với khi giả định bị phủ quyết.
3. **`[PROPOSAL]` phải đi kèm phân tích đánh đổi**: Khi đề xuất một pattern kiến trúc, index CSDL hay thư viện, phải đưa ra ít nhất 1 phương án thay thế kèm lý do chọn.
4. **`[QUESTION]` phải ngắn gọn, súc tích và có tính định hướng**: Tránh đặt câu hỏi chung chung vô định; hãy đưa ra các phương án lựa chọn có cấu trúc.

---

## 3. Ví dụ Thực tế: Đầu ra Phân tích Tính năng của AI

```markdown
### Phân tích: Tính năng Tải lên CV của Sinh viên

- <span class="badge-confirmed">[CONFIRMED]</span> Hạ tầng lưu trữ file là AWS S3 sử dụng pre-signed URLs (đã xác thực tại `src/config/storage.ts:L14`).
- <span class="badge-confirmed">[CONFIRMED]</span> Kích thước file CV tối đa cho phép là 5MB.
- <span class="badge-assumption">[ASSUMPTION]</span> Hệ thống chỉ chấp nhận định dạng PDF và DOCX; các file ảnh (.png, .jpg) sẽ bị từ chối.
- <span class="badge-proposal">[PROPOSAL]</span> Triển khai quét virus bất đồng bộ qua AWS ClamAV Lambda trigger trước khi chuyển trạng thái CV sang `VERIFIED`.
- <span class="badge-question">[QUESTION]</span> Sinh viên có được phép thay thế CV sau khi hồ sơ ứng tuyển đã chuyển sang trạng thái `UNDER_REVIEW` không?
```

---

## 4. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Thực thi Phân loại Thông tin trong Phân tích Kỹ thuật</div>

```markdown
# TASK: Phân tích Yêu cầu Tính năng với Nhãn Phân loại Thông tin
Bạn là một Principal Systems Analyst.

## Input Context:
[DÁN YÊU CẦU TÍNH NĂNG HOẶC BÀI TOÁN KỸ THUẬT TẠI ĐÂY]

## Instructions:
Phân tích dữ liệu đầu vào và phân loại mọi khẳng định kỹ thuật thành một trong 4 cấp bậc:
1. `[CONFIRMED]`: Nêu các sự thật đã được kiểm chứng bởi codebase hoặc các câu lệnh trước.
2. `[ASSUMPTION]`: Nêu rõ các giả định bạn đang đưa ra liên quan đến phạm vi hoặc quy tắc nghiệp vụ.
3. `[PROPOSAL]`: Trình bày các đề xuất thiết kế kỹ thuật kèm phân tích đánh đổi ngắn gọn.
4. `[QUESTION]`: Liệt kê tất cả các điểm mơ hồ chặn tiến độ đòi hỏi sự xác nhận của người dùng.
```
</div>

---

## 5. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Toàn bộ các phát biểu chưa kiểm chứng có được gắn nhãn `[ASSUMPTION]` thay vì coi là sự thật không?
- [ ] Các câu hỏi chặn tiến độ có được làm nổi bật với nhãn `[QUESTION]` không?
- [ ] Các đề xuất có giải thích lý do lựa chọn so với các phương án thay thế không?
- [ ] Mọi sự thật đã xác nhận có dựa trên cơ sở mã nguồn hoặc tài liệu đã duyệt không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>ISO/IEC/IEEE 29148:2018 — Hướng dẫn Thẩm định và Xác thực Yêu cầu Phần mềm.</li>
    <li>SEI (Software Engineering Institute) — Đánh giá Kiến trúc & Phân tích Đánh đổi (ATAM).</li>
  </ul>
</div>
