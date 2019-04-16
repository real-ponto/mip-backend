const R = require('ramda')

const { FieldValidationError } = require('../../helpers/errors')

const database = require('../../database')

const CompanyGroup = database.model('companyGroup')

class CompanyGroupDomain {
  // eslint-disable-next-line camelcase
  async companyGroup_Create(bodydata, options = {}) {
    const { transaction = null } = options

    const companyGroup = R.omit(['id'], bodydata)

    const hasGroupName = R.has('groupName', companyGroup)

    const hasDescription = R.has('description', companyGroup)

    if (!hasGroupName || !companyGroup.groupName) {
      throw new FieldValidationError([{
        field: 'groupName',
        message: 'groupName cannot be null exist',
      }])
    }

    const groupName = await CompanyGroup.findOne({
      where: {
        groupName: companyGroup.groupName,
      },
      transaction,
    })

    if (groupName) {
      throw new FieldValidationError([{
        field: 'groupName',
        message: 'groupName already exist',
      }])
    }

    if (!hasDescription || !companyGroup.description) {
      throw new FieldValidationError([{
        field: 'description',
        message: 'description cannot be null exist',
      }])
    }

    const companyGroupCreated = await CompanyGroup.create(companyGroup, {
      transaction,
    })

    const companyGroupReturned = await CompanyGroup.findByPk(
      companyGroupCreated.id, {
        transaction,
      },
    )
    return companyGroupReturned
  }
}

module.exports = CompanyGroupDomain
