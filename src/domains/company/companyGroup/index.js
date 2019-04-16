const R = require('ramda')
const { isUUID } = require('validator')

const { FieldValidationError } = require('../../../helpers/errors')

const database = require('../../../database')

const CompanyGroup = database.model('companyGroup')

class CompanyGroupDomain {
  // eslint-disable-next-line camelcase
  async companyGroup_Create(bodyData, options = {}) {
    const { transaction = null } = options

    const companyGroup = R.omit(['id'], bodyData)

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

  // eslint-disable-next-line camelcase
  async companyGroup_GetById(id, options = {}) {
    const { transaction = null } = options

    if (!id) {
      throw new FieldValidationError([{
        name: 'id',
        message: 'id cannot to be null',
      }])
    }

    if (!isUUID(id)) {
      throw new FieldValidationError([{
        name: 'id',
        message: 'id is invalid',
      }])
    }

    const companyGroupReturned = await CompanyGroup.findByPk(id, {
      transaction,
    })
    return companyGroupReturned
  }

  // eslint-disable-next-line camelcase
  async companyGroup_UpdateById(id, bodyData, options = {}) {
    const { transaction = null } = options
    const companyGroup = R.omit(['id'], bodyData)

    const hasGroupName = R.has('groupName', companyGroup)

    const hasDescription = R.has('description', companyGroup)

    let newCompanyGroup = {}

    if (hasGroupName) {
      newCompanyGroup = {
        ...newCompanyGroup,
        groupName: R.prop('groupName', companyGroup),
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
    }
    if (hasDescription) {
      newCompanyGroup = {
        ...newCompanyGroup,
        description: R.prop('description', companyGroup),
      }
    }
    const companyGroupInstance = await this.companyGroup_GetById(id, { transaction })

    await companyGroupInstance.update(newCompanyGroup)

    const companyGroupUpdated = await this.companyGroup_GetById(id, { transaction })

    return companyGroupUpdated
  }
}

module.exports = CompanyGroupDomain
