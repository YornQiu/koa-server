import koaRouter from '#libs/koa-router.js'
import controllers from '#controllers'

const router = new koaRouter()
const { methods } = router

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
