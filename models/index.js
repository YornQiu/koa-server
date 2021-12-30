import { readdirSync } from 'fs'
import Mongoose from 'mongoose'

const { Schema, model } = Mongoose
const __dirname = new URL('.', import.meta.url).pathname

const files = readdirSync(__dirname).filter(
  (file) => file.endsWith('.js') && file !== 'index.js'
)
const Models = {}

// 整合models
console.log(`processing models ...`)

files.forEach(async (file) => {
  const { default: modelFile } = await import(`./${file}`)
  const schema = new Schema(modelFile.schema, modelFile.options || {})

  Models[modelFile.name] = model(modelFile.name, schema)
})

logger.info(`Models compiled`)

export default Models
