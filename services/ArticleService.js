import BaseDAO from '@libs/baseDAO'
import { article } from '@models'

class ArticleService extends BaseDAO {
  constructor(model) {
    super(model)
  }
}

export default new ArticleService(article)
