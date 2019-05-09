const R = require('ramda')
const Cnpj = require('@fnando/cnpj/dist/node')

const { FieldValidationError } = require('../../../helpers/errors')
const database = require('../../../database')

const AddressDomain = require('../../address')

const Comapany = database.model('company')
const ComapanyGroup = database.model('companyGroup')
const Address = database.model('address')
const CompanyContact = database.model('companyContact')
const Contact = database.model('contact')

const addressDomain = new AddressDomain()

class companyDomain {
  // eslint-disable-next-line camelcase
  async company_Create(bodyData, options = {}) {
    const { transaction = null } = options

    let company = R.omit(['id', 'address'], bodyData)

    // eslint-disable-next-line no-underscore-dangle
    const companyNotHas = R.not(R.has(R.__, company))


    if (companyNotHas('address')) {
      throw new FieldValidationError([{
        field: 'address',
        message: 'address cannot be null',
      }])
    }

    const { address } = bodyData

    // type Validations
    if (companyNotHas('type')
          || company.type !== 'unit'
          || company.type !== 'master'
          || company.type !== 'branch') {
      throw new FieldValidationError([{
        field: 'type',
        message: 'type need is a valid value',
      }])
    }

    // razao Social validations
    if (company.type !== 'unit') {
      if (companyNotHas('razaoSocial') || !company.razaoSocial) {
        throw new FieldValidationError([{
          field: 'razaoSocial',
          message: 'razaoSocial cannot be null',
        }])
      }
      const companyReturned = await Comapany.findOne({
        where: { razaoSocial: company.razaoSocial },
        transaction,
      })

      if (companyReturned) {
        throw new FieldValidationError([{
          field: 'razaoSocial',
          message: 'razaoSocial already exists',
        }])
      }
    }

    // name Validations
    if (companyNotHas('name') || !company.name) {
      throw new FieldValidationError([{
        field: 'name',
        message: 'name cannot be null',
      }])
    } else {
      const companyReturned = await Comapany.findOne({
        where: { name: company.name },
        transaction,
      })

      if (companyReturned) {
        throw new FieldValidationError([{
          field: 'name',
          message: 'name already exists',
        }])
      }
    }


    // IE validations
    if (companyNotHas('stateRegistration') || !company.stateRegistration) {
      if (company.type === 'unit') {
        company = {
          ...company,
          stateRegistration: 'unit',
        }
      } else {
        company = {
          ...company,
          stateRegistration: 'isento',
        }
      }
    }

    // cnpj Validations
    if (company.type !== 'unit') {
      if (companyNotHas('cnpj') || !company.cnpj) {
        throw new FieldValidationError([{
          field: 'cnpj',
          message: 'cnpj cannot to be null',
        }])
      }

      if (!Cnpj.isValid(company.cnpj)) {
        throw new FieldValidationError([{
          field: 'cnpj',
          message: 'cnpj is invalid',
        }])
      }

      const companyReturned = await Comapany.findOne({
        where: { cnpj: company.cnpj },
        transaction,
      })

      if (companyReturned) {
        throw new FieldValidationError([{
          field: 'cnpj',
          message: 'cnpj already exists',
        }])
      }
    }

    await addressDomain.add(address, { transaction })

    const companyCreated = await Comapany.create(company, { transaction })

    const response = await Comapany.findByPk(companyCreated.id, {
      include: [{
        model: ComapanyGroup,
      },
      {
        model: Address,
      },
      {
        model: CompanyContact,
        include: [{
          model: Contact,
        }],
      }],
      transaction,
    })

    return response
  }
}

export default companyDomain
