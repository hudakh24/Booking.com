const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
  getAdmin: async ({ username }) => {
    try {
      const user = await models.Admins.findOne({
        where: {
          //...() this means that we are using ternary operator in where clause
          userName: username,
        },
        //attributes: ["userId", "username"],
        // attributes: { exclude: ["password"] },
        include: [
          {
            model: models.roles, //joining with table roles
            attributes: ["role"],
          },
        ],
        // paranoid: false, //this will show deleted user too
      });
      return {
        response: user,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },
};
