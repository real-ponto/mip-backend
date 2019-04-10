const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const itemModel = sequelize.define('itemModel', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    mark: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'itemMark',
    },

    model: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'itemMark',
    },

    seller: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'itemMark',
    },
  })

  return itemModel
}
