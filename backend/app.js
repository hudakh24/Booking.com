var express = require("express");
//var path = require('path');
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var customersRouter = require("./src/routes/customersRouter");
var hotelsRouter = require("./src/routes/hotelsRouter");
var adminsRouter = require("./src/routes/adminsRouter");

var app = express();

// view engine setup
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", customersRouter);
app.use("/hotels", hotelsRouter);
app.use("/admins", hotelsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
