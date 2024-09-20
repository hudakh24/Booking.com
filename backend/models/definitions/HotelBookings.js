const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");
const customers = require("./Customers");
const rooms = require("./Rooms");
const Sequelize = require("sequelize");
const { v4: uuid } = require("uuid");

class hotelBookings extends Model {}

hotelBookings.init(
  {
    hotelBookingId: {
      type: DataTypes.STRING(60),
      primaryKey: true,
    },
    customerId: {
      allowNull: false,
      type: DataTypes.STRING(),
      references: {
        model: customers,
        key: "customerId",
      },
    },
    roomId: {
      allowNull: false,
      type: DataTypes.STRING(),
      references: {
        model: rooms,
        key: "roomId",
      },
    },
    checkIn: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.DATE,
      // defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hotelBookingStatus: {
      type: DataTypes.ENUM, //ENUM is a datatype that is strictly defined
      values: ["cancelled", "confirmed"],
    },
  },
  {
    timestamps: true, //sets create time and update time
    // paranoid: true, // gives delete time
    modelName: "HotelBookings", //table name
    sequelize, //db connection
  }
);
hotelBookings.beforeCreate(async (hotelBooking) => {
  hotelBooking.hotelBookingId = uuid();
});
module.exports = hotelBookings;
