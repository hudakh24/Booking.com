var routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("ADMIN PAGE");
});
routes.post("/login", () => {
  res.send("LOGIN PAGE");
});
routes.delete("/logout", () => {
  res.send("LOGIN PAGE");
});

module.exports = routes;