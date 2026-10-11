/**
 * Environment Configuration
 *
 * Reads and validates environment variables from import.meta.env.
 * Provides resilient, production-ready fallbacks when running in
 * environments where specific variables are not configured.
 */

const getEnvString = (key, fallback) => {
  const val = import.meta.env[key];
  return typeof val === 'string' && val.trim().length > 0 ? val.trim() : fallback;
};

const getEnvNumber = (key, fallback) => {
  const val = import.meta.env[key];
  if (val === undefined || val === null || val === '') return fallback;
  const parsed = Number(val);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getEnvBoolean = (key, fallback) => {
  const val = import.meta.env[key];
  if (val === undefined || val === null || val === '') return fallback;
  return val === 'true' || val === true || val === '1';
};

export const env = Object.freeze({
  /** Application Branding */
  appName: getEnvString('VITE_APP_NAME', 'Mattespace'),
  appTagline: getEnvString('VITE_APP_TAGLINE', 'Architecture Designed Around Light'),

  /** Concierge / WhatsApp Contact */
  whatsappPhone: getEnvString('VITE_WHATSAPP_PHONE', '1234567890'),
  whatsappDefaultMessage: getEnvString(
    'VITE_WHATSAPP_DEFAULT_MESSAGE',
    'Hello, I am interested in Mattespace Residences.'
  ),
  contactEmail: getEnvString('VITE_CONTACT_EMAIL', 'concierge@mattespace.com'),

  /** API Configuration */
  apiBaseUrl: getEnvString('VITE_API_BASE_URL', '/api/v1'),
  apiTimeoutMs: getEnvNumber('VITE_API_TIMEOUT_MS', 10000),
  enableMockApi: getEnvBoolean('VITE_ENABLE_MOCK_API', true),

  /** Hero Engine Settings */
  heroHoldDurationMs: getEnvNumber('VITE_HERO_HOLD_DURATION_MS', 450),
  heroMinPlaybackMs: getEnvNumber('VITE_HERO_MIN_PLAYBACK_MS', 400),

  /** Runtime Environment */
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
});

export default env;
