# Data Fetching, Server Actions & Caching

Next.js provides an integrated data pipeline combining server-side data fetching, RPC-style **Server Actions**, and a **4-tier caching architecture**.

---

## 1. The 4-Tier Next.js Caching Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                 NEXT.JS 4-TIER CACHING PIPELINE                 │
├─────────────────────────────────────────────────────────────────┤
│ 1. Request Memoization (Server - Per Request)                   │
│    Dedupes identical `fetch()` calls across component tree.     │
│    Lifecycle: Single request render pass.                       │
│                                                                 │
│ 2. Data Cache (Server - Persistent)                             │
│    Stores fetched data across incoming requests and deployments.│
│    Controlled via `fetch(url, { next: { tags: ['posts'] } })`.  │
│                                                                 │
│ 3. Full Route Cache (Server - Build / Revalidate)               │
│    Caches HTML and RSC payload for static routes at build time. │
│                                                                 │
│ 4. Router Cache (Client Browser - Session)                      │
│    Caches RSC payloads in browser memory during navigation.     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Server Actions for Safe Mutations

Server Actions are asynchronous functions executed on the server, invokable directly from forms or client components:

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
    return { error: 'UNAUTHORIZED', message: 'You must be logged in.' }
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

    // Invalidate cached lists of applications
    revalidateTag(`applications-${session.user.id}`)

    return { success: true, message: 'Application submitted successfully!' }
  } catch (err: any) {
    return { error: 'DATABASE_ERROR', message: 'Failed to record application.' }
  }
}
```

---

## 3. Route Handlers (`app/api/.../route.ts`)

Use Route Handlers for external REST endpoints, third-party webhooks (Stripe, GitHub), or non-HTML responses:

```tsx
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  // Process verified webhook event...
  return NextResponse.json({ received: true }, { status: 200 })
}
```

---

## 4. On-Demand Revalidation Strategies

```tsx
// Revalidate an entire route segment and its layouts
import { revalidatePath, revalidateTag } from 'next/cache'

// Path-based: Revalidates specific URL
revalidatePath('/dashboard/applications')

// Tag-based (Recommended): Purges specific cached queries everywhere
revalidateTag('job-postings')
```

---

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Server Actions & Cache Pipeline Specification</div>

```markdown
# TASK: Implement Type-Safe Server Action & Caching Strategy
You are a Staff Fullstack Engineer specializing in Next.js App Router.

## Feature / Mutation Context:
[PASTE FEATURE REQUIREMENT, DATA SCHEMA, OR MUTATION LOGIC]

## Instructions:
1. Write a Server Action using `'use server'` with strict Zod payload validation.
2. Enforce session authentication and role verification before mutation.
3. Handle database write operations with structured error return objects (`{ error, fieldErrors, success }`).
4. Apply on-demand cache invalidation using `revalidateTag` or `revalidatePath`.
5. Ensure zero sensitive tokens or credentials leak to the client bundle.
```
</div>

---

## 6. Review Checklist

- [ ] Are mutations implemented via Server Actions with strict Zod schema validation?
- [ ] Is user authentication and authorization verified inside every Server Action?
- [ ] Are cached queries annotated with explicit cache tags for granular invalidation?
- [ ] Is `revalidateTag` called immediately after successful database mutations?
- [ ] Are Route Handlers restricted to webhooks and public REST endpoints?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Next.js Documentation — <em>Data Fetching, Caching, and Revalidating</em>. Vercel.</li>
    <li>Next.js Documentation — <em>Server Actions and Mutations</em>.</li>
  </ul>
</div>
