import BaseDAO from '#libs/baseDAO.js'
import models from '#models'

const { user } = models

class UserService extends BaseDAO {
  constructor(model) {
    super(model)
  }
}

export default new UserService(user)
