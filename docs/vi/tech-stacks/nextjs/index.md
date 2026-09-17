# Tổng quan Kỹ thuật Fullstack Next.js (Next.js Engineering)

Next.js là framework React hàng đầu thế giới để xây dựng các ứng dụng web fullstack chuẩn production. Với mô hình **App Router**, **React Server Components (RSC)** và **Server Actions**, Next.js chuyển toàn bộ tác vụ lấy dữ liệu (data fetching) và logic nhạy cảm về phía máy chủ, đồng thời tối ưu tốc độ tương tác tức thì phía client.

---

## 1. Kiến trúc Cốt lõi & Mô hình Tư duy

```
┌─────────────────────────────────────────────────────────────────┐
│               NEXT.JS APP ROUTER ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────┤
│ Ranh giới Client ('use client')                                 │
│   ├── UI Tương tác (Nút bấm, Hộp thoại Modal, Form nhập liệu)   │
│   ├── Browser APIs (localStorage, geolocation, window)          │
│   └── React Hooks (useState, useEffect, useActionState)         │
│                                │                                │
│                     (Ranh giới Mạng / RPC)                      │
│                                ▼                                │
│ Ranh giới Server (Server Components mặc định)                   │
│   ├── React Server Components (Kích thước JS 0kb, truy vấn DB) │
│   ├── Server Actions ('use server' - RPC mutations)             │
│   ├── Route Handlers (GET/POST endpoints & Webhooks)            │
│   └── Edge Middleware (Xác thực Auth, Chuyển hướng, Headers)    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Các Nguyên lý Kiến trúc dành cho AI Agent & Lập trình viên

1. **Ưu tiên Server Mặc định (Server-First)**: Mọi component trong thư mục `app/` đều là Server Component trừ khi được khai báo chỉ thị `'use client'`.
2. **Đẩy Ranh giới Client xuống Thấp nhất**: Giữ phần lớn cây component trên server; chỉ gắn `'use client'` ở các component lá (leaf components) có gắn event listener hoặc state.
3. **Lấy Dữ liệu Đồng vị trí (Co-located Fetching)**: Truy vấn dữ liệu trực tiếp bên trong Server Component bất đồng bộ thay vì truyền prop qua nhiều tầng hoặc dùng Redux cồng kềnh.
4. **Dùng Server Actions cho Thao tác Ghi**: Thực hiện ghi vào CSDL hoặc gọi API bên ngoài thông qua Server Actions có type-safe và kiểm duyệt bằng Zod.

---

## 3. Thành phần Công nghệ Chuẩn

- **Framework**: Next.js 14 / 15 (App Router)
- **UI Library**: React 19 (Server Components, Actions, Hooks)
- **Ngôn ngữ**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS / CSS Modules / Shadcn UI
- **Validate Dữ liệu**: Zod
- **Truy cập CSDL**: Prisma / Drizzle ORM / Direct SQL

---

## 4. Lộ trình Nội dung

- [App Router & Server Components](./app-router-server-components.md) — Phân biệt Server vs Client Components, Streaming SSR với Suspense, Layouts & Templates.
- [Truy xuất Dữ liệu, Server Actions & Cơ chế Cache](./data-fetching-caching.md) — Kiến trúc Cache 4 tầng, Server Actions, Route Handlers và tái xác thực cache (revalidation).
- [Quản lý Trạng thái, Form UX & Xác thực](./state-forms-auth.md) — `useActionState`, xác thực Zod, Middleware Auth và quản lý session cookie an toàn.
- [Hiệu năng Production & Danh mục Đánh giá](./production-performance-review.md) — Tối ưu hóa bundle, Core Web Vitals, security headers và prompt AI Reviewer.
