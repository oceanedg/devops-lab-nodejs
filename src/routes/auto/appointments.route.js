/**
 * Appointment routes (auto-mounted by src/app.js).
 *  - GET  /api/appointments -> list of all appointments
 *  - POST /api/appointments -> schedule a visit { doctorId, patientId, date }
 *      400 if a field is missing, 404 if the doctor or the patient does not exist
 */
import { Router } from 'express'
import { appointments, doctors, patients } from '../../data/hospital.js'

const router = Router()

router.get('/api/appointments', (_req, res) => {
  res.status(200).json(appointments)
})

router.post('/api/appointments', (req, res) => {
  const { doctorId, patientId, date } = req.body
  if (!doctorId || !patientId || !date) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (!doctors.some((d) => d.id === doctorId)) {
    return res.status(404).json({ error: 'Doctor not found' })
  }
  if (!patients.some((p) => p.id === patientId)) {
    return res.status(404).json({ error: 'Patient not found' })
  }
  const newAppointment = { id: appointments.length + 1, doctorId, patientId, date }
  appointments.push(newAppointment)
  res.status(201).json(newAppointment)
})

export default router
