const { getHotel } = require("./commonModel");
const { models } = require("./index");
const { Op } = require("sequelize");
const sequelize = require("../bin/dbConfig");
const responseHandler = require("../responseHandler");
const fs = require("fs");

module.exports = {
  createHotel: async (body) => {
    let fileName = `uploads\\images\\${body.file.filename}`;
    console.log("filename----->", fileName);
    // if (body.file) {
    //   fileName = `uploads\\images\\${body.file.filename}`;
    // }
    // req.fileNames = fileNames;
    try {
      const hotel = await models.Hotels.create({
        images: fileName,
        ...body.body,
      });
      //   const hotel = models.hotels.create({ hotelName: body.hotelName, password: body.password });
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
          "images",
        ],
        // attributes: { exclude: ["hotelId"] },
        // order:[["order", "by"]], order accepts two values
        order: [
          [
            query.orderWith ? query.orderWith : "location",
            query.orderBy ? query.orderBy : "ASC",
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

  updateHotel: async (body) => {
    // console.log("filename previous ---->", body.file.path);
    // fs.unlinkSync(body.file.path);
    let fileName = `uploads\\images\\${body.file.filename}`;
    try {
      const hotel = await models.Hotels.update(
        { images: fileName, ...body.body },
        {
          where: {
            hotelId: body.body.hotelId,
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
