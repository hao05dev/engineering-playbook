# Truy xuất Dữ liệu, Server Actions & Cơ chế Cache

Next.js cung cấp một luồng xử lý dữ liệu tích hợp hoàn chỉnh kết hợp giữa việc lấy dữ liệu phía server (server-side data fetching), các hàm gọi thủ tục từ xa **Server Actions**, và **kiến trúc Cache 4 tầng**.

---

## 1. Kiến trúc Cache 4 Tầng trong Next.js

```
┌─────────────────────────────────────────────────────────────────┐
│                 NEXT.JS 4-TIER CACHING PIPELINE                 │
├─────────────────────────────────────────────────────────────────┤
│ 1. Request Memoization (Server - Theo từng Request)             │
│    Khử trùng lặp các lệnh gọi `fetch()` giống nhau trong 1 lần  │
│    render. Vòng đời: 1 chu kỳ request duy nhất.                 │
│                                                                 │
│ 2. Data Cache (Server - Bền vững)                               │
│    Lưu trữ dữ liệu đã fetch xuyên suốt nhiều request & deploy.  │
│    Điều khiển qua `fetch(url, { next: { tags: ['posts'] } })`.  │
│                                                                 │
│ 3. Full Route Cache (Server - Lúc Build / Revalidate)           │
│    Cache sẵn HTML và RSC payload cho static routes khi build.   │
│                                                                 │
│ 4. Router Cache (Trình duyệt Client - Theo phiên)               │
│    Lưu tạm RSC payloads trong bộ nhớ RAM trình duyệt khi duyệt. │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Dùng Server Actions để Đột biến Dữ liệu An toàn

Server Actions là các hàm bất đồng bộ thực thi trên máy chủ, có thể gọi trực tiếp từ form HTML hoặc component client:

```tsx
// app/actions/applications.ts
'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth'

const ApplicationSchema = z.object({
  postingId: z.string().uuid(),
  coverLetter: z.string().min(20).max(2000),
})

export async function submitApplication(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    return { error: 'UNAUTHORIZED', message: 'Bạn cần đăng nhập để tiếp tục.' }
  }

  const validated = ApplicationSchema.safeParse({
    postingId: formData.get('postingId'),
    coverLetter: formData.get('coverLetter'),
  })

  if (!validated.success) {
    return {
      error: 'VALIDATION_ERROR',
      fieldErrors: validated.error.flatten().fieldErrors,
    }
  }

  try {
    await db.application.create({
      data: {
        studentId: session.user.id,
        postingId: validated.data.postingId,
        coverLetter: validated.data.coverLetter,
        status: 'SUBMITTED',
      },
    })

    // Xóa cache danh sách đơn ứng tuyển để hiển thị dữ liệu mới nhất
    revalidateTag(`applications-${session.user.id}`)

    return { success: true, message: 'Nộp đơn ứng tuyển thành công!' }
  } catch (err: any) {
    return { error: 'DATABASE_ERROR', message: 'Không thể lưu đơn ứng tuyển.' }
  }
}
```

---

## 3. Route Handlers (`app/api/.../route.ts`)

Sử dụng Route Handlers cho các endpoint REST bên ngoài, webhook của bên thứ ba (Stripe, GitHub), hoặc các phản hồi phi HTML:

```tsx
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Thiếu signature xác thực' }, { status: 400 })
  }

  // Xử lý sự kiện webhook sau khi đã verify chữ ký số...
  return NextResponse.json({ received: true }, { status: 200 })
}
```

---

## 4. Chiến lược Tái xác thực Cache (On-Demand Revalidation)

```tsx
// Làm tươi lại dữ liệu cache của một route segment hoặc theo tag
import { revalidatePath, revalidateTag } from 'next/cache'

// Theo đường dẫn: Xóa cache URL cụ thể
revalidatePath('/dashboard/applications')

// Theo thẻ Tag (Khuyên dùng): Xóa dữ liệu cache được gắn tag trên toàn hệ thống
revalidateTag('job-postings')
```

---

## 5. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Viết Server Actions Chuẩn Type-Safe & Quản lý Cache</div>

```markdown
# TASK: Xây dựng Server Action Type-Safe & Chiến lược Cache Next.js
Bạn là một Staff Fullstack Engineer chuyên sâu về Next.js App Router.

## Feature / Mutation Context:
[DÁN YÊU CẦU TÍNH NĂNG, SCHEMA DỮ LIỆU HOẶC LOGIC ĐỘT BIẾN TẠI ĐÂY]

## Instructions:
1. Viết Server Action sử dụng chỉ thị `'use server'` kèm kiểm tra dữ liệu nghiêm ngặt bằng Zod.
2. Thực thi kiểm tra xác thực phiên (session auth) và phân quyền trước khi thao tác CSDL.
3. Trả về cấu trúc kết quả chuẩn (`{ error, fieldErrors, success, message }`).
4. Áp dụng xóa cache theo yêu cầu bằng `revalidateTag` hoặc `revalidatePath`.
5. Đảm bảo tuyệt đối không làm lộ token bí mật hay API key xuống client bundle.
```
</div>

---

## 6. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Toàn bộ thao tác ghi/sửa dữ liệu có dùng Server Actions kèm validate Zod không?
- [ ] Phiên đăng nhập và quyền hạn có được kiểm tra chặt chẽ bên trong từng Server Action không?
- [ ] Các truy vấn dữ liệu có được gắn nhãn cache tag rõ ràng để tái xác thực không?
- [ ] Lệnh `revalidateTag` có được gọi ngay sau khi ghi CSDL thành công không?
- [ ] Route Handlers có được giới hạn đúng cho webhooks và public API không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Next.js Documentation — <em>Data Fetching, Caching, and Revalidating</em>. Vercel.</li>
    <li>Next.js Documentation — <em>Server Actions and Mutations</em>.</li>
  </ul>
</div>
