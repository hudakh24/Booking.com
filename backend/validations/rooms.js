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
      roomId: Joi.string().required(),
      hotelName: Joi.string(),
      roomNo: Joi.string().min(2).max(4),
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
      // hotelName: Joi.string(),
      // roomNo: Joi.string().min(2).max(4),
      roomId: Joi.string().required(),
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
      // pageNo: Joi.number().required(),
      // limit: Joi.number().valid(2, 4).required(), //valid tells no of records to be displayed 2/4
      //sorting
      orderWith: Joi.string().valid(
        "pricePerNight",
        "roomType",
        "roomNo, hotelName"
      ),
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
  bookRoomValidation: async (req, res, next) => {
    const bookRoom = Joi.object({
      roomId: Joi.string(),
      checkIn: Joi.date(),
      checkOut: Joi.date(),
      hotelBookingStatus: Joi.string().valid("cancelled", "confirmed"),
    });

    try {
      await bookRoom.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  availableRoomsValidation: async (req, res, next) => {
    const availableRooms = Joi.object({
      //pagination
      // pageNo: Joi.number().required(),
      // limit: Joi.number().valid(2, 4).required(), //valid tells no of records to be displayed 2/4
      //sorting
      orderWith: Joi.string().valid("pricePerNight", "roomType"),
      orderBy: Joi.string().valid("ASC", "DESC"),
      //filter
      hotelName: Joi.string(),
      roomNo: Joi.string().min(2).max(4),
      roomType: Joi.valid("single", "double", "suite"),
      pricePerNight: Joi.number(),

      checkIn: Joi.date().required(),
      checkOut: Joi.date().required(),
      location: Joi.valid(
        "Islamabad",
        "Lahore",
        "Karachi",
        "Peshawar",
        "Quetta"
      ).required(),
    });
    try {
      await availableRooms.validateAsync(req.query);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
};
