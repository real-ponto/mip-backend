const R = require('ramda')

const LoginDomain = require('./')
const UserDomain = require('../user')

const { generateUser } = require('../../helpers/mockData/user')
const { UnauthorizedError } = require('../../helpers/errors')

const loginDomain = new LoginDomain()
const userDomain = new UserDomain()

describe('login-domain', () => {
  describe('logOnTest', () => {
    let userCreated = {}
    let counter = 0


    beforeEach(async () => {
      const userMock = generateUser(`login_domain${counter}`)
      counter += 1
      userCreated = await userDomain.createUser(userMock)
    })

    test('try login with correct account', async () => {
      const getUserLoginMock = R.applySpec({
        username: R.prop('username'),
        password: R.prop('username'),
      })

      const userLogin = getUserLoginMock(userCreated)

      const login = await loginDomain.login(userLogin)

      expect(login.user.username).toEqual(userLogin.username)
    })

    test('try login with incorrect password', async () => {
      const getUserLoginMock = R.applySpec({
        username: R.prop('username'),
      })

      let userLogin = getUserLoginMock(userCreated)

      userLogin = {
        ...userLogin,
        password: 'abcs',
      }

      await expect(loginDomain.login(userLogin))
        .rejects.toThrowError(new UnauthorizedError())
    })
  })
})
