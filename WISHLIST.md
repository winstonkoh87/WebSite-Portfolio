# Portfolio V2.3 Wishlist (Tech Debt)

Items to address in future iterations:

## High Priority

- [ ] **Multi-pillar Proof Strip**: Add metrics for Brew & Bean and Melvin alongside Athena
  - Brew: Conversion rate, WhatsApp click-through
  - Melvin: Lighthouse score, accessibility score, time on page
  
- [ ] **Trust Signals Instrumentation**: Add GA4 event tracking
  - Scroll depth events (50%, 90%)
  - CTA click events (View System, Explore codebase, See what it does)
  - Engaged time on Athena page

- [ ] **Melvin Reframe**: Position as "Trust Architecture" instead of "Personal Branding"
  - Add metrics: Time to Contact, Scroll Depth

## Medium Priority

- [ ] **Local-First Data Boundary Block**: Add to athena.html
  - What stays local
  - What can leave device
  - How secrets are stored
  - What logs contain

- [ ] **About Page "My Stack" Section**:
  - Tools I use
  - Tools I refuse to use (and why)

- [ ] **Proof Strip Tooltip**: Add asterisk to "~1.2s query" explaining context
  - "*Average RAG retrieval latency"

## Low Priority (Polish)

- [ ] **Mobile Mermaid Fallback**: On small screens, show simplified vertical list instead of flowchart

- [ ] **Mermaid Lazy Loading**: Only load on pages that need it (athena.html)

- [ ] **Particles.js Device Detection**: Disable on low-power devices

- [ ] **Tally Form Budget Capture**: Add "Budget Range" field early to filter leads
