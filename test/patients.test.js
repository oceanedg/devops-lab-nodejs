/**
 * Integration tests for the /api/patients routes.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('Patients API', () => {
  it('GET /api/patients returns an array of patients', async () => {
    const res = await request(app).get('/api/patients')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('GET /api/patients/:id returns one patient', async () => {
    const res = await request(app).get('/api/patients/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('name')
  })

  it('GET /api/patients/:id returns 404 for an unknown patient', async () => {
    const res = await request(app).get('/api/patients/999')
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Patient not found')
  })

  it('POST /api/patients adds a new patient', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({ name: 'Marie Dupont', age: 29 })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.name).toBe('Marie Dupont')
  })

  it('POST /api/patients returns 400 when a field is missing', async () => {
    const res = await request(app).post('/api/patients').send({ name: 'No Age' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing required fields')
  })

  it('POST /api/patients returns 400 when the age is not valid', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({ name: 'Bad Age', age: -5 })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Age must be a positive number')
  })
})
