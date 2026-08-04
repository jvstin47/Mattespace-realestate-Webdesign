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

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = "https://wa.me/1234567890?text=Hello%2C%20I%20am%20interested%20in%20Mattespace%20Residences.";

  return (
    <>
      <nav 
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-container z-50 rounded-full px-8 md:px-12 flex justify-between items-center transition-all duration-500 ease-out-expo ${
          scrolled 
            ? 'bg-ceramic/90 backdrop-blur-2xl border border-slate-300/50 shadow-md py-3 text-slate-800' 
            : 'bg-slate-900/75 backdrop-blur-2xl border border-white/15 shadow-2xl py-3.5 text-white'
        }`}
      >
        <a 
          href="#"
          onClick={handleLogoClick}
          className={`font-display text-headline-sm font-medium tracking-tight cursor-pointer transition-colors duration-500 ${scrolled ? 'text-slate-800' : 'text-white'}`}
        >
          Mattespace
        </a>
        
        <div className="hidden md:flex gap-8 items-center">
          {['Residences', 'Amenities', 'Gallery', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`group relative font-body text-label-md transition-colors duration-500 ${
                scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/75 hover:text-white'
              }`}
            >
              {item}
              <span className="absolute left-0 bottom-[-4px] h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        <div className="hidden md:block">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`inline-block text-label-md px-6 py-2.5 rounded-full transition-colors duration-300 ${
              scrolled 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-white text-slate-900 hover:bg-slate-100 shadow-md'
            }`}
            style={{ transition: 'transform 0.1s ease-out, background-color 0.3s, color 0.3s' }}
          >
            Inquire
          </a>
        </div>
        
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className={`transition-colors duration-500 ${scrolled ? 'text-slate-800' : 'text-white'}`}>
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
          <div className="flex flex-col gap-8 text-center items-center">
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
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 bg-slate-800 text-white text-label-md px-8 py-3 rounded-full hover:bg-slate-700 transition-colors"
            >
              Inquire on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
