const { getHotel } = require("./commonModel");
const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
  createHotel: async (body) => {
    try {
      const hotel = await models.Hotels.create({ ...body });
      //   const hotel = models.hotels.create({ hotelName: body.hotelName, password: body.password });
      return {
        response: hotel,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },
  getAllHotels: async (query) => {
    try {
      const hotels = await models.Hotels.findAll({
        where: {
          //checks firstName exists? if yes creates an object and then filer is performed on the firstName column
          ...(query.hotelName
            ? { hotelName: { [Op.substring]: query.hotelName } }
            : true),
          ...(query.mobile
            ? { mobile: { [Op.substring]: query.mobile } }
            : true),
          ...(query.location
            ? { location: { [Op.substring]: query.location } }
            : true),
        },
        attributes: ["hotelId", "hotelName", "location", "address", "mobile"],
        // attributes: { exclude: ["hotelId"] },
        // order:[["order", "by"]], order accepts two values
        order: [
          [
            query.orderWith ? query.orderWith : "hotelName",
            query.orderBy ? query.orderBy : "ASC",
          ],
        ],
        offset: query.offset,
        limit: query.limit,
      });
      return {
        response: hotels,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },
  deleteHotel: async ({ hotelName, hotelId }) => {
    try {
      const hotel = await models.Hotels.destroy({
        where: {
          //...() this means that we are using ternary operator in where clause
          ...(hotelId ? { hotelId: hotelId } : { hotelName: hotelName }),
        },
      });
      return {
        response: hotel,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },
  updateHotel: async ({ hotelId, ...body }) => {
    try {
      const hotel = await models.Hotels.update(
        { ...body },
        {
          where: {
            hotelId: hotelId,
          },
        }
      );
      return {
        response: hotel,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error.message,
      };
    }
  },
  getHotel: async ({ hotelId }) => {
    try {
      const hotel = await models.Hotels.findOne({
        where: {
          hotelId: hotelId,
        },
      });
      return {
        response: hotel,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },
};
