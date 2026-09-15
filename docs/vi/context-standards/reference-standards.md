# Tiêu chuẩn Kỹ thuật Quốc tế & Nguồn Tham chiếu (Reference Standards)

Kho Tri thức Kỹ thuật Phần mềm AI (AI Software Engineering Knowledge Base) được xây dựng vững chắc trên nền tảng các tiêu chuẩn kỹ thuật quốc tế đã được công nhận, các khung kiến trúc chuẩn mực và thực tiễn tốt nhất trong ngành công nghiệp phần mềm.

---

## 1. Ma trận Nguồn Tham chiếu & Tiêu chuẩn Quốc tế

| Tiêu chuẩn / Khung kiến trúc | Cơ quan / Tác giả | Phạm vi Chính | Ứng dụng trong Kho Tri thức |
|---|---|---|---|
| **ISO/IEC/IEEE 29148:2018** | IEEE Computer Society / ISO / IEC | Kỹ thuật & Đặc tả Yêu cầu | Cú pháp Functional/NFR, BRD/PRD/SRS, tiêu chí Given-When-Then |
| **OMG UML 2.5.1** | Object Management Group (OMG) | Mô hình hóa Hệ thống & Hành vi | Sơ đồ Class, Sequence, State Machine, Activity, Component |
| **The C4 Model** | Simon Brown | Kiến trúc Phân tầng Trực quan | Context (L1), Container (L2), Component (L3), Code (L4) |
| **Khung Kiến trúc arc42** | Dr. Peter Hruschka & Dr. Gernot Starke | Giao tiếp & Cấu trúc Kiến trúc | Bản mẫu kiến trúc 12 phần toàn diện và thực tế |
| **MADR 3.0.0** | MADR Open Source Community | Quyết định Kiến trúc (ADRs) | Nhật ký quyết định bất biến, phân tích đánh đổi ưu/nhược điểm |
| **OpenAPI 3.1.0** | OpenAPI Initiative / Linux Foundation | Đặc tả RESTful API Chuẩn hóa | JSON Schema, hợp đồng endpoint, mã trạng thái, auth scopes |
| **10 Heuristics Khả dụng** | Nielsen Norman Group (Jakob Nielsen) | Thẩm định Khả dụng Giao diện | 10 nguyên lý thiết kế và thang đo mức độ lỗi từ 0 đến 4 |
| **WCAG 2.2 Level AA** | W3C / Web Accessibility Initiative (WAI) | Khả năng Tiếp cận Web | Semantic HTML, liên kết ARIA, vòng focus, độ tương phản 4.5:1 |
| **Developer Doc Style Guide** | Google Open Source | Kỹ thuật Viết Tài liệu Phần mềm | Thể chủ động, tối ưu đọc lướt, bảng so sánh, metadata |
| **ISTQB / IEEE 829** | ISTQB & IEEE Computer Society | Kiểm thử & Đảm bảo Chất lượng | Master Test Plan, Ma trận Kiểm thử, cổng kiểm soát hồi quy |

---

## 2. Trích dẫn Chi tiết Các Tiêu chuẩn Cốt lõi

### 1. Kỹ thuật Yêu cầu Phần mềm (ISO/IEC/IEEE 29148:2018)
- **Tiêu chuẩn**: *Systems and software engineering — Life cycle processes — Requirements engineering*.
- **Nhà xuất bản**: Hiệp hội Tiêu chuẩn IEEE / Tổ chức Tiêu chuẩn hóa Quốc tế (ISO).
- **Nguyên lý cốt lõi**: Yêu cầu phải mang tính nguyên tử, rõ nghĩa, kiểm thử được, phân cấp ưu tiên và có khả năng truy vết hai chiều.

### 2. Ngôn ngữ Mô hình hóa Thống nhất OMG UML (OMG UML v2.5.1)
- **Tiêu chuẩn**: *OMG Unified Modeling Language (OMG UML), Version 2.5.1*.
- **Nhà xuất bản**: Object Management Group (OMG), 2017.
- **Nguyên lý cốt lõi**: Cú pháp trực quan chính xác cho quan hệ cấu trúc (kế thừa, hợp thành, kết tập) và hành vi tuần tự.

### 3. Mô hình C4 Trực quan hóa Kiến trúc Phần mềm
- **Tác giả**: Simon Brown (2020).
- **Nguyên lý cốt lõi**: Các tầng trừu tượng có thể phóng to/thu nhỏ từ Bối cảnh Hệ thống mức cao xuống các Container triển khai và Component mã nguồn.

### 4. Khung Giao tiếp Kiến trúc arc42
- **Tác giả**: Dr. Gernot Starke & Dr. Peter Hruschka.
- **Nguyên lý cốt lõi**: Bộ tài liệu kiến trúc thực dụng 12 phần trả lời thấu đáo 3 câu hỏi: "Vì sao", "Cái gì" và "Như thế nào".

### 5. Đặc tả Giao diện Lập trình OpenAPI (OAS 3.1.0)
- **Nhà xuất bản**: Sáng kiến OpenAPI / Linux Foundation (2021).
- **Nguyên lý cốt lõi**: Tương thích hoàn toàn JSON Schema 2020-12 phục vụ khai báo hợp đồng API và tự động sinh mã nguồn client/server.

### 6. Tiêu chuẩn Khả dụng Nielsen Norman Group
- **Tác giả**: Jakob Nielsen & Rolf Molich (1990, 1994, 2020).
- **Nguyên lý cốt lõi**: 10 quy tắc heuristic điều phối tương tác người-máy và phân loại mức độ nghiêm trọng của khiếm khuyết UI/UX.

### 7. Hướng dẫn Khả năng Tiếp cận Nội dung Web W3C (WCAG 2.2)
- **Nhà xuất bản**: World Wide Web Consortium (Khuyến nghị W3C, 2023).
- **Nguyên lý cốt lõi**: Giao diện người dùng Dễ cảm nhận, Dễ vận hành, Dễ hiểu và Bền vững cho cả con người và công nghệ trợ năng.

### 8. Hướng dẫn Phong cách Tài liệu Lập trình viên của Google
- **Nhà xuất bản**: Nhóm Tài liệu Nguồn mở Google.
- **Nguyên lý cốt lõi**: Viết tài liệu kỹ thuật rõ ràng, trực diện, tập trung vào người đọc với tải nhận thức tối thiểu.

---

## 3. Quản trị & Tuân thủ Tiêu chuẩn

Mọi prompt AI, tác vụ sinh mã nguồn và đánh giá tài liệu được thực hiện trong kho tri thức này đều được kiểm soát tính tuân thủ nghiêm ngặt theo các tiêu chuẩn kỹ thuật trên.
