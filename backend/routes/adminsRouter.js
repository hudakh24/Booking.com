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
  upload,
} = require("../controllers/admins/adminHotelController");
const protected = require("../middleware1");
const testProtected = require("../middleware");

routes.post(
  "/add-hotel",
  protected,
  // createHotelValidation,
  upload,
  create_hotel
);
routes.patch(
  "/update-hotel",
  protected,
  //  updateHotelValidation,
  update_hotel
);
routes.patch(
  "/update-hotel-image",
  protected,
  upload,
  //  updateHotelValidation,
  update_hotel
);
routes.delete("/delete-hotel", protected, hotelValidation, delete_hotel);
routes.get("/get-all-hotels", protected, getAllHotelValidation, get_all_hotels);
routes.get("/get-hotel", protected, hotelValidation, get_hotel);

routes.post(
  "/create-room",
  protected,
  //createRoomValidation,
  upload,
  create_room
);
routes.patch("/update-room", protected, updateRoomValidation, update_room);
routes.delete("/delete-room", protected, roomValidation, delete_room);
routes.get("/get-all-rooms", protected, getAllRoomsValidation, get_all_rooms);
routes.get("/get-room", protected, roomValidation, get_room);

module.exports = routes;
