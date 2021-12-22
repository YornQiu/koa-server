import BaseDAO from '@libs/baseDAO'
import { user as User } from '@models'

class UserService extends BaseDAO {
  constructor(model) {
    super(model)
  }
}

export default new UserService(User)
