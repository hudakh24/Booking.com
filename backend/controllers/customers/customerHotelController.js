const { bookRoom } = require("../../models/cutsomerModel");
const responseHandler = require("../../responseHandler");
const { Op } = require("sequelize");
const hotelBookings = require("../../models/definitions/HotelBookings");
const { models } = require("../../models");

module.exports = {
  book_room: async (req, res) => {
    req.body.user = req.user;

    const { roomId, checkIn, checkOut } = req.body;

    // Convert checkIn and checkOut to Date objects
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    try {
      const conflictingBooking = await hotelBookings.findOne({
        where: {
          roomId: roomId,
          [Op.or]: [
            {
              // Existing booking starts within the new booking range
              checkIn: {
                [Op.between]: [checkInDate, checkOutDate],
              },
            },
            {
              // Existing booking ends within the new booking range
              checkOut: {
                [Op.between]: [checkInDate, checkOutDate],
              },
            },
            {
              // Existing booking overlaps the entire range of the new booking
              [Op.and]: [
                { checkIn: { [Op.lte]: checkInDate } },
                { checkOut: { [Op.gte]: checkOutDate } },
              ],
            },
          ],
        },
      });

      // If a conflicting booking is found, return a conflict message
      if (conflictingBooking) {
        responseHandler(
          {
            response:
              "Room is already booked for the selected dates. Please choose a different date range.",
          },
          res
        );
      } else {
        const book = await bookRoom(req.body);
        responseHandler(book, res);
      }
    } catch (error) {
      console.error("Error during booking:", error);
      responseHandler(
        { response: "An error occurred while processing your request." },
        res
      );
    }
  },

  available_rooms: async (req, res) => {
    const { location, hotelName, checkIn, checkOut } = req.query;

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

    if (!checkIn || !checkOut) {
      responseHandler(
        { response: "Both Check-in and Check-out dates are required" },
        res
      );
    }

    const hotels = await models.Hotels.findAll({
      where: {
        ...(location ? { location } : "Islamabad"),
        ...(hotelName ? { hotelName } : true),
      },
      attributes: [
        "hotelId",
        "hotelName",
        "location",
        "address",
        "mobile",
        "ratings",
      ],
      include: [{ model: models.Rooms, as: "rooms" }],
    });

    const roomIds = hotels.flatMap((hotel) =>
      hotel.rooms.map((room) => room.roomId)
    );

    const bookedRooms = await models.HotelBookings.findAll({
      where: {
        roomId: {
          [Op.in]: roomIds,
        },
        [Op.or]: [
          {
            checkIn: { [Op.between]: [checkIn, checkOut] },
          },
          {
            checkOut: { [Op.between]: [checkIn, checkOut] },
          },
          {
            checkIn: { [Op.lte]: checkIn },
            checkOut: { [Op.gte]: checkOut },
          },
        ],
      },
    });

    const bookedRoomIds = bookedRooms.map((booking) => booking.roomId);

    const availableRooms = await models.Rooms.findAll({
      where: {
        roomId: {
          [Op.in]: roomIds,
          [Op.notIn]: bookedRoomIds, // Filter booked rooms
        },
      },
      include: [{ model: models.Hotels }], // Include hotel info
    });

    responseHandler(availableRooms, res);
  },
};
