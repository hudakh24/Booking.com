const { v4: uuid } = require("uuid");
const { hash } = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // List of admin records to insert
    const admins = [
      {
        adminId: uuid(),
        firstName: "Nisar",
        lastName: "Jamil",
        userName: "nisar07",
        password: "190298",
        mobile: "+923454442845",
        email: "khokharmaliknisar@gmail.com",
        role: "Hotel Admin",
      },
      {
        adminId: uuid(),
        firstName: "Huda",
        lastName: "Khan",
        userName: "hudakh24",
        password: "19I0828",
        mobile: "+923324883888",
        email: "hudashoaib2000@gmail.com",
        role: "Super Admin",
      },
      {
        adminId: uuid(),
        firstName: "Afaq",
        lastName: "Ahmed",
        userName: "afaq007",
        password: "afaq123",
        mobile: "+923101541586",
        email: "affaqahmad411@gmail.com",
        role: "Flight Admin",
      },
    ];

    // Use map to hash the passwords and add createdAt, updatedAt fields
    const hashedAdmins = await Promise.all(
      admins.map(async (admin) => ({
        ...admin,
        password: await hash(admin.password, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    return queryInterface.bulkInsert("Admins", hashedAdmins);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Admins", null, {});
  },
};
