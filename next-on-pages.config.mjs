export default {
  compatibilityDate: "2025-08-13",
  compatibilityFlags: ["nodejs_compat", "nodejs_compat_populate_process_env"],
  // Force Node.js compatibility for all environments
  nodejsCompat: true,
  // Additional compatibility settings
  compatibility: {
    nodejs: true,
    nodejs_compat: true
  }
};
