const responseHandler = require("../../responseHandler");
const {
  createHotel,
  getAllHotels,
  deleteHotel,
  updateHotel,
  getHotel,
  createRoom,
  updateRoom,
} = require("../../models/hotelModel");
const { getHotelId } = require("../../models/commonModel");
module.exports = {
  create_hotel: async (req, res) => {
    try {
      const hotel = await createHotel(req.body);
      responseHandler(hotel, res);
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
  get_all_hotel: async (req, res) => {
    try {
      req.query.offset = (req.query.pageNo - 1) * req.query.limit;
      const hotels = await getAllHotels(req.query);
      responseHandler(hotels, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  delete_hotel: async (req, res) => {
    try {
      const hotel = await deleteHotel(req.query);
      responseHandler(hotel, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  update_hotel: async (req, res) => {
    try {
      const hotel = await updateHotel(req.body);
      responseHandler(hotel, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  get_hotel: async (req, res) => {
    try {
      const hotelProfile = await getHotel(req.query);
      responseHandler(hotelProfile, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  create_room: async (req, res) => {
    try {
      const hotel = await getHotelId(req.body);
      if (hotel.error) {
        return res.send({
          error: hotel.error.message,
        });
      }
      console.log(hotel.response.dataValues);
      delete req.body.hotel;
      req.body.hotelId = hotel.response.dataValues.hotelId;

      const room = await createRoom(req.body);
      responseHandler(room, res);
    } catch (error) {
      return res.send({ error: error });
    }
  },
  update_room: async (req, res) => {
    try {
      const room = await updateRoom(req.body);
      responseHandler(room, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
};
