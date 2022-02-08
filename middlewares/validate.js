const Joi = require("joi");
const createError = require("http-errors");
const constants = require("../utils/constants");

const userJoiSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  age_range: Joi.string().trim().min(5).required(),
  name: Joi.string().trim().min(1).required(),
  profile: Joi.string().trim().min(1).required(),
  current_address: Joi.string().trim().min(4).required(),
});

exports.kakaoLogin = (req, res, next) => {
  const result = Joi.validate(req.body, userJoiSchema);

  if (result.error) {
    return next(createError(401, { message: constants.ERROR_UNAUTHORIZE }));
  }

  next();
};
