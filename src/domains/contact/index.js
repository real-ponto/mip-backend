const R = require('ramda')

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
}

module.exports = ContactDomain
