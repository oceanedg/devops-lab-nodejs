/**
 * Integration test for GET /api/metrics.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('GET /api/metrics', () => {
  it('returns application metrics', async () => {
    const res = await request(app).get('/api/metrics')

    expect(res.status).toBe(200)
    expect(res.body.status).toBe('healthy')
    expect(typeof res.body.uptime).toBe('number')
    expect(res.body.uptime).toBeGreaterThanOrEqual(0)
  })

  it('returns runtime and memory information', async () => {
    const res = await request(app).get('/api/metrics')

    expect(typeof res.body.runtime.node).toBe('string')
    expect(typeof res.body.runtime.platform).toBe('string')
    expect(typeof res.body.runtime.memoryUsage.rss).toBe('number')
    expect(typeof res.body.runtime.memoryUsage.heapUsed).toBe('number')
    expect(typeof res.body.runtime.memoryUsage.heapTotal).toBe('number')
  })
})
