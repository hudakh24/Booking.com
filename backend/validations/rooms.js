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
  roomValidation: async (req, res, next) => {
    const room = Joi.object({
      hotelName: Joi.string().required(),
      roomNo: Joi.string().min(2).max(4).required(),
    });

    try {
      await room.validateAsync(req.query);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  getAllRoomsValidation: async (req, res, next) => {
    const getAllRooms = Joi.object({
      //pagination
      pageNo: Joi.number().required(),
      limit: Joi.number().valid(2, 4).required(), //valid tells no of records to be displayed 2/4
      //sorting
      orderWith: Joi.string().valid("pricePerNight", "roomType", "roomNo"),
      orderBy: Joi.string().valid("ASC", "DESC"),
      //filter
      hotelName: Joi.string(),
      roomNo: Joi.string().min(2).max(4),
      roomType: Joi.valid("single", "double", "suite"),
      pricePerNight: Joi.number(),
    });
    try {
      await getAllRooms.validateAsync(req.query);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
};
