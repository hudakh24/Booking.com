const { v4: uuid } = require("uuid");
const { getHotelId } = require("../models/commonModel");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define room details and associated hotel names
    const roomDetails = [
      {
        hotelName: "Islamabad Serena Hotel",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "71940",
      },
      {
        hotelName: "Islamabad Serena Hotel",
        roomNo: "D2",
        roomType: "double",
        pricePerNight: "71940",
      },
      {
        hotelName: "Islamabad Serena Hotel",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "50000",
      },
      {
        hotelName: "Islamabad Serena Hotel",
        roomNo: "S2",
        roomType: "single",
        pricePerNight: "50000",
      },
      {
        hotelName: "Islamabad Serena Hotel",
        roomNo: "VIP1",
        roomType: "suite",
        pricePerNight: "100000",
      },
      {
        hotelName: "Islamabad Marriott Hotel",
        roomNo: "VIP1",
        roomType: "suite",
        pricePerNight: "90000",
      },
      {
        hotelName: "Islamabad Marriott Hotel",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "45000",
      },
      {
        hotelName: "Islamabad Marriott Hotel",
        roomNo: "S2",
        roomType: "single",
        pricePerNight: "45000",
      },
      {
        hotelName: "Islamabad Marriott Hotel",
        roomNo: "S3",
        roomType: "single",
        pricePerNight: "45000",
      },
      {
        hotelName: "Islamabad Marriott Hotel",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "63500",
      },
      {
        hotelName: "Islamabad Marriott Hotel",
        roomNo: "D2",
        roomType: "double",
        pricePerNight: "63500",
      },
      {
        hotelName: "Hotel Margalla",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "60500",
      },
      {
        hotelName: "Hotel Margalla",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "40000",
      },
      {
        hotelName: "Hotel Margalla",
        roomNo: "S2",
        roomType: "single",
        pricePerNight: "40000",
      },
      {
        hotelName: "Hotel Margalla",
        roomNo: "S3",
        roomType: "single",
        pricePerNight: "40000",
      },
      {
        hotelName: "Hotel Margalla",
        roomNo: "VIP1",
        roomType: "suite",
        pricePerNight: "75000",
      },

      {
        hotelName: "Indigo Heights Hotel & Suites",
        roomNo: "VIP1",
        roomType: "suite",
        pricePerNight: "85600",
      },
      {
        hotelName: "Indigo Heights Hotel & Suites",
        roomNo: "VIP2",
        roomType: "suite",
        pricePerNight: "85600",
      },
      {
        hotelName: "Indigo Heights Hotel & Suites",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "40000",
      },
      {
        hotelName: "Indigo Heights Hotel & Suites",
        roomNo: "S2",
        roomType: "single",
        pricePerNight: "40000",
      },
      {
        hotelName: "Indigo Heights Hotel & Suites",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "55000",
      },
      {
        hotelName: "The Nishat Hotel",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "67000",
      },
      {
        hotelName: "The Nishat Hotel",
        roomNo: "D2",
        roomType: "double",
        pricePerNight: "67000",
      },
      {
        hotelName: "The Nishat Hotel",
        roomNo: "VIP1",
        roomType: "suite",
        pricePerNight: "74500",
      },
      {
        hotelName: "The Nishat Hotel",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "50000",
      },
      {
        hotelName: "The Nishat Hotel",
        roomNo: "S2",
        roomType: "single",
        pricePerNight: "50000",
      },
      {
        hotelName: "Pearl Continental Hotel",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "60000",
      },
      {
        hotelName: "Pearl Continental Hotel",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "75000",
      },
      {
        hotelName: "Pearl Continental Hotel",
        roomNo: "VIP1",
        roomType: "suite",
        pricePerNight: "88500",
      },
      {
        hotelName: "Pearl Continental Hotel",
        roomNo: "VIP2",
        roomType: "suite",
        pricePerNight: "88500",
      },
      {
        hotelName: "Ambiance Boutique Art Hotel",
        roomNo: "VIP1",
        roomType: "suite",
        pricePerNight: "71500",
      },
      {
        hotelName: "Ambiance Boutique Art Hotel",
        roomNo: "S2",
        roomType: "single",
        pricePerNight: "40500",
      },
      {
        hotelName: "Ambiance Boutique Art Hotel",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "40500",
      },
      {
        hotelName: "Karachi Marriott Hotel",
        roomNo: "VIP1",
        roomType: "suite",
        pricePerNight: "90000",
      },
      {
        hotelName: "Karachi Marriott Hotel",
        roomNo: "VIP2",
        roomType: "suite",
        pricePerNight: "90000",
      },
      {
        hotelName: "Karachi Marriott Hotel",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "45000",
      },
      {
        hotelName: "Karachi Marriott Hotel",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "63500",
      },
      {
        hotelName: "Karachi Marriott Hotel",
        roomNo: "D2",
        roomType: "double",
        pricePerNight: "63500",
      },
      {
        hotelName: "Movenpick Hotel Karachi",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "55500",
      },
      {
        hotelName: "Movenpick Hotel Karachi",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "45000",
      },
      {
        hotelName: "Movenpick Hotel Karachi",
        roomNo: "S2",
        roomType: "single",
        pricePerNight: "45000",
      },
      {
        hotelName: "Serena Hotel Peshawar",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "61940",
      },
      {
        hotelName: "Serena Hotel Peshawar",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "40000",
      },
      {
        hotelName: "Serena Hotel Peshawar",
        roomNo: "VIP1",
        roomType: "suite",
        pricePerNight: "80000",
      },
      {
        hotelName: "Shelton's Rezidor Peshawar",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "30000",
      },
      {
        hotelName: "Shelton's Rezidor Peshawar",
        roomNo: "S2",
        roomType: "single",
        pricePerNight: "30000",
      },
      {
        hotelName: "Peshawar Barracks",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "40000",
      },
      {
        hotelName: "Peshawar Barracks",
        roomNo: "D2",
        roomType: "double",
        pricePerNight: "40000",
      },
      {
        hotelName: "Peshawar Barracks",
        roomNo: "D3",
        roomType: "double",
        pricePerNight: "40000",
      },
      {
        hotelName: "Quetta Serena Hotel",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "61940",
      },
      {
        hotelName: "Quetta Serena Hotel",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "40000",
      },
      {
        hotelName: "Quetta Serena Hotel",
        roomNo: "VIP1",
        roomType: "suite",
        pricePerNight: "80000",
      },
      {
        hotelName: "Grand Hotel Quetta",
        roomNo: "VIP2",
        roomType: "suite",
        pricePerNight: "70000",
      },
      {
        hotelName: "Grand Hotel Quetta",
        roomNo: "S1",
        roomType: "single",
        pricePerNight: "52500",
      },
      {
        hotelName: "Grand Hotel Quetta",
        roomNo: "S2",
        roomType: "single",
        pricePerNight: "52500",
      },
      {
        hotelName: "Grand Hotel Quetta",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "63700",
      },
      {
        hotelName: "White Hotel",
        roomNo: "D1",
        roomType: "double",
        pricePerNight: "59000",
      },
      {
        hotelName: "White Hotel",
        roomNo: "D2",
        roomType: "double",
        pricePerNight: "59000",
      },
    ];

    try {
      // Prepare the room entries by fetching hotel IDs
      const roomEntries = await Promise.all(
        roomDetails.map(async (room) => {
          const hotel = await getHotelId({ hotelName: room.hotelName });
          return {
            roomId: uuid(),
            hotelId: hotel.response.dataValues.hotelId,
            roomNo: room.roomNo, // Use the fetched hotelId
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
