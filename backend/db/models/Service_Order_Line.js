const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Service_Order_Line', {
    serviceOrderLineID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    serviceOrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Service_Order',
        key: 'serviceOrderID'
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
    servicePartID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Service_Part',
        key: 'servicePartID'
      }
    },
    serviceOrderLineStatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Service_Order_Line_Status',
        key: 'serviceOrderLineStatusID'
      }
    },
    serviceOrderLineCost: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Service_Order_Line',
    schema: 'dbo',
    timestamps: false,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
};
