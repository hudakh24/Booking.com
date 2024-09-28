const { verify } = require("jsonwebtoken");
require("dotenv").config;
const middleware = (req, res, next) => {
  try {
    // console.log(req.cookies); //when getting cookies that plural when creating then singular i-e res.cookie

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'

    // const { userauth } = req.cookies;
    // if (userauth === "undefined")
    if (!token) {
      return res.send({ error: "Unauthorized" });
    }
    verify(token, process.env.SECRET, (error, data) => {
      if (error) {
        return res.send({ error: "forbidden" });
      }
      req.user = data; //store user info into user key
      // console.log(data);
      next();
    });
  } catch (error) {
    console.error(error);
    return res.send({
      error: error,
    });
  }
};

module.exports = middleware;
