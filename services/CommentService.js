import BaseDAO from '#libs/baseDAO.js'
import models from '#models'

const { comment } = models

class CommentService extends BaseDAO {
  constructor(model) {
    super(model)
  }
}

export default new CommentService(comment)
