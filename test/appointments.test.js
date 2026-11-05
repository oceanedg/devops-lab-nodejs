/**
 * Integration tests for the /api/appointments routes.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('Appointments API', () => {
  it('GET /api/appointments returns an array', async () => {
    const res = await request(app).get('/api/appointments')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/appointments schedules a visit', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .send({ doctorId: 1, patientId: 2, date: '2026-11-20' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
  })

  it('POST /api/appointments returns 400 when a field is missing', async () => {
    const res = await request(app).post('/api/appointments').send({ doctorId: 1 })
    expect(res.status).toBe(400)
  })

  it('POST /api/appointments returns 404 for an unknown doctor', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .send({ doctorId: 99, patientId: 1, date: '2026-11-20' })
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Doctor not found')
  })

  it('POST /api/appointments returns 404 for an unknown patient', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .send({ doctorId: 1, patientId: 99, date: '2026-11-20' })
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Patient not found')
  })
})
