const Joi = require("joi");

module.exports = {
  createRoomValidation: async (req, res, next) => {
    const createRoom = Joi.object({
      hotelName: Joi.string().required(),
      roomNo: Joi.string().min(2).max(4).required(),
      roomType: Joi.valid("single", "double", "suite").required(),
      pricePerNight: Joi.number().required(),
    });

    try {
      await createRoom.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },

  updateRoomValidation: async (req, res, next) => {
    const updateRoom = Joi.object({
      hotelName: Joi.string().required(),
      roomNo: Joi.string().min(2).max(4).required(),
      roomType: Joi.valid("single", "double", "suite"),
      pricePerNight: Joi.number(),
    });

    try {
      await updateRoom.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
};
