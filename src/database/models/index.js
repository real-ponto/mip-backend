// others escope
const address = require('./other/address')
const contact = require('./other/contact')

// company escope
const company = require('./company')
const companyContract = require('./company/companyContract')
const companyGroup = require('./company/companyGroup')
const companyEvent = require('./company/companyEvent')
const companyUnit = require('./company/companyUnit')

// watch escope
const watch = require('./watch')
const watchEvent = require('./watch/watchEvent')
const watchModel = require('./watch/watchModel')

// modulo escope
const modulo = require('./modulo')
const moduloEvent = require('./modulo/moduloEvent')

// chip escope
const chip = require('./modulo/chip')
const chipConnectEvent = require('./modulo/chip/chipConnectEvent')
const chipEvent = require('./modulo/chip/chipEvent')
const chipOut = require('./modulo/chip/chipOut')
const chipProvider = require('./modulo/chip/chipProvider')

// moduloItem escope
const moduloItem = require('./modulo/moduloItem')
const moduloItemEvent = require('./modulo/moduloItem/moduloItemEvent')
const moduloItemType = require('./modulo/moduloItem/moduloItemType')
const moduloItemModel = require('./modulo/moduloItem/moduloItemModel')
const moduloItemOut = require('./modulo/moduloItem/moduloItemOut')

const user = require('./user')
const login = require('./user/login')
const session = require('./user/session')


module.exports = [
  // others
  address,
  contact,

  // company
  company,
  companyContract,
  companyGroup,
  companyEvent,
  companyUnit,

  // watch
  watch,
  watchEvent,
  watchModel,

  // modulo
  modulo,
  moduloEvent,

  // chip
  chip,
  chipConnectEvent,
  chipEvent,
  chipOut,
  chipProvider,

  // moduloItem
  moduloItem,
  moduloItemEvent,
  moduloItemType,
  moduloItemModel,
  moduloItemOut,

  user,

  login,
  session,


]
