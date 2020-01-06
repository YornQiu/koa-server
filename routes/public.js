const router = require('koa-router')()
const controllers = require('../controllers')
const { logger } = require('../middlewares/logger')

/**
 * 公开接口，可直接访问
 */
for (const url in controllers) {
  const delimiter = url.indexOf(' ');
  const method = url.slice(0, delimiter);
  const path = url.slice(delimiter + 1);

  if (path.startsWith('/api')) {
    switch (method) {
      case 'GET':
        router.get(path, controllers[url]);
        break;
      case 'POST':
        router.post(path, controllers[url]);
        break;
      case 'PUT':
        router.put(path, controllers[url]);
        break;
      case 'DELETE':
        router.del(path, controllers[url]);
        break;
      default:
        logger.info(`invalid URL: ${url}`);
        break;
    }
  }
}

logger.info('Public routes registered')

module.exports = router
