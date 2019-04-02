const R = require('ramda')

const { FieldValidationError } = require('../../helpers/errors')
const { generateChip } = require('../../helpers/mockData/chip')
const ChipDomain = require('./')

const chipDomain = new ChipDomain()

describe('chip-domain', () => {
  describe('chipCreateTest', () => {
    test('try add chip with correct date', async () => {
      const chipMock = generateChip()

      const chipCreated = await chipDomain.createChip(chipMock)

      expect(chipCreated.numChip).toEqual(chipMock.numChip)
      expect(chipCreated.ip).toEqual(chipMock.ip)
      expect(chipCreated.operadora).toEqual(chipMock.operadora)
    })

    test('numChip with letters', async () => {
      const chipMock = {
        numChip: '5313adsas',
        ip: '172.40.24.202',
        operadora: 'Claro',
      }

      await expect(chipDomain.createChip(chipMock)).rejects
        .toThrow()
    })

    test('omit numChip', async () => {
      const chipMock = R.omit(['numChip'], generateChip())

      await expect(chipDomain.createChip(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'numChip',
          message: 'numChip cannot be null',
        }]))
    })
  })
})
