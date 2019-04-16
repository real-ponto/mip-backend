const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const companyContract = sequelize.define('companyContract', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    contractNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    active: {
      defaultValue: true,
      type: Sequelize.BOOLEAN,
    },

    oweMoney: {
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },

    dateInitial: {
      allowNull: false,
      defaultValue: Sequelize.NOW,
      type: Sequelize.DATE,
    },

    payDay: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    subsequent: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },


  })
  companyContract.associate = (models) => {
    companyContract.belongsTo(models.companyGroup, {
      foreignKey: {
        allowNull: false,
      },
    })
    companyContract.belongsTo(models.company, {
      foreignKey: {
        allowNull: false,
        unique: true,
      },
    })
  }

  return companyContract
}
