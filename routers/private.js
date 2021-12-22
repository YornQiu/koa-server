import koaRouter from '@koa/router'
import controllers from '@controllers/AdminControllers'
import { logger } from '@middlewares/logger'
import { verify } from '@middlewares/jwt'

const router = new koaRouter()
const { methods } = router
router.prefix('/api')
router.use(verify)

/**
 * 校验接口，进行登录验证后才能访问
 */
for (const url in controllers) {
  const [method, path] = url.split(' ')
  if (methods.includes(method)) {
    router[method.toLocaleLowerCase()](path, controllers[url])
  } else {
    logger.error(`Invalid URL: ${url}`)
  }
}

logger.info('Private routes registered')

export default router
