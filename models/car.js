"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      Car.hasMany(models.Rent, { foreignKey: 'carId' });
    }
  }

  Car.init(
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberPlate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      currentCity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rentPerHr: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rentHistory: {
        type: DataTypes.JSON,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Car",
    }
  );

  return Car;
};
