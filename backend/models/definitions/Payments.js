const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");
const flightBookings = require("./FlightBookings");
const hotelBookings = require("./HotelBookings");

class payments extends Model {}

payments.init(
  {
    paymentId: {
      type: DataTypes.STRING(60),
      primaryKey: true,
    },
    flightBookingId: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(),
      references: {
        model: flightBookings,
        key: "flightBookingId",
      },
      hotelBookingId: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(),
        references: {
          model: hotelBookings,
          key: "hotelBookingId",
        },
      },
      grandTotal: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM, //ENUM is a datatype that is strictly defined
        values: ["paid", "unpaid"],
      },
    },
  },
  {
    timestamps: true, //sets create time and update time
    paranoid: true, // gives delete time
    modelName: "Payments", //table name
    sequelize, //db connection
  }
);

module.exports = payments;
