/**
 * Product CRUD routes (auto-mounted by src/app.js).
 *  - GET    /api/products      -> list all
 *  - GET    /api/products/:id  -> one item, or 404
 *  - POST   /api/products      -> create, or 400 if a field is missing
 *  - PUT    /api/products/:id  -> update, or 404
 *  - DELETE /api/products/:id  -> delete (204), or 404
 */
import { Router } from 'express'
import { products, nextId } from '../../data/freshtrack.js'

const router = Router()
const REQUIRED = ['name', 'category', 'barcode']

function findIndex (req) {
  const id = Number(req.params.id)
  return products.findIndex((item) => item.id === id)
}

router.get('/api/products', (_req, res) => {
  res.status(200).json(products)
})

router.get('/api/products/:id', (req, res) => {
  const index = findIndex(req)
  if (index === -1) return res.status(404).json({ error: 'Product not found' })
  res.status(200).json(products[index])
})

router.post('/api/products', (req, res) => {
  const missing = REQUIRED.filter((field) => req.body[field] === undefined || req.body[field] === '')
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing })
  }
  const item = { id: nextId(products) }
  for (const field of REQUIRED) item[field] = req.body[field]
  products.push(item)
  res.status(201).json(item)
})

router.put('/api/products/:id', (req, res) => {
  const index = findIndex(req)
  if (index === -1) return res.status(404).json({ error: 'Product not found' })
  const { id, ...changes } = req.body
  products[index] = { ...products[index], ...changes }
  res.status(200).json(products[index])
})

router.delete('/api/products/:id', (req, res) => {
  const index = findIndex(req)
  if (index === -1) return res.status(404).json({ error: 'Product not found' })
  products.splice(index, 1)
  res.status(204).end()
})

export default router
