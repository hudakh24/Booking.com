const Joi = require("joi");

module.exports = {
  loginValidation: async (req, res, next) => {
    const login = Joi.object({
      userName: Joi.string().min(3).max(34).required(),
      password: Joi.string().min(6).max(18).required(),
    });

    try {
      const validate = await login.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
};
