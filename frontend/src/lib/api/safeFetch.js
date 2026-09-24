/**
 * Wraps a non-critical data fetch (homepage teaser sections, etc.) so a
 * backend outage degrades that section gracefully instead of crashing
 * the whole page. Primary pages (e.g. /products) should let errors
 * propagate to the route's error boundary instead of using this.
 */
export async function safeFetch(promise, fallback) {
  try {
    return await promise;
  } catch (err) {
    console.error(`[safeFetch] ${err.message}`);
    return fallback;
  }
}
