# Building a Portfolio Website from Scratch (with AI)

> **Last Updated**: 5 January 2026

[![Live Site](https://img.shields.io/badge/Live-winstonkoh87.github.io-00C853?style=flat-square)](https://winstonkoh87.github.io/)
[![Built with Athena](https://img.shields.io/badge/Built_with-Athena-CC785C?style=flat-square)](https://github.com/winstonkoh87/Athena-Public)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white&style=flat-square)](https://validator.w3.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?logo=css3&logoColor=white&style=flat-square)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black&style=flat-square)]()
[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222222?logo=github&logoColor=white&style=flat-square)](https://pages.github.com/)
[![No Frameworks](https://img.shields.io/badge/Frameworks-None-black?style=flat-square)]()

A personal portfolio website built from the ground up using pure HTML, CSS, and JavaScript — no frameworks, no dependencies, no bullshit.

This is a documentation of how I built a complete portfolio website with AI-augmented execution using [Project Athena](https://github.com/winstonkoh87/Athena-Public).

---

## 📊 Site Overview

| Metric | Count |
|--------|-------|
| **Pages** | 8 |
| **Articles** | 6 |
| **Live Demo Sites** | 5 |
| **AI Widget** | ✅ Athena Live |

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
| **Markup** | HTML5 (semantic) |
| **Styling** | CSS3 (custom properties, flexbox, grid, glassmorphism) |
| **Interactivity** | Vanilla JavaScript |
| **Build** | `build.py` (component stamping) |
| **CI/CD** | GitHub Actions (HTML validation + link checker) |
| **Hosting** | GitHub Pages |

### Philosophy: Keep It Simple

We intentionally opted for a **basic tech stack**. No React. No Next.js. No Tailwind. No npm.

Why?

- **Lower complexity** = fewer points of failure
- **Faster load times** = ~40KB total page weight
- **Easier maintenance** = anyone can read the code
- **No build dependencies** = just push and deploy

You don't need a complicated stack to get the job done. **Zero frameworks. Zero dependencies.**

---

## 🤖 Built by a Bionic Unit

> **This entire site was co-created with [Project Athena](https://github.com/winstonkoh87/Athena-Public)** — my AI-Powered Digital Personal Assistant.

### The Workflow

| Layer | Role | Example |
|-------|------|---------|
| **Human (Winston)** | Vision, strategy, taste | "I need a portfolio that positions me as someone who builds reliable systems" |
| **AI (Athena)** | Execution, research, code | HTML/CSS, copy, SEO audit, widget implementation |

This isn't just a portfolio *about* AI-augmented work — it's a **living demonstration** of the workflow itself.

### What Athena Did (January 2026)

- **Built** the Athena Live AI widget with Smart Mock response system
- **Implemented** localStorage caching for instant responses
- **Generated** 6 article pages (AI Strategy, Case Studies, Guides)
- **Created** 5 live demo sites (restaurants, tutoring, portfolios)
- **Designed** dark mode aesthetic, glassmorphism cards, particle constellation
- **Audited** codebase for SEO, accessibility, broken links
- **Generated** og:image social cards for LinkedIn/Twitter

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
| [About](https://winstonkoh87.github.io/about.html) | Identity, philosophy, Bionic Operating Model |
| [Framework](https://winstonkoh87.github.io/framework.html) | Three-Pillar Leadership, Arena Physics, Laws, SDR |
| [Writing](https://winstonkoh87.github.io/writing.html) | Blog with 6 published articles |
| [Portfolio](https://winstonkoh87.github.io/portfolio.html) | 5 live demo sites + coming soon projects |
| [Athena](https://winstonkoh87.github.io/athena.html) | Product page: What Athena is and how it works |
| [Services](https://winstonkoh87.github.io/services.html) | Fixed pricing. Fast delivery. Systems that work. |
| [Contact](https://winstonkoh87.github.io/contact.html) | WhatsApp CTA + social links |

---

## ✍️ Articles

| Title | Topic |
|-------|-------|
| [The AI Bionic Layer](https://winstonkoh87.github.io/articles/ai-bionic-layer.html) | Why AI augmentation beats replacement |
| [The 5 Pillars of Athena](https://winstonkoh87.github.io/articles/athena-5-pillars.html) | Architecture deep-dive |
| [Athena Public Launch](https://winstonkoh87.github.io/articles/athena-public-launch.html) | Open-source announcement |
| [Case Study: P6 Math Tuition](https://winstonkoh87.github.io/articles/case-study-p6-math-tuition.html) | Client work breakdown |
| [SME AI Marketing Guide](https://winstonkoh87.github.io/articles/sme-ai-marketing-guide.html) | Practical AI for small business |
| [Trilateral Feedback Loop](https://winstonkoh87.github.io/articles/trilateral-feedback-loop.html) | Multi-AI validation system |

---

## 🎨 Live Demo Sites

| Project | Type | Link |
|---------|------|------|
| **P6 Math Tuition** | Education | [View Site](https://winstonkoh87.github.io/projects/p6-math-tuition/) |
| **Brew & Bean** | F&B | [View Site](https://winstonkoh87.github.io/projects/brew/) |
| **Sticker Shop** | E-commerce | [View Site](https://winstonkoh87.github.io/projects/sticker-shop/) |
| **That Bio Tutor** | Education | [View Site](https://winstonkoh87.github.io/projects/thatbiotutor/) |
| **Melvin Lim Portfolio** | Personal | [View Site](https://winstonkoh87.github.io/projects/melvin/) |

---

## ✨ Features

- 🎆 Interactive particle constellation background
- 💬 Athena Live AI chat widget
- 📱 Mobile responsive
- 🌙 Dark mode aesthetic
- ⚡ Fast load (~40KB total)
- 🔍 JSON-LD structured data (SEO)
- ♿ Accessibility: skip-links, focus-visible states
- 💾 localStorage caching for AI responses
- 📊 GitHub Actions: HTML validation + broken link checker

---

## 🚀 Deployment

Hosted on **GitHub Pages**. Push to `main` → auto-deploy.

```bash
git push origin main
# → GitHub Actions validates HTML
# → GitHub Actions checks for broken links
# → Site deploys automatically
```

---

## 📚 Documentation

System architectures and strategic frameworks are hosted on the **[Athena-Public Repo](https://github.com/winstonkoh87/Athena-Public)**:

- [Architecture](https://github.com/winstonkoh87/Athena-Public/blob/main/docs/ARCHITECTURE.md) — System design
- [Trilateral Feedback](https://github.com/winstonkoh87/Athena-Public/blob/main/docs/TRILATERAL_FEEDBACK.md) — Multi-AI validation
- [Getting Started](https://github.com/winstonkoh87/Athena-Public/blob/main/docs/GETTING_STARTED.md) — Build your own

---

*Built with pure HTML/CSS/JS. No frameworks. No bullshit. It just works.*
