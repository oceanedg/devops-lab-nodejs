/**
 * In-memory data of the FreshTrack API (no database yet).
 * Product -> Batch -> Markdown / Sale
 */
export const products = [
  { id: 1, name: 'Organic yogurt 4x125g', category: 'Dairy', barcode: '3017620422003' },
  { id: 2, name: 'Sliced ham 4 slices', category: 'Deli', barcode: '3266980013411' }
]

export const batches = [
  { id: 1, productId: 1, quantity: 24, expiryDate: '2026-11-20', status: 'in-stock' },
  { id: 2, productId: 2, quantity: 12, expiryDate: '2026-11-12', status: 'at-risk' }
]

export const markdowns = [
  { id: 1, batchId: 2, discountRate: 30, status: 'proposed' }
]

export const sales = [
  { id: 1, batchId: 1, quantity: 3, price: 2.49, date: '2026-11-05' }
]

/** Next free id for a collection (ids are never reused after a delete). */
export function nextId (list) {
  return list.reduce((max, item) => Math.max(max, item.id), 0) + 1
}
