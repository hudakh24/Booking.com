var express = require("express");
//var path = require('path');
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

var adminsRouter = require("./routes/adminsRouter");
var adminsAuthRouter = require("./routes/adminAuthRouter");
var customersRouter = require("./routes/customersRouter");
var customersAuthRouter = require("./routes/customerAuthRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(cors()); //(cross origin resource sharing) Enables cross-origin requests from any domain.
app.use(bodyParser.json()); //takes the incoming JSON data (which is just a string) from the request body and converting it into a JavaScript object

// view engine setup
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/admins", adminsRouter);
app.use("/adminsAuth", adminsAuthRouter);
app.use("/", customersAuthRouter);
app.use("/customer", customersRouter);

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
