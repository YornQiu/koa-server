// const router = require('@koa/router')()
const router = require('@/libs/koa-router')()
const controllers = require('@controllers')

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

module.exports = router
