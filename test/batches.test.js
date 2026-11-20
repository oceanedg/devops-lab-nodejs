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
    const res = await request(app).post('/api/batches').send({ productId: 1, quantity: 10, expiryDate: '2030-01-31' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
  })

  it('POST /api/batches returns 400 when a field is missing', async () => {
    const res = await request(app).post('/api/batches').send({})
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing required fields')
  })

  it('POST /api/batches returns 400 when the expiry date is in the past', async () => {
    const res = await request(app).post('/api/batches').send({ productId: 1, quantity: 10, expiryDate: '2020-01-01' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Expiry date is in the past')
  })

  it('GET /api/batches?status=at-risk returns only at-risk batches', async () => {
    const res = await request(app).get('/api/batches?status=at-risk')
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body.every((item) => item.status === 'at-risk')).toBe(true)
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
    const created = await request(app).post('/api/batches').send({ productId: 1, quantity: 10, expiryDate: '2030-01-31' })
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
