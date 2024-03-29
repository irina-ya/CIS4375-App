const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Service_Order', {
    serviceOrderID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    serviceOrderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    serviceOrderEstimatedCompletion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer',
        key: 'customerID'
      }
    },
    carID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Car',
        key: 'carID'
      }
    },
    serviceTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Service_Type',
        key: 'serviceTypeID'
      }
    },
    serviceOrderStatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Service_Order_Status',
        key: 'serviceOrderStatusID'
      }
    },
    serviceOrderComments: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Service_Order',
    schema: 'dbo',
    timestamps: false,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Service___5C62B891E7D6942F",
        unique: true,
        fields: [
          { name: "serviceOrderID" },
        ]
      },
    ]
  });
};
