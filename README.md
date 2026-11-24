# NovoStudio (100% Free & Unpaywalled Novorésumé Re-Engineered Clone)

A complete, production-ready, fully unpaywalled clone of [Novorésumé](https://novoresume.com), reverse-engineered down to its data schemas, column balancers, ATS parser rules, AI bullet refactor engines, and vector PDF generators.

---

## 🚀 Key Features

1. **All 16 Novorésumé Templates (100% Free)**:
   - **Free Tier Equivalents**: Basic, Creative, Modern, Executive, Simple, Functional, Professional, College.
   - **Unlocked Premium/Pro Tier**: Hybrid (Hero Banner), Minimalist (Pill tags), Traditional (Editorial serif), General (Top banner + right sidebar), IT Specialist (Categorized matrix), Tech Engineer (High-density code & GitHub focus), Skill-Based, Combined.
2. **Column & Side Balancer System**:
   - Asymmetric column ratio adjustments (`-5` to `+5`) for split-rail sidebars.
   - Symmetric column ratio adjustments (`-10` to `+10`) for 50/50 dual grids.
3. **SpaceOptimizer Engine**:
   - Single-click auto-compacting algorithm that intelligently balances margins, typography sizes, and line-spacings to guarantee 1-page fit without awkward page overflows.
4. **Local Applicant Tracking System (ATS) Scanner**:
   - 100% offline, client-side ATS scoring engine benchmarking against Taleo, Workday, and Greenhouse parser rules across 5 categories: Keywords & Relevance, Format & Structure, Section Organization, Technical Elements, and Content Quality.
5. **AI Career Assistant**:
   - Instant transformation of passive job descriptions into Google XYZ formula bullets: *"Accomplished [X] as measured by [Y], by doing [Z]"*.
   - Dynamic smart career summary generator based on existing work history and technical stacks.
6. **Direct High-Fidelity PDF File Download**:
   - Client-side A4 PDF compilation using `html-to-image` (SVG foreignObject rasterization) and `jsPDF`. Bypasses the browser's print dialog entirely to directly download crisp `.pdf` files to disk with full support for modern CSS colors.
7. **Native On-Canvas WYSIWYG Editing**:
   - Direct inline editing of candidate name, title, contact details, summaries, work positions, company names, bullet points, education, languages (with interactive dot ratings), and extra blocks with seamless real-time two-way synchronization to the sidebar.
8. **Client Persistence & Portability**:
   - 20-step undo/redo stack (`Ctrl+Z`, `Ctrl+Y`).
   - LocalStorage auto-save (`novostudio_resume_data_v1`).
   - Full JSON document import and export for infinite backups and resume cloning.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Google Web Fonts (`Ubuntu`, `Roboto`, `Montserrat`, `Merriweather`, `Nunito`, `Raleway`, `Open Sans`, `Overpass`, `Quicksand`, `Inter`)
- **State Management**: Zustand with history tracking and LocalStorage synchronization
- **Icons**: Lucide React + optimized SVG brand icons

---

## 📦 Getting Started

### Prerequisites
- Node.js v18+ (tested on Node.js v26.13)
- npm or pnpm

### Development Server
```bash
cd resume-builder
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```
The compiled output is located in `dist/`.
