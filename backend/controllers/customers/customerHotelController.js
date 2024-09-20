const { bookRoom } = require("../../models/cutsomerModel");
const { checkAvailability } = require("../../models/roomModel");
const responseHandler = require("../../responseHandler");
const { differenceInDays } = require("date-fns");

module.exports = {
  book_room: async (req, res) => {
    req.body.user = req.user;

    // const roomToBook = await checkAvailability(req.body);

    // console.log(roomToBook.checkOut, req.body.checkIn);

    // const checkDate = differenceInDays(roomToBook.checkOut, req.body.checkIn);

    // console.log("--------->".checkDate);

    // console.log(roomToBook);

    // if (
    //   roomToBook.response.dataValues.hotelBookingStatus === "confirmed" &&
    //   checkDate > 0
    // ) {
    //   responseHandler({ response: "Room is not avaialable on this date" }, res);
    // } else {
    const book = await bookRoom(req.body);
    responseHandler(book, res);
    // }
  },
};
