const { getRoomPrice } = require("./commonModel");
const { models } = require("./index");
const { differenceInDays } = require("date-fns");
// const { Op } = require("sequelize");

module.exports = {
  getCustomer: async ({ userName, customerId }) => {
    try {
      const customer = await models.Customers.findOne({
        where: {
          //...() this means that we are using ternary operator in where clause
          ...(customerId ? { customerId: customerId } : { userName: userName }),
        },
        //attributes: ["customerId", "username"],
        // attributes: { exclude: ["password"] },
        // paranoid: false, //this will show deleted user too
      });
      return {
        response: customer,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error.message,
      };
    }
  },

  createCustomer: async (body) => {
    try {
      const customer = await models.Customers.create({ ...body });
      return {
        response: customer,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },

  getProfile: async ({ userName }) => {
    try {
      const customerProfile = await models.Customers.findOne({
        where: {
          userName: userName,
        },
        attributes: { exclude: ["password"] },
      });
      return {
        response: customerProfile,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },

  updateProfile: async ({ customerId, ...body }) => {
    try {
      const updatedProfile = await models.Customers.update(
        { ...body },
        {
          where: {
            customerId: customerId,
          },
        }
      );
      return {
        response: updatedProfile,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },

  deleteProfile: async ({ userName, customerId }) => {
    try {
      const deletedProfile = await models.Customers.destroy({
        where: {
          //...() this means that we are using ternary operator in where clause
          ...(customerId ? { customerId: customerId } : { userName: userName }),
        },
      });
      return {
        response: deletedProfile,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },

  bookRoom: async (body) => {
    try {
      const roomDetails = await getRoomPrice(body);

      const price_per_night = roomDetails.response.dataValues.pricePerNight;

      let daysdiff = differenceInDays(body.checkOut, body.checkIn);
      if (daysdiff === 0) {
        daysdiff = 1;
      }

      const room = models.HotelBookings.create({
        ...body,
        customerId: body.user.customerId,
        totalAmount: daysdiff * price_per_night,
      });
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
