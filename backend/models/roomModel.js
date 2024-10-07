const { models } = require("./index");

module.exports = {
  createRoom: async (body) => {
    let fileNames;
    if (body.files && body.files.length > 0) {
      fileNames = body.files.map((file) => file.path);
    }
    try {
      const room = await models.Rooms.create({
        images: fileNames,
        ...body.body,
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
  updateRoom: async ({ roomId, ...body }) => {
    try {
      const room = await models.Rooms.update(
        { ...body },
        {
          where: {
            // hotelId: hotelId,
            // roomNo: roomNo,
            roomId: roomId,
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
  deleteRoom: async ({ roomId, hotelId, roomNo }) => {
    try {
      const room = await models.Rooms.destroy({
        where: {
          ...(roomId
            ? { roomId: roomId }
            : { hotelId: hotelId, roomNo: roomNo }),
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
            attributes: ["hotelName", "location"], // Include hotelName from Hotels table
          },
        ],
        order: [
          [
            query.orderWith ? query.orderWith : "pricePerNight",
            query.orderBy ? query.orderBy : "ASC",
          ],
        ],
        // offset: query.offset,
        // limit: query.limit,
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
  getRoom: async ({ roomId }) => {
    try {
      const room = await models.Rooms.findOne({
        where: {
          // hotelId: hotelId,
          // roomNo: roomNo,
          roomId: roomId,
        },
        include: [
          {
            model: models.Hotels, // Reference to the Hotels model
            attributes: ["hotelName"], // Include hotelName from Hotels table
          },
        ],
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

  // checkAvailability: async ({ roomId }) => {
  //   try {
  //     const room = await models.HotelBookings.findOne({
  //       where: {
  //         roomId: roomId,
  //       },
  //     });
  //     return {
  //       response: room,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     return {
  //       error: error,
  //     };
  //   }
  // },
};
