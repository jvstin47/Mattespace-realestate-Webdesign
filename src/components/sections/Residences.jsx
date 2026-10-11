/**
 * Residences Section Component
 *
 * Showcases architectural specifications, spatial geometry, and facade textures.
 * Uses the decoupled useIntersectionReveal hook for scroll transitions.
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useIntersectionReveal } from '../../hooks';

const RESIDENCE_SPECS = [
  { label: 'Ceiling Height', value: "11' – 14'" },
  { label: 'Finishes', value: 'Matte Bronze & Ash' },
  { label: 'Smart Integration', value: 'Invisible Tech Suite' },
  { label: 'Orientation', value: 'East & West Panoramic' },
];

export default function Residences() {
  const sectionRef = useIntersectionReveal({ threshold: 0.1 });

  return (
    <section
      id="residences"
      ref={sectionRef}
      className="py-section px-margin-mobile md:px-margin-desktop bg-ceramic-200"
    >
      <div className="max-w-container mx-auto">
        {/* Section Header */}
        <header className="mb-12">
          <span className="text-label-sm text-accent uppercase tracking-widest mb-4 block text-reveal">
            The Collection
          </span>
          <h2 className="font-display text-headline-lg md:text-display-md text-slate-800 text-reveal">
            Structural Elegance
          </h2>
          <p className="font-body text-body-lg text-slate-500 max-w-2xl mt-6 text-reveal">
            Material honesty meets spatial purity in environments designed to elevate
            the everyday into the extraordinary.
          </p>
        </header>

        {/* Hero Architectural Showcase */}
        <div className="relative">
          <div className="w-full h-[75vh] rounded-3xl overflow-hidden clip-reveal relative">
            <img
              src="/frames/03_exterior_building_facade/frame_0450.webp"
              alt="Exterior Building Facade"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Floating Specifications Glass Card */}
          <div className="relative -mt-24 md:-mt-32 z-10 md:ml-auto md:max-w-lg">
            <div className="glass-card p-10 md:p-12 rounded-3xl text-reveal shadow-2xl">
              <h3 className="font-display text-headline-md text-slate-800 mb-8 leading-snug">
                Floor-to-ceiling glass invites the horizon inside.
              </h3>

              <dl className="flex flex-col space-y-4">
                {RESIDENCE_SPECS.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between items-center py-3 border-b border-[rgba(90,105,120,0.12)]"
                  >
                    <dt className="font-body text-body-md text-slate-500">
                      {spec.label}
                    </dt>
                    <dd className="font-body text-label-md text-slate-800 font-medium">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center text-accent hover:text-accent-hover text-label-md transition-colors group"
                >
                  <span>Request Plans</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Dual Column Perspective */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden clip-reveal aspect-[3/4]">
            <img
              src="/frames/19_twin_towers_sunset/frame_1320.webp"
              alt="Twin Towers Sunset"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="rounded-3xl overflow-hidden clip-reveal aspect-[3/4] md:mt-16">
            <img
              src="/frames/05_building_facade_dusk_night/frame_0840.webp"
              alt="Building Facade Dusk"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
