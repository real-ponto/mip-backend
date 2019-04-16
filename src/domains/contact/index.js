const R = require('ramda')
const { isUUID } = require('validator')

const { FieldValidationError } = require('../../helpers/errors')

const database = require('../../database')

const Contact = database.model('contact')

class ContactDomain {
  // eslint-disable-next-line camelcase
  async contact_Create(bodyData, options = {}) {
    const { transaction = null } = options

    const contact = R.omit(['id'], bodyData)

    const HasName = R.has(['name'], contact)

    const HasEmail = R.has(['email'], contact)

    const HasPhone = R.has(['phone'], contact)

    if (!HasName || !contact.name) {
      throw new FieldValidationError([{
        field: 'name',
        message: 'name cannot be null',
      }])
    }

    if (!HasEmail || !contact.email) {
      throw new FieldValidationError([{
        field: 'email',
        message: 'email cannot be null',
      }])
    }

    if (!HasPhone || !contact.phone) {
      throw new FieldValidationError([{
        field: 'phone',
        message: 'phone cannot be null',
      }])
    }

    const contactCreated = await Contact.create(contact, {
      transaction,
    })

    const chipReturned = await Contact.findByPk(
      contactCreated.id, {
        transaction,
      },
    )

    return chipReturned
  }

  // eslint-disable-next-line camelcase
  async contact_GetById(id, options = {}) {
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

    const contactReturned = await Contact.findByPk(id, {
      transaction,
    })
    return contactReturned
  }

  // eslint-disable-next-line camelcase
  async contact_UpdateById(id, bodyData, options = {}) {
    const { transaction = null } = options

    const contact = R.omit(['id'], bodyData)

    const hasName = R.has('name', contact)

    const hasEmail = R.has('email', contact)

    const hasPhone = R.has('phone', contact)

    let newContact = {}

    if (hasName) {
      newContact = {
        ...newContact,
        name: R.prop('name', contact),
      }
    }

    if (hasEmail) {
      newContact = {
        ...newContact,
        email: R.prop('email', contact),
      }
    }

    if (hasPhone) {
      newContact = {
        ...newContact,
        phone: R.prop('phone', contact),
      }
    }
    const contactInstance = await this.contact_GetById(id, { transaction })

    await contactInstance.update(newContact)

    const contactUpdated = await this.contact_GetById(id, { transaction })

    return contactUpdated
  }
}

module.exports = ContactDomain
