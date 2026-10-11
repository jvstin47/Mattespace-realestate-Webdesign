/**
 * Chapter Editorial Card Component
 *
 * Renders the floating luxury architectural card during hero playback,
 * featuring chapter badges, serif display italic headlines, and fluid spring transitions.
 */

import React from 'react';
import { RAIL_POSITIONS } from '../../config/constants';

export default function ChapterCard({ caption, isVisible }) {
  if (!caption) return null;

  const onDark = caption.panelMode === 'onDark';
  const panelBg = onDark
    ? 'rgba(15, 23, 42, 0.82)'
    : 'rgba(245, 247, 248, 0.94)';
  const panelBorder = onDark
    ? 'rgba(255, 255, 255, 0.22)'
    : 'rgba(90, 105, 120, 0.22)';
  const panelShadow = onDark
    ? '0 30px 60px rgba(0, 0, 0, 0.55)'
    : '0 30px 60px rgba(28, 39, 51, 0.16)';
  const textPrimary = onDark ? '#FFFFFF' : '#1C2733';
  const textLabel = onDark ? '#5D7897' : '#5D7897';
  const textDesc = onDark ? 'rgba(255, 255, 255, 0.85)' : '#5D7897';

  const positionStyles =
    RAIL_POSITIONS[caption.position] || RAIL_POSITIONS['bottom-left'];

  return (
    <div
      className="absolute pointer-events-none z-10"
      style={{
        ...positionStyles,
        maxWidth: 500,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'scale(1) translateY(0)'
          : 'scale(0.93) translateY(20px)',
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        transition:
          'top 0.8s cubic-bezier(0.16, 1, 0.3, 1), bottom 0.8s cubic-bezier(0.16, 1, 0.3, 1), left 0.8s cubic-bezier(0.16, 1, 0.3, 1), right 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, filter 0.5s ease',
      }}
    >
      <div
        className="rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-3xl"
        style={{
          padding: '28px 34px',
          border: `1px solid ${panelBorder}`,
          background: panelBg,
          boxShadow: panelShadow,
          transition:
            'background 0.8s ease, border-color 0.8s ease, box-shadow 0.8s ease',
        }}
      >
        {/* Top Progress Accent Bar */}
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-[11px] font-bold tracking-widest text-accent uppercase">
              CHAPTER {caption.chapterNum} / 14
            </span>
          </div>
          <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-white/40">
            {caption.category}
          </span>
        </div>

        {/* Subtitle Category Label */}
        <div
          className="font-body font-semibold mb-2"
          style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: textLabel,
            transition: 'color 0.8s ease',
          }}
        >
          {caption.label}
        </div>

        {/* Luxury Playfair Display Editorial Headline */}
        <div
          className="font-display font-normal italic tracking-tight"
          style={{
            fontSize: 'clamp(26px, 2.4vw, 34px)',
            lineHeight: 1.15,
            color: textPrimary,
            transition: 'color 0.8s ease',
          }}
        >
          {caption.headline}
        </div>

        {/* Narrative Description */}
        {caption.description && (
          <div
            className="font-body mt-3 font-normal"
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: textDesc,
              transition: 'color 0.8s ease',
            }}
          >
            {caption.description}
          </div>
        )}
      </div>
    </div>
  );
}
