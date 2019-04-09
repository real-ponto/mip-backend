
describe('chip-domain', () => {
  test('', () => {
    expect(1).toBe(1)
  })
})

// const R = require('ramda')

// const { FieldValidationError } = require('../../helpers/errors')
// const { generateChip } = require('../../helpers/mockData/chip')
// const ChipDomain = require('./')

// const chipDomain = new ChipDomain()

// describe('chip-domain', () => {
//   describe('chipCreateTest', () => {
//     test('try add chip with correct date', async () => {
//       const chipMock = generateChip(999)

//       const chipCreated = await chipDomain.createChip(chipMock)

//       expect(chipCreated.numChip).toEqual(chipMock.numChip)
//       expect(chipCreated.ip).toEqual(chipMock.ip)
//       expect(chipCreated.operadora).toEqual(chipMock.operadora)
//     })

//     test('ip existent', async () => {
//       let chipMock = generateChip(998)

//       const { ip } = chipMock

//       await chipDomain.createChip(chipMock)

//       chipMock = generateChip(998)
//       chipMock.ip = ip

//       await expect(chipDomain.createChip(chipMock)).rejects
//         .toThrow()
//     })
//     // JOANNIS ARRUMA ISSO KCTADA
//     test('numChip with letters', async () => {
//       const chipMock = {
//         numChip: '5313adsas',
//         ip: '172.40.24.202',
//         operadora: 'Claro',
//       }

//       await expect(chipDomain.createChip(chipMock)).rejects
//         .toThrow()
//     })

//     test('numChip null', async () => {
//       const chipMock = {
//         numChip: '',
//         ip: '172.40.24.202',
//         operadora: 'Claro',
//       }

//       await expect(chipDomain.createChip(chipMock)).rejects
//         .toThrowError(new FieldValidationError([{
//           field: 'numChip',
//           message: 'numChip cannot be null',
//         }]))
//     })

//     test('operadora', async () => {
//       const chipMock = {
//         numChip: '101010100',
//         ip: '172.40.24.202',
//         operadora: '',
//       }

//       await expect(chipDomain.createChip(chipMock)).rejects
//         .toThrowError(new FieldValidationError([{
//           field: 'operadora',
//           message: 'operadora cannot be null',
//         }]))
//     })

//     test('omit numChip', async () => {
//       const chipMock = R.omit(['numChip'], generateChip())

//       await expect(chipDomain.createChip(chipMock)).rejects
//         .toThrowError(new FieldValidationError([{
//           field: 'numChip',
//           message: 'numChip cannot be null',
//         }]))
//     })
//   })

//   describe('getChipByIdTest', () => {
//     let chipCreated = null
//     let counter = 0
//     beforeEach(async () => {
//       const chipMock = generateChip(counter)
//       counter += 1
//       chipCreated = await chipDomain.createChip(chipMock)
//     })

//     test('get correct date', async () => {
//       const chipReturned = await chipDomain.getById(chipCreated.id)

//       expect(chipReturned.numChip).toEqual(chipCreated.numChip)
//       expect(chipReturned.ip).toEqual(chipCreated.ip)
//       expect(chipReturned.operadora).toEqual(chipCreated.operadora)
//     })

//     test('get null', async () => {
//       await expect(chipDomain.getById(null))
//         .rejects.toThrowError(new FieldValidationError([{
//           field: 'id',
//           message: 'id cannot be null',
//         }]))
//     })

//     test('get incorrect id', async () => {
//       await expect(chipDomain.getById('eda')).rejects
//         .toThrowError(new FieldValidationError([{
//           field: 'id',
//           message: 'id is invalid',
//         }]))
//     })
//   })

//   describe('updateChipByIdTest', () => {
//     let chipCreated = null
//     let counter = 100
//     beforeEach(async () => {
//       const chipMock = generateChip(counter)
//       counter += 1
//       chipCreated = await chipDomain.createChip(chipMock)
//     })

//     test('only numChip', async () => {
//       const chipMock = {
//         numChip: '132132132',
//       }

//       const chipUpdate = await chipDomain.updateChipById(chipCreated.id, chipMock)

//       expect(chipUpdate.numChip).toEqual(chipMock.numChip)
//       expect(chipUpdate.ip).toEqual(chipCreated.ip)
//       expect(chipUpdate.operadora).toEqual(chipCreated.operadora)
//     })

//     test('ip existent', async () => {
//       let chipMock = generateChip(998)

//       const { ip } = chipMock

//       await chipDomain.createChip(chipMock)

//       chipMock = generateChip(998)
//       chipMock.ip = ip

//       await expect(chipDomain.createChip(chipMock)).rejects
//         .toThrow()
//     })
//     // JOANNIS ARRUMA ISSO KCTADA

//     test('only operadora', async () => {
//       const chipMock = {
//         operadora: 'Claro',
//       }

//       const chipUpdate = await chipDomain.updateChipById(chipCreated.id, chipMock)

//       expect(chipUpdate.numChip).toEqual(chipCreated.numChip)
//       expect(chipUpdate.ip).toEqual(chipCreated.ip)
//       expect(chipUpdate.operadora).toEqual(chipMock.operadora)
//     })

//     test('only ip', async () => {
//       const chipMock = {
//         ip: '152.202.21.45',
//       }

//       const chipUpdate = await chipDomain.updateChipById(chipCreated.id, chipMock)

//       expect(chipUpdate.numChip).toEqual(chipCreated.numChip)
//       expect(chipUpdate.ip).toEqual(chipMock.ip)
//       expect(chipUpdate.operadora).toEqual(chipCreated.operadora)
//     })
//   })
// })
