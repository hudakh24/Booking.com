var routes = require("express").Router();
var {
  get_all_hotels,
  get_hotel,
  get_all_rooms,
  get_room,
} = require("../controllers/admins/adminHotelController");
const {
  book_room,
  available_rooms,
} = require("../controllers/customers/customerHotelController");
const protected = require("../middleware1");
const {
  bookRoomValidation,
  availableRoomsValidation,
} = require("../validations/rooms");

routes.get("/get-all-hotels", get_all_hotels);
routes.get("/get-hotel", get_hotel);
routes.get("/get-all-rooms", get_all_rooms);
routes.get("/get-room", get_room);
routes.get("/available-rooms", availableRoomsValidation, available_rooms);

routes.post("/book-room", protected, bookRoomValidation, book_room);
// routes.get("/checkout", total_bill);

module.exports = routes;
