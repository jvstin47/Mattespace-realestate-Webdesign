import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0px, 0px)';
  };

  return (
    <>
      <nav 
        className={`fixed top-8 left-1/2 -translate-x-1/2 w-[92%] max-w-container z-50 glass rounded-full px-8 md:px-12 flex justify-between items-center transition-all duration-500 ease-out-expo ${scrolled ? 'bg-ceramic/80 backdrop-blur-[40px] py-3' : 'py-3.5'}`}
      >
        <div className="font-display text-headline-sm text-slate-800 font-medium tracking-tight">
          Mattespace
        </div>
        
        <div className="hidden md:flex gap-8 items-center">
          {['Residences', 'Amenities', 'Gallery', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="group relative font-body text-label-md text-slate-500 hover:text-slate-800 transition-colors"
            >
              {item}
              <span className="absolute left-0 bottom-[-4px] h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        <div className="hidden md:block">
          <button 
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-accent text-white text-label-md px-6 py-2.5 rounded-full hover:bg-accent-hover transition-colors duration-300 transition-transform ease-out-expo"
            style={{ transition: 'transform 0.1s ease-out, background-color 0.3s' }}
          >
            Inquire
          </button>
        </div>
        
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="text-slate-800">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-ceramic flex flex-col items-center justify-center">
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="absolute top-10 right-8 text-slate-800"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="flex flex-col gap-8 text-center">
            {['Residences', 'Amenities', 'Gallery', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-headline-md text-slate-800 hover:text-accent transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
