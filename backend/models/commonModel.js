const { models } = require("./index");

module.exports = {
  getHotelId: async ({ hotelName }) => {
    try {
      const hotel = await models.Hotels.findOne({
        where: {
          hotelName: hotelName, //Key:value
        },
      });
      return {
        response: hotel,
      };
    } catch (error) {
      console.log(error);
      return {
        error: error,
      };
    }
  },
};
