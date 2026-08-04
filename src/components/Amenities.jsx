import React, { useEffect, useRef } from 'react';

const Amenities = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

    const elements = containerRef.current.querySelectorAll('.clip-reveal, .text-reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section id="amenities" className="py-section-mobile md:py-section px-margin-mobile md:px-margin-desktop bg-ceramic" ref={containerRef}>
      <div className="max-w-container mx-auto">
        <header className="mb-24">
          <div className="text-label-sm text-accent uppercase tracking-widest mb-4">Curated Spaces</div>
          <h2 className="font-display text-headline-lg md:text-display-md text-slate-800">
            Designed for Reflection, Gathering, and Rejuvenation.
          </h2>
          <p className="font-body text-body-lg text-slate-500 max-w-2xl mt-6">
            Every corner of Mattespace is an invitation to pause, breathe, and immerse yourself in an atmosphere of tranquility. Discover spaces tailored to your everyday well-being.
          </p>
        </header>

        {/* 1. INFINITY POOL */}
        <div className="relative mb-32 md:mb-40 h-[70vh] w-full rounded-2xl overflow-hidden clip-reveal group">
          <img 
            src="/frames/01_aerial_rooftop_pool/frame_0080.jpg" 
            alt="The Infinity Edge" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 p-8 rounded-2xl glass-dark md:w-[400px]">
            <h3 className="font-display text-headline-md text-white mb-2">The Infinity Edge</h3>
            <p className="font-body text-body-md text-white/80">Experience seamless views where water meets the horizon.</p>
          </div>
        </div>

        {/* 2. BOTANICAL GARDENS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center mb-32 md:mb-40">
          <div className="md:col-span-5 text-reveal">
            <h3 className="font-display text-headline-lg text-slate-800 mb-6">Zenith Gardens</h3>
            <p className="font-body text-body-md text-slate-500">
              Wander through lush, curated botanical archways. A sanctuary of greenery that calms the mind and invigorates the senses, right outside your door.
            </p>
          </div>
          <div className="md:col-span-7 h-[60vh] rounded-2xl overflow-hidden clip-reveal group">
            <img 
              src="/frames/07_green_floral_archway/frame_1005.jpg" 
              alt="Zenith Gardens" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </div>

        {/* 3. DINING TERRACE */}
        <div className="relative mb-32 md:mb-40 h-[70vh] w-full rounded-2xl overflow-hidden clip-reveal group">
          <img 
            src="/frames/04_outdoor_restaurant_terrace/frame_0640.jpg" 
            alt="Twilight Terrace" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute top-8 right-8 md:top-12 md:right-12 p-8 rounded-2xl glass-dark md:w-[400px]">
            <h3 className="font-display text-headline-md text-white mb-2">Twilight Terrace</h3>
            <p className="font-body text-body-md text-white/80">Dine under the stars in an elegantly appointed outdoor sanctuary.</p>
          </div>
        </div>

        {/* 4. ZEN GARDEN */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center mb-32 md:mb-40">
          <div className="md:col-span-7 order-2 md:order-1 h-[60vh] rounded-2xl overflow-hidden clip-reveal group">
            <img 
              src="/frames/13_buddha_statue_zen_garden/frame_1205.jpg" 
              alt="Zen Sanctuary" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="md:col-span-5 order-1 md:order-2 text-reveal">
            <h3 className="font-display text-headline-lg text-slate-800 mb-6">Zen Sanctuary</h3>
            <p className="font-body text-body-md text-slate-500">
              Find your center in a space dedicated to mindfulness. With carefully arranged stones and a serene atmosphere, it is the perfect place to meditate and reflect.
            </p>
          </div>
        </div>

        {/* 5. WELLNESS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[50vh] rounded-2xl overflow-hidden clip-reveal group">
            <img 
              src="/frames/15_indoor_gym_fitness/frame_1227.jpg" 
              alt="Fitness Studio" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 py-2 px-4 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-white font-body text-label-sm">
              Fitness Studio
            </div>
          </div>
          <div className="relative h-[50vh] rounded-2xl overflow-hidden clip-reveal group">
            <img 
              src="/frames/11_basketball_court/frame_1175.jpg" 
              alt="Sports Courts" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 py-2 px-4 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-white font-body text-label-sm">
              Sports Courts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
