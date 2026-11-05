/**
 * Doctor Management routes (auto-mounted by src/app.js).
 *  - GET  /api/doctors -> list of all doctors
 *  - POST /api/doctors -> add a doctor { name, specialty }, or 400 if a field is missing
 */
import { Router } from 'express'
import { doctors } from '../../data/hospital.js'

const router = Router()

router.get('/api/doctors', (_req, res) => {
  res.status(200).json(doctors)
})

router.post('/api/doctors', (req, res) => {
  const { name, specialty } = req.body
  if (!name || !specialty) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  const newDoctor = { id: doctors.length + 1, name, specialty }
  doctors.push(newDoctor)
  res.status(201).json(newDoctor)
})

export default router
