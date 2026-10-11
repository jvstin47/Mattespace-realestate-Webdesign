/**
 * Global Application Constants
 */

import { env } from './env';

export const NAVIGATION_ITEMS = Object.freeze([
  { label: 'Residences', href: '#residences' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]);

export const FOOTER_SECONDARY_LINKS = Object.freeze([
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Press', href: '#' },
  { label: 'Sustainability', href: '#' },
]);

export const SITE_METADATA = Object.freeze({
  reraRegistration: 'PRM/KA/RERA/1251/310/PR/240826/006942',
  location: 'Financial District Axis, Metro East',
  renderDisclaimer: 'All renderings are artistic impressions.',
  copyrightYear: 2025,
});

export const ENGINE_CONFIG = Object.freeze({
  fps: 60,
  frameDuration: 1000 / 60,
  minPlaybackDuration: env.heroMinPlaybackMs,
  mandatoryStopDuration: env.heroHoldDurationMs,
  deltaThreshold: 15,
  touchDeltaThreshold: 30,
});

export const RAIL_POSITIONS = Object.freeze({
  'bottom-left': { bottom: 70, left: 64, top: 'auto', right: 'auto', transform: 'translate(0, 0)' },
  'lower-left': { bottom: 120, left: 64, top: 'auto', right: 'auto', transform: 'translate(0, 0)' },
  'left-center': { top: '42%', left: 64, bottom: 'auto', right: 'auto', transform: 'translate(0, -50%)' },
  'top-left': { top: 120, left: 64, bottom: 'auto', right: 'auto', transform: 'translate(0, 0)' },
  'top-center': { top: 120, left: '50%', bottom: 'auto', right: 'auto', transform: 'translate(-50%, 0)' },
  'top-right': { top: 120, right: 64, bottom: 'auto', left: 'auto', transform: 'translate(0, 0)' },
  'upper-right': { top: 140, right: 64, bottom: 'auto', left: 'auto', transform: 'translate(0, 0)' },
  'center-right': { top: '42%', right: 64, bottom: 'auto', left: 'auto', transform: 'translate(0, -50%)' },
  'lower-right': { bottom: 70, right: 64, top: 'auto', left: 'auto', transform: 'translate(0, 0)' },
  'bottom-right': { bottom: 70, right: 64, top: 'auto', left: 'auto', transform: 'translate(0, 0)' },
  'center-bottom': { bottom: 70, left: '50%', top: 'auto', right: 'auto', transform: 'translate(-50%, 0)' },
  'center': { top: '45%', left: '50%', bottom: 'auto', right: 'auto', transform: 'translate(-50%, -50%)' },
});

export const CUSTOM_EVENTS = Object.freeze({
  RESET_HERO: 'mattespace:reset-hero',
});

/**
 * Generates an encoded WhatsApp conversation URL using configured phone and default message.
 * @param {string} [customMessage] - Optional override for the inquiry text.
 * @returns {string} Fully qualified WhatsApp URL.
 */
export function getWhatsAppUrl(customMessage) {
  const text = customMessage || env.whatsappDefaultMessage;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${env.whatsappPhone}?text=${encodedText}`;
}
