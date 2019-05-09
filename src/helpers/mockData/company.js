const faker = require('faker')

const cnpjs = [
  '40.190.041/0001-02',
  '32.478.461/0001-60',
  '75.460.221/0001-41',
  '86.419.666/0001-02',
  '54.236.845/0001-00',
  '31.796.778/0001-82',
  '67.238.587/0001-42',
  '38.734.326/0001-15',
  '03.487.135/0001-11',
  '17.276.186/0001-09',
  '58.139.342/0001-77',
  '11.267.253/0001-42',
  '98.409.787/0001-44',
  '43.216.467/0001-86',
  '58.484.370/0001-21',
]


const generateCompanyGroup = () => {
  const companyGroupMock = {
    groupName: faker.company.companyName(),
    description: faker.lorem.words(),
  }
  return companyGroupMock
}

const generateCompany = (counter) => {
  const company = {
    type: 'master',
    razaoSocial: `${faker.company.companyName()} LTDA ${counter}`,
    name: `companyName${counter}`,
    stateRegistration: '123123123',
  }
}

module.exports = {
  generateCompanyGroup,
}
