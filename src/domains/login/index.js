const database = require('../../database')

const User = database.model('user')
const Login = database.model('login')

class LoginDomain {
  async login({ username, password }, options = {}) {
    const { transaction = null } = options


    const user = await User.findOne({ where: { username } })

    return user
  }
}

module.exports = LoginDomain
