/**
 * Inquiry Form Controller Hook
 *
 * Encapsulates form values, real-time field validation, network submission,
 * error state tracking, and user notification orchestration.
 */

import { useState, useCallback } from 'react';
import { inquiryService, validateInquiryPayload } from '../api';
import { useToast } from '../context/ToastContext';

const INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  interest: '2-bhk',
};

export function useInquiryForm(initialState = {}) {
  const toast = useToast();
  const [values, setValues] = useState({ ...INITIAL_VALUES, ...initialState });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationId, setConfirmationId] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate single field on blur
      const validation = validateInquiryPayload(values);
      if (validation.errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: validation.errors[name] }));
      }
    },
    [values]
  );

  const resetForm = useCallback(() => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSuccess(false);
    setConfirmationId(null);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      if (e && e.preventDefault) e.preventDefault();

      // Mark all fields touched
      setTouched({ name: true, email: true, phone: true, interest: true });

      const validation = validateInquiryPayload(values);
      if (!validation.isValid) {
        setErrors(validation.errors);
        toast.error('Please complete all required fields.', 'Validation Error');
        return;
      }

      setIsSubmitting(true);
      setErrors({});

      try {
        const response = await inquiryService.submitInquiry(values);
        setIsSuccess(true);
        setConfirmationId(response.confirmationId);
        toast.success(
          response.message || 'Private viewing request submitted successfully.',
          'Request Confirmed'
        );
      } catch (err) {
        const fieldErrors = err.data && typeof err.data === 'object' ? err.data : {};
        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
        }
        toast.error(
          err.message || 'Failed to submit viewing request. Please try again.',
          'Submission Notice'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, toast]
  );

  return {
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
  };
}

export default useInquiryForm;
