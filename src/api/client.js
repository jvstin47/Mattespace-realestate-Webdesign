/**
 * Scalable HTTP API Client
 *
 * Provides a resilient fetch wrapper with automatic timeout handling,
 * standardized headers, request/response lifecycle hooks, and normalized ApiError formatting.
 */

import { env } from '../config/env';

export class ApiError extends Error {
  /**
   * @param {string} message - Human-readable error description
   * @param {number} [status=0] - HTTP status code
   * @param {*} [data=null] - Server response body or validation payload
   * @param {string} [code='API_ERROR'] - Machine-readable error code
   */
  constructor(message, status = 0, data = null, code = 'API_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    this.code = code;
    this.isNetworkError = status === 0;
  }
}

class HttpClient {
  constructor(baseUrl = env.apiBaseUrl, timeoutMs = env.apiTimeoutMs) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.timeoutMs = timeoutMs;
  }

  /**
   * Core request executor with timeout and error normalization.
   * @param {string} endpoint - Path relative to base URL (e.g. '/inquiries')
   * @param {RequestInit} [options={}] - Fetch configuration options
   * @returns {Promise<any>}
   */
  async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${this.baseUrl}/${endpoint.replace(/^\/+/, '')}`;

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timer);

      // Parse JSON safely or fall back to empty object
      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        const errorMessage =
          (data && typeof data === 'object' && data.message) ||
          response.statusText ||
          `Request failed with status ${response.status}`;
        throw new ApiError(errorMessage, response.status, data, 'HTTP_ERROR');
      }

      return data;
    } catch (err) {
      clearTimeout(timer);

      if (err instanceof ApiError) {
        throw err;
      }

      if (err.name === 'AbortError') {
        throw new ApiError(
          `Request timed out after ${this.timeoutMs}ms`,
          408,
          null,
          'TIMEOUT_ERROR'
        );
      }

      throw new ApiError(
        err.message || 'Network request failed. Please check your connection.',
        0,
        null,
        'NETWORK_ERROR'
      );
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new HttpClient();
export default apiClient;
