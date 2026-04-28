/**
 * PSS-14 scoring (Remor & Carrobles, 2001)
 * Inverse items (1-indexed): 4, 5, 6, 7, 9, 10, 13 → 0-indexed: 3,4,5,6,8,9,12
 */
export function computePSS(items: number[]): number {
  const inverseIdx = new Set([3, 4, 5, 6, 8, 9, 12]);
  return items.reduce((sum, val, i) => sum + (inverseIdx.has(i) ? 4 - val : val), 0);
}

/**
 * DASS-21 subscales (Lovibond & Lovibond; adaptación española Bados et al., 2005)
 * All 0-indexed from the 21-item array.
 *
 * Depression items (D3,D5,D10,D13,D16,D17,D21) → idx [2,4,9,12,15,16,20]
 * Anxiety items   (D2,D4,D7,D9,D15,D19,D20)    → idx [1,3,6,8,14,18,19]
 * Stress items    (D1,D6,D8,D11,D12,D14,D18)   → idx [0,5,7,10,11,13,17]
 */
export function computeDASS(items: number[]): {
  depression: number;
  anxiety: number;
  stress: number;
} {
  const depressionIdx = [2, 4, 9, 12, 15, 16, 20];
  const anxietyIdx    = [1, 3, 6, 8, 14, 18, 19];
  const stressIdx     = [0, 5, 7, 10, 11, 13, 17];

  const sum = (idxs: number[]) => idxs.reduce((s, i) => s + items[i], 0);

  return {
    depression: sum(depressionIdx),
    anxiety:    sum(anxietyIdx),
    stress:     sum(stressIdx),
  };
}
