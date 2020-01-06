const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { logger } = require('../middlewares/logger')
const mongo = require('../lib/mongoDB');

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && file !== 'index.js')
const Models = {}

// 整合models
console.log(`process models ...`)

files.forEach((file) => {
	const modelFile = require(path.join(__dirname, file));
	const schema = new mongoose.Schema(modelFile.schema);

	Models[modelFile.name] = mongo.model(modelFile.name, schema);
});

logger.info(`Models created`)

module.exports = Models;
