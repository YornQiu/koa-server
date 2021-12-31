const BaseDAO = require('@libs/baseDAO')
const { article } = require('@models')

class ArticleService extends BaseDAO {
  constructor(model) {
    super(model)
  }
}

module.exports = new ArticleService(article)
