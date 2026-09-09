# ✦ Romero Alejandro — Portfolio

> **UX Designer & Systems Engineer** · Japan  
> From interactive UX architectures and pure-Rust AI agent memory to low-RAM LLM inference runtimes and autonomous robotics platforms.

---

## 🚀 Overview

This repository houses the source code for my personal engineering & design portfolio. Built with a focus on typography, fluid animations, dynamic theming, and bilingual localization (English & Japanese).

### 🛠️ Built With
- **Language**: TypeScript (100% strict type safety)
- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animations & Interaction**: GSAP (ScrollTrigger), Lenis Smooth Scroll, Three.js (Aurora Shaders)
- **Routing**: React Router (HashRouter for seamless static & GitHub Pages deployment)
- **Build Optimization**: Inlined single-file asset bundling via `vite-plugin-singlefile`

---

## 🌟 Flagship Projects Showcased

1. **[Cynapse](https://github.com/Alartist40/cynapse.git)** — High-performance, offline-first AI agent platform in 100% pure Rust. Features the 4-tier Dendrite SQLite FTS5 graph memory, Leafcutter tensor execution core, 3D Orbital Galaxy Atlas, and interactive retro TUI harness.
2. **[LeafcutterLLM](https://github.com/Alartist40/LeafcutterLLM.git)** — Memory-first adaptive LLM runtime in 100% Rust. Runs 1.5B–70B models on low RAM via 3-tier streaming execution, hardware auto-speccing, SIMD kernels, and OpenAI-compatible REST server.
3. **[Paraclea](https://github.com/Alartist40/paraclea.git)** — Pure Rust offline AI companion and intelligent librarian engine. Features personalized Dendrite v2 graph memory, 219 Bible translations across 30 languages (all 66 books), 211-chapter offline library, and Reticulum LoRa mesh.
4. **[The Pathfinder Eye](https://github.com/Alartist40/the-pathfinder-eye)** — Autonomous robotics platform with native Go/Rust brain, omnidirectional mecanum wheels, face recognition security authority, and 30fps YOLO vision.

---

## 💻 Development & Build

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
npm install
```

### Run Locally (Dev Server)
```bash
npm run dev
# Open http://localhost:3000
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
# Open http://localhost:4173
```

---

## 🌐 GitHub Pages Deployment

This project uses an automated GitHub Actions workflow (`.github/workflows/deploy.yml`) to build and deploy to GitHub Pages on every push to `main`.

---

## 📄 License

MIT License © 2026 Romero Alejandro
