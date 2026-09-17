# Form UX, State Management & Authentication

Modern Next.js applications leverage React 19 hooks (`useActionState`, `useFormStatus`, `useOptimistic`) to provide resilient, accessible, and progressively enhanced user forms backed by secure authentication.

---

## 1. Progressive Enhancement & Form UX (React 19)

```
┌─────────────────────────────────────────────────────────────────┐
│               PROGRESSIVE ENHANCEMENT FORM FLOW                 │
├─────────────────────────────────────────────────────────────────┤
│ 1. Zero JS Fallback: Form submits natively via standard POST.   │
│ 2. Hydrated State: `useActionState` manages pending/error state.│
│ 3. Instant Feedback: `useFormStatus` disables submit button.    │
│ 4. Optimistic UI: `useOptimistic` updates UI before server RPC. │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Practical Implementation: Accessible Form Component

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
          Cover Letter <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          required
          rows={4}
          aria-invalid={Boolean(state.fieldErrors?.coverLetter)}
          aria-describedby={state.fieldErrors?.coverLetter ? 'coverLetter-error' : undefined}
          className="w-full border rounded p-2 text-sm"
          placeholder="Explain your interest and qualifications..."
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
          Submitting Application...
        </>
      ) : (
        'Submit Application'
      )}
    </button>
  )
}
```

---

## 3. Middleware-Based Authentication Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                 EDGE MIDDLEWARE AUTHENTICATION                  │
├─────────────────────────────────────────────────────────────────┤
│ Incoming HTTP Request                                           │
│       │                                                         │
│       ▼                                                         │
│ [ middleware.ts ]                                               │
│   ├── Check HTTP-only Session Cookie / JWT                      │
│   ├── If Missing & Protected Route ──> Redirect to `/login`     │
│   ├── If Role Mismatch (e.g. Student in Admin) ──> Return 403   │
│   └── If Valid ──> Attach User Context Header & Next()          │
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

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Form UX & Next.js Authentication Guard</div>

```markdown
# TASK: Implement Accessible Next.js Form & Middleware Auth Gate
You are a Principal Frontend Architect and Web Security Specialist.

## Feature Description:
[PASTE FORM REQUIREMENTS AND AUTHENTICATION RULES]

## Instructions:
1. Construct a React 19 Client Component Form using `useActionState` and `useFormStatus`.
2. Ensure full accessibility compliance (WCAG 2.2 AA) with `aria-invalid`, `aria-describedby`, and live `role="status"` feedback.
3. Write the accompanying Server Action with Zod validation.
4. Implement `middleware.ts` protecting sensitive route patterns with role-based redirection.
```
</div>

---

## 5. Review Checklist

- [ ] Does the form submit button show a pending spinner and disable during submission?
- [ ] Are error messages connected to inputs using `aria-invalid` and `aria-describedby`?
- [ ] Is authentication verified both at the Edge Middleware layer and inside Server Actions?
- [ ] Are session tokens stored in secure, `HttpOnly`, `SameSite=Lax` cookies?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>React.dev — <em>Form Actions and useActionState Hook</em>.</li>
    <li>Next.js Documentation — <em>Routing: Middleware and Security Headers</em>.</li>
  </ul>
</div>
