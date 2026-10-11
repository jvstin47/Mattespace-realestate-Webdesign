/**
 * Top-Level Application Error Boundary
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs diagnostic details, and renders an architectural fallback UI
 * rather than unmounting the entire application silently.
 */

import React, { Component } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Production telemetry / logger can be hooked here
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary caught an error]:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetState = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="min-h-screen w-full flex items-center justify-center bg-ceramic px-6 py-20 text-slate-800">
          <div className="max-w-lg w-full bg-white/70 backdrop-blur-3xl border border-slate-300/40 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-600 mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <span className="font-body text-label-xs text-accent uppercase tracking-widest block mb-2 font-semibold">
              System Notice
            </span>

            <h2 className="font-display italic text-headline-md text-slate-800 mb-4">
              Experience Interrupted
            </h2>

            <p className="font-body text-body-md text-slate-500 mb-8 leading-relaxed">
              An unexpected render issue occurred while loading this view. You can reload the experience or continue browsing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white font-body text-label-md px-6 py-3 rounded-full transition-all duration-300 shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Experience</span>
              </button>

              <button
                onClick={this.handleResetState}
                className="w-full sm:w-auto inline-flex items-center justify-center font-body text-label-md text-slate-600 hover:text-slate-900 border border-slate-300 px-6 py-3 rounded-full transition-colors"
              >
                Attempt Recovery
              </button>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 text-left border-t border-slate-200 pt-4">
                <summary className="font-body text-label-xs text-slate-400 cursor-pointer hover:text-slate-600">
                  Technical Stack Trace (Development Only)
                </summary>
                <pre className="mt-2 p-3 bg-slate-900 text-rose-300 text-[11px] rounded-xl overflow-x-auto font-mono max-h-48">
                  {this.state.error.toString()}
                  {'\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
