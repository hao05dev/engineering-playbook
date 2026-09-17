# Next.js Fullstack Engineering Overview

Next.js is the premier React framework for building production-grade fullstack web applications. With the **App Router**, **React Server Components (RSC)**, and **Server Actions**, Next.js shifts data fetching and sensitive logic to the server while delivering instant client-side interactivity.

---

## 1. Core Architecture & Mental Model

```
┌─────────────────────────────────────────────────────────────────┐
│               NEXT.JS APP ROUTER ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────┤
│ Client Boundary ('use client')                                  │
│   ├── Interactive UI (Buttons, Modals, Forms)                   │
│   ├── Browser APIs (localStorage, geolocation, window)          │
│   └── React Hooks (useState, useEffect, useActionState)         │
│                                │                                │
│                     (Network Boundary / RPC)                    │
│                                ▼                                │
│ Server Boundary (Default Server Components)                     │
│   ├── React Server Components (Zero-bundle size, direct DB access)│
│   ├── Server Actions ('use server' - RPC mutations)             │
│   ├── Route Handlers (GET/POST endpoints & Webhooks)            │
│   └── Edge Middleware (Edge-level Auth, Redirects, Headers)     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Architectural Tenets for AI Coding Agents

1. **Server-First by Default**: Every component in the `app/` directory is a Server Component unless explicitly annotated with `'use client'`.
2. **Push Client Boundaries Down**: Keep the tree mostly on the server; only add `'use client'` to small leaf components that require event listeners or browser state.
3. **Co-located Data Fetching**: Fetch data directly inside async Server Components where it is consumed instead of prop-drilling or global Redux stores.
4. **Server Actions for Mutations**: Execute database writes and external API mutations via type-safe Server Actions with Zod validation.

---

## 3. Technology Stack Breakdown

- **Framework**: Next.js 14 / 15 (App Router)
- **UI Library**: React 19 (Server Components, Actions, Hooks)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS / CSS Modules / Shadcn UI
- **Validation**: Zod
- **Database Access**: Prisma / Drizzle ORM / Direct SQL

---

## 4. Chapter Roadmap

- [App Router & Server Components](./app-router-server-components.md) — Server Components vs Client Components, Streaming SSR with Suspense, Layouts & Templates.
- [Data Fetching, Server Actions & Caching](./data-fetching-caching.md) — 4-tier caching architecture, Server Actions, Route Handlers, and cache revalidation.
- [State Management, Form UX & Authentication](./state-forms-auth.md) — `useActionState`, Zod validation, Middleware-based auth & session cookies.
- [Production Performance & Review Checklist](./production-performance-review.md) — Bundle optimization, Core Web Vitals, security headers, and copyable AI review prompts.
