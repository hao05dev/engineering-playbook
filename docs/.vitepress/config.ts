import { defineConfig } from 'vitepress'

export default defineConfig({
  base: process.env.BASE_PATH || (process.env.GITHUB_ACTIONS ? '/engineering-playbook/' : '/'),
  title: 'AI-SDLC Engineering Playbook',
  description: 'A practical engineering workflow for building software with AI — from requirements and technical design to implementation, testing, review, and delivery.',
  cleanUrls: true,
  lastUpdated: true,
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'AI-SDLC Engineering Playbook' }],
    ['meta', { property: 'og:description', content: 'A practical engineering workflow for building software with AI' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/introduction' },
          { text: 'Design', link: '/en/domain-exploration' },
          { text: 'Execution', link: '/en/implementation-planning' },
          { text: 'Guidelines', link: '/en/core-principles' },
          { text: 'GitHub', link: 'https://github.com/hao05dev/engineering-playbook' }
        ],
        sidebar: [
          {
            text: 'OVERVIEW',
            items: [
              { text: 'Introduction', link: '/en/introduction' },
              { text: 'Core Principles', link: '/en/core-principles' },
              { text: 'Quality Gates', link: '/en/quality-gates' }
            ]
          },
          {
            text: 'DESIGN PHASE',
            items: [
              { text: '01 — Domain & Idea Exploration', link: '/en/domain-exploration' },
              { text: '02 — Product Requirement Definition', link: '/en/product-requirements' },
              { text: '03 — Technical Design', link: '/en/technical-design' },
              { text: '04 — Phasing & Task Breakdown', link: '/en/task-breakdown' }
            ]
          },
          {
            text: 'EXECUTION PHASE',
            items: [
              { text: '05 — Implementation Planning', link: '/en/implementation-planning' },
              { text: '06 — Prompt & AI Execute', link: '/en/prompting' },
              { text: '07 — AI Code Generation', link: '/en/code-generation' },
              { text: '08 — AI Run Tests', link: '/en/testing' },
              { text: '09 — Human Review & Confirm', link: '/en/human-review' },
              { text: '10 — Bug Fix', link: '/en/bug-fix' },
              { text: '11 — Commit & Push', link: '/en/commit' }
            ]
          },
          {
            text: 'GUIDELINES',
            items: [
              { text: 'Agent Setup', link: '/en/agent-setup' },
              { text: 'Coding Standards', link: '/en/coding-standards' },
              { text: 'Agent Rules', link: '/en/agent-rules' },
              { text: 'S.C.O.P.E Prompting', link: '/en/prompting' }
            ]
          }
        ],
        footer: {
          message: 'AI-SDLC Engineering Playbook — Released under MIT License.',
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
          { text: 'Guide', link: '/en/introduction' },
          { text: 'Design', link: '/en/domain-exploration' },
          { text: 'Execution', link: '/en/implementation-planning' },
          { text: 'Guidelines', link: '/en/core-principles' },
          { text: 'GitHub', link: 'https://github.com/hao05dev/engineering-playbook' }
        ],
        sidebar: [
          {
            text: 'OVERVIEW',
            items: [
              { text: 'Introduction', link: '/en/introduction' },
              { text: 'Core Principles', link: '/en/core-principles' },
              { text: 'Quality Gates', link: '/en/quality-gates' }
            ]
          },
          {
            text: 'DESIGN PHASE',
            items: [
              { text: '01 — Domain & Idea Exploration', link: '/en/domain-exploration' },
              { text: '02 — Product Requirement Definition', link: '/en/product-requirements' },
              { text: '03 — Technical Design', link: '/en/technical-design' },
              { text: '04 — Phasing & Task Breakdown', link: '/en/task-breakdown' }
            ]
          },
          {
            text: 'EXECUTION PHASE',
            items: [
              { text: '05 — Implementation Planning', link: '/en/implementation-planning' },
              { text: '06 — Prompt & AI Execute', link: '/en/prompting' },
              { text: '07 — AI Code Generation', link: '/en/code-generation' },
              { text: '08 — AI Run Tests', link: '/en/testing' },
              { text: '09 — Human Review & Confirm', link: '/en/human-review' },
              { text: '10 — Bug Fix', link: '/en/bug-fix' },
              { text: '11 — Commit & Push', link: '/en/commit' }
            ]
          },
          {
            text: 'GUIDELINES',
            items: [
              { text: 'Agent Setup', link: '/en/agent-setup' },
              { text: 'Coding Standards', link: '/en/coding-standards' },
              { text: 'Agent Rules', link: '/en/agent-rules' },
              { text: 'S.C.O.P.E Prompting', link: '/en/prompting' }
            ]
          }
        ],
        footer: {
          message: 'AI-SDLC Engineering Playbook — Released under MIT License.',
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
          { text: 'Tài liệu', link: '/vi/introduction' },
          { text: 'Thiết kế', link: '/vi/domain-exploration' },
          { text: 'Thực thi', link: '/vi/implementation-planning' },
          { text: 'Nguyên tắc', link: '/vi/core-principles' },
          { text: 'GitHub', link: 'https://github.com/hao05dev/engineering-playbook' }
        ],
        sidebar: [
          {
            text: 'TỔNG QUAN',
            items: [
              { text: 'Giới thiệu', link: '/vi/introduction' },
              { text: 'Nguyên tắc Cốt lõi', link: '/vi/core-principles' },
              { text: 'Cổng Chất lượng (Quality Gates)', link: '/vi/quality-gates' }
            ]
          },
          {
            text: 'GIAI ĐOẠN THIẾT KẾ (DESIGN)',
            items: [
              { text: '01 — Khám phá Ý tưởng & Domain', link: '/vi/domain-exploration' },
              { text: '02 — Định nghĩa Yêu cầu Sản phẩm', link: '/vi/product-requirements' },
              { text: '03 — Thiết kế Kỹ thuật (Technical Design)', link: '/vi/technical-design' },
              { text: '04 — Phân kỳ & Phân rã Nhiệm vụ', link: '/vi/task-breakdown' }
            ]
          },
          {
            text: 'GIAI ĐOẠN THỰC THI (EXECUTION)',
            items: [
              { text: '05 — Kế hoạch Thực thi (Planning)', link: '/vi/implementation-planning' },
              { text: '06 — Prompting & AI Thực thi', link: '/vi/prompting' },
              { text: '07 — Sinh Mã nguồn (AI Code Gen)', link: '/vi/code-generation' },
              { text: '08 — Tự động Chạy Tests', link: '/vi/testing' },
              { text: '09 — Review & Phê duyệt (Human)', link: '/vi/human-review' },
              { text: '10 — Xử lý Bug & Chẩn đoán', link: '/vi/bug-fix' },
              { text: '11 — Commit & Đẩy mã nguồn (Push)', link: '/vi/commit' }
            ]
          },
          {
            text: 'HƯỚNG DẪN & CHUẨN MỰC',
            items: [
              { text: 'Thiết lập Agent (Agent Setup)', link: '/vi/agent-setup' },
              { text: 'Chuẩn mực Lập trình (Coding Standards)', link: '/vi/coding-standards' },
              { text: 'Quy tắc cho Agent (Agent Rules)', link: '/vi/agent-rules' },
              { text: 'Kỹ thuật S.C.O.P.E Prompting', link: '/vi/prompting' }
            ]
          }
        ],
        footer: {
          message: 'AI-SDLC Engineering Playbook — Phát hành theo giấy phép MIT.',
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
    siteTitle: 'AI-SDLC Engineering Playbook',
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
