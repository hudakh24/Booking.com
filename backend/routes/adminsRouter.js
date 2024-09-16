const routes = require("express").Router();
const {
  createHotelValidation,
  getAllHotelValidation,
  hotelValidation,
  updateHotelValidation,
} = require("../validations/hotels");
const {
  createRoomValidation,
  updateRoomValidation,
  roomValidation,
  getAllRoomsValidation,
} = require("../validations/rooms");
const {
  create_hotel,
  get_all_hotels,
  delete_hotel,
  update_hotel,
  get_hotel,
  create_room,
  update_room,
  delete_room,
  get_all_rooms,
  get_room,
} = require("../controllers/admins/adminHotelController");

routes.post("/add-hotel", createHotelValidation, create_hotel);
routes.patch("/update-hotel", updateHotelValidation, update_hotel);
routes.delete("/delete-hotel", hotelValidation, delete_hotel);
routes.get("/get-all-hotels", getAllHotelValidation, get_all_hotels);
routes.get("/get-hotel", hotelValidation, get_hotel);

routes.post("/create-room", createRoomValidation, create_room);
routes.patch("/update-room", updateRoomValidation, update_room);
routes.delete("/delete-room", roomValidation, delete_room);
routes.get("/get-all-rooms", getAllRoomsValidation, get_all_rooms);
routes.get("/get-room", roomValidation, get_room);

module.exports = routes;
