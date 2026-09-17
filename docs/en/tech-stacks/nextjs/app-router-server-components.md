# App Router & Server Components (RSC)

The Next.js App Router leverages **React Server Components (RSC)** to render UI on the server without shipping JavaScript dependencies to the client bundle.

---

## 1. Server Components vs. Client Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 SERVER VS CLIENT COMPONENT COMPARISON                       │
├────────────────────────────────┬────────────────────────────────────────────┤
│ Feature                        │ Server Component (Default)                 │ Client Component ('use client') │
├────────────────────────────────┼────────────────────────────────────────────┼─────────────────────────────────┤
│ Data Fetching                  │ Async/await directly to DB or private APIs │ via fetch, SWR, or React Query  │
│ Sensitive Secrets (API Keys)   │ Securely kept on server                    │ Exposed to browser bundle       │
│ Client Bundle Impact           │ 0 KB JavaScript sent to browser            │ Ships JavaScript to client      │
│ Browser APIs (window, storage) │ No (renders server-side)                   │ Yes                             │
│ React Hooks (useState, effects)│ No                                         │ Yes                             │
│ Event Listeners (onClick)      │ No                                         │ Yes                             │
└────────────────────────────────┴────────────────────────────────────────────┴─────────────────────────────────┘
```

---

## 2. The Golden Rule of Component Composition

To prevent turning large subtrees into Client Components, **pass Server Components as `children`** into Client Components:

```tsx
// ClientWrapper.tsx
'use client'
import { useState } from 'react'

export function CollapsibleSidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <div>{children}</div>} {/* children remains a Server Component! */}
    </div>
  )
}
```

---

## 3. Special App Router File Conventions

```
app/
├── layout.tsx         # Root or nested layout (preserves state across navigation)
├── page.tsx           # Unique UI route endpoint
├── loading.tsx        # Instant fallback UI powered by React Suspense
├── error.tsx          # Error boundary for runtime errors ('use client' required)
├── not-found.tsx      # Custom 404 UI for unmatched paths or notFound() calls
└── global-error.tsx   # Top-level error boundary for the root layout
```

---

## 4. Streaming SSR with React `<Suspense>`

Instead of blocking the entire page on slow database queries, stream fast static components immediately and wrap slow queries in `<Suspense>`:

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { MetricsOverview } from '@/components/metrics-overview'
import { MetricsSkeleton } from '@/components/skeletons'
import { UserGreeting } from '@/components/user-greeting'

export default async function DashboardPage() {
  return (
    <main className="p-8 space-y-6">
      {/* Fast server render */}
      <UserGreeting />

      {/* Streamed asynchronous chunk */}
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsOverview />
      </Suspense>
    </main>
  )
}

// components/metrics-overview.tsx (Async Server Component)
async function MetricsOverview() {
  const data = await db.metrics.findMany() // Slow query (~800ms)
  return <div className="grid grid-cols-3 gap-4">{/* Render metrics */}</div>
}
```

---

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Server & Client Component Architecture Refactor</div>

```markdown
# TASK: Refactor Next.js UI using React Server Components (RSC) & Streaming
You are a Principal Next.js & React 19 Architect.

## Input Component / Page Code:
[PASTE NEXT.JS COMPONENT OR PAGE]

## Instructions:
1. Identify all components unnecessarily annotated with `'use client'`.
2. Move data queries directly into async Server Components.
3. Isolate interactive state into small leaf Client Components passed via `{children}` composition.
4. Wrap slow asynchronous components in React `<Suspense>` with clean skeleton fallbacks.
5. Create standard `loading.tsx` and `error.tsx` boundary files.
```
</div>

---

## 6. Review Checklist

- [ ] Are database queries and secret API keys confined strictly to Server Components?
- [ ] Is `'use client'` applied only to leaf interactive components?
- [ ] Are Server Components passed as `children` into Client Component containers?
- [ ] Are slow queries wrapped in `<Suspense>` with appropriate skeleton loaders?
- [ ] Is an `error.tsx` client boundary present to handle unhandled exceptions?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Next.js Documentation — <em>React Server Components & Routing Fundamentals</em>. Vercel.</li>
    <li>React.dev — <em>Server Components Architecture & Actions Specification</em>.</li>
  </ul>
</div>
