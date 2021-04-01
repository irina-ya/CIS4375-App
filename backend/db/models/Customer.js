module.exports = (sequelize, DataTypes) => 
    sequelize.define('Customer', {
        customerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
          },
    })