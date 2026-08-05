import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Contact = () => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    
    if (!button || !text) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.6,
        ease: 'power3.out',
      });
      
      gsap.to(text, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
      
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center bg-ceramic-200 overflow-hidden">
      {/* Background Image */}
      <img
        src="/frames/03_exterior_building_facade/frame_0450.webp"
        alt="Building Facade"
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-[0.06] pointer-events-none"
      />
      
      {/* Content */}
      <div className="relative z-10 glass-card max-w-2xl w-full mx-4 p-12 md:p-20 rounded-3xl text-center">
        <h2 className="font-display text-display-md md:text-display-lg text-slate-800 text-reveal is-visible">
          Begin Your Next Chapter
        </h2>
        <p className="font-body text-body-lg text-slate-500 mt-4 text-reveal is-visible" style={{ transitionDelay: '100ms' }}>
          Private presentations available by appointment.
        </p>

        <form className="mt-12 max-w-md mx-auto space-y-8 text-left">
          <div className="relative">
            <label className="block text-label-xs text-accent uppercase tracking-widest mb-1">Name</label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-[rgba(90,105,120,0.12)] focus:border-accent font-body text-body-md text-slate-800 py-2 outline-none transition-colors duration-300"
              placeholder="Your Full Name"
            />
          </div>

          <div className="relative">
            <label className="block text-label-xs text-accent uppercase tracking-widest mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-transparent border-b border-[rgba(90,105,120,0.12)] focus:border-accent font-body text-body-md text-slate-800 py-2 outline-none transition-colors duration-300"
              placeholder="Your Email Address"
            />
          </div>

          <div className="relative">
            <label className="block text-label-xs text-accent uppercase tracking-widest mb-1">Phone</label>
            <input
              type="tel"
              className="w-full bg-transparent border-b border-[rgba(90,105,120,0.12)] focus:border-accent font-body text-body-md text-slate-800 py-2 outline-none transition-colors duration-300"
              placeholder="Your Phone Number"
            />
          </div>

          <div className="relative">
            <label className="block text-label-xs text-accent uppercase tracking-widest mb-1">Interest</label>
            <select
              className="w-full bg-transparent border-b border-[rgba(90,105,120,0.12)] focus:border-accent font-body text-body-md text-slate-800 py-2 outline-none transition-colors duration-300 appearance-none rounded-none"
            >
              <option value="2-bhk">2 BHK Suite</option>
              <option value="3-bhk">3 BHK Residence</option>
              <option value="4-bhk">4 BHK Penthouse</option>
              <option value="sky-villa">Sky Villa</option>
            </select>
          </div>

          <button
            ref={buttonRef}
            type="button"
            className="w-full mt-8 bg-accent text-white text-label-md py-4 rounded-lg hover:bg-accent-hover transition-colors duration-300 flex items-center justify-center overflow-hidden"
          >
            <span ref={textRef} className="block pointer-events-none">Request Private Viewing</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
