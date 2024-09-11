const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");
const Sequelize = require("sequelize");

class flights extends Model {}

flights.init(
  {
    flightId: {
      type: DataTypes.STRING(60),
      primaryKey: true,
    },
    departureAirport: {
      type: DataTypes.ENUM, //ENUM is a datatype that is strictly defined
      values: ["Islamabad", "Lahore", "Karachi"],
      allowNull: false,
    },
    arrivalAirport: {
      type: DataTypes.ENUM, //ENUM is a datatype that is strictly defined
      values: ["Islamabad", "Lahore", "Karachi"],
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,

      allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,

      allowNull: false,
    },
    ticketPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, //sets create time and update time
    paranoid: true, // gives delete time
    modelName: "Flights", //table name
    sequelize, //db connection
  }
);

module.exports = flights;
