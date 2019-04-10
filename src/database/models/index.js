// chip escope
const chip = require('./chip')
const chipConnectEvent = require('./chip/chipConnectEvent')
const chipEvent = require('./chip/chipEvent')
const chipOut = require('./chip/chipOut')
const chipProvider = require('./chip/chipProvider')

// item escope
const item = require('./item')
const itemEvent = require('./item/itemEvent')
const itemType = require('./item/itemType')
const itemModel = require('./item/itemModel')
const itemOut = require('./item/itemOut')

// others escope
const address = require('./other/address')
const contact = require('./other/contact')

// company escope
const company = require('./company')
const companyGoup = require('./company/companyGroup')
const companyEvent = require('./company/companyEvent')

// watch escope
const watch = require('./watch')
const watchEvent = require('./watch/watchEvent')
const watchConnectEvent = require('./watch/watchConnectEvent')

// modulo escope
const modulo = require('./modulo')
const moduloEvent = require('./modulo/moduloEvent')

const user = require('./user')
const login = require('./user/login')
const session = require('./user/session')


module.exports = [
  // chip
  chip,
  chipConnectEvent,
  chipEvent,
  chipOut,
  chipProvider,

  // item
  item,
  itemEvent,
  itemType,
  itemModel,
  itemOut,

  // others
  address,
  contact,

  // company
  company,
  companyGoup,
  companyEvent,

  // watch
  watch,
  watchEvent,
  watchConnectEvent,

  // modulo
  modulo,
  moduloEvent,

  user,

  login,
  session,


]
