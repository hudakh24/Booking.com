var routes = require("express").Router();
const {
  login,
  logout,
  register,
  get_profile,
  update_profile,
  delete_profile,
} = require("../controllers/customers/customerAuthController");
const {
  loginValidation,
  createCustomerValidation,
} = require("../validations/auth");
const protected = require("../middleware1");

routes.post("/", loginValidation, login);
routes.post("/register", createCustomerValidation, register);
routes.get("/get-profile", protected, get_profile);
routes.get("/update-profile", protected, update_profile);
routes.get("/delete-profile", protected, delete_profile);

module.exports = routes;
