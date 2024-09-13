const Joi = require("joi");

module.exports = {
  createRoom: async (req, res, next) => {
    const room = Joi.object({
      hotelName: Joi.string().required(),
      roomType: Joi.valid("single", "double", "suite").required(),
      pricePerNight: Joi.number().required(),
    });

    try {
      await room.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
};
