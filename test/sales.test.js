/**
 * Integration tests for the /api/sales CRUD routes.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('Sale API', () => {
  it('GET /api/sales returns an array', async () => {
    const res = await request(app).get('/api/sales')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/sales/:id returns one item', async () => {
    const res = await request(app).get('/api/sales/1')
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(1)
  })

  it('GET /api/sales/:id returns 404 for an unknown id', async () => {
    const res = await request(app).get('/api/sales/999')
    expect(res.status).toBe(404)
  })

  it('POST /api/sales creates an item', async () => {
    const res = await request(app).post('/api/sales').send({ batchId: 1, quantity: 2, price: 1.99 })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
  })

  it('POST /api/sales returns 400 when a field is missing', async () => {
    const res = await request(app).post('/api/sales').send({})
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing required fields')
  })

  it('PUT /api/sales/:id updates an item', async () => {
    const res = await request(app).put('/api/sales/1').send({ quantity: 4 })
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ quantity: 4 })
  })

  it('PUT /api/sales/:id returns 404 for an unknown id', async () => {
    const res = await request(app).put('/api/sales/999').send({ quantity: 4 })
    expect(res.status).toBe(404)
  })

  it('DELETE /api/sales/:id deletes an item', async () => {
    const created = await request(app).post('/api/sales').send({ batchId: 1, quantity: 2, price: 1.99 })
    const res = await request(app).delete('/api/sales/' + created.body.id)
    expect(res.status).toBe(204)
    const check = await request(app).get('/api/sales/' + created.body.id)
    expect(check.status).toBe(404)
  })

  it('DELETE /api/sales/:id returns 404 for an unknown id', async () => {
    const res = await request(app).delete('/api/sales/999')
    expect(res.status).toBe(404)
  })
})
