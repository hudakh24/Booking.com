const { bookRoom } = require("../../models/cutsomerModel");
const responseHandler = require("../../responseHandler");
const { Op } = require("sequelize");
const hotelBookings = require("../../models/definitions/HotelBookings");

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
};
