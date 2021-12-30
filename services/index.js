import { readdirSync } from 'fs'

const __dirname = new URL('.', import.meta.url).pathname

const files = readdirSync(__dirname).filter(
  (file) => file.endsWith('js') && file !== 'index.js'
)
const services = {}

console.log(`processing services ...`)

files.forEach(async (file) => {
  const { default: service } = await import(`./${file}`)
  services[`${file.replace(/\.js/, '')}`] = service
})

logger.info('Services created')

export default services
