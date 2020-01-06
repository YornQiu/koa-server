const fs = require('fs')
const { logger } = require('../middlewares/logger')

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('js') && file !== 'index.js')
const services = {}

console.log(`process services ...`)

for (const file of files) {
  const service = require(`./${file}`)
  services[`${file.replace(/\.js/, '')}`] = service
}

logger.info('Services created')

module.exports = services
