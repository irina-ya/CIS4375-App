const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

  return sequelize.define('Customer', {
    customerID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customerStatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer_Status',
        key: 'customerStatusID'
      }
    },
    customerFirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerLastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stateID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 48,
      references: {
        model: 'State_Table',
        key: 'stateID'
      }
    },
    customerCity: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Houston"
    },
    customerZip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customerAddress1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customerAddress2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Customer',
    schema: 'dbo',
    timestamps: false,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Customer__B611CB9DB68A51B2",
        unique: true,
        fields: [
          { name: "customerID" },
        ]
      },
    ]
  });
};
