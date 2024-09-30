const responseHandler = require("../../responseHandler");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const {
  getCustomer,
  createCustomer,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../../models/cutsomerModel");
require("dotenv").config();
module.exports = {
  login: async (req, res) => {
    try {
      //check if user exists
      const isCustomer = await getCustomer(req.body);
      if (isCustomer.error || !isCustomer.response) {
        isCustomer.error
          ? (isCustomer.error = "Invalid User")
          : (isCustomer.response = "Invalid User");
        // res.cookie("userauth", "undefined");
        return responseHandler(isCustomer, res);
      }
      //get password from isCustomer and compare
      const password = isCustomer.response.dataValues.password;
      const isValid = await compare(req.body.password, password);
      if (!isValid) {
        // res.cookie("userauth", "undefined"); //generating cookie
        return responseHandler({ response: "Invalid Credentials" }, res);
      }
      // now add token if user exists
      const customer = isCustomer.response.dataValues;
      delete customer.password;
      const token = sign(customer, process.env.SECRET, {
        expiresIn: "24h",
      });
      // res.cookie("userauth", token); //generating cookie
      return responseHandler({ response: token, user: customer }, res);
    } catch (error) {
      console.log(error);
      return res.send({
        error: error.message,
      });
    }
  },

  register: async (req, res) => {
    try {
      const customer = await createCustomer(req.body);
      responseHandler(customer, res);
    } catch (error) {
      return res.send({ error: error });
    }
  },

  get_profile: async (req, res) => {
    try {
      const userProfile = await getProfile(req.user);
      responseHandler(userProfile, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  update_profile: async (req, res) => {
    try {
      const user = await updateProfile(req.body);
      responseHandler(user, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  delete_profile: async (req, res) => {
    try {
      const user = await deleteProfile(req.query);
      responseHandler(user, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  logout: async (req, res) => {},
};
