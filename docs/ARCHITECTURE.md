# Mattespace Residences — Technical Architecture & Codebase Guide

> **"The visitor controls when the story advances. Mattespace controls how the story is experienced."**

---

## 🏛️ System Overview

Mattespace Residences is built as an **interactive architectural short film**. Rather than treating the landing page as a conventional marketing scrub-bar, the application runs a custom 60fps canvas animation engine that advances through 14 carefully directed cinematic chapters.

```
┌──────────────────────────────────────────────────────────┐
│                      App Root                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │                 ErrorBoundary                      │  │
│  │  ┌──────────────────────────────────────────────┐  │  │
│  │  │            ExperienceProvider                │  │  │
│  │  │  ┌────────────────────────────────────────┐  │  │  │
│  │  │  │             ToastProvider              │  │  │  │
│  │  │  │  ┌──────────────────────────────────┐  │  │  │  │
│  │  │  │  │          MainExperience          │  │  │  │  │
│  │  │  │  │  • Preloader                     │  │  │  │  │
│  │  │  │  │  • Navbar                        │  │  │  │  │
│  │  │  │  │  • ScrollHero (60fps Canvas)     │  │  │  │  │
│  │  │  │  │  • Amenities                     │  │  │  │  │
│  │  │  │  │  • Residences                    │  │  │  │  │
│  │  │  │  │  • Gallery (with Lightbox)       │  │  │  │  │
│  │  │  │  │  • Contact (Inquiry API)         │  │  │  │  │
│  │  │  │  │  • Footer                        │  │  │  │  │
│  │  │  │  │  • ToastContainer                │  │  │  │  │
│  │  │  │  └──────────────────────────────────┘  │  │  │  │
│  │  │  └────────────────────────────────────────┘  │  │  │
│  │  └──────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## 📁 Clean Folder Structure

```
src/
├── api/                        # Scalable API communication layer
│   ├── client.js               # Unified fetch client with timeout & ApiError
│   ├── endpoints.js            # Centralized API endpoint routes
│   ├── index.js                # Public API export barrier
│   └── services/
│       └── inquiryService.js   # Inquiry validation & mock/live submission
│
├── config/                     # Configuration & global constants
│   ├── constants.js            # Engine timings, site metadata, rail positions
│   └── env.js                  # Validated environment variable schema
│
├── context/                    # Centralized state management
│   ├── ExperienceContext.jsx   # Story progression & scroll-lock state
│   └── ToastContext.jsx        # User feedback & notification bus
│
├── hooks/                      # Decoupled business logic
│   ├── index.js                # Public hooks barrel export
│   ├── useBodyScrollLock.js    # Modal & drawer background scroll prevention
│   ├── useHeroPlayback.js      # 60fps canvas engine, intent queue & RAF loop
│   ├── useInquiryForm.js       # Field validation, state & submission
│   ├── useIntersectionReveal.js# Reusable viewport reveal observer
│   ├── useLightbox.js          # Modal keyboard navigation & circular wrapping
│   └── useMagneticEffect.js    # Inertia-driven magnetic hover effect
│
├── components/                 # Modular presentation components
│   ├── index.js                # Component library barrel export
│   ├── common/
│   │   ├── ErrorBoundary.jsx   # Architectural crash recovery UI
│   │   └── ToastContainer.jsx  # Floating notification stack
│   ├── layout/
│   │   ├── Navbar.jsx          # Morphing frosted pill with reset & WhatsApp
│   │   └── Footer.jsx          # Regulatory disclosures & secondary links
│   ├── hero/
│   │   ├── BrandFinale.jsx     # Chapter 14 finale reveal
│   │   ├── ChapterCard.jsx     # Floating editorial caption card
│   │   ├── MobileHero.jsx      # Lightweight mobile video fallback
│   │   ├── ScrollHero.jsx      # Hero container orchestrator
│   │   └── ScrollIndicator.jsx # Initial gesture prompt
│   ├── sections/
│   │   ├── Amenities.jsx       # Curated lifestyle spaces showcase
│   │   ├── Contact.jsx         # Private presentation request form
│   │   ├── Gallery.jsx         # Architectural photography & lightbox
│   │   └── Residences.jsx      # Specification cards & dual perspectives
│   └── ui/
│       ├── CustomCursor.jsx    # Physics-based custom cursor lens
│       └── Preloader.jsx       # Asset gating & progress bar
│
├── data/
│   └── framesManifest.js       # 1,572 WebP frame directory mapping & 14 chapters
│
├── utils/
│   └── framePreloader.js       # Dual-pass keyframe caching & watchdog timeout
│
├── index.css                   # Custom utility classes, glassmorphism, animations
├── main.jsx                    # React 18 DOM mount
└── App.jsx                     # Application root assembler
```

---

## ⚙️ Environment Variables

All variables are isolated in `.env.example` and accessed via `src/config/env.js`:

| Variable | Default | Purpose |
|---|---|---|
| `VITE_APP_NAME` | `"Mattespace"` | Brand identity |
| `VITE_APP_TAGLINE` | `"Architecture Designed Around Light"` | Tagline across cards & footer |
| `VITE_WHATSAPP_PHONE` | `"1234567890"` | Concierge WhatsApp contact number |
| `VITE_WHATSAPP_DEFAULT_MESSAGE` | `"Hello, I am interested..."` | Pre-filled inquiry text |
| `VITE_API_BASE_URL` | `"/api/v1"` | Backend API base path |
| `VITE_API_TIMEOUT_MS` | `10000` | HTTP request timeout in milliseconds |
| `VITE_ENABLE_MOCK_API` | `true` | Enables mock adapter when disconnected |
| `VITE_HERO_HOLD_DURATION_MS` | `450` | Post-chapter mandatory hold duration |
| `VITE_HERO_MIN_PLAYBACK_MS` | `400` | Minimum chapter animation playback floor |

---

## 🎬 Hero Playback Engine Architecture

The playback engine is abstracted into `useHeroPlayback.js`. It strictly enforces the Creative Direction directive:

1. **Native Frame Rate**: The RAF loop uses time-delta calculation (`FRAME_DURATION / speed`) and advances exactly **one frame per tick interval**, ensuring high-Hz (120Hz/144Hz) monitors never skip frames.
2. **Intent Queueing**: Rapid trackpad flings while a chapter is playing or holding are not discarded; the latest intent is recorded in `pendingDirection` and automatically executed once the hold ends, capped to one chapter step.
3. **Boundary Snapping**: When advancing or reversing, `currentFrame` snaps cleanly to chapter start/end frames to prevent gap-frame flickers.
4. **Scroll Lock Integration**: Lenis is stopped while navigating the 14 chapters. Once Chapter 14 completes forward, Lenis is unlocked for standard page browsing. Scrolling back up into the hero smoothly re-locks the engine and plays backwards.

---

## 📡 Scalable API & Form Architecture

The inquiry submission layer is decoupled from UI:

```
Contact.jsx (UI)
      ↓
useInquiryForm.js (State & Validation)
      ↓
inquiryService.js (Domain Logic & Validation Schema)
      ↓
client.js (HTTP Client / Timeout / ApiError)
      ↓
Backend API / Mock Adapter
```

- **Validation**: Regex-backed client validation checks name length, email format, phone digits (8–15), and residence selection.
- **Mock Adapter**: When `VITE_ENABLE_MOCK_API=true`, the service simulates network delay (600ms) and generates a unique confirmation code (`MAT-2025-XXXXXX`).
- **Error Handling**: Uses structured `ApiError` instances with HTTP status codes and user-friendly fallback messaging.
- **Toast Feedback**: Success and failure states trigger toasts via `useToast()`.

---

## 🛡️ Error Handling & Resilience

- **ErrorBoundary**: Top-level and section-level catchers present a ceramic-styled fallback with a "Reload Experience" button and technical details in development.
- **Preloader Watchdog**: `framePreloader.js` incorporates a 7.5-second watchdog timer ensuring users are never indefinitely blocked if a network connection stalls.
- **Body Scroll Lock**: Modals and drawer menus preserve original overflow styles upon unmount, preventing frozen page scroll.
