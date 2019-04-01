const R = require('ramda')

const { FieldValidationError } = require('../../helpers/errors')
const { generateUser } = require('../../helpers/mockData/user')
const UserDomain = require('./')


const userDomain = new UserDomain()

describe('user-domain', () => {
  describe('createUser', () => {
    test('correct data', async () => {
      const userMock = generateUser('create_user_domain')

      const userCreated = await userDomain.createUser(userMock)

      expect(userCreated.username).toEqual(userMock.username)
      expect(userCreated.email).toEqual(userMock.email)

      expect(userCreated).not.toHaveProperty('login')
      expect(userCreated).not.toHaveProperty('password')
    })

    test('omit username', async () => {
      const userMock = R.omit(['username'], generateUser('create_user_domain'))

      await expect(userDomain.createUser(userMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'username',
          message: 'username cannot be null',
        }]))
    })
  })
})
