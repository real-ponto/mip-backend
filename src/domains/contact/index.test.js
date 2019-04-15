const R = require('ramda')

const { FieldValidationError } = require('../../helpers/errors')
const { generateContact } = require('../../helpers/mockData/contact')
const ContactDomain = require('./')

const contactDomain = new ContactDomain()

describe('contact-domain', () => {
  describe('contactCreateTest', async () => {
    let contactMockGenerated = {}
    let counter = 1

    beforeEach(() => {
      contactMockGenerated = generateContact(counter.toString())
      counter += 1
    })

    test('create contact with correct date', async () => {
      const contactMock = contactMockGenerated

      const contactCreated = await contactDomain.contact_Create(contactMock)

      expect(contactCreated.name).toEqual(contactMock.name)
      expect(contactCreated.email).toEqual(contactMock.email)
      expect(contactCreated.position).toEqual(contactMock.position)
      expect(contactCreated.phone).toEqual(contactMock.phone)
    })

    test('try add contact with name null', async () => {
      const chipMock = contactMockGenerated
      chipMock.name = ''

      await expect(contactDomain.contact_Create(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'name',
          message: 'name cannot be null',
        }]))
    })

    test('try add contact without name', async () => {
      const chipMock = R.omit(['name'], contactMockGenerated)

      await expect(contactDomain.contact_Create(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'name',
          message: 'name cannot be null',
        }]))
    })

    test('try add contact with email null', async () => {
      const chipMock = contactMockGenerated
      chipMock.email = ''

      await expect(contactDomain.contact_Create(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'email',
          message: 'email cannot be null',
        }]))
    })

    test('try add contact omiting email', async () => {
      const chipMock = R.omit(['email'], contactMockGenerated)

      await expect(contactDomain.contact_Create(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'email',
          message: 'email cannot be null',
        }]))
    })

    test('try add contact with phone null', async () => {
      const chipMock = contactMockGenerated
      chipMock.phone = ''

      await expect(contactDomain.contact_Create(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'phone',
          message: 'phone cannot be null',
        }]))
    })

    test('try add contact omiting phone', async () => {
      const chipMock = R.omit(['phone'], contactMockGenerated)

      await expect(contactDomain.contact_Create(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'phone',
          message: 'phone cannot be null',
        }]))
    })
  })
})
