var routes = require("express").Router();
const { login, logout } = require("../controllers/admins/adminAuthController");
const { loginValidation } = require("../validations/auth");

routes.post("/login-admin", loginValidation, login);
routes.delete("/logout-admin", logout);

module.exports = routes;
