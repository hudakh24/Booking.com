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
} = require("../validations/rooms");
const {
  create_hotel,
  get_all_hotel,
  delete_hotel,
  update_hotel,
  get_hotel,
  create_room,
  update_room,
} = require("../controllers/admins/adminHotelController");

routes.post("/add-hotel", createHotelValidation, create_hotel);
routes.patch("/update-hotel", updateHotelValidation, update_hotel);
routes.delete("/delete-hotel", hotelValidation, delete_hotel);
routes.get("/get-all-hotels", getAllHotelValidation, get_all_hotel);
routes.get("/get-hotel", get_hotel);

routes.post("/create-room", createRoomValidation, create_room);
routes.patch("/update-room", updateRoomValidation, update_room);
// routes.delete("/delete-room", delete_room);
// routes.get("/get-all-rooms", get_all_room);
// routes.get("/get-room", get_room);

module.exports = routes;
