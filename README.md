# Building a Portfolio Website (Astro v5)

> **Last Updated**: 16 January 2026
> **Status**: Migrated to Astro Framework 🚀

[![Live Site](https://img.shields.io/badge/Live-winstonkoh87.github.io-00C853?style=flat-square)](https://winstonkoh87.github.io/)
[![Built with Athena](https://img.shields.io/badge/Built_with-Athena-CC785C?style=flat-square)](https://github.com/winstonkoh87/Athena-Public)
[![Astro](https://img.shields.io/badge/Framework-Astro_5.0-BC52EE?logo=astro&logoColor=white&style=flat-square)](https://astro.build/)
[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222222?logo=github&logoColor=white&style=flat-square)](https://pages.github.com/)

A personal portfolio website built with **Astro**, focusing on performance, component reusability, and zero-JavaScript defaults.

This documents how I built (and evolved) a complete portfolio website with AI-augmented execution using [Project Athena](https://github.com/winstonkoh87/Athena-Public).

---

## 📊 Site Overview

| Metric | Count |
|--------|-------|
| **Pages** | 8 |
| **Articles** | 13 |
| **Live Demo Sites** | 6 |
| **AI Widget** | ✅ Athena Live |
| **Framework** | Astro 5.0 |

---

## ⚡ Featured: Athena Live Widget

The homepage includes an **interactive AI chat widget** that demonstrates the Athena experience.

### The Smart Mock Story

API integration with Gemini was too much hassle — rate limits, latency, key management. So we built a **Smart Mock system** instead: keyword-matched, pre-authored responses with simulated typing delay. Same UX, zero cost, instant responses.

```
               ┌──────────────────────────────────────┐
   User Query  │  "What is Athena?"                   │
               └──────────────┬───────────────────────┘
                              ▼
               ┌──────────────────────────────────────┐
               │  Keyword Match: "athena" detected    │
               │  → Return pre-authored response      │
               │  → 800ms simulated typing delay      │
               └──────────────────────────────────────┘
```

### What It Does

- **Smart Mock System** — Rule-based responses covering ~20 common questions
- **localStorage Persistence** — Chat state survives page refresh for seamless UX
- **Reset Command** — `/reset` command allows users to clear cache and restart the flow
- **Dynamic Suggestions** — Context-aware follow-up prompts after each response
- **Graceful Fallback** — Unknown queries get a helpful "how to reach me" response

> **Future**: If usage justifies it, we'll add live API. The architecture already supports it — just swap the mock for a real fetch.

Try it: [winstonkoh87.github.io](https://winstonkoh87.github.io/) → Click the chat icon

---

## 🛠 Tech Stack

| Component | Technology |
|-----------|------------|
| **Framework** | **Astro 5.0** |
| **Styling** | Vanilla CSS (Scoped & Global) |
| **Interactivity** | Vanilla JavaScript (Islands Architecture) |
| **Build** | `npm run build` (Static Site Generation) |
| **CI/CD** | GitHub Actions (Astro Build + Deploy) |
| **Hosting** | GitHub Pages |

### Philosophy: Evolution to Astro

We started with pure HTML/CSS/JS to prove a point about simplicity. But as the site grew (blogs, components, layouts), we needed a **maintainable architecture** without sacrificing performance.

**Enter Astro.**

- **Zero JS by Default**: Ships pure HTML unless interactivity is explicitly requested.
- **Component Architecture**: Reusable `.astro` components for Headers, Footers, and Cards.
- **Content Collections**: Markdown/MDX support for the blog (coming soon).
- **Same Performance**: Still ~40KB initial load, but now with better developer experience.

We didn't sell out. We **leveled up**.

---

## 🤖 Built by a Bionic Unit

> **This entire site was co-created with [Project Athena](https://github.com/winstonkoh87/Athena-Public)** — my AI-Powered Digital Personal Assistant.

### The Workflow

| Layer | Role | Example |
|-------|------|---------|
| **Human (Winston)** | Vision, strategy, taste | "I need a portfolio that positions me as someone who builds reliable systems" |
| **AI (Athena)** | Execution, research, code | Astro migration, component extraction, SEO audit |

This isn't just a portfolio *about* AI-augmented work — it's a **living demonstration** of the workflow itself.

### What Athena Did (January 2026)

- **Migrated** entire site from Vanilla HTML to Astro v5
- **Refactored** repeated UI into reusable Components (`<Navigation/>`, `<Footer/>`)
- **Built** the Athena Live AI widget with Smart Mock response system
- **Implemented** localStorage caching for instant responses
- **Designed** dark mode aesthetic, glassmorphism cards, particle constellation
- **Audited** codebase for SEO, accessibility, broken links

### The Operating Model

```
┌─────────────────────────────────────────────────────────────┐
│  Human Intent (Top 1% nuance)   +   AI Scale (99% execution) │
│                        =                                      │
│                  1000% Leverage                               │
└─────────────────────────────────────────────────────────────┘
```

> *"Athena is a digital extension of me. It executes in my voice, with my principles."*

---

## 📄 Pages

| Page | Description |
|------|-------------|
| [Home](https://winstonkoh87.github.io/) | Hero + Athena Live widget + Featured projects |
| [About](https://winstonkoh87.github.io/about) | Identity, philosophy, Bionic Operating Model |
| [Framework](https://winstonkoh87.github.io/framework) | Three-Pillar Leadership, Arena Physics, Laws, SDR |
| [Writing](https://winstonkoh87.github.io/writing) | Blog with 13 published articles |
| [Portfolio](https://winstonkoh87.github.io/portfolio) | 6 live demo sites |
| [Athena](https://winstonkoh87.github.io/athena) | Product page: What Athena is and how it works |
| [Services](https://winstonkoh87.github.io/services) | Fixed pricing. Fast delivery. Systems that work. |
| [Contact](https://winstonkoh87.github.io/contact) | WhatsApp CTA + social links |

---

## ✍️ Articles

| Title | Topic |
|-------|-------|
| [The AI Bionic Layer](https://winstonkoh87.github.io/articles/ai-bionic-layer) | Why AI augmentation beats replacement |
| [The 5 Pillars of Athena](https://winstonkoh87.github.io/articles/athena-5-pillars) | Architecture deep-dive |
| [Athena Public Launch](https://winstonkoh87.github.io/articles/athena-public-launch) | Open-source announcement |
| [Case Study: P6 Math Tuition](https://winstonkoh87.github.io/articles/case-study-p6-math-tuition) | Client work breakdown |
| [SME AI Marketing Guide](https://winstonkoh87.github.io/articles/sme-ai-marketing-guide) | Practical AI for small business |
| [Trilateral Feedback Loop](https://winstonkoh87.github.io/articles/trilateral-feedback-loop) | Multi-AI validation system |

---

## 🎨 Live Demo Sites

| Project | Type | Link |
|---------|------|------|
| **P6 Math Tuition** | Education | [View Site](https://winstonkoh87.github.io/projects/p6-math-tuition/) |
| **Brew & Bean** | F&B | [View Site](https://winstonkoh87.github.io/projects/brew/) |
| **Sticker Shop** | E-commerce | [View Site](https://winstonkoh87.github.io/projects/sticker-shop/) |
| **That Bio Tutor** | Education | [View Site](https://winstonkoh87.github.io/projects/thatbiotutor/) |
| **Melvin Lim Portfolio** | Personal | [View Site](https://winstonkoh87.github.io/projects/melvin/) |
| **Coach Derrick Lim** | Digital Marketing | [View Case Study](https://winstonkoh87.github.io/articles/ai-marketing-workflow/) |

---

## ✨ Features

- 🎆 Interactive particle constellation background
- 💬 Athena Live AI chat widget
- 📱 Mobile responsive
- 🌙 Dark mode aesthetic
- ⚡ Fast load (~40KB total) — Powered by Astro Island Architecture
- 🔍 JSON-LD structured data (SEO)
- ♿ Accessibility: skip-links, focus-visible states
- 💾 localStorage caching for AI responses
- 📊 GitHub Actions: CI/CD Build & Deploy

---

## 🚀 Deployment

Hosted on **GitHub Pages** via Astro Build Action.

```bash
git push origin main
# → GitHub Actions builds Astro project
# → Output generated in /dist
# → Deployed to GitHub Pages
```

---

## 📚 Documentation

System architectures and strategic frameworks are hosted on the **[Athena-Public Repo](https://github.com/winstonkoh87/Athena-Public)**:

- [Architecture](https://github.com/winstonkoh87/Athena-Public/blob/main/docs/ARCHITECTURE.md) — System design
- [Trilateral Feedback](https://github.com/winstonkoh87/Athena-Public/blob/main/docs/TRILATERAL_FEEDBACK.md) — Multi-AI validation
- [Getting Started](https://github.com/winstonkoh87/Athena-Public/blob/main/docs/GETTING_STARTED.md) — Build your own

---

*Built with Astro. Efficient. Scalable. Ships fast.*
