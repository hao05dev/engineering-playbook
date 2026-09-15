# AI-SDLC Engineering Playbook

A practical, professional engineering playbook and documentation website for building software with AI — from requirements and technical design to implementation, automated testing, human review, and delivery.

Website deployed statically to GitHub Pages with full bilingual support (**English** and **Tiếng Việt**).

---

## Tech Stack
- **Framework**: [VitePress](https://vitepress.dev/) 1.6+ (Vue 3, TypeScript, Markdown-it)
- **Search**: Built-in client-side MiniSearch (Bilingual EN & VI offline search)
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)
- **Hosting**: GitHub Pages

---

## Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run docs:dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build Static Site
```bash
npm run docs:build
```
The static HTML/CSS/JS bundle will be generated into `docs/.vitepress/dist/`.

### 4. Preview Production Build Locally
```bash
npm run docs:preview
```

---

## Documentation Structure

```
docs/
├── en/                     # English Documentation
│   ├── introduction.md
│   ├── core-principles.md
│   ├── quality-gates.md
│   ├── agent-setup.md
│   ├── coding-standards.md
│   ├── agent-rules.md
│   ├── prompting.md
│   ├── domain-exploration.md
│   ├── product-requirements.md
│   ├── technical-design.md
│   ├── task-breakdown.md
│   ├── implementation-planning.md
│   ├── code-generation.md
│   ├── testing.md
│   ├── human-review.md
│   ├── bug-fix.md
│   └── commit.md
└── vi/                     # Vietnamese Documentation (1:1 Mirrored)
    ├── introduction.md
    └── ...
```

---

## Deployment to GitHub Pages

This repository includes an automated GitHub Actions workflow (`.github/workflows/deploy.yml`).

To enable GitHub Pages in your repository:
1. Go to repository **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Push to `main` branch to trigger automated deployment.

---

## License
MIT License. Created by [hao05dev](https://github.com/hao05dev).