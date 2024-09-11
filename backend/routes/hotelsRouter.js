var routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("HOTELS PAGE");
});

module.exports = routes;
