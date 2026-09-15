# Phân tích Stakeholder & Nhận diện Actor (Stakeholder Analysis)

Một hệ thống phần mềm thành công hay thất bại phụ thuộc vào việc nó dung hòa tốt như thế nào giữa nhu cầu, ràng buộc và các động cơ mâu thuẫn của các bên liên quan. Bước **Phân tích Stakeholder & Nhận diện Actor** chuẩn hóa danh sách những ai tương tác với hệ thống và giá trị mà họ mong muốn đạt được.

---

## 1. Phân biệt Stakeholder và System Actor

- **Stakeholder (Bên liên quan)**: Bất kỳ cá nhân, nhóm người hoặc tổ chức nào có lợi ích gắn liền hoặc chịu tác động bởi phần mềm (ví dụ: Hiệu trưởng, Trưởng khoa, Chuyên viên Pháp chế, Sinh viên, Nhà tuyển dụng).
- **Actor (Tác nhân hệ thống trong UML)**: Một vai trò cụ thể được đảm nhiệm bởi một thực thể bên ngoài (con người, hệ thống ngoài, thiết bị phần cứng) tương tác trực tiếp với phần mềm thông qua các giao diện (UI/API).

```
┌─────────────────────────────────────────────────────────────┐
│                   PHÂN CẤP CÁC BÊN LIÊN QUAN                │
├─────────────────────────────────────────────────────────────┤
│ • Actor Chính (Primary): Trực tiếp khởi tạo tác vụ (Sinh viên)│
│ • Actor Phụ (Secondary): Cung cấp dịch vụ hỗ trợ (Auth0, IdP)│
│ • Stakeholder Gián tiếp: Đặt luật & Kiểm toán (Trưởng khoa) │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Ma trận Quyền lực vs. Mức độ Quan tâm (Power / Interest)

Phân nhóm các bên liên quan giúp định hình độ sâu của phân tích và ưu tiên phân quyền bảo mật:

| Quyền lực Cao / Quan tâm Cao (Quản lý Chặt chẽ) | Quyền lực Cao / Quan tâm Thấp (Làm cho Hài lòng) |
| :--- | :--- |
| **Giảng viên Hướng dẫn, Ban Chủ nhiệm Khoa**<br>Cần luồng thao tác duyệt hồ sơ hàng ngày và quyền phủ quyết. | **Hội đồng Pháp chế & An toàn Thông tin**<br>Bắt buộc tuân thủ bảo mật dữ liệu sinh viên và chuẩn SSO. |
| **Quyền lực Thấp / Quan tâm Cao (Cập nhật Liên tục)** | **Quyền lực Thấp / Quan tâm Thấp (Theo dõi Định kỳ)** |
| **Sinh viên, Thực tập sinh Doanh nghiệp**<br>Người dùng thường xuyên nhất, đòi hỏi giao diện nhanh và trực quan. | **Phòng Hợp tác Doanh nghiệp**<br>Chỉ nhận báo cáo thống kê tổng kết cuối kỳ. |

---

## 3. Giải quyết Xung đột Mục tiêu giữa các Stakeholder

Trong thực tế, mục tiêu của các bên thường xuyên va chạm nhau:
- **Mục tiêu Sinh viên**: Muốn nộp đơn ứng tuyển nhanh 1-click với càng ít form nhập liệu bắt buộc càng tốt.
- **Mục tiêu Giảng viên**: Muốn kiểm tra kỹ lưỡng bảng điểm, GPA và chứng chỉ chuyên ngành trước khi hồ sơ rời khỏi trường.
- **Giải pháp Kiến trúc**: Thiết kế quy trình phê duyệt nhiều bước. Sinh viên tạo bản nháp nhanh chóng, nhưng hệ thống sẽ tự động đối soát điều kiện tiên quyết trước khi bắn thông báo cho giảng viên duyệt.

---

## 4. Ví dụ Thực tế: Bảng Danh mục Actor (Actor Catalog)

```
┌──────────────┬───────────────────────────────┬─────────────────────────────┐
│ Tên Actor    │ Phân loại Vai trò             │ Trách nhiệm Cốt lõi         │
├──────────────┼───────────────────────────────┼─────────────────────────────┤
│ Sinh viên    │ Actor Chính (Người dùng)      │ Tìm kiếm tin, nộp đơn, báo cáo│
│ Giảng viên   │ Actor Chính (Người dùng)      │ Thẩm định điều kiện, duyệt đơn│
│ Doanh nghiệp │ Actor Chính (Người dùng)      │ Đăng tin, lên lịch phỏng vấn│
│ Cổng Thanh toán│ Actor Phụ (Hệ thống ngoài)  │ Xử lý giao dịch thanh toán  │
│ SSO / IdP    │ Actor Phụ (Hạ tầng ngoài)     │ Xác thực danh tính người dùng │
└──────────────┴───────────────────────────────┴─────────────────────────────┘
```

---

## 5. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Phân tích Stakeholder & Actor</div>

```markdown
# TASK: Phân tích Stakeholder & Nhận diện Actor Hệ thống
Bạn là Chuyên gia Phân tích Nghiệp vụ (Lead Business Analyst).

## Bối cảnh Đầu vào:
Hệ thống / Domain: [NHẬP MÔ TẢ HỆ THỐNG HOẶC TÍNH NĂNG TẠI ĐÂY]

## Yêu cầu Thực hiện:
1. Nhận diện toàn bộ Primary Actors, Secondary Supporting Actors và Indirect Stakeholders.
2. Lập Ma trận Quyền lực vs Mức độ Quan tâm (Power/Interest Matrix).
3. Chỉ ra ít nhất 3 xung đột lợi ích tiềm ẩn giữa các bên và đề xuất giải pháp kiến trúc/quy trình để dung hòa.
4. Lập Bảng Danh mục Actor (Actor Catalog) gồm Tên Actor, Phân loại, Mục tiêu và Quyền hạn trong hệ thống.
5. Gắn nhãn phân loại: [CONFIRMED], [ASSUMPTION], [PROPOSAL], [QUESTION].
```
</div>

---

## 6. Checklist Kiểm duyệt (Review Checklist)

- [ ] Đã tách biệt rõ ràng giữa con người dùng UI và các hệ thống bên ngoài gọi qua API/Webhook chưa?
- [ ] Mọi Actor chính đều có mục tiêu kinh doanh (business goal) rõ ràng chưa?
- [ ] Các xung đột lợi ích đã được lập hồ sơ kèm giải pháp xử lý cụ thể chưa?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>OMG Unified Modeling Language (OMG UML) v2.5.1 — Actor Modeling.</li>
    <li>BABOK Guide v3.0 — Chapter 3: Lập Kế hoạch và Giám sát Phân tích Nghiệp vụ.</li>
  </ul>
</div>
