const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Car', {
    carID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    carModelID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Car_Model',
        key: 'carModelID'
      }
    },
    carMakeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Car_Make',
        key: 'carMakeID'
      }
    },
    yearID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Car_Year',
        key: 'yearID'
      }
    },
    colorID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Color',
        key: 'colorID'
      }
    },
    serviceOrderID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Service_Order',
        key: 'serviceOrderID'
      }
    }
  }, {
    sequelize,
    tableName: 'Car',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__Car__1436F094C84AFABD",
        unique: true,
        fields: [
          { name: "carID" },
        ]
      },
    ]
  });
};
