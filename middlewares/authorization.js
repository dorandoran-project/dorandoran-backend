const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const constants = require("../utils/constants");

exports.refresh = async (req, res, next) => {
  try {
    const userEmail = jwt.verify(
      req.signedCookies.accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET
    );

    req.userEmail = userEmail;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      try {
        const userEmail = jwt.verify(
          req.signedCookies.refreshToken,
          process.env.JWT_REFRESH_TOKEN_SECRET
        );

        req.userEmail = userEmail;

        res.cookie("accessToken", req.signedCookies.refreshToken, {
          httpOnly: true,
          maxAge: 3 * 60 * 60 * 1000,
          signed: true,
        });

        const refreshToken = jwt.sign(
          { email: userEmail },
          process.env.JWT_REFRESH_TOKEN_SECRET,
          {
            expiresIn: "2d",
          }
        );

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 48 * 60 * 60 * 1000,
          signed: true,
        });

        next();
      } catch (error) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return next(createError(400, { message: constants.ERROR_TOKEN }));
      }
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    next(createError(500, { message: constants.ERROR_INVALID_SERVER }));
  }
};
