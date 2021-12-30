import BaseDAO from '#libs/baseDAO.js'
import models from '#models'

const { article } = models

class ArticleService extends BaseDAO {
  constructor(model) {
    super(model)
  }
}

export default new ArticleService(article)
