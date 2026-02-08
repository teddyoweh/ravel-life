/**
 * API Configuration
 * 
 * Central place for API URL and common fetch utilities.
 */

/// Production API URL - Cloud Run deployment
const PRODUCTION_URL = "https://ravel-api-152773804593.us-central1.run.app";

/// Local dev URL - uses Cloudflare tunnel for local development
const LOCAL_URL = "https://ravel-api.dev.spawnlabs.run";

/// Whether to use local server (set to true for local development)
const USE_LOCAL_SERVER = false;

// API Base URL - toggle above or override with env var
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || (USE_LOCAL_SERVER ? LOCAL_URL : PRODUCTION_URL);

/**
 * Sanitize image URLs from the API.
 * Converts raw s3:// protocol URLs to proper https:// URLs.
 * Returns null for empty/invalid URLs.
 */
export function sanitizeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  // Convert s3://bucket/key → https://bucket.s3.amazonaws.com/key
  if (url.startsWith("s3://")) {
    const withoutProtocol = url.slice(5); // remove "s3://"
    const slashIndex = withoutProtocol.indexOf("/");
    if (slashIndex === -1) return null;
    const bucket = withoutProtocol.slice(0, slashIndex);
    const key = withoutProtocol.slice(slashIndex + 1);
    return `https://${bucket}.s3.amazonaws.com/${key}`;
  }

  // Already a valid URL
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return null;
}

/**
 * Fetch JSON from API with error handling
 */
export async function fetchAPI<T>(
  path: string,
  options?: RequestInit & { revalidate?: number }
): Promise<T | null> {
  try {
    const { revalidate, ...fetchOptions } = options || {};
    
    const res = await fetch(`${API_BASE}${path}`, {
      ...fetchOptions,
      next: revalidate !== undefined ? { revalidate } : undefined,
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch {
    return null;
  }
}
