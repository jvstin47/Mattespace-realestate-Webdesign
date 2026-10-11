/**
 * Primary Floating Navigation Bar
 *
 * Morphs dynamically between dark obsidian glass (over hero footage)
 * and light ceramic glass (over scrolled content).
 * Includes smooth logo-click story reset, magnetic Inquire CTA,
 * and accessible mobile drawer overlay.
 */

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useExperience } from '../../context/ExperienceContext';
import { useMagneticEffect, useBodyScrollLock } from '../../hooks';
import { NAVIGATION_ITEMS, getWhatsAppUrl } from '../../config/constants';
import { env } from '../../config/env';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resetHero } = useExperience();

  // Magnetic CTA pull on desktop
  const buttonRef = useMagneticEffect({ strength: 0.15, useGsap: false });

  // Lock background scrolling when mobile menu drawer is open
  useBodyScrollLock(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    resetHero();
  };

  const whatsappUrl = getWhatsAppUrl();

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-container z-50 rounded-full px-8 md:px-12 flex justify-between items-center transition-all duration-500 ease-out-expo ${
          scrolled
            ? 'bg-ceramic/90 backdrop-blur-2xl border border-slate-300/50 shadow-md py-3 text-slate-800'
            : 'bg-slate-900/75 backdrop-blur-2xl border border-white/15 shadow-2xl py-3.5 text-white'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#"
          onClick={handleLogoClick}
          className={`font-display text-headline-sm font-medium tracking-tight cursor-pointer transition-colors duration-500 ${
            scrolled ? 'text-slate-800' : 'text-white'
          }`}
        >
          {env.appName}
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          {NAVIGATION_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`group relative font-body text-label-md transition-colors duration-500 ${
                scrolled
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              {item.label}
              <span className="absolute left-0 bottom-[-4px] h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop Inquire CTA Button */}
        <div className="hidden md:block">
          <a
            ref={buttonRef}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block text-label-md px-6 py-2.5 rounded-full transition-colors duration-300 ${
              scrolled
                ? 'bg-slate-800 text-white hover:bg-slate-700'
                : 'bg-white text-slate-900 hover:bg-slate-100 shadow-md'
            }`}
            style={{
              transition:
                'transform 0.1s ease-out, background-color 0.3s, color 0.3s',
            }}
          >
            Inquire
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className={`p-1.5 transition-colors duration-500 ${
              scrolled ? 'text-slate-800' : 'text-white'
            }`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-[80] bg-ceramic flex flex-col items-center justify-center animate-fade-in"
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close mobile menu"
            className="absolute top-10 right-8 text-slate-800 p-2 hover:text-accent transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="flex flex-col gap-8 text-center items-center">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-headline-md text-slate-800 hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            ))}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 bg-slate-800 text-white text-label-md px-8 py-3.5 rounded-full hover:bg-slate-700 transition-colors shadow-lg"
            >
              Inquire on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
