const R = require('ramda')

const { FieldValidationError } = require('../../helpers/errors')

const database = require('../../database')

const User = database.model('user')
const Login = database.model('login')

class UserDomain {
  async createUser(bodyData, options = {}) {
    const userNotFormatted = R.omit(['id', 'password'], bodyData)

    const noHasUsername = R.not(R.has('username', userNotFormatted))

    if (noHasUsername) {
      throw new FieldValidationError([{
        field: 'username',
        message: 'username cannot be null',
      }])
    }

    const formatBody = R.evolve({
      username: R.pipe(
        R.toLower(),
        R.trim(),
      ),
    })

    const user = formatBody(userNotFormatted)

    const password = R.prop('username', user)

    const { transaction = null } = options

    const userFormatted = {
      ...user,
      login: {
        password,
      },
    }

    const optionsForCreate = {
      include: [Login],
      transaction,
    }
    const userCreated = await User.create(userFormatted, optionsForCreate)

    const userReturned = await User.findById(userCreated.id, {
      attributes: { exclude: ['loginId'] },
    })

    return userReturned
  }
}

module.exports = UserDomain
