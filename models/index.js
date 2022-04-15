const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const mongo = require('@libs/mongoDB')

const files = fs.readdirSync(__dirname).filter((file) => file.endsWith('.js') && file !== 'index.js')
const Models = {}

// 整合models
console.log(`processing models ...`)

for (const file of files) {
  const model = require(path.join(__dirname, file))
  const schema = new mongoose.Schema(model.schema, model.options || {})

  Models[model.name] = mongo.model(model.name, schema)
}

logger.info(`Models compiled`)

module.exports = Models
