/**
 * Site Footer Component
 *
 * Presents legal disclosures, RERA registrations, secondary navigation,
 * and architectural brand identity.
 */

import React from 'react';
import {
  SITE_METADATA,
  NAVIGATION_ITEMS,
  FOOTER_SECONDARY_LINKS,
} from '../../config/constants';
import { env } from '../../config/env';

export default function Footer() {
  return (
    <footer className="bg-ceramic border-t border-[rgba(90,105,120,0.12)] py-20 md:py-32 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
          {/* Brand & Regulatory Column */}
          <div className="md:col-span-5">
            <h2 className="font-display text-headline-lg text-slate-800">
              {env.appName}
            </h2>
            <p className="font-body text-body-md text-slate-500 mt-2">
              {env.appTagline}
            </p>
            <p className="mt-6 font-body text-label-xs text-slate-500/60 leading-relaxed max-w-sm">
              &copy; {SITE_METADATA.copyrightYear} {env.appName} Architectural Developments.
              <br />
              RERA Reg: {SITE_METADATA.reraRegistration}
            </p>
          </div>

          {/* Primary Section Links */}
          <div className="md:col-span-3 md:col-start-7 mt-12 md:mt-0">
            <span className="block font-body text-label-xs text-accent uppercase tracking-widest mb-4 font-semibold">
              Explore
            </span>
            <nav className="flex flex-col space-y-3">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-body text-label-sm text-slate-500 hover:text-slate-800 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal & Governance */}
          <div className="md:col-span-3 mt-8 md:mt-0">
            <span className="block font-body text-label-xs text-accent uppercase tracking-widest mb-4 font-semibold">
              Governance
            </span>
            <nav className="flex flex-col space-y-3">
              {FOOTER_SECONDARY_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-body text-label-sm text-slate-500 hover:text-slate-800 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[rgba(90,105,120,0.12)] mt-16 mb-8" />

        {/* Bottom Disclaimers */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-body text-label-xs text-slate-500/50 gap-4 md:gap-0">
          <span>{SITE_METADATA.location}</span>
          <span>{SITE_METADATA.renderDisclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
