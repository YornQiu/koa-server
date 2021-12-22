import { readdirSync } from 'fs'
import { logger } from '@middlewares/logger'

const files = readdirSync(__dirname).filter(
  (file) => file.endsWith('js') && file !== 'index.js'
)
const services = {}

console.log(`processing services ...`)

for (const file of files) {
  const service = require(`./${file}`)
  services[`${file.replace(/\.js/, '')}`] = service
}

logger.info('Services created')

export default services
