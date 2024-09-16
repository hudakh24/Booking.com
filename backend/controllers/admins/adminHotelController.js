const responseHandler = require("../../responseHandler");
const {
  createHotel,
  getAllHotels,
  deleteHotel,
  updateHotel,
  getHotel,
} = require("../../models/hotelModel");

const {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
} = require("../../models/roomModel");
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
  get_all_hotels: async (req, res) => {
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
      const findHotelID = await getHotelId(req.body);
      if (findHotelID.error) {
        return res.send({
          error: findHotelID.error.message,
        });
      }
      req.body.hotelId = findHotelID.response.dataValues.hotelId;
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
      if (req.query.hotelName) {
        const findHotelID = await getHotelId(req.query);
        if (findHotelID.error) {
          return res.send({
            error: findHotelID.error.message,
          });
        }
        req.query.hotelId = findHotelID.response.dataValues.hotelId;
      }
      const hotel = await getHotel(req.query);
      responseHandler(hotel, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  create_room: async (req, res) => {
    try {
      const findHotelID = await getHotelId(req.body);
      if (findHotelID.error) {
        return res.send({
          error: findHotelID.error.message,
        });
      }
      console.log(findHotelID.response.dataValues);
      // delete req.body.hotel;

      req.body.hotelId = findHotelID.response.dataValues.hotelId;
      const room = await createRoom(req.body);
      responseHandler(room, res);
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
  update_room: async (req, res) => {
    try {
      const findHotelID = await getHotelId(req.body);
      if (findHotelID.error) {
        return res.send({
          error: findHotelID.error.message,
        });
      }
      req.body.hotelId = findHotelID.response.dataValues.hotelId;
      const room = await updateRoom(req.body);
      responseHandler(room, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  delete_room: async (req, res) => {
    try {
      const findHotelID = await getHotelId(req.query);
      if (findHotelID.error) {
        return res.send({
          error: findHotelID.error.message,
        });
      }
      delete req.query.hotelName;
      req.query.hotelId = findHotelID.response.dataValues.hotelId;

      const room = await deleteRoom(req.query);
      responseHandler(room, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  get_all_rooms: async (req, res) => {
    try {
      req.query.offset = (req.query.pageNo - 1) * req.query.limit;
      if (req.query.hotelName) {
        const findHotelID = await getHotelId(req.query);
        if (findHotelID.error) {
          return res.send({
            error: findHotelID.error.message,
          });
        }
        // delete req.query.hotelName;
        req.query.hotelId = findHotelID.response.dataValues.hotelId;
      }
      const rooms = await getAllRooms(req.query);
      responseHandler(rooms, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  get_room: async (req, res) => {
    try {
      const findHotelID = await getHotelId(req.query);
      if (findHotelID.error) {
        return res.send({
          error: findHotelID.error.message,
        });
      }
      delete req.query.hotelName;
      console.log(findHotelID);
      req.query.hotelId = findHotelID.response.dataValues.hotelId;

      const room = await getRoom(req.query);
      responseHandler(room, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
};
