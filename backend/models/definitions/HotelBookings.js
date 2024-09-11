const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");
const customers = require("./Customers");
const rooms = require("./Rooms");

class hotelBookings extends Model {}

hotelBookings.init(
  {
    hotelBookingId: {
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
      roomId: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(),
        references: {
          model: rooms,
          key: "roomId",
        },
      },
      checkIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      hotelBookingStatus: {
        type: DataTypes.ENUM, //ENUM is a datatype that is strictly defined
        values: ["cancelled", "confirmed"],
      },
    },
  },
  {
    timestamps: true, //sets create time and update time
    paranoid: true, // gives delete time
    modelName: "HotelBookings", //table name
    sequelize, //db connection
  }
);

module.exports = hotelBookings;
