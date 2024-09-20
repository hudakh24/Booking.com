const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");
const { v4: uuid } = require("uuid");

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
    address: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(),
      unique: true,
      allowNull: false,
    },
    ratings: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0.0,
        max: 5.0,
      },
      allowNull: false,
    },
  },
  {
    timestamps: true, //sets create time and update time
    // paranoid: true, // gives delete time
    modelName: "Hotels", //table name
    sequelize, //db connection
  }
);

hotels.beforeCreate(async (hotel) => {
  hotel.hotelId = uuid();
});

module.exports = hotels;
