const { models } = require("./index");

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
};
