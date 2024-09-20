const Joi = require("joi");

module.exports = {
  loginValidation: async (req, res, next) => {
    const login = Joi.object({
      userName: Joi.string().min(3).max(34).required(),
      password: Joi.string().min(6).max(18).required(),
    });

    try {
      await login.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  createCustomerValidation: async (req, res, next) => {
    const createUser = Joi.object({
      userName: Joi.string().min(3).max(34).required(),
      password: Joi.string().min(6).max(18).required(),
      firstName: Joi.string().min(3).max(34).required(),
      lastName: Joi.string().min(3).max(34).required(),
      email: Joi.string().email().required(),
      mobile: Joi.string().required().length(13).required(),
    });

    try {
      await createUser.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
};
