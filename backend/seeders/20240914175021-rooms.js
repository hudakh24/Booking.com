const { v4: uuid } = require("uuid");
const { getHotelId } = require("../models/commonModel");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define room details and associated hotel names
    const roomDetails = [
      {
        hotelName: "Islamabad Serena Hotel",
        roomType: "double",
        pricePerNight: "71940",
      },
      {
        hotelName: "Hotel Margalla",
        roomType: "single",
        pricePerNight: "50000",
      },
      {
        hotelName: "Islamabad Marriott Hotel",
        roomType: "suite",
        pricePerNight: "100000",
      },
      // Add more rooms as needed
    ];

    try {
      // Prepare the room entries by fetching hotel IDs
      const roomEntries = await Promise.all(
        roomDetails.map(async (room) => {
          const hotel = await getHotelId({ hotelName: room.hotelName });
          console.log(
            "HOTEL ID RETRIEVED ------->>",
            hotel.response.dataValues.hotelId
          );
          return {
            roomId: uuid(),
            hotelId: hotel.response.dataValues.hotelId, // Use the fetched hotelId
            roomType: room.roomType,
            pricePerNight: room.pricePerNight,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        })
      );

      // Insert the room entries into the database
      return queryInterface.bulkInsert("Rooms", roomEntries);
    } catch (error) {
      console.error("Error inserting room entries:", error.message);
      throw error.message;
    }
  },
};
