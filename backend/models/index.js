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

const db = {}; //created db object

db.sequelize = sequelize; // object.newKey=Value
sequelize.models = models;

module.exports = { db, models };
