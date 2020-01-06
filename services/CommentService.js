const BaseDAO = require('../lib/baseDAO')
const Comment = require('../models').comment

class CommentService extends BaseDAO {
  constructor(model) {
    super(model)
  }

}

module.exports = new CommentService(Comment)
