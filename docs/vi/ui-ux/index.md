# 09 — Kỹ nghệ Giao diện & Trải nghiệm Người dùng (UI / UX — NN/g)

Ngay cả một hệ thống backend mạnh mẽ nhất cũng sẽ thất bại nếu người dùng không thể hiểu, điều hướng hoặc thao tác trên giao diện. **Kỹ nghệ UI/UX (UI/UX Engineering)** ứng dụng tâm lý học nhận thức, kiến trúc thông tin và các nguyên lý khả dụng của **Nielsen Norman Group (NN/g)** để tạo ra các giao diện trực quan, dễ tiếp cận và có tính phòng thủ cao.

---

## Quy trình 8 Bước Phát triển Giao diện UI/UX

Trong phương pháp luận AI-SDLC, giao diện frontend không bao giờ được vẽ ngẫu hứng. Chúng tuân theo lộ trình 8 bước lấy người dùng làm trung tâm:

```
[ Yêu cầu ] ──► [ Mục tiêu Người dùng ] ──► [ Hành trình (Journey) ] ──► [ Luồng (Flow) ]
                                                                                │
                                                                                ▼
[ Kiểm thử Khả dụng ] ◄── [ Prototype ] ◄── [ Mockup UI ] ◄── [ Wireframe & Kiến trúc IA ]
```

---

## Các Mô-đun Trọng tâm trong Phần này

1. [Mục tiêu, Hành trình & User Flow](./nng-fundamentals-journeys): Mô hình hóa tâm lý người dùng, các điểm chạm và luồng điều hướng.
2. [Kiến trúc Thông tin & Wireframe](./ia-wireframes-mockups): Danh mục màn hình, phân cấp thị giác, bản vẽ khung xương (wireframe) và mockup UI.
3. [Thiết kế Tương tác, Form UX & 4 Trạng thái UI](./interaction-states-accessibility): Validation form trực quan, chuẩn trợ năng WCAG và 4 Trạng thái UI cốt lõi (Loading, Empty, Error, Success).
4. [Kiểm thử Khả dụng & Checklist Review UI/UX](./usability-review): 10 Nguyên tắc Khả dụng (10 Usability Heuristics của Jakob Nielsen) và checklist review.

---

## 4 Quy tắc Bất biến trong Thiết kế UI/UX

1. **Mỗi Màn hình Chỉ Có Đúng 1 Mục tiêu Chính**: Tránh làm rối mắt người dùng bằng nhiều nút bấm hành động chính (Primary CTA) cạnh tranh nhau.
2. **Luôn Thiết kế Đủ 4 Trạng thái UI**: Không bao giờ chỉ vẽ giao diện khi đã có sẵn dữ liệu đẹp. Bắt buộc phải thiết kế cho trạng thái **Đang tải (Loading)**, **Chưa có dữ liệu (Empty/Zero-data)**, **Lỗi (Error)**, và **Thành công (Success)**.
3. **Validate Form Trực quan & Phòng thủ**: Báo lỗi ngay khi người dùng rời khỏi ô nhập liệu (on blur) với thông điệp rõ ràng, thay vì đợi bấm nút Submit mới báo lỗi.
4. **Chuẩn Trợ năng (Accessibility) Mặc định**: Đảm bảo điều hướng được hoàn toàn bằng bàn phím (`Tab`/`Enter`/`Esc`), có viền focus rõ ràng và đạt độ tương phản màu sắc WCAG Cấp AA.

<div class="ref-box">
  <strong>Chuẩn Tham chiếu Chính thức:</strong>
  <ul>
    <li><a href="https://www.nngroup.com/articles/" target="_blank" rel="noopener">Tổ chức Nielsen Norman Group (NN/g) — Nghiên cứu Khả dụng và Trải nghiệm Người dùng</a></li>
    <li>Nielsen, Jakob (1994). <em>10 Nguyên tắc Đánh giá Khả dụng Giao diện (10 Usability Heuristics)</em>. NN/g.</li>
    <li>W3C Web Content Accessibility Guidelines (WCAG) v2.1 (Level AA).</li>
  </ul>
</div>
