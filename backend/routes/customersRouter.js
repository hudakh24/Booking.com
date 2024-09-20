var routes = require("express").Router();
var {
  get_all_hotels,
  get_hotel,
  get_all_rooms,
  get_room,
} = require("../controllers/admins/adminHotelController");
const {
  book_room,
} = require("../controllers/customers/customerHotelController");
const protected = require("../middleware1");
const { bookRoomValidation } = require("../validations/rooms");

routes.get("/", get_all_hotels);
routes.get("/get-hotel", get_hotel);
routes.get("/get-all-rooms", get_all_rooms);
routes.get("/get-room", get_room);

routes.post("/book-room", protected, bookRoomValidation, book_room);
// routes.get("/checkout", total_bill);

module.exports = routes;
