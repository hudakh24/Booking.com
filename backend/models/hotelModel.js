const { getHotel } = require("./commonModel");
const { models } = require("./index");
const { Op } = require("sequelize");
const sequelize = require("../bin/dbConfig");
const responseHandler = require("../responseHandler");

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
      const { location } = query;

      // Define your valid ENUM values (you can also fetch them from the model)
      const validLocations = [
        "Islamabad",
        "Lahore",
        "Karachi",
        "Peshawar",
        "Quetta",
      ];

      if (location && !validLocations.includes(location)) {
        return { response: "Invalid location value" };
      }

      const hotels = await models.Hotels.findAll({
        where: {
          ...(location ? { location } : true),

          //checks hotelName exists? if yes creates an object and then filter is performed on the hotelName column
          ...(query.hotelName
            ? { hotelName: { [Op.substring]: query.hotelName } }
            : true),
        },
        attributes: [
          "hotelId",
          "hotelName",
          "location",
          "address",
          "mobile",
          "ratings",
        ],
        // attributes: { exclude: ["hotelId"] },
        // order:[["order", "by"]], order accepts two values
        order: [
          [
            query.orderWith ? query.orderWith : "ratings",
            query.orderBy ? query.orderBy : "DESC",
          ],
        ],
        // offset: query.offset,
        // limit: query.limit,
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
