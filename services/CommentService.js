const BaseDAO = require('@libs/baseDAO')
const { comment } = require('@models')

class CommentService extends BaseDAO {
  constructor(model) {
    super(model)
  }
}

module.exports = new CommentService(comment)
