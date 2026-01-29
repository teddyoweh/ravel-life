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
