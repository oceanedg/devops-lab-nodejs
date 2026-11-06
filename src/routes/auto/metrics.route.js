/**
 * GET /api/metrics
 * Returns application uptime, runtime information and status.
 */
import { Router } from 'express'

const router = Router()

router.get('/api/metrics', (_req, res) => {
  const memory = process.memoryUsage()

  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    runtime: {
      node: process.version,
      platform: process.platform,
      memoryUsage: {
        rss: memory.rss,
        heapUsed: memory.heapUsed,
        heapTotal: memory.heapTotal
      }
    }
  })
})

export default router
