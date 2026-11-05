/**
 * Batch CRUD routes (auto-mounted by src/app.js).
 *  - GET    /api/batches      -> list all
 *  - GET    /api/batches/:id  -> one item, or 404
 *  - POST   /api/batches      -> create, or 400 if a field is missing
 *  - PUT    /api/batches/:id  -> update, or 404
 *  - DELETE /api/batches/:id  -> delete (204), or 404
 */
import { Router } from 'express'
import { batches, nextId } from '../../data/freshtrack.js'

const router = Router()
const REQUIRED = ['productId', 'quantity', 'expiryDate']

function findIndex (req) {
  const id = Number(req.params.id)
  return batches.findIndex((item) => item.id === id)
}

router.get('/api/batches', (_req, res) => {
  res.status(200).json(batches)
})

router.get('/api/batches/:id', (req, res) => {
  const index = findIndex(req)
  if (index === -1) return res.status(404).json({ error: 'Batch not found' })
  res.status(200).json(batches[index])
})

router.post('/api/batches', (req, res) => {
  const missing = REQUIRED.filter((field) => req.body[field] === undefined || req.body[field] === '')
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing })
  }
  const item = { id: nextId(batches) }
  for (const field of REQUIRED) item[field] = req.body[field]
  item.status = req.body.status || 'in-stock'
  batches.push(item)
  res.status(201).json(item)
})

router.put('/api/batches/:id', (req, res) => {
  const index = findIndex(req)
  if (index === -1) return res.status(404).json({ error: 'Batch not found' })
  const { id, ...changes } = req.body
  batches[index] = { ...batches[index], ...changes }
  res.status(200).json(batches[index])
})

router.delete('/api/batches/:id', (req, res) => {
  const index = findIndex(req)
  if (index === -1) return res.status(404).json({ error: 'Batch not found' })
  batches.splice(index, 1)
  res.status(204).end()
})

export default router
