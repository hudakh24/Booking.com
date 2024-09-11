const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");
const customers = require("./Customers");
const flights = require("./Flights");
const Sequelize = require("sequelize");

class flightBookings extends Model {}

flightBookings.init(
  {
    flightBookingId: {
      type: DataTypes.STRING(60),
      primaryKey: true,
    },
    customerId: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(),
      references: {
        model: customers,
        key: "customerId",
      },
      flightId: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(),
        references: {
          model: flights,
          key: "flightId",
        },
      },
      flightBookingDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      flightBookingStatus: {
        type: DataTypes.ENUM, //ENUM is a datatype that is strictly defined
        values: ["cancelled", "confirmed"],
      },
    },
  },
  {
    timestamps: true, //sets create time and update time
    paranoid: true, // gives delete time
    modelName: "FlightsBooking", //table name
    sequelize, //db connection
  }
);

module.exports = flightBookings;