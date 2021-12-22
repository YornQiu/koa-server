import koaRouter from '@koa/router'
import controllers from '@controllers'
import { logger } from '@middlewares/logger'

const router = new koaRouter()
const { methods } = router
router.prefix('/api')

/**
 * 公开接口，可直接访问
 */
for (const url in controllers) {
  const [method, path] = url.split(' ')
  if (methods.includes(method)) {
    router[method.toLocaleLowerCase()](path, controllers[url])
  } else {
    logger.error(`Invalid URL: ${url}`)
  }
}

logger.info('Public routes registered')

export default router
