"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    static associate(models) {
      Rent.belongsTo(models.User, { foreignKey: 'userId' });
      Rent.belongsTo(models.Car, { foreignKey: 'carId' });
    }
  }

  Rent.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hoursRequirement: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPayableAmt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Rent",
    }
  );

  return Rent;
};
