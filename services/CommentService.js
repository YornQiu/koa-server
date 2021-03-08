const BaseDAO = require('@libs/baseDAO')
const Comment = require('../models').comment

class CommentService extends BaseDAO {
  constructor(model) {
    super(model)
  }

}

module.exports = new CommentService(Comment)
