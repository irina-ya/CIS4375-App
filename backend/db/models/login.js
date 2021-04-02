const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('login', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    accountTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'accountType',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'login',
    schema: 'dbo',
    timestamps: false,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__login__3213E83F7F226637",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
