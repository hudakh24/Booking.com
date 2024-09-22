const sequelize = require("../bin/dbConfig");
const Admins = require("./definitions/Admins");
const Customers = require("./definitions/Customers");
const Hotels = require("./definitions/Hotels");
const Flights = require("./definitions/Flights");
const Rooms = require("./definitions/Rooms");
const HotelBookings = require("./definitions/HotelBookings");
const FlightBookings = require("./definitions/FlightBookings");
const Payments = require("./definitions/Payments");

const models = {
  Admins,
  Customers,
  Hotels,
  Flights,
  Rooms,
  HotelBookings,
  FlightBookings,
  Payments,
};

Customers.hasMany(FlightBookings, { foreignKey: "customerId" });
FlightBookings.belongsTo(Customers, { foreignKey: "customerId" });

Customers.hasMany(HotelBookings, { foreignKey: "customerId" });
HotelBookings.belongsTo(Customers, { foreignKey: "customerId" });

Flights.hasMany(FlightBookings, { foreignKey: "flightId" });
FlightBookings.belongsTo(Flights, { foreignKey: "flightId" });

Hotels.hasMany(Rooms, {
  foreignKey: "hotelId",
  onDelete: "CASCADE",
  as: "rooms",
});
Rooms.belongsTo(Hotels, { foreignKey: "hotelId" });

Rooms.hasMany(HotelBookings, { foreignKey: "roomId" });
HotelBookings.belongsTo(Rooms, { foreignKey: "roomId" });

HotelBookings.hasOne(Payments, { foreignKey: "hotelBookingId" });
Payments.belongsTo(HotelBookings, { foreignKey: "hotelBookingId" });

FlightBookings.hasOne(Payments, { foreignKey: "flightBookingId" });
Payments.belongsTo(FlightBookings, { foreignKey: "flightBookingId" });

const db = {}; //created db object

db.sequelize = sequelize; // object.newKey=Value
sequelize.models = models;

module.exports = { db, models };
