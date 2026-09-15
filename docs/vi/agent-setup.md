# Thiết lập Agent & Môi trường Phát triển (Agent Setup)

Hiệu quả của một AI Agent lập trình phụ thuộc rất lớn vào môi trường, ngữ cảnh dự án và các rào chắn (guardrails) được cấu hình ban đầu. Thiết lập đúng chuẩn giúp agent thực thi chính xác, tận dụng tối đa tool và tránh các thao tác phá hủy ngoài ý muốn.

---

## 1. Kiến trúc Quản lý Ngữ cảnh (Project Context)

Các AI coding agent hiện đại đọc ngữ cảnh từ các tệp tin cấu hình đặt tại thư mục gốc của repository.

```
your-project/
├── .antigravity/             # Cấu hình agent & skills của Google Antigravity
│   └── rules/
│       └── coding-rules.md
├── .cursor/rules/            # Cấu hình quy tắc của Cursor IDE
│   └── architecture.mdc
├── AGENTS.md                 # Chỉ dẫn chung cho mọi AI Agent (Markdown)
├── tsconfig.json             # Ranh giới trình biên dịch
└── package.json              # Khai báo scripts (test, lint, build)
```

### Mẫu Tệp `AGENTS.md` Chuẩn hóa

Đặt file `AGENTS.md` tại thư mục gốc dự án để hướng dẫn bất kỳ LLM hoặc AI Agent nào:

```markdown
# Agent Instructions & Project Context

## Tech Stack
- **Backend**: Java 21, Spring Boot 3.3, Hibernate, PostgreSQL 16
- **Frontend**: Vue 3, TypeScript, Vite, Tailwind CSS
- **Testing**: JUnit 5, Mockito, Testcontainers, Vitest

## Command Rules
- Chạy unit tests: `mvn test` hoặc `npm run test`
- Format mã nguồn: `mvn spotless:apply` hoặc `npm run format`
- Kiểm tra linter: `npm run lint`

## Architectural Invariants
1. Không bao giờ import Controller trực tiếp vào Controller khác.
2. Các Service phải giao tiếp thông qua hợp đồng Interface.
3. Mọi thao tác thay đổi cơ sở dữ liệu phải nằm trong phương thức có `@Transactional`.
4. Luôn viết Unit Test cho các Service mới được tạo ra.
```

---

## 2. Phân quyền Tool & Giới hạn Thực thi An toàn

Khi cấp quyền cho Agent tự động chạy lệnh shell và chỉnh sửa tệp tin, cần áp dụng **Nguyên tắc Đặc quyền Tối thiểu (Principle of Least Privilege)**:

| Nhóm Quyền | Chính sách Khuyến nghị | Lý do |
| :--- | :--- | :--- |
| **Đọc tệp (File Read)** | Toàn quyền trong workspace | Agent cần đọc hiểu toàn cảnh dự án |
| **Ghi tệp (File Write)** | Giới hạn trong thư mục dự án | Tránh ghi đè file hệ thống hoặc thư mục cha |
| **Lệnh Git** | Chỉ đọc & Thao tác trên branch phụ | Tuyệt đối không cho phép `git push --force` lên nhánh main |
| **Cơ sở dữ liệu** | Chỉ kết nối Test DB / Docker | Tuyệt đối không cấp thông tin kết nối database production |
| **Lệnh Shell phá hủy** | Luôn yêu cầu con người xác nhận | Các lệnh như `rm -rf`, `drop table`, `kill` bắt buộc phải confirm |

---

## 3. Điều kiện Tiên quyết cho Công cụ Môi trường Local

Để AI Agent có thể chạy vòng lặp kiểm thử nhanh:

1. **Trình chạy Test Tự động (Deterministic Test Runner)**: Đảm bảo `npm test`, `pytest`, hoặc `mvn test` có thể chạy không cần giao diện (headless) từ CLI và trả về stack trace lỗi rõ ràng.
2. **Linter & Formatter Tự động**: Cấu hình ESLint, Biome hoặc Spotless để Agent tự sửa lỗi format trước khi chuyển sang bước review.
3. **Docker hóa Môi trường Phụ thuộc**: Sử dụng `docker-compose` hoặc Testcontainers để Agent tự khởi động PostgreSQL, Redis, Kafka ở local mà không gây lệch môi trường.

> [!TIP]
> **Tối ưu hóa Token Ngữ cảnh (Context Optimization)**
> Luôn cập nhật `.gitignore` và danh sách loại trừ của Agent. Tránh để Agent index các thư mục rác hoặc quá lớn như `node_modules/`, `target/`, `dist/`, hoặc tệp binary, giúp tiết kiệm token và tăng tốc độ xử lý của mô hình.
