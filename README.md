# Mattespace | Cinematic Real Estate Architecture

> A flagship, agency-quality real estate experience built to showcase architectural storytelling through a high-performance cinematic scroll engine.

![Mattespace Preview](/frames/21_final_hero_shot_twin_towers/frame_1500.jpg)

## 🎬 Creative Philosophy

> **"The visitor controls when the story advances. Mattespace controls how the story is experienced."**

The hero section is **not a website banner** and **not a scroll-controlled video scrubber**. It is an **interactive architectural short film**. A scroll gesture acts purely as a *"continue"* trigger to advance to the next directed scene at native 60fps pacing, rewarding patience with beautifully directed cinematography.

## 📌 Overview

Mattespace is an open-source portfolio piece demonstrating a flagship web experience for luxury real estate. Inspired by Apple launch pages, Aman Resorts, and Foster + Partners, the site uses a **1,500+ frame canvas sequence** structured into 14 distinct cinematic chapters.

The project combines a native 60fps playback engine with a restrained, editorial design system focused on Playfair Display serif typography, glassmorphism, and physical material textures (frosted glass, matte ceramic, ash wood).

## ✨ Key Features

### 🎬 14-Chapter Interactive Short Film Engine
- **1,572 High-Resolution Frames**: Divided into 21 physical shot folders rendered on an HTML5 `<canvas>` with DPR scaling.
- **Triggered 60fps Scene Playback**: Scrolling does not scrub frames—it triggers native 60fps playback for the next chapter. Frantic scroll input is buffered/ignored until the chapter completes.
- **Pacing & Speed Multipliers**: Each chapter has customized pacing, including a fast `1.85x` drive multiplier for the luxury car sequence.
- **Lenis Scroll Lock**: Locks page scroll until Chapter 14 (*Final Crown & Brand Reveal*) finishes, seamlessly releasing into the rest of the website.

### 💎 Editorial Design System & Typography
- **Playfair Display Luxury Headlines**: Elegant serif display typography (`Playfair Display` italic) for headlines, elevating the tone to an architectural exhibition.
- **Dynamic Floating Chapter Cards**: Vision Pro-inspired frosted capsules (`backdrop-blur-3xl`) with dynamic progress indicators (`CHAPTER 02 / 14`), pulsing accent bars, and smooth spring reveals (`scale + blur`).
- **Ceramic Palette & Uniform Rounding**: Standardized `rounded-3xl` (24px) corner radius across all section cards.
- **Adaptive Morphing Navbar**: Dark frosted pill over the hero video, morphing into a ceramic glass pill over light body sections.

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
