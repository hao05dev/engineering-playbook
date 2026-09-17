# App Router & React Server Components (RSC)

Mô hình Next.js App Router tận dụng sức mạnh của **React Server Components (RSC)** để render giao diện phía server mà không gửi các thư viện phụ thuộc JavaScript xuống client bundle.

---

## 1. So sánh Server Components vs. Client Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 SERVER VS CLIENT COMPONENT COMPARISON                       │
├────────────────────────────────┬────────────────────────────────────────────┤
│ Đặc tính                       │ Server Component (Mặc định)                │ Client Component ('use client') │
├────────────────────────────────┼────────────────────────────────────────────┼─────────────────────────────────┤
│ Lấy dữ liệu (Data Fetching)    │ Async/await trực tiếp vào DB hoặc API kín  │ Dùng fetch, SWR, hoặc React Query│
│ Thông tin nhạy cảm (API Keys)  │ Được bảo mật an toàn trên server           │ Nguy cơ lộ ra trình duyệt       │
│ Kích thước JS gửi về Client    │ 0 KB JavaScript gửi về trình duyệt         │ Phải tải code JS về trình duyệt │
│ Browser APIs (window, storage) │ Không (chạy phía server)                   │ Có                              │
│ React Hooks (useState, effects)│ Không                                      │ Có                              │
│ Trình lắng nghe sự kiện        │ Không                                      │ Có                              │
└────────────────────────────────┴────────────────────────────────────────────┴─────────────────────────────────┘
```

---

## 2. Quy tắc Vàng trong Phối hợp Component (Composition Pattern)

Để tránh biến toàn bộ cây component con thành Client Components, **hãy truyền Server Component dưới dạng `children`** vào trong Client Component:

```tsx
// ClientWrapper.tsx
'use client'
import { useState } from 'react'

export function CollapsibleSidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <div>{children}</div>} {/* children vẫn giữ nguyên là Server Component! */}
    </div>
  )
}
```

---

## 3. Quy ước Tệp Đặc biệt trong App Router

```
app/
├── layout.tsx         # Layout gốc hoặc lồng nhau (giữ nguyên state khi chuyển trang)
├── page.tsx           # Điểm cuối giao diện duy nhất của route
├── loading.tsx        # Giao diện fallback tức thì được hỗ trợ bởi React Suspense
├── error.tsx          # Ranh giới bắt lỗi runtime ('use client' bắt buộc)
├── not-found.tsx      # Giao diện 404 tùy chỉnh khi không tìm thấy đường dẫn
└── global-error.tsx   # Ranh giới bắt lỗi cao nhất cho root layout
```

---

## 4. Streaming SSR với React `<Suspense>`

Thay vì bắt toàn bộ trang web phải chờ các truy vấn CSDL chậm, hãy stream các thành phần tĩnh ngay lập tức và bọc các truy vấn chậm vào `<Suspense>`:

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { MetricsOverview } from '@/components/metrics-overview'
import { MetricsSkeleton } from '@/components/skeletons'
import { UserGreeting } from '@/components/user-greeting'

export default async function DashboardPage() {
  return (
    <main className="p-8 space-y-6">
      {/* Render nhanh phía server */}
      <UserGreeting />

      {/* Phân đoạn bất đồng bộ được stream về sau */}
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsOverview />
      </Suspense>
    </main>
  )
}

// components/metrics-overview.tsx (Async Server Component)
async function MetricsOverview() {
  const data = await db.metrics.findMany() // Query chậm (~800ms)
  return <div className="grid grid-cols-3 gap-4">{/* Render metrics */}</div>
}
```

---

## 5. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Tái cấu trúc Server & Client Components trong Next.js</div>

```markdown
# TASK: Tối ưu Cấu trúc Next.js với React Server Components & Streaming
Bạn là một Principal Next.js & React 19 Architect.

## Input Component / Page Code:
[DÁN CODE COMPONENT HOẶC PAGE TẠI ĐÂY]

## Instructions:
1. Xác định và loại bỏ các chỉ thị `'use client'` không cần thiết.
2. Chuyển các truy vấn dữ liệu trực tiếp vào async Server Components.
3. Tách biệt logic tương tác vào các Client Component lá nhỏ gọn truyền qua `{children}`.
4. Bọc các component bất đồng bộ chậm vào React `<Suspense>` kèm khung skeleton loading.
5. Tạo các tệp ranh giới chuẩn `loading.tsx` và `error.tsx`.
```
</div>

---

## 6. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Truy vấn CSDL và API secret keys có được giới hạn nghiêm ngặt trong Server Components không?
- [ ] Chỉ thị `'use client'` có chỉ áp dụng cho các component lá có tương tác không?
- [ ] Server Components có được truyền dưới dạng `children` vào container Client Component không?
- [ ] Các truy vấn chậm có được bọc trong `<Suspense>` kèm skeleton loader không?
- [ ] Đã có tệp `error.tsx` để bắt và xử lý ngoại lệ unhandled chưa?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Next.js Documentation — <em>React Server Components & Routing Fundamentals</em>. Vercel.</li>
    <li>React.dev — <em>Server Components Architecture & Actions Specification</em>.</li>
  </ul>
</div>
