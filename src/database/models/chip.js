const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const chip = sequelize.define('chip', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    numChip: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: [/^[0-9]+$/ig],
      },
    },
    ip: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    operadora: {
      type: Sequelize.ENUM('Vivo', 'Porto', 'Claro', 'Oi'),
      allowNull: true,
    },
  })

  return chip
}
