import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: "/frames/19_twin_towers_sunset/frame_1320.jpg",
    title: "Sunset Silhouette",
    category: "Exterior · Golden Hour"
  },
  {
    src: "/frames/01_aerial_rooftop_pool/frame_0080.jpg",
    title: "Infinity Edge",
    category: "Amenities · Afternoon"
  },
  {
    src: "/frames/02_blue_luxury_car/frame_0260.jpg",
    title: "Grand Arrival",
    category: "Porte-Cochère · Morning"
  },
  {
    src: "/frames/05_building_facade_dusk_night/frame_0840.jpg",
    title: "Nightfall",
    category: "Architecture · Dusk"
  },
  {
    src: "/frames/04_outdoor_restaurant_terrace/frame_0640.jpg",
    title: "Twilight Dining",
    category: "Lifestyle · Evening"
  },
  {
    src: "/frames/08_aerial_garden_plaza_fountains/frame_1050.jpg",
    title: "Reflecting Pools",
    category: "Landscape · Midday"
  },
  {
    src: "/frames/09_aerial_amphitheater_garden/frame_1100.jpg",
    title: "Amphitheater",
    category: "Landscape · Afternoon"
  },
  {
    src: "/frames/13_buddha_statue_zen_garden/frame_1205.jpg",
    title: "Zen Garden",
    category: "Wellness · Morning"
  },
  {
    src: "/frames/21_final_hero_shot_twin_towers/frame_1520.jpg",
    title: "Twin Towers",
    category: "Hero · Sunset"
  }
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };
  
  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <section id="gallery" className="py-section px-margin-mobile md:px-margin-desktop bg-ceramic">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-24">
          <h3 className="text-label-sm text-accent uppercase tracking-widest mb-4">Visual Narrative</h3>
          <h2 className="font-display text-headline-lg md:text-display-md text-slate-800">The Experience</h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, idx) => (
            <div 
              key={idx} 
              className="break-inside-avoid relative group overflow-hidden rounded-xl cursor-pointer"
              onClick={() => openLightbox(idx)}
            >
              <img 
                src={image.src} 
                alt={image.title} 
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/50 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <h4 className="font-display text-headline-sm text-white mb-1">{image.title}</h4>
                <p className="text-label-xs text-white/70 uppercase tracking-widest">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-2xl flex flex-col justify-center items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>

          <button 
            className="absolute left-6 md:left-12 p-2 text-white/70 hover:text-white transition-colors"
            onClick={prevImage}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button 
            className="absolute right-6 md:right-12 p-2 text-white/70 hover:text-white transition-colors"
            onClick={nextImage}
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div 
            className="relative px-12 md:px-24 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={galleryImages[selectedIndex].src} 
              alt={galleryImages[selectedIndex].title} 
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-6 text-center">
              <h3 className="font-display text-headline-sm md:text-headline-md text-white">{galleryImages[selectedIndex].title}</h3>
              <p className="mt-2 text-label-sm text-white/70 uppercase tracking-widest">{galleryImages[selectedIndex].category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
