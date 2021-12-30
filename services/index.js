const fs = require('fs')

const files = fs
  .readdirSync(__dirname)
  .filter((file) => file.endsWith('js') && file !== 'index.js')
const services = {}

console.log(`processing services ...`)

for (const file of files) {
  const service = require(`./${file}`)
  services[`${file.replace(/\.js/, '')}`] = service
}

logger.info('Services created')

module.exports = services
