# Project Name: Portfolio V2.1 (The Systems Architect)

> **One-Liner**: A high-performance, static portfolio that positions Winston Koh as a "Systems Architect" (Logic > UI).
> **Target Audience**: High-value clients, technical recruiters, and "Arena" players.
> **Success Metric**: Inbound leads (WhatsApp for SME, Email/Form for Enterprise) and "Trust" signals.

## 1. The Core Loop (Refined)

1. **Hook**: `index.html` Hero ("Bridging business logic with technical execution").
2. **Proof Strip**: Immediate "Featured Systems" row above the fold (Athena, Brew, Melvin).
3. **Deep Dive**: `portfolio.html` with explicit "System Diagrams" (Mermaid/SVG) for case studies.
4. **Conversion**: **Contextual CTA**.
   - **SME**: Floating WhatsApp ("Reply in <24h").
   - **Enterprise**: "Initialize Project" (Tally/Email).

## 2. Technical Stack (Constraints)

*Hard constraints. No "nice to haves".*

- **Host**: GitHub Pages. **[NO VERCEL]**
- **Core**: Vanilla HTML5, CSS3, ES6.
- **Aesthetics**: **NO PARTICLES.JS**. Use Technical CSS Grid / SVG Background. "Engineer" vibe, not "Gamer".
- **Build**: Simple Python script (`build.py`) for component stamping (Header/Footer) to avoid "Nav Hell".

## 3. Architecture & File Structure

- **Root**: `index.html` (Hook + Proof), `portfolio.html` (Gallery).
- **`projects/`**: Self-contained sub-sites.
- **`assets/`**: Shared Design System.

## 4. Content Strategy (The Three Pillars)

1. **AI Systems** (Athena): Show the *Terminal*, not just the Code. Video Walkthroughs.
2. **SME Solutions** (Brew & Bean): Show the *Dashboard/ROI*, not just the Landing Page.
3. **Personal Branding** (Melvin): Show the *Narrative*.

## 5. Implementation Roadmap (V2.1)

- [ ] **Phase 1: Visual Overhaul** (Kill Particles, Add Grid BG, Update Hero Copy).
- [ ] **Phase 2: The Proof Strip** (Add Featured Section to Home).
- [ ] **Phase 3: Contextual CTAs** (Split WhatsApp vs Email).
- [ ] **Phase 4: Architecture Diagrams** (Add SVG flows to Case Studies).
- [ ] **Phase 5: Tooling** (Create `build.py` for hydration).
