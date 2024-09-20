require("dotenv").config();
const { Sequelize } = require("sequelize");

// Connecting to Database
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
});

//DB Authentication
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error.message);
  });

module.exports = sequelize;
