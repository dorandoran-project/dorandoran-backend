const jwt = require("jsonwebtoken");
const authService = require("../services/authService");
const roomService = require("../services/roomService");
const communityService = require("../services/communityService");
const constants = require("../utils/constants");

exports.login = async (req, res) => {
  try {
    const userInfo = req.body;

    if (!userInfo.email) {
      return res.json("이메일 항목에 동의해주세요"); //테스트 중입니다
    }

    const accessToken = jwt.sign(
      { email: userInfo.email },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { email: userInfo.email },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 3600,
    });

    let user = await authService.getUser(userInfo.email);

    if (!user) {
      user = await authService.createUser(userInfo, refreshToken);
    } else {
      await authService.saveRefreshToken(user, refreshToken);
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.refresh = async (req, res) => {};

exports.logout = async (req, res, next) => {};
