const router = require('koa-router')()
const controllers = require('@controllers/AdminControllers')
const { logger } = require('@middlewares/logger')
const { verify } = require('@middlewares/jwt')

router.use(verify)

const { methods } = router
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

module.exports = router
