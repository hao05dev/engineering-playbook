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
          { text: '01 Playbook', link: '/en/introduction' },
          {
            text: 'Analysis & Req',
            items: [
              { text: '02 Domain & Business Analysis', link: '/en/domain-analysis/' },
              { text: '03 Requirements Engineering (IEEE 29148)', link: '/en/requirements/' },
              { text: '04 System Analysis & UML (OMG UML)', link: '/en/uml/' },
            ]
          },
          {
            text: 'Architecture & Design',
            items: [
              { text: '05 Software Architecture (C4 & arc42)', link: '/en/architecture/' },
              { text: '06 Architecture Decisions (ADR)', link: '/en/adr/' },
              { text: '07 Database Engineering', link: '/en/database/' },
              { text: '08 API Engineering (OpenAPI)', link: '/en/api/' },
              { text: '09 UI / UX Engineering (NN/g)', link: '/en/ui-ux/' },
            ]
          },
          {
            text: 'Protocols & Docs',
            items: [
              { text: '10 Documentation Engineering', link: '/en/documentation/' },
              { text: '11 AI Collaboration Protocol', link: '/en/collaboration/' },
              { text: '12 AI Context & Reference Standards', link: '/en/context-standards/' },
            ]
          },
          { text: 'GitHub', link: 'https://github.com/hao05dev/engineering-playbook' }
        ],
        sidebar: [
          {
            text: '01 — AI-SDLC PLAYBOOK',
            collapsed: false,
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
            text: '02 — DOMAIN & BUSINESS ANALYSIS',
            collapsed: false,
            items: [
              { text: 'Overview & Principles', link: '/en/domain-analysis/' },
              { text: 'Domain Discovery & Problem Definition', link: '/en/domain-analysis/discovery' },
              { text: 'Stakeholder & Actor Analysis', link: '/en/domain-analysis/stakeholders' },
              { text: 'Business Processes, Rules & Events', link: '/en/domain-analysis/processes-rules' },
              { text: 'Business States, Constraints & Exceptions', link: '/en/domain-analysis/state-exceptions' },
              { text: 'Glossary, Assumptions & Ambiguity Detection', link: '/en/domain-analysis/glossary-ambiguity' }
            ]
          },
          {
            text: '03 — REQUIREMENTS ENGINEERING (IEEE 29148)',
            collapsed: false,
            items: [
              { text: 'Overview & Standards', link: '/en/requirements/' },
              { text: 'IEEE 29148 Fundamentals', link: '/en/requirements/ieee-29148' },
              { text: 'Document Hierarchy: BRD vs PRD vs SRS', link: '/en/requirements/brd-prd-srs' },
              { text: 'Functional & Non-Functional Requirements', link: '/en/requirements/functional-nfr' },
              { text: 'User Stories & Use Case Specifications', link: '/en/requirements/user-stories-use-cases' },
              { text: 'Validation, Verification & Traceability', link: '/en/requirements/validation-traceability' }
            ]
          },
          {
            text: '04 — SYSTEM ANALYSIS & UML (OMG UML)',
            collapsed: false,
            items: [
              { text: 'Overview & OMG UML Standards', link: '/en/uml/' },
              { text: 'Use Case & Activity Diagrams', link: '/en/uml/use-case-activity' },
              { text: 'Sequence & State Machine Diagrams', link: '/en/uml/sequence-state' },
              { text: 'Class Diagrams & Domain Modeling', link: '/en/uml/class-domain-model' },
              { text: 'Component & Deployment Diagrams', link: '/en/uml/component-deployment' },
              { text: 'UML Relationship Rules & Review Checklist', link: '/en/uml/relationship-rules-review' }
            ]
          },
          {
            text: '05 — SOFTWARE ARCHITECTURE (C4 & arc42)',
            collapsed: false,
            items: [
              { text: 'Architecture Overview & Principles', link: '/en/architecture/' },
              { text: 'Architecture Styles (Monolith, Modular, Microservices, EDA)', link: '/en/architecture/styles-patterns' },
              { text: 'The C4 Model (Context, Container, Component, Code)', link: '/en/architecture/c4-model' },
              { text: 'The arc42 Architecture Documentation Framework', link: '/en/architecture/arc42-framework' },
              { text: 'Quality Attributes & Trade-off Analysis', link: '/en/architecture/quality-attributes-tradeoffs' }
            ]
          },
          {
            text: '06 — ARCHITECTURE DECISIONS (ADR)',
            collapsed: false,
            items: [
              { text: 'ADR Overview & When to Use', link: '/en/adr/' },
              { text: 'ADR Structure & Lifecycle (MADR)', link: '/en/adr/lifecycle-structure' },
              { text: 'ADR Review Checklist & Prompts', link: '/en/adr/review-prompts' }
            ]
          },
          {
            text: '07 — DATABASE ENGINEERING',
            collapsed: false,
            items: [
              { text: 'Overview & Pipeline', link: '/en/database/' },
              { text: 'Design Pipeline: Domain to Physical SQL', link: '/en/database/design-pipeline' },
              { text: 'ERD Modeling, Cardinality & Normalization', link: '/en/database/erd-normalization' },
              { text: 'Indexes, Constraints & Query Optimization', link: '/en/database/indexes-constraints' },
              { text: 'Transactions, Concurrency & Data Integrity', link: '/en/database/transactions-concurrency' },
              { text: 'Migrations, Seed Data & Review Checklist', link: '/en/database/migrations-review' }
            ]
          },
          {
            text: '08 — API ENGINEERING (OPENAPI)',
            collapsed: false,
            items: [
              { text: 'Overview & Principles', link: '/en/api/' },
              { text: 'REST Design & Resource Modeling', link: '/en/api/design-principles-rest' },
              { text: 'HTTP Contracts, Status Codes & Error Models', link: '/en/api/http-contracts-errors' },
              { text: 'Validation, Authentication & Security', link: '/en/api/validation-auth-security' },
              { text: 'Pagination, Filtering, Sorting & Idempotency', link: '/en/api/pagination-filtering-idempotency' },
              { text: 'OpenAPI Specification & Review Checklist', link: '/en/api/openapi-review' }
            ]
          },
          {
            text: '09 — UI / UX ENGINEERING (NN/g)',
            collapsed: false,
            items: [
              { text: 'Overview & NN/g Principles', link: '/en/ui-ux/' },
              { text: 'User Goals, Journeys & User Flows', link: '/en/ui-ux/nng-fundamentals-journeys' },
              { text: 'Information Architecture, Wireframes & Mockups', link: '/en/ui-ux/ia-wireframes-mockups' },
              { text: 'Interaction Design, Form UX & State Handling', link: '/en/ui-ux/interaction-states-accessibility' },
              { text: 'Usability Testing & Review Checklist', link: '/en/ui-ux/usability-review' }
            ]
          },
          {
            text: '10 — DOCUMENTATION ENGINEERING',
            collapsed: false,
            items: [
              { text: 'Overview & Google Standards', link: '/en/documentation/' },
              { text: 'Google Engineering Documentation Principles', link: '/en/documentation/google-doc-standards' },
              { text: 'Authoring Guides: BRD, PRD, SRS & arc42', link: '/en/documentation/requirements-architecture-docs' },
              { text: 'Authoring Guides: DB, API, UI/UX & Test Plans', link: '/en/documentation/db-api-ui-test-docs' }
            ]
          },
          {
            text: '11 — AI COLLABORATION PROTOCOL',
            collapsed: false,
            items: [
              { text: 'Protocol Overview & Philosophy', link: '/en/collaboration/' },
              { text: 'The 6-Stage Collaboration Lifecycle', link: '/en/collaboration/six-stage-protocol' },
              { text: 'Information Classification Standard', link: '/en/collaboration/information-classification' },
              { text: 'Requirement Discovery & Questioning Loop', link: '/en/collaboration/discovery-questioning-loop' },
              { text: 'End-to-End Traceability & Change Impact Analysis', link: '/en/collaboration/traceability-change-impact' },
              { text: 'AI Challenge Rules & Specialized Reviewers', link: '/en/collaboration/ai-challenge-reviewer-checklists' }
            ]
          },
          {
            text: '12 — AI CONTEXT & REFERENCE STANDARDS',
            collapsed: false,
            items: [
              { text: 'Overview & Standards Matrix', link: '/en/context-standards/' },
              { text: 'Standard AI Context Files (AGENTS.md, etc.)', link: '/en/context-standards/ai-context-files' },
              { text: 'Comprehensive AI Prompt Library', link: '/en/context-standards/ai-prompt-library' },
              { text: 'Official Reference Standards & Attribution', link: '/en/context-standards/reference-standards' }
            ]
          }
        ],
        footer: {
          message: 'AI Software Engineering Knowledge Base — Released under MIT License.',
          copyright: 'Copyright © 2026 vCodeX / hao05dev. Built with VitePress.'
        },
        docFooter: {
          prev: 'Previous Page',
          next: 'Next Page'
        },
        editLink: {
          pattern: 'https://github.com/hao05dev/engineering-playbook/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        },
        lastUpdated: {
          text: 'Last updated'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: '01 Playbook', link: '/en/introduction' },
          {
            text: 'Analysis & Req',
            items: [
              { text: '02 Domain & Business Analysis', link: '/en/domain-analysis/' },
              { text: '03 Requirements Engineering (IEEE 29148)', link: '/en/requirements/' },
              { text: '04 System Analysis & UML (OMG UML)', link: '/en/uml/' },
            ]
          },
          {
            text: 'Architecture & Design',
            items: [
              { text: '05 Software Architecture (C4 & arc42)', link: '/en/architecture/' },
              { text: '06 Architecture Decisions (ADR)', link: '/en/adr/' },
              { text: '07 Database Engineering', link: '/en/database/' },
              { text: '08 API Engineering (OpenAPI)', link: '/en/api/' },
              { text: '09 UI / UX Engineering (NN/g)', link: '/en/ui-ux/' },
            ]
          },
          {
            text: 'Protocols & Docs',
            items: [
              { text: '10 Documentation Engineering', link: '/en/documentation/' },
              { text: '11 AI Collaboration Protocol', link: '/en/collaboration/' },
              { text: '12 AI Context & Reference Standards', link: '/en/context-standards/' },
            ]
          },
          { text: 'GitHub', link: 'https://github.com/hao05dev/engineering-playbook' }
        ],
        sidebar: [
          {
            text: '01 — AI-SDLC PLAYBOOK',
            collapsed: false,
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
            text: '02 — DOMAIN & BUSINESS ANALYSIS',
            collapsed: false,
            items: [
              { text: 'Overview & Principles', link: '/en/domain-analysis/' },
              { text: 'Domain Discovery & Problem Definition', link: '/en/domain-analysis/discovery' },
              { text: 'Stakeholder & Actor Analysis', link: '/en/domain-analysis/stakeholders' },
              { text: 'Business Processes, Rules & Events', link: '/en/domain-analysis/processes-rules' },
              { text: 'Business States, Constraints & Exceptions', link: '/en/domain-analysis/state-exceptions' },
              { text: 'Glossary, Assumptions & Ambiguity Detection', link: '/en/domain-analysis/glossary-ambiguity' }
            ]
          },
          {
            text: '03 — REQUIREMENTS ENGINEERING (IEEE 29148)',
            collapsed: false,
            items: [
              { text: 'Overview & Standards', link: '/en/requirements/' },
              { text: 'IEEE 29148 Fundamentals', link: '/en/requirements/ieee-29148' },
              { text: 'Document Hierarchy: BRD vs PRD vs SRS', link: '/en/requirements/brd-prd-srs' },
              { text: 'Functional & Non-Functional Requirements', link: '/en/requirements/functional-nfr' },
              { text: 'User Stories & Use Case Specifications', link: '/en/requirements/user-stories-use-cases' },
              { text: 'Validation, Verification & Traceability', link: '/en/requirements/validation-traceability' }
            ]
          },
          {
            text: '04 — SYSTEM ANALYSIS & UML (OMG UML)',
            collapsed: false,
            items: [
              { text: 'Overview & OMG UML Standards', link: '/en/uml/' },
              { text: 'Use Case & Activity Diagrams', link: '/en/uml/use-case-activity' },
              { text: 'Sequence & State Machine Diagrams', link: '/en/uml/sequence-state' },
              { text: 'Class Diagrams & Domain Modeling', link: '/en/uml/class-domain-model' },
              { text: 'Component & Deployment Diagrams', link: '/en/uml/component-deployment' },
              { text: 'UML Relationship Rules & Review Checklist', link: '/en/uml/relationship-rules-review' }
            ]
          },
          {
            text: '05 — SOFTWARE ARCHITECTURE (C4 & arc42)',
            collapsed: false,
            items: [
              { text: 'Architecture Overview & Principles', link: '/en/architecture/' },
              { text: 'Architecture Styles (Monolith, Modular, Microservices, EDA)', link: '/en/architecture/styles-patterns' },
              { text: 'The C4 Model (Context, Container, Component, Code)', link: '/en/architecture/c4-model' },
              { text: 'The arc42 Architecture Documentation Framework', link: '/en/architecture/arc42-framework' },
              { text: 'Quality Attributes & Trade-off Analysis', link: '/en/architecture/quality-attributes-tradeoffs' }
            ]
          },
          {
            text: '06 — ARCHITECTURE DECISIONS (ADR)',
            collapsed: false,
            items: [
              { text: 'ADR Overview & When to Use', link: '/en/adr/' },
              { text: 'ADR Structure & Lifecycle (MADR)', link: '/en/adr/lifecycle-structure' },
              { text: 'ADR Review Checklist & Prompts', link: '/en/adr/review-prompts' }
            ]
          },
          {
            text: '07 — DATABASE ENGINEERING',
            collapsed: false,
            items: [
              { text: 'Overview & Pipeline', link: '/en/database/' },
              { text: 'Design Pipeline: Domain to Physical SQL', link: '/en/database/design-pipeline' },
              { text: 'ERD Modeling, Cardinality & Normalization', link: '/en/database/erd-normalization' },
              { text: 'Indexes, Constraints & Query Optimization', link: '/en/database/indexes-constraints' },
              { text: 'Transactions, Concurrency & Data Integrity', link: '/en/database/transactions-concurrency' },
              { text: 'Migrations, Seed Data & Review Checklist', link: '/en/database/migrations-review' }
            ]
          },
          {
            text: '08 — API ENGINEERING (OPENAPI)',
            collapsed: false,
            items: [
              { text: 'Overview & Principles', link: '/en/api/' },
              { text: 'REST Design & Resource Modeling', link: '/en/api/design-principles-rest' },
              { text: 'HTTP Contracts, Status Codes & Error Models', link: '/en/api/http-contracts-errors' },
              { text: 'Validation, Authentication & Security', link: '/en/api/validation-auth-security' },
              { text: 'Pagination, Filtering, Sorting & Idempotency', link: '/en/api/pagination-filtering-idempotency' },
              { text: 'OpenAPI Specification & Review Checklist', link: '/en/api/openapi-review' }
            ]
          },
          {
            text: '09 — UI / UX ENGINEERING (NN/g)',
            collapsed: false,
            items: [
              { text: 'Overview & NN/g Principles', link: '/en/ui-ux/' },
              { text: 'User Goals, Journeys & User Flows', link: '/en/ui-ux/nng-fundamentals-journeys' },
              { text: 'Information Architecture, Wireframes & Mockups', link: '/en/ui-ux/ia-wireframes-mockups' },
              { text: 'Interaction Design, Form UX & State Handling', link: '/en/ui-ux/interaction-states-accessibility' },
              { text: 'Usability Testing & Review Checklist', link: '/en/ui-ux/usability-review' }
            ]
          },
          {
            text: '10 — DOCUMENTATION ENGINEERING',
            collapsed: false,
            items: [
              { text: 'Overview & Google Standards', link: '/en/documentation/' },
              { text: 'Google Engineering Documentation Principles', link: '/en/documentation/google-doc-standards' },
              { text: 'Authoring Guides: BRD, PRD, SRS & arc42', link: '/en/documentation/requirements-architecture-docs' },
              { text: 'Authoring Guides: DB, API, UI/UX & Test Plans', link: '/en/documentation/db-api-ui-test-docs' }
            ]
          },
          {
            text: '11 — AI COLLABORATION PROTOCOL',
            collapsed: false,
            items: [
              { text: 'Protocol Overview & Philosophy', link: '/en/collaboration/' },
              { text: 'The 6-Stage Collaboration Lifecycle', link: '/en/collaboration/six-stage-protocol' },
              { text: 'Information Classification Standard', link: '/en/collaboration/information-classification' },
              { text: 'Requirement Discovery & Questioning Loop', link: '/en/collaboration/discovery-questioning-loop' },
              { text: 'End-to-End Traceability & Change Impact Analysis', link: '/en/collaboration/traceability-change-impact' },
              { text: 'AI Challenge Rules & Specialized Reviewers', link: '/en/collaboration/ai-challenge-reviewer-checklists' }
            ]
          },
          {
            text: '12 — AI CONTEXT & REFERENCE STANDARDS',
            collapsed: false,
            items: [
              { text: 'Overview & Standards Matrix', link: '/en/context-standards/' },
              { text: 'Standard AI Context Files (AGENTS.md, etc.)', link: '/en/context-standards/ai-context-files' },
              { text: 'Comprehensive AI Prompt Library', link: '/en/context-standards/ai-prompt-library' },
              { text: 'Official Reference Standards & Attribution', link: '/en/context-standards/reference-standards' }
            ]
          }
        ],
        footer: {
          message: 'AI Software Engineering Knowledge Base — Released under MIT License.',
          copyright: 'Copyright © 2026 vCodeX / hao05dev. Built with VitePress.'
        },
        docFooter: {
          prev: 'Previous Page',
          next: 'Next Page'
        },
        editLink: {
          pattern: 'https://github.com/hao05dev/engineering-playbook/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        },
        lastUpdated: {
          text: 'Last updated'
        }
      }
    },
    vi: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      link: '/vi/',
      themeConfig: {
        nav: [
          { text: '01 Playbook', link: '/vi/introduction' },
          {
            text: 'Phân tích & Yêu cầu',
            items: [
              { text: '02 Phân tích Nghiệp vụ & Domain', link: '/vi/domain-analysis/' },
              { text: '03 Kỹ nghệ Yêu cầu (IEEE 29148)', link: '/vi/requirements/' },
              { text: '04 Phân tích Hệ thống & UML (OMG UML)', link: '/vi/uml/' },
            ]
          },
          {
            text: 'Kiến trúc & Thiết kế',
            items: [
              { text: '05 Kiến trúc Phần mềm (C4 & arc42)', link: '/vi/architecture/' },
              { text: '06 Quyết định Kiến trúc (ADR)', link: '/vi/adr/' },
              { text: '07 Kỹ nghệ Cơ sở Dữ liệu', link: '/vi/database/' },
              { text: '08 Kỹ nghệ API (OpenAPI)', link: '/vi/api/' },
              { text: '09 Thiết kế UI / UX (NN/g)', link: '/vi/ui-ux/' },
            ]
          },
          {
            text: 'Giao thức & Tài liệu',
            items: [
              { text: '10 Kỹ nghệ Tài liệu Kỹ thuật', link: '/vi/documentation/' },
              { text: '11 Giao thức Hợp tác Cùng AI', link: '/vi/collaboration/' },
              { text: '12 Ngữ cảnh AI & Chuẩn Tham chiếu', link: '/vi/context-standards/' },
            ]
          },
          { text: 'GitHub', link: 'https://github.com/hao05dev/engineering-playbook' }
        ],
        sidebar: [
          {
            text: '01 — AI-SDLC PLAYBOOK',
            collapsed: false,
            items: [
              { text: 'Giới thiệu', link: '/vi/introduction' },
              { text: 'Nguyên tắc Cốt lõi', link: '/vi/core-principles' },
              { text: 'Cổng Chất lượng (Quality Gates)', link: '/vi/quality-gates' },
              { text: '01 Khám phá Domain', link: '/vi/domain-exploration' },
              { text: '02 Yêu cầu Sản phẩm', link: '/vi/product-requirements' },
              { text: '03 Thiết kế Kỹ thuật', link: '/vi/technical-design' },
              { text: '04 Phân rã Task', link: '/vi/task-breakdown' },
              { text: '05 Kế hoạch Thực thi', link: '/vi/implementation-planning' },
              { text: '06 Prompt & AI Thực thi', link: '/vi/prompting' },
              { text: '07 Sinh Mã nguồn', link: '/vi/code-generation' },
              { text: '08 Tự động Chạy Tests', link: '/vi/testing' },
              { text: '09 Review bởi Kỹ sư', link: '/vi/human-review' },
              { text: '10 Xử lý Bug', link: '/vi/bug-fix' },
              { text: '11 Commit & Push', link: '/vi/commit' },
              { text: 'Thiết lập Agent', link: '/vi/agent-setup' },
              { text: 'Chuẩn mực Lập trình', link: '/vi/coding-standards' },
              { text: 'Quy tắc cho Agent', link: '/vi/agent-rules' }
            ]
          },
          {
            text: '02 — PHÂN TÍCH NGHIỆP VỤ & DOMAIN',
            collapsed: false,
            items: [
              { text: 'Tổng quan & Nguyên lý', link: '/vi/domain-analysis/' },
              { text: 'Khám phá Domain & Phát biểu Bài toán', link: '/vi/domain-analysis/discovery' },
              { text: 'Phân tích Stakeholder & Actor', link: '/vi/domain-analysis/stakeholders' },
              { text: 'Quy trình, Quy tắc & Sự kiện Nghiệp vụ', link: '/vi/domain-analysis/processes-rules' },
              { text: 'Trạng thái, Ràng buộc & Ngoại lệ Nghiệp vụ', link: '/vi/domain-analysis/state-exceptions' },
              { text: 'Thuật ngữ Domain, Giả định & Bắt lỗi Mơ hồ', link: '/vi/domain-analysis/glossary-ambiguity' }
            ]
          },
          {
            text: '03 — KỸ NGHỆ YÊU CẦU (IEEE 29148)',
            collapsed: false,
            items: [
              { text: 'Tổng quan & Chuẩn mực', link: '/vi/requirements/' },
              { text: 'Nền tảng Chuẩn IEEE 29148', link: '/vi/requirements/ieee-29148' },
              { text: 'Phân tầng Tài liệu: BRD vs PRD vs SRS', link: '/vi/requirements/brd-prd-srs' },
              { text: 'Yêu cầu Chức năng & Phi Chức năng', link: '/vi/requirements/functional-nfr' },
              { text: 'User Stories & Đặc tả Use Case', link: '/vi/requirements/user-stories-use-cases' },
              { text: 'Thẩm định, Kiểm tra & Ma trận Truy vết', link: '/vi/requirements/validation-traceability' }
            ]
          },
          {
            text: '04 — PHÂN TÍCH HỆ THỐNG & UML (OMG UML)',
            collapsed: false,
            items: [
              { text: 'Tổng quan & Chuẩn OMG UML', link: '/vi/uml/' },
              { text: 'Sơ đồ Use Case & Sơ đồ Hoạt động (Activity)', link: '/vi/uml/use-case-activity' },
              { text: 'Sơ đồ Tuần tự (Sequence) & Sơ đồ Trạng thái', link: '/vi/uml/sequence-state' },
              { text: 'Sơ đồ Lớp (Class) & Mô hình Domain', link: '/vi/uml/class-domain-model' },
              { text: 'Sơ đồ Thành phần (Component) & Triển khai', link: '/vi/uml/component-deployment' },
              { text: 'Quy tắc Quan hệ UML & Checklist Review', link: '/vi/uml/relationship-rules-review' }
            ]
          },
          {
            text: '05 — KIẾN TRÚC PHẦN MỀM (C4 & arc42)',
            collapsed: false,
            items: [
              { text: 'Tổng quan & Nguyên lý Kiến trúc', link: '/vi/architecture/' },
              { text: 'Phong cách Kiến trúc (Monolith, Modular, Microservices, EDA)', link: '/vi/architecture/styles-patterns' },
              { text: 'Mô hình C4 (Context, Container, Component, Code)', link: '/vi/architecture/c4-model' },
              { text: 'Khung Tài liệu Kiến trúc arc42', link: '/vi/architecture/arc42-framework' },
              { text: 'Thuộc tính Chất lượng & Đánh đổi Kiến trúc', link: '/vi/architecture/quality-attributes-tradeoffs' }
            ]
          },
          {
            text: '06 — QUYẾT ĐỊNH KIẾN TRÚC (ADR)',
            collapsed: false,
            items: [
              { text: 'Tổng quan ADR & Khi nào Cần Tạo', link: '/vi/adr/' },
              { text: 'Cấu trúc & Vòng đời ADR (MADR)', link: '/vi/adr/lifecycle-structure' },
              { text: 'Checklist Review ADR & Mẫu Prompt AI', link: '/vi/adr/review-prompts' }
            ]
          },
          {
            text: '07 — KỸ NGHỆ CƠ SỞ DỮ LIỆU',
            collapsed: false,
            items: [
              { text: 'Tổng quan & Quy trình Thiết kế', link: '/vi/database/' },
              { text: 'Quy trình: Domain ➔ Conceptual ➔ Logical ➔ Physical SQL', link: '/vi/database/design-pipeline' },
              { text: 'Mô hình ERD, Bản số (Cardinality) & Chuẩn hóa', link: '/vi/database/erd-normalization' },
              { text: 'Indexes, Ràng buộc & Tối ưu Truy vấn', link: '/vi/database/indexes-constraints' },
              { text: 'Giao dịch (Transactions), Đồng thời & Toàn vẹn Dữ liệu', link: '/vi/database/transactions-concurrency' },
              { text: 'Migration, Dữ liệu Mẫu & Checklist Review', link: '/vi/database/migrations-review' }
            ]
          },
          {
            text: '08 — KỸ NGHỆ API (OPENAPI)',
            collapsed: false,
            items: [
              { text: 'Tổng quan & Nguyên tắc', link: '/vi/api/' },
              { text: 'Thiết kế REST & Mô hình hóa Tài nguyên', link: '/vi/api/design-principles-rest' },
              { text: 'Hợp đồng HTTP, Mã Trạng thái & Mô hình Lỗi', link: '/vi/api/http-contracts-errors' },
              { text: 'Validation, Xác thực & Phân quyền Bảo mật', link: '/vi/api/validation-auth-security' },
              { text: 'Phân trang, Lọc, Sắp xếp & Tính Lũy biến', link: '/vi/api/pagination-filtering-idempotency' },
              { text: 'Đặc tả OpenAPI & Checklist Review API', link: '/vi/api/openapi-review' }
            ]
          },
          {
            text: '09 — THIẾT KẾ UI / UX (NN/g)',
            collapsed: false,
            items: [
              { text: 'Tổng quan & Nguyên lý NN/g', link: '/vi/ui-ux/' },
              { text: 'Mục tiêu Người dùng, Hành trình & User Flows', link: '/vi/ui-ux/nng-fundamentals-journeys' },
              { text: 'Kiến trúc Thông tin (IA), Wireframe & Mockup', link: '/vi/ui-ux/ia-wireframes-mockups' },
              { text: 'Thiết kế Tương tác, Form UX & Quản lý Trạng thái', link: '/vi/ui-ux/interaction-states-accessibility' },
              { text: 'Kiểm thử Khả dụng & Checklist Review UI/UX', link: '/vi/ui-ux/usability-review' }
            ]
          },
          {
            text: '10 — KỸ NGHỆ TÀI LIỆU KỸ THUẬT',
            collapsed: false,
            items: [
              { text: 'Tổng quan & Chuẩn Google', link: '/vi/documentation/' },
              { text: 'Chuẩn mực Viết Tài liệu Kỹ thuật của Google', link: '/vi/documentation/google-doc-standards' },
              { text: 'Hướng dẫn Viết: BRD, PRD, SRS & arc42', link: '/vi/documentation/requirements-architecture-docs' },
              { text: 'Hướng dẫn Viết: DB, API, UI/UX & Kế hoạch Test', link: '/vi/documentation/db-api-ui-test-docs' }
            ]
          },
          {
            text: '11 — GIAO THỨC HỢP TÁC CÙNG AI',
            collapsed: false,
            items: [
              { text: 'Tổng quan Giao thức & Triết lý', link: '/vi/collaboration/' },
              { text: 'Vòng đời Hợp tác 6 Giai đoạn', link: '/vi/collaboration/six-stage-protocol' },
              { text: 'Chuẩn Phân loại Thông tin (Classification)', link: '/vi/collaboration/information-classification' },
              { text: 'Giao thức Khám phá Yêu cầu & Hỏi Làm rõ', link: '/vi/collaboration/discovery-questioning-loop' },
              { text: 'Ma trận Truy vết & Phân tích Tác động Thay đổi', link: '/vi/collaboration/traceability-change-impact' },
              { text: 'Quy tắc AI Phản biện & Bộ Checklist Reviewer', link: '/vi/collaboration/ai-challenge-reviewer-checklists' }
            ]
          },
          {
            text: '12 — NGỮ CẢNH AI & CHUẨN THAM CHIẾU',
            collapsed: false,
            items: [
              { text: 'Tổng quan & Ma trận Chuẩn mực', link: '/vi/context-standards/' },
              { text: 'Hệ thống Tệp Ngữ cảnh Chuẩn (AGENTS.md, v.v.)', link: '/vi/context-standards/ai-context-files' },
              { text: 'Thư viện Prompt AI Toàn diện', link: '/vi/context-standards/ai-prompt-library' },
              { text: 'Chuẩn Tham chiếu Chính thức & Ma trận Nguồn', link: '/vi/context-standards/reference-standards' }
            ]
          }
        ],
        footer: {
          message: 'AI Software Engineering Knowledge Base — Phát hành theo giấy phép MIT.',
          copyright: 'Bản quyền © 2026 vCodeX / hao05dev. Xây dựng với VitePress.'
        },
        docFooter: {
          prev: 'Trang trước',
          next: 'Trang tiếp theo'
        },
        editLink: {
          pattern: 'https://github.com/hao05dev/engineering-playbook/edit/main/docs/:path',
          text: 'Chỉnh sửa trang này trên GitHub'
        },
        lastUpdated: {
          text: 'Cập nhật lần cuối'
        },
        outline: {
          label: 'Nội dung trang'
        },
        darkModeSwitchLabel: 'Giao diện',
        lightModeSwitchTitle: 'Chuyển sang giao diện sáng',
        darkModeSwitchTitle: 'Chuyển sang giao diện tối',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Lên đầu trang'
      }
    }
  },

  themeConfig: {
    siteTitle: 'AI Engineering KB',
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
                buttonAriaLabel: 'Tìm kiếm kho tri thức'
              },
              modal: {
                noResultsText: 'Không tìm thấy kết quả phù hợp',
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
