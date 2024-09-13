const Joi = require("joi");

module.exports = {
  createHotel: async (req, res, next) => {
    const CreateHotel = Joi.object({
      hotelName: Joi.string().min(3).max(34).required(),
      location: Joi.valid(
        "Islamabad",
        "Lahore",
        "Karachi",
        "Peshawar",
        "Quetta"
      ).required(),
      address: Joi.string().required(),
      mobile: Joi.string().min(1).max(17).required(),
      ratings: Joi.number().min(0.0).max(5.0).required(),
    });

    try {
      await CreateHotel.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  getAllHotel: async (req, res, next) => {
    const getAllHotel = Joi.object({
      //pagination
      pageNo: Joi.number().required(),
      limit: Joi.number().valid(2, 4).required(), //valid tells no of records to be displayed 2/4
      //sorting
      orderWith: Joi.string().valid(
        "hotelName",
        "address",
        "location",
        "mobile",
        "ratings"
      ),
      orderBy: Joi.string().valid("ASC", "DESC"),
      //filter
      hotelName: Joi.string(),
      address: Joi.string(),
      mobile: Joi.string(),
      location: Joi.valid(
        "Islamabad",
        "Lahore",
        "Karachi",
        "Peshawar",
        "Quetta"
      ),
      ratings: Joi.number(),
    });

    try {
      await getAllHotel.validateAsync(req.query);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  hotelSchema: async (req, res, next) => {
    const hotel = Joi.object({
      hotelName: Joi.string(),
      hotelId: Joi.string(),
    });

    try {
      await hotel.validateAsync(req.query);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  updateHotel: async (req, res, next) => {
    const updateHotel = Joi.object({
      hotelId: Joi.string().required(),
      hotelName: Joi.string(),
      address: Joi.string(),
      location: Joi.string(),
      mobile: Joi.string(),
      rating: Joi.number(),
    });

    try {
      await updateHotel.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
};
