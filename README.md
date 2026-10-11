# Mattespace | Cinematic Real Estate Architecture

> A flagship, agency-quality real estate experience built to showcase architectural storytelling through a high-performance cinematic scroll engine.

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-mattespace--realestate--webdesign.vercel.app-5D7897?style=for-the-badge&logo=vercel)](https://mattespace-realestate-webdesign.vercel.app)
[![Architecture Docs](https://img.shields.io/badge/DOCS-ARCHITECTURE.md-1C2733?style=for-the-badge)](docs/ARCHITECTURE.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

![Mattespace Preview](/public/frames/21_final_hero_shot_twin_towers/frame_1500.webp)

### 🌐 Experience It Live
> **[Try the Interactive Short Film Live on Vercel ➔](https://mattespace-realestate-webdesign.vercel.app)**
>
> *Scroll down to trigger each of the 14 directed cinematic chapters. Experience how native 60fps pacing and frosted glass typography transform web navigation into an architectural film.*

---

## 🎬 Creative Philosophy

> **"The visitor controls when the story advances. Mattespace controls how the story is experienced."**

The hero section is **not a website banner** and **not a scroll-controlled video scrubber**. It is an **interactive architectural short film**. A scroll gesture acts purely as a *"continue"* trigger to advance to the next directed scene at native 60fps pacing, rewarding patience with beautifully directed cinematography.

---

## 🏛️ Architecture & Folder Structure

The project follows a clean, scalable architectural pattern separating business logic, state management, API services, and UI presentation:

```
src/
├── api/                        # HTTP client, endpoints, and mock inquiry service
├── config/                     # Validated environment variables and timing constants
├── context/                    # ExperienceContext and ToastContext state management
├── hooks/                      # Custom hooks (playback engine, forms, observers, lightbox)
├── components/
│   ├── common/                 # ErrorBoundary, ToastContainer
│   ├── layout/                 # Navbar, Footer
│   ├── hero/                   # ScrollHero, ChapterCard, BrandFinale, MobileHero
│   ├── sections/               # Amenities, Residences, Gallery, Contact
│   └── ui/                     # Preloader, CustomCursor
├── data/                       # Frame manifests & chapter specifications
└── utils/                      # Frame preloading service & image caching
```

For in-depth architectural details, state lifecycle, and engine mechanics, consult [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## ✨ Key Features

### 🎬 14-Chapter Interactive Short Film Engine
- **1,572 WebP Frames**: Divided into 21 physical shot folders rendered on an HTML5 `<canvas>` with DPR scaling.
- **Triggered 60fps Scene Playback**: Scrolling triggers native 60fps playback. Continuous flings are captured via a single-step intent queue rather than dropped or skipped.
- **Pacing & Speed Multipliers**: Each chapter has customized pacing, including a fast `1.85x` drive multiplier for the luxury car sequence.
- **Lenis Scroll Lock**: Locks page scroll until Chapter 14 (*Final Crown & Brand Reveal*) finishes, seamlessly releasing into the rest of the website.
- **Bidirectional Navigation**: Scrolling up plays active scenes backward into previous chapters.

### 💎 Editorial Design System & Typography
- **Playfair Display Luxury Headlines**: Elegant serif display typography (`Playfair Display` italic) for headlines, elevating the tone to an architectural exhibition.
- **Dynamic Floating Chapter Cards**: Vision Pro-inspired frosted capsules (`backdrop-blur-3xl`) with dynamic progress indicators (`CHAPTER 02 / 14`), pulsing accent bars, and smooth spring reveals.
- **Ceramic Palette & Uniform Rounding**: Standardized `rounded-3xl` (24px) corner radius across all section cards.
- **Adaptive Morphing Navbar**: Dark frosted pill over the hero video, morphing into a ceramic glass pill over light body sections.

### 📡 Scalable API & State Management
- **Inquiry Service with Mock Adapter**: Private presentation booking form with real-time validation and simulated response codes (`MAT-2025-XXXXXX`) when disconnected.
- **Toast Feedback Stack**: Accessible floating notifications for form submissions and system notices.
- **Runtime Error Boundary**: Top-level and section-level recovery UI with diagnostic logs in development.

---

## 🛠 Tech Stack

- **Framework**: React 18 + Vite 5
- **Styling**: Tailwind CSS
- **Animation**: GSAP + Custom RAF Engine
- **Scroll Handling**: Lenis (Studio Freight)
- **Icons**: Lucide React
- **Assets**: HTML5 Canvas (WebP frames) + MP4 Fallback (mobile)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone git@github.com:jvstin47/Mattespace-realestate-Webdesign.git
cd "Mattespace realestate frame. seq webdesign"
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` to customize settings:
```bash
cp .env.example .env.local
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the development server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🏗 Build for Production

```bash
npm run build
```

Previews the production build locally:
```bash
npm run preview
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
