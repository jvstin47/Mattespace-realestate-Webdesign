/**
 * Contact & Private Viewing Request Section
 *
 * Connects prospective buyers with the Mattespace concierge.
 * Uses useInquiryForm for field validation and API submission,
 * and useMagneticEffect for tactile CTA pull.
 */

import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useInquiryForm, useMagneticEffect } from '../../hooks';

const RESIDENCE_OPTIONS = [
  { value: '2-bhk', label: '2 BHK Suite' },
  { value: '3-bhk', label: '3 BHK Residence' },
  { value: '4-bhk', label: '4 BHK Penthouse' },
  { value: 'sky-villa', label: 'Sky Villa' },
];

export default function Contact() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isSuccess,
    confirmationId,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useInquiryForm();

  const buttonRef = useMagneticEffect({ strength: 0.15, useGsap: false });

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center bg-ceramic-200 overflow-hidden py-24"
    >
      {/* Architectural Background Texture */}
      <img
        src="/frames/03_exterior_building_facade/frame_0450.webp"
        alt="Building Facade"
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-[0.06] pointer-events-none"
        loading="lazy"
      />

      {/* Glass Presentation Card */}
      <div className="relative z-10 glass-card max-w-2xl w-full mx-4 p-8 md:p-16 rounded-3xl text-center shadow-2xl">
        <span className="text-label-xs text-accent uppercase tracking-widest block mb-2 font-semibold">
          Private Presentations
        </span>
        <h2 className="font-display text-display-md md:text-display-lg text-slate-800">
          Begin Your Next Chapter
        </h2>
        <p className="font-body text-body-lg text-slate-500 mt-3 max-w-lg mx-auto">
          Private presentations available by appointment with our dedicated residential concierge.
        </p>

        {isSuccess ? (
          <div className="mt-12 p-8 rounded-2xl bg-slate-900/5 border border-slate-900/10 text-center animate-fade-in">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-600 mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display italic text-headline-sm text-slate-800 mb-2">
              Viewing Request Confirmed
            </h4>
            <p className="font-body text-body-md text-slate-600 mb-4">
              Reference Code:{' '}
              <span className="font-mono font-semibold text-slate-900">
                {confirmationId}
              </span>
            </p>
            <p className="font-body text-body-sm text-slate-500 max-w-md mx-auto mb-6">
              Our concierge team will review your preferred residence collection and contact you within 24 hours to schedule your private tour.
            </p>
            <button
              onClick={resetForm}
              className="font-body text-label-md text-accent hover:text-accent-hover underline transition-colors"
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-12 max-w-md mx-auto space-y-6 text-left"
          >
            {/* Name Field */}
            <div className="relative">
              <label
                htmlFor="inquiry-name"
                className="block text-label-xs text-accent uppercase tracking-widest mb-1 font-semibold"
              >
                Name *
              </label>
              <input
                id="inquiry-name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                className={`w-full bg-transparent border-b ${
                  touched.name && errors.name
                    ? 'border-rose-400'
                    : 'border-[rgba(90,105,120,0.2)] focus:border-accent'
                } font-body text-body-md text-slate-800 py-2 outline-none transition-colors duration-300`}
                placeholder="Your Full Name"
                aria-required="true"
                aria-invalid={touched.name && Boolean(errors.name)}
              />
              {touched.name && errors.name && (
                <span className="block text-rose-500 text-[11px] font-body mt-1">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="inquiry-email"
                className="block text-label-xs text-accent uppercase tracking-widest mb-1 font-semibold"
              >
                Email *
              </label>
              <input
                id="inquiry-email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                className={`w-full bg-transparent border-b ${
                  touched.email && errors.email
                    ? 'border-rose-400'
                    : 'border-[rgba(90,105,120,0.2)] focus:border-accent'
                } font-body text-body-md text-slate-800 py-2 outline-none transition-colors duration-300`}
                placeholder="name@domain.com"
                aria-required="true"
                aria-invalid={touched.email && Boolean(errors.email)}
              />
              {touched.email && errors.email && (
                <span className="block text-rose-500 text-[11px] font-body mt-1">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Phone Field */}
            <div className="relative">
              <label
                htmlFor="inquiry-phone"
                className="block text-label-xs text-accent uppercase tracking-widest mb-1 font-semibold"
              >
                Phone *
              </label>
              <input
                id="inquiry-phone"
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                className={`w-full bg-transparent border-b ${
                  touched.phone && errors.phone
                    ? 'border-rose-400'
                    : 'border-[rgba(90,105,120,0.2)] focus:border-accent'
                } font-body text-body-md text-slate-800 py-2 outline-none transition-colors duration-300`}
                placeholder="+1 (555) 000-0000"
                aria-required="true"
                aria-invalid={touched.phone && Boolean(errors.phone)}
              />
              {touched.phone && errors.phone && (
                <span className="block text-rose-500 text-[11px] font-body mt-1">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Collection Interest Field */}
            <div className="relative">
              <label
                htmlFor="inquiry-interest"
                className="block text-label-xs text-accent uppercase tracking-widest mb-1 font-semibold"
              >
                Residence Interest *
              </label>
              <select
                id="inquiry-interest"
                name="interest"
                value={values.interest}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                className="w-full bg-transparent border-b border-[rgba(90,105,120,0.2)] focus:border-accent font-body text-body-md text-slate-800 py-2 outline-none transition-colors duration-300 appearance-none rounded-none cursor-pointer"
              >
                {RESIDENCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8 bg-slate-900 text-white text-label-md py-4 rounded-xl hover:bg-slate-800 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Request...</span>
                </>
              ) : (
                <span>Request Private Viewing</span>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
