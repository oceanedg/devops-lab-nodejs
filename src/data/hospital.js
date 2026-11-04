/**
 * In-memory data shared by the healthcare routes (no database yet).
 */
export const doctors = [
  { id: 1, name: 'Dr. Sarah Lee', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Amir Khan', specialty: 'Pediatrics' }
]

export const patients = [
  { id: 1, name: 'Alice Martin', age: 34 },
  { id: 2, name: 'John Smith', age: 45 }
]

export const appointments = [
  { id: 1, doctorId: 1, patientId: 1, date: '2026-11-15' }
]
