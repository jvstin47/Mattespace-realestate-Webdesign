import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Residences = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll('.clip-reveal, .text-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="residences" ref={sectionRef} className="py-section px-margin-mobile md:px-margin-desktop bg-ceramic-200">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h3 className="text-label-sm text-accent uppercase tracking-widest mb-4 text-reveal">The Collection</h3>
          <h2 className="font-display text-headline-lg md:text-display-md text-slate-800 text-reveal">Structural Elegance</h2>
          <p className="font-body text-body-lg text-slate-500 max-w-2xl mt-6 text-reveal">
            Material honesty meets spatial purity in environments designed to elevate the everyday into the extraordinary.
          </p>
        </div>

        {/* Layout */}
        <div className="relative">
          <div className="w-full h-[75vh] rounded-3xl overflow-hidden clip-reveal relative">
            <img 
              src="/frames/03_exterior_building_facade/frame_0450.jpg" 
              alt="Exterior Building Facade" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>

          <div className="relative -mt-24 md:-mt-32 z-10 md:ml-auto md:max-w-lg">
            <div className="glass-card p-10 md:p-12 rounded-3xl text-reveal">
              <h3 className="font-display text-headline-md text-slate-800 mb-8">
                Floor-to-ceiling glass invites the horizon inside.
              </h3>
              
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-[rgba(90,105,120,0.12)]">
                  <span className="font-body text-body-md text-slate-500">Ceiling Height</span>
                  <span className="font-body text-label-md text-slate-800">11' – 14'</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[rgba(90,105,120,0.12)]">
                  <span className="font-body text-body-md text-slate-500">Finishes</span>
                  <span className="font-body text-label-md text-slate-800">Matte Bronze & Ash</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[rgba(90,105,120,0.12)]">
                  <span className="font-body text-body-md text-slate-500">Smart Integration</span>
                  <span className="font-body text-label-md text-slate-800">Invisible Tech Suite</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[rgba(90,105,120,0.12)]">
                  <span className="font-body text-body-md text-slate-500">Orientation</span>
                  <span className="font-body text-label-md text-slate-800">East & West Panoramic</span>
                </div>
              </div>

              <div className="mt-8">
                <a href="#contact" className="inline-flex items-center text-accent hover:text-accent-hover text-label-md transition-colors group">
                  Request Plans <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary 2-column layout */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden clip-reveal aspect-[3/4]">
            <img 
              src="/frames/19_twin_towers_sunset/frame_1320.jpg" 
              alt="Twin Towers Sunset" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
          <div className="rounded-3xl overflow-hidden clip-reveal aspect-[3/4] md:mt-16">
            <img 
              src="/frames/05_building_facade_dusk_night/frame_0840.jpg" 
              alt="Building Facade Dusk" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Residences;
