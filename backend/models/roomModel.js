const { getHotel } = require("./commonModel");
const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
  createRoom: async (body) => {
    try {
      const room = await models.Rooms.create({ ...body });
      return {
        response: room,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },
  updateRoom: async ({ hotelId, roomNo, ...body }) => {
    try {
      const room = await models.Rooms.update(
        { ...body },
        {
          where: {
            hotelId: hotelId,
            roomNo: roomNo,
          },
        }
      );
      return {
        response: room,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error.message,
      };
    }
  },
  deleteRoom: async ({ hotelId, roomNo }) => {
    try {
      const room = await models.Rooms.destroy({
        where: {
          hotelId: hotelId,
          roomNo: roomNo,
        },
      });
      return {
        response: room,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },
  getAllRooms: async (query) => {
    try {
      const rooms = await models.Rooms.findAll({
        where: {
          //checks firstName exists? if yes creates an object and then filer is performed on the firstName column
          ...(query.hotelId ? { hotelId: query.hotelId } : true),
          ...(query.roomNo
            ? { roomNo: { [Op.substring]: query.roomNo } }
            : true),
          ...(query.roomType
            ? { roomType: { [Op.substring]: query.roomType } }
            : true),
          ...(query.pricePerNight
            ? { pricePerNight: { [Op.substring]: query.pricePerNight } }
            : true),
        },
        attributes: [
          "roomId",
          "hotelId",
          "roomType",
          "pricePerNight",
          "roomNo",
        ],
        include: [
          {
            model: models.Hotels, // Reference to the Hotels model
            attributes: ["hotelName"], // Include hotelName from Hotels table
          },
        ],
        order: [
          [
            query.orderWith ? query.orderWith : "pricePerNight",
            query.orderBy ? query.orderBy : "ASC",
          ],
        ],
        offset: query.offset,
        limit: query.limit,
      });
      return {
        response: rooms,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },
  getRoom: async ({ hotelId, roomNo }) => {
    try {
      const room = await models.Rooms.findOne({
        where: {
          hotelId: hotelId,
          roomNo: roomNo,
        },
      });
      return {
        response: room,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },
};
