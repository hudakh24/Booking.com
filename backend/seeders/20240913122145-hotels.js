const { v4: uuid } = require("uuid");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Hotels", [
      {
        hotelId: uuid(),
        hotelName: "Islamabad Serena Hotel",
        location: "Islamabad",
        address:
          "Khayaban-e-Suhrwardy, Opposite Convention Centre, Islamabad 44000, Pakistan",
        mobile: "+92 51 111 133 133",
        ratings: "5.0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "Hotel Margalla",
        location: "Islamabad",
        address:
          "M-2 islamabad near convention centre, 44000 Islamabad, Pakistan",
        mobile: "+92 51 111 901 901",
        ratings: "4.5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "Islamabad Marriott Hotel",
        location: "Islamabad",
        address:
          "Aga Khan Road, Shalimar 5, Pakistan , 46000 Islamabad, Pakistan",
        mobile: "+92 51 282 6121",
        ratings: "4.4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "Indigo Heights Hotel & Suites",
        location: "Lahore",
        address:
          "3-C3 Noor Jahan Road Gulberg-3, Gulberg, 54000 Lahore, Pakistan ",
        mobile: "+92 42 111 463 446",
        ratings: "4.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "The Nishat Hotel",
        location: "Lahore",
        address: "Abdul Haque Road, Johar Town, 54600 Lahore, Pakistan",
        mobile: "+92 42 111 646 835",
        ratings: "4.5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "Pearl Continental Hotel",
        location: "Lahore",
        address: "Shahrah-e-Quaid-e-Azam, The Mall, 54000 Lahore, Pakistan",
        mobile: "+92 42 111 505 505",
        ratings: "4.4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "Ambiance Boutique Art Hotel",
        location: "Karachi",
        address: "F-177 Block 5 Clifton, Clifton, 74000 Karachi, Pakistan",
        mobile: "+92 21 351 918 38",
        ratings: "4.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "Karachi Marriott Hotel",
        location: "Karachi",
        address: "9 Abdullah Haroon Road, 75530 Karachi, Pakistan",
        mobile: "+92 21 356 801 11",
        ratings: "4.6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "Mövenpick Hotel Karachi",
        location: "Karachi",
        address: "Club Road, 75530 Karachi, Pakistan",
        mobile: "+92 21 356 333 33",
        ratings: "4.6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "Serena Hotel Peshawar",
        location: "Peshawar",
        address: "Khayber Road, Peshawar, 25000 Peshawar, Pakistan",
        mobile: "+92 91 111 505 505",
        ratings: "4.6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "Shelton's Rezidor Peshawar",
        location: "Peshawar",
        address: "University Road, 25000 Peshawar, Pakistan ",
        mobile: "+92 91 570 1201",
        ratings: "4.0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "Peshawar Barracks",
        location: "Peshawar",
        address: "Khyber Road Peshawar cant, 24000 Peshawar, Pakistan",
        mobile: "+92 91 526 5493",
        ratings: "4.4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "Quetta Serena Hotel",
        location: "Quetta",
        address:
          "Quetta Serena Hotel, Shahrah-e-Zarghoon, Quetta, Pakistan, 95150 Quetta, Pakistan",
        mobile: "+92 81 282 0073",
        ratings: "4.6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "Grand Hotel Quetta",
        location: "Quetta",
        address:
          "5-4/74 Moti Ram Rd, Quetta, Balochistan 87300, 87300 Quetta, Pakistan",
        mobile: "+92 81 282 9090",
        ratings: "4.4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: uuid(),

        hotelName: "White Hotel",
        location: "Quetta",
        address: "Gurdat Singh Road, 87300 Quetta, Pakistan",
        mobile: " +92 81 416 6129",
        ratings: "4.0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
