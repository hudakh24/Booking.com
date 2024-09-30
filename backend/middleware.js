const { verify } = require("jsonwebtoken");
require("dotenv").config;
const middleware = (req, res, next) => {
  try {
    // console.log(req.cookies); //when getting cookies that plural when creating then singular i-e res.cookie
    const { auth } = req.cookies;
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'
    if (auth === "undefined") {
      // if (!token)
      return res.send({ error: "Unauthorized" });
    }
    verify(auth, process.env.SECRET, (error, data) => {
      if (error) {
        return res.send({ error: "forbidden" });
      }
      req.user = data; //store user info into user key
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
