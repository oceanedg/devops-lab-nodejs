/**
 * Integration tests for the /api/doctors routes.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('Doctors API', () => {
  it('GET /api/doctors returns an array of doctors', async () => {
    const res = await request(app).get('/api/doctors')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('POST /api/doctors adds a new doctor', async () => {
    const res = await request(app)
      .post('/api/doctors')
      .send({ name: 'Dr. Paul Martin', specialty: 'Dermatology' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.name).toBe('Dr. Paul Martin')
    expect(res.body.specialty).toBe('Dermatology')
  })

  it('POST /api/doctors returns 400 when the specialty is missing', async () => {
    const res = await request(app).post('/api/doctors').send({ name: 'Dr. No Specialty' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing required fields')
  })

  it('POST /api/doctors returns 400 when the name is missing', async () => {
    const res = await request(app).post('/api/doctors').send({ specialty: 'Neurology' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing required fields')
  })
})
