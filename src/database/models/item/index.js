const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const item = sequelize.define('item', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    numSerial: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'item',
    },

    lot: {
      type: Sequelize.STRING,
    },

    status: {
      type: Sequelize.ENUM(
        'stock',
        'loanToEmployee',
        'test',
        'reserved',
        'inModule',
        'dead',
      ),
      defaultValue: 'stock',
    },
  })

  item.associate = (models) => {
    item.belongsTo(models.itemType, {
      foreignKey: {
        allowNull: false,
      },
    })

    item.belongsTo(models.itemModel, {
      foreignKey: {
        allowNull: false,
      },
    })

    item.hasMany(models.itemEvent)
  }

  return item
}
