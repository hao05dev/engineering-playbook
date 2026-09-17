# Production Performance, Security & Review Checklist

Deploying Next.js applications to production requires strict adherence to Core Web Vitals performance budgets, client bundle optimizations, and defense-in-depth security policies.

---

## 1. Core Web Vitals & Performance Optimization

```
┌─────────────────────────────────────────────────────────────────┐
│                 CORE WEB VITALS TARGET THRESHOLDS               │
├─────────────────────────────────────────────────────────────────┤
│ LCP (Largest Contentful Paint) : < 2.5 seconds (Good)           │
│   ├── Preload critical hero images using `<Image priority />`   │
│   └── Stream async data via React `<Suspense>`                  │
│                                                                 │
│ INP (Interaction to Next Paint): < 200 milliseconds (Good)      │
│   ├── Offload heavy compute to Server Actions or Web Workers    │
│   └── Use `useTransition` for non-urgent UI state updates       │
│                                                                 │
│ CLS (Cumulative Layout Shift)  : < 0.1 (Good)                   │
│   ├── Always specify `width` & `height` on `<Image />`          │
│   └── Use `@next/font` with zero layout shift font swapping     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Dynamic Component Lazy-Loading

Prevent massive charting libraries, rich text editors, or heavy interactive widgets from polluting the initial page load bundle:

```tsx
import dynamic from 'next/dynamic'
import { SkeletonChart } from '@/components/skeletons'

// Heavy charting library loaded only on client demand
const AnalyticsChart = dynamic(
  () => import('@/components/analytics-chart').then((mod) => mod.AnalyticsChart),
  {
    ssr: false,
    loading: () => <SkeletonChart />,
  }
)
```

---

## 3. Security Hardening & HTTP Headers

Configure secure HTTP response headers in `next.config.mjs` to protect against XSS, clickjacking, and MIME sniffing:

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

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Next.js Production Architecture & Performance Audit</div>

```markdown
# TASK: Conduct Production Next.js Architecture & Security Review
You are a Principal Next.js Performance Architect and Vercel Deployment Specialist.

## Next.js Repository / Code Slice:
[PASTE APP ROUTER DIRECTORY STRUCTURE, NEXT.CONFIG, OR COMPONENT SLICE]

## Instructions:
Audit the codebase across 5 production dimensions:
1. **Server vs. Client Boundaries**: Detect unnecessary `'use client'` directives leaking into the client bundle.
2. **Data & Cache Pipeline**: Verify Server Actions have Zod validation and appropriate `revalidateTag` invalidation.
3. **Core Web Vitals**: Verify usage of `next/image` (with explicit sizing/priority), `next/font`, and dynamic lazy imports.
4. **Security & Headers**: Audit CSP policies, cookie security (`HttpOnly`), and route protection in `middleware.ts`.
5. Provide a prioritized table of **P0 Critical Bottlenecks**, **P1 Warnings**, and **P2 Optimization Suggestions**.
```
</div>

---

## 5. Review Checklist

- [ ] Are heavy third-party client components lazy-loaded via `next/dynamic`?
- [ ] Do all image assets use `next/image` with explicit width, height, and modern AVIF/WebP formats?
- [ ] Are all web fonts loaded via `next/font/google` or `next/font/local`?
- [ ] Does `next.config.mjs` configure security headers (`X-Frame-Options`, `HSTS`, `nosniff`)?
- [ ] Has the bundle size been analyzed using `@next/bundle-analyzer`?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Google Chrome Developers (2024). <em>Core Web Vitals Guide</em>.</li>
    <li>Next.js Documentation — <em>Production Deployment, Analytics, and Security Hardening</em>.</li>
  </ul>
</div>
