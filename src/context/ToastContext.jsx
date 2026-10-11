/**
 * Notification / Toast State Management
 *
 * Provides a decoupled notification bus for user feedback
 * (inquiry confirmations, validation errors, system notices).
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ToastContext = createContext(null);

let toastIdCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, message, type = 'info', durationMs = 5000 }) => {
      const id = ++toastIdCounter;
      const newToast = { id, title, message, type };

      setToasts((prev) => [...prev, newToast]);

      if (durationMs > 0) {
        setTimeout(() => {
          removeToast(id);
        }, durationMs);
      }

      return id;
    },
    [removeToast]
  );

  const toast = useMemo(
    () => ({
      success: (message, title = 'Success') =>
        addToast({ message, title, type: 'success' }),
      error: (message, title = 'Attention') =>
        addToast({ message, title, type: 'error', durationMs: 7000 }),
      info: (message, title = 'Notice') =>
        addToast({ message, title, type: 'info' }),
      custom: addToast,
      dismiss: removeToast,
    }),
    [addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return context.toast;
}

export function useToastState() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastState must be used within a <ToastProvider>');
  }
  return { toasts: context.toasts, removeToast: context.removeToast };
}

export default ToastContext;
