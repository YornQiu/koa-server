const BaseDAO = require('@libs/baseDAO')
const Article = require('@models').article

class ArticleService extends BaseDAO {
  constructor(model) {
    super(model)
  }
}

module.exports = new ArticleService(Article)
