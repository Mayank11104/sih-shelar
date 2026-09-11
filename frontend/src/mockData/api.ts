// Simulated async API layer — adds realistic delay so the UI shows loading states.
// Every screen uses this instead of instant data rendering.

export async function fetchMockData<T>(
  data: T,
  delayMs: number = 900,
): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}

// Simulate a rate-limited or failed call (use sparingly for demo error states)
export async function fetchWithErrorChance<T>(
  data: T,
  delayMs: number = 900,
  errorChance: number = 0, // 0 = never fails, 0.2 = 20% chance
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < errorChance) {
        reject(new Error('Network error — please try again.'));
      } else {
        resolve(data);
      }
    }, delayMs);
  });
}
