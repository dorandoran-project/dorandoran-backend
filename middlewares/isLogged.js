const createError = require("http-errors");
const constants = require("../utils/constants");

exports.isLoggedIn = (req, res, next) => {
  const token = req.signedCookies.accessToken;

  if (token) {
    next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  } else {
    next();
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  const token = req.signedCookies.accessToken;

  if (!token) {
    next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  } else {
    next();
  }
};
