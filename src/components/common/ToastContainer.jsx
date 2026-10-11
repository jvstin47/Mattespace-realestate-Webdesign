/**
 * Toast Container Component
 *
 * Renders floating, accessible notifications styled with the Mattespace
 * architectural design language (frosted backdrop blur, delicate borders, accent badges).
 */

import React from 'react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useToastState } from '../../context/ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastState();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-[100] flex flex-col space-y-3 max-w-sm w-full pointer-events-none px-4 md:px-0"
    >
      {toasts.map((item) => {
        const isSuccess = item.type === 'success';
        const isError = item.type === 'error';

        const borderColor = isSuccess
          ? 'border-emerald-500/30'
          : isError
          ? 'border-rose-500/30'
          : 'border-white/20';

        const badgeBg = isSuccess
          ? 'text-emerald-400 bg-emerald-500/10'
          : isError
          ? 'text-rose-400 bg-rose-500/10'
          : 'text-accent bg-accent/10';

        const Icon = isSuccess ? CheckCircle2 : isError ? AlertCircle : Info;

        return (
          <div
            key={item.id}
            role="status"
            className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-2xl border ${borderColor} shadow-2xl text-white transition-all duration-300 animate-fade-up`}
          >
            <div className={`p-1.5 rounded-full ${badgeBg} flex-shrink-0 mt-0.5`}>
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              {item.title && (
                <h5 className="font-body text-label-sm font-semibold text-white tracking-wide uppercase">
                  {item.title}
                </h5>
              )}
              <p className="font-body text-body-sm text-white/80 mt-0.5 leading-relaxed">
                {item.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(item.id)}
              className="text-white/40 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-lg"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
