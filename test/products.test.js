/**
 * Integration tests for the /api/products CRUD routes.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('Product API', () => {
  it('GET /api/products returns an array', async () => {
    const res = await request(app).get('/api/products')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/products/:id returns one item', async () => {
    const res = await request(app).get('/api/products/1')
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(1)
  })

  it('GET /api/products/:id returns 404 for an unknown id', async () => {
    const res = await request(app).get('/api/products/999')
    expect(res.status).toBe(404)
  })

  it('POST /api/products creates an item', async () => {
    const res = await request(app).post('/api/products').send({ name: 'Fresh salmon 200g', category: 'Fish', barcode: '3560070912345' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
  })

  it('POST /api/products returns 400 when a field is missing', async () => {
    const res = await request(app).post('/api/products').send({})
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing required fields')
  })

  it('PUT /api/products/:id updates an item', async () => {
    const res = await request(app).put('/api/products/1').send({ category: 'Fresh fish' })
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ category: 'Fresh fish' })
  })

  it('PUT /api/products/:id returns 404 for an unknown id', async () => {
    const res = await request(app).put('/api/products/999').send({ category: 'Fresh fish' })
    expect(res.status).toBe(404)
  })

  it('DELETE /api/products/:id deletes an item', async () => {
    const created = await request(app).post('/api/products').send({ name: 'Fresh salmon 200g', category: 'Fish', barcode: '3560070912345' })
    const res = await request(app).delete('/api/products/' + created.body.id)
    expect(res.status).toBe(204)
    const check = await request(app).get('/api/products/' + created.body.id)
    expect(check.status).toBe(404)
  })

  it('DELETE /api/products/:id returns 404 for an unknown id', async () => {
    const res = await request(app).delete('/api/products/999')
    expect(res.status).toBe(404)
  })
})
