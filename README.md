# Mattespace | Cinematic Real Estate Architecture

> A flagship, agency-quality real estate experience built to showcase architectural storytelling through a high-performance cinematic scroll engine.

![Mattespace Preview](/frames/21_final_hero_shot_twin_towers/frame_1500.jpg)

## 📌 Overview

Mattespace is an open-source portfolio piece demonstrating a premium, high-end web experience for luxury real estate. Inspired by Apple's product pages and top-tier architectural firms, the site abandons traditional static images in favor of a **1,500+ frame cinematic sequence** controlled entirely by the user's scroll.

The project blends modern frontend performance techniques with a restrained, editorial design system focused on typography, glassmorphism, and physical materials (frosted glass, matte ceramic).

## ✨ Key Features

### 🎬 Cinematic GSAP Scroll Engine
- **1,572 High-Resolution Frames**: A 600vh+ scrubbable `<canvas>` sequence divided into 21 distinct architectural shots.
- **Weighted Timeline Engine**: Scroll position is never mapped directly to frames. Each shot has an independent "scroll weight", "easing", and "resistance", making certain cinematic moments feel heavy and suspended, while lifestyle montages fly by rapidly.
- **Lenis Smooth Scroll**: Configured with a heavy "camera dolly" feel (`wheelMultiplier: 0.35`, `lerp: 0.06`) so the experience cannot be accidentally rushed or skipped.

### 💎 Editorial Design System
- **Floating Caption Rail**: A Vision Pro-inspired translucent architectural annotation strip that intelligently repositions and changes theme (dark/light) based on the underlying video brightness.
- **Ceramic Palette & Glassmorphism**: Utilizes a muted `#F5F7F8` ceramic base, accented by varying degrees of backdrop blurs and subtle 1px borders.
- **Typography**: Pairs the elegant `Playfair Display` (serif) with the modern `Geist` (sans-serif) for an editorial hierarchy.
- **Micro-Interactions**: Features a custom magnetic lerp cursor, IntersectionObserver clip-path reveals, and GSAP magnetic buttons.

## 🛠 Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS (Native utility classes)
- **Animation**: GSAP + ScrollTrigger
- **Scroll Hijacking**: Lenis (Studio Freight)
- **Icons**: Lucide React
- **Assets**: HTML5 Canvas (for frame rendering) + MP4 Fallback (for mobile)

## 🚀 Run Locally

To view the cinematic experience on your local machine:

1. **Clone the repository**
   ```bash
   git clone git@github.com:jvstin47/Mattespace-realestate-Webdesign.git
   cd "Mattespace realestate frame. seq webdesign"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` (or the port provided by Vite) in your browser.

## 🏗 Build for Production

```bash
npm run build
```
The project utilizes a custom progressive preloader script (`framePreloader.js`) that caches keyframes to ensure instant scrubbing upon load, resulting in a highly optimized production bundle.

---

*Designed and developed as an exploration into luxury digital architecture and high-performance scroll storytelling.*

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
