/**
 * Patient Management routes (auto-mounted by src/app.js).
 *  - GET  /api/patients      -> list of all patients
 *  - GET  /api/patients/:id  -> one patient, or 404 if it does not exist
 *  - POST /api/patients      -> add a patient { name, age }, or 400 if a field is missing
 */
import { Router } from 'express'
import { patients } from '../../data/hospital.js'

const router = Router()

router.get('/api/patients', (_req, res) => {
  res.status(200).json(patients)
})

router.get('/api/patients/:id', (req, res) => {
  const id = Number(req.params.id)
  const patient = patients.find((p) => p.id === id)
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' })
  }
  res.status(200).json(patient)
})

router.post('/api/patients', (req, res) => {
  const { name, age } = req.body
  if (!name || age === undefined) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (typeof age !== 'number' || age < 0) {
    return res.status(400).json({ error: 'Age must be a positive number' })
  }
  const newPatient = { id: patients.length + 1, name, age }
  patients.push(newPatient)
  res.status(201).json(newPatient)
})

export default router
