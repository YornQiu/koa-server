import BaseDAO from '@libs/baseDAO'
import { comment } from '@models'

class CommentService extends BaseDAO {
  constructor(model) {
    super(model)
  }
}

export default new CommentService(comment)
