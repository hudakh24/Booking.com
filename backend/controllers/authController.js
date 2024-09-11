// const { getUser } = require("../models/userModel");
// const responseHandler = require("../responseHandler");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { getAdmin } = require("../models/adminModel");
require("dotenv").config();
module.exports = {
  login: async (req, res) => {
    try {
      //check if admin exists
      const isAdmin = await getAdmin(req.body);
      if (isAdmin.error || !isAdmin.response) {
        isAdmin.error
          ? (isAdmin.error = "Invalid Admin")
          : (isAdmin.response = "Invalid Admin");
        res.cookie("auth", "undefined");
        return responseHandler(isAdmin, res);
      }
      //get password from isAdmin and compare
      const { password } = isAdmin.response.dataValues;
      const isValid = await compare(req.body.password, password);
      if (!isValid) {
        res.cookie("auth", "undefined"); //generating cookie
        return responseHandler({ response: "Invalid Credentials" }, res);
      }
      // now add token if admin exists
      const admin = isAdmin.response.dataValues;
      delete admin.password;
      const token = sign(admin, process.env.SECRET, {
        expiresIn: 6,
      });
      res.cookie("auth", token); //generating cookie
      return responseHandler({ response: token }, res);
    } catch (error) {
      console.log(error);
      return res.send({
        error: error,
      });
    }
  },
};