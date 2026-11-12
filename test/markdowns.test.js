/**
 * Integration tests for the /api/markdowns CRUD routes.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('Markdown API', () => {
  it('GET /api/markdowns returns an array', async () => {
    const res = await request(app).get('/api/markdowns')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/markdowns/:id returns one item', async () => {
    const res = await request(app).get('/api/markdowns/1')
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(1)
  })

  it('GET /api/markdowns/:id returns 404 for an unknown id', async () => {
    const res = await request(app).get('/api/markdowns/999')
    expect(res.status).toBe(404)
  })

  it('POST /api/markdowns creates an item', async () => {
    const res = await request(app).post('/api/markdowns').send({ batchId: 1, discountRate: 20 })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
  })

  it('POST /api/markdowns returns 400 when a field is missing', async () => {
    const res = await request(app).post('/api/markdowns').send({})
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing required fields')
  })

  it('POST /api/markdowns returns 400 when the batch already has a markdown', async () => {
    const res = await request(app).post('/api/markdowns').send({ batchId: 2, discountRate: 40 })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('This batch already has a markdown')
  })

  it('PUT /api/markdowns/:id updates an item', async () => {
    const res = await request(app).put('/api/markdowns/1').send({ status: 'applied' })
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ status: 'applied' })
  })

  it('PUT /api/markdowns/:id returns 404 for an unknown id', async () => {
    const res = await request(app).put('/api/markdowns/999').send({ status: 'applied' })
    expect(res.status).toBe(404)
  })

  it('DELETE /api/markdowns/:id deletes an item', async () => {
    const created = await request(app).post('/api/markdowns').send({ batchId: 3, discountRate: 20 })
    const res = await request(app).delete('/api/markdowns/' + created.body.id)
    expect(res.status).toBe(204)
    const check = await request(app).get('/api/markdowns/' + created.body.id)
    expect(check.status).toBe(404)
  })

  it('DELETE /api/markdowns/:id returns 404 for an unknown id', async () => {
    const res = await request(app).delete('/api/markdowns/999')
    expect(res.status).toBe(404)
  })
})
