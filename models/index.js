import { readdirSync } from 'fs'
import { join } from 'path'
import { Schema } from 'mongoose'
import { logger } from '@middlewares/logger'
import { model } from '@libs/mongoDB'

const files = readdirSync(__dirname).filter(
  (file) => file.endsWith('.js') && file !== 'index.js'
)
const Models = {}

// 整合models
console.log(`processing models ...`)

files.forEach((file) => {
  const modelFile = require(join(__dirname, file))
  const schema = new Schema(modelFile.schema, modelFile.options || {})

  Models[modelFile.name] = model(modelFile.name, schema)
})

logger.info(`Models compiled`)

export default Models
