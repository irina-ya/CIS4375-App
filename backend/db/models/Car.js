const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Car', {
    carID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Customer',
        key: 'customerID'
      }
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
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
  }, {
    sequelize,
    tableName: 'Car',
    schema: 'dbo',
    timestamps: false,
    underscored: true,
    createdAt: false,
    updatedAt: false,
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
