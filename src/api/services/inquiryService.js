/**
 * Inquiry & Lead Management Service
 *
 * Handles validation and submission of prospective buyer viewing requests.
 * Features a seamless Mock Adapter when backend services are not connected,
 * enabling reliable client-side operation, demo testing, and CI verification.
 */

import { apiClient, ApiError } from '../client';
import { ENDPOINTS } from '../endpoints';
import { env } from '../../config/env';

/**
 * Validates buyer inquiry payload before network transmission.
 * @param {object} payload
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateInquiryPayload(payload) {
  const errors = {};

  if (!payload.name || payload.name.trim().length < 2) {
    errors.name = 'Please provide your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.email || !emailRegex.test(payload.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  const phoneDigits = (payload.phone || '').replace(/\D/g, '');
  if (!payload.phone || phoneDigits.length < 8 || phoneDigits.length > 15) {
    errors.phone = 'Please provide a valid phone number (8–15 digits).';
  }

  if (!payload.interest) {
    errors.interest = 'Please select a residence collection of interest.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export const inquiryService = {
  /**
   * Submits a private presentation booking request.
   * @param {{ name: string, email: string, phone: string, interest: string }} inquiryData
   * @returns {Promise<{ success: boolean, confirmationId: string, message: string }>}
   */
  async submitInquiry(inquiryData) {
    const { isValid, errors } = validateInquiryPayload(inquiryData);
    if (!isValid) {
      throw new ApiError('Please correct the highlighted fields.', 422, errors, 'VALIDATION_ERROR');
    }

    // Mock API Adapter for demonstration and disconnected environments
    if (env.enableMockApi) {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      const confirmationId = `MAT-2025-${randomSuffix}`;

      return {
        success: true,
        confirmationId,
        message: 'Your private viewing request has been received. Our concierge will be in touch within 24 hours.',
        timestamp: new Date().toISOString(),
      };
    }

    // Live backend endpoint
    return apiClient.post(ENDPOINTS.INQUIRIES, inquiryData);
  },

  /**
   * Fetches real-time status / availability for specified residences.
   * @param {string} [unitType]
   */
  async checkAvailability(unitType) {
    if (env.enableMockApi) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        available: true,
        unitType: unitType || 'all',
        inquiriesOpen: true,
      };
    }

    return apiClient.get(
      unitType ? `${ENDPOINTS.AVAILABILITY}?type=${encodeURIComponent(unitType)}` : ENDPOINTS.AVAILABILITY
    );
  },
};

export default inquiryService;
