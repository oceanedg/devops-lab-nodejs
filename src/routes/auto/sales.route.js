/**
 * Sale CRUD routes (auto-mounted by src/app.js).
 *  - GET    /api/sales      -> list all
 *  - GET    /api/sales/:id  -> one item, or 404
 *  - POST   /api/sales      -> create, or 400 if a field is missing
 *  - PUT    /api/sales/:id  -> update, or 404
 *  - DELETE /api/sales/:id  -> delete (204), or 404
 */
import { Router } from 'express'
import { sales, nextId } from '../../data/freshtrack.js'

const router = Router()
const REQUIRED = ['batchId', 'quantity', 'price']

function findIndex (req) {
  const id = Number(req.params.id)
  return sales.findIndex((item) => item.id === id)
}

router.get('/api/sales', (_req, res) => {
  res.status(200).json(sales)
})

router.get('/api/sales/:id', (req, res) => {
  const index = findIndex(req)
  if (index === -1) return res.status(404).json({ error: 'Sale not found' })
  res.status(200).json(sales[index])
})

router.post('/api/sales', (req, res) => {
  const missing = REQUIRED.filter((field) => req.body[field] === undefined || req.body[field] === '')
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing })
  }
  const item = { id: nextId(sales) }
  for (const field of REQUIRED) item[field] = req.body[field]
  item.date = req.body.date || new Date().toISOString().slice(0, 10)
  sales.push(item)
  res.status(201).json(item)
})

router.put('/api/sales/:id', (req, res) => {
  const index = findIndex(req)
  if (index === -1) return res.status(404).json({ error: 'Sale not found' })
  const { id, ...changes } = req.body
  sales[index] = { ...sales[index], ...changes }
  res.status(200).json(sales[index])
})

router.delete('/api/sales/:id', (req, res) => {
  const index = findIndex(req)
  if (index === -1) return res.status(404).json({ error: 'Sale not found' })
  sales.splice(index, 1)
  res.status(204).end()
})

export default router
