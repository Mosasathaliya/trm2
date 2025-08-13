/**
 * Force Node.js compatibility flags for Cloudflare Pages
 */
export default {
  compatibilityDate: "2025-08-13",
  compatibilityFlags: ["nodejs_compat", "nodejs_compat_populate_process_env"],
  // Explicit Node.js compatibility
  nodejsCompat: true,
  // Environment-specific settings
  env: {
    production: {
      compatibilityFlags: ["nodejs_compat", "nodejs_compat_populate_process_env"]
    },
    preview: {
      compatibilityFlags: ["nodejs_compat", "nodejs_compat_populate_process_env"]
    }
  }
};
