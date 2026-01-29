/**
 * API Configuration
 * 
 * Central place for API URL and common fetch utilities.
 */

// API Base URL - reads from environment variable with fallback
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://ravel-api.dev.spawnlabs.run";

// Production URL (for reference)
// export const API_BASE_PROD = "https://ravel-api-152773804593.us-central1.run.app";

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
