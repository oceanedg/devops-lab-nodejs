/**
 * Integration tests for the /api/batches CRUD routes.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('Batch API', () => {
  it('GET /api/batches returns an array', async () => {
    const res = await request(app).get('/api/batches')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/batches/:id returns one item', async () => {
    const res = await request(app).get('/api/batches/1')
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(1)
  })

  it('GET /api/batches/:id returns 404 for an unknown id', async () => {
    const res = await request(app).get('/api/batches/999')
    expect(res.status).toBe(404)
  })

  it('POST /api/batches creates an item', async () => {
    const res = await request(app).post('/api/batches').send({ productId: 1, quantity: 10, expiryDate: '2026-11-30' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
  })

  it('POST /api/batches returns 400 when a field is missing', async () => {
    const res = await request(app).post('/api/batches').send({})
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing required fields')
  })

  it('PUT /api/batches/:id updates an item', async () => {
    const res = await request(app).put('/api/batches/1').send({ status: 'at-risk' })
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ status: 'at-risk' })
  })

  it('PUT /api/batches/:id returns 404 for an unknown id', async () => {
    const res = await request(app).put('/api/batches/999').send({ status: 'at-risk' })
    expect(res.status).toBe(404)
  })

  it('DELETE /api/batches/:id deletes an item', async () => {
    const created = await request(app).post('/api/batches').send({ productId: 1, quantity: 10, expiryDate: '2026-11-30' })
    const res = await request(app).delete('/api/batches/' + created.body.id)
    expect(res.status).toBe(204)
    const check = await request(app).get('/api/batches/' + created.body.id)
    expect(check.status).toBe(404)
  })

  it('DELETE /api/batches/:id returns 404 for an unknown id', async () => {
    const res = await request(app).delete('/api/batches/999')
    expect(res.status).toBe(404)
  })
})
