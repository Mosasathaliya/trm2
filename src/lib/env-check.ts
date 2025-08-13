/**
 * Utility to check environment variables and provide helpful messages
 */

export function checkCloudflareCredentials() {
  const hasAccountId = !!process.env.CLOUDFLARE_ACCOUNT_ID;
  const hasApiToken = !!process.env.CLOUDFLARE_API_TOKEN;
  
  if (!hasAccountId || !hasApiToken) {
    console.warn('⚠️  Cloudflare AI credentials missing:');
    if (!hasAccountId) console.warn('   - CLOUDFLARE_ACCOUNT_ID not set');
    if (!hasApiToken) console.warn('   - CLOUDFLARE_API_TOKEN not set');
    console.warn('   AI features will use placeholder content during build');
    console.warn('   Set these in Cloudflare Pages environment variables for production');
    return false;
  }
  
  console.log('✅ Cloudflare AI credentials found');
  return true;
}

export function isBuildTime() {
  return typeof window === 'undefined';
}

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}
