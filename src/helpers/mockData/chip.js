const faker = require('faker')
const R = require('ramda')

const numberMock = (range = {
  min: 1000000000,
  max: 9999999999,
}) => faker.random.number(range)

const numberRamdomArray = (range = {
  min: 0,
  max: 3,
}) => faker.random.number(range)

const ipArray = [
  { ip: '172.40.24.', operadora: 'Claro' },
  { ip: '10.50.11.', operadora: 'Oi' },
  { ip: '10.115.11.', operadora: 'Porto' },
  { ip: '10.26.11.', operadora: 'Vivo' },
]

const generateChip = (number) => {
  const randomNumber = numberRamdomArray()
  const chipMock = {
    numChip: R.toString(numberMock()),
    ip: R.prop('ip', ipArray[randomNumber]),
    operadora: R.prop('operadora', ipArray[randomNumber]),
  }
  chipMock.ip = `${chipMock.ip}${number}`
  return chipMock
}

module.exports = {
  generateChip,
}
