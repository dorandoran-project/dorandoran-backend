const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const authService = require("../services/authService");
const constants = require("../utils/constants");

exports.getUserInformation = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ success: constants.SUCCESS });
};

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;

    if (!userInfo.email) {
      return next(createError(401, { message: constants.ERROR_UNAUTHORIZE }));
    }

    const accessToken = jwt.sign(
      { email: userInfo.email },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3h",
      }
    );

    const refreshToken = jwt.sign(
      { email: userInfo.email },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "2d",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000,
      signed: true,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 48 * 60 * 60 * 1000,
      signed: true,
    });

    let user = await authService.getUser(userInfo.email);

    if (!user) {
      user = await authService.createUser(userInfo);
    } else {
      await authService.saveAddress(user, userInfo.current_address);
    }

    res.status(200).json(user);
  } catch (err) {
    next(createError(401, { message: constants.ERROR_sUNAUTHORIZE }));
  }
};

exports.logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ success: constants.SUCCESS });
};
