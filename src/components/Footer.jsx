import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-ceramic border-t border-[rgba(90,105,120,0.12)] py-20 md:py-32 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
          
          {/* Left Column */}
          <div className="md:col-span-5">
            <h2 className="font-display text-headline-lg text-slate-800">Mattespace</h2>
            <p className="font-body text-body-md text-slate-500 mt-2">
              Architecture Designed Around Light
            </p>
            <p className="mt-6 font-body text-label-xs text-slate-500/60 leading-relaxed max-w-sm">
              © 2025 Mattespace Architectural Developments.<br />
              RERA Reg: PRM/KA/RERA/1251/310/PR/240826/006942
            </p>
          </div>

          {/* Center Column */}
          <div className="md:col-span-3 md:col-start-7 mt-12 md:mt-0">
            <nav className="flex flex-col">
              <a href="#residences" className="font-body text-label-sm text-slate-500 hover:text-slate-800 transition-colors block mb-3">Residences</a>
              <a href="#amenities" className="font-body text-label-sm text-slate-500 hover:text-slate-800 transition-colors block mb-3">Amenities</a>
              <a href="#gallery" className="font-body text-label-sm text-slate-500 hover:text-slate-800 transition-colors block mb-3">Gallery</a>
              <a href="#contact" className="font-body text-label-sm text-slate-500 hover:text-slate-800 transition-colors block mb-3">Contact</a>
            </nav>
          </div>

          {/* Right Column */}
          <div className="md:col-span-3 mt-8 md:mt-0">
            <nav className="flex flex-col">
              <a href="#" className="font-body text-label-sm text-slate-500 hover:text-slate-800 transition-colors block mb-3">Privacy</a>
              <a href="#" className="font-body text-label-sm text-slate-500 hover:text-slate-800 transition-colors block mb-3">Terms</a>
              <a href="#" className="font-body text-label-sm text-slate-500 hover:text-slate-800 transition-colors block mb-3">Press</a>
              <a href="#" className="font-body text-label-sm text-slate-500 hover:text-slate-800 transition-colors block mb-3">Sustainability</a>
            </nav>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[rgba(90,105,120,0.12)] mt-16 mb-8"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-body text-label-xs text-slate-500/50 gap-4 md:gap-0">
          <span>Financial District Axis, Metro East</span>
          <span>All renderings are artistic impressions.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
