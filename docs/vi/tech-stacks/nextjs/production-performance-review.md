# Hiệu năng Production, Bảo mật & Danh mục Đánh giá (Performance & Security)

Việc đưa các ứng dụng Next.js lên môi trường production đòi hỏi phải tuân thủ nghiêm ngặt ngân sách hiệu năng theo Core Web Vitals, tối ưu hóa kích thước bundle JavaScript và áp dụng các chính sách bảo mật đa tầng.

---

## 1. Tối ưu hóa Hiệu năng theo Chuẩn Core Web Vitals

```
┌─────────────────────────────────────────────────────────────────┐
│                 CORE WEB VITALS TARGET THRESHOLDS               │
├─────────────────────────────────────────────────────────────────┤
│ LCP (Largest Contentful Paint) : < 2.5 giây (Tốt)               │
│   ├── Preload ảnh hero quan trọng bằng `<Image priority />`     │
│   └── Stream dữ liệu bất đồng bộ qua React `<Suspense>`         │
│                                                                 │
│ INP (Interaction to Next Paint): < 200 mili giây (Tốt)          │
│   ├── Đẩy tác vụ tính toán nặng sang Server Actions / Workers   │
│   └── Dùng `useTransition` cho các cập nhật state không khẩn cấp│
│                                                                 │
│ CLS (Cumulative Layout Shift)  : < 0.1 (Tốt)                    │
│   ├── Luôn khai báo `width` & `height` rõ ràng trên `<Image />` │
│   └── Dùng `@next/font` để loại bỏ hoàn toàn hiện tượng giật font│
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Tải Lười Component Động (Dynamic Component Lazy-Loading)

Ngăn chặn các thư viện biểu đồ nặng, trình soạn thảo rich text editor làm phình to gói bundle JavaScript tải trang ban đầu:

```tsx
import dynamic from 'next/dynamic'
import { SkeletonChart } from '@/components/skeletons'

// Thư viện biểu đồ nặng chỉ được tải về khi người dùng cần hiển thị
const AnalyticsChart = dynamic(
  () => import('@/components/analytics-chart').then((mod) => mod.AnalyticsChart),
  {
    ssr: false,
    loading: () => <SkeletonChart />,
  }
)
```

---

## 3. Tăng cường Bảo mật với HTTP Response Headers

Cấu hình các header bảo mật HTTP trong `next.config.mjs` để phòng chống tấn công XSS, clickjacking và MIME sniffing:

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
```

---

## 4. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Đánh giá Hiệu năng & Kiến trúc Next.js Production</div>

```markdown
# TASK: Đánh giá Kiến trúc & An toàn Bảo mật Dự án Next.js Production
Bạn là một Principal Next.js Performance Architect và Chuyên gia Triển khai Vercel.

## Next.js Repository / Code Slice:
[DÁN CẤU TRÚC THƯ MỤC APP ROUTER, NEXT.CONFIG HOẶC ĐOẠN CODE TẠI ĐÂY]

## Instructions:
Thẩm định mã nguồn theo 5 khía cạnh chuẩn production:
1. **Ranh giới Server vs. Client**: Phát hiện các chỉ thị `'use client'` thừa thãi làm phình client bundle.
2. **Luồng Xử lý Dữ liệu & Cache**: Xác thực Server Actions có validate Zod và lệnh `revalidateTag` hợp lý.
3. **Chỉ số Core Web Vitals**: Kiểm tra sử dụng `next/image` (kèm kích thước rõ ràng/priority), `next/font` và dynamic import.
4. **Bảo mật & HTTP Headers**: Đánh giá cấu hình CSP, bảo mật cookie (`HttpOnly`) và bảo vệ route qua `middleware.ts`.
5. Xuất bảng phân loại vấn đề gồm **P0 Lỗi Nghẽn Nghiêm trọng**, **P1 Cảnh báo**, và **P2 Đề xuất Tối ưu**.
```
</div>

---

## 5. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Các component client bên thứ ba dung lượng lớn có được lazy-load qua `next/dynamic` không?
- [ ] Mọi hình ảnh có sử dụng component `next/image` với width, height và định dạng AVIF/WebP không?
- [ ] Toàn bộ web font có được nhúng qua `@next/font` không?
- [ ] File `next.config.mjs` có cấu hình đầy đủ các header bảo mật (`X-Frame-Options`, `HSTS`, `nosniff`) không?
- [ ] Dung lượng bundle đã được phân tích và kiểm tra qua `@next/bundle-analyzer` chưa?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Google Chrome Developers (2024). <em>Core Web Vitals Guide</em>.</li>
    <li>Next.js Documentation — <em>Production Deployment, Analytics, and Security Hardening</em>.</li>
  </ul>
</div>
