var routes = require("express").Router();
const { login } = require("../controllers/admins/adminAuthController");
const { loginValidation } = require("../validations/auth");

routes.post("/login-admin", loginValidation, login);

module.exports = routes;
