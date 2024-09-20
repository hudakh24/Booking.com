const { verify } = require("jsonwebtoken");
require("dotenv").config;
const middleware = (req, res, next) => {
  try {
    // console.log(req.cookies); //when getting cookies that plural when creating then singular i-e res.cookie
    const { userauth } = req.cookies;
    if (userauth === "undefined") {
      return res.send({ error: "Unauthorized" });
    }
    verify(userauth, process.env.SECRET, (error, data) => {
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
