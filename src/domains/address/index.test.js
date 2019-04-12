const { generateAddress } = require('../../helpers/mockData/address')
const AddressDomain = require('./')

const addressDomain = new AddressDomain()

describe('tests about add a new address domain:', () => {
  let addressMock = null
  let createdAddress = null
  beforeEach(async () => {
    addressMock = generateAddress()

    createdAddress = await addressDomain.add(addressMock)
  })
  test('should add a new address', async () => {
    expect(createdAddress.id).toBeTruthy()

    expect(createdAddress.street).toBe(addressMock.street)
    expect(createdAddress.number).toBe(addressMock.number)
    expect(createdAddress.complement).toBe(addressMock.complement)
    expect(createdAddress.city).toBe(addressMock.city)
    expect(createdAddress.state).toBe(addressMock.state)
    expect(createdAddress.neighborhood).toBe(addressMock.neighborhood)
    expect(createdAddress.referencePoint).toBe(addressMock.referencePoint)
    expect(createdAddress.zipCode).toBe(addressMock.zipCode)
  })

  test('should update address', async () => {
    const newAddressMock = generateAddress()
    const updatedAddress = await addressDomain
      .updateById(createdAddress.id, { addressData: newAddressMock })

    expect(updatedAddress.id).toBe(createdAddress.id)

    expect(updatedAddress.street).toBe(newAddressMock.street)
    expect(updatedAddress.number).toBe(newAddressMock.number)
    expect(updatedAddress.complement).toBe(newAddressMock.complement)
    expect(updatedAddress.city).toBe(newAddressMock.city)
    expect(updatedAddress.state).toBe(newAddressMock.state)
    expect(updatedAddress.neighborhood).toBe(newAddressMock.neighborhood)
    expect(updatedAddress.referencePoint).toBe(newAddressMock.referencePoint)
    expect(updatedAddress.zipCode).toBe(newAddressMock.zipCode)
  })

  test('should delete address', async () => {
    const deletedAddress = await addressDomain
      .softDeleteById(createdAddress.id)

    expect(deletedAddress.deletedAt).toBeTruthy()
  })
})
