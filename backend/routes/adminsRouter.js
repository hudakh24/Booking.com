const routes = require("express").Router();
const {
  createHotel,
  getAllHotel,
  hotelSchema,
  updateHotel,
} = require("../validations/hotels");
const {
  create_hotel,
  get_all_hotel,
  delete_hotel,
  update_hotel,
  get_hotel,
  create_room,
  update_room,
} = require("../controllers/admins/adminHotelController");
const { createRoom } = require("../validations/rooms");

routes.post("/add-hotel", createHotel, create_hotel);
routes.patch("/update-hotel", updateHotel, update_hotel);
routes.delete("/delete-hotel", hotelSchema, delete_hotel);
routes.get("/get-all-hotels", getAllHotel, get_all_hotel);
routes.get("/get-hotel", get_hotel);

routes.post("/create-room", createRoom, create_room);
routes.patch("/update-room", update_room);
// routes.delete("/delete-room", delete_room);
// routes.get("/get-all-rooms", get_all_room);
// routes.get("/get-room", get_room);

module.exports = routes;
