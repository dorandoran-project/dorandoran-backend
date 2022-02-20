const Joi = require("joi");
const createError = require("http-errors");
const constants = require("../utils/constants");

const userJoiSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  age_range: Joi.string().trim().min(5).required(),
  gender: Joi.string(),
  name: Joi.string().trim().min(1).required(),
  profile: Joi.string().trim().min(1).required(),
  current_address: Joi.string().trim().min(4).required(),
});

exports.validateKakaoLogin = (req, res, next) => {
  const result = userJoiSchema.validate(req.body);

  if (result.error) {
    return next(createError(401, { message: constants.ERROR_UNAUTHORIZE }));
  }

  next();
};

const roomJoiSchema = Joi.object().keys({
  lastRoom: Joi.object().required(),
  direction: Joi.string().required(),
});

exports.validateRoom = (req, res, next) => {
  const result = roomJoiSchema.validate(req.body);

  if (result.error) {
    return next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }

  next();
};

const refreshJoiSchema = Joi.object().keys({
  roomList: Joi.array().required(),
});

exports.validateRefreshRoom = (req, res, next) => {
  const result = refreshJoiSchema.validate(req.body);

  if (result.error) {
    return next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }

  next();
};

const newRoomJoiSchema = Joi.object().keys({
  roomData: Joi.object().required(),
});

exports.validateNewRoom = (req, res, next) => {
  const result = newRoomJoiSchema.validate(req.body);

  if (result.error) {
    return next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }

  next();
};

const currentRoomJoiSchema = Joi.object().keys({
  currentUser: Joi.string().required(),
  currentRoom: Joi.string().required(),
});

exports.validateUserAndRoom = (req, res, next) => {
  const result = currentRoomJoiSchema.validate(req.body);

  if (result.error) {
    return next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }

  next();
};

const detailRoomJoiSchema = Joi.object().keys({
  roomId: Joi.string().required(),
});

exports.validateDetailRoom = (req, res, next) => {
  const result = detailRoomJoiSchema.validate(req.body);

  if (result.error) {
    return next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }

  next();
};
