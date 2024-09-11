const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");

class hotels extends Model {}

hotels.init(
  {
    hotelId: {
      type: DataTypes.STRING(60),
      primaryKey: true,
    },
    hotelName: {
      type: DataTypes.STRING(34),
      unique: true,
      allowNull: false,
    },
    location: {
      type: DataTypes.ENUM, //ENUM is a datatype that is strictly defined
      values: ["Islamabad", "Lahore", "Karachi", "Peshawar", "Quetta"],
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    ratings: {
      type: DataTypes.ENUM,
      values: [1, 2, 3, 4, 5],
      allowNull: false,
    },
  },
  {
    timestamps: true, //sets create time and update time
    paranoid: true, // gives delete time
    modelName: "Hotels", //table name
    sequelize, //db connection
  }
);

module.exports = hotels;
