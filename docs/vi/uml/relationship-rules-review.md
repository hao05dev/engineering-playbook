# Quy tắc Quan hệ UML & Checklist Kiểm duyệt (UML Review)

Việc sử dụng sai các mũi tên quan hệ trong UML là một trong những lỗi phổ biến nhất của các kỹ sư và AI Agent. Tài liệu này thiết lập các quy tắc ngữ nghĩa nghiêm ngặt cho toàn bộ các mối quan hệ UML và cung cấp **Bộ Checklist 10 Điểm Kiểm duyệt UML Toàn diện**.

---

## 1. Phân biệt Bản chất: `<<include>>` vs. `<<extend>>`

```
┌─────────────────────────────────────────────────────────────┐
│                 NGỮ NGHĨA INCLUDE VS. EXTEND                │
├─────────────────────────────────────────────────────────────┤
│ • «include»: Luồng con BẮT BUỘC                             │
│   - Use case gốc KHÔNG THỂ hoàn thành nếu thiếu use case con│
│   - Hướng mũi tên: Case Gốc ──────«include»─────► Case Con  │
│   - Ví dụ: (Nộp Hồ Sơ) ──────«include»─────► (Kiểm tra GPA) │
│                                                             │
│ • «extend»: Nhánh MỞ RỘNG TÙY CHỌN / CÓ ĐIỀU KIỆN           │
│   - Use case gốc VẪN hoàn thành bình thường khi không có nó │
│   - Hướng mũi tên: Case Mở Rộng ──«extend»───► Case Gốc     │
│   - Chỉ kích hoạt khi thỏa mãn điều kiện tại Extension Point│
│   - Ví dụ: (Xin Miễn Phí) ────«extend»────► (Đóng Học Phí)  │
└─────────────────────────────────────────────────────────────┘
```

> [!CAUTION]
> **Cạm bẫy Hướng Mũi tên trong `<<extend>>`**
> Trong quan hệ `<<extend>>`, mũi tên trỏ từ **Use Case Mở Rộng VỀ Use Case Gốc**, TUYỆT ĐỐI KHÔNG trỏ ngược lại. Use case gốc hoàn toàn độc lập và không biết về sự tồn tại của use case mở rộng.

---

## 2. Bảng Đối chiếu Ngữ nghĩa Các Mối Quan hệ Cấu trúc

| Quan hệ | Ký hiệu Mũi tên | Chiều trỏ | Ngữ nghĩa | Quy tắc Vòng đời |
| :--- | :--- | :--- | :--- | :--- |
| **Liên kết (Association)** | Đường thẳng nét liền (`───`) | 2 chiều / 1 chiều | "Biết về" hoặc "giao tiếp với" | Độc lập |
| **Kết tập (Aggregation)** | Hình thoi trắng ở phía cha (`◇───`) | Cha tới Con | "Chứa" một phần (Sở hữu yếu) | Con sống độc lập khi cha bị xóa |
| **Hợp thành (Composition)**| Hình thoi đen ở phía cha (`◆───`) | Cha tới Con | "Sở hữu toàn phần" (Sở hữu mạnh)| Con bị xóa cùng khi cha bị xóa |
| **Kế thừa (Generalization)**| Tam giác rỗng ở phía cha (`─▷`) | Con tới Cha | "Là một dạng của" (Kế thừa kiểu)| Phân cấp kế thừa |
| **Hiện thực hóa (Realization)**| Nét đứt với tam giác rỗng (`- - -▷`)| Lớp tới Interface | "Hiện thực hóa hợp đồng hành vi" | Cài đặt Interface |
| **Phụ thuộc (Dependency)** | Nét đứt có mũi tên mở (`<- - -`)| Phụ thuộc tới Nhà cung cấp | "Sử dụng tạm thời qua hàm" | Nhất thời qua tham số |

---

## 3. Bộ Checklist 10 Điểm Kiểm duyệt Sơ đồ UML

Sử dụng checklist này để kiểm toán chất lượng mọi sơ đồ UML trước khi tiến hành viết mã nguồn:

- [ ] **1. Tên Use Case chuẩn**: Toàn bộ Use Case có đặt tên theo cụm Động từ + Danh từ không?
- [ ] **2. Ranh giới Hệ thống (System Boundary)**: Các Use Case nội bộ có được đóng khung tách biệt với Actor ngoài không?
- [ ] **3. Chiều mũi tên Include/Extend**: Hướng mũi tên của `<<include>>` và `<<extend>>` có đúng cú pháp không?
- [ ] **4. Tính toàn vẹn Bản số (Multiplicity)**: Toàn bộ đường Association trong Class Diagram có ghi rõ bản số hai đầu không?
- [ ] **5. Composition vs. Aggregation**: Biểu tượng `◆` có chỉ dùng đúng cho các thực thể con không thể sống độc lập không?
- [ ] **6. Thông điệp Tuần tự**: Toàn bộ mũi tên trong Sequence Diagram có ghi rõ tên hàm và kiểu trả về không?
- [ ] **7. Điều kiện Guard trong FSM**: Toàn bộ các chuyển dịch trạng thái có điều kiện Guard boolean rõ ràng không?
- [ ] **8. Chống Bế tắc (Deadlock)**: Sơ đồ trạng thái có trạng thái nào bị cô lập hoặc không thể kết thúc không?
- [ ] **9. Nhãn Giao thức Triển khai**: Các liên kết trong sơ đồ Deployment có ghi rõ giao thức (HTTPS, gRPC) và cổng port không?
- [ ] **10. Tính Truy vết (Traceability)**: Mọi phần tử trong sơ đồ đều truy vết được về một yêu cầu trong IEEE 29148 không?

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Kiểm toán Ngữ nghĩa & Chất lượng Sơ đồ UML</div>

```markdown
# TASK: Kiểm toán Ngữ nghĩa Sơ đồ UML Chuẩn OMG UML
Bạn là Chuyên gia Đánh giá Sơ đồ UML (Lead UML Reviewer).

## Sơ đồ / Đặc tả Đầu vào:
[DÁN MÃ SƠ ĐỒ HOẶC MÔ TẢ TẠI ĐÂY]

## Yêu cầu Thực hiện:
1. Rà soát sơ đồ dựa trên Bộ Checklist 10 Điểm Kiểm duyệt UML.
2. Kiểm tra kỹ lỗi ngược chiều mũi tên trong <<include>>, <<extend>>, Generalization và Realization.
3. Thẩm định tính chính xác của Multiplicity và quan hệ Composition vs Aggregation.
4. Xuất Báo cáo Đánh giá (Audit Report) phân loại theo:
   - PASS: Đúng chuẩn ngữ nghĩa OMG UML 2.5.1.
   - SEMANTIC_ERROR: Vi phạm quy tắc UML kèm hướng dẫn sửa chi tiết.
   - SMELL: Thiết kế chưa tối ưu có nguy cơ gây hiểu lầm cho lập trình viên.
```
</div>

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>OMG Unified Modeling Language (OMG UML) Specification v2.5.1.</li>
  </ul>
</div>
