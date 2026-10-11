/**
 * Gallery Section Component
 *
 * Visual narrative masonry grid with accessible full-screen lightbox.
 * Uses the decoupled useLightbox controller hook.
 */

import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLightbox } from '../../hooks';

const GALLERY_IMAGES = [
  {
    src: '/frames/19_twin_towers_sunset/frame_1320.webp',
    title: 'Sunset Silhouette',
    category: 'Exterior · Golden Hour',
  },
  {
    src: '/frames/01_aerial_rooftop_pool/frame_0080.webp',
    title: 'Infinity Edge',
    category: 'Amenities · Afternoon',
  },
  {
    src: '/frames/02_blue_luxury_car/frame_0260.webp',
    title: 'Grand Arrival',
    category: 'Porte-Cochère · Morning',
  },
  {
    src: '/frames/05_building_facade_dusk_night/frame_0840.webp',
    title: 'Nightfall',
    category: 'Architecture · Dusk',
  },
  {
    src: '/frames/04_outdoor_restaurant_terrace/frame_0640.webp',
    title: 'Twilight Dining',
    category: 'Lifestyle · Evening',
  },
  {
    src: '/frames/08_aerial_garden_plaza_fountains/frame_1050.webp',
    title: 'Reflecting Pools',
    category: 'Landscape · Midday',
  },
  {
    src: '/frames/09_aerial_amphitheater_garden/frame_1100.webp',
    title: 'Amphitheater',
    category: 'Landscape · Afternoon',
  },
  {
    src: '/frames/13_buddha_statue_zen_garden/frame_1205.webp',
    title: 'Zen Garden',
    category: 'Wellness · Morning',
  },
  {
    src: '/frames/21_final_hero_shot_twin_towers/frame_1520.webp',
    title: 'Twin Towers',
    category: 'Hero · Sunset',
  },
];

export default function Gallery() {
  const { isOpen, selectedIndex, open, close, next, prev } = useLightbox(
    GALLERY_IMAGES.length
  );

  return (
    <section
      id="gallery"
      className="py-section px-margin-mobile md:px-margin-desktop bg-ceramic"
    >
      <div className="max-w-container mx-auto">
        <header className="text-center mb-24">
          <span className="text-label-sm text-accent uppercase tracking-widest mb-4 block">
            Visual Narrative
          </span>
          <h2 className="font-display text-headline-lg md:text-display-md text-slate-800">
            The Experience
          </h2>
        </header>

        {/* Responsive Masonry / Column Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((image, idx) => (
            <div
              key={image.src}
              className="break-inside-avoid relative group overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => open(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  open(idx);
                }
              }}
              aria-label={`Open photo: ${image.title}`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-900/25 group-hover:bg-slate-900/40 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <h4 className="font-display text-headline-sm text-white mb-1">
                  {image.title}
                </h4>
                <p className="text-label-xs text-white/70 uppercase tracking-widest">
                  {image.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
          className="fixed inset-0 z-[70] bg-slate-900/95 backdrop-blur-2xl flex flex-col justify-center items-center"
          onClick={close}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
            onClick={close}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Left Arrow */}
          <button
            className="absolute left-6 md:left-12 p-3 text-white/70 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Right Arrow */}
          <button
            className="absolute right-6 md:right-12 p-3 text-white/70 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Active Image Stage */}
          <div
            className="relative px-12 md:px-24 flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_IMAGES[selectedIndex].src}
              alt={GALLERY_IMAGES[selectedIndex].title}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-6 text-center">
              <h3 className="font-display text-headline-sm md:text-headline-md text-white">
                {GALLERY_IMAGES[selectedIndex].title}
              </h3>
              <p className="mt-2 text-label-sm text-white/70 uppercase tracking-widest">
                {GALLERY_IMAGES[selectedIndex].category}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
