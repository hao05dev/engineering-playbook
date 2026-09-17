# Quản lý Trạng thái, Form UX & Xác thực (Forms & Auth)

Các ứng dụng Next.js hiện đại tận dụng các hooks của React 19 (`useActionState`, `useFormStatus`, `useOptimistic`) để mang lại trải nghiệm nhập liệu bền bỉ, tiếp cận tốt (accessible) và nâng cấp lũy tiến (progressively enhanced) được bảo vệ bằng cơ chế xác thực an toàn.

---

## 1. Nâng cấp Lũy tiến & Trải nghiệm Form (React 19 Form UX)

```
┌─────────────────────────────────────────────────────────────────┐
│               PROGRESSIVE ENHANCEMENT FORM FLOW                 │
├─────────────────────────────────────────────────────────────────┤
│ 1. Không cần JS: Form vẫn submit tự nhiên qua HTTP POST chuẩn.  │
│ 2. Khi JS tải xong: `useActionState` quản lý trạng thái pending/lỗi.│
│ 3. Phản hồi Tức thì: `useFormStatus` vô hiệu hóa nút nộp đơn.   │
│ 4. Giao diện Lạc quan: `useOptimistic` cập nhật UI trước khi RPC.│
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Ví dụ Triển khai: Component Form Nhập liệu Chuẩn a11y

```tsx
// components/application-form.tsx
'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitApplication } from '@/app/actions/applications'

const initialState = { error: null, fieldErrors: {}, message: null, success: false }

export function ApplicationForm({ postingId }: { postingId: string }) {
  const [state, formAction] = useActionState(submitApplication, initialState)

  return (
    <form action={formAction} className="space-y-4 max-w-lg">
      <input type="hidden" name="postingId" value={postingId} />

      <div>
        <label htmlFor="coverLetter" className="block text-sm font-medium mb-1">
          Thư giới thiệu / Cover Letter <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          required
          rows={4}
          aria-invalid={Boolean(state.fieldErrors?.coverLetter)}
          aria-describedby={state.fieldErrors?.coverLetter ? 'coverLetter-error' : undefined}
          className="w-full border rounded p-2 text-sm"
          placeholder="Trình bày lý do và năng lực phù hợp với vị trí..."
        />
        {state.fieldErrors?.coverLetter && (
          <p id="coverLetter-error" className="text-red-500 text-xs mt-1" role="alert">
            {state.fieldErrors.coverLetter[0]}
          </p>
        )}
      </div>

      {state.message && (
        <div
          role="status"
          className={`p-3 rounded text-sm ${state.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
        >
          {state.message}
        </div>
      )}

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded font-medium disabled:opacity-50 flex items-center gap-2"
    >
      {pending ? (
        <>
          <span className="spinner" aria-hidden="true" />
          Đang nộp hồ sơ...
        </>
      ) : (
        'Nộp Đơn Ứng Tuyển'
      )}
    </button>
  )
}
```

---

## 3. Kiến trúc Xác thực với Edge Middleware

```
┌─────────────────────────────────────────────────────────────────┐
│                 EDGE MIDDLEWARE AUTHENTICATION                  │
├─────────────────────────────────────────────────────────────────┤
│ Yêu cầu HTTP gửi đến                                            │
│       │                                                         │
│       ▼                                                         │
│ [ middleware.ts ]                                               │
│   ├── Kiểm tra HTTP-only Session Cookie / JWT                   │
│   ├── Nếu Thiếu & Route bảo vệ ──> Chuyển hướng tới `/login`    │
│   ├── Nếu Sai quyền (Sinh viên vào Admin) ──> Trả về HTTP 403   │
│   └── Nếu Hợp lệ ──> Gắn User Context Header & Next()           │
└─────────────────────────────────────────────────────────────────┘
```

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth-session'

export async function middleware(request: NextRequest) {
  const session = await getSession(request)
  const pathname = request.nextUrl.pathname

  if (!session && pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
}
```

---

## 4. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Xây dựng Form UX Chuẩn a11y & Middleware Auth</div>

```markdown
# TASK: Xây dựng Component Form Next.js Tiếp cận Tốt & Cổng Xác thực Middleware
Bạn là một Principal Frontend Architect và Chuyên gia Bảo mật Web.

## Feature Description:
[DÁN YÊU CẦU FORM VÀ QUY TẮC PHÂN QUYỀN XÁC THỰC TẠI ĐÂY]

## Instructions:
1. Xây dựng Form Client Component React 19 sử dụng `useActionState` và `useFormStatus`.
2. Đảm bảo tuân thủ đầy đủ chuẩn tiếp cận WCAG 2.2 AA với `aria-invalid`, `aria-describedby` và phản hồi thông báo `role="status"`.
3. Viết Server Action đi kèm với kiểm tra dữ liệu bằng Zod.
4. Triển khai `middleware.ts` bảo vệ các route nhạy cảm với cơ chế chuyển hướng theo quyền hạn.
```
</div>

---

## 5. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Nút submit của form có hiển thị spinner loading và bị vô hiệu hóa trong khi đang gửi không?
- [ ] Thông báo lỗi có được liên kết chặt chẽ với ô nhập qua `aria-invalid` và `aria-describedby` không?
- [ ] Việc xác thực có được kiểm tra ở cả 2 tầng: Edge Middleware và bên trong Server Actions không?
- [ ] Token phiên đăng nhập có được lưu trong cookie bảo mật `HttpOnly`, `SameSite=Lax` không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>React.dev — <em>Form Actions and useActionState Hook</em>.</li>
    <li>Next.js Documentation — <em>Routing: Middleware and Security Headers</em>.</li>
  </ul>
</div>
