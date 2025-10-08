# Cloud-Web — Tabs & HTML Generator (Next.js)

**Cloud-Web** is a small Next.js app built for an assignment that demonstrates a UI for creating tabbed content and generating a self-contained HTML+JS file (inline CSS only) that can be copied and opened as a standalone `hello.html`.

---

## Features

- Global layout with header/footer and hamburger navigation  
- Dark / Light theme toggle (persists via `localStorage`)  
- About page with embedded demo video and student info  
- **Home** — Tabs Generator:
  - Add / remove / rename up to **15 tabs**
  - Edit content for each tab (simple textarea)
  - All tab data persisted to `localStorage`
  - Live **generated HTML + JS** (inline styles) that can be copied and run as a standalone file
  - “Copy Code” button with user feedback

---

## Tech stack

- Next.js (App Router) + React (TypeScript)
- Plain CSS variables used for theming (no external CSS frameworks required)
- No server — all client-side for the interactive parts

---

## Quick start (development)

```bash
# install deps
npm install

# run dev server
npm run dev

# open http://localhost:3000
