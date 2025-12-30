# Project Name: Portfolio V2 (The Systems Architect)

> **One-Liner**: A high-performance, static portfolio that positions Winston Koh as a "Systems Architect" rather than just a developer.
> **Target Audience**: High-value clients, technical recruiters, and "Arena" players.
> **Success Metric**: Inbound leads (WhatsApp clicks) and "Trust" signals (Time on Site).

## 1. The Core Loop

1. **Hook**: User lands on `index.html`. Hero text ("I build systems that run themselves") framing the value prop.
2. **Proof**: User navigates to `portfolio.html`, filters by "AI Systems", sees *Project Athena* and *Brew & Bean* demo.
3. **Conversion**: User clicks floating WhatsApp button or "Initialize Project" (Tally Form).

## 2. Technical Stack (Constraints)

*Hard constraints. No "nice to haves".*

- **Host**: GitHub Pages (winstonkoh87.github.io).  **[NO VERCEL]**
- **Core**: Vanilla HTML5, CSS3 (CSS Variables for themes), ES6 JavaScript.
- **Assets**: SVG Icons (Phosphor/Heroicons style), `particles.js` (Hero background).
- **Analytics**: Google Analytics 4 (G-VG4XS3R5NV).
- **Routing**: Standard file-based routing (`/about.html`, `/projects/sample-cafe/`).

## 3. Architecture & File Structure

- **Root**: Landing page (`index.html`) + Core pages (`about`, `writing`, `framework`, `contact`).
- **`projects/`**: Self-contained sub-sites.
  - `projects/sample-cafe/`: Landing page demo.
  - `projects/p6-math-tuition/`: SME demo.
  - `projects/melvin/`: Personal branding demo.
- **`assets/`**: Shared CSS (`style.css`, `terminal.css`) and JS (`script.js`).

## 4. Content Strategy (The Three Pillars)

1. **AI Systems**: "The Brain" (e.g., Project Athena). High complexity, Python/RAG.
2. **SME Solutions**: "The Engine" (e.g., Brew & Bean). High ROI, lead-gen focused.
3. **Personal Branding**: "The Soul" (e.g., Melvin Lim). High trust, aesthetic.

## 5. Non-Goals (Anti-Scope)

- **No Complex Frameworks**: No React, Next.js, or Vue. Keep it "View Source" friendly.
- **No Backend**: No database. Contact forms use `mailto` or WhatsApp or Tally.
- **No CMS**: Content is Markdown (converted) or raw HTML.

## 6. Implementation Plan / Roadmap

- [x] **Phase 1: Foundation** (HTML/CSS Framework, Dark Mode)
- [x] **Phase 2: Content Migration** (Values, Framework, About)
- [x] **Phase 3: Demo Integration** (Brew & Bean, MathPro)
- [ ] **Phase 4: SEO Polish** (Sitemap automation, Structured Data for all sub-projects)
- [ ] **Phase 5: Performance Tuning** (WebP images, defer JS)
