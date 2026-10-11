/**
 * Amenities Section Component
 *
 * Showcases curated lifestyle spaces with scroll-triggered clip and text reveals.
 * Leverages the useIntersectionReveal hook to decouple observer logic from UI rendering.
 */

import React from 'react';
import { useIntersectionReveal } from '../../hooks';

const AMENITY_ITEMS = [
  {
    id: 'infinity-edge',
    title: 'The Infinity Edge',
    subtitle: 'Experience seamless views where water meets the horizon.',
    image: '/frames/01_aerial_rooftop_pool/frame_0080.webp',
  },
  {
    id: 'zenith-gardens',
    title: 'Zenith Gardens',
    description:
      'Wander through lush, curated botanical archways. A sanctuary of greenery that calms the mind and invigorates the senses, right outside your door.',
    image: '/frames/07_green_floral_archway/frame_1005.webp',
  },
  {
    id: 'twilight-terrace',
    title: 'Twilight Terrace',
    subtitle: 'Dine under the stars in an elegantly appointed outdoor sanctuary.',
    image: '/frames/04_outdoor_restaurant_terrace/frame_0640.webp',
  },
  {
    id: 'zen-sanctuary',
    title: 'Zen Sanctuary',
    description:
      'Find your center in a space dedicated to mindfulness. With carefully arranged stones and a serene atmosphere, it is the perfect place to meditate and reflect.',
    image: '/frames/13_buddha_statue_zen_garden/frame_1205.webp',
  },
];

export default function Amenities() {
  const containerRef = useIntersectionReveal();

  return (
    <section
      id="amenities"
      ref={containerRef}
      className="py-section-mobile md:py-section px-margin-mobile md:px-margin-desktop bg-ceramic"
    >
      <div className="max-w-container mx-auto">
        {/* Section Header */}
        <header className="mb-24">
          <div className="text-label-sm text-accent uppercase tracking-widest mb-4">
            Curated Spaces
          </div>
          <h2 className="font-display text-headline-lg md:text-display-md text-slate-800">
            Designed for Reflection, Gathering, and Rejuvenation.
          </h2>
          <p className="font-body text-body-lg text-slate-500 max-w-2xl mt-6">
            Every corner of Mattespace is an invitation to pause, breathe, and
            immerse yourself in an atmosphere of tranquility. Discover spaces
            tailored to your everyday well-being.
          </p>
        </header>

        {/* 1. Infinity Pool */}
        <div className="relative mb-32 md:mb-40 h-[70vh] w-full rounded-3xl overflow-hidden clip-reveal group">
          <img
            src={AMENITY_ITEMS[0].image}
            alt={AMENITY_ITEMS[0].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 p-8 rounded-3xl glass-dark md:w-[400px]">
            <h3 className="font-display text-headline-md text-white mb-2">
              {AMENITY_ITEMS[0].title}
            </h3>
            <p className="font-body text-body-md text-white/80">
              {AMENITY_ITEMS[0].subtitle}
            </p>
          </div>
        </div>

        {/* 2. Botanical Gardens */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center mb-32 md:mb-40">
          <div className="md:col-span-5 text-reveal">
            <h3 className="font-display text-headline-lg text-slate-800 mb-6">
              {AMENITY_ITEMS[1].title}
            </h3>
            <p className="font-body text-body-md text-slate-500">
              {AMENITY_ITEMS[1].description}
            </p>
          </div>
          <div className="md:col-span-7 h-[60vh] rounded-3xl overflow-hidden clip-reveal group">
            <img
              src={AMENITY_ITEMS[1].image}
              alt={AMENITY_ITEMS[1].title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* 3. Dining Terrace */}
        <div className="relative mb-32 md:mb-40 h-[70vh] w-full rounded-3xl overflow-hidden clip-reveal group">
          <img
            src={AMENITY_ITEMS[2].image}
            alt={AMENITY_ITEMS[2].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-8 right-8 md:top-12 md:right-12 p-8 rounded-3xl glass-dark md:w-[400px]">
            <h3 className="font-display text-headline-md text-white mb-2">
              {AMENITY_ITEMS[2].title}
            </h3>
            <p className="font-body text-body-md text-white/80">
              {AMENITY_ITEMS[2].subtitle}
            </p>
          </div>
        </div>

        {/* 4. Zen Sanctuary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center mb-32 md:mb-40">
          <div className="md:col-span-7 order-2 md:order-1 h-[60vh] rounded-3xl overflow-hidden clip-reveal group">
            <img
              src={AMENITY_ITEMS[3].image}
              alt={AMENITY_ITEMS[3].title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-5 order-1 md:order-2 text-reveal">
            <h3 className="font-display text-headline-lg text-slate-800 mb-6">
              {AMENITY_ITEMS[3].title}
            </h3>
            <p className="font-body text-body-md text-slate-500">
              {AMENITY_ITEMS[3].description}
            </p>
          </div>
        </div>

        {/* 5. Wellness Duet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[50vh] rounded-3xl overflow-hidden clip-reveal group">
            <img
              src="/frames/15_indoor_gym_fitness/frame_1227.webp"
              alt="Fitness Studio"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-6 left-6 py-2 px-4 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-white font-body text-label-sm">
              Fitness Studio
            </div>
          </div>
          <div className="relative h-[50vh] rounded-3xl overflow-hidden clip-reveal group">
            <img
              src="/frames/11_basketball_court/frame_1175.webp"
              alt="Sports Courts"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-6 left-6 py-2 px-4 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-white font-body text-label-sm">
              Sports Courts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
