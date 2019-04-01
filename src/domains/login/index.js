const database = require('../../database')

const User = database.model('user')
const Login = database.model('login')

class LoginDomain {
  async login({ username, password }, options = {}) {
    const { transaction = null } = options

    console.log(username)

    const user = await User.findOne({ where: { username } })

    console.log(user)
    return user
  }
}

module.exports = LoginDomain
