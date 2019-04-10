const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const watchConnectEvent = sequelize.define('watchConnectEvent', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    average: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    state: {
      type: Sequelize.ENUM('online', 'offline', 'blocked', 'unknow'),
      allowNull: false,
      defaultValue: 'unknow',
    },
    ip: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    port: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    date: {
      allowNull: false,
      defaultValue: Sequelize.NOW,
      type: Sequelize.DATE,
    },

  })

  return watchConnectEvent
}
