import { defineConfig } from 'vitepress'

export default defineConfig({
  base: process.env.BASE_PATH || (process.env.GITHUB_ACTIONS ? '/engineering-playbook/' : '/'),
  title: 'AI Software Engineering Knowledge Base',
  description: 'A comprehensive knowledge base and practical engineering methodology for building software with AI agents.',
  cleanUrls: true,
  lastUpdated: true,
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'AI Software Engineering Knowledge Base' }],
    ['meta', { property: 'og:description', content: 'From business idea to production-ready software — a structured knowledge base for engineers and AI coding agents.' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          {
            text: 'Pillar 1: AI-SDLC',
            items: [
              { text: '01 AI-SDLC Playbook', link: '/en/introduction' },
              { text: '11 AI Collaboration Protocol', link: '/en/collaboration/' },
              { text: '12 AI Context & Standards', link: '/en/context-standards/' },
            ]
          },
          {
            text: 'Pillar 2: Architecture',
            items: [
              { text: '02 Domain & Business Analysis', link: '/en/domain-analysis/' },
              { text: '03 Requirements (IEEE 29148)', link: '/en/requirements/' },
              { text: '04 System Analysis & UML', link: '/en/uml/' },
              { text: '05 Software Architecture (C4/arc42)', link: '/en/architecture/' },
              { text: '06 Architecture Decisions (ADR)', link: '/en/adr/' },
            ]
          },
          {
            text: 'Pillar 3: Fullstack',
            items: [
              { text: '07 Database Engineering', link: '/en/database/' },
              { text: '08 API Engineering (OpenAPI 3.1)', link: '/en/api/' },
              { text: '09 UI / UX Engineering (NN/g)', link: '/en/ui-ux/' },
              { text: '10 Documentation Engineering', link: '/en/documentation/' },
            ]
          },
          {
            text: 'Pillar 4: Tech Stacks',
            items: [
              { text: 'Next.js Fullstack Engineering', link: '/en/tech-stacks/nextjs/' },
              { text: 'C# .NET Enterprise Engineering', link: '/en/tech-stacks/csharp-dotnet/' },
            ]
          },
          { text: 'GitHub', link: 'https://github.com/hao05dev/engineering-playbook' }
        ],
        sidebar: [
          {
            text: 'PILLAR 1 — AI-SDLC & PROTOCOLS',
            items: [
              {
                text: '01 — AI-SDLC Playbook',
                collapsed: true,
                items: [
                  { text: 'Introduction', link: '/en/introduction' },
                  { text: 'Core Principles', link: '/en/core-principles' },
                  { text: 'Quality Gates', link: '/en/quality-gates' },
                  { text: '01 Domain Exploration', link: '/en/domain-exploration' },
                  { text: '02 Product Requirements', link: '/en/product-requirements' },
                  { text: '03 Technical Design', link: '/en/technical-design' },
                  { text: '04 Task Breakdown', link: '/en/task-breakdown' },
                  { text: '05 Implementation Planning', link: '/en/implementation-planning' },
                  { text: '06 Prompt & AI Execute', link: '/en/prompting' },
                  { text: '07 AI Code Generation', link: '/en/code-generation' },
                  { text: '08 AI Run Tests', link: '/en/testing' },
                  { text: '09 Human Review', link: '/en/human-review' },
                  { text: '10 Bug Fix', link: '/en/bug-fix' },
                  { text: '11 Commit & Push', link: '/en/commit' },
                  { text: 'Agent Setup', link: '/en/agent-setup' },
                  { text: 'Coding Standards', link: '/en/coding-standards' },
                  { text: 'Agent Rules', link: '/en/agent-rules' }
                ]
              },
              {
                text: '11 — AI Collaboration Protocol',
                collapsed: true,
                items: [
                  { text: 'Overview & Philosophy', link: '/en/collaboration/' },
                  { text: 'Six-Stage Protocol', link: '/en/collaboration/six-stage-protocol' },
                  { text: 'Information Classification', link: '/en/collaboration/information-classification' },
                  { text: 'Discovery Questioning Loop', link: '/en/collaboration/discovery-questioning-loop' },
                  { text: 'Traceability & Change Impact', link: '/en/collaboration/traceability-change-impact' },
                  { text: 'AI Challenge & Reviewers', link: '/en/collaboration/ai-challenge-reviewer-checklists' }
                ]
              },
              {
                text: '12 — AI Context & Reference Standards',
                collapsed: true,
                items: [
                  { text: 'Overview & Modular Context', link: '/en/context-standards/' },
                  { text: 'AI Context Files Spec', link: '/en/context-standards/ai-context-files' },
                  { text: 'Master AI Prompt Library', link: '/en/context-standards/ai-prompt-library' },
                  { text: 'Authoritative Standards Matrix', link: '/en/context-standards/reference-standards' }
                ]
              }
            ]
          },
          {
            text: 'PILLAR 2 — SYSTEM ANALYSIS & ARCHITECTURE',
            items: [
              {
                text: '02 — Domain & Business Analysis',
                collapsed: true,
                items: [
                  { text: 'Overview & Principles', link: '/en/domain-analysis/' },
                  { text: 'Domain Discovery & Problem Definition', link: '/en/domain-analysis/discovery' },
                  { text: 'Stakeholder & Actor Analysis', link: '/en/domain-analysis/stakeholders' },
                  { text: 'Business Processes, Rules & Events', link: '/en/domain-analysis/processes-rules' },
                  { text: 'Business States & Exceptions', link: '/en/domain-analysis/state-exceptions' },
                  { text: 'Glossary & Ambiguity Detection', link: '/en/domain-analysis/glossary-ambiguity' }
                ]
              },
              {
                text: '03 — Requirements Engineering (IEEE 29148)',
                collapsed: true,
                items: [
                  { text: 'Overview & Standards', link: '/en/requirements/' },
                  { text: 'IEEE 29148 Fundamentals', link: '/en/requirements/ieee-29148' },
                  { text: 'BRD vs PRD vs SRS', link: '/en/requirements/brd-prd-srs' },
                  { text: 'Functional & Non-Functional Requirements', link: '/en/requirements/functional-nfr' },
                  { text: 'User Stories & Use Cases', link: '/en/requirements/user-stories-use-cases' },
                  { text: 'Validation & Traceability', link: '/en/requirements/validation-traceability' }
                ]
              },
              {
                text: '04 — System Analysis & UML (OMG UML)',
                collapsed: true,
                items: [
                  { text: 'Overview & Visual Modeling', link: '/en/uml/' },
                  { text: 'Use Case & Activity Diagrams', link: '/en/uml/use-case-activity' },
                  { text: 'Sequence & State Machine Diagrams', link: '/en/uml/sequence-state' },
                  { text: 'Class & Domain Model Diagrams', link: '/en/uml/class-domain-model' },
                  { text: 'Component & Deployment Diagrams', link: '/en/uml/component-deployment' },
                  { text: 'Relationship Rules & Review Checklist', link: '/en/uml/relationship-rules-review' }
                ]
              },
              {
                text: '05 — Software Architecture (C4 & arc42)',
                collapsed: true,
                items: [
                  { text: 'Overview & Foundations', link: '/en/architecture/' },
                  { text: 'Architectural Styles & Patterns', link: '/en/architecture/styles-patterns' },
                  { text: 'C4 Model (Context to Code)', link: '/en/architecture/c4-model' },
                  { text: 'arc42 Documentation Framework', link: '/en/architecture/arc42-framework' },
                  { text: 'Quality Attributes & Trade-offs', link: '/en/architecture/quality-attributes-tradeoffs' }
                ]
              },
              {
                text: '06 — Architecture Decisions (ADR / MADR)',
                collapsed: true,
                items: [
                  { text: 'Overview & Value of ADRs', link: '/en/adr/' },
                  { text: 'Lifecycle, Structure & MADR Format', link: '/en/adr/lifecycle-structure' },
                  { text: 'Review Checklist & Prompts', link: '/en/adr/review-prompts' }
                ]
              }
            ]
          },
          {
            text: 'PILLAR 3 — FULLSTACK ENGINEERING & DESIGN',
            items: [
              {
                text: '07 — Database Engineering',
                collapsed: true,
                items: [
                  { text: 'Overview & Principles', link: '/en/database/' },
                  { text: 'Design Pipeline & Lifecycle', link: '/en/database/design-pipeline' },
                  { text: 'ERD & Normalization (1NF to 3NF)', link: '/en/database/erd-normalization' },
                  { text: 'Indexes, Constraints & Performance', link: '/en/database/indexes-constraints' },
                  { text: 'Transactions & Concurrency', link: '/en/database/transactions-concurrency' },
                  { text: 'Migrations, Seed Data & Checklist', link: '/en/database/migrations-review' }
                ]
              },
              {
                text: '08 — API Engineering (OpenAPI 3.1)',
                collapsed: true,
                items: [
                  { text: 'Overview & API-First Design', link: '/en/api/' },
                  { text: 'REST Design Principles', link: '/en/api/design-principles-rest' },
                  { text: 'HTTP Contracts, Status & Errors', link: '/en/api/http-contracts-errors' },
                  { text: 'Validation, Auth & Security', link: '/en/api/validation-auth-security' },
                  { text: 'Pagination, Filtering & Idempotency', link: '/en/api/pagination-filtering-idempotency' },
                  { text: 'OpenAPI Spec & Checklist', link: '/en/api/openapi-review' }
                ]
              },
              {
                text: '09 — UI / UX Engineering (NN/g)',
                collapsed: true,
                items: [
                  { text: 'Overview & Principles', link: '/en/ui-ux/' },
                  { text: 'NN/g Fundamentals & Journeys', link: '/en/ui-ux/nng-fundamentals-journeys' },
                  { text: 'Information Architecture & Wireframes', link: '/en/ui-ux/ia-wireframes-mockups' },
                  { text: 'Interaction States & WCAG a11y', link: '/en/ui-ux/interaction-states-accessibility' },
                  { text: 'Usability Review & 10 Heuristics', link: '/en/ui-ux/usability-review' }
                ]
              },
              {
                text: '10 — Documentation Engineering',
                collapsed: true,
                items: [
                  { text: 'Overview & Docs-as-Code', link: '/en/documentation/' },
                  { text: 'Google Documentation Standards', link: '/en/documentation/google-doc-standards' },
                  { text: 'Requirements & Architecture Docs', link: '/en/documentation/requirements-architecture-docs' },
                  { text: 'Database, API, UI & Test Docs', link: '/en/documentation/db-api-ui-test-docs' }
                ]
              }
            ]
          },
          {
            text: 'PILLAR 4 — TECH STACKS & FRAMEWORKS',
            items: [
              {
                text: 'Next.js Fullstack Engineering',
                collapsed: false,
                items: [
                  { text: 'Overview & Architecture', link: '/en/tech-stacks/nextjs/' },
                  { text: 'App Router & Server Components', link: '/en/tech-stacks/nextjs/app-router-server-components' },
                  { text: 'Data Fetching, Actions & Cache', link: '/en/tech-stacks/nextjs/data-fetching-caching' },
                  { text: 'Form UX, State & Auth', link: '/en/tech-stacks/nextjs/state-forms-auth' },
                  { text: 'Production & Performance Review', link: '/en/tech-stacks/nextjs/production-performance-review' }
                ]
              },
              {
                text: 'C# .NET Enterprise Engineering',
                collapsed: false,
                items: [
                  { text: 'Overview & Platform', link: '/en/tech-stacks/csharp-dotnet/' },
                  { text: 'Clean Architecture & DDD', link: '/en/tech-stacks/csharp-dotnet/clean-architecture-ddd' },
                  { text: 'ASP.NET Core Web API & Middleware', link: '/en/tech-stacks/csharp-dotnet/aspnet-core-webapi' },
                  { text: 'EF Core & Dapper Data Access', link: '/en/tech-stacks/csharp-dotnet/efcore-dapper-data' },
                  { text: 'Async Best Practices, CQRS & Testing', link: '/en/tech-stacks/csharp-dotnet/async-mediatr-testing' }
                ]
              }
            ]
          }
        ],
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2026 AI-SDLC Engineering Playbook'
        },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        outline: {
          label: 'On this page',
          level: [2, 3]
        }
      }
    },
    vi: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      link: '/vi/',
      themeConfig: {
        nav: [
          {
            text: 'Trụ cột 1: AI-SDLC',
            items: [
              { text: '01 AI-SDLC Playbook', link: '/vi/introduction' },
              { text: '11 Giao thức Hợp tác AI', link: '/vi/collaboration/' },
              { text: '12 Tệp Ngữ cảnh & Tiêu chuẩn', link: '/vi/context-standards/' },
            ]
          },
          {
            text: 'Trụ cột 2: Kiến trúc',
            items: [
              { text: '02 Phân tích Nghiệp vụ (Domain)', link: '/vi/domain-analysis/' },
              { text: '03 Kỹ thuật Yêu cầu (IEEE 29148)', link: '/vi/requirements/' },
              { text: '04 Phân tích Hệ thống & UML', link: '/vi/uml/' },
              { text: '05 Kiến trúc Phần mềm (C4/arc42)', link: '/vi/architecture/' },
              { text: '06 Quyết định Kiến trúc (ADR)', link: '/vi/adr/' },
            ]
          },
          {
            text: 'Trụ cột 3: Fullstack',
            items: [
              { text: '07 Kỹ thuật Cơ sở Dữ liệu', link: '/vi/database/' },
              { text: '08 Kỹ thuật API (OpenAPI 3.1)', link: '/vi/api/' },
              { text: '09 Kỹ thuật UI / UX (NN/g)', link: '/vi/ui-ux/' },
              { text: '10 Kỹ thuật Tài liệu (Google)', link: '/vi/documentation/' },
            ]
          },
          {
            text: 'Trụ cột 4: Frameworks',
            items: [
              { text: 'Kỹ thuật Fullstack Next.js', link: '/vi/tech-stacks/nextjs/' },
              { text: 'Kỹ thuật Doanh nghiệp C# .NET', link: '/vi/tech-stacks/csharp-dotnet/' },
            ]
          },
          { text: 'GitHub', link: 'https://github.com/hao05dev/engineering-playbook' }
        ],
        sidebar: [
          {
            text: 'TRỤ CỘT 1 — AI-SDLC & GIAO THỨC HỢP TÁC',
            items: [
              {
                text: '01 — AI-SDLC Playbook',
                collapsed: true,
                items: [
                  { text: 'Giới thiệu', link: '/vi/introduction' },
                  { text: 'Nguyên tắc cốt lõi', link: '/vi/core-principles' },
                  { text: 'Cổng chất lượng (Quality Gates)', link: '/vi/quality-gates' },
                  { text: '01 Khám phá Domain', link: '/vi/domain-exploration' },
                  { text: '02 Yêu cầu sản phẩm', link: '/vi/product-requirements' },
                  { text: '03 Thiết kế kỹ thuật', link: '/vi/technical-design' },
                  { text: '04 Phân rã công việc', link: '/vi/task-breakdown' },
                  { text: '05 Lập kế hoạch thực thi', link: '/vi/implementation-planning' },
                  { text: '06 Prompt & AI thực thi', link: '/vi/prompting' },
                  { text: '07 AI Sinh mã nguồn', link: '/vi/code-generation' },
                  { text: '08 AI Chạy kiểm thử', link: '/vi/testing' },
                  { text: '09 Đánh giá của con người', link: '/vi/human-review' },
                  { text: '10 Sửa lỗi (Bug Fix)', link: '/vi/bug-fix' },
                  { text: '11 Commit & Push', link: '/vi/commit' },
                  { text: 'Thiết lập Agent', link: '/vi/agent-setup' },
                  { text: 'Tiêu chuẩn viết mã', link: '/vi/coding-standards' },
                  { text: 'Quy tắc cho Agent', link: '/vi/agent-rules' }
                ]
              },
              {
                text: '11 — Giao thức Hợp tác AI',
                collapsed: true,
                items: [
                  { text: 'Tổng quan & Triết lý', link: '/vi/collaboration/' },
                  { text: 'Giao thức 6 Giai đoạn', link: '/vi/collaboration/six-stage-protocol' },
                  { text: 'Hệ thống Phân loại Thông tin', link: '/vi/collaboration/information-classification' },
                  { text: 'Vòng lặp Đặt câu hỏi Sâu', link: '/vi/collaboration/discovery-questioning-loop' },
                  { text: 'Ma trận Truy vết & Tác động Thay đổi', link: '/vi/collaboration/traceability-change-impact' },
                  { text: 'Quy tắc Phản biện & AI Reviewers', link: '/vi/collaboration/ai-challenge-reviewer-checklists' }
                ]
              },
              {
                text: '12 — Tệp Ngữ cảnh AI & Tiêu chuẩn Tham chiếu',
                collapsed: true,
                items: [
                  { text: 'Tổng quan & Ngữ cảnh Dạng Module', link: '/vi/context-standards/' },
                  { text: 'Đặc tả Bộ Tệp Ngữ cảnh AI', link: '/vi/context-standards/ai-context-files' },
                  { text: 'Thư viện Prompt AI Tổng thể', link: '/vi/context-standards/ai-prompt-library' },
                  { text: 'Ma trận Tiêu chuẩn Quốc tế', link: '/vi/context-standards/reference-standards' }
                ]
              }
            ]
          },
          {
            text: 'TRỤ CỘT 2 — PHÂN TÍCH HỆ THỐNG & KIẾN TRÚC',
            items: [
              {
                text: '02 — Phân tích Nghiệp vụ (Domain Analysis)',
                collapsed: true,
                items: [
                  { text: 'Tổng quan & Nguyên lý', link: '/vi/domain-analysis/' },
                  { text: 'Khám phá Domain & Định nghĩa Bài toán', link: '/vi/domain-analysis/discovery' },
                  { text: 'Phân tích Stakeholder & Actor', link: '/vi/domain-analysis/stakeholders' },
                  { text: 'Quy trình, Quy tắc & Sự kiện Nghiệp vụ', link: '/vi/domain-analysis/processes-rules' },
                  { text: 'Trạng thái, Ràng buộc & Ngoại lệ', link: '/vi/domain-analysis/state-exceptions' },
                  { text: 'Thuật ngữ, Giả định & Phát hiện Mơ hồ', link: '/vi/domain-analysis/glossary-ambiguity' }
                ]
              },
              {
                text: '03 — Kỹ thuật Yêu cầu (IEEE 29148)',
                collapsed: true,
                items: [
                  { text: 'Tổng quan & Tiêu chuẩn', link: '/vi/requirements/' },
                  { text: 'Nền tảng Chuẩn IEEE 29148', link: '/vi/requirements/ieee-29148' },
                  { text: 'Phân cấp Tài liệu: BRD vs PRD vs SRS', link: '/vi/requirements/brd-prd-srs' },
                  { text: 'Yêu cầu Chức năng & Phi Chức năng', link: '/vi/requirements/functional-nfr' },
                  { text: 'User Stories & Đặc tả Use Case', link: '/vi/requirements/user-stories-use-cases' },
                  { text: 'Xác thực, Kiểm chứng & Truy vết', link: '/vi/requirements/validation-traceability' }
                ]
              },
              {
                text: '04 — Phân tích Hệ thống & UML (OMG UML)',
                collapsed: true,
                items: [
                  { text: 'Tổng quan & Mô hình hóa Trực quan', link: '/vi/uml/' },
                  { text: 'Sơ đồ Use Case & Sơ đồ Hoạt động', link: '/vi/uml/use-case-activity' },
                  { text: 'Sơ đồ Tuần tự (Sequence) & Máy Trạng thái', link: '/vi/uml/sequence-state' },
                  { text: 'Sơ đồ Lớp (Class) & Domain Model', link: '/vi/uml/class-domain-model' },
                  { text: 'Sơ đồ Thành phần (Component) & Triển khai', link: '/vi/uml/component-deployment' },
                  { text: 'Quy tắc Quan hệ & Checklist Đánh giá', link: '/vi/uml/relationship-rules-review' }
                ]
              },
              {
                text: '05 — Kiến trúc Phần mềm (C4 & arc42)',
                collapsed: true,
                items: [
                  { text: 'Tổng quan & Nền tảng Kiến trúc', link: '/vi/architecture/' },
                  { text: 'Phong cách & Pattern Kiến trúc', link: '/vi/architecture/styles-patterns' },
                  { text: 'Mô hình C4 Model (Context đến Code)', link: '/vi/architecture/c4-model' },
                  { text: 'Khung Tài liệu Kiến trúc arc42', link: '/vi/architecture/arc42-framework' },
                  { text: 'Thuộc tính Chất lượng & Đánh đổi (Trade-offs)', link: '/vi/architecture/quality-attributes-tradeoffs' }
                ]
              },
              {
                text: '06 — Quyết định Kiến trúc (ADR / MADR)',
                collapsed: true,
                items: [
                  { text: 'Tổng quan & Giá trị của ADR', link: '/vi/adr/' },
                  { text: 'Vòng đời, Cấu trúc & Định dạng MADR', link: '/vi/adr/lifecycle-structure' },
                  { text: 'Checklist Đánh giá & Mẫu Prompts', link: '/vi/adr/review-prompts' }
                ]
              }
            ]
          },
          {
            text: 'TRỤ CỘT 3 — KỸ THUẬT FULLSTACK & THIẾT KẾ',
            items: [
              {
                text: '07 — Kỹ thuật Cơ sở Dữ liệu',
                collapsed: true,
                items: [
                  { text: 'Tổng quan & Nguyên tắc', link: '/vi/database/' },
                  { text: 'Quy trình Thiết kế & Vòng đời CSDL', link: '/vi/database/design-pipeline' },
                  { text: 'ERD & Chuẩn hóa Dữ liệu (1NF - 3NF)', link: '/vi/database/erd-normalization' },
                  { text: 'Chỉ mục Index, Ràng buộc & Tối ưu', link: '/vi/database/indexes-constraints' },
                  { text: 'Giao dịch (Transactions) & Tranh chấp', link: '/vi/database/transactions-concurrency' },
                  { text: 'Migrations, Dữ liệu Mẫu & Checklist', link: '/vi/database/migrations-review' }
                ]
              },
              {
                text: '08 — Kỹ thuật API (OpenAPI 3.1)',
                collapsed: true,
                items: [
                  { text: 'Tổng quan & Thiết kế API-First', link: '/vi/api/' },
                  { text: 'Nguyên lý Thiết kế REST', link: '/vi/api/design-principles-rest' },
                  { text: 'Hợp đồng HTTP, Trạng thái & Mã lỗi', link: '/vi/api/http-contracts-errors' },
                  { text: 'Kiểm duyệt Dữ liệu, Xác thực & Bảo mật', link: '/vi/api/validation-auth-security' },
                  { text: 'Phân trang, Bộ lọc & Tính Bất biến', link: '/vi/api/pagination-filtering-idempotency' },
                  { text: 'Đặc tả OpenAPI 3.1 & Checklist', link: '/vi/api/openapi-review' }
                ]
              },
              {
                text: '09 — Kỹ thuật UI / UX (NN/g)',
                collapsed: true,
                items: [
                  { text: 'Tổng quan & Nguyên lý', link: '/vi/ui-ux/' },
                  { text: 'Nền tảng NN/g & Hành trình Người dùng', link: '/vi/ui-ux/nng-fundamentals-journeys' },
                  { text: 'Kiến trúc Thông tin & Wireframes', link: '/vi/ui-ux/ia-wireframes-mockups' },
                  { text: 'Trạng thái Tương tác & Tiếp cận WCAG', link: '/vi/ui-ux/interaction-states-accessibility' },
                  { text: 'Đánh giá Khả dụng & 10 Heuristics', link: '/vi/ui-ux/usability-review' }
                ]
              },
              {
                text: '10 — Kỹ thuật Tài liệu (Docs-as-Code)',
                collapsed: true,
                items: [
                  { text: 'Tổng quan & Triết lý Docs-as-Code', link: '/vi/documentation/' },
                  { text: 'Tiêu chuẩn Tài liệu theo Google', link: '/vi/documentation/google-doc-standards' },
                  { text: 'Tài liệu Yêu cầu & Kiến trúc', link: '/vi/documentation/requirements-architecture-docs' },
                  { text: 'Tài liệu CSDL, API, UI & Kiểm thử', link: '/vi/documentation/db-api-ui-test-docs' }
                ]
              }
            ]
          },
          {
            text: 'TRỤ CỘT 4 — CÔNG NGHỆ & FRAMEWORKS',
            items: [
              {
                text: 'Kỹ thuật Fullstack Next.js',
                collapsed: false,
                items: [
                  { text: 'Tổng quan & Kiến trúc', link: '/vi/tech-stacks/nextjs/' },
                  { text: 'App Router & Server Components', link: '/vi/tech-stacks/nextjs/app-router-server-components' },
                  { text: 'Truy xuất Dữ liệu, Actions & Cache', link: '/vi/tech-stacks/nextjs/data-fetching-caching' },
                  { text: 'Trải nghiệm Form, State & Auth', link: '/vi/tech-stacks/nextjs/state-forms-auth' },
                  { text: 'Hiệu năng Production & Review', link: '/vi/tech-stacks/nextjs/production-performance-review' }
                ]
              },
              {
                text: 'Kỹ thuật Doanh nghiệp C# .NET',
                collapsed: false,
                items: [
                  { text: 'Tổng quan & Nền tảng .NET', link: '/vi/tech-stacks/csharp-dotnet/' },
                  { text: 'Kiến trúc Sạch & DDD', link: '/vi/tech-stacks/csharp-dotnet/clean-architecture-ddd' },
                  { text: 'ASP.NET Core Web API & Middleware', link: '/vi/tech-stacks/csharp-dotnet/aspnet-core-webapi' },
                  { text: 'EF Core & Dapper Data Access', link: '/vi/tech-stacks/csharp-dotnet/efcore-dapper-data' },
                  { text: 'Thực tiễn Async, CQRS & Kiểm thử', link: '/vi/tech-stacks/csharp-dotnet/async-mediatr-testing' }
                ]
              }
            ]
          }
        ],
        footer: {
          message: 'Phát hành theo giấy phép MIT.',
          copyright: 'Bản quyền © 2026 AI-SDLC Engineering Playbook'
        },
        docFooter: {
          prev: 'Trang trước',
          next: 'Trang tiếp theo'
        },
        outline: {
          label: 'Mục lục trang',
          level: [2, 3]
        }
      }
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'AI Engineering Playbook',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hao05dev/engineering-playbook' }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          vi: {
            translations: {
              button: {
                buttonText: 'Tìm kiếm',
                buttonAriaLabel: 'Tìm kiếm tài liệu'
              },
              modal: {
                noResultsText: 'Không tìm thấy kết quả cho',
                resetButtonTitle: 'Xóa tìm kiếm',
                footer: {
                  selectText: 'để chọn',
                  navigateText: 'để điều hướng',
                  closeText: 'để đóng'
                }
              }
            }
          }
        }
      }
    }
  }
})
