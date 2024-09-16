const { models } = require("./index");
// const { Op } = require("sequelize");

module.exports = {
  getAdmin: async ({ userName, adminId }) => {
    try {
      const admin = await models.Admins.findOne({
        where: {
          //...() this means that we are using ternary operator in where clause
          ...(adminId ? { adminId: adminId } : { userName: userName }),
        },
        //attributes: ["userId", "username"],
        // attributes: { exclude: ["password"] },
        // paranoid: false, //this will show deleted user too
      });
      return {
        response: admin,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error.message,
      };
    }
  },
};
