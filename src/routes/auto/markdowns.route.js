/**
 * Markdown CRUD routes (auto-mounted by src/app.js).
 *  - GET    /api/markdowns      -> list all
 *  - GET    /api/markdowns/:id  -> one item, or 404
 *  - POST   /api/markdowns      -> create, or 400 if a field is missing
 *  - PUT    /api/markdowns/:id  -> update, or 404
 *  - DELETE /api/markdowns/:id  -> delete (204), or 404
 */
import { Router } from 'express'
import { markdowns, nextId } from '../../data/freshtrack.js'

const router = Router()
const REQUIRED = ['batchId', 'discountRate']

function findIndex (req) {
  const id = Number(req.params.id)
  return markdowns.findIndex((item) => item.id === id)
}

router.get('/api/markdowns', (_req, res) => {
  res.status(200).json(markdowns)
})

router.get('/api/markdowns/:id', (req, res) => {
  const index = findIndex(req)
  if (index === -1) return res.status(404).json({ error: 'Markdown not found' })
  res.status(200).json(markdowns[index])
})

router.post('/api/markdowns', (req, res) => {
  const missing = REQUIRED.filter((field) => req.body[field] === undefined || req.body[field] === '')
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing })
  }
  const item = { id: nextId(markdowns) }
  for (const field of REQUIRED) item[field] = req.body[field]
  item.status = req.body.status || 'proposed'
  markdowns.push(item)
  res.status(201).json(item)
})

router.put('/api/markdowns/:id', (req, res) => {
  const index = findIndex(req)
  if (index === -1) return res.status(404).json({ error: 'Markdown not found' })
  const { id, ...changes } = req.body
  markdowns[index] = { ...markdowns[index], ...changes }
  res.status(200).json(markdowns[index])
})

router.delete('/api/markdowns/:id', (req, res) => {
  const index = findIndex(req)
  if (index === -1) return res.status(404).json({ error: 'Markdown not found' })
  markdowns.splice(index, 1)
  res.status(204).end()
})

export default router
